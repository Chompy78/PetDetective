---
description: Format a feature/change into this repo's house task format and add it to the roadmap
argument-hint: <task description>
allowed-tools: Read, Edit, Bash(git *)
---

# Pawsitive Detectives — add task

You are a task-formatting and task-adding assistant for this project. The user will describe a feature or
change. Format it into the house task format below and add it to `docs/TASK_BOARD.md` by committing
directly to the repo's current branch — no branch, no PR (this is a docs-only text change).

**Do not** write a design essay or weigh options at length. Format correctly and execute.

## Step 1 — read live context

Read `AGENTS.md`, `docs/TASK_BOARD.md`, and `DECISIONS.md` first. Use them for: architecture rules, the
existing NOW/NEXT/LATER/ON HOLD buckets and their tasks, branch naming (`type/short-slug`), and the
decision-ID format (`D-<YYYY-MM-DD>-<branch-slug>`, no lookup needed).

Do **not** confuse `docs/TASK_BOARD.md` (engineering roadmap) with `TASKS.md` at the repo root (in-game
design content, rendered via `DESIGN_TASKS` in `app.js`) — never touch the latter from this skill.

## Step 2 — clarify if needed

Ask a short question (one or two at most) only if genuinely unclear: which bucket, or the branch slug.
Take a sensible default and state it rather than asking when one is obvious.

## Step 3 — format the task and show it for approval

```
## <Short title> — TODO
Branch <type/short-slug>. <one-line of what + where>.
**Effort:** low|medium|high · **Risk:** low|medium|high — <one clause: why this rating>

```text
<paste-ready steps for the implementing agent>
```

**Done when:** <one objective, checkable condition>
```

### Effort — classify every task
**Low:** docs-only edit, a config/manifest tweak, a single-file CSS/copy fix, a single data-table entry
(e.g. one new `LOCATIONS`/`PET_BLUEPRINTS` entry), an isolated bug fix with an obvious root cause.
**Medium:** touches 2-4 files or functions with straightforward (non-architectural) changes; a new small
UI feature with already-clear scope.
**High:** anything needing real architectural judgment (e.g. changing how `state` is structured/persisted,
splitting the single-file structure, adding a backend).

### Risk — three factors, worst-of combination
Rate each `low`/`medium`/`high`, take the worst as the overall rating:
1. **Ambiguity** — is there one obviously-right way to do it? High if it's a genuine trade-off only a
   human should decide.
2. **Damage scale** — if wrong, how bad and hard to undo? High if it touches the save-data shape
   (`loadState`/`saveState`/`SAVE_KEY`) or breaks offline/PWA support.
3. **Damage likelihood** — with no automated test suite, almost nothing here is "low" on this factor
   unless it's trivially checked by eye immediately (e.g. a CSS tweak). Treat anything touching game
   logic or save data as at least `medium` here by default.

`Risk: high` is an absolute veto for `/sweep-tasks` — no exception regardless of Effort. Name the driving
factor(s) in the one-clause "why".

### House rules to bake in (only where they apply)
- If the task changes the save-data shape: *"bump `SAVE_KEY` in `app.js` and handle the old shape in
  `loadState` if migration is feasible."*
- Branch naming: `type/short-slug`.
- If it warrants a `DECISIONS.md` entry: `D-<YYYY-MM-DD>-<branch-slug>`.
- Bucket: 🔴 NOW = urgent · 🟡 NEXT = build work / default · 🟢 LATER = idea / low priority · ⏸️ ON HOLD =
  explicitly parked, never picked by `/pick-task` or `/sweep-tasks`. Only place a new task here if the user
  explicitly asks to park it — never default a new task into this bucket.

After formatting, **show the task block and ask for approval before doing anything else.** Wait for
confirmation. If changes are requested, revise and show again.

## Step 4 — execute

Only after approval:
1. Pull latest on the current branch.
2. Append the formatted task block to the correct bucket in `docs/TASK_BOARD.md`. Don't change anything
   else.
3. Commit as `docs(roadmap): add <title> task` and push.

---

$ARGUMENTS
