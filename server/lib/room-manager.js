const MAIN_ROOM_ID = "main";
const DEFAULT_MAX_PLAYERS = 10;
const DEFAULT_STALE_MS = 45_000;
const MAX_MESSAGES = 100;

function nowIso() {
  return new Date().toISOString();
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function getDisplayName(user) {
  return (
    user.firstName ||
    user.first_name ||
    user.username ||
    `user_${user.telegramId ?? user.telegram_id ?? user.id}`
  );
}

function toRoomPlayer(user, overrides = {}) {
  return {
    id: overrides.id ?? user.id,
    user_id: overrides.user_id ?? user.id,
    telegram_id: overrides.telegram_id ?? user.telegramId ?? user.telegram_id ?? null,
    username: overrides.username ?? user.username ?? null,
    first_name: overrides.first_name ?? user.firstName ?? user.first_name ?? null,
    photo_url: overrides.photo_url ?? user.photoUrl ?? user.photo_url ?? null,
    avatar: overrides.avatar ?? user.photoUrl ?? user.photo_url ?? null,
    is_online: overrides.is_online ?? true,
    joined_at: overrides.joined_at ?? nowIso(),
    last_seen_at: overrides.last_seen_at ?? nowIso(),
  };
}

function toChatMessage(user, text) {
  return {
    id: createId("chat"),
    room_id: MAIN_ROOM_ID,
    user_id: user.id,
    username: user.username ?? null,
    first_name: user.firstName ?? user.first_name ?? null,
    avatar: user.photoUrl ?? user.photo_url ?? null,
    text,
    created_at: nowIso(),
  };
}

export function createRoomManager(options = {}) {
  const maxPlayers = options.maxPlayers ?? DEFAULT_MAX_PLAYERS;
  const staleMs = options.staleMs ?? DEFAULT_STALE_MS;

  const room = {
    room_id: MAIN_ROOM_ID,
    players: [],
    turn_index: -1,
    current_turn: null,
    bottle_state: {
      rotation: 0,
      spinning: false,
      last_spinner_user_id: null,
      target_user_id: null,
    },
    last_result: null,
    messages: [],
  };

  function findPlayerIndex(userId) {
    return room.players.findIndex((player) => player.user_id === userId);
  }

  function findPlayer(userId) {
    return room.players.find((player) => player.user_id === userId) ?? null;
  }

  function syncTurn() {
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
    syncTurn();
    return clone(room);
  }

  function getTurnPayload() {
    syncTurn();
    return {
      room_id: room.room_id,
      turn_index: room.turn_index,
      current_turn: room.current_turn,
      bottle_state: clone(room.bottle_state),
      last_result: clone(room.last_result),
    };
  }

  function getMessages({ limit = 5, before = null } = {}) {
    const safeLimit = Math.max(1, Math.min(Number(limit) || 5, 50));
    let messages = [...room.messages];

    if (before) {
      const beforeIndex = messages.findIndex((message) => String(message.id) === String(before));
      if (beforeIndex >= 0) {
        messages = messages.slice(0, beforeIndex);
      }
    }

    return {
      messages: clone(messages.slice(-safeLimit)),
      hasMore: messages.length > safeLimit,
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
          last_seen_at: nowIso(),
        }),
      };
      syncTurn();
      return {
        joined: false,
        room: getRoomState(),
      };
    }

    if (room.players.length >= maxPlayers) {
      throw new Error("Room is full.");
    }

    room.players.push(toRoomPlayer(user));
    if (room.turn_index < 0) {
      room.turn_index = 0;
    }
    syncTurn();

    return {
      joined: true,
      room: getRoomState(),
    };
  }

  function removePlayer(userId) {
    const playerIndex = findPlayerIndex(userId);
    if (playerIndex < 0) {
      return false;
    }

    room.players.splice(playerIndex, 1);

    if (!room.players.length) {
      room.turn_index = -1;
      room.current_turn = null;
      room.last_result = null;
      room.bottle_state = {
        rotation: room.bottle_state.rotation,
        spinning: false,
        last_spinner_user_id: null,
        target_user_id: null,
      };
      return true;
    }

    if (playerIndex < room.turn_index) {
      room.turn_index -= 1;
    } else if (playerIndex === room.turn_index) {
      room.turn_index = room.turn_index % room.players.length;
    }

    syncTurn();
    return true;
  }

  function leaveRoom(userId) {
    const left = removePlayer(userId);
    return {
      left,
      room: getRoomState(),
    };
  }

  function markOnline(userId) {
    const playerIndex = findPlayerIndex(userId);
    if (playerIndex < 0) {
      return getRoomState();
    }

    room.players[playerIndex] = {
      ...room.players[playerIndex],
      is_online: true,
      last_seen_at: nowIso(),
    };
    return getRoomState();
  }

  function markOffline(userId) {
    const playerIndex = findPlayerIndex(userId);
    if (playerIndex < 0) {
      return getRoomState();
    }

    room.players[playerIndex] = {
      ...room.players[playerIndex],
      is_online: false,
      last_seen_at: nowIso(),
    };
    return getRoomState();
  }

  function markHeartbeat(userId) {
    const playerIndex = findPlayerIndex(userId);
    if (playerIndex < 0) {
      return getRoomState();
    }

    room.players[playerIndex] = {
      ...room.players[playerIndex],
      is_online: true,
      last_seen_at: nowIso(),
    };
    return getRoomState();
  }

  function sweepStalePlayers() {
    const now = Date.now();
    const stalePlayers = room.players.filter((player) => {
      const lastSeen = new Date(player.last_seen_at || 0).getTime();
      return !player.is_online && now - lastSeen > staleMs;
    });

    if (!stalePlayers.length) {
      return {
        changed: false,
        room: getRoomState(),
      };
    }

    for (const stalePlayer of stalePlayers) {
      removePlayer(stalePlayer.user_id);
    }

    return {
      changed: true,
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
        last_seen_at: room.players[playerIndex].last_seen_at,
      }),
    };

    return getRoomState();
  }

  function addChatMessage({ user, text }) {
    const message = toChatMessage(user, text);
    room.messages.push(message);
    room.messages = room.messages.slice(-MAX_MESSAGES);
    return clone(message);
  }

  function spinRoom(userId) {
    syncTurn();

    if (!room.players.length) {
      throw new Error("Room is empty.");
    }

    if (room.current_turn !== userId) {
      throw new Error("It is not your turn yet.");
    }

    const spinner = findPlayer(userId);
    if (!spinner) {
      throw new Error("Join the room first.");
    }

    const targetPool = room.players.filter((player) => player.user_id !== userId);
    const target =
      targetPool[Math.floor(Math.random() * Math.max(targetPool.length, 1))] ?? null;
    const rotation = room.bottle_state.rotation + 720 + Math.floor(Math.random() * 360);

    room.bottle_state = {
      rotation,
      spinning: false,
      last_spinner_user_id: userId,
      target_user_id: target?.user_id ?? null,
    };

    room.last_result = {
      spinner_user_id: spinner.user_id,
      spinner_username: spinner.username,
      spinner_name: getDisplayName(spinner),
      target_user_id: target?.user_id ?? null,
      target_username: target?.username ?? null,
      target_name: target ? getDisplayName(target) : null,
      rotation,
      created_at: nowIso(),
    };

    room.turn_index = room.players.length
      ? (room.turn_index + 1) % room.players.length
      : -1;
    syncTurn();

    return getRoomState();
  }

  return {
    roomId: MAIN_ROOM_ID,
    getRoomState,
    getTurnPayload,
    getMessages,
    joinRoom,
    leaveRoom,
    markOnline,
    markOffline,
    markHeartbeat,
    sweepStalePlayers,
    syncPlayer,
    findPlayer,
    addChatMessage,
    spinRoom,
  };
}
