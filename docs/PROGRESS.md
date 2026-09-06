# Colour rollout progress

## Current project structure

The four HTML pages stay at the root. Shared styles live in `assets/css/`, scripts
in `assets/js/`, and the animated logo in `assets/images/`. This `docs/` directory
contains the rollout and progress notes. `CNAME` remains at the root for hosting.
All page asset URLs and the logo appearance script's iframe selector use these
locations. File names in the historical notes below refer to the same assets.

This is a plain static site: HTML, CSS, JavaScript, and SVG, with `CNAME` for the
existing domain. There is no installation or build step. Package manifests,
lockfiles, installed dependencies, tests, and editor project files have been
removed at the user's request. Markdown remains as historical documentation.
Earlier test results and setup instructions below describe the removed tooling;
they are not requirements to restore it. A future Qwik City migration belongs in
the platform monorepo, not this directory.

## Digit hinge correction and rendered checks, 6 September 2026

Browser access now works following the user's permission correction. Earlier
access-denied notes below record the state at those stages, not the current state.

The digit flap renderer painted the incoming stationary top underneath the whole
outgoing leaf, and usually painted the old bottom underneath the arriving leaf.
Those hidden glyphs could leak at shared antialiased edges. Both backing faces
now have independent exposure clips that follow the rotating leaf boundaries.
This uses the same approach already present in the country-flag fold. Existing
half-face clips, typography, shading, detail strength and flag cleanup remain.

The SVG root also paints its existing configurable background across the entire
viewport. This removes white letterbox bands outside the fitted viewBox in dark
index and logotype previews, without coupling cut-outs to a background colour.

Independent in-memory checks executed the current drawing functions for 1,904
poses across variants 1–6 and four dimension sets, including unchanged/blank
glyphs, reverse scrubbing and 224 flag poses. Exposure coverage, transforms,
return shading, unique IDs and 240 detail-effect switches passed. SVG XML,
embedded JavaScript syntax and `git diff --check` also passed. No test files,
dependencies or project tooling were added.

Normal browser controls and screenshots checked paused digit transitions in
Light and Dark at the default 48px and enlarged 96px preview font settings;
all seven variants; detail strengths of 0%, 50% and 100%; retained Colour mode;
flag formation, country-flag return and continued playback across a loop boundary.
The detached pale hinge fragments were not visible in the sampled frames. The
index animation and corrected dark viewport fill were also inspected. Embedded
artwork initially remained stale after reload; navigating between the index and
logotype pages refreshed it. Temporary preview settings were restored.

These are sampled checks in the in-app browser, not exhaustive verification of
every browser, frame, display scale or responsive layout. The independent checks
use an in-memory element graph and do not establish rasterization by themselves.

## Shared headers and flap cut-outs, 6 September 2026

All four headers sit outside their page-specific content wrappers and share one
1320px frame, spacing, responsive breakpoints, navigation layout and Appearance
control sizing. Content retains its existing widths and gutters. A stable
scrollbar gutter prevents horizontal movement between short and long pages.

Split-flap seams and edge notches now default to cut-outs. Each assembled tile
uses stationary vector clipping at full strength, preserving glyph positions and
the existing face-folding transforms. Partial strengths use a luminance mask.
Gaps reveal the canvas without reading or copying its colour. The
existing flag cleanup also removes the gaps as the final flag forms. Detail
strength and visibility remain adjustable; the Colour style enables the retained
custom detail colour controls.

Source checks passed for all four header structures, 70 local links/assets,
nine JavaScript blocks/files, unique HTML IDs and SVG XML. Independent source
reviews found no actionable issues; `git diff --check` passed. No tests,
dependencies or project tooling were added. Browser preview access was previously
declined, so rendered header layout, mask compositing and animation appearance
remain unverified.

## Cut-out fringe correction, 6 September 2026

The user's screenshot showed a soft grey rim along the seam and rounded notches,
including areas away from the white lettering. No stroke had been added. The
approved correction replaces full-strength masking with two retained vector
contours: an upper shape and its reflected lower shape. They preserve the original
cut-out geometry without overlapping holes. An inner stationary artwork group
keeps the existing outer flag clip, face order and folding transforms intact.

Full strength attaches only the detail clip. Intermediate strengths attach only
the mask, whose region and white keep rectangle extend one font size beyond the
card. Zero strength, hidden details, Colour mode and completed flag cleanup remove
both detail effects. The existing configuration fields and fade timing remain.

Independent geometry checks sampled 24,000 points across default and extreme
dimensions with no discrepancies against the original seam/notch union. In-memory
checks of the actual drawing function passed 4,323 render-state samples across all
seven variants and default/minimum/maximum sizes, including effect switching,
removal, unique IDs, mask bounds and unchanged folding transforms. These use DOM
stand-ins, not a browser renderer. SVG XML, syntax of ten JavaScript blocks/files,
`git diff --check`, and independent source review passed. No test files,
dependencies or project tooling were added.

At this stage, the screenshot established the earlier artefact and browser access
was declined. Subsequent rendered checks are recorded in the digit hinge section
above.

## Current design-reference follow-up, 6 September 2026

Implemented the approved refinement plan across the existing static pages:

- Matching lowercase `i12e.eu /` document and page titles; four permanent header
  links with the active page identified.
- Specification descriptions and one divider between index entries.
- Theme-aware embedded logos with independent manual text/background overrides.
- A separate sticky playback bar, four collapsed settings groups, stacked customization controls,
  prominent V1/Draft headings, monospaced variant/flag headings, and no variant captions.
- H1–H6 followed by a labelled paragraph, preserving all typography preview tools.

The subsequent layout correction makes every customization accordion a single
column at all widths. Loop animation is checked on initial load, and the shared
SVG's saved default enables looping for the logo page, index preview, and
standalone artwork.

Before the tooling was removed, the complete automated suite passed **26 tests**,
and `git diff --check` passed. These are historical results, not validation of the
later header and cut-out changes. Independent source reviews found no outstanding
code issues at that stage. The SVG script was exercised with deterministic geometry
and timing; tests verified all seven
variants, appearance/custom-colour behavior, iframe readiness, playback and flag
commands, and reduced motion. They also verified default repeat/restart behavior
across all variants and automatic playback through multiple cycles using the
index page's actual SVG embed URL. These checks do not establish rendered layout.

Browser access to the local preview was declined during this follow-up. No
workaround was attempted. Desktop/mobile rendering, sticky-bar visibility,
accordion keyboard interaction, and browser visual checks in both appearances
remain pending. The older browser waivers below apply only to their original
rollouts and are not counted as validation of this follow-up.

The earlier permanently-white-artboard and unchanged-SVG statements below are
historical evidence, superseded by the approved follow-up.

## Original colour rollout state

The colour rollout is complete under the amended acceptance criteria. On
6 September 2026 the user explicitly instructed “Skip the browser step.” Browser
validation is therefore waived, not passed. All required automated checks and the
final independent source review are complete.

Previously, browser access was blocked despite configuration retries. No workaround
was used. The waiver removes that dependency from this colour rollout; the separate
Typography task retains its own acceptance record.

## Completed implementation

- All four HTML pages use the shared 57-colour palette and 27 roles per appearance.
  Each starts light with a temporary selector; there is no theme storage.
- Logotype's interface uses semantic colours, independent appearance controls,
  reciprocal navigation and primary Play/Pause styling. Its white artboards,
  artwork configuration and animation remain independent.
- Shared focus uses a 2px outline and 2px surface-coloured separator. Index link
  titles stay underlined, including visited states. Typography's stale colour
  fallbacks were removed.
- Colour swatches accommodate enlarged text in their CSS sizing. Comparison,
  bootstrap and backdrop colours reference the palette. Approved references,
  isolated experiments, validation, comparison, copy fallback and all export
  formats remain intact.
- The parallel Typography rollout added shared typography CSS/JS and three tests.
  Its changes are preserved. Independent source review found no interference
  between typography and colour scopes.

## Verified evidence

- Plan and accepted waiver: [COLOUR_ROLLOUT.md](COLOUR_ROLLOUT.md).
- Starting commit: `42e24694ffc94ebb2f0e38046a2026806a77e8f8`; worktree was clean.
- Original and current SVG git blob:
  `d1adcd91d4aca190d70d75e59178f4de3ca26648`.
- Final `npm test` on 6 September 2026: **15 passed, 0 failed**. A clean `npm ci`
  also succeeded earlier. Development dependencies are locked; the static
  reference site needs no npm build.
- Tests cover exact palette/role fixtures, status-scale mixing, unrounded WCAG
  thresholds, 35 approved sample pairs per appearance, all editable roles,
  invalid HEX, isolation, comparison, copying/fallback, Reset/reload, CSS/JSON
  consistency, and actual Tailwind 4.3.3 compilation for approved/experimental
  themes. Local links, IDs, script syntax and typography behaviour also pass.
- `git diff --check` passes. SVG, CNAME and .gitignore are unchanged. Original
  Logotype animation script, seven iframe contracts and configuration inputs
  were independently compared with the baseline.
- Final independent non-browser acceptance review found no substantive omissions
  or source regressions.
- The former test README documented commands and limitations: jsdom's
  custom-property shim and clipboard/dialog mocks did not prove browser rendering.
- No browser screenshots, rendered layout, native clipboard, keyboard traversal
  or full accessibility conformance are claimed.

## Optional future browser checks — waived for this rollout

The following original browser scenarios remain unverified. They are recorded for
future use and do not block completion under the user's explicit waiver.

Check every page in Light and Dark at 320px, 768px and 1440px widths, plus 200%
text enlargement.

| Page       | Layout and appearance                          | Interactions                                                                                   |
|------------|------------------------------------------------|------------------------------------------------------------------------------------------------|
| Colours    | Palette, role table, controls, sample, exports | Editing, invalid input, isolation, contrast, comparison, native copying/fallback, Reset/reload |
| Typography | Controls, specimens, warnings, captions        | Width, scale, leading, measure, spacing, Reset/reload                                          |
| Index      | Three previews, white SVG artboard             | Keyboard navigation, link states, selector/reload                                              |
| Logotype   | Seven artboards, controls and scrolling        | Playback, seek, restart, settings, flags, appearance isolation                                 |

Also check keyboard operation and visible focus, unintended page overflow,
rendered text/boundary contrast, local navigation and browser errors, reduced
motion, standalone SVG/static fallback and the index preview.

No deployment, hosting changes, framework migration or logotype artwork edits
were made.
