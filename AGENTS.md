# Pawsitive Detectives — instructions for AI coding agents

> **Single source of truth.** Edit ONLY this file. `CLAUDE.md` imports it (`@AGENTS.md`);
> `.github/copilot-instructions.md` is a stub that points here.

Pawsitive Detectives is a static, vanilla-JS browser PWA (a pet-detective game for kids 8–14) — no
frameworks, no build step, no npm, no backend. It runs entirely client-side; the only "server" is a local
static file server for testing (service workers require `http://`, not `file://`).

## Active Priorities
- **Current focus:** see `docs/TASK_BOARD.md` for open engineering work. This is a fresh scaffold — the
  board starts empty; fold in real priorities as they come up.
- **`docs/TASK_BOARD.md` has four buckets, not three:** 🔴 NOW / 🟡 NEXT / 🟢 LATER (normal, pickable work)
  plus **⏸️ ON HOLD** — ideas intentionally parked and excluded from `/pick-task` and `/sweep-tasks` by
  explicit instruction in each of those skills. Promote a task out of ON HOLD by moving its whole block into
  NOW/NEXT/LATER; never treat an ON HOLD task as available just because it's formatted like the others.
- **Do not confuse `TASKS.md` with the engineering roadmap.** `TASKS.md` (repo root) is **game content** —
  it's the design-ideas list shown in-app under the "✅ Task List" tab, backed by the `DESIGN_TASKS` const
  in `app.js`. The engineering roadmap lives in `docs/TASK_BOARD.md` instead. Don't merge these two files.
- **High-risk areas:** `app.js`'s save/load path (`loadState`, `saveState`, `exportSave`, `importSave`,
  `SAVE_KEY`) — this is the only persistence layer (browser `localStorage`, one JSON blob), so a shape
  change here can silently corrupt or orphan existing players' save data. Bump `SAVE_KEY` (e.g.
  `pawsitive-detectives-save-v1` → `...-v2`) whenever the save shape changes incompatibly, and handle the
  old-shape case in `loadState` if a graceful migration is feasible.
- **Preferred task shape:** one task per branch (`type/short-slug`), small focused changes. This repo is a
  solo prototype — skip elaborate process for trivial tweaks (copy, CSS, a single data-table entry); use
  the `/add-task` → `/pick-task` → `/run-task` flow mainly for anything touching game logic or save data.
- **Avoid:** silently changing the save-data shape without a `SAVE_KEY` bump; splitting the single-file
  structure into a build-step/framework setup without discussing it first (the README calls out
  "intentionally plain HTML/CSS/JS" as a deliberate choice, not an oversight); scope creep — this is an MVP
  prototype, so prefer the smallest change that satisfies a task over a bigger refactor.
- **Verification expectations:** there is no automated test suite yet. Verify manually: serve the app
  locally (`python3 -m http.server 8080` from the repo root, then open `http://localhost:8080`) and
  exercise the changed flow end-to-end (see `docs/HOW-TO-WORK.md`). If a task adds real complexity to game
  logic, consider proposing a lightweight smoke-test harness as a `docs/TASK_BOARD.md` NEXT item rather
  than skipping verification.

## Architecture — read before editing
- **Everything lives in one file: `app.js`.** There's no engine/UI split like a larger app might have —
  data tables (`LOCATIONS`, `PET_BLUEPRINTS`, `AGENCY_LEVELS`, `OWNERS`, `REPUTATION_TIERS`, etc.), game
  logic (`investigate`, `nextDay`, `upgradeAgency`, case/clue generation), persistence (`loadState`/
  `saveState`/`exportSave`/`importSave`), and rendering (`render()` plus the `*Html()` functions that build
  innerHTML strings) all sit side by side as top-level consts/functions in that one file.
- **State is a single global `state` object** (`let state = loadState()`), mutated in place by the game-
  logic functions and re-rendered via `render()`. There's no framework, no virtual DOM, no reactivity system
  — a function that changes `state` is expected to call `render()` (or rely on a caller that does)
  afterward, or the UI will silently go stale.
- **`index.html`** is a thin shell: it loads `styles.css`, mounts into `<div id="app">`, and loads `app.js`
  as a deferred classic script (no `type="module"`, no bundler).
- **`service-worker.js`** + `manifest.webmanifest` give PWA install + offline support. If you add or rename
  any file the app depends on at runtime, check the service worker's cache list so offline mode doesn't
  serve a stale/missing asset.
- **`styles.css`** is the visual layer (cartoon/kid-friendly style) — plain CSS, no preprocessor.

## Hard rules for any change
- Vanilla JS only — no frameworks, bundlers, TypeScript, or npm dependencies. This is a deliberate,
  stated design choice (see `README.md`'s "Notes" section), not a gap to fill.
- No backend/server code. The app is static files; `localStorage` is the only persistence. If a future
  task ever adds a real backend, that's an architectural decision big enough for `DECISIONS.md`, not a
  quiet addition.
- Keep the PWA installable and offline-capable: don't break `manifest.webmanifest` or
  `service-worker.js`'s cache list.
- Test locally via a static file server (not `file://`) before calling a change done — see
  `docs/HOW-TO-WORK.md`.
- Every player-supplied or dynamic string that reaches innerHTML (any of the `*Html()` functions in
  `app.js`) must be safe to render — this app has no user-generated text crossing between different
  players today (single local save file), but if that ever changes, treat unescaped interpolation into
  innerHTML as a stored-XSS risk, not just a display bug.

## Branching note
This repo currently has a single branch (its GitHub default is `claude/pawsitive-detectives-github-wyvroi`,
not `main`) — there's no staging/production split like a larger app might use. Until/unless that changes,
treat the default branch as the single trunk: branch off it per task (`type/short-slug`), and merge back
into it. (Renaming the repo's default branch to something conventional like `main` is a repo-settings
change, not a file edit — flag it for the human to decide rather than doing it inside a task branch.)

## Log as you go (this is how context survives between sessions)
Before finishing a task:
- **`CHANGELOG.md`** — *what* changed, one line.
- **`DECISIONS.md`** — *why*, on any real architectural/process choice (Context → Options → Decision → Why
  → Status). Most small tweaks in a project this size won't need an entry — reserve it for choices a future
  session would otherwise have to re-derive (e.g. "why does `loadState` special-case the old save shape").
- **`docs/sessions/<date>-<topic>.md`** — the discussion, when it's worth keeping (optional for small
  sessions — don't force one for a one-line fix).
- **Graduate:** when a `docs/TASK_BOARD.md` task is DONE, move it into `CHANGELOG.md` in the same change.

## Multiple sessions
More than one agent/session may work on this repo over time. `docs/TASK_BOARD.md` has a single writer per
change — if you have new roadmap items mid-task, note them and fold them in as part of wrapping up rather
than appending mid-flight from multiple places at once.

**Decision IDs:** use `D-<YYYY-MM-DD>-<branch-slug>` for any `DECISIONS.md` entry (today's date + the
task's branch slug after `type/`) — collision-proof by construction since one task = one branch = one slug.

## File & data map
- **App:** `index.html` (shell) · `styles.css` · `app.js` (data + logic + rendering) ·
  `manifest.webmanifest` · `service-worker.js` · `icons/`.
- **Game content (not engineering docs):** `TASKS.md` — in-game design-ideas list, rendered via
  `DESIGN_TASKS`/`tasksHtml()` in `app.js`. Leave alone unless a task specifically targets that content.
- **Engineering docs:** `docs/TASK_BOARD.md` (open work) · `docs/HOW-TO-WORK.md` (how to run/verify) ·
  `docs/sessions/` · `DECISIONS.md` · `CHANGELOG.md`.
- **Data rule:** the browser's `localStorage` (key `SAVE_KEY` in `app.js`) is the only store of player
  state — there is no server-side copy. Derived display values (stars, progress bars, tier labels) should
  be computed from `state` at render time, not stored redundantly in `state` itself.

## Per-change checklist
1. One task, one branch — name it `type/short-slug` (e.g. `feat/…`, `fix/…`, `docs/…`).
2. If the change touches save-data shape, bump `SAVE_KEY` and consider a migration path in `loadState`.
3. Verify manually per `docs/HOW-TO-WORK.md` (no automated suite yet).
4. Update `CHANGELOG.md` (always) · `DECISIONS.md` (if there's a non-obvious *why*) · `docs/sessions/` (if
   worth preserving). Graduate the task out of `docs/TASK_BOARD.md` if done.
5. Commit as `type(scope): summary` (Conventional Commits).

## Communication conventions (carried over from prior project experience — repo-agnostic habits)

### Presenting options and recommendations
When presenting multiple options, use tiered lettering: top-level question = A, B, C… (sequential, never
repeated within a session); options under each = A1, A2, B1, B2, etc. Default to 2-4 genuine options where
practical. State the recommendation upfront with reasoning; skip it if there's no genuine basis for one.
Every option gets a one-line reason, not a bare label. Don't use this format for simple clarification
questions or single-fact answers.

### Fix depth — surface shallow vs deep, don't default to the cheap one
When a problem admits both a shallow fix (a local guard, a minimal diff) and a deeper fix (removing the
root cause), present both with a one-line tradeoff each and a recommendation — don't silently propose only
the cheap one. Default to the deeper fix when it's low/moderate risk and durable.

### `AskUserQuestion` — a tool error is not an answer
If the tool call itself errors, retry the same question once rather than assuming an answer. Restate the
answer received before acting on it.

## Working discipline
- **Files win over chat.** Institutional memory lives in the repo (`AGENTS.md`, `TASK_BOARD.md`,
  `DECISIONS.md`, `CHANGELOG.md`), not in chat history.
- **Check real state before a structural edit.** Run `git status`/`git diff` before assuming a file is
  what you last read — another session may have changed it.
- **Edit, don't regenerate.** Change a file via minimal diff from its actual current content; never
  rewrite wholesale from a narrowed context.
- **Verify before writing an absence claim.** Before writing "X isn't possible" into a project file,
  confirm it with at least two genuinely different checks.
