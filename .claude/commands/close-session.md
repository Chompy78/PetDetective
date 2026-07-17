---
description: Wrap-up that WRITES the session's CHANGELOG/DECISIONS/session-note, graduates finished tasks, then PROPOSES a ready commit — never stages, commits, pushes, merges, or deletes
allowed-tools: Read, Grep, Glob, Edit, Write, Bash(git status *), Bash(git log *), Bash(git diff *), Bash(git branch *), Bash(git worktree list *), Bash(git fetch *), mcp__github__pull_request_read, mcp__github__list_pull_requests, mcp__github__search_pull_requests
disallowed-tools: NotebookEdit, Bash(git add *), Bash(git commit *), Bash(git push *), Bash(git merge *), Bash(git rebase *), Bash(git reset *), Bash(git branch -d *), Bash(git branch -D *), Bash(git worktree add *), Bash(git worktree remove *)
---

# Pawsitive Detectives — close off this session

Wrap up in three parts: **(1) log** the session's work (you write these entries yourself), **(2) verify &
sweep** the tree/branches/PRs (report only), and **(3) propose a ready commit** for the human to run. You
**never** stage, commit, push, merge, rebase, or delete anything yourself. Other sessions may have
worktrees/branches in flight — never touch those.

**Before writing anything**, run `git status`/`git diff` and classify every touched path — log only this
session's real work.

## Part 1 — Log the session's work (you WRITE these directly)

**1. `CHANGELOG.md`** — one-line entry for what changed, newest on top. Always required.

**2. `DECISIONS.md`** — only if a change involved a non-obvious *why*. When warranted, write the full
`Context → Options → Decision → Why → Status` entry using `D-<YYYY-MM-DD>-<branch-slug>`. If not warranted,
say so and skip it.

**3. `docs/sessions/<date>-<topic>.md`** — write one only if: the real root cause differed from what was
assumed, you picked between genuinely contested approaches, the plan pivoted mid-session, work collided
with another session's, or two+ roadmap items landed together. Otherwise skip and say so. If a note for
this session already exists, re-read and update it rather than assuming it's still accurate.

**4. Roadmap graduation** — if a `docs/TASK_BOARD.md` task finished this session, remove its entry now and
confirm the matching `CHANGELOG.md` line exists. Never append new open tasks to `TASK_BOARD.md` — output
any newly-discovered task in the house `## <title> — TODO` format for the human to fold in instead (Part 3).

## Part 2 — Verify & sweep (report only — write nothing, change nothing)

**5. Verification check** — this repo has no automated test suite. If everything touched is docs-only,
report "skipped, docs-only." Otherwise, confirm manual verification (per `docs/HOW-TO-WORK.md`) was
actually done this session — if you can't confirm it, say so rather than assuming it happened.

**6. Repo-wide branch & worktree sweep**
```
git worktree list
git branch -vv
git fetch origin --prune
```
Report each local branch/worktree as merged-and-safe-to-clean-up, active-elsewhere (leave alone), or
orphaned. Never delete anything here — that's `/cleanup-branches` or an explicit go.

**7. Open PRs from this session** — list any still-unmerged PR opened this session and ask if it needs a
decision now.

**8. Cross-project hints** — did this session surface a lesson general to AI-assisted coding, not specific
to this game (a git/worktree pattern, a prompting/agent-design lesson)? If yes, draft a candidate entry (a
one-line trigger + one-line rule) and list "push it to `ai-lessons-learned`" as a follow-up option.
**Draft only — never write it anywhere without approval.** If nothing general came up, say so and skip.

## Part 3 — Propose the commit (you do NOT run it)

After Part 1's writes, run `git status`/`git diff` again, then:
- List the exact files belonging to this session's real, finished work. Never propose `git add -A`/`.` —
  name each file, since a shared checkout may hold another session's changes.
- Print a ready-to-run block:
  ```
  git add <the named files>
  git commit -m "<type(scope): summary>"
  ```
  Check recent `git log --oneline` for the actual Conventional-Commits prefix pattern in use. If more than
  one independent task finished, propose one commit per task.
- **Stop there.** `git add`/`commit`/`push` are disallowed for this skill on purpose.

## Output format

Short punch list by number. For Part 1, say plainly what you wrote (file + one-line summary). For Part 2,
mark each done/not-needed/needs-action.

For anything needing a decision, use the tiered format from `AGENTS.md`'s Communication conventions —
group every actionable follow-up under one top-level lettered question (e.g. "**A.** What should we run to
close out?") with options **A1**, **A2**... underneath. Tag every option Recommended or Not recommended
with a reason — default to Recommended; withhold only when destructive/hard to reverse, a judgment call
only the user can make, or waiting on missing information.

End with a one-line verdict: clear to close, or not yet (and why).

---

$ARGUMENTS
