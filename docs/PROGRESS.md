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

## Transparent SVG startup, 7 September 2026

The logo SVG declares `background: transparent; color-scheme: light dark` on its
root before its remote font stylesheet loads. All four pages declare their
supported colour schemes before scripts/styles, and shared logo iframe styles
inherit the page's scheme with a transparent background.

Early paint declarations alone did not resolve the user's refresh flash. The
appearance helper now runs synchronously in the head and enables an initial
`visibility: hidden` rule before any logo iframe is parsed. It binds the frames
at DOMContentLoaded and requests status to recover any earlier readiness messages.
Each frame becomes visible only after a validated SVG state reports the current
page theme. Its space remains reserved throughout; ordinary theme switches do
not hide already-visible artwork. Reloads require a fresh acknowledgment. The
existing source/origin checks, intrinsic sizing, animation and SVG APIs remain.

With JavaScript disabled or the helper unavailable, the hiding marker is never
set and the existing fallback remains visible. A stalled SVG/font load stays
hidden until ready; there is no timer that exposes an unfinished iframe. Real
font failures retain the SVG's existing system-font fallback. This gate applies
to the website embeds; standalone SVGs retain their existing startup behaviour.

SVG and helper URLs use `v=logo-canvas-2`; shared stylesheet URLs use
`v=css-type-1-logo-canvas-2` to include the concurrent CSS typography update.
Publish the shared assets and all four referencing pages together.

Verification: 24 in-memory message/lifecycle scenarios passed, including delayed
readiness, current-theme acknowledgments, duplicate messages, reload ordering,
file-origin variants, rejected senders and header sizing. HTTP checks showed all
13 embeds becoming visible with transparent canvases; Light/Dark screenshots
and SVG paint checks preserved black/white surrounding text, white flap letters,
animated playback and the static Logomark. Source/XML, syntax and reference
checks use existing runtimes only; no test files or dependencies were added.

HTTP refresh screenshots do not prove that every intermediate browser frame is
free of flashing. A full cold-cache/slow-font visual run and direct local-file
refresh confirmation remain pending. The browser automation URL policy blocks
`file://` pages, so direct-file verification requires the user's browser.

## File-preview appearance messaging, 7 September 2026

The user reported white text remaining after selecting Light when opening
`logotype.html` directly from disk. The appearance helper assumed that a file
URL's origin and its SVG message origin serialized identically. An isolated
execution of the previous helper reproduced a failure when the URL origin was
`file://` and the message origin was `null`: the readiness message was rejected,
no appearance updates were sent, and the initial status request used `file://`
instead of the required wildcard destination.

The helper now sends to `*` whenever the recognized SVG URL uses `file:`. It
accepts the matching URL origin or `null` / `file://` for those file frames, while
still matching the exact source window. HTTP (S) retains exact origin matching.
The existing readiness and iframe-load handling sends the latest selected theme.
No SVG artwork, API, playback or custom-colour semantics changed. Both reference
pages now version all logo/helper references with `v=appearance-3`, superseding
the cache version in the earlier appearance notes below.

Independent in-memory execution passed 19 message-flow scenarios covering local
origin serializations, wildcard destinations, strict HTTP (S) origins, rejected
senders, delayed readiness, duplicate messages, reloads and changed iframe URLs.
The helper sends only status and appearance messages. JavaScript syntax,
whitespace and all 19 versioned asset references passed. In the HTTP browser,
three consecutive appearance changes updated all eight SVGs to the expected
black/white surrounding text while flap lettering stayed white; the seven
animations kept playing and the Logomark stayed static. A screenshot confirmed
the Light rendering. No tests or dependencies were added.

Direct local-file browser verification remains pending: the browser automation
URL policy explicitly blocks `file://` pages. Source and simulated message-flow
checks cannot establish the rendered result in the user's browser.

## SVG appearance modes and EU blue defaults, 7 September 2026

`assets/images/logo.svg` now owns its Light/Dark palette. Surrounding text defaults
to exact black (`#000000`) in Light and white (`#FFFFFF`) in Dark. Flap backgrounds
default to EU blue (`#003399`) and flap lettering to white in both modes. Existing
mechanical shading remains; EU flag surfaces/stars retain `#003399` / `#FFCC00`,
and the static starless Logomark keeps fixed, unshaded blue cards. The canvas and
cutouts stay transparent.

The new `i12e.setAppearance("light" | "dark" | "auto")` method and existing
`appearance` command select the same modes. Auto follows the embedding page/device
preference; explicit modes stay selected until changed. Both `getState()` and
state messages report `appearance: {mode, theme}`. Appearance changes update paint
without rebuilding geometry, scheduling frames or resetting playback/flag state.
Legacy supplied `colors` fields are ignored. Custom colours remain intentional
overrides; `configure({textColor: null})` restores the selected theme's text colour.

The shared helper sends only the page's selected mode, and preview colour controls
display the SVG's reported configuration, retaining pending edits until acknowledged.
Other form edits no longer import the website text palette. SVG and helper URLs now
share `v=appearance-2`; this supersedes the text-colour message contract and cache
version documented in the historical transparency section below. Publish the SVG,
helper and referencing HTML together; this change does not publish the site.

Independent in-memory verification passed 772 assertions across all eight variants
in both initial appearances: palettes, requested/resolved modes, preference changes,
custom overrides/null reset, legacy messages, invalid modes, unchanged drawing
geometry and playback/flag state, looping, detail strengths and the static mark.
These checks use deterministic SVG text metrics and do not establish rendered output
or native browser media inheritance. XML structure, ten JavaScript blocks/files,
local page links and all 19 shared-version logo/helper references also passed.
Browser screenshots separately checked every variant in Light/Dark, normal and
enlarged artwork, paused folding faces, the static mark and transparent detail strengths
of 0%, 50% and 100%. Preview colour edits persisted through theme/size changes, and
the country-flag interaction continued through an appearance change. The index
rendered black/white lettering in its selected modes while retaining active looping
playback. The local preview server was restarted for these checks. No tests,
packages or dependencies were added.

## Static Logomark, 6 September 2026

The shared asset is now `assets/images/logo.svg`. Existing variants 0–6 retain
their IDs, and variant 7 is a static i12e mark in a new Logomark section between
V1 and Draft. It matches variant 6's initial layout and preview sizing, with
EU-blue cards. The subsequent refinement removes the stars from the logomark;
stars remain part of the animated EU flags. Logomark and Logotype use one-word names.
Shared visual controls still work; the card blue is fixed and only the lettering
receives the original initial-state shading.

The mark joins preview readiness and visual configuration but is excluded from
playback broadcasts. Its own API also prevents motion: playback and seeking keep
i12e at zero time, configuration never resumes playback, and flag interaction is
unavailable. The state reports zero duration/steps, static phases and loop disabled.

Independent in-memory validation covered 672 comparisons of variants 0–6 with
their previous implementation, 72 static API/message/reduced-motion cases, eight
geometry comparisons, 24 colour/shading/star cases and 40 detail cases. No animation
frames were scheduled for the mark. Browser screenshots checked the section,
standalone artwork, default/enlarged geometry, Light/Dark, star scaling, detail
strength and fixed blue under custom flap colours. These checks preceded the
separate transparency/framing change below. SVG XML and ten JavaScript blocks/files
parsed successfully; no test files, packages or dependencies were added.

## Transparent logo and compact framing, 6 September 2026

The current change removes the SVG background paint, background configuration and
editor control globally. The containing page supplies the background; appearance
messages update only text, with existing manual text and flap colours retained.
Compact framing is the default for `assets/images/logo.svg`; `preview=1` preserves
the reference artboards. All seven animated variants and the static `variant=7`
mark remain available. The reference SVG and appearance helper URLs share
`v=transparent-1` to refresh both sides of the appearance-message contract together.
The helper matches relative and absolute logo URLs and checks message source and
expected origin. Legacy background fields have no effect. This supersedes the
configurable-canvas and background-override descriptions below; earlier validation
results remain historical and do not verify this change.

The SVG declares support for both colour schemes and adopts explicit parent
appearance messages for its canvas. This prevents the browser from painting an
opaque fallback behind a transparent iframe when the page and SVG schemes differ.
The plan site loads the shared appearance/helper scripts, uses the default logo
framing in a 176 × 24px iframe on all three pages, and keeps production asset URLs.

Local browser validation passed 3,958 sampled poses across variants 0–7, four
geometry configurations, expansion/collapse, joined flags, and font fallback.
Checks covered stable bounds, six country flags, ignored legacy background
messages, manual text overrides, retained preview artboards and a simulated
reduced-motion preference. Screenshots confirmed transparency over light, dark
and checkerboard surfaces, including the browser canvas behaviour. Editor checks
confirmed Light/Dark switching and retained text, card, flap-text and detail colour
controls. All three plan pages displayed 176 × 24px frames with working navigation,
current-page markers, visible keyboard focus and no desktop overflow. XML parsing,
six JavaScript syntax checks, relative/absolute helper messaging checks and scoped
whitespace checks passed. Test fixtures stayed outside the repositories.

Publication remains pending. Publish the SVG, appearance helper and referencing
HTML together with the shared cache version, refreshing CDN caches if applicable.

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
