# Sweep Log

One entry per `/sweep-tasks` run, newest on top.

## 2026-07-17

**Batch size:** all 9 tasks that cleared the Risk bar (user chose "all 9 eligible" when asked).
**Workflow note:** adapted to commit directly to `main` for each task (no worktrees/branches/PRs) per this
repo's standing no-branch convention — a deliberate, explicit exception agreed with the user before this
run, since `/run-task`'s default flow assumes branch-per-task.

| Task | Effort/Risk | Outcome |
|---|---|---|
| Rescue thank-you letters | low/low | MERGED |
| Newspaper headlines | low/low | MERGED |
| Detective theories & predictions | medium/low | MERGED |
| Pet HQ trophy room | medium/low | MERGED |
| Personality-driven movement | medium/medium | PARKED — review found the weighted-random path generator broke two invariants the hand-authored paths preserved: no guaranteed personality-matching stop, and no-repeat-across-days (which falsified `nextDay()`'s "trail has moved" text and made `investigate()`'s `path.indexOf()` clue-age math wrong ~52% of the time for 3-tag personalities). |
| Witness relationship system | medium-high/medium | PARKED — the bonus-clue mechanic (reveal a real path stop once owner affinity ≥ 2) lets a player reach a near-free solve every time it triggers, since `nextDay()` has no cost. Also surfaced a **new, separate, pre-existing bug** (not part of this task): `defaultState`'s mutable fields are shared references, so `resetGame()`/`loadState()` don't actually give a clean slate within the same page session. Filed as its own NEXT task. |
| Missing-item cases | high/medium | Not attempted — circuit breaker tripped (2 consecutive parks) before reaching this task. |
| Seasonal events | high/medium | Not attempted — circuit breaker tripped before reaching this task. |
| Pet show competitions | high/medium | Not attempted — circuit breaker tripped before reaching this task. |

**Circuit breaker:** triggered after 2 consecutive parks (Personality-driven movement, Witness relationship
system). Both parked tasks touched core case-generation/clue logic that their own board entries had already
flagged as needing a human design decision (`Risk: medium` with an explicit "a human should confirm the
approach" note) — the pattern suggests the remaining untried LATER-bucket tasks share a similar risk
profile and may need human input on approach before another sweep attempts them, not just a retry.

**New task discovered and added to the board:** "Fix: defaultState's mutable fields leak across
resetGame()/loadState()" (🟡 NEXT, Effort: low, Risk: medium) — a genuine, previously-undiscovered bug,
unrelated to any single task in this sweep's queue.
