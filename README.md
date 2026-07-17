# 🐾 Pawsitive Detectives

Pawsitive Detectives is a browser-based Progressive Web App (PWA) where players become pet detectives, helping owners find lost animals across a growing town.

Designed for children aged 8–14, the game combines:

* 🕵️ Detective clue solving
* 🗺️ Exploration via a clickable town map
* 🐶 Pet rescue missions
* ⭐ Collectible pet cards and records
* 📸 Pet photo collection
* 🏢 Detective agency progression
* 🔍 Increasingly complex mystery investigations

Unlike many mobile games, difficulty comes from understanding pet behaviour and following moving clues, not from energy systems, waiting timers, or lives.

Players start as a Junior Detective working from a small garage office and gradually build a National Pet Detective Agency capable of tackling legendary multi-part mysteries.

## Core Gameplay Loop

1. Accept a missing pet case
2. Travel around the town map
3. Gather clues and witness reports
4. Predict where the pet has moved
5. Rescue the pet
6. Earn money and reputation
7. Unlock cards, photos, records, and companion pets
8. Upgrade the agency
9. Take on larger and more difficult investigations

## Current Status

✅ Playable MVP Prototype

Implemented:

* PWA support
* Offline functionality
* Local save system
* Clickable town map
* Moving pet difficulty system
* Agency progression
* Collectible pet records
* Reputation system
* Soft difficulty scaling

Planned features:

* Procedurally generated cases
* Witness relationship system
* Companion pet abilities
* Seasonal events
* Newspaper reports
* Legendary mystery chains
* Pet show competitions
* Detective notebook and theory system

Find the pets. Build the agency. Solve the mystery. 🐾🔍🏆

## What is included

- `index.html` - app shell.
- `styles.css` - cute cartoon visual style.
- `app.js` - the game logic.
- `manifest.webmanifest` - PWA install metadata.
- `service-worker.js` - offline cache support.
- `icons/` - 192px and 512px app icons.
- `TASKS.md` - the design task list, including the 10 improvement ideas.

## How to run locally

Because service workers usually need a local server, do not open `index.html` directly if you want to test PWA/offline behaviour.

From this folder, run:

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## How to install as a PWA

Open the local URL in Chrome, Edge or another PWA-capable browser. Use the browser's install option when it appears.

## Notes

This is an MVP prototype, not the final game. It is intentionally built as plain HTML/CSS/JavaScript so it is easy to inspect, modify and move into a larger project later.
