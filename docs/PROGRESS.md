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

The complete automated suite passes **26 tests**, and `git diff --check` passes.
Independent source reviews found no outstanding code issues. The actual SVG script
is exercised with deterministic geometry and timing; tests verify all seven
variants, appearance/custom-colour behavior, iframe readiness, playback and flag
commands, and reduced motion. They also verify default repeat/restart behavior
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
