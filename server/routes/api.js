import express from "express";
import { issueAppToken, verifyAppToken } from "../lib/app-token.js";
import {
  addSpinHistory,
  getLaunchPayload,
  getUserById,
  upsertTelegramUser,
} from "../lib/repositories.js";
import { resolveTelegramUser } from "../lib/telegram-auth.js";

function getBearerToken(req) {
  const value = req.get("authorization") || "";
  return value.startsWith("Bearer ") ? value.slice("Bearer ".length).trim() : "";
}

function nowIso() {
  return new Date().toISOString();
}

function createPreviewTelegramUser(previewUser = {}) {
  const previewId = String(previewUser.id || previewUser.telegram_id || "preview-demo");
  const username = String(previewUser.username || `preview_${previewId.slice(-6)}`).replace(/\s+/g, "_");
  const firstName = String(previewUser.first_name || previewUser.firstName || "Preview");

  return {
    id: previewId,
    username,
    first_name: firstName,
    last_name: previewUser.last_name || previewUser.lastName || null,
    photo_url: previewUser.photo_url || previewUser.photoUrl || null,
    language_code: "en",
    is_premium: false,
  };
}

function toClientUser(user) {
  return {
    id: user.id,
    telegram_id: user.telegramId,
    username: user.username,
    first_name: user.firstName,
    photo_url: user.photoUrl,
  };
}

function toRoomPlayer(player) {
  return {
    id: player.user_id ?? player.id,
    telegram_id: player.telegram_id ?? null,
    username: player.username ?? null,
    first_name: player.first_name ?? null,
    photo_url: player.photo_url ?? null,
    avatar: player.avatar ?? player.photo_url ?? null,
    is_online: Boolean(player.is_online),
  };
}

function toChatMessage(message) {
  return {
    id: message.id,
    room_id: message.room_id,
    user_id: message.user_id,
    username: message.username ?? null,
    first_name: message.first_name ?? null,
    avatar: message.avatar ?? null,
    text: message.text ?? "",
    created_at: message.created_at,
  };
}

function toRoomPayload(roomState) {
  return {
    room_id: roomState.room_id,
    players: (roomState.players ?? []).map(toRoomPlayer),
    turn_index: roomState.turn_index ?? -1,
    current_turn: roomState.current_turn ?? null,
    bottle_state: roomState.bottle_state ?? {
      rotation: 0,
      spinning: false,
      last_spinner_user_id: null,
      target_user_id: null,
    },
    last_result: roomState.last_result ?? null,
  };
}

function requireAppUser({ db, config }) {
  return (req, res, next) => {
    const token = getBearerToken(req);
    const payload = verifyAppToken(token, config);

    if (!payload) {
      return res.status(401).json({
        ok: false,
        error: "Mini App session is missing or expired.",
      });
    }

    const user = getUserById(db, payload.userId);
    if (!user) {
      return res.status(401).json({
        ok: false,
        error: "Mini App user session is invalid.",
      });
    }

    req.appUser = user;
    return next();
  };
}

export function createApiRouter({
  db,
  config,
  roomManager,
  broadcastRoomUpdate,
  broadcastChatMessage,
  broadcastTurnUpdate,
}) {
  const router = express.Router();

  router.get("/health", (_req, res) => {
    console.log("HEALTH HIT");
    res.json({ ok: true });
  });

  router.post("/bootstrap", (req, res) => {
    try {
      const initData = String(req.body?.initData || "");
      const isTelegramLaunch = Boolean(initData);
      const telegramUser = isTelegramLaunch
        ? resolveTelegramUser({
            initDataRaw: initData,
            botToken: config.botToken,
            allowUnsafeInitData: config.allowUnsafeInitData,
          }).telegramUser
        : createPreviewTelegramUser(req.body?.previewUser);

      const payload = isTelegramLaunch
        ? getLaunchPayload(db, telegramUser)
        : { user: upsertTelegramUser(db, telegramUser) };

      const appToken = issueAppToken(
        {
          userId: payload.user.id,
          telegramId: payload.user.telegramId,
        },
        config
      );

      res.json({
        ok: true,
        previewMode: !isTelegramLaunch,
        appToken,
        user: toClientUser(payload.user),
      });
    } catch (error) {
      res.status(401).json({
        ok: false,
        error: error.message,
      });
    }
  });

  router.use(requireAppUser({ db, config }));

  router.get("/user", (req, res) => {
    res.json({
      ok: true,
      user: toClientUser(req.appUser),
    });
  });

  router.post("/room/join", (req, res) => {
    try {
      const result = roomManager.joinRoom(req.appUser);
      roomManager.markOnline(req.appUser.id);
      broadcastRoomUpdate?.();
      broadcastTurnUpdate?.();

      res.json({
        ok: true,
        joined: result.joined,
        room: toRoomPayload(result.room),
      });
    } catch (error) {
      res.status(400).json({
        ok: false,
        error: error.message,
      });
    }
  });

  router.post("/room/leave", (req, res) => {
    const result = roomManager.leaveRoom(req.appUser.id);
    broadcastRoomUpdate?.();
    broadcastTurnUpdate?.();

    res.json({
      ok: true,
      left: result.left,
      room: toRoomPayload(result.room),
    });
  });

  router.get("/room", (req, res) => {
    roomManager.markHeartbeat(req.appUser.id);
    const room = roomManager.getRoomState();
    res.json({
      ok: true,
      room: toRoomPayload(room),
    });
  });

  router.get("/chat/messages", (req, res) => {
    const before = req.query?.before ? String(req.query.before) : null;
    const limit = req.query?.limit ? Number(req.query.limit) : 5;
    const result = roomManager.getMessages({ before, limit });

    res.json({
      ok: true,
      room_id: roomManager.roomId,
      messages: result.messages.map(toChatMessage),
      hasMore: result.hasMore,
    });
  });

  router.post("/chat/send", (req, res) => {
    try {
      const text = String(req.body?.text || "").trim();
      if (!text) {
        throw new Error("Message text is required.");
      }

      if (!roomManager.findPlayer(req.appUser.id)) {
        roomManager.joinRoom(req.appUser);
      }

      const message = roomManager.addChatMessage({
        user: req.appUser,
        text,
      });

      broadcastChatMessage?.(toChatMessage(message));

      res.json({
        ok: true,
        message: toChatMessage(message),
      });
    } catch (error) {
      res.status(400).json({
        ok: false,
        error: error.message,
      });
    }
  });

  router.post("/spin", (req, res) => {
    try {
      if (!roomManager.findPlayer(req.appUser.id)) {
        throw new Error("Join the room first.");
      }

      const room = roomManager.spinRoom(req.appUser.id);
      addSpinHistory(db, req.appUser.id, {
        ...room.last_result,
        stored_at: nowIso(),
      });

      broadcastRoomUpdate?.();
      broadcastTurnUpdate?.();

      res.json({
        ok: true,
        room: toRoomPayload(room),
        result: room.last_result,
      });
    } catch (error) {
      res.status(400).json({
        ok: false,
        error: error.message,
      });
    }
  });

  return router;
}
