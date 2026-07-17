const LOCATIONS = [
  { id: 'park', name: 'Park', icon: '🌳', clue: 'grass, ponds and playgrounds' },
  { id: 'bakery', name: 'Bakery', icon: '🥐', clue: 'warm bread and tasty smells' },
  { id: 'school', name: 'School', icon: '🏫', clue: 'children, bags and lunchboxes' },
  { id: 'beach', name: 'Beach', icon: '🏖️', clue: 'sand, gulls and waves' },
  { id: 'forest', name: 'Forest', icon: '🌲', clue: 'trees, shade and quiet paths' },
  { id: 'vet', name: 'Vet', icon: '🏥', clue: 'animal experts and pet records' },
  { id: 'petshop', name: 'Pet Shop', icon: '🦴', clue: 'treats, toys and food bags' },
  { id: 'library', name: 'Library', icon: '📚', clue: 'quiet corners and notice boards' },
  { id: 'market', name: 'Market', icon: '🍎', clue: 'food stalls and busy crowds' },
  { id: 'homes', name: 'Houses', icon: '🏘️', clue: 'gardens, fences and neighbours' },
  { id: 'river', name: 'River', icon: '💧', clue: 'water, reeds and muddy tracks' },
  { id: 'plaza', name: 'Town Plaza', icon: '⛲', clue: 'people, music and pigeons' }
];

const PET_BLUEPRINTS = [
  { name: 'Pickles', species: 'Corgi', icon: '🐶', rarity: 'Common', personality: 'Food Lover', path: ['school','park','bakery','market'] },
  { name: 'Mochi', species: 'Rabbit', icon: '🐰', rarity: 'Common', personality: 'Shy', path: ['park','forest','library','homes'] },
  { name: 'Sparkles', species: 'Parrot', icon: '🦜', rarity: 'Rare', personality: 'Social Butterfly', path: ['petshop','school','park','plaza'] },
  { name: 'Socks', species: 'Cat', icon: '🐱', rarity: 'Common', personality: 'Hide-and-Seek Champion', path: ['homes','library','forest','homes'] },
  { name: 'Buddy', species: 'Labrador', icon: '🐕', rarity: 'Common', personality: 'Water Chaser', path: ['park','river','beach','river'] },
  { name: 'Noodle', species: 'Ferret', icon: '🦦', rarity: 'Rare', personality: 'Collector', path: ['petshop','market','library','homes'] },
  { name: 'Kiwi', species: 'Macaw', icon: '🦜', rarity: 'Epic', personality: 'Attention Seeker', path: ['plaza','school','market','park'] },
  { name: 'Pepper', species: 'Gecko', icon: '🦎', rarity: 'Epic', personality: 'Warmth Seeker', path: ['petshop','bakery','market','vet'] },
  { name: 'Goldie', species: 'Show Retriever', icon: '🐕', rarity: 'Legendary', personality: 'Champion', path: ['homes','plaza','market','vet'] },
  { name: 'Whiskerbell', species: 'Show Cat', icon: '🐈', rarity: 'Legendary', personality: 'Royal', path: ['library','plaza','homes','vet'] }
];

const AGENCY_LEVELS = [
  { name: 'Garage Office', cost: 0, activeCases: 1, desc: 'A desk, a notebook and big detective dreams.' },
  { name: 'Small Office', cost: 350, activeCases: 2, desc: 'Unlocks a better case board and more agency space.' },
  { name: 'Rescue Centre', cost: 900, activeCases: 3, desc: 'Unlocks room for companion pets and rare cases.' },
  { name: 'Regional HQ', cost: 1800, activeCases: 4, desc: 'Unlocks bigger case chains across the region.' },
  { name: 'National Agency', cost: 4000, activeCases: 5, desc: 'Legendary mysteries can appear on the case board.' }
];

const REPUTATION_TIERS = [
  { name: 'Junior Detective', min: 0 },
  { name: 'Local Detective', min: 100 },
  { name: 'Town Detective', min: 240 },
  { name: 'Senior Detective', min: 480 },
  { name: 'Master Detective', min: 850 },
  { name: 'Elite Detective', min: 1300 }
];

const DESIGN_TASKS = [
  'Pet personalities that matter: movement and clues should reflect the pet personality.',
  'Missing item cases: add stolen toys, buried trophies and lost pet accessories.',
  'Detective notebook: allow players to record theories and predictions.',
  'Rescue celebrations: create thank-you letters, happy owner moments and pet photos.',
  'Seasonal events: add summer, winter, Halloween and holiday pet cases.',
  'Pet HQ display room: show cards, photos, trophies and legendary rescue displays.',
  'Newspaper reports: publish cute headlines after major rescues.',
  'Pet show competitions: bring rescued pets back as community event characters.',
  'Witness relationship system: recurring NPCs give better clues over time.',
  'Legendary case board: long multi-part mysteries such as Phantom Pawprints.'
];

const SAVE_KEY = 'pawsitive-detectives-save-v1';

const defaultState = {
  money: 120,
  reputation: 0,
  day: 1,
  agencyLevel: 0,
  caseNumber: 0,
  activeCase: null,
  clues: [],
  log: 'Welcome to Pawsitive Detectives. Accept your first case, then use the clickable town map to investigate.',
  rescued: [],
  records: [],
  photos: [],
  companions: [],
  tab: 'map',
  lastPetName: null,
  seenCollectionCount: 0,
  seenAgencyLevel: 0,
  celebration: null
};

let state = loadState();
const app = document.getElementById('app');

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(SAVE_KEY));
    return saved ? { ...defaultState, ...saved } : { ...defaultState };
  } catch {
    return { ...defaultState };
  }
}

function saveState() {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
}

function locationName(id) {
  return LOCATIONS.find(l => l.id === id)?.name || id;
}

function stars(n) {
  return '⭐'.repeat(Math.max(1, Math.min(5, n)));
}

function rarityClass(rarity) {
  return `rarity-${(rarity || '').toLowerCase()}`;
}

function currentPetLocation() {
  if (!state.activeCase) return null;
  const path = state.activeCase.path;
  return path[Math.min(state.day - 1, path.length - 1)];
}

function safetyRating() {
  return Math.max(1, 6 - state.day);
}

function caseTier() {
  let name = REPUTATION_TIERS[0].name;
  for (const tier of REPUTATION_TIERS) {
    if (state.reputation >= tier.min) name = tier.name;
  }
  return name;
}

function reputationProgress() {
  const r = state.reputation;
  let idx = 0;
  for (let i = 0; i < REPUTATION_TIERS.length; i++) {
    if (r >= REPUTATION_TIERS[i].min) idx = i;
  }
  const current = REPUTATION_TIERS[idx];
  const next = REPUTATION_TIERS[idx + 1];
  if (!next) return { pct: 100, label: `${current.name} — top rank reached!` };
  const span = next.min - current.min;
  const pct = Math.min(100, Math.round(((r - current.min) / span) * 100));
  return { pct, label: `${r - current.min}/${span} Rep to ${next.name}` };
}

function agencyProgress() {
  const next = AGENCY_LEVELS[state.agencyLevel + 1];
  if (!next) return { pct: 100, label: 'Agency fully upgraded!' };
  const pct = Math.min(100, Math.round((state.money / next.cost) * 100));
  return { pct, label: `$${state.money} / $${next.cost} for ${next.name}` };
}

function choosePet() {
  const unlocked = PET_BLUEPRINTS.filter((pet, index) => {
    if (state.reputation < 200) return index < 5;
    if (state.reputation < 650) return index < 8;
    return true;
  });
  const pool = unlocked.length > 1 ? unlocked.filter(p => p.name !== state.lastPetName) : unlocked;
  return pool[Math.floor(Math.random() * pool.length)];
}

function newCase() {
  if (state.activeCase && !confirm('Start a different case? Your clues for the current case will be lost.')) return;
  const pet = choosePet();
  state.lastPetName = pet.name;
  state.caseNumber += 1;
  state.day = 1;
  state.clues = [];
  state.activeCase = {
    id: `${pet.name}-${Date.now()}`,
    ...pet,
    owner: ['Mrs Brown', 'Mr Singh', 'Dr Murphy', 'Aunty Jo', 'Ranger Bob'][state.caseNumber % 5],
    reward: pet.rarity === 'Legendary' ? 420 : pet.rarity === 'Epic' ? 280 : pet.rarity === 'Rare' ? 190 : 120,
    visited: []
  };
  state.log = `<strong>New case:</strong> ${state.activeCase.owner} needs help finding ${pet.icon} ${pet.name} the ${pet.species}. Personality: ${pet.personality}.`;
  state.tab = 'map';
  saveState();
  render();
}

function nextDay() {
  if (!state.activeCase) return;
  state.day += 1;
  const current = currentPetLocation();
  state.log = `<strong>New day.</strong> The trail has moved. Newer clues matter more. Current reward bonus: ${stars(safetyRating())}.`;
  if (Math.random() < 0.35) {
    const clue = `Fresh rumour: a ${state.activeCase.personality.toLowerCase()} pet may be near ${locationName(current)}.`;
    if (!state.clues.includes(clue)) state.clues.unshift(clue);
  }
  saveState();
  render();
}

function investigate(id) {
  if (!state.activeCase) {
    state.log = 'Accept a case first.';
    render();
    return;
  }
  const pet = state.activeCase;
  const current = currentPetLocation();
  const loc = locationName(id);

  if (!pet.visited) pet.visited = [];
  if (!pet.visited.includes(id)) pet.visited.push(id);

  if (id === current) {
    const safety = safetyRating();
    const reward = pet.reward + safety * 20;
    const rep = 30 + safety * 8;
    const newCompanion = (pet.rarity === 'Epic' || pet.rarity === 'Legendary') && !state.companions.includes(pet.name);
    const record = {
      id: pet.id,
      name: pet.name,
      species: pet.species,
      icon: pet.icon,
      rarity: pet.rarity,
      personality: pet.personality,
      foundAt: loc,
      day: state.day,
      photo: `${pet.icon} ${pet.name} at ${loc}`
    };
    state.money += reward;
    state.reputation += rep;
    state.rescued.push(record);
    state.records.push(`Case ${state.caseNumber}: ${pet.name} the ${pet.species} was found at ${loc} on day ${state.day}. Personality clue: ${pet.personality}.`);
    state.photos.push(record.photo);
    if (newCompanion) {
      state.companions.push(pet.name);
    }
    state.log = `<strong>Case solved!</strong> You found ${pet.icon} ${pet.name} at ${loc}. Reward: <b>$${reward}</b>. Reputation: <b>+${rep}</b>. Card, photo and rescue record unlocked.`;
    state.celebration = {
      icon: pet.icon,
      name: pet.name,
      species: pet.species,
      rarity: pet.rarity,
      foundAt: loc,
      reward,
      rep,
      newCompanion
    };
    state.activeCase = null;
    state.clues = [];
  } else if (pet.path.includes(id)) {
    const seenDay = pet.path.indexOf(id) + 1;
    const age = state.day - seenDay;
    const clue = age <= 0
      ? `${pet.name} has a possible fresh trail near ${loc}.`
      : `${pet.name} was seen at ${loc} around day ${seenDay}. That clue is ${age} day${age === 1 ? '' : 's'} old.`;
    if (!state.clues.includes(clue)) state.clues.unshift(clue);
    state.log = `<strong>Useful clue:</strong> ${clue}`;
  } else {
    const locInfo = LOCATIONS.find(l => l.id === id);
    const clue = `No sign of ${pet.name} at ${loc}, but this place has ${locInfo.clue}. Think about whether that fits a ${pet.personality.toLowerCase()} pet.`;
    if (!state.clues.includes(clue)) state.clues.unshift(clue);
    state.log = `<strong>Search result:</strong> ${clue}`;
  }
  saveState();
  render();
}

function upgradeAgency() {
  const next = AGENCY_LEVELS[state.agencyLevel + 1];
  if (!next) {
    state.log = 'Your agency is already at the highest level.';
  } else if (state.money < next.cost) {
    state.log = `You need $${next.cost} to upgrade to ${next.name}.`;
  } else {
    state.money -= next.cost;
    state.agencyLevel += 1;
    state.log = `<strong>Agency upgraded!</strong> Welcome to ${next.name}. ${next.desc}`;
  }
  saveState();
  render();
}

function resetGame() {
  if (!confirm('Reset the agency and start again?')) return;
  state = { ...defaultState };
  localStorage.removeItem(SAVE_KEY);
  render();
}

function setTab(tab) {
  state.tab = tab;
  if (tab === 'collection') state.seenCollectionCount = state.rescued.length;
  if (tab === 'agency') state.seenAgencyLevel = state.agencyLevel;
  saveState();
  render();
}

function closeCelebration() {
  state.celebration = null;
  saveState();
  render();
}

function headerHtml() {
  const repProgress = reputationProgress();
  return `
    <section class="hero">
      <div>
        <h1>🐾 Pawsitive Detectives</h1>
        <p>A cute pet detective agency PWA. Find pets, read clues, build your collection and grow your agency.</p>
      </div>
      <div class="stats">
        <span class="pill">💰 $${state.money}</span>
        <span class="pill">🏆 Rep ${state.reputation}</span>
        <span class="pill">📅 Day ${state.day}</span>
        <span class="pill">🎖️ ${caseTier()}</span>
        <span class="pill">🏢 ${AGENCY_LEVELS[state.agencyLevel].name}</span>
      </div>
      <div class="hero-progress-wrap">
        <div class="progress-track hero-progress-track"><div class="progress-fill hero-progress-fill" style="width:${repProgress.pct}%"></div></div>
        <div class="progress-caption hero-progress-caption">${repProgress.label}</div>
      </div>
    </section>
  `;
}

function casePanelHtml() {
  const nextLevel = AGENCY_LEVELS[state.agencyLevel + 1];
  if (!state.activeCase) {
    const progress = agencyProgress();
    return `
      <aside class="card case-card">
        <h2>📋 Case Board</h2>
        <p>No active case. Start a new case to help a lost pet.</p>
        <button class="btn good" onclick="newCase()">Accept new case</button>
        <button class="btn purple" onclick="upgradeAgency()">Upgrade agency</button>
        <button class="btn ghost" onclick="resetGame()">Reset save</button>
        <div class="item">
          <b>Next upgrade:</b> ${nextLevel ? `${nextLevel.name} — $${nextLevel.cost}` : 'Fully upgraded'}
          ${nextLevel ? `<div class="progress-track"><div class="progress-fill" style="width:${progress.pct}%"></div></div><div class="progress-caption">${progress.label}</div>` : ''}
        </div>
      </aside>
    `;
  }
  const pet = state.activeCase;
  return `
    <aside class="card case-card">
      <h2>🔎 Active Case</h2>
      <div class="case-pet">
        <div class="pet-name">${pet.icon} ${pet.name}</div>
        <div class="pet-meta">${pet.species} • <span class="rarity-badge ${rarityClass(pet.rarity)}">${pet.rarity}</span></div>
        <div><b>Personality:</b> ${pet.personality}</div>
        <div><b>Owner:</b> ${pet.owner}</div>
        <div><b>Base reward:</b> $${pet.reward}</div>
        <div class="safety">
          <div>Reward bonus: ${stars(safetyRating())}</div>
          <div class="safety-hint">Solve the case quickly for a bigger reward and more reputation!</div>
        </div>
      </div>
      <p>This build uses your preferred difficulty: pets move over days. There is no energy bar, no hard timer and no lives.</p>
      <div class="actions">
        <button class="btn blue" onclick="nextDay()">Next day</button>
        <button class="btn secondary" onclick="newCase()">Try a different case</button>
      </div>
    </aside>
  `;
}

function tabsHtml() {
  const hasNewCollection = state.rescued.length > (state.seenCollectionCount || 0);
  const hasNewAgency = state.agencyLevel > (state.seenAgencyLevel || 0);
  const tabs = [
    ['map', '🗺️ Map', false],
    ['notebook', '📓 Notebook', false],
    ['collection', '⭐ Collection', hasNewCollection],
    ['agency', '🏢 Agency', hasNewAgency],
    ['tasks', '✅ Task List', false]
  ];
  return `<div class="tabs">${tabs.map(([id, label, isNew]) => `<button class="tab ${state.tab === id ? 'active' : ''}" onclick="setTab('${id}')">${label}${isNew ? '<span class="tab-dot"></span>' : ''}</button>`).join('')}</div>`;
}

function mapHtml() {
  const visited = state.activeCase?.visited || [];
  return `
    <section class="card">
      <h2>🗺️ Town Map</h2>
      <p>Click a location to investigate. Older clues may be true but out of date.</p>
      <div class="map-grid">
        ${LOCATIONS.map(l => `
          <button class="location ${visited.includes(l.id) ? 'visited' : ''}" onclick="investigate('${l.id}')">
            <div>
              ${visited.includes(l.id) ? '<div class="visited-badge">✓ checked</div>' : ''}
              <div class="emoji">${l.icon}</div>
              <div class="name">${l.name}</div>
              <div class="hint">${l.clue}</div>
            </div>
          </button>
        `).join('')}
      </div>
      <div class="log">${state.log}</div>
    </section>
  `;
}

function notebookHtml() {
  const clues = state.clues.length ? state.clues.map(c => `<div class="item">${c}</div>`).join('') : '<div class="item">No clues yet. Visit locations to gather evidence.</div>';
  return `
    <section class="card">
      <h2>📓 Detective Notebook</h2>
      <p>Difficulty comes from reading clues and predicting pet movement, not from energy limits.</p>
      <div class="list">${clues}</div>
      <div class="log">${state.log}</div>
    </section>
  `;
}

function collectionHtml() {
  const cards = state.rescued.length ? state.rescued.map(p => `
    <div class="pet-card">
      <div class="big">${p.icon}</div>
      <b>${p.name}</b>
      <span>${p.species}</span><br>
      <span class="rarity-badge ${rarityClass(p.rarity)}">${p.rarity}</span> <span>${p.personality}</span><br>
      <span>Found at ${p.foundAt}</span>
    </div>
  `).join('') : '<div class="item">No pet cards yet. Solve a case to unlock cards, photos and records.</div>';
  return `
    <section class="card">
      <h2>⭐ Pet Collection</h2>
      <p>Every rescued pet unlocks a card, a photo and a rescue record. Epic and legendary rescues can become companions.</p>
      <div class="collection-grid">${cards}</div>
    </section>
  `;
}

function agencyHtml() {
  const level = AGENCY_LEVELS[state.agencyLevel];
  const next = AGENCY_LEVELS[state.agencyLevel + 1];
  const progress = agencyProgress();
  return `
    <section class="card">
      <h2>🏢 Agency</h2>
      <div class="item"><b>Current HQ:</b> ${level.name}<br><small>${level.desc}</small></div>
      <div class="item"><b>Active case capacity:</b> ${level.activeCases}</div>
      <div class="item"><b>Companions:</b> ${state.companions.length ? state.companions.join(', ') : 'None yet'}</div>
      ${next ? `
        <div class="item">
          <b>Progress to ${next.name}:</b>
          <div class="progress-track"><div class="progress-fill" style="width:${progress.pct}%"></div></div>
          <div class="progress-caption">${progress.label}</div>
        </div>
      ` : ''}
      <button class="btn purple" onclick="upgradeAgency()">${next ? `Upgrade to ${next.name} — $${next.cost}` : 'Fully upgraded'}</button>
      <h3 style="margin-top:16px">📁 Rescue Records</h3>
      <div class="list">${state.records.length ? state.records.map(r => `<div class="item">${r}</div>`).join('') : '<div class="item">No rescue records yet.</div>'}</div>
    </section>
  `;
}

function tasksHtml() {
  return `
    <section class="card">
      <h2>✅ Design Task List</h2>
      <p>These are the ten improvement ideas you asked to add to the task list.</p>
      <ol class="task-list">
        ${DESIGN_TASKS.map(t => `<li>${t}</li>`).join('')}
      </ol>
    </section>
  `;
}

function mainHtml() {
  let content = mapHtml();
  if (state.tab === 'notebook') content = notebookHtml();
  if (state.tab === 'collection') content = collectionHtml();
  if (state.tab === 'agency') content = agencyHtml();
  if (state.tab === 'tasks') content = tasksHtml();
  return `
    <main class="layout">
      ${casePanelHtml()}
      <div>${tabsHtml()}${content}</div>
    </main>
    <section class="grid-3">
      <div class="card"><h3>🎯 Core loop</h3><p>Accept case → investigate map → interpret clues → find pet → unlock rewards.</p></div>
      <div class="card"><h3>🧠 Difficulty</h3><p>No energy bars. Pets move by personality, and older clues become less reliable.</p></div>
      <div class="card"><h3>📱 PWA</h3><p>Installable, offline-ready, and saves progress in this browser.</p></div>
    </section>
  `;
}

function celebrationHtml() {
  if (!state.celebration) return '';
  const c = state.celebration;
  const confettiEmoji = ['🎉', '✨', '⭐', '🎊', '🐾'];
  const bits = Array.from({ length: 14 }, (_, i) => {
    const emoji = confettiEmoji[i % confettiEmoji.length];
    const left = (i * 7) % 100;
    const delay = (i % 5) * 0.15;
    return `<span class="confetti" style="left:${left}%; animation-delay:${delay}s;">${emoji}</span>`;
  }).join('');
  return `
    <div class="celebration-overlay">
      <div class="confetti-field">${bits}</div>
      <div class="celebration-card ${rarityClass(c.rarity)}">
        <div class="celebration-title">🎉 Case Solved!</div>
        <div class="celebration-pet">${c.icon}</div>
        <p>You found <b>${c.name}</b> the ${c.species} at <b>${c.foundAt}</b>!</p>
        ${c.newCompanion ? `<p class="companion-note">🏅 ${c.name} joined your agency as a companion!</p>` : ''}
        <div class="celebration-rewards">
          <span class="reward-chip money">+$${c.reward}</span>
          <span class="reward-chip rep">+${c.rep} Rep</span>
        </div>
        <button class="btn good" onclick="closeCelebration()">Awesome!</button>
      </div>
    </div>
  `;
}

function render() {
  app.innerHTML = `<div class="app">${headerHtml()}${mainHtml()}<div class="footer">Made as a first playable PWA prototype.</div></div>${celebrationHtml()}`;
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').catch(() => {});
  });
}

window.newCase = newCase;
window.nextDay = nextDay;
window.investigate = investigate;
window.upgradeAgency = upgradeAgency;
window.resetGame = resetGame;
window.setTab = setTab;
window.closeCelebration = closeCelebration;

render();
