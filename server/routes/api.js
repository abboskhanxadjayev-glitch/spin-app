import express from "express";
import { issueAppToken, verifyAppToken } from "../lib/app-token.js";
import {
  addHeartsToUser,
  addSpinHistory,
  getActiveGifts,
  getGiftById,
  getLaunchPayload,
  getUserById,
  sendGift,
  spendHeartForSpin,
  spendHeartsForMediaPlayback,
} from "../lib/repositories.js";
import { resolveTelegramUser } from "../lib/telegram-auth.js";
import { searchYouTubeVideos } from "../lib/youtube.js";

function getBearerToken(req) {
  const value = req.get("authorization") || "";
  return value.startsWith("Bearer ") ? value.slice("Bearer ".length).trim() : "";
}

function toClientUser(user) {
  return {
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    photoUrl: user.photoUrl,
    displayName: user.displayName,
    hearts: user.hearts,
    isPremium: Boolean(user.isPremium),
    isVip: Boolean(user.isVip),
  };
}

function toRoomPlayer(player) {
  const photoUrl = player.photo_url ?? player.photoUrl ?? null;
  return {
    id: player.user_id ?? player.id,
    telegram_id: player.telegram_id ?? player.telegramId ?? null,
    username: player.username ?? null,
    first_name: player.first_name ?? player.firstName ?? null,
    photo_url: photoUrl,
    avatar: photoUrl,
    hearts: player.hearts ?? 0,
    is_online: player.is_online ?? true,
    joined_at: player.joined_at ?? player.joinedAt ?? null,
  };
}

function toChatMessage(message) {
  return {
    id: message.id,
    room_id: message.room_id,
    user_id: message.user_id ?? message.from_user_id ?? null,
    username: message.username ?? null,
    first_name: message.first_name ?? null,
    avatar: message.avatar ?? message.photo_url ?? null,
    text: message.text ?? "",
    created_at: message.created_at,
    type: message.type ?? "chat",
    note: message.note ?? null,
  };
}

function toRequestedBy(requestedBy) {
  if (!requestedBy) {
    return null;
  }

  return {
    user_id: requestedBy.user_id ?? null,
    telegram_id: requestedBy.telegram_id ?? null,
    username: requestedBy.username ?? null,
    first_name: requestedBy.first_name ?? null,
    avatar: requestedBy.avatar ?? null,
  };
}

function toCurrentMedia(mediaState) {
  if (!mediaState) {
    return null;
  }

  return {
    id: mediaState.id,
    type: mediaState.type,
    videoId: mediaState.videoId,
    title: mediaState.title,
    channelTitle: mediaState.channelTitle ?? null,
    thumbnail: mediaState.thumbnail ?? null,
    requestedBy: toRequestedBy(mediaState.requestedBy),
    startedAt: mediaState.startedAt ?? null,
    isMuted: Boolean(mediaState.isMuted),
    volume: Number(mediaState.volume ?? 80),
  };
}

function toQueueItem(item) {
  return {
    id: item.id,
    type: item.type,
    videoId: item.videoId,
    title: item.title,
    channelTitle: item.channelTitle ?? null,
    thumbnail: item.thumbnail ?? null,
    requestedBy: toRequestedBy(item.requestedBy),
    createdAt: item.createdAt,
  };
}

function toMediaPayload(media) {
  return {
    current: toCurrentMedia(media?.current ?? null),
    queue: (media?.queue ?? []).map(toQueueItem),
  };
}

function getMediaPricing(config) {
  return {
    enabled: Boolean(config.mediaEnabled),
    audio: config.mediaAudioHeartsCost,
    video: config.mediaVideoHeartsCost,
  };
}

function parseMediaUrl(value) {
  const url = String(value || "").trim();
  if (!url) {
    throw new Error("Media URL is required.");
  }

  let parsed;
  try {
    parsed = new URL(url);
  } catch (_error) {
    throw new Error("Media URL is invalid.");
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new Error("Media URL must start with http:// or https://.");
  }

  return parsed.toString();
}

function parseYouTubeVideoId(value) {
  const videoId = String(value || "").trim();
  if (!videoId) {
    throw new Error("videoId is required.");
  }

  if (!/^[A-Za-z0-9_-]{11}$/.test(videoId)) {
    throw new Error("videoId is invalid.");
  }

  return videoId;
}

function requireAppUser({ db, config }) {
  return (req, res, next) => {
    const token = getBearerToken(req);
    const payload = verifyAppToken(token, config);

    if (!payload) {
      console.warn("[auth] invalid app token", {
        method: req.method,
        path: req.path,
        hasAuthorization: Boolean(token),
      });
      return res.status(401).json({
        ok: false,
        error: "Mini App session is missing or expired.",
      });
    }

    const user = getUserById(db, payload.userId);
    if (!user) {
      console.warn("[auth] app token user not found", {
        method: req.method,
        path: req.path,
        userId: payload.userId,
      });
      return res.status(401).json({
        ok: false,
        error: "Mini App user session is invalid.",
      });
    }

    req.appUser = user;
    return next();
  };
}

function toRoomPayload(roomState, roomManager) {
  return {
    room_id: roomState.room_id,
    players: (roomState.players ?? []).map(toRoomPlayer),
    turn_index: roomState.turn_index ?? -1,
    messages: roomManager.getMessages({ limit: 5 }).messages.map(toChatMessage),
    media: toMediaPayload(roomState.media ?? roomManager.getMedia()),
    current_turn: roomState.current_turn,
    bottle_state: roomState.bottle_state,
    last_result: roomState.last_result,
  };
}

function toClientGift(gift) {
  return {
    id: gift.id,
    code: gift.code,
    title: gift.title,
    emoji: gift.emoji,
    imageUrl: gift.imageUrl,
    price: gift.price,
  };
}

export function createApiRouter({
  db,
  config,
  roomManager,
  broadcastRoomUpdate,
  broadcastChatMessage,
  broadcastMediaState,
  broadcastMediaQueue,
}) {
  const router = express.Router();

  router.get("/health", (_req, res) => {
    res.json({
      ok: true,
      service: "spin-server",
      database: config.databasePath,
    });
  });

  router.post("/bootstrap", (req, res) => {
    try {
      const initData = req.body?.initData || "";
      console.info("[bootstrap] incoming request", {
        hasInitData: Boolean(initData),
        initDataLength: initData.length,
        allowUnsafeInitData: config.allowUnsafeInitData,
      });
      const { telegramUser } = resolveTelegramUser({
        initDataRaw: initData,
        botToken: config.botToken,
        allowUnsafeInitData: config.allowUnsafeInitData,
      });
      console.info("[bootstrap] initData received", {
        hasInitData: Boolean(initData),
        telegramUserId: telegramUser?.id ?? null,
        username: telegramUser?.username ?? null,
      });

      const payload = getLaunchPayload(db, telegramUser);
      const appToken = issueAppToken(
        {
          userId: payload.user.id,
          telegramId: payload.user.telegramId,
        },
        config
      );

      res.json({
        ok: true,
        miniAppUrl: config.miniAppUrl,
        appToken,
        user: toClientUser(payload.user),
      });
    } catch (error) {
      console.error("[bootstrap] failed", {
        message: error.message,
      });
      res.status(401).json({
        ok: false,
        error: error.message,
      });
    }
  });

  router.use(requireAppUser({ db, config }));

  router.get("/user", (req, res) => {
    console.info("[user] current session", {
      userId: req.appUser.id,
      username: req.appUser.username,
    });
    res.json({
      ok: true,
      user: toClientUser(req.appUser),
    });
  });

  router.get("/gifts", (_req, res) => {
    const gifts = getActiveGifts(db).map(toClientGift);
    res.json({
      ok: true,
      gifts,
    });
  });

  router.get("/youtube/search", async (req, res) => {
    try {
      const query = String(req.query?.q || "").trim();
      if (!query) {
        throw new Error("Search query is required.");
      }
      if (!config.mediaEnabled) {
        return res.status(503).json({
          ok: false,
          error: "Music search is disabled on this deployment.",
        });
      }

      const results = await searchYouTubeVideos({
        apiKey: config.youtubeApiKey,
        query,
      });

      console.info("[youtube/search]", {
        userId: req.appUser.id,
        query,
        count: results.length,
      });

      res.json({
        ok: true,
        query,
        results,
      });
    } catch (error) {
      res.status(400).json({
        ok: false,
        error: error.message,
      });
    }
  });

  router.get("/media/state", (req, res) => {
    console.info("[media/get]", {
      userId: req.appUser.id,
      type: roomManager.getMediaState()?.type ?? null,
    });
    res.json({
      ok: true,
      current: toCurrentMedia(roomManager.getMediaState()),
      pricing: getMediaPricing(config),
      user: toClientUser(req.appUser),
    });
  });

  router.get("/media/queue", (req, res) => {
    console.info("[media/queue/get]", {
      userId: req.appUser.id,
      count: roomManager.getMediaQueue().length,
    });
    res.json({
      ok: true,
      queue: roomManager.getMediaQueue().map(toQueueItem),
      pricing: getMediaPricing(config),
    });
  });

  router.post("/hearts/add", (req, res) => {
    try {
      const user = addHeartsToUser(db, req.appUser.id, req.body?.amount);
      roomManager.syncPlayer(user);
      broadcastRoomUpdate?.();

      res.json({
        ok: true,
        user: toClientUser(user),
      });
    } catch (error) {
      res.status(400).json({
        ok: false,
        error: error.message,
      });
    }
  });

  router.post("/room/join", (req, res) => {
    try {
      console.info("[room/join] incoming request", {
        userId: req.appUser.id,
        username: req.appUser.username,
      });
      const result = roomManager.joinRoom(req.appUser);
      const roomPayload = toRoomPayload(result.room, roomManager);
      console.info("[room/join]", {
        joined: result.joined,
        userId: req.appUser.id,
        username: req.appUser.username,
        playersCount: roomPayload.players.length,
        playerIds: roomPayload.players.map((player) => player.id),
        turnIndex: roomPayload.turn_index,
      });
      console.info("[room/join] response payload", {
        roomId: roomPayload.room_id,
        playersCount: roomPayload.players.length,
        turnIndex: roomPayload.turn_index,
      });
      broadcastRoomUpdate?.();

      res.json({
        ok: true,
        joined: result.joined,
        room: roomPayload,
      });
    } catch (error) {
      res.status(409).json({
        ok: false,
        error: error.message,
      });
    }
  });

  router.get("/room", (req, res) => {
    const roomPayload = toRoomPayload(roomManager.getRoomState(), roomManager);
    console.info("[room/get]", {
      userId: req.appUser.id,
      playersCount: roomPayload.players.length,
      playerIds: roomPayload.players.map((player) => player.id),
      turnIndex: roomPayload.turn_index,
    });
    console.info("[room/get] response payload", {
      roomId: roomPayload.room_id,
      playersCount: roomPayload.players.length,
      turnIndex: roomPayload.turn_index,
    });
    res.json({
      ok: true,
      room: roomPayload,
    });
  });

  router.get("/chat/messages", (req, res) => {
    const limit = req.query?.limit;
    const before = req.query?.before || null;
    const result = roomManager.getMessages({ limit, before });
    console.info("[chat/get]", {
      userId: req.appUser.id,
      before,
      limit: Number(limit) || 5,
      count: result.messages.length,
      hasMore: result.hasMore,
    });
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

      const roomPlayer = roomManager.findPlayer(req.appUser.id);
      if (!roomPlayer) {
        throw new Error("Join the room first.");
      }

      console.info("[chat/send] incoming request", {
        userId: req.appUser.id,
        username: req.appUser.username,
        length: text.length,
      });

      const message = roomManager.addChatMessage({
        user: req.appUser,
        text,
      });

      console.info("[chat/send] message stored", {
        id: message.id,
        roomId: message.room_id,
        userId: message.user_id,
      });

      broadcastChatMessage?.(toChatMessage(message));

      res.json({
        ok: true,
        room_id: roomManager.roomId,
        message: toChatMessage(message),
      });
    } catch (error) {
      res.status(400).json({
        ok: false,
        error: error.message,
      });
    }
  });

  router.post("/media/queue/add-audio", (req, res) => {
    try {
      if (!config.mediaEnabled) {
        throw new Error("Music playback is disabled on this deployment.");
      }
      const roomPlayer = roomManager.findPlayer(req.appUser.id);
      if (!roomPlayer) {
        throw new Error("Join the room first.");
      }

      const videoId = parseYouTubeVideoId(req.body?.videoId);
      const title = String(req.body?.title || "").trim() || "Room audio";
      const channelTitle = String(req.body?.channelTitle || "").trim() || null;
      const thumbnail = req.body?.thumbnail ? parseMediaUrl(req.body.thumbnail) : null;
      const access = spendHeartsForMediaPlayback(db, req.appUser.id, "audio", config);
      roomManager.syncPlayer(access.user);
      const mediaResult = roomManager.addMediaRequest({
        type: "audio",
        videoId,
        title,
        channelTitle,
        thumbnail,
        requestedByUser: access.user,
      });

      console.info("[media/queue/add-audio]", {
        userId: access.user.id,
        title,
        action: mediaResult.action,
        chargedHearts: access.chargedHearts,
        isVip: access.isVip,
      });

      broadcastRoomUpdate?.();
      broadcastMediaState?.(toCurrentMedia(mediaResult.current));
      broadcastMediaQueue?.(mediaResult.queue.map(toQueueItem));

      res.json({
        ok: true,
        user: toClientUser(access.user),
        action: mediaResult.action,
        current: toCurrentMedia(mediaResult.current),
        queue: mediaResult.queue.map(toQueueItem),
        charged_hearts: access.chargedHearts,
        pricing: getMediaPricing(config),
      });
    } catch (error) {
      res.status(400).json({
        ok: false,
        error: error.message,
      });
    }
  });

  router.post("/media/queue/add-video", (req, res) => {
    try {
      if (!config.mediaEnabled) {
        throw new Error("Music playback is disabled on this deployment.");
      }
      const roomPlayer = roomManager.findPlayer(req.appUser.id);
      if (!roomPlayer) {
        throw new Error("Join the room first.");
      }

      const videoId = parseYouTubeVideoId(req.body?.videoId);
      const title = String(req.body?.title || "").trim() || "Room video";
      const channelTitle = String(req.body?.channelTitle || "").trim() || null;
      const thumbnail = req.body?.thumbnail ? parseMediaUrl(req.body.thumbnail) : null;
      const access = spendHeartsForMediaPlayback(db, req.appUser.id, "video", config);
      roomManager.syncPlayer(access.user);
      const mediaResult = roomManager.addMediaRequest({
        type: "video",
        videoId,
        title,
        channelTitle,
        thumbnail,
        requestedByUser: access.user,
      });

      console.info("[media/queue/add-video]", {
        userId: access.user.id,
        title,
        action: mediaResult.action,
        chargedHearts: access.chargedHearts,
        isVip: access.isVip,
      });

      broadcastRoomUpdate?.();
      broadcastMediaState?.(toCurrentMedia(mediaResult.current));
      broadcastMediaQueue?.(mediaResult.queue.map(toQueueItem));

      res.json({
        ok: true,
        user: toClientUser(access.user),
        action: mediaResult.action,
        current: toCurrentMedia(mediaResult.current),
        queue: mediaResult.queue.map(toQueueItem),
        charged_hearts: access.chargedHearts,
        pricing: getMediaPricing(config),
      });
    } catch (error) {
      res.status(400).json({
        ok: false,
        error: error.message,
      });
    }
  });

  router.post("/media/queue/skip", (req, res) => {
    try {
      if (!roomManager.findPlayer(req.appUser.id)) {
        throw new Error("Join the room first.");
      }

      const current = roomManager.getMediaState();
      if (!current) {
        throw new Error("No active media in the room.");
      }

      const currentTurnUserId = roomManager.getRoomState().current_turn;
      const reason = String(req.body?.reason || "manual");
      const isRequester = current.requestedBy?.user_id === req.appUser.id;
      const canControl = isRequester || currentTurnUserId === req.appUser.id;

      if (reason !== "ended" && !canControl) {
        throw new Error("Only the current turn player or media requester can skip.");
      }

      const result = roomManager.skipMedia({
        currentId: req.body?.currentId || null,
      });

      console.info("[media/queue/skip]", {
        userId: req.appUser.id,
        reason,
        advanced: result.advanced,
        currentId: req.body?.currentId || null,
      });

      if (result.advanced) {
        broadcastMediaState?.(toCurrentMedia(result.current));
        broadcastMediaQueue?.(result.queue.map(toQueueItem));
      }

      res.json({
        ok: true,
        advanced: result.advanced,
        current: toCurrentMedia(result.current),
        queue: result.queue.map(toQueueItem),
      });
    } catch (error) {
      res.status(400).json({
        ok: false,
        error: error.message,
      });
    }
  });

  router.post("/media/mute", (req, res) => {
    try {
      if (!roomManager.findPlayer(req.appUser.id)) {
        throw new Error("Join the room first.");
      }

      const mediaState = roomManager.setMediaMuted(req.body?.isMuted);
      console.info("[media/mute]", {
        userId: req.appUser.id,
        isMuted: mediaState.isMuted,
      });
      broadcastMediaState?.(toCurrentMedia(mediaState));

      res.json({
        ok: true,
        current: toCurrentMedia(mediaState),
      });
    } catch (error) {
      res.status(400).json({
        ok: false,
        error: error.message,
      });
    }
  });

  router.post("/media/volume", (req, res) => {
    try {
      if (!roomManager.findPlayer(req.appUser.id)) {
        throw new Error("Join the room first.");
      }

      const volume = Number(req.body?.volume);
      if (!Number.isFinite(volume)) {
        throw new Error("Volume must be a number.");
      }

      const mediaState = roomManager.setMediaVolume(volume);
      console.info("[media/volume]", {
        userId: req.appUser.id,
        volume: mediaState.volume,
      });
      broadcastMediaState?.(toCurrentMedia(mediaState));

      res.json({
        ok: true,
        current: toCurrentMedia(mediaState),
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
      const joinedRoom = roomManager.joinRoom(req.appUser).room;
      if (!joinedRoom.players.find((player) => player.user_id === req.appUser.id)) {
        throw new Error("Join the room first.");
      }
      if (joinedRoom.current_turn && joinedRoom.current_turn !== req.appUser.id) {
        throw new Error("It is not your turn yet.");
      }

      const user = spendHeartForSpin(db, req.appUser.id);
      roomManager.syncPlayer(user);

      const room = roomManager.spinRoom(req.appUser.id);
      const resultPayload = room.last_result;
      addSpinHistory(db, req.appUser.id, resultPayload);
      broadcastRoomUpdate?.();

      res.json({
        ok: true,
        user: toClientUser(user),
        room: toRoomPayload(room, roomManager),
        result: resultPayload,
      });
    } catch (error) {
      res.status(400).json({
        ok: false,
        error: error.message,
      });
    }
  });

  router.post("/gifts/send", (req, res) => {
    try {
      const targetUserId = Number(req.body?.targetUserId);
      const giftId = Number(req.body?.giftId);

      if (!Number.isInteger(targetUserId) || targetUserId <= 0) {
        throw new Error("Target user is invalid.");
      }

      const targetPlayer = roomManager.findPlayer(targetUserId);
      if (!targetPlayer) {
        throw new Error("Target user is not in the room.");
      }

      const gift = getGiftById(db, giftId);
      if (!gift) {
        throw new Error("Gift not found.");
      }

      const result = sendGift(db, {
        fromUserId: req.appUser.id,
        toUserId: targetUserId,
        giftId,
      });

      roomManager.syncPlayer(result.sender);
      const message = roomManager.addGiftEvent({
        fromUser: result.sender,
        toUser: result.target,
        gift,
      });
      const room = roomManager.getRoomState();
      broadcastRoomUpdate?.();
      broadcastChatMessage?.(toChatMessage(message));

      res.json({
        ok: true,
        user: toClientUser(result.sender),
        room: toRoomPayload(room, roomManager),
        gift: toClientGift(gift),
        transaction: result.transaction,
        message: toChatMessage(message),
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
