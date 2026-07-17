---
description: Fetch live roadmap state, pick the next task, and pre-flight it — no editing, no worktree
argument-hint: [task title or code]
allowed-tools: Read, Grep, Glob, Agent, AskUserQuestion, Skill, Bash(git fetch *), Bash(git ls-remote *), Bash(git branch --list *)
disallowed-tools: Edit, Write, NotebookEdit, Bash(git push *), Bash(git commit *), Bash(git worktree add *), Bash(git worktree remove *)
---

# Pawsitive Detectives — pick the next roadmap task

You help pick the next task from the roadmap and pre-flight it. This command only reads and reports — it
never edits a file or creates a worktree. Step 4 asks whether to hand off into `/run-task` right away.

## Step 1 — get the latest information

Delegate to an `Explore`-type subagent (via `Agent`) so this session's own context stays clean:
```
git fetch origin
git show origin/<current-branch>:AGENTS.md
git show origin/<current-branch>:docs/TASK_BOARD.md
```
Have it return compact text: the branch-naming convention, and every `— TODO` item in NOW/NEXT/LATER.
**Ignore anything under `⏸️ ON HOLD` entirely** — those tasks are intentionally parked and must never be
picked, listed as a candidate, or suggested, no matter how the rest of this command is invoked.
If `git show` fails, fall back to reading the local copies and say so.

## Step 2 — pick a task

- If `$ARGUMENTS` names a specific task, work on that one.
- Else if `$ARGUMENTS` expresses a difficulty preference ("quick", "easy", "small") — scan NOW then NEXT
  then LATER for the topmost item that's genuinely small/low-risk per `/add-task`'s Effort/Risk criteria,
  skipping bigger items even if ranked higher. Say which items you skipped and why.
- Otherwise, pick the topmost `— TODO` task in 🔴 NOW, skipping anything blocked. If NOW is empty, move to
  🟡 NEXT and say that's what you did. If NOW, NEXT, and LATER are all empty, report that the board has no
  eligible task — never fall through to `⏸️ ON HOLD`.

## Step 3 — pre-flight checks

**Check 1 — is someone already doing this?**
Work out the branch name (`type/short-slug`), then:
```
git ls-remote --heads origin <type/short-slug>
git branch --list <type/short-slug>
```
If it exists, say so plainly — don't substitute a different task.

**Check 2 — engine calibration**
`/run-task` inherits whatever model this session is already running. Suggest a tier and say so:
- **Haiku** — only for a Step 2 quick-filter pick: docs-only, config tweak, single-file CSS/copy fix, a
  single data-table entry, an isolated obvious bug fix.
- **Sonnet** — the default for a normal roadmap task (multi-file edit, manual verification, opening a PR).
- **Opus** — escalate only for real rework risk: touches `state`'s shape/persistence, splits the single-
  file structure, or any change you're not confident can be gotten right in one pass.

Default effort to **High**; only flag above that for a genuinely ambiguous judgment call.

## Step 4 — hand off

Tell the user which task you picked and why, both pre-flight results, and the suggested engine tier. If
the suggested engine differs from what's running, say so and suggest `/model <engine>` first.

Then ask with `AskUserQuestion` (one question): "Start work now?" with options:
1. **"Run `/run-task <type/short-slug>` now"** (Recommended, if pre-flight passed) — invoke `run-task`
   immediately with the slug.
2. **"Not yet"** — stop here.
3. **"Choose a different task"** — list remaining TODO candidates, go back to Step 3 for the new pick.

**If the `AskUserQuestion` call itself errors**, retry once before treating anything as an answer. Once a
real answer comes back, restate it in one line before invoking anything.

---

$ARGUMENTS
