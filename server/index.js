import "dotenv/config";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { Server as SocketIOServer } from "socket.io";
import { createApp } from "./app.js";
import { verifyAppToken } from "./lib/app-token.js";
import { loadConfig } from "./lib/config.js";
import { initDb } from "./lib/db.js";
import { getUserById } from "./lib/repositories.js";
import { createRoomManager } from "./lib/room-manager.js";

const PRESENCE_SWEEP_MS = 15_000;

const config = loadConfig();
const db = initDb(config);
const roomManager = createRoomManager();
const webDir = path.resolve(config.rootDir, "web");
const webIndexFile = path.resolve(webDir, "index.html");
const socketConnections = new Map();

let io = null;

function toSocketRoomPayload(roomState) {
  return {
    room_id: roomState.room_id,
    players: roomState.players ?? [],
    turn_index: roomState.turn_index ?? -1,
    current_turn: roomState.current_turn ?? null,
    bottle_state: roomState.bottle_state ?? null,
    last_result: roomState.last_result ?? null,
  };
}

function broadcastRoomUpdate() {
  if (!io) {
    return;
  }

  const roomPayload = toSocketRoomPayload(roomManager.getRoomState());
  io.to(`room:${roomManager.roomId}`).emit("room_updated", roomPayload);
}

function broadcastTurnUpdate() {
  if (!io) {
    return;
  }

  io.to(`room:${roomManager.roomId}`).emit("turn_updated", roomManager.getTurnPayload());
}

function broadcastChatMessage(message) {
  if (!io) {
    return;
  }

  io.to(`room:${roomManager.roomId}`).emit("chat_message", message);
}

function addSocketConnection(userId, socketId) {
  const ids = socketConnections.get(userId) ?? new Set();
  ids.add(socketId);
  socketConnections.set(userId, ids);
}

function removeSocketConnection(userId, socketId) {
  const ids = socketConnections.get(userId);
  if (!ids) {
    return 0;
  }

  ids.delete(socketId);
  if (!ids.size) {
    socketConnections.delete(userId);
    return 0;
  }

  socketConnections.set(userId, ids);
  return ids.size;
}

const app = createApp({
  db,
  config,
  roomManager,
  broadcastRoomUpdate,
  broadcastChatMessage,
  broadcastTurnUpdate,
});

const server = http.createServer(app);

io = new SocketIOServer(server, {
  cors: {
    origin: true,
    credentials: true,
  },
});

io.use((socket, next) => {
  const token = socket.handshake.auth?.token;
  const payload = verifyAppToken(token, config);

  if (!payload) {
    return next(new Error("Unauthorized socket session."));
  }

  const user = getUserById(db, payload.userId);
  if (!user) {
    return next(new Error("Socket user not found."));
  }

  socket.data.user = user;
  return next();
});

io.on("connection", (socket) => {
  const user = socket.data.user;
  addSocketConnection(user.id, socket.id);
  const joinResult = roomManager.joinRoom(user);
  roomManager.markOnline(user.id);
  socket.join(`room:${roomManager.roomId}`);

  console.info("[socket] connect", {
    userId: user.id,
    playersCount: joinResult.room.players.length,
    turnIndex: joinResult.room.turn_index,
  });

  socket.emit("room_updated", toSocketRoomPayload(joinResult.room));
  socket.emit("turn_updated", roomManager.getTurnPayload());
  broadcastRoomUpdate();
  broadcastTurnUpdate();

  socket.on("presence:ping", () => {
    roomManager.markHeartbeat(user.id);
  });

  socket.on("disconnect", (reason) => {
    const remainingConnections = removeSocketConnection(user.id, socket.id);
    console.info("[socket] disconnect", {
      userId: user.id,
      reason,
      remainingConnections,
    });

    if (remainingConnections === 0) {
      roomManager.markOffline(user.id);
      broadcastRoomUpdate();
      broadcastTurnUpdate();
    }
  });
});

setInterval(() => {
  const result = roomManager.sweepStalePlayers();
  if (result.changed) {
    console.info("[presence] removed stale offline players", {
      playersCount: result.room.players.length,
    });
    broadcastRoomUpdate();
    broadcastTurnUpdate();
  }
}, PRESENCE_SWEEP_MS).unref();

server.on("error", (error) => {
  console.error("[server] http server error", error);
});

server.listen(config.port, () => {
  console.log("SERVER STARTED");
  console.log(`spin server listening on port ${config.port}`);
  console.log(`mini app URL: ${config.miniAppUrl}`);
  console.log(`global room ready: ${roomManager.roomId}`);
  console.log(`web dir: ${webDir}`);
  console.log(`web index: ${webIndexFile}`);
  console.log(`web index exists: ${fs.existsSync(webIndexFile)}`);
});

function shutdown() {
  io?.close();
  server.close(() => {
    db.close();
    process.exit(0);
  });
}

process.once("SIGINT", shutdown);
process.once("SIGTERM", shutdown);
process.on("unhandledRejection", (error) => {
  console.error("[server] unhandled rejection", error);
});
process.on("uncaughtException", (error) => {
  console.error("[server] uncaught exception", error);
});
