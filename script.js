const SAVE_KEY = "fc26_ultimate_squad_save_v2";
const MAX_UPGRADES = 5;
const MATCH_REAL_DURATION_SEC = 45; // 45 реальных сек = 90 игровых минут
const EVENT_STREAK_GOAL = 3;

const LEAGUES = {
  amateur: {
    name: "Любительская лига",
    minOvr: 68,
    maxOvr: 76,
    rewardBonus: 550,
    trophyReward: 1
  },
  pro: {
    name: "Профи-лига",
    minOvr: 78,
    maxOvr: 86,
    rewardBonus: 950,
    trophyReward: 3
  },
  elite: {
    name: "Элитная лига",
    minOvr: 87,
    maxOvr: 94,
    rewardBonus: 1500,
    trophyReward: 5
  },
  legends: {
    name: "Лига Легенд",
    minOvr: 95,
    maxOvr: 102,
    rewardBonus: 2400,
    trophyReward: 10
  },
  ultimate: {
    name: "Абсолютная лига",
    minOvr: 100,
    maxOvr: 106,
    rewardBonus: 3600,
    trophyReward: 20
  }
};

const FORMATIONS = {
  "4-3-3": {
    lines: [
      ["LW", "ST", "RW"],
      ["CM1", "CAM", "CM2"],
      ["LB", "CB1", "CB2", "RB"],
      ["GK"]
    ]
  },
  "4-3-4": {
    lines: [
      ["LW", "ST1", "ST2", "RW"],
      ["CM1", "CAM", "CM2"],
      ["LB", "CB1", "RB"],
      ["GK"]
    ]
  },
  "4-2-4": {
    lines: [
      ["LW", "ST1", "ST2", "RW"],
      ["CM1", "CM2"],
      ["LB", "CB1", "CB2", "RB"],
      ["GK"]
    ]
  },
  "3-4-3": {
    lines: [
      ["LW", "ST", "RW"],
      ["LM", "CM1", "CM2", "RM"],
      ["CB1", "CB2", "CB3"],
      ["GK"]
    ]
  },
  "5-2-3": {
    lines: [
      ["LW", "ST", "RW"],
      ["CM1", "CM2"],
      ["LWB", "CB1", "CB2", "CB3", "RWB"],
      ["GK"]
    ]
  }
};

const FORMATION_KEYS = Object.keys(FORMATIONS);

const RARITY_BASE_SELL = {
  bronze: 200,
  silver: 425,
  gold: 700,
  totw: 1050,
  hero: 1300,
  toty: 1500,
  icon: 1600,
  prime99: 5000,
  fut102: 2400,
  ultra105: 3750,
  exclusive110: 25000
};

const EXCLUSIVE_110_PLAYER = {
  name: "Император Марадона 110",
  pos: "CAM",
  ovr: 110,
  rarity: "exclusive110",
  avatar: "🌌",
  upgrades: 0,
  isExclusive110: true
};

const PLAYERS_DB = {
  bronze: [
    { name: "Артём Соколов", pos: "ST", ovr: 69, avatar: "⚽" },
    { name: "Максим Орлов", pos: "LW", ovr: 68, avatar: "🏃" },
    { name: "Даниил Волков", pos: "RW", ovr: 70, avatar: "⚡" },
    { name: "Илья Морозов", pos: "CAM", ovr: 69, avatar: "🎯" },
    { name: "Кирилл Лебедев", pos: "CM", ovr: 71, avatar: "🔥" },
    { name: "Роман Зайцев", pos: "CM", ovr: 72, avatar: "🛡️" },
    { name: "Денис Соловьёв", pos: "LB", ovr: 68, avatar: "💨" },
    { name: "Никита Крылов", pos: "CB", ovr: 70, avatar: "🧱" },
    { name: "Тимур Каримов", pos: "CB", ovr: 69, avatar: "🪨" },
    { name: "Павел Громов", pos: "RB", ovr: 68, avatar: "🦅" },
    { name: "Егор Новиков", pos: "GK", ovr: 68, avatar: "🧤" },
    { name: "Олег Васильев", pos: "CM", ovr: 70, avatar: "👟" }
  ],
  silver: [
    { name: "Фёдор Чалов", pos: "ST", ovr: 79, avatar: "🎯" },
    { name: "Арсен Захарян", pos: "CAM", ovr: 80, avatar: "🪄" },
    { name: "Хвича Кварацхелия", pos: "LW", ovr: 81, avatar: "🌪️" },
    { name: "Алексей Миранчук", pos: "RW", ovr: 79, avatar: "⚡" },
    { name: "Бруно Гимарайнс", pos: "CM", ovr: 81, avatar: "💎" },
    { name: "Наиль Умяров", pos: "CM", ovr: 77, avatar: "🛡️" },
    { name: "Жереми Доку", pos: "LW", ovr: 80, avatar: "🚀" },
    { name: "Константин Тюкавин", pos: "ST", ovr: 79, avatar: "🦁" },
    { name: "Страхиня Павлович", pos: "CB", ovr: 78, avatar: "🧱" },
    { name: "Матвей Сафонов", pos: "GK", ovr: 81, avatar: "🧤" },
    { name: "Игорь Акинфеев", pos: "GK", ovr: 81, avatar: "🏆" },
    { name: "Михаил Керж", pos: "ST", ovr: 78, avatar: "⚡" }
  ],
  gold: [
    { name: "Лаутаро Мартинес", pos: "ST", ovr: 87, avatar: "🐂" },
    { name: "Маркус Рэшфорд", pos: "LW", ovr: 85, avatar: "🚀" },
    { name: "Букайо Сака", pos: "RW", ovr: 87, avatar: "🏹" },
    { name: "Педри Гонсалес", pos: "CAM", ovr: 87, avatar: "🪄" },
    { name: "Федерико Вальверде", pos: "CM", ovr: 87, avatar: "💥" },
    { name: "Родри Эрнандес", pos: "CM", ovr: 87, avatar: "🧠" },
    { name: "Рафаэл Леау", pos: "LW", ovr: 86, avatar: "🐆" },
    { name: "Фил Фоден", pos: "RW", ovr: 87, avatar: "✨" },
    { name: "Вирджил ван Дейк", pos: "CB", ovr: 87, avatar: "🏰" },
    { name: "Ашраф Хакими", pos: "RB", ovr: 85, avatar: "⚡" },
    { name: "Алиссон Бекер", pos: "GK", ovr: 87, avatar: "🧤" },
    { name: "Антуан Гризманн", pos: "CAM", ovr: 88, avatar: "🎭" }
  ],
  totw: [
    { name: "Виктор Осимхен", pos: "ST", ovr: 89, avatar: "🎭" },
    { name: "Деклан Райс", pos: "CM", ovr: 88, avatar: "🛡️" },
    { name: "Коул Палмер", pos: "CAM", ovr: 89, avatar: "❄️" },
    { name: "Ламин Ямаль", pos: "RW", ovr: 89, avatar: "🌟" },
    { name: "Нико Уильямс", pos: "LW", ovr: 88, avatar: "💨" },
    { name: "Вильям Салиба", pos: "CB", ovr: 89, avatar: "🧱" },
    { name: "Тео Эрнандес", pos: "LB", ovr: 89, avatar: "🚂" },
    { name: "Жюль Кунде", pos: "RB", ovr: 88, avatar: "⚔️" },
    { name: "Эмилиано Мартинес", pos: "GK", ovr: 88, avatar: "🏆" },
    { name: "Мартин Эдегор", pos: "CAM", ovr: 90, avatar: "🎯" }
  ],
  hero: [
    { name: "Дидье Дрогба", pos: "ST", ovr: 91, avatar: "💪" },
    { name: "Яя Туре", pos: "CM", ovr: 91, avatar: "🚂" },
    { name: "Венсан Компани", pos: "CB", ovr: 90, avatar: "🛡️" },
    { name: "Давид Жинола", pos: "LW", ovr: 90, avatar: "🎨" },
    { name: "Людовик Жюли", pos: "RW", ovr: 89, avatar: "⚡" },
    { name: "Хорхе Кампос", pos: "GK", ovr: 89, avatar: "🌈" },
    { name: "Рафаэль Маркес", pos: "CB", ovr: 90, avatar: "🧱" },
    { name: "Парк Чжи Сун", pos: "CM", ovr: 89, avatar: "🔋" }
  ],
  toty: [
    { name: "Килиан Мбаппе TOTY", pos: "ST", ovr: 96, avatar: "⚡" },
    { name: "Эрлинг Холанд TOTY", pos: "ST", ovr: 96, avatar: "🤖" },
    { name: "Родри TOTY", pos: "CM", ovr: 96, avatar: "🧠" },
    { name: "Джуд Беллингем TOTY", pos: "CAM", ovr: 95, avatar: "🌟" },
    { name: "Винисиус TOTY", pos: "LW", ovr: 95, avatar: "🔥" },
    { name: "Вирджил ван Дейк TOTY", pos: "CB", ovr: 95, avatar: "🏰" },
    { name: "Алиссон TOTY", pos: "GK", ovr: 94, avatar: "🧤" },
    { name: "Тео Эрнандес TOTY", pos: "LB", ovr: 94, avatar: "🚂" }
  ],
  icon: [
    { name: "Килиан Мбаппе", pos: "ST", ovr: 94, avatar: "⚡" },
    { name: "Эрлинг Холанд", pos: "ST", ovr: 94, avatar: "🤖" },
    { name: "Винисиус Жуниор", pos: "LW", ovr: 93, avatar: "🔥" },
    { name: "Мохамед Салах", pos: "RW", ovr: 92, avatar: "👑" },
    { name: "Джуд Беллингем", pos: "CAM", ovr: 93, avatar: "🌟" },
    { name: "Зинедин Зидан", pos: "CM", ovr: 96, avatar: "🎩" },
    { name: "Роналдиньо", pos: "LW", ovr: 95, avatar: "😁" },
    { name: "Криштиану Роналду", pos: "ST", ovr: 96, avatar: "🐐" },
    { name: "Лионель Месси", pos: "RW", ovr: 97, avatar: "👽" },
    { name: "Пеле", pos: "ST", ovr: 98, avatar: "💎" },
    { name: "Паоло Мальдини", pos: "CB", ovr: 95, avatar: "🛡️" },
    { name: "Лев Яшин", pos: "GK", ovr: 96, avatar: "🕷️" }
  ],
  prime99: [
    { name: "Пеле 99", pos: "ST", ovr: 99, avatar: "👑" },
    { name: "Лионель Месси 99", pos: "RW", ovr: 99, avatar: "👽" },
    { name: "Криштиану Роналду 99", pos: "ST", ovr: 99, avatar: "🐐" },
    { name: "Зинедин Зидан 99", pos: "CM", ovr: 99, avatar: "🎩" },
    { name: "Роналдиньо 99", pos: "LW", ovr: 99, avatar: "😁" },
    { name: "Паоло Мальдини 99", pos: "CB", ovr: 99, avatar: "🛡️" },
    { name: "Лев Яшин 99", pos: "GK", ovr: 99, avatar: "🕷️" }
  ],
  fut102: [
    { name: "Лионель Месси 101", pos: "RW", ovr: 101, avatar: "👽" },
    { name: "Криштиану Роналду 101", pos: "ST", ovr: 101, avatar: "🐐" },
    { name: "Килиан Мбаппе 100", pos: "ST", ovr: 100, avatar: "⚡" },
    { name: "Эрлинг Холанд 100", pos: "ST", ovr: 100, avatar: "🤖" },
    { name: "Зинедин Зидан 102", pos: "CM", ovr: 102, avatar: "🎩" },
    { name: "Джуд Беллингем 101", pos: "CAM", ovr: 101, avatar: "🌟" },
    { name: "Винисиус Жуниор 100", pos: "LW", ovr: 100, avatar: "🔥" },
    { name: "Паоло Мальдини 101", pos: "CB", ovr: 101, avatar: "🛡️" },
    { name: "Вирджил ван Дейк 100", pos: "CB", ovr: 100, avatar: "🏰" },
    { name: "Лев Яшин 102", pos: "GK", ovr: 102, avatar: "🕷️" }
  ],
  ultra105: [
    { name: "Пеле 105", pos: "ST", ovr: 105, avatar: "👑" },
    { name: "Лионель Месси 105", pos: "RW", ovr: 105, avatar: "👽" },
    { name: "Криштиану Роналду 105", pos: "ST", ovr: 105, avatar: "🐐" },
    { name: "Зинедин Зидан 104", pos: "CM", ovr: 104, avatar: "🎩" },
    { name: "Роналдиньо 104", pos: "LW", ovr: 104, avatar: "😁" },
    { name: "Килиан Мбаппе 103", pos: "ST", ovr: 103, avatar: "⚡" },
    { name: "Эрлинг Холанд 103", pos: "ST", ovr: 103, avatar: "🤖" },
    { name: "Паоло Мальдини 104", pos: "CB", ovr: 104, avatar: "🛡️" },
    { name: "Лев Яшин 105", pos: "GK", ovr: 105, avatar: "🕷️" }
  ]
};

let state = {
  coins: 2000,
  wins: 0,
  league: "amateur",
  formation: "4-3-3",
  club: [],
  squad: {},
  enemyOvr: 72,
  pullQueue: [],
  currentPackPrice: 400,
  matchRunning: false,
  usedPromos: [],
  exclusive110Claimed: false,
  eventStreak: 0
};

let hoveredPlayerId = null;
let toastTimer = null;

let matchIntervals = {
  clock: null,
  events: null
};

let drillState = {
  running: false,
  score: 0,
  timeLeft: 10,
  timerId: null
};

function getAllSlotsForFormation(formKey) {
  return FORMATIONS[formKey].lines.flat();
}

function getEffectiveOvr(player) {
  const upg = player.upgrades || 0;
  return player.ovr + upg;
}

function getUpgradeCost(currentUpgrades) {
  return currentUpgrades + 1;
}

function getPlayerSellValue(player) {
  const base = RARITY_BASE_SELL[player.rarity] || Math.round(player.ovr * 15);
  const upgBonus = (player.upgrades || 0) * 150;
  return base + upgBonus;
}

function showToast(text) {
  const el = document.getElementById("toast-notify");
  if (!el) return;
  el.textContent = text;
  el.classList.remove("hidden");
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    el.classList.add("hidden");
  }, 2400);
}

function sanitizeSquad() {
  const slots = getAllSlotsForFormation(state.formation);
  const validClubIds = new Set(state.club.map(p => p.id));
  const usedIds = new Set();
  const nextSquad = {};

  slots.forEach(slotCode => {
    const pid = state.squad[slotCode];
    if (pid !== undefined && validClubIds.has(pid) && !usedIds.has(pid)) {
      nextSquad[slotCode] = pid;
      usedIds.add(pid);
    }
  });

  slots.forEach(slotCode => {
    if (nextSquad[slotCode] === undefined) {
      const cleanRole = slotCode.replace(/[0-9]/g, "");
      const candidate =
        state.club.find(p => !usedIds.has(p.id) && p.pos === cleanRole) ||
        state.club.find(p => !usedIds.has(p.id));
      if (candidate) {
        nextSquad[slotCode] = candidate.id;
        usedIds.add(candidate.id);
      }
    }
  });

  state.squad = nextSquad;
}

function equipUniquePlayerToSquad(player, preferredSlot = null) {
  const slots = getAllSlotsForFormation(state.formation);
  const targetSlot =
    preferredSlot && slots.includes(preferredSlot)
      ? preferredSlot
      : slots.find(s => s.replace(/[0-9]/g, "") === player.pos) || slots[0];

  Object.keys(state.squad).forEach(s => {
    if (state.squad[s] === player.id && s !== targetSlot) {
      delete state.squad[s];
    }
  });

  state.squad[targetSlot] = player.id;
  sanitizeSquad();
}

function sellPlayerById(playerId) {
  if (state.matchRunning) {
    showToast("Нельзя продавать игроков во время матча!");
    return;
  }

  const player = state.club.find(p => p.id === playerId);
  if (!player) return;

  if (state.club.length <= 11) {
    showToast("Нельзя продать: в клубе должно оставаться минимум 11 игроков!");
    return;
  }

  const sellAmount = getPlayerSellValue(player);

  if (player.isExclusive110) {
    state.exclusive110Claimed = false;
  }

  state.club = state.club.filter(p => p.id !== playerId);

  Object.keys(state.squad).forEach(slotKey => {
    if (state.squad[slotKey] === playerId) {
      delete state.squad[slotKey];
    }
  });

  sanitizeSquad();
  state.coins += sellAmount;
  hoveredPlayerId = null;

  saveProgress();
  renderAll();
  showToast(`💸 Продан: ${player.name} (+${sellAmount} 💰)`);
}

document.addEventListener("keydown", e => {
  if (e.key === "Shift" && !e.repeat && hoveredPlayerId !== null) {
    const revealOverlay = document.getElementById("pack-reveal");
    if (revealOverlay && !revealOverlay.classList.contains("hidden")) return;
    sellPlayerById(hoveredPlayerId);
  }
});

function saveProgress() {
  try {
    const payload = {
      coins: state.coins,
      wins: state.wins,
      league: state.league,
      formation: state.formation,
      club: state.club,
      squad: state.squad,
      enemyOvr: state.enemyOvr,
      usedPromos: state.usedPromos,
      exclusive110Claimed: state.exclusive110Claimed,
      eventStreak: state.eventStreak
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(payload));
  } catch (e) {}
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return false;
    const saved = JSON.parse(raw);
    if (!saved || !Array.isArray(saved.club) || saved.club.length === 0) return false;

    state.coins = typeof saved.coins === "number" ? saved.coins : 2000;
    state.wins = typeof saved.wins === "number" ? saved.wins : 0;
    state.league = LEAGUES[saved.league] ? saved.league : "amateur";
    state.formation = FORMATIONS[saved.formation] ? saved.formation : "4-3-3";
    state.club = saved.club.map(p => ({
      ...p,
      rarity: p.rarity || "bronze",
      upgrades: Math.min(MAX_UPGRADES, p.upgrades || 0)
    }));
    state.squad = saved.squad && typeof saved.squad === "object" ? saved.squad : {};
    state.enemyOvr = typeof saved.enemyOvr === "number" ? saved.enemyOvr : 72;
    state.usedPromos = Array.isArray(saved.usedPromos) ? saved.usedPromos : [];
    state.exclusive110Claimed = Boolean(
      saved.exclusive110Claimed || state.club.some(p => p.isExclusive110 || p.ovr === 110)
    );
    state.eventStreak = typeof saved.eventStreak === "number" ? saved.eventStreak : 0;

    sanitizeSquad();
    return true;
  } catch (e) {
    return false;
  }
}

function resetProgress() {
  if (state.matchRunning) return;
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch (e) {}
  createFreshState();
  saveProgress();
  renderAll();
}

function createFreshState() {
  const starters = [
    { id: 1, name: "Артём Соколов", pos: "ST", ovr: 69, rarity: "bronze", avatar: "⚽", upgrades: 0 },
    { id: 2, name: "Максим Орлов", pos: "LW", ovr: 68, rarity: "bronze", avatar: "🏃", upgrades: 0 },
    { id: 3, name: "Даниил Волков", pos: "RW", ovr: 70, avatar: "⚡", upgrades: 0 },
    { id: 4, name: "Илья Морозов", pos: "CAM", ovr: 69, avatar: "🎯", upgrades: 0 },
    { id: 5, name: "Кирилл Лебедев", pos: "CM", ovr: 71, avatar: "🔥", upgrades: 0 },
    { id: 6, name: "Роман Зайцев", pos: "CM", ovr: 72, avatar: "🛡️", upgrades: 0 },
    { id: 7, name: "Денис Соловьёв", pos: "LB", ovr: 68, avatar: "💨", upgrades: 0 },
    { id: 8, name: "Никита Крылов", pos: "CB", ovr: 70, avatar: "🧱", upgrades: 0 },
    { id: 9, name: "Тимур Каримов", pos: "CB", ovr: 69, avatar: "🪨", upgrades: 0 },
    { id: 10, name: "Павел Громов", pos: "RB", ovr: 68, avatar: "🦅", upgrades: 0 },
    { id: 11, name: "Егор Новиков", pos: "GK", ovr: 68, avatar: "🧤", upgrades: 0 },
    { id: 12, name: "Олег Васильев", pos: "CM", ovr: 70, avatar: "👟", upgrades: 0 }
  ];

  state.coins = 2000;
  state.wins = 0;
  state.league = "amateur";
  state.formation = "4-3-3";
  state.club = [...starters];
  state.squad = {};
  state.usedPromos = [];
  state.exclusive110Claimed = false;
  state.eventStreak = 0;
  assignStartersToCurrentFormation();
  generateEnemy();
}

function initGame() {
  const loaded = loadProgress();
  if (!loaded) {
    createFreshState();
    saveProgress();
  }
  renderAll();
}

function goMainMenu() {
  if (state.matchRunning) return;
  document.getElementById("main-menu").classList.remove("hidden");
  document.getElementById("sub-nav").classList.add("hidden");
  document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
}

function openSection(tabName) {
  if (state.matchRunning) return;
  document.getElementById("main-menu").classList.add("hidden");
  document.getElementById("sub-nav").classList.remove("hidden");

  document.querySelectorAll(".tab-btn").forEach(b => {
    b.classList.toggle("active", b.dataset.tab === tabName);
  });
  document.querySelectorAll(".tab-content").forEach(c => {
    c.classList.toggle("active", c.id === "tab-" + tabName);
  });
}

document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    openSection(btn.dataset.tab);
  });
});

function assignStartersToCurrentFormation() {
  const slots = getAllSlotsForFormation(state.formation);
  const usedIds = new Set();
  state.squad = {};

  slots.forEach(slotCode => {
    const cleanRole = slotCode.replace(/[0-9]/g, "");
    const candidate =
      state.club.find(p => !usedIds.has(p.id) && p.pos === cleanRole) ||
      state.club.find(p => !usedIds.has(p.id));

    if (candidate) {
      state.squad[slotCode] = candidate.id;
      usedIds.add(candidate.id);
    }
  });
}

function setFormation(formKey) {
  if (!FORMATIONS[formKey] || state.matchRunning) return;
  state.formation = formKey;
  assignStartersToCurrentFormation();
  saveProgress();
  renderAll();
}

function cycleFormation() {
  const idx = FORMATION_KEYS.indexOf(state.formation);
  const nextKey = FORMATION_KEYS[(idx + 1) % FORMATION_KEYS.length];
  setFormation(nextKey);
}

function autoFillBestSquad() {
  if (state.matchRunning) return;
  const slots = getAllSlotsForFormation(state.formation);
  const sorted = [...state.club].sort((a, b) => getEffectiveOvr(b) - getEffectiveOvr(a));
  const usedIds = new Set();
  state.squad = {};

  slots.forEach(slotCode => {
    const cleanRole = slotCode.replace(/[0-9]/g, "");
    const matchPos = sorted.find(p => !usedIds.has(p.id) && p.pos === cleanRole);
    const fallback = sorted.find(p => !usedIds.has(p.id));
    const chosen = matchPos || fallback;
    if (chosen) {
      state.squad[slotCode] = chosen.id;
      usedIds.add(chosen.id);
    }
  });

  saveProgress();
  renderAll();
}

function upgradePlayerOvr(playerId, event) {
  if (event) event.stopPropagation();
  if (state.matchRunning) return;

  const player = state.club.find(p => p.id === playerId);
  if (!player) return;

  const currentUpg = player.upgrades || 0;
  if (currentUpg >= MAX_UPGRADES) return;

  const cost = getUpgradeCost(currentUpg);
  if (state.wins < cost) {
    alert(`Для ${currentUpg + 1}-й прокачки (+1 OVR) нужно ${cost} 🏆!`);
    return;
  }

  state.wins -= cost;
  player.upgrades = currentUpg + 1;
  saveProgress();
  renderAll();
}

function getTeamOvr() {
  const slots = getAllSlotsForFormation(state.formation);
  let sum = 0;
  slots.forEach(slotCode => {
    const player = state.club.find(p => p.id === state.squad[slotCode]);
    sum += player ? getEffectiveOvr(player) : 60;
  });
  return Math.round(sum / slots.length);
}

function createCardHTML(player, slotLabel = null, showUpgrade = false) {
  const displayPos = slotLabel ? slotLabel.replace(/[0-9]/g, "") : player.pos;
  const effOvr = getEffectiveOvr(player);
  const upg = player.upgrades || 0;
  const isMax = upg >= MAX_UPGRADES;
  const nextCost = getUpgradeCost(upg);
  const sellPrice = getPlayerSellValue(player);

  const shiftHint = showUpgrade
    ? `<div class="sell-shift-hint">Shift — продать за ${sellPrice} 💰</div>`
    : "";

  const upgradeBlock = showUpgrade
    ? `
      <div class="card-upgrade-meta">
        <span class="upgrade-pips">Прокачка: ${upg}/${MAX_UPGRADES}</span>
        <button
          class="upgrade-btn"
          ${isMax || state.wins < nextCost ? "disabled" : ""}
          onclick="upgradePlayerOvr(${player.id}, event)"
        >
          ${isMax ? "МАКС (+5)" : `⬆️ +1 OVR (${nextCost}🏆)`}
        </button>
      </div>
    `
    : "";

  return `
    <div
      class="player-card rarity-${player.rarity}"
      onmouseenter="hoveredPlayerId = ${player.id}"
      onmouseleave="if (hoveredPlayerId === ${player.id}) hoveredPlayerId = null"
    >
      ${shiftHint}
      <div class="card-header-row">
        <span class="card-ovr">${effOvr}</span>
        <span class="card-pos">${displayPos}</span>
      </div>
      <div class="card-avatar">${player.avatar}</div>
      <div class="card-name-plate" title="${player.name}">${player.name}</div>
      ${upgradeBlock}
    </div>
  `;
}

function renderFormationControls() {
  document.getElementById("current-formation-label").textContent = state.formation;
  document.getElementById("match-formation-text").textContent = "Схема " + state.formation;

  const chipsWrap = document.getElementById("formation-chips");
  chipsWrap.innerHTML = "";
  FORMATION_KEYS.forEach(key => {
    const btn = document.createElement("button");
    btn.className = "f-chip" + (state.formation === key ? " active" : "");
    btn.textContent = key;
    btn.onclick = () => setFormation(key);
    chipsWrap.appendChild(btn);
  });
}

function renderPitch() {
  const board = document.getElementById("formation-board");
  board.innerHTML = "";

  const currentLines = FORMATIONS[state.formation].lines;
  currentLines.forEach(lineSlots => {
    const rowEl = document.createElement("div");
    rowEl.className = "pitch-line";

    lineSlots.forEach(slotCode => {
      const player = state.club.find(p => p.id === state.squad[slotCode]);
      const slotDiv = document.createElement("div");
      slotDiv.className = "slot";
      slotDiv.innerHTML = player ? createCardHTML(player, slotCode, true) : "";
      rowEl.appendChild(slotDiv);
    });

    board.appendChild(rowEl);
  });
}

function renderLeagues() {
  const wrap = document.getElementById("league-buttons");
  wrap.innerHTML = "";

  Object.entries(LEAGUES).forEach(([key, info]) => {
    const btn = document.createElement("button");
    btn.className = "league-btn" + (state.league === key ? " active" : "");
    btn.textContent = `${info.name} (${info.minOvr}–${info.maxOvr}) +${info.trophyReward}🏆`;
    btn.onclick = () => {
      if (state.matchRunning) return;
      state.league = key;
      generateEnemy();
      saveProgress();
      renderAll();
    };
    wrap.appendChild(btn);
  });

  document.getElementById("enemy-league-name").textContent = LEAGUES[state.league].name;
}

function renderEventUI() {
  const streak = Math.min(EVENT_STREAK_GOAL, state.eventStreak || 0);
  const pct = Math.round((streak / EVENT_STREAK_GOAL) * 100);
  const countEl = document.getElementById("event-streak-count");
  const fillEl = document.getElementById("event-streak-fill");
  if (countEl) countEl.textContent = String(streak);
  if (fillEl) fillEl.style.width = `${pct}%`;
}

function renderAll() {
  sanitizeSquad();

  const ovr = getTeamOvr();
  document.getElementById("coins").textContent = state.coins;
  document.getElementById("team-ovr").textContent = ovr;
  document.getElementById("my-match-ovr").textContent = ovr;
  document.getElementById("enemy-match-ovr").textContent = state.enemyOvr;
  document.getElementById("wins").textContent = state.wins;

  renderFormationControls();
  renderPitch();
  renderLeagues();
  renderEventUI();

  const equippedIds = new Set(Object.values(state.squad));
  const clubList = document.getElementById("club-list");
  clubList.innerHTML = "";
  const sortedClub = [...state.club].sort((a, b) => getEffectiveOvr(b) - getEffectiveOvr(a));

  sortedClub.forEach(player => {
    const isEquipped = equippedIds.has(player.id);
    const div = document.createElement("div");
    div.className = "club-item" + (isEquipped ? " equipped" : "");

    const cardHolder = document.createElement("div");
    cardHolder.className = "club-card-click";
    cardHolder.innerHTML = createCardHTML(player, null, true);
    cardHolder.onclick = () => {
      if (state.matchRunning) return;
      if (Object.values(state.squad).includes(player.id)) {
        showToast(`${player.name} уже в стартовом составе!`);
        return;
      }
      equipUniquePlayerToSquad(player);
      saveProgress();
      renderAll();
    };

    div.appendChild(cardHolder);
    clubList.appendChild(div);
  });
}

function generatePlayerFromPack(rarity) {
  const pool = PLAYERS_DB[rarity];
  const template = pool[Math.floor(Math.random() * pool.length)];
  return {
    id: Date.now() + Math.random(),
    name: template.name,
    pos: template.pos,
    ovr: template.ovr,
    rarity,
    avatar: template.avatar,
    upgrades: 0
  };
}

function enqueuePlayersToReveal(playersList, unitSellBasePrice) {
  state.currentPackPrice = unitSellBasePrice;
  state.pullQueue = [...playersList];
  playersList.forEach(p => state.club.push(p));
  saveProgress();
  renderAll();
  showNextPulledCard();
}

function openMultiPack(rarity, count, totalPrice) {
  if (state.coins < totalPrice) {
    alert("Не хватает монет! Сыграй матч или активируй промокод.");
    return;
  }

  state.coins -= totalPrice;
  const generated = [];
  for (let i = 0; i < count; i++) {
    generated.push(generatePlayerFromPack(rarity));
  }
  enqueuePlayersToReveal(generated, Math.round(totalPrice / count));
}

function buyPack99ForWins() {
  if (state.wins < 25) {
    alert(`Нужно 25 кубков! Сейчас у тебя кубков: ${state.wins}.`);
    return;
  }

  state.wins -= 25;
  const specialPlayer = generatePlayerFromPack("prime99");
  enqueuePlayersToReveal([specialPlayer], 5000);
}

function buyPack105ForWins() {
  if (state.wins < 100) {
    alert(`Нужно 100 кубков! Сейчас у тебя кубков: ${state.wins}.`);
    return;
  }

  state.wins -= 100;
  const pool105 = PLAYERS_DB.ultra105.filter(p => p.ovr === 105);
  const template = pool105[Math.floor(Math.random() * pool105.length)];
  const player105 = {
    id: Date.now() + Math.random(),
    name: template.name,
    pos: template.pos,
    ovr: 105,
    rarity: "ultra105",
    avatar: template.avatar,
    upgrades: 0
  };
  enqueuePlayersToReveal([player105], 12000);
}

// Ивент-пак Лихорадки: игрок или бонус монет / кубков
function openEventFeverPack() {
  const price = 2200;
  if (state.coins < price) {
    alert("Нужно 2 200 монет для ивент-пака!");
    return;
  }

  state.coins -= price;
  const roll = Math.random();

  if (roll < 0.16) {
    state.coins += 4700;
    saveProgress();
    renderAll();
    showToast("⚡ Джекпот Лихорадки! Вернул трату и получил +4 700 💰!");
    return;
  }

  if (roll < 0.30) {
    state.wins += 3;
    saveProgress();
    renderAll();
    showToast("🏆 Удача Лихорадки! +3 кубка 🏆!");
    return;
  }

  const rarityRoll = Math.random();
  let rarity = "totw";
  if (rarityRoll > 0.92) rarity = "ultra105";
  else if (rarityRoll > 0.78) rarity = "fut102";
  else if (rarityRoll > 0.62) rarity = "prime99";
  else if (rarityRoll > 0.35) rarity = "toty";

  const card = generatePlayerFromPack(rarity);
  enqueuePlayersToReveal([card], 2200);
}

// Мини-игра «Пенальти-атака (10 сек)»
function moveDrillBallRandomly() {
  const arena = document.getElementById("drill-arena");
  const ball = document.getElementById("drill-ball");
  if (!arena || !ball) return;

  const maxX = Math.max(10, arena.clientWidth - ball.offsetWidth - 10);
  const maxY = Math.max(10, arena.clientHeight - ball.offsetHeight - 10);
  const x = Math.floor(Math.random() * maxX);
  const y = Math.floor(Math.random() * maxY);

  ball.style.left = `${x}px`;
  ball.style.top = `${y}px`;
}

function startPenaltyDrill() {
  if (drillState.running) return;
  drillState.running = true;
  drillState.score = 0;
  drillState.timeLeft = 10;

  const startBtn = document.getElementById("drill-start-btn");
  const ball = document.getElementById("drill-ball");
  const overlayMsg = document.getElementById("drill-overlay-msg");
  const timerEl = document.getElementById("drill-timer");
  const scoreEl = document.getElementById("drill-score");

  startBtn.disabled = true;
  ball.disabled = false;
  overlayMsg.classList.add("hidden");
  scoreEl.textContent = "0";
  timerEl.textContent = "10.0s";
  moveDrillBallRandomly();

  drillState.timerId = setInterval(() => {
    drillState.timeLeft = Math.max(0, +(drillState.timeLeft - 0.1).toFixed(1));
    timerEl.textContent = `${drillState.timeLeft.toFixed(1)}s`;

    if (drillState.timeLeft <= 0) {
      clearInterval(drillState.timerId);
      drillState.timerId = null;
      drillState.running = false;
      ball.disabled = true;
      startBtn.disabled = false;

      const earnedCoins = drillState.score * 140;
      const bonusTrophy = drillState.score >= 8 ? 1 : 0;
      state.coins += earnedCoins;
      state.wins += bonusTrophy;

      overlayMsg.textContent =
        bonusTrophy > 0
          ? `Отлично! Забито ${drillState.score}: +${earnedCoins} 💰 и +1 🏆!`
          : `Раунд окончен! Забито ${drillState.score}: +${earnedCoins} 💰 (нужно 8+ голов для кубка)`;
      overlayMsg.classList.remove("hidden");

      saveProgress();
      renderAll();
    }
  }, 100);
}

function hitDrillBall(e) {
  if (e) e.stopPropagation();
  if (!drillState.running) return;
  drillState.score += 1;
  document.getElementById("drill-score").textContent = String(drillState.score);
  moveDrillBallRandomly();
}

function showNextPulledCard() {
  const overlay = document.getElementById("pack-reveal");
  const nextBtn = document.getElementById("next-card-btn");
  const counterEl = document.getElementById("reveal-counter");

  if (state.pullQueue.length === 0) {
    overlay.classList.add("hidden");
    saveProgress();
    renderAll();
    return;
  }

  const player = state.pullQueue[0];
  const remaining = state.pullQueue.length;
  counterEl.textContent = remaining > 1
    ? `ВЫПАЛ ИГРОК! (Осталось карт: ${remaining})`
    : "НОВЫЙ ИГРОК!";

  const sellPrice = Math.round(state.currentPackPrice * 0.5);
  document.getElementById("revealed-card").innerHTML = createCardHTML(player, null, false);
  document.getElementById("sell-now-btn").textContent = `Продать (+${sellPrice} 💰)`;

  document.getElementById("equip-now-btn").onclick = () => {
    equipUniquePlayerToSquad(player);
    state.pullQueue.shift();
    saveProgress();
    renderAll();
    showNextPulledCard();
  };

  document.getElementById("sell-now-btn").onclick = () => {
    if (player.isExclusive110) {
      state.exclusive110Claimed = false;
    }
    state.club = state.club.filter(p => p.id !== player.id);
    Object.keys(state.squad).forEach(slotKey => {
      if (state.squad[slotKey] === player.id) {
        delete state.squad[slotKey];
      }
    });
    sanitizeSquad();
    state.coins += sellPrice;
    state.pullQueue.shift();
    saveProgress();
    renderAll();
    showNextPulledCard();
  };

  if (remaining > 1) {
    nextBtn.classList.remove("hidden");
    nextBtn.onclick = () => {
      state.pullQueue.shift();
      showNextPulledCard();
    };
  } else {
    nextBtn.classList.add("hidden");
  }

  document.getElementById("close-reveal-btn").onclick = () => {
    state.pullQueue = [];
    overlay.classList.add("hidden");
    saveProgress();
    renderAll();
  };

  overlay.classList.remove("hidden");
}

function redeemPromoCode() {
  const input = document.getElementById("promo-input");
  const msgEl = document.getElementById("promo-message");
  const code = input.value.trim().toLowerCase();

  msgEl.className = "promo-message";

  if (!code) {
    msgEl.textContent = "Введите промокод.";
    msgEl.classList.add("err");
    return;
  }

  if (code === "k3dwfs") {
    state.coins += 10000;
    msgEl.textContent = "Промокод активирован: +10 000 монет!";
    msgEl.classList.add("ok");
    saveProgress();
    renderAll();
  } else if (code === "dif7ub8") {
    msgEl.textContent = "Промокод активирован: 3 Королевских набора кумиров!";
    msgEl.classList.add("ok");
    const pulled = [
      generatePlayerFromPack("icon"),
      generatePlayerFromPack("icon"),
      generatePlayerFromPack("icon")
    ];
    enqueuePlayersToReveal(pulled, 2233);
  } else if (code === "drslfc") {
    const peleCard = {
      id: Date.now() + Math.random(),
      name: "Пеле",
      pos: "ST",
      ovr: 98,
      rarity: "icon",
      avatar: "💎",
      upgrades: 0
    };
    msgEl.textContent = "Промокод активирован: получен Пеле (98 OVR)!";
    msgEl.classList.add("ok");
    enqueuePlayersToReveal([peleCard], 3200);
  } else if (code === "pfusof") {
    state.wins += 10;
    msgEl.textContent = "Промокод активирован: +10 кубков!";
    msgEl.classList.add("ok");
    saveProgress();
    renderAll();
  } else if (code === "fgsyglb") {
    const slots = getAllSlotsForFormation(state.formation);
    const stars99Names = [
      "Пеле",
      "Лионель Месси",
      "Криштиану Роналду",
      "Зинедин Зидан",
      "Роналдиньо",
      "Килиан Мбаппе",
      "Эрлинг Холанд",
      "Джуд Беллингем",
      "Паоло Мальдини",
      "Вирджил ван Дейк",
      "Лев Яшин"
    ];

    state.squad = {};
    slots.forEach((slotCode, idx) => {
      const cleanRole = slotCode.replace(/[0-9]/g, "");
      const starPlayer = {
        id: Date.now() + Math.random() + idx,
        name: stars99Names[idx % stars99Names.length],
        pos: cleanRole,
        ovr: 99,
        rarity: "prime99",
        avatar: cleanRole === "GK" ? "🕷️" : "👑",
        upgrades: 0
      };
      state.club.push(starPlayer);
      state.squad[slotCode] = starPlayer.id;
    });

    msgEl.textContent = "Промокод активирован: собран состав 99 OVR!";
    msgEl.classList.add("ok");
    saveProgress();
    renderAll();
  } else if (code === "fgeyucjm") {
    const slots = getAllSlotsForFormation(state.formation);
    const stars105Names = [
      "Пеле 105",
      "Лионель Месси 105",
      "Криштиану Роналду 105",
      "Зинедин Зидан 105",
      "Роналдиньо 105",
      "Килиан Мбаппе 105",
      "Эрлинг Холанд 105",
      "Джуд Беллингем 105",
      "Паоло Мальдини 105",
      "Вирджил ван Дейк 105",
      "Лев Яшин 105"
    ];

    state.squad = {};
    slots.forEach((slotCode, idx) => {
      const cleanRole = slotCode.replace(/[0-9]/g, "");
      const titan105 = {
        id: Date.now() + Math.random() + idx,
        name: stars105Names[idx % stars105Names.length],
        pos: cleanRole,
        ovr: 105,
        rarity: "ultra105",
        avatar: cleanRole === "GK" ? "🕷️" : "🔱",
        upgrades: 0
      };
      state.club.push(titan105);
      state.squad[slotCode] = titan105.id;
    });

    msgEl.textContent = "Промокод активирован: получены 11 игроков 105 OVR!";
    msgEl.classList.add("ok");
    saveProgress();
    renderAll();
  } else if (code === "qxpgo") {
    const alreadyExists = state.club.some(p => p.isExclusive110 || p.ovr === 110);
    if (state.exclusive110Claimed || alreadyExists) {
      msgEl.textContent = "Эксклюзивный игрок 110 OVR в игре только один — он уже у тебя!";
      msgEl.classList.add("err");
    } else {
      state.exclusive110Claimed = true;
      const uniquePlayer = {
        ...EXCLUSIVE_110_PLAYER,
        id: Date.now() + Math.random()
      };
      msgEl.textContent = "Промокод активирован: получен эксклюзивный игрок 110 OVR!";
      msgEl.classList.add("ok");
      enqueuePlayersToReveal([uniquePlayer], 25000);
    }
  } else if (code === "usaz") {
    state.wins += 50;
    msgEl.textContent = "Промокод активирован: +50 кубков!";
    msgEl.classList.add("ok");
    saveProgress();
    renderAll();
  } else {
    msgEl.textContent = "Неверный промокод.";
    msgEl.classList.add("err");
  }

  input.value = "";
}

function generateEnemy() {
  if (state.matchRunning) return;
  const league = LEAGUES[state.league] || LEAGUES.amateur;
  const span = league.maxOvr - league.minOvr + 1;
  state.enemyOvr = league.minOvr + Math.floor(Math.random() * span);
  document.getElementById("enemy-match-ovr").textContent = state.enemyOvr;
}

function clearMatchTimers() {
  if (matchIntervals.clock) {
    clearInterval(matchIntervals.clock);
    matchIntervals.clock = null;
  }
  if (matchIntervals.events) {
    clearInterval(matchIntervals.events);
    matchIntervals.events = null;
  }
}

function finishMatch(myGoals, enemyGoals, leagueInfo) {
  clearMatchTimers();
  state.matchRunning = false;
  document.getElementById("start-match-btn").disabled = false;

  if (myGoals > enemyGoals) {
    const trophiesEarned = leagueInfo.trophyReward || 1;
    const reward = leagueInfo.rewardBonus + state.enemyOvr * 8;
    state.coins += reward;
    state.wins += trophiesEarned;
    state.eventStreak = (state.eventStreak || 0) + 1;

    let streakMsg = "";
    if (state.eventStreak >= EVENT_STREAK_GOAL) {
      state.eventStreak = 0;
      state.coins += 4000;
      state.wins += 4;
      streakMsg = " ⚡ СЕРИЯ 3 ПОБЕД! Бонус Лихорадки: +4 000 💰 и +4 🏆!";
    }

    addLog(
      `🏆 ФИНАЛЬНЫЙ СВИСТОК! ПОБЕДА ${myGoals}:${enemyGoals} в «${leagueInfo.name}»! +${trophiesEarned} 🏆 и +${reward} 💰${streakMsg}`,
      "finish"
    );
  } else if (enemyGoals > myGoals) {
    state.eventStreak = 0;
    const consolation = 200;
    state.coins += consolation;
    addLog(`💔 ФИНАЛЬНЫЙ СВИСТОК! Поражение ${myGoals}:${enemyGoals}. Утешительный бонус: +${consolation} 💰`, "finish");
  } else {
    state.eventStreak = 0;
    const drawBonus = 300;
    state.coins += drawBonus;
    addLog(`🤝 ФИНАЛЬНЫЙ СВИСТОК! Ничья ${myGoals}:${enemyGoals}. Бонус за матч: +${drawBonus} 💰`, "finish");
  }

  generateEnemy();
  saveProgress();
  renderAll();
}

function startMatch() {
  if (state.matchRunning) return;
  state.matchRunning = true;

  const startBtn = document.getElementById("start-match-btn");
  const logBox = document.getElementById("match-log");
  const realTimerEl = document.getElementById("match-real-timer");
  const gameMinEl = document.getElementById("match-game-minute");

  startBtn.disabled = true;

  let myGoals = 0;
  let enemyGoals = 0;
  let realElapsed = 0;

  const leagueInfo = LEAGUES[state.league] || LEAGUES.amateur;
  const myOvr = getTeamOvr();
  const enemyOvr = state.enemyOvr;
  const ovrDiff = myOvr - enemyOvr;

  const baseMomentProb = 0.14;
  const myGoalShare = Math.max(0.18, Math.min(0.88, 0.5 + ovrDiff * 0.022));
  const myShotSuccess = Math.max(0.22, Math.min(0.68, 0.34 + Math.max(0, ovrDiff) * 0.012));
  const enemyShotSuccess = Math.max(0.14, Math.min(0.55, 0.32 - Math.max(0, ovrDiff) * 0.01));

  const blowoutMode = ovrDiff >= 10 && Math.random() < Math.min(0.55, (ovrDiff - 8) * 0.03);

  const slots = getAllSlotsForFormation(state.formation);
  const attackers = slots
    .filter(s => !s.startsWith("GK"))
    .map(s => state.club.find(p => p.id === state.squad[s]))
    .filter(Boolean);

  document.getElementById("my-score").textContent = "0";
  document.getElementById("enemy-score").textContent = "0";
  realTimerEl.textContent = `00.0s / ${MATCH_REAL_DURATION_SEC.toFixed(1)}s`;
  gameMinEl.textContent = `0' (1с = 2 мин игры)`;

  logBox.innerHTML = `<div class="log-item">📢 Матч (${leagueInfo.name}, ${state.formation}) начался! Награда за победу: +${leagueInfo.trophyReward} 🏆.</div>`;

  matchIntervals.clock = setInterval(() => {
    realElapsed = Math.min(MATCH_REAL_DURATION_SEC, +(realElapsed + 0.1).toFixed(1));
    const gameMinute = Math.min(90, Math.floor(realElapsed * 2));

    realTimerEl.textContent = `${realElapsed.toFixed(1)}s / ${MATCH_REAL_DURATION_SEC.toFixed(1)}s`;
    gameMinEl.textContent = `${gameMinute}' (1с = 2 мин игры)`;

    if (realElapsed >= MATCH_REAL_DURATION_SEC && state.matchRunning) {
      finishMatch(myGoals, enemyGoals, leagueInfo);
    }
  }, 100);

  matchIntervals.events = setInterval(() => {
    if (!state.matchRunning) return;
    const currentGameMin = Math.min(90, Math.floor(realElapsed * 2));

    const momentChance = blowoutMode ? 0.34 : baseMomentProb;
    if (Math.random() > momentChance) return;

    const ourAttack = Math.random() < myGoalShare;
    if (ourAttack) {
      const finishChance = blowoutMode ? Math.min(0.82, myShotSuccess + 0.25) : myShotSuccess;
      const capGoals = blowoutMode ? 7 : 3;
      if (Math.random() < finishChance && myGoals < capGoals) {
        myGoals++;
        const scorer = attackers[Math.floor(Math.random() * attackers.length)];
        const name = scorer ? scorer.name : "Форвард";
        document.getElementById("my-score").textContent = myGoals;
        addLog(`⚽ ${currentGameMin}' — ГОООЛ! ${name} забивает за твою команду! (${myGoals}:${enemyGoals})`, "goal-my");
      }
    } else {
      const enemyCap = blowoutMode ? 1 : 3;
      if (Math.random() < enemyShotSuccess && enemyGoals < enemyCap) {
        enemyGoals++;
        document.getElementById("enemy-score").textContent = enemyGoals;
        addLog(`❌ ${currentGameMin}' — Соперник забивает гол! (${myGoals}:${enemyGoals})`, "goal-enemy");
      }
    }
  }, 2500);
}

function addLog(text, type = "") {
  const logBox = document.getElementById("match-log");
  const item = document.createElement("div");
  item.className = "log-item " + type;
  item.textContent = text;
  logBox.appendChild(item);
  logBox.scrollTop = logBox.scrollHeight;
}

initGame();