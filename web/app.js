const playerFrames = [
  "frame-gold",
  "frame-neon",
  "frame-leaf",
  "frame-sun",
  "frame-orbit",
  "frame-night",
  "frame-candy",
];

const heartPacks = [
  { id: "h50", title: "Starter", hearts: 50, stars: 50, bonus: "Fast refill" },
  { id: "h250", title: "Light pack", hearts: 250, stars: 250, bonus: "Easy for a short session" },
  { id: "h500", title: "Classic pack", hearts: 500, stars: 500, bonus: "Good for casual play" },
  { id: "h1200", title: "Best pick", hearts: 1200, stars: 1000, bonus: "20% bonus included" },
  { id: "h3125", title: "Gold barrel", hearts: 3125, stars: 2500, bonus: "25% bonus included" },
  { id: "h7000", title: "Best offer", hearts: 7000, stars: 5000, bonus: "40% bonus included" },
];

const boosters = [
  { id: "kiss", icon: "&#128139;", title: "Choice booster", count: 32, note: "Send a hotter choice" },
  { id: "clap", icon: "&#128079;", title: "Applause booster", count: 38, note: "Push the round forward" },
  { id: "starx2", icon: "x2", title: "League booster", count: 40, note: "Double star points" },
  { id: "route", icon: "&#128171;", title: "Kiss route", count: 15, note: "Redirect a kiss chain" },
  { id: "plus5", icon: "+5", title: "Bonus stars", count: 37, note: "Adds five extra league points" },
];

const tables = [
  { id: "157", name: "Main room #157", boys: 6, girls: 6 },
  { id: "202", name: "Bottle room #202", boys: 4, girls: 6 },
  { id: "88", name: "Late night #88", boys: 2, girls: 2 },
  { id: "309", name: "Friends table #309", boys: 5, girls: 3 },
  { id: "24", name: "Quick random #24", boys: 1, girls: 1 },
];

const achievements = [
  { id: "coffee", label: "Coffee", stars: 3 },
  { id: "mix", label: "Mixer", stars: 3 },
  { id: "travel", label: "Paris", stars: 2 },
  { id: "gift", label: "Gift", stars: 2 },
  { id: "energy", label: "Energy", stars: 2 },
  { id: "party", label: "Party", stars: 3 },
  { id: "tractor", label: "Tractor", stars: 4 },
  { id: "boots", label: "Boots", stars: 2 },
  { id: "hero", label: "Hero", stars: 5 },
  { id: "beat", label: "Beat", stars: 5 },
  { id: "disco", label: "Disco", stars: 4 },
  { id: "flowers", label: "Bloom", stars: 3 },
];

const ratingEntries = [
  { rank: 1, name: "Night Fox", score: 4073572 },
  { rank: 2, name: "Denis", score: 3980645 },
  { rank: 3, name: "MiRage", score: 3970166 },
  { rank: 4, name: "Harker", score: 3867321 },
  { rank: 5, name: "Naqos", score: 3726541 },
  { rank: 6, name: "Derzkay", score: 3717128 },
  { rank: 7, name: "Azamat", score: 3360351 },
  { rank: 8, name: "Bezymie", score: 3347290 },
  { rank: 9, name: "Rays", score: 3245309 },
];

const tracks = [
  { id: "samehtak", title: "Samehtak 2", artist: "DJ Tab x DJ Joker", duration: "6:14", view: "grid" },
  { id: "dumba-remix", title: "Dumba Remix", artist: "Massa", duration: "3:38", view: "grid" },
  { id: "sweater-weather", title: "Sweater Weather", artist: "The Neighbourhood", duration: "4:13", view: "grid" },
  { id: "bolalar", title: "Bolalar", artist: "Shamol HD Audio", duration: "5:13", view: "grid" },
  { id: "oy-yuzingga", title: "Oy yuzingga", artist: "Sherali Jo'rayev", duration: "4:04", view: "grid" },
  { id: "meni-yoqlab", title: "Meni yo'qlab kelgan", artist: "Jaloliddin Ahmadaliyev", duration: "3:15", view: "grid" },
  { id: "night-drive", title: "Love Morning", artist: "DJ 187", duration: "6:54", view: "list" },
  { id: "aramin", title: "Aramin", artist: "Tata Simonyan", duration: "4:28", view: "list" },
  { id: "motylek", title: "Motylek", artist: "Unesennye Vetrom", duration: "3:25", view: "list" },
  { id: "visions", title: "Visions", artist: "Armenchik", duration: "4:30", view: "list" },
];

const bottles = [
  { id: "classic", name: "Classic glass", cost: 5 },
  { id: "amber", name: "Amber malt", cost: 5 },
  { id: "spark", name: "Spark gold", cost: 5 },
  { id: "frost", name: "Frost bottle", cost: 5 },
  { id: "champagne", name: "Champagne", cost: 5 },
];

const frames = [
  { id: "frame-leaf", label: "Season set", cost: 0, note: "Current frame" },
  { id: "frame-night", label: "Night frame", cost: 500, note: "Locked decor" },
  { id: "frame-sun", label: "Sun frame", cost: 500, note: "Warm seasonal set" },
  { id: "frame-candy", label: "Candy frame", cost: 500, note: "Playful profile look" },
  { id: "frame-gold", label: "Golden frame", cost: 500, note: "Elegant classic border" },
  { id: "frame-neon", label: "Neon frame", cost: 500, note: "Bright table look" },
  { id: "frame-orbit", label: "Orbit frame", cost: 500, note: "League style highlight" },
];

const state = createInitialState();

const elements = {
  heartsCount: document.querySelector("#heartsCount"),
  tableCount: document.querySelector("#tableCount"),
  turnLabel: document.querySelector("#turnLabel"),
  playersLayer: document.querySelector("#playersLayer"),
  choicePanel: document.querySelector("#choicePanel"),
  mediaPanel: document.querySelector("#mediaPanel"),
  mediaSummary: document.querySelector("#mediaSummary"),
  mediaPlayerWrap: document.querySelector("#mediaPlayerWrap"),
  youtubePlayerHost: document.querySelector("#youtubePlayerHost"),
  chatFeed: document.querySelector("#chatFeed"),
  chatInput: document.querySelector("#chatInput"),
  hubMenu: document.querySelector("#hubMenu"),
  modalRoot: document.querySelector("#modalRoot"),
  shopStrip: document.querySelector("#shopStrip"),
  spinButton: document.querySelector("#spinButton"),
  toast: document.querySelector("#toast"),
  launchPill: document.querySelector("#launchPill"),
};

let toastTimer = null;
const launchState = {
  tone: "warn",
  label: "Launching Mini App...",
};
const runtime = {
  appToken: null,
  user: null,
  room: createEmptyRoomState(),
  mediaState: createEmptyMediaState(),
  mediaPricing: {
    enabled: true,
    audio: 5,
    video: 12,
  },
  gifts: [],
  socket: null,
  referrals: null,
  youtubeResults: [],
  mediaPlayer: {
    apiPromise: null,
    player: null,
    ready: false,
    currentKey: null,
    skipInFlightForId: null,
  },
};

function createEmptyMediaState() {
  return {
    current: null,
    queue: [],
  };
}

function createEmptyRoomState() {
  return {
    room_id: "main",
    players: [],
    turn_index: -1,
    messages: [],
    media: createEmptyMediaState(),
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

function toClientTelegramUser(user) {
  return {
    id: user.id,
    username: user.username || null,
    firstName: user.first_name || null,
    lastName: user.last_name || null,
    photoUrl: user.photo_url || null,
    displayName: user.first_name || user.username || "Telegram user",
    hearts: typeof user.hearts === "number" ? user.hearts : 0,
    isPremium: Boolean(user.is_premium),
    isVip: Boolean(user.is_premium),
  };
}

function getDisplayName(entity) {
  if (!entity) {
    return "Player";
  }

  return entity.firstName || entity.first_name || entity.name || entity.displayName || entity.username || "Player";
}

function getUsernameLabel(entity) {
  const username = entity?.username || null;
  return username ? `@${username}` : "No username";
}

function toAvatarUrl(url) {
  if (!url) {
    return "";
  }

  return encodeURI(url)
    .replaceAll("'", "%27")
    .replaceAll("(", "%28")
    .replaceAll(")", "%29");
}

function renderAvatarMarkup(className, label, photoUrl, extraClass = "") {
  const classes = [className, extraClass, photoUrl ? "is-photo" : ""].filter(Boolean).join(" ");
  const style = photoUrl ? ` style="background-image:url('${toAvatarUrl(photoUrl)}')"` : "";
  const fallback = photoUrl ? "" : initials(label);
  return `<span class="${classes}"${style}>${fallback}</span>`;
}

function createProfileData(userLike, overrides = {}) {
  const hearts = userLike?.hearts ?? 0;
  return {
    id: overrides.id ?? (userLike?.id ? `room-${userLike.id}` : "profile"),
    serverUserId: overrides.serverUserId ?? userLike?.id ?? null,
    telegramId: overrides.telegramId ?? userLike?.telegram_id ?? userLike?.telegramId ?? null,
    name: getDisplayName(userLike),
    username: userLike?.username || null,
    firstName: userLike?.firstName || userLike?.first_name || null,
    photoUrl: userLike?.photoUrl || userLike?.photo_url || null,
    isOnline: overrides.isOnline ?? userLike?.is_online ?? userLike?.isOnline ?? true,
    position: overrides.position ?? { top: "50%", left: "50%" },
    frame: overrides.frame ?? "frame-leaf",
    hearts,
    bio: overrides.bio ?? "Connected from Telegram Mini App.",
    trackId: overrides.trackId ?? "dumba-remix",
    stats: overrides.stats ?? {
      kisses: 0,
      music: 0,
      hearts,
      matches: 0,
      smiles: 0,
    },
  };
}

function isChatNearBottom() {
  const feed = elements.chatFeed;
  if (!feed) {
    return true;
  }

  return feed.scrollHeight - feed.scrollTop - feed.clientHeight < 48;
}

document.addEventListener("click", (event) => {
  const target = event.target;
  const actionButton = target.closest("[data-action]");
  const openButton = target.closest("[data-open]");
  const toggleButton = target.closest("[data-toggle]");
  const closeButton = target.closest("[data-close]");

  if (closeButton || target.classList.contains("modal-layer")) {
    closeModal();
    return;
  }

  if (toggleButton) {
    if (toggleButton.dataset.toggle === "hubMenu") {
      state.hubMenuOpen = !state.hubMenuOpen;
      renderHubMenu();
    }
    return;
  }

  if (openButton) {
    openModal(openButton.dataset.open, {
      playerId: openButton.dataset.playerId,
      mode: openButton.dataset.mode,
    });
    return;
  }

  if (actionButton) {
    void handleAction(actionButton.dataset.action, actionButton);
    return;
  }

  if (
    state.hubMenuOpen &&
    !target.closest("#hubMenu") &&
    !target.closest("[data-toggle='hubMenu']")
  ) {
    state.hubMenuOpen = false;
    renderHubMenu();
  }
});

document.addEventListener("input", (event) => {
  const target = event.target;
  if (target.matches("[data-setting='sounds']")) {
    state.settings.sounds = Number(target.value);
    saveState();
  }

  if (target.matches("[data-setting='music']")) {
    state.settings.music = Number(target.value);
    saveState();
  }

  if (target.matches("[data-youtube-query]")) {
    state.youtubeQuery = target.value;
  }

  if (target.matches("[data-media-volume]")) {
    void updateMediaVolume(target.value);
  }
});

elements.chatInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    void handleAction("sendChat");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") {
    return;
  }

  const target = event.target;
  if (target instanceof HTMLInputElement && target.matches("[data-youtube-query]")) {
    event.preventDefault();
    void handleAction("searchYouTube", target);
  }
});

elements.chatFeed.addEventListener("scroll", () => {
  state.chatPinnedToBottom = isChatNearBottom();
  if (elements.chatFeed.scrollTop < 24) {
    void maybeLoadOlderChatMessages();
  }
});

function createInitialState() {
  return {
    hearts: 0,
    tableCount: "main",
    spinnerId: null,
    spinRotation: 0,
    spinning: false,
    modal: null,
    hubMenuOpen: false,
    dailyClaimed: 0,
    dailyAvailable: true,
    dailyNextReward: 1,
    hasPremium: false,
    passLevel: 35,
    passProgress: 310,
    passMax: 310,
    settings: {
      sounds: 42,
      music: 36,
    },
    mediaMode: "audio",
    youtubeQuery: "",
    youtubeSearching: false,
    youtubeSearchError: "",
    profilePlayerId: null,
    giftTargetPlayerId: null,
    availableTables: [{ id: "main", code: "main", name: "Main room", boys: 0, girls: 0 }],
    players: [],
    chatMessages: [],
    chatPinnedToBottom: true,
    chatHasMore: true,
    chatLoadingOlder: false,
  };
}

function initTelegram() {
  const tg = window.Telegram?.WebApp;
  if (!tg) {
    console.warn("[telegram] WebApp object is missing");
    return;
  }

  tg.ready();
  tg.expand();
  console.info("[telegram] init", {
    origin: window.location.origin,
    href: window.location.href,
    hasInitData: Boolean(tg.initData),
    initDataLength: tg.initData?.length ?? 0,
    hasInitUser: Boolean(tg.initDataUnsafe?.user),
  });

  if (tg.initDataUnsafe?.user) {
    runtime.user = toClientTelegramUser(tg.initDataUnsafe.user);
    console.info("[telegram] init user", runtime.user);
  }
}

function loadState() {
  return {};
}

function saveState() {
  return;
}

function render() {
  renderLaunchPill();
  elements.heartsCount.textContent = formatNumber(state.hearts);
  elements.tableCount.textContent = String(state.tableCount);
  renderPlayers();
  renderChoice();
  try {
    renderMediaPanel();
  } catch (error) {
    console.error("[render/media] failed", error);
    if (elements.mediaPanel) {
      elements.mediaPanel.hidden = true;
    }
  }
  renderChat();
  renderShopStrip();
  renderHubMenu();
  renderTurnLabel();
  renderModal();
  elements.spinButton.style.setProperty("--rotation", `${state.spinRotation}deg`);
  elements.spinButton.disabled = !canCurrentUserSpin();
  elements.spinButton.classList.toggle("is-disabled", !canCurrentUserSpin());
}

function renderPlayers() {
  console.info("[room/render] players", {
    count: state.players.length,
    playerIds: state.players.map((player) => player.serverUserId),
    turnIndex: runtime.room.turn_index,
  });

  if (!state.players.length) {
    elements.playersLayer.innerHTML = '<div class="players-empty">No players in the room yet</div>';
    return;
  }

  elements.playersLayer.innerHTML = state.players
    .map((player) => {
      const isSelected = runtime.room.last_result?.target_user_id === player.serverUserId;
      const isSpinner = runtime.room.current_turn === player.serverUserId;
      const isSelf = runtime.user?.id === player.serverUserId;
      const canSendGift = runtime.user?.id && runtime.user.id !== player.serverUserId;
      const metaParts = [];
      if (player.username) {
        metaParts.push(`@${player.username}`);
      }
      metaParts.push(`${player.hearts ?? 0} hearts`);
      if (!player.isOnline) {
        metaParts.push("offline");
      }
      const classes = [
        "player-card",
        isSelected ? "is-selected" : "",
        isSpinner ? "is-spinner" : "",
        isSelf ? "is-self" : "",
      ]
        .filter(Boolean)
        .join(" ");
      const statusChip = isSpinner
        ? '<span class="player-chip player-chip--turn">Turn</span>'
        : isSelf
          ? '<span class="player-chip player-chip--self">You</span>'
          : "";

      return `
        <div class="player-slot" style="top:${player.position.top};left:${player.position.left}">
          <div class="player-slot__actions">
            ${statusChip}
            ${
              canSendGift
                ? `<button class="player-gift-btn" data-open="gift" data-player-id="${player.id}" type="button" aria-label="Send gift">🎁</button>`
                : '<span class="player-gift-btn player-gift-btn--ghost" aria-hidden="true"></span>'
            }
          </div>
          <button class="${classes}" data-open="profile" data-player-id="${player.id}" type="button">
            <span class="player-card__frame ${player.frame}">
              ${renderAvatarMarkup("player-card__avatar", player.name, player.photoUrl)}
            </span>
            <span class="player-card__info">
              <span class="player-card__name">${escapeHtml(player.name)}</span>
              <span class="player-card__meta">${escapeHtml(metaParts.join(" · "))}</span>
            </span>
          </button>
        </div>
      `;
    })
    .join("");
}

function renderChoice() {
  const lastResult = runtime.room.last_result;
  if (!lastResult) {
    elements.choicePanel.className = "choice-panel is-hidden";
    elements.choicePanel.innerHTML = "";
    return;
  }

  const spinner = findDisplayPlayerByUserId(lastResult.spinner_user_id);
  const target = findDisplayPlayerByUserId(lastResult.target_user_id);
  elements.choicePanel.className = "choice-panel";
  elements.choicePanel.innerHTML = `
    <div class="choice-panel__title">Last spin</div>
    <div class="choice-panel__cards">
      <div class="choice-card">
        <div class="choice-card__label">Spinner</div>
        <div class="choice-card__name">${escapeHtml(spinner?.name ?? lastResult.spinner_name ?? lastResult.spinner_username ?? "Player")}</div>
      </div>
      <div class="choice-card">
        <div class="choice-card__label">Target</div>
        <div class="choice-card__name">${escapeHtml(target?.name ?? lastResult.target_name ?? lastResult.target_username ?? "Waiting for players")}</div>
      </div>
    </div>
  `;
}

function getCurrentMedia() {
  return runtime.mediaState?.current ?? null;
}

function getMediaQueue() {
  return runtime.mediaState?.queue ?? [];
}

function getRequestedByLabel(requestedBy) {
  return requestedBy?.first_name || requestedBy?.username || "Unknown";
}

function getYouTubeElapsedSeconds(currentMedia) {
  if (!currentMedia?.startedAt) {
    return 0;
  }

  return Math.max(0, Math.floor((Date.now() - new Date(currentMedia.startedAt).getTime()) / 1000));
}

function ensureYouTubeApiReady() {
  if (window.YT?.Player) {
    return Promise.resolve(window.YT);
  }

  if (runtime.mediaPlayer.apiPromise) {
    return runtime.mediaPlayer.apiPromise;
  }

  runtime.mediaPlayer.apiPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-youtube-iframe-api="true"]');
    const previousReady = window.onYouTubeIframeAPIReady;

    window.onYouTubeIframeAPIReady = () => {
      previousReady?.();
      resolve(window.YT);
    };

    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      script.dataset.youtubeIframeApi = "true";
      script.onerror = () => reject(new Error("YouTube player failed to load."));
      document.head.appendChild(script);
    }
  });

  return runtime.mediaPlayer.apiPromise;
}

async function ensureYouTubePlayer() {
  if (!elements.youtubePlayerHost) {
    return null;
  }

  await ensureYouTubeApiReady();

  if (runtime.mediaPlayer.player) {
    return runtime.mediaPlayer.player;
  }

  runtime.mediaPlayer.player = new window.YT.Player(elements.youtubePlayerHost, {
    width: "100%",
    height: "100%",
    videoId: "",
    playerVars: {
      autoplay: 1,
      playsinline: 1,
      rel: 0,
      modestbranding: 1,
      controls: 1,
    },
    events: {
      onReady: () => {
        runtime.mediaPlayer.ready = true;
        void syncSharedMediaPlayback();
      },
      onStateChange: (event) => {
        const currentMedia = getCurrentMedia();
        if (!currentMedia) {
          return;
        }

        if (window.YT?.PlayerState?.ENDED === event.data) {
          void advanceQueueOnMediaEnd(currentMedia.id);
        }
      },
    },
  });

  return runtime.mediaPlayer.player;
}

async function advanceQueueOnMediaEnd(currentId) {
  if (!runtime.appToken || !currentId || runtime.mediaPlayer.skipInFlightForId === currentId) {
    return;
  }

  runtime.mediaPlayer.skipInFlightForId = currentId;
  try {
    const data = await apiRequest("/api/media/queue/skip", {
      method: "POST",
      body: {
        currentId,
        reason: "ended",
      },
    });
    applyServerPayload(data);
    render();
  } catch (error) {
    console.warn("[media] queue advance on end failed", error.message);
  } finally {
    runtime.mediaPlayer.skipInFlightForId = null;
  }
}

async function syncSharedMediaPlayback() {
  if (!elements.mediaPlayerWrap || !elements.youtubePlayerHost) {
    return;
  }

  const currentMedia = getCurrentMedia();
  elements.mediaPlayerWrap.hidden = !currentMedia;
  elements.mediaPlayerWrap.classList.toggle("is-audio", currentMedia?.type === "audio");
  elements.mediaPlayerWrap.classList.toggle("is-video", currentMedia?.type === "video");

  if (!currentMedia?.videoId) {
    runtime.mediaPlayer.currentKey = null;
    if (runtime.mediaPlayer.player?.stopVideo) {
      runtime.mediaPlayer.player.stopVideo();
    }
    return;
  }

  const player = await ensureYouTubePlayer().catch((error) => {
    console.warn("[media] youtube player unavailable", error.message);
    return null;
  });
  if (!player) {
    return;
  }

  const mediaKey = `${currentMedia.id}:${currentMedia.startedAt ?? ""}`;
  const startSeconds = getYouTubeElapsedSeconds(currentMedia);

  if (runtime.mediaPlayer.currentKey !== mediaKey) {
    runtime.mediaPlayer.currentKey = mediaKey;
    player.loadVideoById({
      videoId: currentMedia.videoId,
      startSeconds,
    });
  } else {
    const currentPlayerTime = Number(player.getCurrentTime?.() ?? 0);
    if (Math.abs(currentPlayerTime - startSeconds) > 2) {
      player.seekTo(startSeconds, true);
    }
    player.playVideo?.();
  }

  player.setVolume?.(Number(currentMedia.volume ?? 80));
  if (currentMedia.isMuted) {
    player.mute?.();
  } else {
    player.unMute?.();
  }
}

function renderMediaPanel() {
  if (!elements.mediaPanel || !elements.mediaSummary) {
    return;
  }

  const mediaState = runtime.mediaState ?? createEmptyMediaState();
  const activeUrl = getActiveMediaUrl(mediaState);
  const isActive = Boolean(mediaState.current_media_type && activeUrl);

  elements.mediaPanel.hidden = !isActive;

  if (!isActive) {
    elements.mediaSummary.innerHTML = "";
    syncSharedMediaPlayback();
    return;
  }

  const currentTypeLabel = mediaState.current_media_type === "video" ? "Video clip" : "Audio";
  elements.mediaSummary.innerHTML = `
    <div>
      <strong>${escapeHtml(mediaState.current_media_title || "Room media")}</strong>
      <small>
        ${currentTypeLabel}
        ${mediaState.requested_by_name ? ` · by ${escapeHtml(mediaState.requested_by_name)}` : ""}
      </small>
    </div>
    <button class="mini-btn" data-open="music" data-mode="${mediaState.current_media_type}" type="button">
      Open controls
    </button>
  `;

  syncSharedMediaPlayback();
}

function renderChat() {
  const shouldPin = state.chatPinnedToBottom || isChatNearBottom();
  const messages = getRenderableChatMessages();

  if (!messages.length) {
    elements.chatFeed.innerHTML = '<div class="chat-empty">No messages yet. Start the room from Telegram.</div>';
    state.chatPinnedToBottom = true;
    return;
  }

  elements.chatFeed.innerHTML = messages
    .map((message, index) => {
      const player = findPlayer(message.playerId);
      const isOlder = index < Math.max(0, messages.length - 5);
      const displayName = player?.name ?? message.name ?? "System";
      const username = message.username ? `@${message.username}` : player ? getUsernameLabel(player) : "";
      const avatarUrl = message.avatar ?? player?.photoUrl ?? null;
      return `
        <article class="message ${isOlder ? "message--older" : ""}">
          ${renderAvatarMarkup("message__avatar", displayName, avatarUrl)}
          <div class="message__bubble">
            <div class="message__name">
              ${escapeHtml(displayName)}
              ${username ? `<span>${escapeHtml(username)}</span>` : ""}
            </div>
            <div class="message__text">${escapeHtml(message.text)}</div>
            ${message.note ? `<span class="message__sub">${escapeHtml(message.note)}</span>` : ""}
          </div>
        </article>
      `;
    })
    .join("");

  if (shouldPin) {
    scrollChatToBottom();
  }
}

function renderShopStrip() {
  if (!elements.shopStrip) {
    return;
  }

  elements.shopStrip.innerHTML = "";
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getRoomSeatPosition(index, totalPlayers) {
  const total = clamp(totalPlayers || 1, 1, 10);

  if (total === 1) {
    return { top: "26%", left: "50%" };
  }

  const centerX = 50;
  const centerY = total <= 3 ? 50 : 47;
  const radiusX = total <= 2 ? 33 : total <= 4 ? 37 : total <= 6 ? 39 : 41;
  const radiusY = total <= 2 ? 24 : total <= 4 ? 28 : total <= 6 ? 30 : 31;
  const step = (Math.PI * 2) / total;
  const angleOffset = total <= 3 ? -Math.PI / 2 : (-Math.PI / 2) + step / 2;
  const angle = angleOffset + step * index;
  const left = clamp(centerX + Math.cos(angle) * radiusX, 15, 85);
  const top = clamp(centerY + Math.sin(angle) * radiusY, 18, 78);

  return {
    top: `${top.toFixed(2)}%`,
    left: `${left.toFixed(2)}%`,
  };
}

function renderShopStripLegacy() {
  elements.shopStrip.innerHTML = bottles
    .map(
      (bottle) => `
        <button class="shop-card" data-open="bottle" type="button">
          <div class="shop-card__bottle"></div>
          <span class="shop-card__cost">&#10084; ${bottle.cost}</span>
        </button>
      `
    )
    .join("");
}

function renderHubMenu() {
  elements.hubMenu.classList.toggle("hidden", !state.hubMenuOpen);
}

function renderTurnLabel() {
  const currentTurnPlayer = findDisplayPlayerByUserId(getCurrentTurnUserId());
  if (currentTurnPlayer) {
    elements.turnLabel.textContent = `${currentTurnPlayer.name} turn to spin`;
    return;
  }

  elements.turnLabel.textContent = "Join the main room to start";
}

function renderLaunchPill() {
  if (!elements.launchPill) {
    return;
  }

  elements.launchPill.textContent = launchState.label;
  elements.launchPill.className = `launch-pill launch-pill--${launchState.tone}`;
}

function setLaunchState(label, tone) {
  launchState.label = label;
  launchState.tone = tone;
  renderLaunchPill();
}

function refreshLaunchState() {
  const userLabel = runtime.user ? getDisplayName(runtime.user) : "";
  if (!userLabel) {
    return;
  }

  setLaunchState(`Connected: ${userLabel}`, "ok");
}

function getRenderableChatMessages() {
  return [...state.chatMessages].sort(
    (left, right) => {
      const leftTime = new Date(left.createdAt || 0).getTime();
      const rightTime = new Date(right.createdAt || 0).getTime();
      if (leftTime !== rightTime) {
        return leftTime - rightTime;
      }

      return String(left.id).localeCompare(String(right.id));
    }
  );
}

function scrollChatToBottom() {
  window.requestAnimationFrame(() => {
    elements.chatFeed.scrollTop = Math.max(
      0,
      elements.chatFeed.scrollHeight - elements.chatFeed.clientHeight
    );
    state.chatPinnedToBottom = true;
  });
}

function getRoomPlayerId(player) {
  return player?.id ?? player?.user_id ?? null;
}

function getRoomPlayerTelegramId(player) {
  return player?.telegram_id ?? player?.telegramId ?? null;
}

function buildTableList(serverTables = []) {
  if (!serverTables.length) {
    return state.availableTables;
  }

  const fallbackByCode = new Map(
    tables.map((table) => [
      String(table.code ?? table.id),
      table,
    ])
  );

  return serverTables.map((table) => {
    const key = String(table.code ?? table.id);
    const fallback = fallbackByCode.get(key);

    return {
      id: key,
      code: key,
      name: table.name,
      boys: fallback?.boys ?? 0,
      girls: fallback?.girls ?? 0,
    };
  });
}

function buildDisplayPlayersFromRoom(roomPlayers = []) {
  const totalPlayers = roomPlayers.length;
  return roomPlayers.map((roomPlayer, index) => {
    const position = getRoomSeatPosition(index, totalPlayers);
    const roomPlayerId = getRoomPlayerId(roomPlayer);

    return createProfileData(roomPlayer, {
      id: `room-${roomPlayerId}`,
      serverUserId: roomPlayerId,
      telegramId: getRoomPlayerTelegramId(roomPlayer),
      position,
      frame: playerFrames[index % playerFrames.length],
      isOnline: roomPlayer.is_online ?? true,
      bio: roomPlayer.username
        ? `${getUsernameLabel(roomPlayer)} joined from Telegram.`
        : "Joined from Telegram Mini App.",
      stats: {
        kisses: 0,
        music: 0,
        hearts: roomPlayer.hearts ?? 0,
        matches: 0,
        smiles: 0,
      },
    });
  });
}

function findDisplayPlayerByUserId(userId) {
  return state.players.find((player) => player.serverUserId === userId) ?? null;
}

function applyRoomState(room) {
  console.info("[room] payload received", {
    players: room?.players?.map((player) => ({
      id: getRoomPlayerId(player),
      username: player.username ?? null,
      is_online: player.is_online ?? true,
    })) ?? [],
    current_turn: room?.current_turn ?? null,
    turn_index: room?.turn_index ?? -1,
  });
  const existingMessages = runtime.room.messages ?? [];
  runtime.room = room ? { ...createEmptyRoomState(), ...room } : createEmptyRoomState();
  runtime.room.media_state = {
    ...createEmptyMediaState(),
    ...(runtime.room.media_state ?? {}),
  };
  runtime.mediaState = {
    ...createEmptyMediaState(),
    ...runtime.room.media_state,
  };
  runtime.room.messages = mergeChatMessages(existingMessages, runtime.room.messages ?? []);
  state.tableCount = runtime.room.room_id || "main";
  state.availableTables = [
    {
      id: runtime.room.room_id || "main",
      code: runtime.room.room_id || "main",
      name: "Main room",
      boys: runtime.room.players.length,
      girls: 0,
    },
  ];
  state.players = buildDisplayPlayersFromRoom(runtime.room.players);
  state.spinnerId = findDisplayPlayerByUserId(runtime.room.current_turn)?.id ?? null;
  state.spinRotation = runtime.room.bottle_state?.rotation ?? 0;

  if (runtime.user?.id) {
    const selfRoomPlayer = runtime.room.players.find((player) => getRoomPlayerId(player) === runtime.user.id);
    if (selfRoomPlayer) {
      state.hearts = selfRoomPlayer.hearts;
    }
  }

  if (!state.profilePlayerId || !findPlayer(state.profilePlayerId)) {
    state.profilePlayerId = getSelfPlayer()?.id ?? state.players[0]?.id ?? null;
  }

  syncStateChatMessagesFromRoom();
}

function applyServerPayload(data) {
  if (data.user) {
    runtime.user = {
      ...(runtime.user || {}),
      ...data.user,
    };
  }

  if (data.appToken) {
    runtime.appToken = data.appToken;
  }

  if (data.pricing) {
    runtime.mediaPricing = {
      ...runtime.mediaPricing,
      ...data.pricing,
    };
  }

  if (data.media_state) {
    runtime.mediaState = {
      ...createEmptyMediaState(),
      ...data.media_state,
    };
  }

  const self = getSelfPlayer();
  if (self && data.user) {
    self.name = getDisplayName(data.user);
    self.username = data.user.username || null;
    self.firstName = data.user.firstName || null;
    self.photoUrl = data.user.photoUrl || null;
    self.bio = data.user.username
      ? `${getUsernameLabel(data.user)} connected via Telegram.`
      : "Connected via Telegram Mini App.";
  }

  if (typeof data.user?.hearts === "number") {
    state.hearts = data.user.hearts;
  }

  saveState();
}

async function loadCurrentUser() {
  const data = await apiRequest("/api/user");
  applyServerPayload(data);
  return data.user;
}

async function joinMainRoom() {
  const data = await apiRequest("/api/room/join", {
    method: "POST",
  });
  console.info("[room/join] response", data.room);
  applyRoomState(data.room);
  return data.room;
}

async function loadRoomState() {
  const data = await apiRequest("/api/room");
  console.info("[room/get] response", data.room);
  applyRoomState(data.room);
  return data.room;
}

async function loadMediaState() {
  const data = await apiRequest("/api/media/state");
  console.info("[media/get] response", {
    type: data.media_state?.current_media_type ?? null,
    title: data.media_state?.current_media_title ?? null,
    requestedBy: data.media_state?.requested_by_user_id ?? null,
  });
  applyServerPayload(data);
  return data.media_state;
}

async function loadChatMessages({ before = null, limit = 5, mode = "replace" } = {}) {
  const params = new URLSearchParams();
  params.set("limit", String(limit));
  if (before) {
    params.set("before", before);
  }

  const data = await apiRequest(`/api/chat/messages?${params.toString()}`);
  const incomingMessages = normalizeChatMessages(data.messages ?? []);
  console.info("[chat/get] response", {
    count: incomingMessages.length,
    hasMore: Boolean(data.hasMore),
    before,
    mode,
  });

  if (mode === "prepend") {
    runtime.room.messages = mergeChatMessages(incomingMessages, runtime.room.messages ?? []);
  } else {
    runtime.room.messages = mergeChatMessages([], incomingMessages);
  }

  state.chatHasMore = Boolean(data.hasMore);
  syncStateChatMessagesFromRoom();
  return data.messages ?? [];
}

async function loadGiftCatalog() {
  const data = await apiRequest("/api/gifts");
  runtime.gifts = data.gifts ?? [];
  return runtime.gifts;
}

async function apiRequest(path, options = {}) {
  const requestUrl = new URL(path, window.location.origin).toString();
  const method = options.method || "GET";
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (runtime.appToken) {
    headers.Authorization = `Bearer ${runtime.appToken}`;
  }

  console.info("[api] request", {
    method,
    path,
    requestUrl,
    hasAuth: Boolean(runtime.appToken),
  });

  let response;
  try {
    response = await fetch(requestUrl, {
      method,
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
  } catch (error) {
    console.error("[api] network error", {
      method,
      path,
      requestUrl,
      message: error.message,
    });
    throw new Error(`API unreachable: ${requestUrl}`);
  }

  const rawText = await response.text();
  let data = {};
  if (rawText) {
    try {
      data = JSON.parse(rawText);
    } catch (_error) {
      data = {};
    }
  }

  console.info("[api] response", {
    method,
    path,
    status: response.status,
    ok: response.ok,
    payloadOk: data.ok ?? null,
  });

  if (!response.ok || !data.ok) {
    const responseSummary = data.error || rawText.slice(0, 160) || response.statusText || "Server request failed";
    let prefix = `API ${response.status}`;

    if (path === "/api/bootstrap" || response.status === 401) {
      prefix = "Auth failed";
    } else if (path === "/api/room/join") {
      prefix = "Room join failed";
    } else if (path === "/api/room") {
      prefix = "Room state failed";
    } else if (path.startsWith("/api/youtube/")) {
      prefix = "YouTube search failed";
    } else if (path.startsWith("/api/media/")) {
      prefix = "Media request failed";
    } else if (path.startsWith("/api/chat/")) {
      prefix = "Chat request failed";
    }

    console.error("[api] request failed", {
      method,
      path,
      requestUrl,
      status: response.status,
      responseSummary,
    });
    throw new Error(`${prefix}: ${responseSummary}`);
  }

  return data;
}

function connectRoomSocket() {
  if (!window.io || !runtime.appToken) {
    return;
  }

  runtime.socket?.disconnect();
  console.info("[socket] connecting", {
    origin: window.location.origin,
  });

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

  runtime.socket.on("connect", () => {
    console.info("[socket] connected", {
      id: runtime.socket.id,
    });
    void Promise.all([loadRoomState(), loadChatMessages(), loadMediaState()])
      .then(() => {
        render();
      })
      .catch((error) => {
        console.error("[socket] room/chat reload failed", error);
      });
  });

  runtime.socket.on("room:update", (room) => {
    console.info("[socket] room:update", {
      players: room?.players?.map((player) => player.id) ?? [],
      turn_index: room?.turn_index ?? -1,
      current_turn: room?.current_turn ?? null,
    });
    applyRoomState(room);
    render();
  });

  runtime.socket.on("room_updated", (room) => {
    console.info("[socket] room_updated", {
      players: room?.players?.map((player) => player.id) ?? [],
      turn_index: room?.turn_index ?? -1,
      current_turn: room?.current_turn ?? null,
    });
    applyRoomState(room);
    render();
  });

  runtime.socket.on("media_state_updated", (mediaState) => {
    console.info("[socket] media_state_updated", {
      type: mediaState?.current_media_type ?? null,
      title: mediaState?.current_media_title ?? null,
      requestedBy: mediaState?.requested_by_user_id ?? null,
      muted: mediaState?.is_muted ?? false,
      volume: mediaState?.volume ?? null,
    });
    runtime.mediaState = {
      ...createEmptyMediaState(),
      ...mediaState,
    };
    runtime.room.media_state = {
      ...createEmptyMediaState(),
      ...mediaState,
    };
    renderMediaPanel();
    if (state.modal?.type === "music") {
      renderModal();
    }
  });

  runtime.socket.on("chat_message", (message) => {
    console.info("[socket] chat_message", {
      id: message?.id ?? null,
      userId: message?.user_id ?? null,
      roomId: message?.room_id ?? null,
    });
    runtime.room.messages = mergeChatMessages(runtime.room.messages ?? [], [message]);
    syncStateChatMessagesFromRoom();
    renderChat();
  });

  runtime.socket.on("room_chat_updated", (message) => {
    console.info("[socket] room_chat_updated", {
      id: message?.id ?? null,
      userId: message?.user_id ?? null,
      roomId: message?.room_id ?? null,
    });
    runtime.room.messages = mergeChatMessages(runtime.room.messages ?? [], [message]);
    syncStateChatMessagesFromRoom();
    renderChat();
  });

  runtime.socket.on("connect_error", (error) => {
    console.error("[socket] connect_error", error);
    showToast(`WebSocket disconnected: ${error.message}`);
  });

  runtime.socket.on("disconnect", (reason) => {
    console.warn("[socket] disconnect", {
      reason,
    });
    showToast(`WebSocket disconnected: ${reason}`);
  });
}

async function bootstrapMiniApp() {
  setLaunchState("Connecting to server...", "warn");

  try {
    const tg = window.Telegram?.WebApp;
    if (!tg?.initData) {
      throw new Error("Open this Mini App inside Telegram.");
    }

    setLaunchState("Authorizing Telegram...", "warn");
    const data = await apiRequest("/api/bootstrap", {
      method: "POST",
      body: {
        initData: tg.initData,
      },
    });
    console.info("[bootstrap] response", data);

    applyServerPayload(data);
    setLaunchState("Loading user session...", "warn");
    await loadCurrentUser();
    setLaunchState("Joining room...", "warn");
    await joinMainRoom();
    setLaunchState("Loading room state...", "warn");
    await loadRoomState();
    setLaunchState("Loading media...", "warn");
    await loadMediaState();
    setLaunchState("Loading chat...", "warn");
    await loadChatMessages();
    setLaunchState("Loading gifts...", "warn");
    await loadGiftCatalog();
    connectRoomSocket();
    refreshLaunchState();
    render();
  } catch (error) {
    console.error(error);
    setLaunchState(error.message || "Server bootstrap failed", "error");
    showToast(error.message || "Mini App bootstrap failed");
  }
}

function openModal(type, payload = {}) {
  if (type === "gift" && payload.playerId) {
    state.giftTargetPlayerId = payload.playerId;
  } else if (type === "music" && payload.mode) {
    state.mediaMode = payload.mode === "video" ? "video" : "audio";
  } else if (payload.playerId) {
    state.profilePlayerId = payload.playerId;
  }
  state.hubMenuOpen = false;
  state.modal = { type, payload };
  saveState();
  render();
}

function closeModal() {
  if (!state.modal) {
    return;
  }
  state.modal = null;
  renderModal();
}

function renderModal() {
  if (!state.modal) {
    elements.modalRoot.innerHTML = "";
    return;
  }

  const renderer = modalRenderers[state.modal.type];
  try {
    const html = renderer ? renderer(state.modal.payload ?? {}) : "";
    elements.modalRoot.innerHTML = `<div class="modal-layer">${html}</div>`;
  } catch (error) {
    console.error("[render/modal] failed", {
      type: state.modal.type,
      message: error.message,
    });
    if (state.modal.type === "music") {
      elements.modalRoot.innerHTML = `
        <div class="modal-layer">
          <section class="sheet">
            <button class="sheet__close" data-close type="button">&times;</button>
            <div class="sheet__header">
              <h2>Music unavailable</h2>
              <p>The music panel failed to render, but the room is still connected.</p>
            </div>
            <div class="sheet__body">
              <div class="info-card">
                <p>${escapeHtml(error.message)}</p>
              </div>
            </div>
          </section>
        </div>
      `;
      return;
    }

    elements.modalRoot.innerHTML = "";
  }
}

async function handleAction(action, button) {
  switch (action) {
    case "spin":
      await spinBottle();
      break;
    case "sendChat":
      await sendChat();
      break;
    case "claimBonus":
      await claimBonus();
      break;
    case "buyPack":
      await buyPack(button.dataset.packId);
      break;
    case "buyPremium":
      await buyPremiumPass();
      break;
    case "setMediaMode":
      state.mediaMode = button.dataset.mode === "video" ? "video" : "audio";
      renderModal();
      break;
    case "playAudio":
      await playSharedMedia("audio");
      break;
    case "playVideo":
      await playSharedMedia("video");
      break;
    case "toggleMediaMute":
      await toggleMediaMute();
      break;
    case "applyFrame":
      applyFrame(button.dataset.frameId);
      break;
    case "joinTable":
      joinTable(button.dataset.tableId);
      break;
    case "sendGift":
      await sendGift(button.dataset.giftId);
      break;
    case "inviteFriends":
      await rewardHearts(20, "Invite sent. +20 hearts added.", "Invite sent. +20 hearts");
      break;
    case "shareOffer":
      await rewardHearts(50, "Share completed. +50 hearts added.", "Shared offer. +50 hearts");
      break;
    case "openLeague":
      openModal("league");
      break;
    default:
      break;
  }
}

async function sendGift(giftId) {
  const targetPlayer = findPlayer(state.giftTargetPlayerId);
  if (!runtime.appToken || !targetPlayer?.serverUserId) {
    showToast("Gift target is not available");
    return;
  }

  try {
    setLaunchState("Sending gift...", "warn");
    const data = await apiRequest("/api/gifts/send", {
      method: "POST",
      body: {
        targetUserId: targetPlayer.serverUserId,
        giftId: Number(giftId),
      },
    });
    applyServerPayload(data);
    applyRoomState(data.room);
    closeModal();
    showToast(`${data.gift?.emoji || "Gift"} sent to ${targetPlayer.name}`);
    refreshLaunchState();
    render();
  } catch (error) {
    showToast(error.message);
    refreshLaunchState();
    render();
  }
}

async function playSharedMedia(type) {
  if (!runtime.appToken) {
    showToast("Mini App session not ready");
    return;
  }

  const mode = type === "video" ? "video" : "audio";
  const urlField = mode === "video" ? "videoUrl" : "audioUrl";
  const inputUrl = String(state.mediaDraft[urlField] || "").trim();
  const title = String(state.mediaDraft.title || "").trim();

  if (!inputUrl) {
    showToast(`${mode === "video" ? "Video" : "Audio"} URL is required`);
    return;
  }

  try {
    setLaunchState(`Starting ${mode}...`, "warn");
    const data = await apiRequest(`/api/media/play-${mode}`, {
      method: "POST",
      body: {
        title,
        [urlField]: inputUrl,
      },
    });
    applyServerPayload(data);
    if (runtime.user?.id) {
      const refreshedRoom = await loadRoomState();
      applyRoomState(refreshedRoom);
    }
    showToast(
      data.charged_hearts
        ? `${mode === "video" ? "Video" : "Audio"} started · -${data.charged_hearts} hearts`
        : `${mode === "video" ? "Video" : "Audio"} started`
    );
    refreshLaunchState();
    render();
  } catch (error) {
    showToast(error.message);
    refreshLaunchState();
  }
}

async function toggleMediaMute() {
  if (!runtime.appToken) {
    showToast("Mini App session not ready");
    return;
  }

  try {
    const data = await apiRequest("/api/media/mute", {
      method: "POST",
      body: {
        isMuted: !runtime.mediaState.is_muted,
      },
    });
    applyServerPayload(data);
    render();
  } catch (error) {
    showToast(error.message);
  }
}

async function updateMediaVolume(value) {
  if (!runtime.appToken) {
    return;
  }

  const numericValue = Math.min(Math.max(Number(value), 0), 100);
  runtime.mediaState = {
    ...runtime.mediaState,
    volume: numericValue,
  };
  renderMediaPanel();

  try {
    const data = await apiRequest("/api/media/volume", {
      method: "POST",
      body: {
        volume: numericValue,
      },
    });
    applyServerPayload(data);
  } catch (error) {
    showToast(error.message);
  }
}

async function rewardHearts(amount, message, toastLabel, note = "Just now") {
  if (!runtime.appToken) {
    showToast("Telegram session required");
    return false;
  }

  try {
    setLaunchState("Updating hearts...", "warn");
    const data = await apiRequest("/api/hearts/add", {
      method: "POST",
      body: {
        amount,
      },
    });
    applyServerPayload(data);
    pushSystemMessage("System", message, note);
    showToast(toastLabel);
    refreshLaunchState();
    render();
    return true;
  } catch (error) {
    showToast(error.message);
    refreshLaunchState();
    render();
    return false;
  }
}

async function spinBottle() {
  if (state.spinning) {
    return;
  }

  if (!runtime.appToken) {
    showToast("Mini App session not ready");
    return;
  }

  if (!canCurrentUserSpin()) {
    showToast("It is not your turn yet.");
    return;
  }

  state.spinning = true;
  render();

  try {
    setLaunchState("Syncing spin...", "warn");
    const data = await apiRequest("/api/spin", {
      method: "POST",
    });
    applyServerPayload(data);
    applyRoomState(data.room);
    state.spinning = false;
    const spinnerName = data.result?.spinner_username || getSelfPlayer()?.name || "Player";
    const targetName = data.result?.target_username || "waiting for another player";
    pushSystemMessage(spinnerName, `${spinnerName} spun the bottle toward ${targetName}.`, "Live update");
    showToast(`Bottle -> ${targetName}`);
    refreshLaunchState();
    render();
  } catch (error) {
    state.spinning = false;
    showToast(error.message);
    refreshLaunchState();
    render();
  }
}

async function sendChat() {
  const text = elements.chatInput.value.trim();
  if (!text) {
    return;
  }

  if (!runtime.appToken) {
    showToast("Mini App session not ready");
    return;
  }

  try {
    const data = await apiRequest("/api/chat/send", {
      method: "POST",
      body: {
        text,
      },
    });
    console.info("[chat/send] acknowledged", {
      id: data.message?.id ?? null,
      roomId: data.room_id ?? null,
    });
    runtime.room.messages = mergeChatMessages(runtime.room.messages ?? [], [data.message]);
    syncStateChatMessagesFromRoom();
    elements.chatInput.value = "";
    state.chatPinnedToBottom = true;
    renderChat();
  } catch (error) {
    showToast(error.message);
  }
}

function getCurrentTurnUserId() {
  if (runtime.room.current_turn) {
    return runtime.room.current_turn;
  }

  if (
    Number.isInteger(runtime.room.turn_index) &&
    runtime.room.turn_index >= 0 &&
    runtime.room.turn_index < runtime.room.players.length
  ) {
    return getRoomPlayerId(runtime.room.players[runtime.room.turn_index]);
  }

  return null;
}

function canCurrentUserSpin() {
  if (state.spinning || !runtime.appToken || !runtime.user?.id) {
    return false;
  }

  if (!runtime.room.players.length) {
    return false;
  }

  const currentTurnUserId = getCurrentTurnUserId();
  return currentTurnUserId === runtime.user.id;
}

function normalizeChatMessage(message) {
  const userId = message?.user_id ?? message?.from_user_id ?? null;
  const player = userId ? findDisplayPlayerByUserId(userId) : null;
  return {
    id: String(message?.id ?? `${Date.now()}-${Math.random()}`),
    roomId: message?.room_id ?? runtime.room.room_id ?? "main",
    userId,
    playerId: userId ? `room-${userId}` : null,
    name: message?.first_name || player?.name || message?.from_name || message?.username || "System",
    username: message?.username ?? player?.username ?? null,
    avatar: message?.avatar ?? message?.photo_url ?? player?.photoUrl ?? null,
    text: message?.text ?? "",
    note: message?.note ?? null,
    type: message?.type ?? "chat",
    createdAt: message?.created_at ?? new Date().toISOString(),
  };
}

function normalizeChatMessages(messages = []) {
  return messages.map(normalizeChatMessage);
}

function mergeChatMessages(existingMessages = [], incomingMessages = []) {
  const map = new Map();
  [...normalizeChatMessages(existingMessages), ...normalizeChatMessages(incomingMessages)].forEach((message) => {
    map.set(String(message.id), message);
  });

  return [...map.values()]
    .sort((left, right) => new Date(left.createdAt || 0) - new Date(right.createdAt || 0))
    .slice(-50);
}

function syncStateChatMessagesFromRoom() {
  state.chatMessages = mergeChatMessages([], runtime.room.messages ?? []);
}

async function maybeLoadOlderChatMessages() {
  if (state.chatLoadingOlder || !state.chatHasMore || !runtime.appToken) {
    return;
  }

  const firstMessage = state.chatMessages[0];
  if (!firstMessage) {
    return;
  }

  state.chatLoadingOlder = true;
  const previousHeight = elements.chatFeed.scrollHeight;

  try {
    await loadChatMessages({
      before: firstMessage.id,
      limit: 10,
      mode: "prepend",
    });
    renderChat();
    window.requestAnimationFrame(() => {
      const nextHeight = elements.chatFeed.scrollHeight;
      elements.chatFeed.scrollTop = nextHeight - previousHeight;
    });
  } catch (error) {
    console.error("[chat/get] older messages failed", error);
  } finally {
    state.chatLoadingOlder = false;
  }
}

async function claimBonus() {
  if (!state.dailyAvailable) {
    showToast("Daily bonus already collected");
    return;
  }

  if (!runtime.appToken) {
    showToast("Telegram session required");
    return;
  }

  const day = Math.min(state.dailyClaimed + 1, 5);

  try {
    setLaunchState("Claiming daily bonus...", "warn");
    const data = await apiRequest("/api/hearts/add", {
      method: "POST",
      body: {
        amount: day,
      },
    });
    applyServerPayload(data);
    state.dailyClaimed = Math.min(5, state.dailyClaimed + 1);
    state.dailyAvailable = false;
    state.dailyNextReward = state.dailyClaimed >= 5 ? 1 : state.dailyClaimed + 1;
    pushSystemMessage("System", `Daily bonus collected: +${day} hearts.`, "Today");
    closeModal();
    showToast(`Daily bonus +${day} hearts`);
    saveState();
    refreshLaunchState();
    render();
    return;
  } catch (error) {
    showToast(error.message);
    refreshLaunchState();
    return;
  }
}

async function buyPack(packId) {
  const pack = heartPacks.find((item) => item.id === packId);
  if (!pack) {
    return;
  }

  if (!runtime.appToken) {
    showToast("Telegram session required");
    return;
  }

  try {
    setLaunchState("Adding hearts...", "warn");
    const data = await apiRequest("/api/hearts/add", {
      method: "POST",
      body: {
        amount: pack.hearts,
      },
    });
    applyServerPayload(data);
    pushSystemMessage("Store", `${pack.title} purchased. +${pack.hearts} hearts added.`, "Receipt");
    showToast(`${pack.hearts} hearts added`);
    refreshLaunchState();
    render();
  } catch (error) {
    showToast(error.message);
    refreshLaunchState();
  }
}

async function buyPremiumPass() {
  if (state.hasPremium) {
    return;
  }

  const activated = await rewardHearts(
    210,
    "Premium pass activated.",
    "Premium pass activated",
    "Receipt"
  );
  if (!activated) {
    return;
  }

  state.hasPremium = true;
  closeModal();
  render();
}

function toggleFavorite(trackId) {
  if (state.favoriteTrackIds.has(trackId)) {
    state.favoriteTrackIds.delete(trackId);
  } else {
    state.favoriteTrackIds.add(trackId);
  }
  saveState();
  renderModal();
}

function pickTrack(trackId) {
  state.selectedTrackId = trackId;
  const current = findPlayer(state.profilePlayerId);
  if (current) {
    current.trackId = trackId;
  }
  showToast("Track linked to profile");
  saveState();
  renderModal();
}

function applyFrame(frameId) {
  const player = findPlayer(state.profilePlayerId);
  if (!player) {
    return;
  }

  player.frame = frameId;
  showToast("Frame applied");
  saveState();
  render();
}

function joinTable(tableId) {
  const table = state.availableTables.find((item) => item.id === tableId);
  if (!table) {
    return;
  }

  state.tableCount = String(table.code ?? table.id);
  pushSystemMessage("System", `Moved to ${table.name}.`, "Live update");
  closeModal();
  showToast(`Joined ${table.name}`);
  saveState();
  render();
}

function pushSystemMessage(name, text, note) {
  console.info("[chat/local-note]", {
    name,
    text,
    note,
  });
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.remove("hidden");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    elements.toast.classList.add("hidden");
  }, 2200);
}

function findPlayer(playerId) {
  return state.players.find((player) => player.id === playerId);
}

function getSelfPlayer() {
  if (runtime.user?.id) {
    return (
      findDisplayPlayerByUserId(runtime.user.id) ??
      createProfileData(runtime.user, {
        id: `room-${runtime.user.id}`,
        serverUserId: runtime.user.id,
        frame: "frame-gold",
      })
    );
  }

  return state.players[0] ?? null;
}

function initials(name) {
  return name
    .split(" ")
    .map((item) => item[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

const modalRenderers = {
  dailyBonus: renderDailyBonusModal,
  seasonPass: renderSeasonPassModal,
  premiumPass: renderPremiumPassModal,
  buyHearts: renderBuyHeartsModal,
  gift: renderGiftModal,
  achievements: renderAchievementsModal,
  ratings: renderRatingsModal,
  league: renderLeagueModal,
  bottle: renderBottleModal,
  boosters: renderBoostersModal,
  tables: renderTablesModal,
  settings: renderSettingsModal,
  invite: renderInviteModal,
  event: renderEventModal,
  profile: renderProfileModal,
  music: renderMusicModal,
  styling: renderStylingModal,
};

function renderGiftModal(payload) {
  const targetPlayer = findPlayer(payload.playerId ?? state.giftTargetPlayerId);
  const gifts = runtime.gifts ?? [];
  return `
    <section class="sheet">
      <button class="sheet__close" data-close type="button">&times;</button>
      <div class="sheet__header">
        <h2>Send gift</h2>
        <p>${targetPlayer ? `Choose a gift for ${escapeHtml(targetPlayer.name)}.` : "Choose a player and send a gift."}</p>
      </div>
      <div class="sheet__body">
        ${
          gifts.length
            ? `<div class="gift-grid">
                ${gifts
                  .map(
                    (gift) => `
                      <button class="gift-card" data-action="sendGift" data-gift-id="${gift.id}" type="button">
                        <div class="gift-card__emoji">${gift.imageUrl ? `<img src="${escapeHtml(gift.imageUrl)}" alt="${escapeHtml(gift.title)}" />` : gift.emoji}</div>
                        <strong>${escapeHtml(gift.title)}</strong>
                        <span class="gift-card__price">❤ ${gift.price}</span>
                      </button>
                    `
                  )
                  .join("")}
              </div>`
            : '<div class="info-card"><p>No gifts available right now.</p></div>'
        }
      </div>
    </section>
  `;
}

function renderDailyBonusModal() {
  const claimLabel = state.dailyAvailable ? `Get bonus +${state.dailyNextReward}` : "Already collected today";
  return `
    <section class="sheet sheet--lime">
      <button class="sheet__close" data-close type="button">&times;</button>
      <div class="sheet__header">
        <h2>Daily bonus</h2>
        <p>Get your daily bonus and come back every day to receive even more.</p>
      </div>
      <div class="sheet__body">
        <div class="bonus-list">
          ${Array.from({ length: 5 }, (_, index) => {
            const day = index + 1;
            const isDone = day <= state.dailyClaimed;
            const isNext = day === state.dailyClaimed + 1;
            const classes = ["bonus-row", !isDone && !isNext ? "is-locked" : ""].filter(Boolean).join(" ");
            return `
              <div class="${classes}">
                <div class="bonus-row__left">
                  <span class="bonus-check">${isDone ? "&#10003;" : ""}</span>
                  <span>Day ${day}</span>
                </div>
                <div class="bonus-row__reward">&#10084; ${day}</div>
              </div>
            `;
          }).join("")}
        </div>
        <div class="promo-box">
          Double your bonus with Premium pass and collect extra hearts all season.
          ${runtime.referrals?.invitedCount ? `<br />Invited friends: ${runtime.referrals.invitedCount}, earned: ${runtime.referrals.earnedHearts} hearts.` : ""}
        </div>
        <button class="primary-btn" data-action="claimBonus" type="button" ${state.dailyAvailable ? "" : "disabled"}>
          ${claimLabel}
        </button>
      </div>
    </section>
  `;
}

function renderSeasonPassModal() {
  const progress = Math.round((state.passProgress / state.passMax) * 100);
  const levels = [19, 18, 17, 16, 15, 14];
  return `
    <section class="sheet sheet--blue sheet--wide">
      <button class="sheet__close" data-close type="button">&times;</button>
      <div class="sheet__header">
        <h2>Season pass</h2>
        <p>Ends in 16 days 20 hours. Progress is shown from the current local MVP state.</p>
      </div>
      <div class="sheet__body">
        <div class="pass-summary">
          <div class="pass-card">
            <div class="pass-card__row">
              <span>${state.hasPremium ? "Premium pass active" : "Premium pass available"}</span>
              <strong>Level ${state.passLevel}</strong>
            </div>
            <div class="progress-bar">
              <span style="width:${progress}%"></span>
            </div>
            <div class="pass-card__row">
              <span>${state.passProgress}/${state.passMax}</span>
              <span>${progress}% complete</span>
            </div>
          </div>
          <div class="pass-track">
            ${levels
              .map(
                (level) => `
                  <div class="track-level">
                    <div class="track-reward">&#10084; +${level === 19 ? 75 : level === 15 ? 100 : 10}</div>
                    <div class="track-level__num">${level}</div>
                    <div class="track-reward is-premium">${level % 2 === 0 ? "+5 stars" : "Booster pack"}</div>
                  </div>
                `
              )
              .join("")}
          </div>
        </div>
        <div class="button-row">
          <button class="secondary-btn" data-open="premiumPass" type="button">Premium details</button>
          <button class="primary-btn" data-open="dailyBonus" type="button">Open bonus</button>
        </div>
      </div>
    </section>
  `;
}

function renderPremiumPassModal() {
  return `
    <section class="sheet sheet--gold">
      <button class="sheet__close" data-close type="button">&times;</button>
      <div class="sheet__header">
        <h2>Premium pass</h2>
        <p>Open premium rewards and special privileges before the season ends.</p>
      </div>
      <div class="sheet__body">
        <div class="invite-offer">
          <div class="pill-note">Total rewards exceed 2000 hearts</div>
          <div class="profile-subtitle">
            Set Night gives you a unique decor chance, highlighted profile text, a doubled daily bonus and a final chest.
          </div>
          <div class="profile-stats">
            <div class="profile-stat"><span>Hearts</span><strong>+1225</strong></div>
            <div class="profile-stat"><span>Bonus emojis</span><strong>+130</strong></div>
            <div class="profile-stat"><span>Boosters</span><strong>56</strong></div>
            <div class="profile-stat"><span>Decor drops</span><strong>24</strong></div>
          </div>
        </div>
        <button class="primary-btn" data-action="buyPremium" type="button">
          ${state.hasPremium ? "Already active" : "Buy for 1000 stars"}
        </button>
      </div>
    </section>
  `;
}

function renderBuyHeartsModal() {
  return `
    <section class="sheet sheet--rose sheet--wide">
      <button class="sheet__close" data-close type="button">&times;</button>
      <div class="sheet__header">
        <h2>Buy hearts</h2>
        <p>Use the store to refill hearts and continue testing the current room flow.</p>
      </div>
      <div class="sheet__body">
        <div class="shop-grid">
          ${heartPacks
            .map(
              (pack) => `
                <div class="shop-pack">
                  <div class="shop-pack__title">${pack.title}</div>
                  <div class="shop-pack__value">&#10084; ${pack.hearts}</div>
                  <div class="shop-pack__bonus">${pack.bonus}</div>
                  <button class="shop-pack__buy" data-action="buyPack" data-pack-id="${pack.id}" type="button">
                    &#11088; ${pack.stars}
                  </button>
                </div>
              `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}

function renderAchievementsModal() {
  return `
    <section class="sheet">
      <button class="sheet__close" data-close type="button">&times;</button>
      <div class="sheet__header">
        <h2>My achievements</h2>
        <p>164 / 333 completed. These are sample badges based on the reference screens.</p>
      </div>
      <div class="sheet__body">
        <div class="achievement-grid">
          ${achievements
            .map(
              (item) => `
                <div class="achievement">
                  <div class="achievement__stars">${"&#9733;".repeat(item.stars)}</div>
                  <div class="achievement__badge">${item.label}</div>
                </div>
              `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}

function renderRatingsModal() {
  const self = getSelfPlayer() ?? createProfileData(runtime.user ?? {});
  return `
    <section class="sheet sheet--blue sheet--wide">
      <button class="sheet__close" data-close type="button">&times;</button>
      <div class="sheet__header">
        <h2>Most kissed</h2>
        <p>All-time leaderboard view with your current profile pinned at the bottom.</p>
      </div>
      <div class="sheet__body">
        <div class="rating-head">
          <div class="rating-tabs">
            <button class="tab-btn is-active" type="button">&#128139;</button>
            <button class="tab-btn" type="button">&#9835;</button>
            <button class="tab-btn" type="button">&#10084;</button>
            <button class="tab-btn" type="button">&#128101;</button>
            <button class="tab-btn" type="button">&#128522;</button>
          </div>
          <span class="pill-note">All time</span>
        </div>
        <div class="rating-list">
          ${ratingEntries
            .map(
              (entry) => `
                <div class="rating-row">
                  <div class="rating-rank">${entry.rank}.</div>
                  <div>
                    <strong>${entry.name}</strong>
                    <span>Top league profile</span>
                  </div>
                  <div class="rating-score">${formatNumber(entry.score)}</div>
                </div>
              `
            )
            .join("")}
          <div class="rating-row is-self">
            <div class="rating-rank">4045.</div>
            <div>
              <strong>${escapeHtml(self.name)}</strong>
              <span>Your profile</span>
            </div>
            <div class="rating-score">${formatNumber(self.stats.kisses)}</div>
          </div>
        </div>
        <button class="secondary-btn" data-action="openLeague" type="button">League rules</button>
      </div>
    </section>
  `;
}

function renderLeagueModal() {
  return `
    <section class="sheet">
      <button class="sheet__close" data-close type="button">&times;</button>
      <div class="sheet__header">
        <h2>Stone league</h2>
      </div>
      <div class="sheet__body">
        <div class="league-cup">&#127942;</div>
        <div class="info-card">
          <p>Send gifts to another player or kiss them 5 times to take part in the competition.</p>
        </div>
        <button class="primary-btn" data-close type="button">OK</button>
      </div>
    </section>
  `;
}

function renderBottleModal() {
  return `
    <section class="sheet sheet--wood">
      <button class="sheet__close" data-close type="button">&times;</button>
      <div class="sheet__header">
        <h2>Bottle collection</h2>
        <p>Swap the active bottle style or preview shop items from the play field.</p>
      </div>
      <div class="sheet__body">
        <div class="shop-grid">
          ${bottles
            .map(
              (item) => `
                <div class="shop-item">
                  <div class="shop-item__art">
                    <div class="shop-card__bottle"></div>
                  </div>
                  <strong>${item.name}</strong>
                  <div class="muted">Unlock cost: &#10084; ${item.cost}</div>
                  <button class="mini-btn" type="button" data-open="buyHearts">Open store</button>
                </div>
              `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}

function renderBoostersModal() {
  return `
    <section class="sheet">
      <button class="sheet__close" data-close type="button">&times;</button>
      <div class="sheet__header">
        <h2>Boosters</h2>
        <p>All available boosters and their number are at your disposal.</p>
      </div>
      <div class="sheet__body">
        <div class="booster-grid">
          ${boosters
            .map(
              (booster) => `
                <div class="booster-card">
                  <div class="booster-card__icon">${booster.icon}</div>
                  <strong>${booster.title}</strong>
                  <div class="muted">${booster.note}</div>
                  <div class="pill-note">${booster.count} available</div>
                </div>
              `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}

function renderTablesModal() {
  return `
    <section class="sheet sheet--wide">
      <button class="sheet__close" data-close type="button">&times;</button>
      <div class="sheet__header">
        <h2>Change the table</h2>
        <p>The MVP currently has one shared global room. Private and random tables come next.</p>
      </div>
      <div class="sheet__body">
        <button class="primary-btn" type="button" disabled>Global room only</button>
        <div class="table-list" style="margin-top:16px;">
          ${state.availableTables
            .map(
              (table) => `
                <div class="table-row">
                  <div class="table-thumb"></div>
                  <div>
                    <strong>${table.name}</strong>
                    <div class="muted">${table.boys} boys, ${table.girls} girls</div>
                  </div>
                  <button data-action="joinTable" data-table-id="${table.id}" type="button">Join</button>
                </div>
              `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}

function renderSettingsModal() {
  const profileId = getSelfPlayer()?.id ?? state.profilePlayerId ?? "";
  return `
    <section class="sheet">
      <button class="sheet__close" data-close type="button">&times;</button>
      <div class="sheet__header">
        <h2>Settings</h2>
      </div>
      <div class="sheet__body">
        <div class="setting-list">
          <div class="setting-item">
            <label for="soundsRange">Sounds</label>
            <input id="soundsRange" data-setting="sounds" type="range" min="0" max="100" value="${state.settings.sounds}" />
          </div>
          <div class="setting-item">
            <label for="musicRange">Music</label>
            <input id="musicRange" data-setting="music" type="range" min="0" max="100" value="${state.settings.music}" />
          </div>
        </div>
        <button class="setting-link" data-open="invite" type="button">Invite friends</button>
        <button class="setting-link" data-open="profile" data-player-id="${profileId}" type="button">Profile settings</button>
        <button class="setting-link" type="button">Contact us</button>
      </div>
    </section>
  `;
}

function renderInviteModal() {
  return `
    <section class="sheet">
      <button class="sheet__close" data-close type="button">&times;</button>
      <div class="sheet__header">
        <h2>Special offer</h2>
        <p>Get 20 hearts for every friend you invite, or 50 for every friend with Telegram Premium.</p>
      </div>
      <div class="sheet__body">
        <div class="invite-offer">
          <div class="invite-offer__icons">
            <div><strong>+20</strong> Regular invite</div>
            <div><strong>+50</strong> Premium invite</div>
          </div>
          <div class="info-card">
            <p>Offer ends in 3 days. Rewards are added instantly in the current MVP.</p>
          </div>
        </div>
        <div class="button-row">
          <button class="primary-btn" data-action="inviteFriends" type="button">Invite</button>
          <button class="secondary-btn" data-action="shareOffer" type="button">Share</button>
        </div>
      </div>
    </section>
  `;
}

function renderEventModal() {
  return `
    <section class="sheet">
      <button class="sheet__close" data-close type="button">&times;</button>
      <div class="sheet__header">
        <h2>Saint Patrick's Day</h2>
        <p>A traditional Irish celebration held on the 17th of March.</p>
      </div>
      <div class="sheet__body">
        <div class="event-grid">
          <div class="event-token">&#127826;<small>Pot of gold</small></div>
          <div class="event-token">&#127913;<small>Lucky hat</small></div>
          <div class="event-token">&#9752;<small>Shamrock</small></div>
        </div>
        <div class="event-grid">
          <div class="event-gesture">&#129316;<small>Tipsy</small></div>
          <div class="event-gesture">&#127866;<small>Cheers</small></div>
          <div class="event-gesture">&#128526;<small>Lucky mood</small></div>
        </div>
        <button class="primary-btn" data-close type="button">Continue</button>
      </div>
    </section>
  `;
}

function renderProfileModal(payload) {
  const player =
    findPlayer(payload.playerId ?? state.profilePlayerId) ??
    getSelfPlayer() ??
    createProfileData(runtime.user ?? {});
  const currentTrack = tracks.find((track) => track.id === player.trackId);

  return `
    <section class="sheet sheet--wide">
      <button class="sheet__close" data-close type="button">&times;</button>
      <div class="profile-hero">
        <div class="profile-hero__close-space"></div>
        <div class="profile-hero__avatar-wrap">
          ${renderAvatarMarkup("profile-hero__avatar", player.name, player.photoUrl)}
        </div>
        <div class="profile-hero__name">
          <div>
            <strong>${escapeHtml(player.name)}</strong>
            <small>${escapeHtml(player.username ? getUsernameLabel(player) : player.bio)}</small>
          </div>
          <div class="pill-note">Rank 4045</div>
        </div>
      </div>
      <div class="profile-subtitle">
        Selected track: <strong>${currentTrack?.title ?? "No track linked yet"}</strong>
      </div>
      <div class="sheet__body">
        <div class="profile-stats">
          <div class="profile-stat"><span>Kisses</span><strong>${formatNumber(player.stats.kisses)}</strong></div>
          <div class="profile-stat"><span>Music</span><strong>${formatNumber(player.stats.music)}</strong></div>
          <div class="profile-stat"><span>Hearts</span><strong>${formatNumber(player.stats.hearts)}</strong></div>
          <div class="profile-stat"><span>Matches</span><strong>${formatNumber(player.stats.matches)}</strong></div>
        </div>
        <div class="admirer-card">
          ${renderAvatarMarkup("admirer-photo", player.name, player.photoUrl)}
          <div class="admirer-meta">
            <strong>${escapeHtml(player.name)}</strong>
            <span>${escapeHtml(getUsernameLabel(player))}</span>
          </div>
          <button class="mini-btn" type="button">Profile</button>
        </div>
        <div class="profile-actions">
          <button data-action="openLeague" type="button">&#127942;</button>
          <button data-open="music" type="button">&#9835;</button>
          <button data-open="styling" type="button">&#11088;</button>
          <button type="button">&#9993;</button>
        </div>
      </div>
    </section>
  `;
}

function renderMusicModal() {
  const mode = state.mediaMode === "video" ? "video" : "audio";
  const mediaState = runtime.mediaState ?? createEmptyMediaState();
  const hasActiveMedia = Boolean(mediaState.current_media_type && getActiveMediaUrl(mediaState));
  const currentTypeLabel = mediaState.current_media_type === "video" ? "Video clip" : "Audio";
  const isVip = Boolean(runtime.user?.isVip);
  const currentCost = mode === "video" ? runtime.mediaPricing.video : runtime.mediaPricing.audio;
  return `
    <section class="sheet sheet--wide">
      <button class="sheet__close" data-close type="button">&times;</button>
      <div class="sheet__header">
        <h2>Room media</h2>
        <p>Play one shared audio stream or video clip for everyone in the room.</p>
      </div>
      <div class="sheet__body">
        <div class="music-tabs">
          <button class="tab-btn ${mode === "audio" ? "is-active" : ""}" data-action="setMediaMode" data-mode="audio" type="button">
            Audio
          </button>
          <button class="tab-btn ${mode === "video" ? "is-active" : ""}" data-action="setMediaMode" data-mode="video" type="button">
            Video clip
          </button>
        </div>
        <div class="info-card">
          <strong>${isVip ? "VIP access" : `${mode === "video" ? "Video" : "Audio"} costs ${currentCost} hearts`}</strong>
          <p>${isVip ? "You can start room media for free." : "Hearts are charged only when you start playback."}</p>
        </div>
        <div class="setting-list">
          <div class="setting-item">
            <label for="mediaTitleInput">Title</label>
            <input
              id="mediaTitleInput"
              class="music-search"
              data-media-field="title"
              type="text"
              placeholder="Track title"
              value="${escapeHtml(state.mediaDraft.title)}"
            />
          </div>
          <div class="setting-item setting-item--stack">
            <label for="mediaUrlInput">${mode === "video" ? "Video URL" : "Audio URL"}</label>
            <input
              id="mediaUrlInput"
              class="music-search"
              data-media-field="${mode === "video" ? "videoUrl" : "audioUrl"}"
              type="url"
              inputmode="url"
              placeholder="${mode === "video" ? "https://example.com/video.mp4" : "https://example.com/audio.mp3"}"
              value="${escapeHtml(mode === "video" ? state.mediaDraft.videoUrl : state.mediaDraft.audioUrl)}"
            />
          </div>
        </div>
        <div class="button-row">
          <button class="secondary-btn" data-action="playAudio" type="button">Play audio</button>
          <button class="primary-btn" data-action="playVideo" type="button">Play video clip</button>
        </div>
        <div class="media-card ${hasActiveMedia ? "" : "is-empty"}">
          <div class="media-card__row">
            <strong>${hasActiveMedia ? escapeHtml(mediaState.current_media_title || "Room media") : "Nothing is playing"}</strong>
            <span>${hasActiveMedia ? currentTypeLabel : "Idle"}</span>
          </div>
          <div class="muted">
            ${
              hasActiveMedia
                ? `${escapeHtml(mediaState.requested_by_name || "Unknown")} · volume ${mediaState.volume}%`
                : "Start audio or video to sync it for everyone."
            }
          </div>
          <div class="button-row">
            <button class="secondary-btn" data-action="toggleMediaMute" type="button" ${hasActiveMedia ? "" : "disabled"}>
              ${mediaState.is_muted ? "Unmute" : "Mute"}
            </button>
            <div class="volume-control">
              <label for="mediaVolumeInput">Volume</label>
              <input
                id="mediaVolumeInput"
                data-media-volume
                type="range"
                min="0"
                max="100"
                step="1"
                value="${Number(mediaState.volume ?? 80)}"
                ${hasActiveMedia ? "" : "disabled"}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderStylingModal() {
  const player =
    findPlayer(state.profilePlayerId) ??
    getSelfPlayer() ??
    createProfileData(runtime.user ?? {});
  return `
    <section class="sheet sheet--wide">
      <button class="sheet__close" data-close type="button">&times;</button>
      <div class="sheet__header">
        <h2>Set Nature</h2>
        <p>Preview profile frames and apply them to ${player.name} in this prototype.</p>
      </div>
      <div class="sheet__body">
        <div class="frame-grid">
          ${frames
            .map((frame) => {
              const isCurrent = player.frame === frame.id;
              return `
                <div class="frame-card ${isCurrent ? "is-current" : ""}">
                  <div class="frame-card__preview">
                    <div class="frame-card__sample ${frame.id}">
                      <span>${initials(player.name)}</span>
                    </div>
                  </div>
                  <strong>${frame.label}</strong>
                  <div class="muted">${frame.cost ? `Cost: ${frame.cost} hearts` : frame.note}</div>
                  <button data-action="applyFrame" data-frame-id="${frame.id}" type="button">
                    ${isCurrent ? "Applied" : "Apply"}
                  </button>
                </div>
              `;
            })
            .join("")}
        </div>
      </div>
    </section>
  `;
}

function renderMusicTab(tabId, label) {
  const isActive = state.musicTab === tabId;
  return `
    <button class="tab-btn ${isActive ? "is-active" : ""}" data-action="setMusicTab" data-tab="${tabId}" type="button">
      ${label}
    </button>
  `;
}

function renderMusicCard(track) {
  const isFavorite = state.favoriteTrackIds.has(track.id);
  return `
    <div class="music-card">
      <div class="music-card__cover" data-duration="${track.duration}"></div>
      <strong>${track.title}</strong>
      <div class="muted">${track.artist}</div>
      <div class="button-row">
        <button class="mini-btn" data-action="pickTrack" data-track-id="${track.id}" type="button">Pick</button>
        <button class="star-toggle ${isFavorite ? "is-active" : ""}" data-action="toggleFavorite" data-track-id="${track.id}" type="button">
          ${isFavorite ? "&#9733;" : "&#9734;"}
        </button>
      </div>
    </div>
  `;
}

function renderMusicListItem(track) {
  const isFavorite = state.favoriteTrackIds.has(track.id);
  return `
    <div class="music-list-item">
      <div>
        <strong>${track.title}</strong>
        <div class="muted">${track.artist}</div>
      </div>
      <div class="muted">${track.duration}</div>
      <div style="display:flex;gap:8px;align-items:center;">
        <button class="mini-btn" data-action="pickTrack" data-track-id="${track.id}" type="button">Pick</button>
        <button class="star-toggle ${isFavorite ? "is-active" : ""}" data-action="toggleFavorite" data-track-id="${track.id}" type="button">
          ${isFavorite ? "&#9733;" : "&#9734;"}
        </button>
      </div>
    </div>
  `;
}

function filterTracks() {
  const query = state.musicQuery.trim().toLowerCase();
  let filtered = tracks;

  if (state.musicTab === "favorites") {
    filtered = tracks.filter((track) => state.favoriteTrackIds.has(track.id));
  } else if (state.musicTab === "recent") {
    filtered = tracks.filter((track) => track.view === "list");
  } else if (state.musicTab === "search" && query) {
    filtered = tracks.filter((track) => `${track.title} ${track.artist}`.toLowerCase().includes(query));
  } else if (state.musicTab === "popular") {
    filtered = tracks.filter((track) => track.view === "grid");
  }

  return filtered;
}

// Media system overrides: queue-based shared room player with YouTube search.

function getMediaStateSnapshot() {
  return {
    current: getCurrentMedia(),
    queue: getMediaQueue(),
  };
}

function applyMediaStatePatch(patch = {}) {
  runtime.mediaState = {
    ...createEmptyMediaState(),
    ...runtime.mediaState,
    ...patch,
    current: patch.current ?? runtime.mediaState.current ?? null,
    queue: patch.queue ?? runtime.mediaState.queue ?? [],
  };

  runtime.room.media = {
    ...createEmptyMediaState(),
    ...runtime.room.media,
    current: runtime.mediaState.current,
    queue: runtime.mediaState.queue,
  };
}

function getQueueableResult(videoId, fallback = {}) {
  return (
    runtime.youtubeResults.find((item) => item.videoId === videoId) ?? {
      videoId,
      title: fallback.title || "YouTube media",
      channelTitle: fallback.channelTitle || "",
      thumbnail: fallback.thumbnail || null,
    }
  );
}

function renderQueueListItems(queue) {
  if (!queue.length) {
    return '<div class="media-queue-empty">Queue is empty.</div>';
  }

  return queue
    .map(
      (item, index) => `
        <div class="media-queue-item">
          <div class="media-queue-item__thumb">
            ${
              item.thumbnail
                ? `<img src="${escapeHtml(item.thumbnail)}" alt="${escapeHtml(item.title)}" />`
                : `<span>${item.type === "video" ? "▶" : "♫"}</span>`
            }
          </div>
          <div class="media-queue-item__body">
            <strong>${escapeHtml(item.title || "Untitled media")}</strong>
            <small>
              #${index + 1}
              ${item.channelTitle ? ` · ${escapeHtml(item.channelTitle)}` : ""}
              ${item.requestedBy ? ` · by ${escapeHtml(getRequestedByLabel(item.requestedBy))}` : ""}
            </small>
          </div>
          <span class="media-type-pill">${item.type === "video" ? "Video" : "Audio"}</span>
        </div>
      `
    )
    .join("");
}

function renderSearchResults() {
  if (state.youtubeSearching) {
    return '<div class="media-search-empty">Searching YouTube...</div>';
  }

  if (state.youtubeSearchError) {
    return `<div class="media-search-empty media-search-empty--error">${escapeHtml(state.youtubeSearchError)}</div>`;
  }

  if (!state.youtubeQuery.trim()) {
    return '<div class="media-search-empty">Search YouTube videos and add them as audio or video.</div>';
  }

  if (!runtime.youtubeResults.length) {
    return '<div class="media-search-empty">No matching YouTube videos found.</div>';
  }

  return runtime.youtubeResults
    .map(
      (result) => `
        <article class="yt-result-card">
          <div class="yt-result-card__thumb">
            ${
              result.thumbnail
                ? `<img src="${escapeHtml(result.thumbnail)}" alt="${escapeHtml(result.title)}" />`
                : "<span>YT</span>"
            }
          </div>
          <div class="yt-result-card__body">
            <strong>${escapeHtml(result.title)}</strong>
            <small>${escapeHtml(result.channelTitle || "Unknown channel")}</small>
          </div>
          <div class="yt-result-card__actions">
            <button
              class="mini-btn"
              data-action="queueAsAudio"
              data-video-id="${escapeHtml(result.videoId)}"
              type="button"
            >
              Add as Audio
            </button>
            <button
              class="mini-btn mini-btn--primary"
              data-action="queueAsVideo"
              data-video-id="${escapeHtml(result.videoId)}"
              type="button"
            >
              Add as Video
            </button>
          </div>
        </article>
      `
    )
    .join("");
}

function renderCurrentMediaCard(currentMedia) {
  if (!currentMedia) {
    return `
      <div class="media-now-playing media-now-playing--idle">
        <strong>Now playing</strong>
        <small>No active media yet.</small>
      </div>
    `;
  }

  return `
    <div class="media-now-playing">
      <div class="media-now-playing__head">
        <div>
          <span class="media-label">Now playing</span>
          <strong>${escapeHtml(currentMedia.title || "Untitled media")}</strong>
          <small>
            ${currentMedia.type === "video" ? "Video clip" : "Audio"}
            ${currentMedia.channelTitle ? ` · ${escapeHtml(currentMedia.channelTitle)}` : ""}
            ${currentMedia.requestedBy ? ` · requested by ${escapeHtml(getRequestedByLabel(currentMedia.requestedBy))}` : ""}
          </small>
        </div>
        <span class="media-type-pill">${currentMedia.type === "video" ? "Video" : "Audio"}</span>
      </div>
      <div class="media-controls-row">
        <button class="secondary-btn" data-action="toggleMediaMute" type="button">
          ${currentMedia.isMuted ? "Unmute" : "Mute"}
        </button>
        <button class="secondary-btn" data-action="skipMedia" type="button">
          Skip
        </button>
      </div>
      <div class="volume-control volume-control--wide">
        <label for="mediaVolumeInput">Volume ${Number(currentMedia.volume ?? 80)}%</label>
        <input
          id="mediaVolumeInput"
          data-media-volume
          type="range"
          min="0"
          max="100"
          step="1"
          value="${Number(currentMedia.volume ?? 80)}"
        />
      </div>
    </div>
  `;
}

renderMediaPanel = function renderMediaPanel() {
  if (!elements.mediaPanel || !elements.mediaSummary) {
    return;
  }

  const currentMedia = getCurrentMedia();
  const queue = getMediaQueue();
  const hasVisibleMedia = Boolean(currentMedia || queue.length);

  elements.mediaPanel.hidden = !hasVisibleMedia;

  if (!hasVisibleMedia) {
    elements.mediaSummary.innerHTML = "";
    void syncSharedMediaPlayback();
    return;
  }

  if (!currentMedia) {
    elements.mediaSummary.innerHTML = `
      <div>
        <strong>Up next</strong>
        <small>${queue.length} item${queue.length === 1 ? "" : "s"} waiting in queue</small>
      </div>
      <button class="mini-btn" data-open="music" data-mode="${state.mediaMode}" type="button">
        Open controls
      </button>
    `;
    void syncSharedMediaPlayback();
    return;
  }

  elements.mediaSummary.innerHTML = `
    <div>
      <strong>${escapeHtml(currentMedia.title || "Room media")}</strong>
      <small>
        ${currentMedia.type === "video" ? "Video clip" : "Audio"}
        ${currentMedia.requestedBy ? ` · by ${escapeHtml(getRequestedByLabel(currentMedia.requestedBy))}` : ""}
        ${queue.length ? ` · ${queue.length} up next` : ""}
      </small>
    </div>
    <button class="mini-btn" data-open="music" data-mode="${currentMedia.type}" type="button">
      Open controls
    </button>
  `;

  void syncSharedMediaPlayback();
};

applyRoomState = function applyRoomState(room) {
  console.info("[room] payload received", {
    players: room?.players?.map((player) => ({
      id: getRoomPlayerId(player),
      username: player.username ?? null,
      is_online: player.is_online ?? true,
    })) ?? [],
    current_turn: room?.current_turn ?? null,
    turn_index: room?.turn_index ?? -1,
    mediaCurrent: room?.media?.current?.id ?? null,
    mediaQueueCount: room?.media?.queue?.length ?? 0,
  });

  const existingMessages = runtime.room.messages ?? [];
  runtime.room = room ? { ...createEmptyRoomState(), ...room } : createEmptyRoomState();
  runtime.room.media = {
    ...createEmptyMediaState(),
    ...(runtime.room.media ?? {}),
  };
  runtime.mediaState = {
    ...createEmptyMediaState(),
    ...runtime.room.media,
  };
  runtime.room.messages = mergeChatMessages(existingMessages, runtime.room.messages ?? []);
  state.tableCount = runtime.room.room_id || "main";
  state.availableTables = [
    {
      id: runtime.room.room_id || "main",
      code: runtime.room.room_id || "main",
      name: "Main room",
      boys: runtime.room.players.length,
      girls: 0,
    },
  ];
  state.players = buildDisplayPlayersFromRoom(runtime.room.players);
  state.spinnerId = findDisplayPlayerByUserId(runtime.room.current_turn)?.id ?? null;
  state.spinRotation = runtime.room.bottle_state?.rotation ?? 0;

  if (runtime.user?.id) {
    const selfRoomPlayer = runtime.room.players.find((player) => getRoomPlayerId(player) === runtime.user.id);
    if (selfRoomPlayer) {
      state.hearts = selfRoomPlayer.hearts;
    }
  }

  if (!state.profilePlayerId || !findPlayer(state.profilePlayerId)) {
    state.profilePlayerId = getSelfPlayer()?.id ?? state.players[0]?.id ?? null;
  }

  syncStateChatMessagesFromRoom();
};

applyServerPayload = function applyServerPayload(data) {
  if (data.user) {
    runtime.user = {
      ...(runtime.user || {}),
      ...data.user,
    };
  }

  if (data.appToken) {
    runtime.appToken = data.appToken;
  }

  if (data.pricing) {
    runtime.mediaPricing = {
      ...runtime.mediaPricing,
      ...data.pricing,
    };
  }

  if (data.media) {
    applyMediaStatePatch({
      current: data.media.current ?? null,
      queue: data.media.queue ?? [],
    });
  } else if ("current" in data || "queue" in data) {
    applyMediaStatePatch({
      current: "current" in data ? data.current ?? null : runtime.mediaState.current,
      queue: "queue" in data ? data.queue ?? [] : runtime.mediaState.queue,
    });
  }

  const self = getSelfPlayer();
  if (self && data.user) {
    self.name = getDisplayName(data.user);
    self.username = data.user.username || null;
    self.firstName = data.user.firstName || null;
    self.photoUrl = data.user.photoUrl || null;
    self.bio = data.user.username
      ? `${getUsernameLabel(data.user)} connected via Telegram.`
      : "Connected via Telegram Mini App.";
  }

  if (typeof data.user?.hearts === "number") {
    state.hearts = data.user.hearts;
  }

  saveState();
};

loadMediaState = async function loadMediaState() {
  const data = await apiRequest("/api/media/state");
  console.info("[media/get] response", {
    type: data.current?.type ?? null,
    title: data.current?.title ?? null,
    requestedBy: data.current?.requestedBy?.user_id ?? null,
  });
  applyServerPayload(data);
  return data.current;
};

async function loadMediaQueue() {
  const data = await apiRequest("/api/media/queue");
  console.info("[media/queue/get] response", {
    count: data.queue?.length ?? 0,
  });
  applyServerPayload(data);
  return data.queue ?? [];
}

connectRoomSocket = function connectRoomSocket() {
  if (!window.io || !runtime.appToken) {
    return;
  }

  runtime.socket?.disconnect();
  console.info("[socket] connecting", {
    origin: window.location.origin,
  });

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

  runtime.socket.on("connect", () => {
    console.info("[socket] connected", {
      id: runtime.socket.id,
    });
    void Promise.allSettled([loadRoomState(), loadChatMessages(), loadMediaState(), loadMediaQueue()])
      .then(() => {
        render();
      })
      .catch((error) => {
        console.error("[socket] room/chat/media reload failed", error);
      });
  });

  runtime.socket.on("room:update", (room) => {
    console.info("[socket] room:update", {
      players: room?.players?.map((player) => player.id) ?? [],
      turn_index: room?.turn_index ?? -1,
      current_turn: room?.current_turn ?? null,
    });
    applyRoomState(room);
    render();
  });

  runtime.socket.on("room_updated", (room) => {
    console.info("[socket] room_updated", {
      players: room?.players?.map((player) => player.id) ?? [],
      turn_index: room?.turn_index ?? -1,
      current_turn: room?.current_turn ?? null,
    });
    applyRoomState(room);
    render();
  });

  runtime.socket.on("media_state_updated", (current) => {
    console.info("[socket] media_state_updated", {
      type: current?.type ?? null,
      title: current?.title ?? null,
      requestedBy: current?.requestedBy?.user_id ?? null,
      muted: current?.isMuted ?? false,
      volume: current?.volume ?? null,
    });
    applyMediaStatePatch({
      current: current ?? null,
    });
    renderMediaPanel();
    if (state.modal?.type === "music") {
      renderModal();
    }
  });

  runtime.socket.on("media_queue_updated", (queue) => {
    console.info("[socket] media_queue_updated", {
      count: queue?.length ?? 0,
    });
    applyMediaStatePatch({
      queue: queue ?? [],
    });
    renderMediaPanel();
    if (state.modal?.type === "music") {
      renderModal();
    }
  });

  runtime.socket.on("chat_message", (message) => {
    console.info("[socket] chat_message", {
      id: message?.id ?? null,
      userId: message?.user_id ?? null,
      roomId: message?.room_id ?? null,
    });
    runtime.room.messages = mergeChatMessages(runtime.room.messages ?? [], [message]);
    syncStateChatMessagesFromRoom();
    renderChat();
  });

  runtime.socket.on("room_chat_updated", (message) => {
    console.info("[socket] room_chat_updated", {
      id: message?.id ?? null,
      userId: message?.user_id ?? null,
      roomId: message?.room_id ?? null,
    });
    runtime.room.messages = mergeChatMessages(runtime.room.messages ?? [], [message]);
    syncStateChatMessagesFromRoom();
    renderChat();
  });

  runtime.socket.on("connect_error", (error) => {
    console.error("[socket] connect_error", error);
    showToast(`WebSocket disconnected: ${error.message}`);
  });

  runtime.socket.on("disconnect", (reason) => {
    console.warn("[socket] disconnect", {
      reason,
    });
    showToast(`WebSocket disconnected: ${reason}`);
  });
};

bootstrapMiniApp = async function bootstrapMiniApp() {
  setLaunchState("Connecting to server...", "warn");

  try {
    const tg = window.Telegram?.WebApp;
    if (!tg?.initData) {
      throw new Error("Open this Mini App inside Telegram.");
    }

    setLaunchState("Authorizing Telegram...", "warn");
    const data = await apiRequest("/api/bootstrap", {
      method: "POST",
      body: {
        initData: tg.initData,
      },
    });
    console.info("[bootstrap] response", data);

    applyServerPayload(data);
    setLaunchState("Loading user session...", "warn");
    await loadCurrentUser();
    setLaunchState("Joining room...", "warn");
    await joinMainRoom();
    setLaunchState("Loading room state...", "warn");
    await loadRoomState();
    setLaunchState("Loading chat...", "warn");
    await loadChatMessages();

    setLaunchState("Loading extras...", "warn");
    await Promise.allSettled([loadMediaState(), loadMediaQueue(), loadGiftCatalog()]);

    connectRoomSocket();
    refreshLaunchState();
    render();
  } catch (error) {
    console.error(error);
    setLaunchState(error.message || "Server bootstrap failed", "error");
    showToast(error.message || "Mini App bootstrap failed");
  }
};

async function searchYouTube() {
  const query = String(state.youtubeQuery || "").trim();
  if (!query) {
    state.youtubeSearchError = "Search query is required.";
    runtime.youtubeResults = [];
    renderModal();
    return;
  }

  state.youtubeSearching = true;
  state.youtubeSearchError = "";
  renderModal();

  try {
    const data = await apiRequest(`/api/youtube/search?q=${encodeURIComponent(query)}`);
    runtime.youtubeResults = data.results ?? [];
    state.youtubeSearchError = "";
    renderModal();
  } catch (error) {
    runtime.youtubeResults = [];
    state.youtubeSearchError = error.message;
    renderModal();
  } finally {
    state.youtubeSearching = false;
    renderModal();
  }
}

async function queueMediaFromYouTube(type, videoId, fallback = {}) {
  if (!runtime.appToken) {
    showToast("Mini App session not ready");
    return;
  }

  const selected = getQueueableResult(videoId, fallback);
  if (!selected.videoId) {
    showToast("Invalid YouTube video");
    return;
  }

  const endpoint = type === "video" ? "/api/media/queue/add-video" : "/api/media/queue/add-audio";
  const actionLabel = type === "video" ? "video" : "audio";

  try {
    setLaunchState(`Adding ${actionLabel} to queue...`, "warn");
    const data = await apiRequest(endpoint, {
      method: "POST",
      body: {
        videoId: selected.videoId,
        title: selected.title,
        channelTitle: selected.channelTitle,
        thumbnail: selected.thumbnail,
      },
    });
    applyServerPayload(data);
    showToast(
      data.action === "started"
        ? `${actionLabel === "video" ? "Video" : "Audio"} started`
        : `${actionLabel === "video" ? "Video" : "Audio"} added to queue`
    );
    refreshLaunchState();
    render();
    if (state.modal?.type === "music") {
      renderModal();
    }
  } catch (error) {
    showToast(error.message);
    refreshLaunchState();
  }
}

async function skipCurrentMedia() {
  if (!runtime.appToken) {
    showToast("Mini App session not ready");
    return;
  }

  const currentMedia = getCurrentMedia();
  if (!currentMedia) {
    showToast("No active media");
    return;
  }

  try {
    const data = await apiRequest("/api/media/queue/skip", {
      method: "POST",
      body: {
        currentId: currentMedia.id,
        reason: "manual",
      },
    });
    applyServerPayload(data);
    render();
    if (state.modal?.type === "music") {
      renderModal();
    }
  } catch (error) {
    showToast(error.message);
  }
}

toggleMediaMute = async function toggleMediaMute() {
  if (!runtime.appToken) {
    showToast("Mini App session not ready");
    return;
  }

  const currentMedia = getCurrentMedia();
  if (!currentMedia) {
    showToast("No active media");
    return;
  }

  try {
    const data = await apiRequest("/api/media/mute", {
      method: "POST",
      body: {
        isMuted: !currentMedia.isMuted,
      },
    });
    applyServerPayload(data);
    render();
    if (state.modal?.type === "music") {
      renderModal();
    }
  } catch (error) {
    showToast(error.message);
  }
};

updateMediaVolume = async function updateMediaVolume(value) {
  if (!runtime.appToken) {
    return;
  }

  const currentMedia = getCurrentMedia();
  if (!currentMedia) {
    return;
  }

  const numericValue = Math.min(Math.max(Number(value), 0), 100);
  applyMediaStatePatch({
    current: {
      ...currentMedia,
      volume: numericValue,
    },
  });
  renderMediaPanel();
  if (state.modal?.type === "music") {
    renderModal();
  }

  try {
    const data = await apiRequest("/api/media/volume", {
      method: "POST",
      body: {
        volume: numericValue,
      },
    });
    applyServerPayload(data);
  } catch (error) {
    showToast(error.message);
  }
};

handleAction = async function handleAction(action, button) {
  switch (action) {
    case "spin":
      await spinBottle();
      break;
    case "sendChat":
      await sendChat();
      break;
    case "claimBonus":
      await claimBonus();
      break;
    case "buyPack":
      await buyPack(button.dataset.packId);
      break;
    case "buyPremium":
      await buyPremiumPass();
      break;
    case "setMediaMode":
      state.mediaMode = button.dataset.mode === "video" ? "video" : "audio";
      renderModal();
      break;
    case "searchYouTube":
      await searchYouTube();
      break;
    case "queueAsAudio":
      await queueMediaFromYouTube("audio", button.dataset.videoId, {
        title: button.dataset.title,
        channelTitle: button.dataset.channelTitle,
        thumbnail: button.dataset.thumbnail,
      });
      break;
    case "queueAsVideo":
      await queueMediaFromYouTube("video", button.dataset.videoId, {
        title: button.dataset.title,
        channelTitle: button.dataset.channelTitle,
        thumbnail: button.dataset.thumbnail,
      });
      break;
    case "toggleMediaMute":
      await toggleMediaMute();
      break;
    case "skipMedia":
      await skipCurrentMedia();
      break;
    case "applyFrame":
      applyFrame(button.dataset.frameId);
      break;
    case "joinTable":
      joinTable(button.dataset.tableId);
      break;
    case "sendGift":
      await sendGift(button.dataset.giftId);
      break;
    case "inviteFriends":
      await rewardHearts(20, "Invite sent. +20 hearts added.", "Invite sent. +20 hearts");
      break;
    case "shareOffer":
      await rewardHearts(50, "Share completed. +50 hearts added.", "Shared offer. +50 hearts");
      break;
    case "openLeague":
      openModal("league");
      break;
    default:
      break;
  }
};

renderMusicModal = function renderMusicModal() {
  const mode = state.mediaMode === "video" ? "video" : "audio";
  const current = getCurrentMedia();
  const queue = getMediaQueue();
  const isVip = Boolean(runtime.user?.isVip);
  const mediaEnabled = runtime.mediaPricing.enabled !== false;
  const currentCost = mode === "video" ? runtime.mediaPricing.video : runtime.mediaPricing.audio;

  return `
    <section class="sheet sheet--wide">
      <button class="sheet__close" data-close type="button">&times;</button>
      <div class="sheet__header">
        <h2>Room music</h2>
        <p>One shared player is active at a time. New requests go to the room queue.</p>
      </div>
      <div class="sheet__body">
        <div class="music-tabs">
          <button class="tab-btn ${mode === "audio" ? "is-active" : ""}" data-action="setMediaMode" data-mode="audio" type="button">
            Audio
          </button>
          <button class="tab-btn ${mode === "video" ? "is-active" : ""}" data-action="setMediaMode" data-mode="video" type="button">
            Video clip
          </button>
        </div>

        <div class="info-card">
          <strong>${
            !mediaEnabled
              ? "Music search is disabled"
              : isVip
                ? "VIP access enabled"
                : `${mode === "video" ? "Video" : "Audio"} costs ${currentCost} hearts`
          }</strong>
          <p>${
            !mediaEnabled
              ? "Set YOUTUBE_API_KEY on the server to enable search and queue controls."
              : isVip
                ? "VIP users add media to queue for free."
                : "Regular users pay only when adding to the room queue."
          }</p>
        </div>

        ${renderCurrentMediaCard(current)}

        ${
          mediaEnabled
            ? `
          <div class="media-search-panel">
            <div class="media-search-panel__row">
              <input
                class="music-search"
                data-youtube-query
                type="search"
                placeholder="Search YouTube"
                value="${escapeHtml(state.youtubeQuery)}"
              />
              <button class="primary-btn media-search-panel__button" data-action="searchYouTube" type="button">
                Search
              </button>
            </div>
            <div class="media-search-results">
              ${renderSearchResults()}
            </div>
          </div>
        `
            : ""
        }

        <div class="media-queue-panel">
          <div class="media-queue-panel__head">
            <strong>Up next</strong>
            <span>${queue.length} queued</span>
          </div>
          <div class="media-queue-list">
            ${renderQueueListItems(queue)}
          </div>
        </div>
      </div>
    </section>
  `;
};

modalRenderers.music = renderMusicModal;

function startApp() {
  try {
    initTelegram();
    render();
    void bootstrapMiniApp();
    window.setTimeout(() => {
      if (!state.modal) {
        openModal("dailyBonus");
      }
    }, 450);
  } catch (error) {
    console.error("[app/start] failed", error);
    setLaunchState(error.message || "Mini App failed to start", "error");
    showToast(error.message || "Mini App failed to start");
  }
}

startApp();
