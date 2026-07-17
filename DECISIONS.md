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

## D-2026-07-17-detective-theories — Escape player-entered theory text before rendering
**Context:** The detective-theories task adds the first free-text player input in the codebase (`state.
activeCase.theory`) that gets interpolated into `innerHTML` via `render()`'s `*Html()` functions — every
other dynamic string in the game is developer-authored. `AGENTS.md`'s hard rules already flag unescaped
innerHTML interpolation as a risk once player-generated text is involved.
**Options:** (1) Interpolate the raw value — rejected, since typing `<`/`>`/`&` would corrupt the
`<textarea>`'s own markup, not just a theoretical security concern; (2) escape it at render time.
**Decision:** Added an `escapeHtml()` helper and apply it to `state.activeCase.theory` wherever it's
rendered.
**Why:** Fixes a real, easily-triggered rendering bug (not just a hypothetical one) and establishes the
pattern to reuse for any future free-text player input (e.g. a custom agency name).
**Status:** Active

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
