# Pawsitive Detectives — Roadmap

Open engineering work, tracked by an AI agent workflow (`/add-task`, `/pick-task`, `/run-task`,
`/sweep-tasks` — see `AGENTS.md`).

**Not the same as `TASKS.md`** (repo root) — that file is in-game design content shown under the "Task
List" tab. This board is for engineering work only.

## 🔴 NOW

_(empty — nothing currently in flight)_

## 🟡 NEXT

_(empty — all four caught up in this sweep; see `⏸️ ON HOLD` for more ideas to promote)_

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

## ⏸️ ON HOLD

**Never eligible for `/pick-task` or `/sweep-tasks`** — these are parked ideas from a brainstorm, not
actioned work. Promote one into NOW/NEXT/LATER (move the whole block) when a human decides it's actually
next. See `/pick-task`, `/sweep-tasks`, and `/add-task` — all three explicitly skip this bucket by name.

### Player-experience ideas

## Settings tab — TODO
Branch `feat/settings-tab`. Consolidate the sound toggle, install-app button, and backup/restore controls
(currently scattered across the header and Agency tab) into one dedicated tab.
**Effort:** low · **Risk:** low — pure relocation of existing controls, no new logic.

```text
- Add a "⚙️ Settings" tab alongside Map/Notebook/Collection/Agency/Tasks.
- Move the sound toggle, install-app button, and backup/restore buttons there.
- Keep all underlying functions (toggleSound, installApp, exportSave, importSave) unchanged.
```

**Done when:** the header no longer shows the sound/install pills, and a Settings tab has all four controls
working exactly as before.

## Reduce-motion toggle — TODO
Branch `feat/reduce-motion`. Respect `prefers-reduced-motion` and add a manual override.
**Effort:** low · **Risk:** low — CSS-only, additive.

```text
- Add a `@media (prefers-reduced-motion: reduce)` block disabling confetti/pop-in/keyframe animations.
- Add a `state.reducedMotion` override toggle (in Settings, once it exists) for browsers that don't expose
  the OS preference well.
```

**Done when:** with reduced motion active (OS-level or the in-game toggle), confetti and modal pop-in no
longer animate.

## Bigger mobile tap targets — TODO
Branch `fix/mobile-tap-targets`. Increase `.location` button size on narrow viewports.
**Effort:** low · **Risk:** low — CSS-only.

```text
- Increase `.location` min-height/padding below a mobile breakpoint.
- Verify against the ~44x44px touch-target guideline.
```

**Done when:** map buttons measure at least ~44x44px on a 375px-wide viewport.

## Sticky mobile tab bar — TODO
Branch `feat/sticky-tabs`. Keep `.tabs` reachable when the case panel pushes content down on small screens.
**Effort:** low · **Risk:** low — CSS `position: sticky`, no logic change.

```text
- Make `.tabs` `position: sticky; top: 0` within its column, scoped to narrow viewports only.
```

**Done when:** on a small screen, scrolling past the case panel keeps the tab bar visible.

## Agency-upgrade celebration modal — TODO
Branch `feat/agency-celebration`. Mirror the case-solved celebration for agency upgrades.
**Effort:** low · **Risk:** low — reuses the existing modal pattern.

```text
- Set `state.agencyCelebration` on a successful `upgradeAgency()` call.
- Add `agencyCelebrationHtml()` mirroring `celebrationHtml()`; dismiss clears it.
```

**Done when:** upgrading the agency shows a modal instead of just a log line.

## Long-press location preview — TODO
Branch `feat/long-press-preview`. Let a hold-press show a location's hint without spending an investigate.
**Effort:** medium · **Risk:** low — new touch/mouse timing logic, no state change on preview itself.

```text
- Add pointerdown/pointerup timing on `.location`; ~500ms hold shows a tooltip with the hint text.
- A quick tap still calls `investigate()` exactly as today.
```

**Done when:** holding a location shows its hint without registering a search; a normal tap still
investigates.

## Notebook nudge after dead-ends — TODO
Branch `feat/notebook-nudge`. Prompt players toward the Notebook after repeated dead-end clicks.
**Effort:** low · **Risk:** low — reuses the existing tab-dot mechanic.

```text
- Track consecutive dead-end clicks in a session-only counter.
- After 2+, show the existing `.tab-dot` on the Notebook tab until it's visited.
```

**Done when:** two dead-end clicks in a row light up the Notebook tab dot; visiting it clears the dot.

## "Locations left" counter — TODO
Branch `feat/locations-left-counter`. Show how many unchecked locations remain after a search.
**Effort:** low · **Risk:** low — pure display, derived from existing data.

```text
- Compute `LOCATIONS.length - visited.length` in `mapHtml()`.
- Append it to the search-result log line.
```

**Done when:** the log states how many unchecked locations remain after any search.

## Haptic feedback on solve/miss — TODO
Branch `feat/haptics`. Add vibration feedback on solve and dead-end outcomes.
**Effort:** low · **Risk:** low — best-effort API call, no-op where unsupported.

```text
- Call `navigator.vibrate?.(pattern)` in the solve and dead-end branches of `investigate()`.
- Guard so it silently no-ops on browsers without support (e.g. iOS Safari).
```

**Done when:** on a supporting browser, solving/missing produces a distinct vibration; nothing breaks
elsewhere.

## Guided easy first case — TODO
Branch `feat/guided-first-case`. Guarantee an easy pet/path for a brand-new player's very first case.
**Effort:** medium · **Risk:** low — special-cases only case #1, doesn't change `choosePet()`'s general path.

```text
- In `choosePet()`, if `state.caseNumber === 0`, force a Common pet with a short/obvious path.
- Leave every later case's selection logic untouched.
```

**Done when:** every brand-new save's first case uses a guaranteed-easy pet/path; later cases are unaffected.

## "Day X of ~5" case-length hint — TODO
Branch `feat/case-length-hint`. Tell new players roughly how long a case usually takes.
**Effort:** low · **Risk:** low — pure copy addition.

```text
- Add a static caption (e.g. "most cases take about 3-5 days") near the Day pill or case panel.
```

**Done when:** a new player can see a rough expected case length without being told externally.

## Canvas-rendered share card — TODO
Branch `feat/share-card-canvas`. Upgrade the celebration share from text-only to an image.
**Effort:** medium · **Risk:** low — additive; falls back to the existing text share if canvas/file-share
isn't supported.

```text
- Draw a small canvas card (pet icon, name, rarity color, reward) in `shareRescue()`.
- Convert to a blob and pass to `navigator.share` with `files` where supported.
- Keep the current text-share as the fallback path.
```

**Done when:** on a browser supporting file sharing, "Share" produces an image; elsewhere it still falls
back to the existing text share.

## Smoother tab-switch transition — TODO
Branch `feat/tab-transition`. Soften the instant DOM swap between tabs.
**Effort:** low · **Risk:** low — CSS-only.

```text
- Add a brief fade/slide transition on `.card` content when `state.tab` changes.
- Respect the reduced-motion setting (see that task above) once it exists.
```

**Done when:** switching tabs shows a brief, subtle transition instead of an instant swap.

## Friendly private-browsing message — TODO
Branch `fix/storage-unavailable-message`. Explain gracefully when `localStorage` writes are blocked.
**Effort:** low · **Risk:** low — additive error handling only, no shape change.

```text
- In `saveState()`, catch a thrown `localStorage.setItem` (e.g. Safari private mode quota).
- Show a one-time log message explaining progress won't persist this session.
```

**Done when:** in a browser blocking localStorage writes, the player sees an explanatory message instead of
silent data loss.

## Streak counter display — TODO
Branch `feat/streak-counter`. Show consecutive solves without abandoning a case.
**Effort:** low · **Risk:** low — additive state field.

```text
- Add `state.streak`, incremented on solve, reset when a case is abandoned via `newCase()`'s confirm path.
- Show it as a header pill.
```

**Done when:** consecutive solves show a growing streak number; abandoning resets it.

## Decorative paw-print hint trail — TODO
Branch `feat/hint-trail`. A faint visual trail toward the likely location after repeated fresh clues.
**Effort:** medium · **Risk:** medium — could make the game too easy if too legible; a human should confirm
how subtle to keep it before building.

```text
- Human decision needed first: how strong a hint this should be (flag before building).
- If approved, add a faint CSS trail/arrow only after 2+ 'fresh'-tagged clues point the same direction.
```

**Done when:** a human has confirmed the intended subtlety, and the trail appears only under that agreed
condition.

## Session-length fun stat — TODO
Branch `feat/session-length-stat`. Show how long the current session has been open.
**Effort:** low · **Risk:** low — cosmetic only, uses a module-level (non-persisted) timestamp.

```text
- Track a session-start timestamp in a module-level variable (not `state`, not persisted).
- Show elapsed time as a small stat in the footer.
```

**Done when:** the footer shows how long the current session has been open.

## "Last searched X ago" on visited spots — TODO
Branch `feat/visited-recency`. Show which day a location was last checked, not just that it was.
**Effort:** medium · **Risk:** low — additive metadata on an existing array.

```text
- Change `pet.visited` from an array of ids to `{id, day}` entries.
- Show "checked on day N" in the existing visited badge.
```

**Done when:** a previously-checked location shows which day it was last checked.

## Ambient background music toggle — TODO
Branch `feat/ambient-music`. Optional looping background music, separate from the existing SFX.
**Effort:** medium · **Risk:** medium — needs a real audio loop asset (unlike the synthesized SFX) and is
easy to make annoying; a human should pick/approve the track first.

```text
- Human decision needed first: source/license an appropriate loop (flag before building).
- Add a `state.musicOn` toggle alongside the existing sound toggle; loop an `<audio>` element, default off.
```

**Done when:** a human has approved a specific audio asset, and the music toggle works independently of the
SFX toggle.

## Confirm step before "Next day" — TODO
Branch `feat/next-day-confirm`. **Not recommended** — included for completeness, not as a suggested build.
**Effort:** low · **Risk:** low — trivial to build, but there's no real mistake here to prevent; it would
add friction to the core loop for no benefit.

```text
- (Not recommended — skip unless a human specifically asks for this after reviewing the reasoning above.)
```

**Done when:** N/A — parked as "probably shouldn't build," not "not yet built."

### Functional / systems ideas

## Real multi-case capacity — TODO
Branch `fix/multi-case-capacity`. Agency levels already promise 2-5 active cases in the UI; the mechanic
behind that number doesn't exist yet (only ever one active case regardless of level).
**Effort:** high · **Risk:** high — changes `state.activeCase` from a single object to a list, a genuine
save-shape change needing a `SAVE_KEY` bump and migration; touches nearly every function that reads
`state.activeCase`.

```text
- Human decision needed first: how multiple case cards should look/behave in the UI (flag before building).
- Change `state.activeCase` to `state.activeCases` (array), capped by
  `AGENCY_LEVELS[state.agencyLevel].activeCases`.
- Bump `SAVE_KEY`; in `loadState`, migrate an old single `activeCase` into the new array shape.
- Update `casePanelHtml()`, `investigate()`, `nextDay()`, `newCase()` to operate on a selected case.
```

**Done when:** a player at Small Office (capacity 2) can hold two simultaneous cases, and an old single-case
save loads correctly into the new shape without data loss.

## Real cost on wrong-location searches — TODO
Branch `feat/search-cost`. Today a player can click every location once and always find the pet — clues
carry no real weight.
**Effort:** medium · **Risk:** medium — changes the core moment-to-moment feel of the game; a human should
confirm the exact mechanic before it's built.

```text
- Human decision needed first: the cost mechanic itself (a small money cost per wrong search, a daily
  search limit, or something else — flag before building).
- Apply the cost only in `investigate()`'s dead-end/on-path-but-wrong branches, never on the solving click.
- Surface the cost/remaining-searches clearly before a player commits to a click.
```

**Done when:** a human has approved the specific mechanic, and clicking the map now has a real, visible
cost that makes the Notebook's clues meaningfully change optimal play.

## Companion abilities — TODO
Branch `feat/companion-abilities`. Give companions (currently just collected and displayed) an actual
gameplay effect.
**Effort:** medium · **Risk:** low — additive gameplay hook, no save-shape change.

```text
- Define a per-companion ability (e.g. "reveals one extra clue on the first investigate of a new case").
- Apply the effect in `newCase()` or `investigate()` when `state.companions.length > 0`.
- Surface the active ability somewhere visible (Agency tab or case panel).
```

**Done when:** having at least one companion produces a visible, repeatable gameplay effect distinct from
having none.

## Scale map/difficulty with agency growth — TODO
Branch `feat/agency-scaling`. Progression is currently cosmetic (bigger numbers, same 12-location map).
**Effort:** high · **Risk:** medium — expands `LOCATIONS`/case-generation meaningfully; no save-shape
change but real game-logic surface.

```text
- Tag new, harder locations or longer paths with a `minAgencyLevel`.
- Filter available locations/path length in `newCase()`/map rendering by `state.agencyLevel`.
- Keep the existing 12 locations/4-stop paths as the Garage Office baseline so early saves are unaffected.
```

**Done when:** reaching a higher agency level visibly unlocks new locations or longer cases unavailable at
Garage Office.

## Hint system (pay for a stronger clue) — TODO
Branch `feat/hint-system`. Money currently has exactly one use (agency upgrades) — add a second, more
frequent one.
**Effort:** medium · **Risk:** low — additive money sink, clear default mechanic, no shape change.

```text
- Add a "Buy a hint" control (Notebook or case panel) that deducts a set cost from `state.money` and calls
  `addClue()` with a guaranteed useful ('fresh'-tagged) clue.
- Disable the button when money is insufficient, mirroring `upgradeAgency()`'s pattern.
```

**Done when:** a player can spend money for a guaranteed useful clue, and the control correctly disables
when they can't afford it.

## Case expiration / real stakes — TODO
Branch `feat/case-expiration`. Cases currently never truly fail.
**Effort:** medium · **Risk:** medium — conflicts with the game's own stated "no timers" design pillar; a
human should decide whether this is even wanted before it's built.

```text
- Human decision needed first: whether this contradicts the intended difficulty philosophy enough to skip
  entirely (flag before building).
- If approved, cap days per case (e.g. day 8) after which the case is marked lost with a gentle, non-
  punitive in-fiction outcome.
```

**Done when:** a human has explicitly approved building this, given it changes a stated design principle.

## Procedural per-playthrough pet paths — TODO
Branch `feat/procedural-paths`. Improve replay value beyond today's fixed 4-stop paths per pet.
**Effort:** medium · **Risk:** medium — risks breaking the hand-written personality tips that assume
today's fixed paths.

```text
- Replace each `PET_BLUEPRINTS` entry's hardcoded `path` with a generator weighted by `LOCATIONS` tags
  matching that pet's personality.
- Re-verify `PERSONALITY_TIPS` text still reads sensibly against generated (not fixed) paths.
```

**Done when:** the same pet can generate a different path across separate new cases, and personality tips
still make sense against whatever path was generated.

## Visible case-difficulty tag — TODO
Branch `feat/case-difficulty-tag`. Only meaningful once multiple simultaneous cases exist.
**Effort:** low · **Risk:** low — pure display, but depends on another task first.

```text
- Depends on "Real multi-case capacity" above being built first.
- Compute a simple difficulty label from rarity + path ambiguity; show it on each case card when choosing
  among several.
```

**Done when:** with multiple open cases available, each shows a difficulty label a player can use to choose
which to work on.

## Streak-based reputation multiplier — TODO
Branch `feat/streak-multiplier`. A meta-progression layer rewarding consecutive solves.
**Effort:** medium · **Risk:** medium — easy to unbalance without playtesting; a human should sanity-check
the multiplier curve first.

```text
- Human decision needed first: the multiplier curve (flag before building, e.g. "+10% per consecutive
  solve, capped at +50%").
- Apply the multiplier to `rep`/`reward` in `investigate()`'s solve branch, reset on abandon.
```

**Done when:** a human has approved the multiplier curve, and consecutive solves visibly and correctly
compound reputation gains.

## Adaptive difficulty by performance — TODO
Branch `feat/adaptive-difficulty`. **Not recommended yet.**
**Effort:** high · **Risk:** high — no usage data exists to tune this against, so any weighting is a guess.

```text
- (Not recommended to build yet — would need real usage data first to avoid guessing at a tuning curve
  blind.)
```

**Done when:** N/A until real play data exists to validate against.

### Content expansion ideas

_The following four ideas from the same audit are intentionally **not** duplicated here — they're already
tracked as real tasks elsewhere on this board: **Newspaper headlines** (🟡 NEXT), and **Missing-item
cases**, **Seasonal events**, **Legendary case chains** (all 🟢 LATER). See those entries instead._

## Pet backstory blurbs — TODO
Branch `feat/pet-backstories`. Mirror the existing, already-working `OWNERS` blurb pattern for pets.
**Effort:** low · **Risk:** low — data-only addition, same pattern as an existing feature.

```text
- Add a `backstory` one-liner to each `PET_BLUEPRINTS` entry.
- Show it in the Collection tab's pet card and/or the active case panel.
```

**Done when:** every pet has a distinct backstory line visible somewhere in the UI.

## 5-8 new locations — TODO
Branch `feat/more-locations`. Increase every case's variety for the cost of a few data rows.
**Effort:** low · **Risk:** low — pure data-table additions, no logic change.

```text
- Add new entries to `LOCATIONS` (e.g. Train Station, Harbour, Farm, Ice Cream Parlour, Community Garden).
- Update a few `PET_BLUEPRINTS` paths to route through the new locations so they actually appear in play.
```

**Done when:** the town map shows the new locations and at least one pet's path routes through them.

## More pets across rarities — TODO
Branch `feat/more-pets`. Directly fight the repetition of only 10 possible pets today.
**Effort:** low · **Risk:** low — pure data-table additions; `choosePet()`'s unlock logic already
generalizes to more entries.

```text
- Add new `PET_BLUEPRINTS` entries across Common/Rare/Epic/Legendary.
- Sanity-check the reputation unlock thresholds in `choosePet()` still make sense with a bigger pool.
```

**Done when:** new pets can appear in cases, and the existing rarity-unlock gating still works correctly.

## Player-named agency — TODO
Branch `feat/agency-name`. Cheap personalization for the target age group.
**Effort:** low · **Risk:** low — additive string field, no branching logic.

```text
- Add `state.agencyName` (default e.g. "Garage Office HQ"), editable via a text input in the Agency tab.
- Use it in header/celebration copy where "your agency" is currently generic.
```

**Done when:** a player can set a custom agency name and see it reflected in the UI.

## Achievements / badges — TODO
Branch `feat/achievements`. A self-contained replay-motivation layer.
**Effort:** medium · **Risk:** low — additive tracking array, doesn't touch existing systems.

```text
- Define a small set of achievements (e.g. "first rescue," "rescue every Common pet," "reach Elite
  Detective").
- Track unlocked achievements in `state.achievements` (array of ids); check conditions after each solve.
- Add a simple display (new section in Collection or its own tab).
```

**Done when:** completing a qualifying action unlocks and displays the matching achievement.

## Thematic owner-pet pairing — TODO
Branch `feat/owner-pet-pairing`. Nice narrative polish tying specific owners to specific pet types.
**Effort:** medium · **Risk:** low — reworks existing owner-cycling logic but stays additive to data.

```text
- Tag `OWNERS` entries with an affinity (e.g. Ranger Bob ↔ outdoorsy personalities).
- Change `newCase()`'s owner assignment from pure cycling to affinity-weighted selection.
```

**Done when:** owners are noticeably more likely to be paired with thematically fitting pets than before.

### Everything else

## Lightweight smoke-test script — TODO
Branch `chore/smoke-test`. AGENTS.md already calls this out as wanted, given there's no automated suite.
**Effort:** medium · **Risk:** low — a script that only reads/exercises the app, no product-code changes.

```text
- Write a script (e.g. Playwright) exercising: accept case → investigate wrong → investigate right → solve
  → check Collection/Agency updated.
- Document how to run it in `docs/HOW-TO-WORK.md`.
```

**Done when:** running the script against a local server passes cleanly on the current default branch.

## QA checklist in HOW-TO-WORK.md — TODO
Branch `docs/qa-checklist`. Capture what this project has actually been manually verifying.
**Effort:** low · **Risk:** low — docs-only.

```text
- Add a manual-verification checklist (core loop, PWA install, offline reload, dark mode, save
  export/import) to `docs/HOW-TO-WORK.md`.
```

**Done when:** the checklist exists and matches actual verification practice.

## Friendly fallback if app.js throws — TODO
Branch `fix/error-fallback`. Today an uncaught error leaves a blank white screen.
**Effort:** low · **Risk:** low — additive safety net, doesn't change normal-path behavior.

```text
- Wrap the initial `render()` call and add a `window.addEventListener('error', ...)` handler that shows a
  simple "Something went wrong — try reloading" message in `#app` instead of a blank screen.
```

**Done when:** forcing a synthetic error shows the fallback message instead of a blank white page.

## In-game "What's New" viewer — TODO
Branch `feat/whats-new`. Surface recent `CHANGELOG.md` entries in-game.
**Effort:** low · **Risk:** low — read-only display; no build step exists, so keep a small const in sync
manually.

```text
- Add a `CHANGELOG_HIGHLIGHTS` const in `app.js` (kept in sync manually with `CHANGELOG.md`'s recent
  entries).
- Show it in a new "What's New" section, e.g. within the Task List tab.
```

**Done when:** recent changelog entries are visible in-game without checking GitHub.

## Save-code backup reminder — TODO
Branch `feat/backup-reminder`. Lower the odds of an accidental lost save.
**Effort:** low · **Risk:** low — additive UI nudge only.

```text
- Show a one-time dismissible reminder to copy a save code after N solved cases, and specifically before
  `resetGame()`'s confirm dialog.
```

**Done when:** the reminder appears at the intended trigger points and can be dismissed.

## Lighthouse PWA audit pass — TODO
Branch `chore/lighthouse-audit`. Quick to run, likely surfaces small free wins.
**Effort:** low · **Risk:** low — audit + small fixes only, no game logic touched.

```text
- Run a Lighthouse PWA audit against the deployed Pages site.
- Fix any small flagged issues (e.g. missing meta tags) without touching game logic.
```

**Done when:** the audit's installability/PWA checks pass, with fixes noted in `CHANGELOG.md`.

## Add a LICENSE file — TODO
Branch `docs/add-license`. Good practice, trivial effort — but the choice needs a human.
**Effort:** low · **Risk:** low — docs-only, but license choice is a human decision.

```text
- Human decision needed first: what license (or "all rights reserved"/private) is intended (flag before
  building).
- Add the corresponding `LICENSE` file.
```

**Done when:** a human has chosen a license and the file reflects it.

## GitHub repo description & topics — TODO
Branch `docs/repo-metadata`. Pure housekeeping.
**Effort:** low · **Risk:** low — GitHub repo settings only, no file changes.

```text
- Set a short repo description and relevant topics (e.g. `pwa`, `game`, `javascript`) in GitHub repo
  settings.
```

**Done when:** the repo page shows a description and topics.

## Move save data to IndexedDB — TODO
Branch `feat/indexeddb-save`. More headroom than `localStorage`.
**Effort:** high · **Risk:** high — touches the single highest-risk area in the codebase (the only
persistence layer); only worth doing if a real limit is actually hit.

```text
- Human decision needed first: confirm there's an actual localStorage limitation being hit before starting
  (flag before building).
- If approved, design a migration path from the existing `SAVE_KEY` localStorage blob to IndexedDB, keeping
  `exportSave`/`importSave` working.
```

**Done when:** a human has confirmed the need, and existing saves migrate to IndexedDB without data loss.

## Text-to-speech for clues — TODO
Branch `feat/tts-clues`. Genuinely useful for the younger end of an 8-14 audience.
**Effort:** medium · **Risk:** low — additive, opt-in via the Web Speech API, no effect when
unsupported/off.

```text
- Add a "🔊 Read aloud" control next to the log/notebook clue text using `SpeechSynthesis`.
- Gate behind a settings toggle, default off.
```

**Done when:** clicking the control reads the current clue text aloud in a supporting browser; the toggle
correctly hides/shows it.

## Printable "detective certificate" — TODO
Branch `feat/detective-certificate`. A charming novelty for a completed rescue.
**Effort:** medium · **Risk:** low — additive, uses `window.print()` or a generated printable view, no
state changes.

```text
- Add a printable summary view (case solved, pet, reward, date) triggered from the celebration modal or
  Collection tab.
```

**Done when:** a player can trigger a clean, printable certificate for a specific rescue.

## CI syntax-check on push — TODO
Branch `chore/ci-syntax-check`. Largely redundant once the smoke-test script exists.
**Effort:** low · **Risk:** low — additive CI only, doesn't touch app code.

```text
- Add a minimal GitHub Actions workflow running `node -c app.js` (and the smoke test, once it exists) on
  push.
```

**Done when:** the workflow runs on push and fails visibly on a syntax error.

## CONTRIBUTING.md for family ideas — TODO
Branch `docs/contributing`. A place for a family member to suggest a feature.
**Effort:** low · **Risk:** low — docs-only.

```text
- Add a short `CONTRIBUTING.md` explaining how to suggest a feature (e.g. via `TASKS.md` or an issue).
```

**Done when:** the file exists and is linked from `README.md`.

## Custom GitHub Pages domain — TODO
Branch `docs/custom-domain`. Cosmetic convenience with a real-world cost attached.
**Effort:** low · **Risk:** low — repo-settings + DNS change, no code change; needs a human-owned domain.

```text
- Human decision needed first: is there a domain to use (flag before building — this has a real-world
  cost).
- If yes, configure it in Pages settings and add a `CNAME` file.
```

**Done when:** the site resolves at the chosen custom domain.

## Parent dashboard view — TODO
Branch `feat/parent-dashboard`. Real scope growth for a project meant to stay simple.
**Effort:** high · **Risk:** medium — needs a human decision on whether it's wanted at all.

```text
- Human decision needed first: is this in scope for the project's stated simplicity goal (flag before
  building).
```

**Done when:** a human has explicitly approved building this before any code is written.

## Promo/screenshot assets — TODO
Branch `docs/promo-assets`. Asset creation only, no code change.
**Effort:** low · **Risk:** low.

```text
- Capture a few clean screenshots of key screens (map, celebration modal, collection) for sharing.
```

**Done when:** a small set of promo screenshots exists in the repo or a shared location.

## Localization/i18n scaffold — TODO
Branch `feat/i18n-scaffold`. Premature unless another language is actually planned.
**Effort:** high · **Risk:** medium — real effort for a currently single-language, single-family project.

```text
- Human decision needed first: is another language actually planned (flag before building).
```

**Done when:** a human has confirmed a specific target language before any scaffolding work starts.

## Local-only playtime analytics — TODO
Branch `feat/playtime-stats`. Additive, local-only (no external tracking).
**Effort:** low · **Risk:** low — stored in the existing `state`/Career Stats pattern.

```text
- Track cumulative session time in `state.totalPlaytimeMs` (updated on `saveState()` calls).
- Display alongside Agency's existing Career Stats.
```

**Done when:** a rough total playtime figure is visible and persists across sessions.

## Re-adopt branches if a contributor joins — TODO
Branch n/a — a process note, not a code task.
**Effort:** low · **Risk:** low — a documentation/process reminder only.

```text
- Not a build task. Revisit the "commit directly to main" convention in AGENTS.md if a second real
  contributor starts working on this repo.
```

**Done when:** N/A — this is a trigger condition to watch for, not something to schedule.

## Global leaderboard / pet trading — TODO
Branch n/a. **Not recommended.**
**Effort:** high · **Risk:** high — requires a real backend and server-side accounts, a direct conflict
with this project's stated static/offline, no-backend architecture (see `AGENTS.md`'s hard rules).

```text
- (Not recommended — would require an architectural decision big enough for DECISIONS.md before any code,
  per AGENTS.md's hard rules on backend additions.)
```

**Done when:** N/A unless a human explicitly decides to take on a backend — a major, separate architectural
decision.
