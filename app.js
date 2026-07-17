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

const OWNERS = [
  { name: 'Mrs Brown', blurb: 'runs the corner bakery and knows every regular by name' },
  { name: 'Mr Singh', blurb: 'walks the park every morning, rain or shine' },
  { name: 'Dr Murphy', blurb: 'the town vet who treats every animal like family' },
  { name: 'Aunty Jo', blurb: 'grows prize tomatoes and gossips over the garden fence' },
  { name: 'Ranger Bob', blurb: 'keeps an eye on the forest trails and river paths' },
  { name: 'Miss Nguyen', blurb: 'teaches at the school and always has treats in her bag' },
  { name: 'Old Man Rossi', blurb: 'has lived by the plaza fountain for forty years' },
  { name: 'Captain Reyes', blurb: 'runs beach patrol and knows every tide pool' },
  { name: 'Ms Okafor', blurb: 'owns the pet shop and spoils every customer\'s pet' },
  { name: 'The Whitfields', blurb: 'a big family from the houses near the market' }
];

const PERSONALITY_TIPS = {
  'Food Lover': 'Follows its stomach — check bakeries, markets and kitchens first.',
  'Shy': 'Prefers quiet spots like the library, forest or a cosy garden.',
  'Social Butterfly': 'Loves a crowd — try the plaza, school or market.',
  'Hide-and-Seek Champion': 'Tricky to track — quiet corners and homes are worth checking twice.',
  'Water Chaser': 'Follows the water — river, beach and ponds are good bets.',
  'Collector': 'Gathers things — pet shops, markets and libraries attract it.',
  'Attention Seeker': 'Loves a stage — try the plaza and school.',
  'Warmth Seeker': 'Seeks cosy warm spots — bakeries and vets are common hideouts.',
  'Champion': 'Show-trained — expect it near homes, the plaza or the vet.',
  'Royal': 'Elegant and particular — check the library, plaza or a grand house.'
};

const HEADLINE_TEMPLATES = {
  Common: [
    (pet, loc) => `Local Hero Finds ${pet.name} Near ${loc}`,
    (pet, loc) => `${pet.name} the ${pet.species} Back Home Safe`
  ],
  Rare: [
    (pet, loc) => `Rare ${pet.species} ${pet.name} Rescued in Dramatic Search at ${loc}!`,
    (pet, loc) => `Town Cheers as ${pet.name} Returns From ${loc} Adventure`
  ],
  Epic: [
    (pet, loc) => `EPIC RESCUE: ${pet.name} the ${pet.species} Found at ${loc}!`,
    (pet, loc) => `Detective Agency Pulls Off Stunning Save of ${pet.name}!`
  ],
  Legendary: [
    (pet, loc) => `LEGENDARY! ${pet.name} the ${pet.species} Returns Home — Town Celebrates!`,
    (pet, loc) => `HISTORIC RESCUE: ${pet.name} Found at ${loc}, Detective Agency Makes Headlines!`
  ]
};

function generateHeadline(pet, loc) {
  const templates = HEADLINE_TEMPLATES[pet.rarity] || HEADLINE_TEMPLATES.Common;
  const template = templates[Math.floor(Math.random() * templates.length)];
  return template(pet, loc);
}

const THANK_YOU_TEMPLATES = [
  (owner, pet) => `"Thank you for finding ${pet.name}!" says ${owner.name}, who ${owner.blurb}.`,
  (owner, pet) => `${owner.name} wipes away a happy tear: "I can't thank you enough for bringing ${pet.name} home."`,
  (owner, pet) => `"You're a real detective!" ${owner.name} beams, hugging ${pet.name} tight.`
];

const NO_SIGN_TEMPLATES = [
  (pet, loc, locInfo) => `No sign of ${pet.name} at ${loc}, but this place has ${locInfo.clue}. Think about whether that fits a ${pet.personality.toLowerCase()} pet.`,
  (pet, loc, locInfo) => `Nothing here at ${loc} except ${locInfo.clue}. Does that suit a ${pet.personality.toLowerCase()} pet like ${pet.name}?`,
  (pet, loc, locInfo) => `${loc} is quiet today — just ${locInfo.clue}. Doesn't seem like the kind of place a ${pet.personality.toLowerCase()} pet would choose... or does it?`
];

const RARITY_RANK = { Legendary: 4, Epic: 3, Rare: 2, Common: 1 };

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
  headlines: [],
  companions: [],
  tab: 'map',
  lastPetName: null,
  seenCollectionCount: 0,
  seenAgencyLevel: 0,
  celebration: null,
  tutorialDismissed: false,
  soundOn: true,
  totalEarned: 0
};

let state = loadState();
const app = document.getElementById('app');
let deferredInstallPrompt = null;
let canInstall = false;
let updateAvailable = false;

function installApp() {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  deferredInstallPrompt.userChoice.finally(() => {
    deferredInstallPrompt = null;
    canInstall = false;
    render();
  });
}

function reloadApp() {
  window.location.reload();
}

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

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function fmt(n) {
  return n.toLocaleString();
}

function companionIcon(name) {
  return PET_BLUEPRINTS.find(p => p.name === name)?.icon || '🐾';
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

function trailCaption(safety) {
  const captions = {
    5: 'Fresh trail — the reward bonus is at its best right now!',
    4: 'Still a strong trail. Good time to keep searching.',
    3: "The trail's getting older. The bonus is shrinking.",
    2: 'Trail is going cold. Move fast for what bonus is left.',
    1: 'Trail is very cold — reward bonus is down to the minimum.'
  };
  return captions[safety] || captions[1];
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
  return { pct, label: `${fmt(r - current.min)}/${fmt(span)} Rep to ${next.name}` };
}

function agencyProgress() {
  const next = AGENCY_LEVELS[state.agencyLevel + 1];
  if (!next) return { pct: 100, label: 'Agency fully upgraded!' };
  const pct = Math.min(100, Math.round((state.money / next.cost) * 100));
  return { pct, label: `$${fmt(state.money)} / $${fmt(next.cost)} for ${next.name}` };
}

let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  return audioCtx;
}

function playTone(freq, startTime, duration, volume) {
  const ctx = getAudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.frequency.value = freq;
  osc.type = 'sine';
  gain.gain.setValueAtTime(volume, ctx.currentTime + startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime + startTime);
  osc.stop(ctx.currentTime + startTime + duration);
}

function playClickTick() {
  if (!state.soundOn) return;
  try { playTone(520, 0, 0.06, 0.08); } catch {}
}

function playMissTone() {
  if (!state.soundOn) return;
  try { playTone(220, 0, 0.18, 0.08); } catch {}
}

let lastActionTime = 0;

function tooSoon() {
  const now = performance.now();
  if (now - lastActionTime < 250) return true;
  lastActionTime = now;
  return false;
}

function playSuccessChime() {
  if (!state.soundOn) return;
  try {
    playTone(523.25, 0, 0.15, 0.15);
    playTone(659.25, 0.12, 0.15, 0.15);
    playTone(783.99, 0.24, 0.25, 0.15);
  } catch {}
}

function toggleSound() {
  state.soundOn = !state.soundOn;
  saveState();
  render();
}

function dismissTutorial() {
  state.tutorialDismissed = true;
  saveState();
  render();
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
    owner: OWNERS[state.caseNumber % OWNERS.length],
    reward: pet.rarity === 'Legendary' ? 420 : pet.rarity === 'Epic' ? 280 : pet.rarity === 'Rare' ? 190 : 120,
    visited: [],
    theory: ''
  };
  state.log = `<strong>New case:</strong> ${state.activeCase.owner.name} needs help finding ${pet.icon} ${pet.name} the ${pet.species}. Personality: ${pet.personality}.`;
  state.tab = 'map';
  state.tutorialDismissed = true;
  saveState();
  render();
}

function clueText(c) {
  return typeof c === 'string' ? c : c.text;
}

function addClue(text, type) {
  const exists = state.clues.some(c => clueText(c) === text);
  if (!exists) state.clues.unshift({ text, type });
}

function nextDay() {
  if (!state.activeCase || tooSoon()) return;
  state.day += 1;
  const current = currentPetLocation();
  state.log = `<strong>New day.</strong> The trail has moved. Newer clues matter more. Current reward bonus: ${stars(safetyRating())}.`;
  if (Math.random() < 0.35) {
    addClue(`Fresh rumour: a ${state.activeCase.personality.toLowerCase()} pet may be near ${locationName(current)}.`, 'rumour');
  }
  saveState();
  render();
}

function investigate(id) {
  if (!state.activeCase || tooSoon()) return;
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
    state.totalEarned += reward;
    state.reputation += rep;
    state.rescued.push(record);
    state.records.push(`Case ${state.caseNumber}: ${pet.name} the ${pet.species} was found at ${loc} on day ${state.day}. Personality clue: ${pet.personality}.`);
    state.photos.push(record.photo);
    state.headlines.unshift(generateHeadline(pet, loc));
    if (state.headlines.length > 20) state.headlines.length = 20;
    if (newCompanion) {
      state.companions.push(pet.name);
    }
    state.log = `<strong>Case solved!</strong> You found ${pet.icon} ${pet.name} at ${loc}. Reward: <b>$${fmt(reward)}</b>. Reputation: <b>+${fmt(rep)}</b>. Card, photo and rescue record unlocked.`;
    const thankYouTemplate = THANK_YOU_TEMPLATES[Math.floor(Math.random() * THANK_YOU_TEMPLATES.length)];
    state.celebration = {
      icon: pet.icon,
      name: pet.name,
      species: pet.species,
      rarity: pet.rarity,
      foundAt: loc,
      reward,
      rep,
      newCompanion,
      thankYou: thankYouTemplate(pet.owner, pet)
    };
    playSuccessChime();
    state.activeCase = null;
    state.clues = [];
  } else if (pet.path.includes(id)) {
    const seenDay = pet.path.indexOf(id) + 1;
    const age = state.day - seenDay;
    const clue = age <= 0
      ? `${pet.name} has a possible fresh trail near ${loc}.`
      : `${pet.name} was seen at ${loc} around day ${seenDay}. That clue is ${age} day${age === 1 ? '' : 's'} old.`;
    addClue(clue, age <= 0 ? 'fresh' : 'stale');
    state.log = `<strong>Useful clue:</strong> ${clue}`;
    playClickTick();
  } else {
    const locInfo = LOCATIONS.find(l => l.id === id);
    const template = NO_SIGN_TEMPLATES[Math.floor(Math.random() * NO_SIGN_TEMPLATES.length)];
    const clue = template(pet, loc, locInfo);
    addClue(clue, 'dead-end');
    state.log = `<strong>Search result:</strong> ${clue}`;
    playMissTone();
  }
  saveState();
  render();
}

function upgradeAgency() {
  if (tooSoon()) return;
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

function exportSave() {
  const code = btoa(unescape(encodeURIComponent(JSON.stringify(state))));
  if (navigator.clipboard) {
    navigator.clipboard.writeText(code).then(() => {
      state.log = 'Save code copied to clipboard! Paste it somewhere safe.';
      render();
    }).catch(() => {
      prompt('Copy this save code:', code);
    });
  } else {
    prompt('Copy this save code:', code);
  }
}

function importSave() {
  const code = prompt('Paste your save code:');
  if (!code) return;
  try {
    const parsed = JSON.parse(decodeURIComponent(escape(atob(code.trim()))));
    state = { ...defaultState, ...parsed };
    saveState();
    render();
  } catch {
    alert('That save code could not be read. Please check it and try again.');
  }
}

function shareRescue() {
  const c = state.celebration;
  if (!c) return;
  const text = `I just rescued ${c.icon} ${c.name} the ${c.species} at ${c.foundAt} in Pawsitive Detectives! 🐾🔍 +$${fmt(c.reward)}, +${fmt(c.rep)} Rep!`;
  if (navigator.share) {
    navigator.share({ title: 'Pawsitive Detectives', text }).catch(() => {});
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      state.log = 'Rescue summary copied to clipboard!';
      render();
    }).catch(() => {});
  }
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

function saveTheory() {
  if (!state.activeCase) return;
  const input = document.getElementById('theory-input');
  if (!input) return;
  state.activeCase.theory = input.value;
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
        <span class="pill">💰 $${fmt(state.money)}</span>
        <span class="pill">🏆 Rep ${fmt(state.reputation)}</span>
        <span class="pill">📅 Case Day ${state.day}</span>
        <span class="pill">🎖️ ${caseTier()}</span>
        <span class="pill">🏢 ${AGENCY_LEVELS[state.agencyLevel].name}</span>
        <button class="pill sound-toggle" onclick="toggleSound()" aria-label="${state.soundOn ? 'Mute sound effects' : 'Unmute sound effects'}">${state.soundOn ? '🔊' : '🔇'}</button>
        ${canInstall ? '<button class="pill sound-toggle" onclick="installApp()">⬇️ Install App</button>' : ''}
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
        <div class="item">
          <b>Next upgrade:</b> ${nextLevel ? `${nextLevel.name} — $${fmt(nextLevel.cost)}` : 'Fully upgraded'}
          ${nextLevel ? `<div class="progress-track"><div class="progress-fill" style="width:${progress.pct}%"></div></div><div class="progress-caption">${progress.label}</div>` : ''}
        </div>
        <div class="danger-zone">
          <div class="danger-zone-label">Danger zone</div>
          <button class="btn danger" onclick="resetGame()">⚠️ Reset save</button>
        </div>
      </aside>
    `;
  }
  const pet = state.activeCase;
  return `
    <aside class="card case-card">
      <h2>🔎 Active Case <span class="case-counter">#${state.caseNumber}</span></h2>
      <div class="case-pet">
        <div class="pet-name">${pet.icon} ${pet.name}</div>
        <div class="pet-meta">${pet.species} • <span class="rarity-badge ${rarityClass(pet.rarity)}">${pet.rarity}</span></div>
        <div><b>Personality:</b> ${pet.personality}</div>
        <div class="personality-tip">💡 ${PERSONALITY_TIPS[pet.personality] || 'Follow the clues to learn its habits.'}</div>
        <div><b>Owner:</b> ${pet.owner.name}</div>
        <div class="owner-blurb">${pet.owner.name} ${pet.owner.blurb}.</div>
        <div><b>Base reward:</b> $${fmt(pet.reward)}</div>
        <div class="safety">
          <div>Reward bonus: ${stars(safetyRating())}</div>
          <div class="safety-hint">${trailCaption(safetyRating())}</div>
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
    ['map', '🗺️ Map', 'Map', false],
    ['notebook', '📓 Notebook', 'Notebook', false],
    ['collection', '⭐ Collection', 'Collection', hasNewCollection],
    ['hq', '🏆 HQ', 'HQ', false],
    ['agency', '🏢 Agency', 'Agency', hasNewAgency],
    ['tasks', '✅ Task List', 'Task List', false]
  ];
  return `<div class="tabs">${tabs.map(([id, label, name, isNew]) => `<button class="tab ${state.tab === id ? 'active' : ''}" onclick="setTab('${id}')" aria-label="${name}${isNew ? ' (new)' : ''}">${label}${isNew ? '<span class="tab-dot" aria-hidden="true"></span>' : ''}</button>`).join('')}</div>`;
}

function mapHtml() {
  const visited = state.activeCase?.visited || [];
  return `
    <section class="card">
      <h2>🗺️ Town Map</h2>
      <p>Click a location to investigate. Older clues may be true but out of date.</p>
      <div class="map-grid">
        ${LOCATIONS.map(l => `
          <button class="location ${visited.includes(l.id) ? 'visited' : ''}" onclick="investigate('${l.id}')" aria-label="${l.name}: ${l.clue}${visited.includes(l.id) ? ' (already checked)' : ''}">
            <div>
              ${visited.includes(l.id) ? '<div class="visited-badge">✓ checked</div>' : ''}
              <div class="emoji" aria-hidden="true">${l.icon}</div>
              <div class="name">${l.name}</div>
              <div class="hint">${l.clue}</div>
            </div>
          </button>
        `).join('')}
      </div>
      <div class="log" aria-live="polite">${state.log}</div>
    </section>
  `;
}

const CLUE_TYPE_META = {
  fresh: { icon: '🔥', cls: 'clue-fresh' },
  stale: { icon: '🕰️', cls: 'clue-stale' },
  rumour: { icon: '🗯️', cls: 'clue-rumour' },
  'dead-end': { icon: '❌', cls: 'clue-deadend' },
  note: { icon: '📝', cls: '' }
};

function notebookHtml() {
  const clues = state.clues.length ? state.clues.map(c => {
    const text = clueText(c);
    const type = typeof c === 'string' ? 'note' : c.type;
    const meta = CLUE_TYPE_META[type] || CLUE_TYPE_META.note;
    return `<div class="item ${meta.cls}">${meta.icon} ${text}</div>`;
  }).join('') : `<div class="item">No clues yet. <button class="btn ghost btn-inline" onclick="setTab('map')">Go investigate →</button></div>`;
  const theorySection = state.activeCase ? `
    <div class="theory-box">
      <label for="theory-input"><b>Your theory:</b></label>
      <textarea id="theory-input" class="theory-input" placeholder="What do you think is going on?">${escapeHtml(state.activeCase.theory || '')}</textarea>
      <button class="btn secondary" onclick="saveTheory()">💾 Save theory</button>
      ${state.activeCase.theory ? '<span class="theory-saved-note">✓ saved</span>' : ''}
    </div>
  ` : '<div class="item">Accept a case to start recording your theories.</div>';
  return `
    <section class="card">
      <h2>📓 Detective Notebook</h2>
      <p>Difficulty comes from reading clues and predicting pet movement, not from energy limits. 🔥 fresh · 🕰️ getting old · 🗯️ rumour · ❌ dead end</p>
      ${theorySection}
      <div class="list">${clues}</div>
      <div class="log" aria-live="polite">${state.log}</div>
    </section>
  `;
}

function collectionHtml() {
  const cards = state.rescued.length ? [...state.rescued].reverse().map(p => `
    <div class="pet-card">
      <div class="big">${p.icon}</div>
      <b>${p.name}</b>
      <span>${p.species}</span><br>
      <span class="rarity-badge ${rarityClass(p.rarity)}">${p.rarity}</span> <span>${p.personality}</span><br>
      <span>Found at ${p.foundAt}</span>
    </div>
  `).join('') : `<div class="item">No pet cards yet. <button class="btn ghost btn-inline" onclick="setTab('map')">Go investigate →</button></div>`;
  const photos = state.photos.length ? [...state.photos].reverse().map(p => `<div class="photo-chip">${p}</div>`).join('') : '<div class="item">No photos yet.</div>';
  const headlines = state.headlines.length ? state.headlines.map(h => `<div class="item headline-item">${h}</div>`).join('') : '<div class="item">No headlines yet — solve a case to make the news.</div>';
  return `
    <section class="card">
      <h2>⭐ Pet Collection</h2>
      <p>Every rescued pet unlocks a card, a photo and a rescue record. Epic and legendary rescues can become companions.</p>
      <div class="collection-grid">${cards}</div>
      <h3 style="margin-top:16px">📸 Photo Album</h3>
      <div class="photo-grid">${photos}</div>
      <h3 style="margin-top:16px">📰 Newspaper</h3>
      <div class="list">${headlines}</div>
    </section>
  `;
}

function hqHtml() {
  if (!state.rescued.length) {
    return `
      <section class="card">
        <h2>🏆 HQ Display Room</h2>
        <p>Nothing on display yet — solve your first case to start filling the trophy shelf.</p>
      </section>
    `;
  }
  const topRescues = [...state.rescued].sort((a, b) => (RARITY_RANK[b.rarity] || 0) - (RARITY_RANK[a.rarity] || 0));
  const trophyCards = topRescues.map(p => `
    <div class="pet-card trophy-card">
      <div class="big">${p.icon}</div>
      <b>${p.name}</b>
      <span class="rarity-badge ${rarityClass(p.rarity)}">${p.rarity}</span>
      <br><span>Found at ${p.foundAt}</span>
    </div>
  `).join('');
  const companionRow = state.companions.length
    ? state.companions.map(name => `<span class="companion-chip">${companionIcon(name)} ${name}</span>`).join('')
    : '<span class="item">No companions yet — rescue an Epic or Legendary pet.</span>';
  const photoStrip = state.photos.length
    ? [...state.photos].reverse().map(p => `<div class="photo-chip">${p}</div>`).join('')
    : '<div class="item">No photos yet.</div>';
  return `
    <section class="card">
      <h2>🏆 HQ Display Room</h2>
      <p>Your agency's proudest moments, on display for every visitor to see.</p>
      <h3 style="margin-top:16px">🏅 Trophy Shelf</h3>
      <div class="collection-grid">${trophyCards}</div>
      <h3 style="margin-top:16px">🐾 Companions</h3>
      <div class="companion-row">${companionRow}</div>
      <h3 style="margin-top:16px">📸 Photo Strip</h3>
      <div class="photo-grid">${photoStrip}</div>
    </section>
  `;
}

function agencyHtml() {
  const level = AGENCY_LEVELS[state.agencyLevel];
  const next = AGENCY_LEVELS[state.agencyLevel + 1];
  const progress = agencyProgress();
  const companions = state.companions.length
    ? state.companions.map(name => `<span class="companion-chip">${companionIcon(name)} ${name}</span>`).join('')
    : 'None yet';
  return `
    <section class="card">
      <h2>🏢 Agency</h2>
      <div class="item"><b>Current HQ:</b> ${level.name}<br><small>${level.desc}</small></div>
      <div class="item"><b>Active case capacity:</b> ${level.activeCases}</div>
      <div class="item"><b>Companions:</b> ${companions}</div>
      ${next ? `
        <div class="item">
          <b>Progress to ${next.name}:</b>
          <div class="progress-track"><div class="progress-fill" style="width:${progress.pct}%"></div></div>
          <div class="progress-caption">${progress.label}</div>
        </div>
      ` : ''}
      <button class="btn purple" onclick="upgradeAgency()">${next ? `Upgrade to ${next.name} — $${fmt(next.cost)}` : 'Fully upgraded'}</button>

      <h3 style="margin-top:16px">📊 Career Stats</h3>
      <div class="item"><b>Cases attempted:</b> ${fmt(state.caseNumber)}</div>
      <div class="item"><b>Pets rescued:</b> ${fmt(state.rescued.length)}</div>
      <div class="item"><b>Lifetime earnings:</b> $${fmt(state.totalEarned)}</div>

      <h3 style="margin-top:16px">💾 Backup & Restore</h3>
      <div class="actions actions-inline">
        <button class="btn blue" onclick="exportSave()">📋 Copy save code</button>
        <button class="btn ghost" onclick="importSave()">📥 Load save code</button>
      </div>

      <h3 style="margin-top:16px">📁 Rescue Records</h3>
      <div class="list">${state.records.length ? [...state.records].reverse().map(r => `<div class="item">${r}</div>`).join('') : '<div class="item">No rescue records yet.</div>'}</div>
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
      <p class="suggest-link">Got an idea of your own? Add it to <a href="https://github.com/Chompy78/PetDetective/blob/main/TASKS.md" target="_blank" rel="noopener">TASKS.md on GitHub</a>.</p>
    </section>
  `;
}

function tutorialHtml() {
  if (state.tutorialDismissed || state.caseNumber > 0) return '';
  return `
    <section class="card tutorial-tip">
      <h2>👋 New to Pawsitive Detectives?</h2>
      <ol class="task-list">
        <li>Accept a case from the Case Board.</li>
        <li>Click locations on the Town Map to investigate.</li>
        <li>Read your clues in the Notebook and think about the pet's personality.</li>
        <li>Click the right location to rescue the pet and earn rewards!</li>
      </ol>
      <button class="btn ghost" onclick="dismissTutorial()">Got it, thanks!</button>
    </section>
  `;
}

function mainHtml() {
  let content = mapHtml();
  if (state.tab === 'notebook') content = notebookHtml();
  if (state.tab === 'collection') content = collectionHtml();
  if (state.tab === 'hq') content = hqHtml();
  if (state.tab === 'agency') content = agencyHtml();
  if (state.tab === 'tasks') content = tasksHtml();
  return `
    ${tutorialHtml()}
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
        <p class="thank-you">${c.thankYou}</p>
        ${c.newCompanion ? `<p class="companion-note">🏅 ${c.name} joined your agency as a companion!</p>` : ''}
        <div class="celebration-rewards">
          <span class="reward-chip money">+$${fmt(c.reward)}</span>
          <span class="reward-chip rep">+${fmt(c.rep)} Rep</span>
        </div>
        <div class="celebration-actions">
          <button class="btn good" onclick="closeCelebration()">Awesome!</button>
          <button class="btn blue" onclick="shareRescue()">📤 Share</button>
        </div>
      </div>
    </div>
  `;
}

function updateBannerHtml() {
  if (!updateAvailable) return '';
  return `
    <div class="update-banner">
      <span>🔄 A new version of the game is ready.</span>
      <button class="btn blue" onclick="reloadApp()">Refresh</button>
    </div>
  `;
}

function render() {
  app.innerHTML = `${updateBannerHtml()}<div class="app">${headerHtml()}${mainHtml()}<div class="footer">Made as a first playable PWA prototype.</div></div>${celebrationHtml()}`;
}

if ('serviceWorker' in navigator) {
  const hadController = !!navigator.serviceWorker.controller;
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').catch(() => {});
  });
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (hadController) {
      updateAvailable = true;
      render();
    }
  });
}

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
  canInstall = true;
  render();
});

window.addEventListener('appinstalled', () => {
  canInstall = false;
  deferredInstallPrompt = null;
  render();
});

window.newCase = newCase;
window.nextDay = nextDay;
window.investigate = investigate;
window.upgradeAgency = upgradeAgency;
window.resetGame = resetGame;
window.setTab = setTab;
window.closeCelebration = closeCelebration;
window.toggleSound = toggleSound;
window.dismissTutorial = dismissTutorial;
window.installApp = installApp;
window.reloadApp = reloadApp;
window.exportSave = exportSave;
window.importSave = importSave;
window.shareRescue = shareRescue;
window.saveTheory = saveTheory;

render();
