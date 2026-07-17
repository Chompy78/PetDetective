# How to work on Pawsitive Detectives

## Running it locally
Service workers need `http://`, not `file://` — don't just double-click `index.html`. From the repo root:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Manual verification (no automated test suite yet)
After any change, exercise the affected flow by hand:
1. Load the app fresh (clear `localStorage` for a true first-run, or use an existing save to test
   continuity) and confirm it renders with no console errors.
2. Walk the core loop touched by the change: accept a case → travel the map → gather clues →
   investigate → rescue → earn money/reputation → (if relevant) upgrade the agency.
3. If the change touches save data: reload the page and confirm the save survives (`loadState`/
   `saveState`), and try `exportSave`/`importSave` if the shape changed.
4. If the change touches assets the app depends on at runtime, confirm offline mode still works
   (load once online, then reload with the network disabled) — check `service-worker.js`'s cache list
   if something 404s offline.
5. Sanity-check `manifest.webmanifest` still resolves (PWA install prompt) if you touched app metadata
   or icons.

There's no CI wired up for this repo yet. If a task adds meaningful game-logic complexity, consider
proposing a lightweight smoke-test harness as a `docs/TASK_BOARD.md` item rather than skipping
verification — but don't block small changes on that not existing yet.

## Conventions
- Branch per task: `type/short-slug` (e.g. `feat/companion-abilities`, `fix/save-migration`).
- Commit style: Conventional Commits (`type(scope): summary`).
- This repo currently has a single branch (see `AGENTS.md`'s "Branching note") — there's no
  staging/production split to route through.
