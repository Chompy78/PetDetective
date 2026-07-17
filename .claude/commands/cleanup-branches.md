---
description: Scan for merged/orphaned branches and worktrees, then delete only what's approved
allowed-tools: Read, Bash(git worktree *), Bash(git branch *), Bash(git fetch *), Bash(git log *)
disallowed-tools: Edit, Write, NotebookEdit, Bash(git push *), Bash(git commit *)
---

# Pawsitive Detectives — clean up branches and worktrees

Scan for local branches/worktrees that are safe to delete, then delete only what the user explicitly
approves by letter. Never touch remote branches or tags, and never touch the branch/worktree this session
is currently on, even if it looks orphaned.

## Step 1 — scan

```
git worktree list
git branch -vv
git fetch origin --prune
```
Classify each local branch/worktree as:
- **merged** — its work is already on the repo's default branch (`git log origin/<default-branch>..<branch>`
  is empty).
- **active elsewhere** — real commits ahead of the default branch, no merged PR. Leave alone.
- **orphaned** — remote counterpart deleted (`: gone]` in `git branch -vv`) but the local ref/worktree
  wasn't cleaned up.
- **this session's** — leave alone regardless of its other classification.

## Step 2 — present

Show a table of cleanup candidates (merged + orphaned only) with classification and exactly what would be
run. Lettered list (`D1`, `D2`, ...), matching `/close-session`'s idiom.

## Step 3 — ask

"Delete D1, D3, D5? Say the letters or `none`." Wait for the explicit reply. Don't delete anything without it.

## Step 4 — execute

For each approved letter: `git worktree remove` first if it has one, then delete the branch — try
`git branch -d` first, only escalate to `-D` if it refuses *and* the user already approved that letter
(the Step 3 approval covers the escalation). Report what succeeded and what failed, and why.

---

$ARGUMENTS
