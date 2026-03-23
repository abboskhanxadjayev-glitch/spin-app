import "dotenv/config";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { Server as SocketIOServer } from "socket.io";
import { createApp } from "./app.js";
import { verifyAppToken } from "./lib/app-token.js";
import { loadConfig } from "./lib/config.js";
import { initDb } from "./lib/db.js";
import { getUserById } from "./lib/repositories.js";
import { createRoomManager } from "./lib/room-manager.js";

const config = loadConfig();
const db = initDb(config);
const roomManager = createRoomManager();
const webDir = path.resolve(config.rootDir, "web");
const webIndexFile = path.resolve(webDir, "index.html");

let io = null;
function toSocketRoomPayload(roomState, roomManager) {
  return {
    room_id: roomState.room_id,
    players: (roomState.players ?? []).map((player) => ({
      id: player.user_id ?? player.id,
      telegram_id: player.telegram_id ?? null,
      username: player.username ?? null,
      first_name: player.first_name ?? null,
      photo_url: player.photo_url ?? null,
      avatar: player.photo_url ?? null,
      hearts: player.hearts ?? 0,
      is_online: player.is_online ?? true,
      joined_at: player.joined_at ?? null,
    })),
    turn_index: roomState.turn_index ?? -1,
    messages: roomManager.getMessages({ limit: 5 }).messages,
    media: roomState.media ?? roomManager.getMedia(),
    current_turn: roomState.current_turn,
    bottle_state: roomState.bottle_state,
    last_result: roomState.last_result,
  };
}

function broadcastRoomUpdate() {
  if (!io) {
    return;
  }

  const roomState = roomManager.getRoomState();
  const roomPayload = toSocketRoomPayload(roomState, roomManager);
  console.info("[socket] broadcast room update", {
    playersCount: roomPayload.players.length,
    playerIds: roomPayload.players.map((player) => player.id),
  });
  io.to(`room:${roomManager.roomId}`).emit("room:update", roomPayload);
  io.to(`room:${roomManager.roomId}`).emit("room_updated", roomPayload);
}

function broadcastChatMessage(message) {
  if (!io) {
    return;
  }

  console.info("[socket] broadcast chat message", {
    id: message.id,
    roomId: message.room_id,
    userId: message.user_id,
  });
  io.to(`room:${roomManager.roomId}`).emit("chat_message", message);
  io.to(`room:${roomManager.roomId}`).emit("room_chat_updated", message);
}

function broadcastMediaState(mediaState) {
  if (!io) {
    return;
  }

  console.info("[socket] broadcast media state", {
    type: mediaState?.type ?? null,
    title: mediaState?.title ?? null,
    requestedBy: mediaState?.requestedBy?.user_id ?? null,
    muted: mediaState?.isMuted ?? false,
    volume: mediaState?.volume ?? null,
  });
  io.to(`room:${roomManager.roomId}`).emit("media_state_updated", mediaState);
}

function broadcastMediaQueue(queue) {
  if (!io) {
    return;
  }

  console.info("[socket] broadcast media queue", {
    count: queue.length,
    itemIds: queue.map((item) => item.id),
  });
  io.to(`room:${roomManager.roomId}`).emit("media_queue_updated", queue);
}

const app = createApp({
  db,
  config,
  roomManager,
  broadcastRoomUpdate,
  broadcastChatMessage,
  broadcastMediaState,
  broadcastMediaQueue,
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
  const joined = roomManager.joinRoom(socket.data.user);
  socket.join(`room:${roomManager.roomId}`);
  const roomPayload = toSocketRoomPayload(joined.room, roomManager);
  console.info("[socket] client connected", {
    userId: socket.data.user?.id ?? null,
    playersCount: roomPayload.players.length,
    turnIndex: roomPayload.turn_index,
  });
  broadcastRoomUpdate();
  socket.emit("room:update", roomPayload);
  socket.emit("room_updated", roomPayload);
  socket.emit("media_state_updated", roomManager.getMediaState());
  socket.emit("media_queue_updated", roomManager.getMediaQueue());

  socket.on("disconnect", (reason) => {
    const leaveResult = roomManager.leaveRoom(socket.data.user?.id);
    console.info("[socket] client disconnected", {
      userId: socket.data.user?.id ?? null,
      reason,
      playersCount: leaveResult.room.players.length,
      turnIndex: leaveResult.room.turn_index,
    });
    broadcastRoomUpdate();
  });
});

server.on("error", (error) => {
  console.error("[server] http server error", error);
});

server.listen(config.port, () => {
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
