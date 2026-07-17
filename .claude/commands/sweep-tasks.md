---
description: Autonomously work through every low/medium-risk TODO on the roadmap — pick, execute, review, merge, repeat — adding any newly-surfaced tasks to the board along the way
argument-hint: [batch size, e.g. 6]
---

# Pawsitive Detectives — sweep the roadmap's quick, safe work

The unattended version of `/pick-task` → `/run-task` → `/code-review` → merge, run in a loop over every
eligible task instead of one at a time with a human confirming each step. If the board has nothing
eligible, say so plainly and stop — that's a legitimate outcome, not a failure to route around.

**Requires `/add-task`'s Effort/Risk tags.** A task with no Effort/Risk line, or `Risk: high`, is never
eligible, no matter how low Effort is — Risk is the only safety gate, `high` is an absolute veto.

**`⏸️ ON HOLD` is entirely out of scope for this skill, full stop.** Tasks parked there are excluded before
the Risk filter even applies, regardless of their Effort/Risk tags — they must never appear in the
candidate queue, the eligible list, or the final report's "eligible" counts.

**Merge-as-you-go** is this skill's fixed behavior — every PR it opens gets merged once checks pass, no
per-run prompt. Since this repo has a single branch, "merge" here just means merging the PR into that
branch — there's no separate staging→production promotion step to manage.

## Step 1 — get live state

Delegate to an `Explore`-type subagent, same reasoning as `/pick-task`:
```
git fetch origin
git show origin/<default-branch>:AGENTS.md
git show origin/<default-branch>:docs/TASK_BOARD.md
```
Return the branch-naming convention and every `— TODO` task in NOW/NEXT/LATER verbatim, including each
one's Effort/Risk tag line (state plainly which tasks have none). **Do not read tasks under `⏸️ ON HOLD`
into this list at all** — that bucket is never in scope for this skill.

## Step 2 — build the eligible queue

Start from NOW/NEXT/LATER tasks only — `⏸️ ON HOLD` was already excluded in Step 1 and must not resurface
here. Filter to `Risk: low` or `Risk: medium`. Untagged tasks are excluded — list them in the final report,
don't guess a rating for them. Order: priority first (NOW → NEXT → LATER), then Effort ascending as a
tiebreak.

**Batch size:** use `$ARGUMENTS` as the cap only if it's a bare positive integer. Otherwise ask once via
`AskUserQuestion` — recommended default 3-5 given this repo's size — before doing anything else. This is
the only prompt this skill makes; everything after runs unattended.

If zero tasks are eligible, report why (untagged, or `Risk: high`) and stop.

## Step 3 — pre-flight each candidate

For each candidate, in order:
```
git ls-remote --heads origin <type/short-slug>
git branch --list <type/short-slug>
```
If the branch exists, drop this candidate and move to the next eligible one. Use `TaskCreate` to log the
surviving queue so progress survives a context compaction; mark `in_progress`/`completed` (with a
`MERGED:`/`PARKED:`/`DROPPED:` prefix noting the outcome) as you go. If resuming an interrupted sweep,
check `TaskList` first rather than re-picking from scratch.

## Step 4 — execute each task in the queue, in order

Track a **consecutive-failure counter**, starting at 0. A "failure" is: `/run-task` dropping a task as
bigger-than-expected, an unresolvable rebase conflict, or a review finding that required parking. Reset to
0 on every merge. **If the counter reaches 2, stop the sweep immediately** and report why — a string of
failures usually means something's wrong outside any one task, not that the next one will succeed.

For each surviving candidate:
1. **Invoke `/run-task <type/short-slug>`.** If it drops the task as bigger than expected, record that,
   count it toward the circuit breaker, move on.
2. **Determine review depth from Risk:** `Risk: low` → `/code-review low`. `Risk: medium` → `/code-review
   medium`. Run it against the PR `/run-task` opened.
3. **If real findings survive**, re-enter the branch (`EnterWorktree`, `git fetch origin
   <type/short-slug>`, `git reset --hard origin/<type/short-slug>`, `git branch -m <type/short-slug>`),
   fix, re-verify manually per `docs/HOW-TO-WORK.md`, commit, rebase onto the default branch. If the
   rebase conflicts, don't resolve it silently — abort, park the task (leave the roadmap entry, don't
   merge), count it toward the circuit breaker, `ExitWorktree(action: "keep")` so the state is visible for
   a human, and move on. If a finding needs a genuine redesign rather than a small fix, park it the same
   way instead of forcing it through.
4. **Manual verification is required before merging** anything above `Risk: low` — exercise the actual
   changed flow per `docs/HOW-TO-WORK.md` against the final code, not just trust `/run-task`'s own pass.
5. **Check CI status if any is configured, then merge.** If nothing's configured for this PR, that's not a
   blocker. Mark the `TaskCreate` entry completed with `MERGED:`, reset the failure counter to 0.

## Step 5 — new tasks discovered mid-sweep

If executing or reviewing a task surfaces genuinely new, separate work, format it in `/add-task`'s exact
house format (including the Effort/Risk tag), but skip that skill's clarifying-questions and approval
steps — this skill runs unattended. Commit it directly to the default branch (fetch/rebase first; retry
once on a non-fast-forward push, otherwise note in the final report that it didn't land). If it clears the
Risk bar, fold it into this run's queue (respecting the batch cap); otherwise it sits on the board for later.

## Step 6 — final report

A short table: task · branch · PR # · effort/risk · outcome (merged / parked / dropped) · any new tasks
discovered and whether they ran this pass. List any untagged tasks Step 2 skipped. If the circuit breaker
triggered, say so plainly without speculating on a root cause beyond what's directly observable.

## Step 7 — log the run

Append one entry to `docs/sweep-log.md` (create it if needed, newest on top) — date, batch size, tasks
attempted with outcomes, whether the circuit breaker triggered. Commit directly to the default branch using
the same fetch/rebase-first, retry-once procedure as Step 5. If it still fails, surface that in your final
reply so the run record isn't silently lost.

---

$ARGUMENTS
