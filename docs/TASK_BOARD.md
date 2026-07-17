# Pawsitive Detectives — Roadmap

Open engineering work, tracked by an AI agent workflow (`/add-task`, `/pick-task`, `/run-task`,
`/sweep-tasks` — see `AGENTS.md`).

**Not the same as `TASKS.md`** (repo root) — that file is in-game design content shown under the "Task
List" tab. This board is for engineering work only.

## 🔴 NOW

_(empty — nothing currently in flight)_

## 🟡 NEXT

## Detective theories & predictions — TODO
Branch `feat/detective-theories`. Add a free-text notebook field where the player records their own
theory/prediction before investigating; persist it per active case.
**Effort:** medium · **Risk:** low — additive `state` field, no branching game logic, no ambiguity on shape.

```text
- Add a textarea + "Save theory" control to the Notebook tab.
- Store as `state.activeCase.theory` (string), cleared on `newCase()`.
- Display the saved theory back at the top of the Notebook tab.
- No SAVE_KEY bump needed — additive field, `loadState`'s spread-merge already defaults it.
```

**Done when:** a player can type and save a theory mid-case, it persists across a page reload, and clears
when a new case starts.

## Rescue thank-you letters — TODO
Branch `feat/thank-you-letters`. Add a short in-character thank-you note from the owner to the celebration
modal on solve.
**Effort:** low · **Risk:** low — pure display addition, reuses existing `OWNERS` data, no new state shape.

```text
- Add a `thankYou` line generator using `pet.owner.name`/`blurb` + pet name (template strings, similar to
  NO_SIGN_TEMPLATES).
- Render it in `celebrationHtml()` under the found-at line.
```

**Done when:** solving any case shows an owner-specific thank-you line in the celebration modal.

## Pet HQ trophy room — TODO
Branch `feat/trophy-room`. New display combining rescued cards, photos, and companions into one "HQ
display room" view distinct from the working Collection tab.
**Effort:** medium · **Risk:** low — purely additive UI/tab, reuses existing `state.rescued`/`photos`/
`companions`, no game-logic changes.

```text
- Add a new tab (e.g. "🏆 HQ") alongside Map/Notebook/Collection/Agency/Tasks.
- Render a showcase layout: top rarities first, companions highlighted, photo strip.
- Reuse existing rarity/companion helpers (`rarityClass`, `companionIcon`) — don't duplicate logic.
```

**Done when:** the new tab renders correctly with zero rescues (empty state) and after several rescues
across rarities.

## Newspaper headlines — TODO
Branch `feat/newspaper-headlines`. Generate a cute headline on each solve, especially for Epic/Legendary
rescues, and keep a small archive.
**Effort:** low · **Risk:** low — additive array in `state`, no shape risk, no game-logic branching.

```text
- Add a headline-template array (tone varies by rarity) similar to NO_SIGN_TEMPLATES.
- On solve, push a generated headline to `state.headlines` (new array, default `[]`).
- Display recent headlines somewhere visible (Collection tab or its own small section).
```

**Done when:** solving a case appends a headline visible in the UI, and Legendary/Epic solves read
noticeably more dramatic than Common ones.

## 🟢 LATER

## Personality-driven movement — TODO
Branch `feat/personality-movement`. Make pet movement/clue generation actually derive from `personality`
(today personality only drives flavor text/tips, not the path itself).
**Effort:** medium · **Risk:** medium — no single obviously-right weighting scheme (a human should confirm
the approach); touches core case-generation logic with no test suite.

```text
- Tag each LOCATIONS entry with personality affinities (e.g. Food Lover -> bakery/market weighted higher).
- Replace each PET_BLUEPRINTS hardcoded `path` with a weighted-random generator seeded by personality.
- Keep paths at 4 stops to avoid disturbing safetyRating()/currentPetLocation() assumptions.
```

**Done when:** a Food Lover pet's generated path visibly favors food-related locations across multiple new
cases, without breaking existing safety/day mechanics.

## Missing-item cases — TODO
Branch `feat/item-cases`. Add a second case type (stolen toys, buried trophies, lost accessories) alongside
pet cases.
**Effort:** high · **Risk:** medium — new case category touches `newCase`/`investigate`/case-panel
rendering; additive to save shape but meaningfully expands game-logic surface with no test suite.

```text
- Define an ITEM_BLUEPRINTS table parallel to PET_BLUEPRINTS (name, icon, path, reward).
- Branch newCase()/investigate() on a `caseType` field ('pet' | 'item').
- Adjust casePanelHtml()/celebrationHtml() copy for item cases (no "rescue", no companion logic).
```

**Done when:** an item case can be accepted, investigated, and solved end-to-end alongside pet cases
without breaking existing pet-case flows.

## Seasonal events — TODO
Branch `feat/seasonal-events`. Add summer/winter/Halloween/holiday variants of cases.
**Effort:** high · **Risk:** medium — genuine trade-off on trigger mechanism (real calendar date vs. manual
toggle vs. random) that a human should decide before building; touches case generation.

```text
- Decide trigger mechanism (flag for human decision, see Risk).
- Add seasonal LOCATIONS/PET_BLUEPRINTS variants or reskins.
- Gate seasonal content behind the chosen trigger; keep default (non-seasonal) path unchanged.
```

**Done when:** a chosen season can be activated (however triggered) and produces visibly different cases,
with the non-seasonal game unaffected when no season is active.

## Pet show competitions — TODO
Branch `feat/pet-show-competitions`. Bring previously-rescued pets back as characters in a competition
mini-mode.
**Effort:** high · **Risk:** medium — rules/format genuinely undecided (a human should pick the game shape
here); new subsystem with no existing analog in the codebase.

```text
- Human decision needed first: competition format (flag before building).
- Reuse state.rescued as the entrant pool once format is chosen.
- Add a new tab/flow for the competition, isolated from the core case-solving loop.
```

**Done when:** a human has approved the competition format, and a first playable version runs without
touching the existing case-solving flow.

## Witness relationship system — TODO
Branch `feat/witness-relationships`. Recurring owners (from `OWNERS`) build affinity over repeat cases and
give better clues.
**Effort:** medium-high · **Risk:** medium — reasonable default exists (track affinity per owner name,
scale clue quality) but the exact clue-quality effect is a design call worth confirming.

```text
- Add `state.ownerAffinity` (object keyed by owner name, default {}), incremented per solved case with
  that owner.
- At higher affinity, bias addClue()'s output toward 'fresh'-tagged clues or add an extra clue on
  investigate().
- Surface affinity somewhere visible (Agency tab or owner blurb) so the mechanic is legible to players.
```

**Done when:** solving multiple cases for the same owner visibly improves clue quality/frequency in later
cases with that owner.

## Legendary case chains — TODO
Branch `feat/legendary-case-chains`. Long multi-part mysteries (e.g. "Phantom Pawprints") spanning several
sequential cases.
**Effort:** high · **Risk:** medium-high — biggest single addition on this board; chain structure/state
shape is a genuine architectural decision, not a small tweak.

```text
- Human decision needed first: chain structure (fixed script vs. procedural), and how it interacts with
  choosePet()/newCase() (flag before building).
- Model a chain as an ordered list of sub-cases sharing one save-data record; bump SAVE_KEY if the shape is
  incompatible with existing single-case saves.
- Gate chains behind Elite Detective tier / National Agency, consistent with existing DESIGN_TASKS framing.
```

**Done when:** a human has approved the chain structure, and a first legendary chain can be started, played
across its parts, and completed end-to-end.
