const STORAGE_KEY = "spin-mini-app-demo";

const defaultPlayers = [
  {
    id: "jasur",
    name: "Jasur Toga",
    age: 30,
    frame: "frame-gold",
    avatar: "avatar-hood",
    position: { top: "31%", left: "16%" },
    badge: 0,
    vip: false,
    bio: "Night league player with a calm style and a golden frame.",
    trackId: "night-drive",
    admirer: { name: "Laylo", hearts: 94 },
    stats: { kisses: 17420, music: 603, hearts: 812, matches: 276, smiles: 12800 },
  },
  {
    id: "lina",
    name: "Lina",
    age: 27,
    frame: "frame-neon",
    avatar: "avatar-city",
    position: { top: "18%", left: "71%" },
    badge: 4,
    vip: false,
    bio: "Plays with city lights, fast reactions and a sharp profile look.",
    trackId: "sweater-weather",
    admirer: { name: "Murod", hearts: 88 },
    stats: { kisses: 24810, music: 1280, hearts: 621, matches: 442, smiles: 17114 },
  },
  {
    id: "naza",
    name: "Naza",
    age: 27,
    frame: "frame-neon",
    avatar: "avatar-car",
    position: { top: "69%", left: "33%" },
    badge: 11,
    vip: false,
    bio: "Collects boosted kisses, table wins and dramatic music picks.",
    trackId: "samehtak",
    admirer: { name: "Wukron", hearts: 131 },
    stats: { kisses: 28655, music: 884, hearts: 130, matches: 322, smiles: 25436 },
  },
  {
    id: "khud",
    name: "Khudjaev",
    age: 97,
    frame: "frame-leaf",
    avatar: "avatar-sea",
    position: { top: "69%", left: "76%" },
    badge: 1,
    vip: true,
    bio: "Beach profile, seasonal frame collector and high rank smile farmer.",
    trackId: "dumba-remix",
    admirer: { name: "Admira", hearts: 131 },
    stats: { kisses: 33642, music: 28855, hearts: 130, matches: 322, smiles: 25436 },
  },
];

const defaultChatMessages = [
  { id: 1, playerId: "jasur", name: "Jasur Toga", text: "Pla pla", note: "Show translation" },
  { id: 2, playerId: "naza", name: "Naza", text: "Magneting kuchli ekan", note: "Show translation" },
  { id: 3, playerId: "lina", name: "Lina", text: "Hali yana spin qilamiz", note: "Show translation" },
  { id: 4, playerId: "jasur", name: "Jasur Toga", text: "Vay blaaa", note: "Show translation" },
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
  chatFeed: document.querySelector("#chatFeed"),
  chatInput: document.querySelector("#chatInput"),
  hubMenu: document.querySelector("#hubMenu"),
  modalRoot: document.querySelector("#modalRoot"),
  shopStrip: document.querySelector("#shopStrip"),
  spinButton: document.querySelector("#spinButton"),
  toast: document.querySelector("#toast"),
};

let toastTimer = null;

initTelegram();
render();
window.setTimeout(() => {
  if (!state.modal) {
    openModal("dailyBonus");
  }
}, 450);

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
    openModal(openButton.dataset.open, { playerId: openButton.dataset.playerId });
    return;
  }

  if (actionButton) {
    handleAction(actionButton.dataset.action, actionButton);
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

  if (target.matches("[data-music-query]")) {
    state.musicQuery = target.value;
    renderModal();
  }
});

elements.chatInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    handleAction("sendChat");
  }
});

function createInitialState() {
  const saved = loadState();
  const players = defaultPlayers.map((player) => {
    const stored = saved.players?.find((item) => item.id === player.id);
    return stored ? { ...player, ...stored, stats: { ...player.stats, ...stored.stats } } : player;
  });

  return {
    hearts: saved.hearts ?? 22,
    tableCount: saved.tableCount ?? 157,
    spinnerId: saved.spinnerId ?? "jasur",
    selectedPlayers: saved.selectedPlayers ?? ["naza", "khud"],
    spinRotation: saved.spinRotation ?? 0,
    spinning: false,
    modal: null,
    hubMenuOpen: false,
    dailyClaimed: saved.dailyClaimed ?? 2,
    hasPremium: saved.hasPremium ?? false,
    passLevel: saved.passLevel ?? 35,
    passProgress: saved.passProgress ?? 310,
    passMax: 310,
    settings: {
      sounds: saved.settings?.sounds ?? 42,
      music: saved.settings?.music ?? 36,
    },
    profilePlayerId: saved.profilePlayerId ?? "khud",
    musicTab: saved.musicTab ?? "popular",
    musicQuery: "",
    selectedTrackId: saved.selectedTrackId ?? "dumba-remix",
    favoriteTrackIds: new Set(saved.favoriteTrackIds ?? ["samehtak", "dumba-remix", "sweater-weather"]),
    players,
    chatMessages: saved.chatMessages?.length ? saved.chatMessages : defaultChatMessages,
  };
}

function initTelegram() {
  const tg = window.Telegram?.WebApp;
  if (!tg) {
    return;
  }

  tg.ready();
  tg.expand();
}

function loadState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (error) {
    return {};
  }
}

function saveState() {
  const payload = {
    hearts: state.hearts,
    tableCount: state.tableCount,
    spinnerId: state.spinnerId,
    selectedPlayers: state.selectedPlayers,
    spinRotation: state.spinRotation,
    dailyClaimed: state.dailyClaimed,
    hasPremium: state.hasPremium,
    passLevel: state.passLevel,
    passProgress: state.passProgress,
    settings: state.settings,
    profilePlayerId: state.profilePlayerId,
    musicTab: state.musicTab,
    selectedTrackId: state.selectedTrackId,
    favoriteTrackIds: [...state.favoriteTrackIds],
    players: state.players,
    chatMessages: state.chatMessages.slice(-12),
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function render() {
  elements.heartsCount.textContent = formatNumber(state.hearts);
  elements.tableCount.textContent = formatNumber(state.tableCount);
  renderPlayers();
  renderChoice();
  renderChat();
  renderShopStrip();
  renderHubMenu();
  renderTurnLabel();
  renderModal();
  elements.spinButton.style.setProperty("--rotation", `${state.spinRotation}deg`);
}

function renderPlayers() {
  elements.playersLayer.innerHTML = state.players
    .map((player) => {
      const isSelected = state.selectedPlayers.includes(player.id);
      const isSpinner = state.spinnerId === player.id;
      const classes = [
        "player-card",
        isSelected ? "is-selected" : "",
        isSpinner ? "is-spinner" : "",
      ]
        .filter(Boolean)
        .join(" ");

      return `
        <button
          class="${classes}"
          style="top:${player.position.top};left:${player.position.left}"
          data-open="profile"
          data-player-id="${player.id}"
          type="button"
        >
          <span class="player-card__frame ${player.frame}">
            ${player.badge ? `<span class="player-card__badge">${player.badge}</span>` : ""}
            <span class="player-card__avatar ${player.avatar}">${initials(player.name)}</span>
          </span>
          <span class="player-card__name">${player.name}</span>
          <span class="player-card__meta">${player.age} y.o.</span>
        </button>
      `;
    })
    .join("");
}

function renderChoice() {
  if (!state.selectedPlayers.length) {
    elements.choicePanel.className = "choice-panel is-hidden";
    elements.choicePanel.innerHTML = "";
    return;
  }

  const pair = state.selectedPlayers.map(findPlayer);
  elements.choicePanel.className = "choice-panel";
  elements.choicePanel.innerHTML = `
    <div class="choice-panel__title">Your choice</div>
    <div class="choice-panel__cards">
      ${pair
        .map(
          (player) => `
            <div class="choice-card">
              <div class="choice-card__label">Player</div>
              <div class="choice-card__name">${player.name}</div>
            </div>
          `
        )
        .join("")}
    </div>
    <div class="choice-panel__buttons">
      <button class="cta cta--reject" data-action="refuse" type="button">Refuse</button>
      <button class="cta cta--kiss" data-action="kiss" type="button">Kiss</button>
    </div>
  `;
}

function renderChat() {
  elements.chatFeed.innerHTML = state.chatMessages
    .slice()
    .reverse()
    .map((message) => {
      const player = findPlayer(message.playerId) ?? state.players[0];
      const avatarTone = player.frame === "frame-gold" ? "message__avatar--gold" : "message__avatar--cyan";
      return `
        <article class="message">
          <div class="message__avatar ${avatarTone}">${initials(message.name)}</div>
          <div class="message__bubble">
            <div class="message__name">${message.name}</div>
            <div class="message__text">${escapeHtml(message.text)}</div>
            <span class="message__sub">${message.note}</span>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderShopStrip() {
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
  if (state.selectedPlayers.length) {
    elements.turnLabel.textContent = "Will kiss back?";
  } else {
    const spinner = findPlayer(state.spinnerId);
    elements.turnLabel.textContent = `${spinner?.name ?? "Player"} spins the bottle`;
  }
}

function openModal(type, payload = {}) {
  if (payload.playerId) {
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
  const html = renderer ? renderer(state.modal.payload ?? {}) : "";
  elements.modalRoot.innerHTML = `<div class="modal-layer">${html}</div>`;
}

function handleAction(action, button) {
  switch (action) {
    case "spin":
      spinBottle();
      break;
    case "sendChat":
      sendChat();
      break;
    case "refuse":
      refuseChoice();
      break;
    case "kiss":
      kissChoice();
      break;
    case "claimBonus":
      claimBonus();
      break;
    case "buyPack":
      buyPack(button.dataset.packId);
      break;
    case "buyPremium":
      buyPremiumPass();
      break;
    case "setMusicTab":
      state.musicTab = button.dataset.tab;
      state.musicQuery = "";
      saveState();
      renderModal();
      break;
    case "toggleFavorite":
      toggleFavorite(button.dataset.trackId);
      break;
    case "pickTrack":
      pickTrack(button.dataset.trackId);
      break;
    case "applyFrame":
      applyFrame(button.dataset.frameId);
      break;
    case "joinTable":
      joinTable(button.dataset.tableId);
      break;
    case "inviteFriends":
      state.hearts += 20;
      pushSystemMessage("System", "Invite sent. +20 hearts added.", "Just now");
      showToast("Invite sent. +20 hearts");
      saveState();
      render();
      break;
    case "shareOffer":
      state.hearts += 50;
      pushSystemMessage("System", "Share completed. +50 hearts added.", "Just now");
      showToast("Shared offer. +50 hearts");
      saveState();
      render();
      break;
    case "openLeague":
      openModal("league");
      break;
    default:
      break;
  }
}

function spinBottle() {
  if (state.spinning) {
    return;
  }

  state.spinning = true;
  state.selectedPlayers = [];
  state.spinRotation += 720 + Math.floor(Math.random() * 360);
  const spinner = state.players[Math.floor(Math.random() * state.players.length)];
  state.spinnerId = spinner.id;
  render();

  window.setTimeout(() => {
    const otherPlayers = state.players.filter((player) => player.id !== state.spinnerId);
    const pair = shuffle(otherPlayers).slice(0, 2).map((player) => player.id);
    state.selectedPlayers = pair;
    state.spinning = false;
    pushSystemMessage(
      spinner.name,
      `${spinner.name} spun the bottle. The choice is now between ${findPlayer(pair[0]).name} and ${findPlayer(pair[1]).name}.`,
      "Live update"
    );
    saveState();
    render();
  }, 2800);
}

function refuseChoice() {
  if (!state.selectedPlayers.length) {
    return;
  }

  pushSystemMessage("System", "Round skipped. Spin again to pick a new match.", "Live update");
  state.selectedPlayers = [];
  saveState();
  render();
}

function kissChoice() {
  if (!state.selectedPlayers.length) {
    return;
  }

  const chosen = findPlayer(state.selectedPlayers[1]);
  const self = findPlayer("khud");
  state.hearts = Math.max(0, state.hearts - 3);
  chosen.stats.kisses += 1;
  self.stats.kisses += 1;
  pushSystemMessage("Khudjaev", `Sent a kiss to ${chosen.name}.`, "Show translation");
  state.selectedPlayers = [];
  saveState();
  render();
}

function sendChat() {
  const text = elements.chatInput.value.trim();
  if (!text) {
    return;
  }

  pushSystemMessage("Khudjaev", text, "Show translation");
  elements.chatInput.value = "";
  saveState();
  renderChat();
}

function claimBonus() {
  const day = Math.min(state.dailyClaimed + 1, 5);
  state.hearts += day;
  state.dailyClaimed = Math.min(5, state.dailyClaimed + 1);
  pushSystemMessage("System", `Daily bonus collected: +${day} hearts.`, "Today");
  closeModal();
  showToast(`Daily bonus +${day} hearts`);
  saveState();
  render();
}

function buyPack(packId) {
  const pack = heartPacks.find((item) => item.id === packId);
  if (!pack) {
    return;
  }

  state.hearts += pack.hearts;
  pushSystemMessage("Store", `${pack.title} purchased. +${pack.hearts} hearts added.`, "Receipt");
  showToast(`${pack.hearts} hearts added`);
  saveState();
  render();
}

function buyPremiumPass() {
  if (!state.hasPremium) {
    state.hasPremium = true;
    state.hearts += 210;
    pushSystemMessage("System", "Premium pass activated for demo mode.", "Receipt");
    showToast("Premium pass activated");
    closeModal();
    saveState();
    render();
  }
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
  const table = tables.find((item) => item.id === tableId);
  if (!table) {
    return;
  }

  state.tableCount = Number(table.id);
  pushSystemMessage("System", `Moved to ${table.name}.`, "Live update");
  closeModal();
  showToast(`Joined ${table.name}`);
  saveState();
  render();
}

function pushSystemMessage(name, text, note) {
  const player = state.players.find((item) => item.name === name) ?? findPlayer("khud") ?? state.players[0];
  state.chatMessages.push({ id: Date.now(), playerId: player.id, name, text, note });
  state.chatMessages = state.chatMessages.slice(-12);
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

function shuffle(items) {
  const clone = [...items];
  for (let index = clone.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [clone[index], clone[swapIndex]] = [clone[swapIndex], clone[index]];
  }
  return clone;
}

const modalRenderers = {
  dailyBonus: renderDailyBonusModal,
  seasonPass: renderSeasonPassModal,
  premiumPass: renderPremiumPassModal,
  buyHearts: renderBuyHeartsModal,
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

function renderDailyBonusModal() {
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
        <div class="promo-box">Double your bonus with Premium pass and collect extra hearts all season.</div>
        <button class="primary-btn" data-action="claimBonus" type="button">Get bonus</button>
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
        <p>Ends in 16 days 20 hours. Progress is synced to this demo locally.</p>
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
        <p>Use this demo store to refill currency, unlock flows and test the UI.</p>
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
  const self = findPlayer("khud");
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
              <strong>${self.name}</strong>
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
        <p>Switch to a random table or move into a room where your friends already play.</p>
      </div>
      <div class="sheet__body">
        <button class="primary-btn" type="button">Random table</button>
        <div class="table-list" style="margin-top:16px;">
          ${tables
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
        <button class="setting-link" data-open="profile" data-player-id="khud" type="button">Profile settings</button>
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
            <p>Offer ends in 3 days. Rewards are added here instantly for demo purposes.</p>
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
  const player = findPlayer(payload.playerId ?? state.profilePlayerId) ?? findPlayer("khud");
  const heroClass = player.avatar === "avatar-hood" ? "profile-hero profile-hero--hood" : "profile-hero";
  const currentTrack = tracks.find((track) => track.id === player.trackId);

  return `
    <section class="sheet sheet--wide">
      <button class="sheet__close" data-close type="button">&times;</button>
      <div class="${heroClass}">
        ${player.vip ? `<div class="profile-hero__tag">VIP</div>` : ""}
        <div class="profile-hero__close-space"></div>
        <div class="profile-hero__name">
          <div>
            <strong>${player.name}, ${player.age}</strong>
            <small>${player.bio}</small>
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
          <div class="admirer-photo"></div>
          <div class="admirer-meta">
            <strong>Admirer ${player.admirer.name}</strong>
            <span>&#10084; ${player.admirer.hearts}</span>
          </div>
          <button class="mini-btn" type="button">Leave</button>
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
  const filteredTracks = filterTracks();
  const showGrid = state.musicTab === "popular";
  return `
    <section class="sheet sheet--wide">
      <button class="sheet__close" data-close type="button">&times;</button>
      <div class="sheet__header">
        <h2>Choose music</h2>
        <p>Browse popular picks, favorites, recent tracks or search inside the demo catalog.</p>
      </div>
      <div class="sheet__body">
        <div class="music-tabs">
          ${renderMusicTab("popular", "Popular")}
          ${renderMusicTab("favorites", "Favorites")}
          ${renderMusicTab("recent", "Recent")}
          ${renderMusicTab("search", "Search")}
        </div>
        ${state.musicTab === "search" ? `<input class="music-search" data-music-query placeholder="Search tracks" value="${escapeHtml(state.musicQuery)}" />` : ""}
        ${
          showGrid
            ? `<div class="music-grid">${filteredTracks.map(renderMusicCard).join("")}</div>`
            : `<div class="music-list">${filteredTracks.map(renderMusicListItem).join("")}</div>`
        }
      </div>
    </section>
  `;
}

function renderStylingModal() {
  const player = findPlayer(state.profilePlayerId) ?? findPlayer("khud");
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
