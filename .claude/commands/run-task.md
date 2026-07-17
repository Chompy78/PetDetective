---
description: Do the work for one roadmap task picked by /pick-task — worktree, edit, verify, rebase, PR (requires Claude Code v2.1.50+)
argument-hint: <type/short-slug>
---

# Pawsitive Detectives — work the roadmap task

`$ARGUMENTS` is one `<type/short-slug>`, handed off from `/pick-task`. This command does the actual work:
worktree, edit, verify, rebase, push, PR. **Requires Claude Code v2.1.50 or later.** If `/pick-task` hasn't
been run yet this session, ask for its output first — this command doesn't re-derive the task itself.

**Engine check.** Restate `/pick-task`'s suggested engine tier before starting Step 1. This command
inherits whatever model the session is already running and cannot switch it — if it doesn't match, stop
and tell the user to run `/model <engine>` first.

## Step 1 — enter your own worktree

```
EnterWorktree(name: "<type/short-slug>")
```

`EnterWorktree` sanitizes `/` out of `name` — it creates a branch like `worktree-<type>+<short-slug>`, not
`<type/short-slug>`. Rename it right after entering:
```
git branch -m <type/short-slug>
```
Confirm with `git branch --show-current` that it now reads `<type/short-slug>` before proceeding.

Verify the worktree is actually based on the repo's current default branch tip before touching anything:
```
[ "$(git rev-parse HEAD)" = "$(git rev-parse origin/<default-branch>)" ] && echo "based correctly"
```
If that fails, `git stash -u` (only if something's already there) → `git reset --hard
origin/<default-branch>` → `git stash pop`, then re-verify.

**After every context continuation or resumed turn, re-verify with `pwd` before the first `Edit`/`Write`
call** — don't assume a prior `EnterWorktree` call's directory context survived.

## Step 2 — do the work

Be efficient: read each file once, search instead of reading whole files when you can. Follow `AGENTS.md`'s
hard rules — vanilla JS only, no backend, bump `SAVE_KEY` if you change the save-data shape. Add a line to
`CHANGELOG.md` and remove the task's entry from `docs/TASK_BOARD.md` in the same commit as the edit. Add a
`DECISIONS.md` note if the change involved a non-obvious *why*.

If the task turns out to be bigger than `/pick-task` assumed, stop and flag it rather than forcing it
through — leave the roadmap entry alone and say clearly why it's being dropped.

## Step 3 — verify manually

There's no automated test suite. Serve the app locally and exercise the changed flow per
`docs/HOW-TO-WORK.md`'s manual-verification checklist. Don't skip this — it's the only regression check
this repo has.

## Step 4 — catch up before opening the PR

```
git fetch origin
git rebase origin/<default-branch>
```
**If the rebase reports a non-trivial conflict, stop and show the affected files/hunks** rather than
resolving it silently. Once resolved, re-verify.

## Step 5 — push and open the pull request

Push the branch and open one PR targeting the repo's default branch. Use the `CHANGELOG.md` entry as the
starting point for the PR description.

## Step 6 — clean up

```
ExitWorktree(action: "remove")
```
If this refuses citing a commit count that looks too high, that likely includes already-pushed upstream
commits pulled in by Step 4's rebase — confirm the branch's tip is already pushed and reflected in the
open PR before passing `discard_changes: true`.

---

$ARGUMENTS
