<!-- Destination: .github/copilot-instructions.md -->
# Pawsitive Detectives — instructions for AI coding agents

**Full instructions live in [`/AGENTS.md`](../AGENTS.md) at the repo root — read it before making any
change.** This stub repeats only the safety-critical rules so they are always in front of you.

Pawsitive Detectives is a static, vanilla-JS browser PWA. No frameworks, no build step, no npm, no backend.

## Hard rules (the non-negotiables — `AGENTS.md` has the rest)
- Vanilla JS only. No frameworks, bundlers, TypeScript, or npm dependencies — this is a deliberate design
  choice, not a gap to fill.
- No backend/server code. `localStorage` (via `app.js`'s `SAVE_KEY`) is the only persistence.
- Don't confuse `TASKS.md` (in-game design-ideas content) with the engineering roadmap
  (`docs/TASK_BOARD.md`) — they are different files with different purposes.
- If a change alters the save-data shape, bump `SAVE_KEY` in `app.js` and consider a migration path.
- No automated test suite yet — verify manually via a local static server (see `docs/HOW-TO-WORK.md`).
- Log as you go: update `CHANGELOG.md` (what) and, for real architectural choices, `DECISIONS.md` (why).

→ For architecture, the single-file structure, and the full checklist, **read [`/AGENTS.md`](../AGENTS.md).**
