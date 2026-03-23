const elements = {
  currentUser: document.querySelector("#currentUser"),
  currentUserAvatar: document.querySelector("#currentUserAvatar"),
  currentUserName: document.querySelector("#currentUserName"),
  currentUserMeta: document.querySelector("#currentUserMeta"),
  statusPill: document.querySelector("#statusPill"),
  roomMeta: document.querySelector("#roomMeta"),
  turnPill: document.querySelector("#turnPill"),
  playersLayer: document.querySelector("#playersLayer"),
  spinButton: document.querySelector("#spinButton"),
  spinResult: document.querySelector("#spinResult"),
  chatFeed: document.querySelector("#chatFeed"),
  chatForm: document.querySelector("#chatForm"),
  chatInput: document.querySelector("#chatInput"),
  toast: document.querySelector("#toast"),
};

const runtime = {
  appToken: null,
  user: null,
  room: createEmptyRoom(),
  messages: [],
  previewMode: false,
  socket: null,
  heartbeatTimer: null,
  chatPinnedToBottom: true,
  chatHasMore: true,
  chatLoadingOlder: false,
};

let toastTimer = null;

function createEmptyRoom() {
  return {
    room_id: "main",
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
  };
}

function initials(value) {
  return String(value || "P")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function toAvatarStyle(photoUrl) {
  if (!photoUrl) {
    return "";
  }

  return ` style="background-image:url('${encodeURI(photoUrl).replaceAll("'", "%27")}')"`;
}

function formatTime(value) {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getDisplayName(user) {
  return user?.first_name || user?.firstName || user?.username || "Player";
}

function setStatus(label, tone = "warn") {
  elements.statusPill.textContent = label;
  elements.statusPill.className = `status-pill status-pill--${tone}`;
}

function showToast(message) {
  if (!message) {
    return;
  }

  elements.toast.textContent = message;
  elements.toast.classList.remove("hidden");
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    elements.toast.classList.add("hidden");
  }, 3200);
}

function createPreviewUser() {
  const storageKey = "spin-preview-user";
  const existing = window.localStorage.getItem(storageKey);
  if (existing) {
    return JSON.parse(existing);
  }

  const suffix = Math.random().toString(36).slice(2, 8);
  const previewUser = {
    id: `preview-${suffix}`,
    username: `preview_${suffix}`,
    first_name: `Preview ${suffix.slice(0, 3)}`,
    photo_url: null,
  };
  window.localStorage.setItem(storageKey, JSON.stringify(previewUser));
  return previewUser;
}

async function apiRequest(path, options = {}) {
  const headers = new Headers(options.headers || {});
  if (!headers.has("Content-Type") && options.body !== undefined) {
    headers.set("Content-Type", "application/json");
  }
  if (runtime.appToken) {
    headers.set("Authorization", `Bearer ${runtime.appToken}`);
  }

  const response = await fetch(path, {
    method: options.method || "GET",
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    keepalive: Boolean(options.keepalive),
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch (_error) {
    payload = null;
  }

  if (!response.ok) {
    throw new Error(payload?.error || `${response.status} ${response.statusText}`);
  }

  return payload;
}

function mergeMessages(nextMessages, { prepend = false } = {}) {
  const merged = new Map();
  const source = prepend
    ? [...nextMessages, ...runtime.messages]
    : [...runtime.messages, ...nextMessages];

  for (const message of source) {
    merged.set(String(message.id), message);
  }

  runtime.messages = [...merged.values()].sort((a, b) => {
    const timeDiff = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    if (timeDiff !== 0) {
      return timeDiff;
    }
    return String(a.id).localeCompare(String(b.id));
  });
}

function getCurrentPlayer() {
  return runtime.room.players.find((player) => player.id === runtime.user?.id) ?? null;
}

function canCurrentUserSpin() {
  return Boolean(
    runtime.user &&
      runtime.room.players.length &&
      runtime.room.current_turn === runtime.user.id
  );
}

function isChatNearBottom() {
  const feed = elements.chatFeed;
  return feed.scrollHeight - feed.scrollTop - feed.clientHeight < 48;
}

function scrollChatToBottom() {
  elements.chatFeed.scrollTop = elements.chatFeed.scrollHeight;
}

function renderCurrentUser() {
  const user = runtime.user;
  if (!user) {
    elements.currentUserName.textContent = "Connecting...";
    elements.currentUserMeta.textContent = "Please wait";
    elements.currentUserAvatar.textContent = "S";
    elements.currentUserAvatar.classList.remove("is-photo");
    elements.currentUserAvatar.removeAttribute("style");
    return;
  }

  const label = getDisplayName(user);
  elements.currentUserName.textContent = label;
  elements.currentUserMeta.textContent = runtime.previewMode
    ? "Preview mode"
    : user.username
      ? `@${user.username}`
      : "Telegram Mini App";

  if (user.photo_url) {
    elements.currentUserAvatar.classList.add("is-photo");
    elements.currentUserAvatar.textContent = "";
    elements.currentUserAvatar.setAttribute("style", `background-image:url('${encodeURI(user.photo_url)}')`);
  } else {
    elements.currentUserAvatar.classList.remove("is-photo");
    elements.currentUserAvatar.removeAttribute("style");
    elements.currentUserAvatar.textContent = initials(label);
  }
}

function getSeatPosition(index, total) {
  if (total <= 1) {
    return { left: 50, top: 20 };
  }

  const angle = (-90 + (360 / total) * index) * (Math.PI / 180);
  const radiusX = total <= 4 ? 36 : 38;
  const radiusY = total <= 4 ? 28 : 31;
  return {
    left: 50 + Math.cos(angle) * radiusX,
    top: 50 + Math.sin(angle) * radiusY,
  };
}

function renderPlayers() {
  const players = runtime.room.players;
  console.log("[room/render] players", players);

  if (!players.length) {
    elements.playersLayer.innerHTML = '<div class="players-empty">No players in the room yet</div>';
    return;
  }

  elements.playersLayer.innerHTML = players
    .map((player, index) => {
      const seat = getSeatPosition(index, players.length);
      const isTurn = runtime.room.current_turn === player.id;
      const isOffline = !player.is_online;
      const badge = isTurn ? "Turn" : isOffline ? "Offline" : "Online";
      const badgeClass = isTurn ? "is-turn" : isOffline ? "is-offline" : "";
      const avatarClass = isTurn ? "player__avatar is-turn" : "player__avatar";
      const label = getDisplayName(player);

      return `
        <div class="player" style="left:${seat.left}%;top:${seat.top}%;">
          <span class="player__avatar ${player.photo_url ? "is-photo" : ""}"${toAvatarStyle(player.photo_url)}>
            ${player.photo_url ? "" : escapeHtml(initials(label))}
          </span>
          <span class="player__badge ${badgeClass}">${badge}</span>
          <span class="player__name">${escapeHtml(label)}</span>
          <span class="player__meta">${escapeHtml(player.username ? `@${player.username}` : "No username")}</span>
        </div>
      `;
    })
    .join("");
}

function renderRoomMeta() {
  const onlineCount = runtime.room.players.filter((player) => player.is_online).length;
  elements.roomMeta.textContent = `${onlineCount} players online`;

  if (!runtime.room.players.length) {
    elements.turnPill.textContent = "Waiting for players";
  } else if (runtime.room.current_turn === runtime.user?.id) {
    elements.turnPill.textContent = "Your turn";
  } else {
    const turnUser = runtime.room.players.find((player) => player.id === runtime.room.current_turn);
    elements.turnPill.textContent = turnUser
      ? `${getDisplayName(turnUser)} turn`
      : "Turn updating";
  }

  elements.spinButton.disabled = !canCurrentUserSpin();
  elements.spinButton.style.setProperty(
    "--rotation",
    `${runtime.room.bottle_state?.rotation ?? 0}deg`
  );

  if (!runtime.room.last_result) {
    elements.spinResult.textContent = "No spins yet";
    return;
  }

  const spinner = runtime.room.last_result.spinner_name || "Player";
  const target = runtime.room.last_result.target_name || "nobody";
  elements.spinResult.textContent = `${spinner} spun the bottle. Target: ${target}.`;
}

function renderChat({ forceScroll = false } = {}) {
  if (!runtime.messages.length) {
    elements.chatFeed.innerHTML = '<div class="chat-empty">No messages yet. Start the room chat.</div>';
    return;
  }

  const shouldScroll = forceScroll || runtime.chatPinnedToBottom;
  elements.chatFeed.innerHTML = runtime.messages
    .map((message) => {
      const label = message.first_name || message.username || "Player";
      return `
        <article class="message">
          <span class="message__avatar ${message.avatar ? "is-photo" : ""}"${toAvatarStyle(message.avatar)}>
            ${message.avatar ? "" : escapeHtml(initials(label))}
          </span>
          <div class="message__bubble">
            <div class="message__name">
              <span>${escapeHtml(label)}</span>
              <span class="message__time">${escapeHtml(formatTime(message.created_at))}</span>
            </div>
            <div class="message__text">${escapeHtml(message.text)}</div>
          </div>
        </article>
      `;
    })
    .join("");

  if (shouldScroll) {
    scrollChatToBottom();
  }
}

function renderAll({ forceChatScroll = false } = {}) {
  renderCurrentUser();
  renderPlayers();
  renderRoomMeta();
  renderChat({ forceScroll: forceChatScroll });
}

function applyRoom(room) {
  runtime.room = {
    ...createEmptyRoom(),
    ...(room || {}),
  };
  console.log("[room] state", runtime.room);
}

async function loadCurrentUser() {
  const data = await apiRequest("/api/user");
  runtime.user = data.user;
  renderCurrentUser();
}

async function joinRoom() {
  const data = await apiRequest("/api/room/join", {
    method: "POST",
  });
  applyRoom(data.room);
}

async function leaveRoom({ keepalive = false } = {}) {
  if (!runtime.appToken) {
    return;
  }

  try {
    await apiRequest("/api/room/leave", {
      method: "POST",
      keepalive,
    });
  } catch (_error) {
    // noop on unload
  }
}

async function loadRoom() {
  const data = await apiRequest("/api/room");
  applyRoom(data.room);
}

async function loadMessages({ before = null, forceScroll = false } = {}) {
  const params = new URLSearchParams();
  params.set("limit", before ? "20" : "5");
  if (before) {
    params.set("before", before);
  }

  const data = await apiRequest(`/api/chat/messages?${params.toString()}`);
  runtime.chatHasMore = Boolean(data.hasMore);
  mergeMessages(data.messages, { prepend: Boolean(before) });
  renderChat({ forceScroll });
}

async function sendMessage() {
  const text = elements.chatInput.value.trim();
  if (!text) {
    return;
  }

  try {
    const data = await apiRequest("/api/chat/send", {
      method: "POST",
      body: { text },
    });
    elements.chatInput.value = "";
    mergeMessages([data.message]);
    runtime.chatPinnedToBottom = true;
    renderChat({ forceScroll: true });
  } catch (error) {
    showToast(error.message);
  }
}

async function spinBottle() {
  if (!canCurrentUserSpin()) {
    showToast("It is not your turn yet.");
    return;
  }

  try {
    const data = await apiRequest("/api/spin", {
      method: "POST",
    });
    applyRoom(data.room);
    renderAll();
  } catch (error) {
    showToast(error.message);
  }
}

function startHeartbeat() {
  stopHeartbeat();
  runtime.heartbeatTimer = window.setInterval(() => {
    runtime.socket?.emit("presence:ping");
  }, 15_000);
}

function stopHeartbeat() {
  if (runtime.heartbeatTimer) {
    window.clearInterval(runtime.heartbeatTimer);
    runtime.heartbeatTimer = null;
  }
}

function connectSocket() {
  if (!window.io || !runtime.appToken) {
    return;
  }

  runtime.socket?.disconnect();
  runtime.socket = window.io(window.location.origin, {
    path: "/socket.io",
    transports: ["websocket", "polling"],
    secure: window.location.protocol === "https:",
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    auth: {
      token: runtime.appToken,
    },
  });

  runtime.socket.on("connect", async () => {
    console.log("[socket] connected", runtime.socket.id);
    setStatus(runtime.previewMode ? "Preview connected" : "Connected", "ok");
    startHeartbeat();

    try {
      await joinRoom();
      await loadRoom();
      renderAll();
    } catch (error) {
      showToast(error.message);
    }
  });

  runtime.socket.on("room_updated", (room) => {
    console.log("[socket] room_updated", room);
    applyRoom(room);
    renderAll();
  });

  runtime.socket.on("turn_updated", (payload) => {
    console.log("[socket] turn_updated", payload);
    runtime.room = {
      ...runtime.room,
      ...payload,
    };
    renderRoomMeta();
  });

  runtime.socket.on("chat_message", (message) => {
    console.log("[socket] chat_message", message);
    const shouldScroll = runtime.chatPinnedToBottom;
    mergeMessages([message]);
    renderChat({ forceScroll: shouldScroll });
  });

  runtime.socket.on("disconnect", (reason) => {
    console.warn("[socket] disconnect", reason);
    stopHeartbeat();
    setStatus("Reconnecting...", "warn");
  });

  runtime.socket.on("connect_error", (error) => {
    console.error("[socket] connect_error", error);
    setStatus("Socket failed", "error");
    showToast(error.message || "WebSocket failed");
  });
}

async function bootstrapApp() {
  setStatus("Launching Mini App...", "warn");

  try {
    const telegram = window.Telegram?.WebApp;
    telegram?.ready();
    telegram?.expand();

    const initData = telegram?.initData || "";
    const previewUser = initData ? null : createPreviewUser();
    const data = await apiRequest("/api/bootstrap", {
      method: "POST",
      body: initData ? { initData } : { previewUser },
    });

    runtime.appToken = data.appToken;
    runtime.user = data.user;
    runtime.previewMode = Boolean(data.previewMode);

    await loadCurrentUser();
    await joinRoom();
    await loadRoom();
    await loadMessages({ forceScroll: true });

    renderAll({ forceChatScroll: true });
    connectSocket();
    setStatus(runtime.previewMode ? "Preview mode" : "Connected", "ok");
  } catch (error) {
    console.error("[bootstrap] failed", error);
    setStatus("Launch failed", "error");
    showToast(error.message || "Mini App bootstrap failed");
  }
}

elements.chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  void sendMessage();
});

elements.chatInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    void sendMessage();
  }
});

elements.spinButton.addEventListener("click", () => {
  void spinBottle();
});

elements.chatFeed.addEventListener("scroll", () => {
  runtime.chatPinnedToBottom = isChatNearBottom();
  if (elements.chatFeed.scrollTop < 24 && runtime.chatHasMore && !runtime.chatLoadingOlder) {
    const oldest = runtime.messages[0];
    if (!oldest) {
      return;
    }
    runtime.chatLoadingOlder = true;
    void loadMessages({ before: oldest.id }).finally(() => {
      runtime.chatLoadingOlder = false;
    });
  }
});

window.addEventListener("pagehide", () => {
  void leaveRoom({ keepalive: true });
  stopHeartbeat();
});

bootstrapApp();
