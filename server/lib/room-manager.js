const MAIN_ROOM_ID = "main";
const DEFAULT_MAX_PLAYERS = 10;

function cloneRoomState(room) {
  return JSON.parse(JSON.stringify(room));
}

function nowIso() {
  return new Date().toISOString();
}

function getDisplayName(user) {
  return user.firstName || user.first_name || user.username || `user_${user.telegramId ?? user.telegram_id ?? user.id}`;
}

function toRoomPlayer(user, overrides = {}) {
  const photoUrl = overrides.photo_url ?? user.photo_url ?? user.photoUrl ?? null;
  return {
    user_id: overrides.user_id ?? user.id ?? user.user_id,
    telegram_id: overrides.telegram_id ?? user.telegramId ?? user.telegram_id ?? null,
    username: overrides.username ?? user.username ?? null,
    first_name: overrides.first_name ?? user.firstName ?? user.first_name ?? null,
    photo_url: photoUrl,
    avatar: photoUrl,
    hearts: overrides.hearts ?? user.hearts ?? 0,
    is_online: overrides.is_online ?? true,
    joined_at: overrides.joined_at ?? user.joined_at ?? nowIso(),
  };
}

function toRoomMessage({
  id,
  roomId,
  userId,
  username = null,
  firstName = null,
  avatar = null,
  text,
  createdAt,
  type = "chat",
  note = null,
  extra = {},
}) {
  const displayName = firstName || username || "Player";
  return {
    id,
    room_id: roomId,
    user_id: userId,
    from_user_id: userId,
    username,
    first_name: firstName,
    from_name: displayName,
    avatar,
    photo_url: avatar,
    text,
    type,
    note,
    created_at: createdAt,
    ...extra,
  };
}

function toRequestedBy(user) {
  return {
    user_id: user.id ?? user.user_id,
    telegram_id: user.telegramId ?? user.telegram_id ?? null,
    username: user.username ?? null,
    first_name: user.firstName ?? user.first_name ?? null,
    avatar: user.photoUrl ?? user.photo_url ?? null,
  };
}

function createEmptyMediaState() {
  return {
    current: null,
    queue: [],
  };
}

export function createRoomManager(options = {}) {
  const maxPlayers = options.maxPlayers ?? DEFAULT_MAX_PLAYERS;
  const room = {
    room_id: MAIN_ROOM_ID,
    players: [],
    turn_index: -1,
    current_turn: null,
    messages: [],
    media: createEmptyMediaState(),
    bottle_state: {
      rotation: 0,
      spinning: false,
      last_spinner_user_id: null,
      target_user_id: null,
    },
    last_result: null,
  };

  function appendMessage(message) {
    room.messages.push(message);
    room.messages = room.messages.slice(-50);
    return message;
  }

  function findPlayerIndex(userId) {
    return room.players.findIndex((player) => player.user_id === userId);
  }

  function findPlayer(userId) {
    return room.players.find((player) => player.user_id === userId) ?? null;
  }

  function syncTurnPointers() {
    if (!room.players.length) {
      room.turn_index = -1;
      room.current_turn = null;
      return;
    }

    if (!Number.isInteger(room.turn_index) || room.turn_index < 0) {
      room.turn_index = 0;
    }

    if (room.turn_index >= room.players.length) {
      room.turn_index = 0;
    }

    room.current_turn = room.players[room.turn_index]?.user_id ?? null;
  }

  function getRoomState() {
    syncTurnPointers();
    return cloneRoomState(room);
  }

  function getMedia() {
    return cloneRoomState(room.media);
  }

  function getMediaState() {
    return cloneRoomState(room.media.current);
  }

  function getMediaQueue() {
    return cloneRoomState(room.media.queue);
  }

  function getMessages(options = {}) {
    const limit = Number(options.limit) > 0 ? Math.min(Number(options.limit), 50) : 5;
    const before = options.before || null;
    let messages = [...room.messages];

    if (before) {
      const beforeIndex = messages.findIndex((message) => String(message.id) === String(before));
      if (beforeIndex >= 0) {
        messages = messages.slice(0, beforeIndex);
      } else {
        messages = messages.filter((message) => String(message.created_at) < String(before));
      }
    }

    const hasMore = messages.length > limit;
    const sliced = messages.slice(-limit);

    return {
      messages: cloneRoomState(sliced),
      hasMore,
    };
  }

  function joinRoom(user) {
    const existingIndex = findPlayerIndex(user.id);
    if (existingIndex >= 0) {
      room.players[existingIndex] = {
        ...room.players[existingIndex],
        ...toRoomPlayer(user, {
          joined_at: room.players[existingIndex].joined_at,
          is_online: true,
        }),
      };
      syncTurnPointers();
      console.info("[room-manager] existing player sync", {
        userId: user.id,
        playersCount: room.players.length,
        turnIndex: room.turn_index,
      });
      return {
        joined: false,
        room: getRoomState(),
      };
    }

    if (room.players.length >= maxPlayers) {
      throw new Error("Room is full.");
    }

    room.players.push(toRoomPlayer(user, { is_online: true }));
    if (room.turn_index < 0) {
      room.turn_index = 0;
    }
    syncTurnPointers();
    console.info("[room-manager] player joined", {
      userId: user.id,
      playersCount: room.players.length,
      turnIndex: room.turn_index,
    });

    return {
      joined: true,
      room: getRoomState(),
    };
  }

  function leaveRoom(userId) {
    const playerIndex = findPlayerIndex(userId);
    if (playerIndex < 0) {
      return {
        left: false,
        room: getRoomState(),
      };
    }

    room.players.splice(playerIndex, 1);

    if (!room.players.length) {
      room.turn_index = -1;
      room.current_turn = null;
      room.last_result = null;
      room.media = createEmptyMediaState();
      room.bottle_state = {
        rotation: room.bottle_state.rotation,
        spinning: false,
        last_spinner_user_id: room.bottle_state.last_spinner_user_id,
        target_user_id: null,
      };
    } else if (playerIndex < room.turn_index) {
      room.turn_index -= 1;
    } else if (playerIndex === room.turn_index) {
      room.turn_index = room.turn_index % room.players.length;
    }

    syncTurnPointers();
    console.info("[room-manager] player left", {
      userId,
      playersCount: room.players.length,
      turnIndex: room.turn_index,
    });

    return {
      left: true,
      room: getRoomState(),
    };
  }

  function syncPlayer(user) {
    const playerIndex = findPlayerIndex(user.id);
    if (playerIndex < 0) {
      return getRoomState();
    }

    room.players[playerIndex] = {
      ...room.players[playerIndex],
      ...toRoomPlayer(user, {
        joined_at: room.players[playerIndex].joined_at,
        is_online: room.players[playerIndex].is_online,
      }),
    };

    if (room.media.current?.requestedBy?.user_id === user.id) {
      room.media.current.requestedBy = toRequestedBy(user);
    }

    room.media.queue = room.media.queue.map((item) =>
      item.requestedBy?.user_id === user.id
        ? {
            ...item,
            requestedBy: toRequestedBy(user),
          }
        : item
    );

    syncTurnPointers();
    return getRoomState();
  }

  function addGiftEvent({ fromUser, toUser, gift }) {
    return appendMessage(
      toRoomMessage({
        id: `gift-${Date.now()}-${fromUser.id}-${toUser.id}-${gift.id}`,
        roomId: room.room_id,
        userId: fromUser.id,
        username: fromUser.username ?? null,
        firstName: fromUser.firstName ?? fromUser.first_name ?? null,
        avatar: fromUser.photoUrl ?? fromUser.photo_url ?? null,
        text: `${getDisplayName(fromUser)} sent ${gift.emoji} to ${getDisplayName(toUser)}`,
        createdAt: nowIso(),
        type: "gift",
        note: `${gift.emoji} gift`,
        extra: {
          to_user_id: toUser.id,
          to_name: getDisplayName(toUser),
          gift_id: gift.id,
          gift_code: gift.code,
          gift_title: gift.title,
          gift_emoji: gift.emoji,
        },
      })
    );
  }

  function addChatMessage({ user, text }) {
    const createdAt = nowIso();
    return appendMessage(
      toRoomMessage({
        id: `chat-${Date.now()}-${user.id}`,
        roomId: room.room_id,
        userId: user.id,
        username: user.username ?? null,
        firstName: user.firstName ?? user.first_name ?? null,
        avatar: user.photoUrl ?? user.photo_url ?? null,
        text,
        createdAt,
        type: "chat",
      })
    );
  }

  function createMediaItem({ type, videoId, title, requestedByUser, channelTitle = null, thumbnail = null }) {
    return {
      id: `media-${Date.now()}-${requestedByUser.id}-${Math.random().toString(36).slice(2, 8)}`,
      type: type === "video" ? "video" : "audio",
      videoId,
      title,
      channelTitle,
      thumbnail,
      requestedBy: toRequestedBy(requestedByUser),
      createdAt: nowIso(),
    };
  }

  function toCurrentMedia(item, previousCurrent = null) {
    return {
      id: item.id,
      type: item.type,
      videoId: item.videoId,
      title: item.title,
      channelTitle: item.channelTitle ?? null,
      thumbnail: item.thumbnail ?? null,
      requestedBy: item.requestedBy,
      startedAt: nowIso(),
      isMuted: previousCurrent?.isMuted ?? false,
      volume: previousCurrent?.volume ?? 80,
    };
  }

  function countQueuedItemsByUser(userId) {
    return room.media.queue.filter((item) => item.requestedBy?.user_id === userId).length;
  }

  function addMediaRequest({ type, videoId, title, requestedByUser, channelTitle = null, thumbnail = null }) {
    const nextItem = createMediaItem({
      type,
      videoId,
      title,
      requestedByUser,
      channelTitle,
      thumbnail,
    });

    if (!room.media.current) {
      room.media.current = toCurrentMedia(nextItem, room.media.current);
      return {
        action: "started",
        current: getMediaState(),
        queue: getMediaQueue(),
        item: cloneRoomState(nextItem),
      };
    }

    if (countQueuedItemsByUser(requestedByUser.id) >= 2) {
      throw new Error("You already have 2 pending media requests in the queue.");
    }

    room.media.queue.push(nextItem);
    room.media.queue = room.media.queue.slice(-30);

    return {
      action: "queued",
      current: getMediaState(),
      queue: getMediaQueue(),
      item: cloneRoomState(nextItem),
    };
  }

  function skipMedia({ currentId = null } = {}) {
    if (!room.media.current) {
      throw new Error("No active media in the room.");
    }

    if (currentId && room.media.current.id !== currentId) {
      return {
        advanced: false,
        current: getMediaState(),
        queue: getMediaQueue(),
      };
    }

    const previousCurrent = room.media.current;
    const nextItem = room.media.queue.shift() ?? null;

    room.media.current = nextItem ? toCurrentMedia(nextItem, previousCurrent) : null;

    return {
      advanced: true,
      current: getMediaState(),
      queue: getMediaQueue(),
    };
  }

  function setMediaMuted(isMuted) {
    if (!room.media.current) {
      throw new Error("No active media in the room.");
    }

    room.media.current = {
      ...room.media.current,
      isMuted: Boolean(isMuted),
    };

    return getMediaState();
  }

  function setMediaVolume(volume) {
    if (!room.media.current) {
      throw new Error("No active media in the room.");
    }

    const nextVolume = Math.min(Math.max(Number(volume), 0), 100);
    room.media.current = {
      ...room.media.current,
      volume: nextVolume,
    };

    return getMediaState();
  }

  function spinRoom(spinnerUserId) {
    const spinnerIndex = findPlayerIndex(spinnerUserId);
    if (spinnerIndex < 0) {
      throw new Error("User is not in the main room.");
    }

    syncTurnPointers();
    if (room.current_turn && room.current_turn !== spinnerUserId) {
      throw new Error("It is not your turn yet.");
    }

    const spinner = room.players[spinnerIndex];
    const otherPlayers = room.players.filter((player) => player.user_id !== spinnerUserId);
    const targetPlayer = otherPlayers.length
      ? otherPlayers[Math.floor(Math.random() * otherPlayers.length)]
      : null;

    const nextRotation = room.bottle_state.rotation + 720 + Math.floor(Math.random() * 360);

    room.bottle_state = {
      rotation: nextRotation,
      spinning: false,
      last_spinner_user_id: spinner.user_id,
      target_user_id: targetPlayer?.user_id ?? null,
    };

    room.last_result = {
      spinner_user_id: spinner.user_id,
      spinner_username: spinner.username,
      spinner_name: getDisplayName(spinner),
      target_user_id: targetPlayer?.user_id ?? null,
      target_username: targetPlayer?.username ?? null,
      target_name: targetPlayer ? getDisplayName(targetPlayer) : null,
      rotation: nextRotation,
      created_at: nowIso(),
    };

    room.turn_index = room.players.length ? (spinnerIndex + 1) % room.players.length : -1;
    syncTurnPointers();
    console.info("[room-manager] spin", {
      spinnerUserId,
      targetUserId: targetPlayer?.user_id ?? null,
      turnIndex: room.turn_index,
      currentTurn: room.current_turn,
      playersCount: room.players.length,
    });

    return getRoomState();
  }

  return {
    roomId: MAIN_ROOM_ID,
    maxPlayers,
    getRoomState,
    getMedia,
    getMediaState,
    getMediaQueue,
    getMessages,
    joinRoom,
    leaveRoom,
    syncPlayer,
    findPlayer,
    addGiftEvent,
    addChatMessage,
    addMediaRequest,
    skipMedia,
    setMediaMuted,
    setMediaVolume,
    spinRoom,
  };
}
