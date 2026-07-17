# Decisions

Architectural/process decisions and the *why* behind them. Format:

```
## D-<YYYY-MM-DD>-<branch-slug> — <short title>
**Context:** what prompted this decision.
**Options:** what was considered.
**Decision:** what was chosen.
**Why:** the reasoning.
**Status:** Active | Superseded by D-...
```

## D-2026-07-17-on-hold-bucket — Add an ⏸️ ON HOLD bucket to the task board
**Context:** A batch of 60 brainstormed ideas needed to be captured on `docs/TASK_BOARD.md` without being
eligible for automatic pickup by `/pick-task` or `/sweep-tasks` — most are speculative, unscoped, or
explicitly flagged as needing a human decision before they're built.
**Options:** (1) Put them in LATER and rely on Risk ratings alone — rejected, since `/pick-task` has no
risk gate at all and would still surface them; (2) a separate file outside `docs/TASK_BOARD.md` — rejected,
splits the single source of truth the skills already read; (3) a fourth board bucket (`⏸️ ON HOLD`)
excluded by explicit instruction in `/pick-task`, `/sweep-tasks`, and `/add-task`, and documented in
`AGENTS.md`.
**Decision:** Option 3 — a fourth `⏸️ ON HOLD` bucket, excluded by name in every skill that reads the board.
**Why:** Keeps one file as the single source of truth while giving a real, board-visible "parked, don't
touch" state that doesn't depend on Risk tagging alone (which `/pick-task` doesn't use as a gate at all).
**Status:** Active
