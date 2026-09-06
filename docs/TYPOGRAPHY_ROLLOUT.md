# i12e typography rollout

Current project policy: keep only static site assets, domain/Git configuration,
and Markdown documentation. The Node tooling and tests described in this
historical rollout have been removed; do not recreate them for this static site.

## Design-reference follow-up, 6 September 2026

All four page titles now use `i12e.eu /` plus the lowercase page name. Navigation
always includes Design Index, Logotype, Typography, and Colours, with the active
link marked `aria-current="page"`. This supersedes the omitted-current-page rule
below. Logo groups use the shared H2 scale; variant titles use 18px Roboto Mono,
and Flag Interaction uses 16px Roboto Mono. Typography specimens now progress
from H1 through H6 to a labelled paragraph. Preview controls remain available.

The follow-up also authorizes SVG appearance changes, superseding earlier
unchanged-SVG constraints. Earlier rollout and byte-identity evidence below is
historical; current evidence is in [PROGRESS.md](PROGRESS.md).

Baseline: 42e24694ffc94ebb2f0e38046a2026806a77e8f8 (clean worktree).

## Approved outcome and constraints

Apply the typography specification to all four HTML pages through shared CSS and
JavaScript. Preserve the static site, existing colour tools/themes/exports,
navigation, and logotype behaviour. No commit, push, or deployment.

Document scale: H1 32–48, H2 28–36, H3 24–28, H4 20–24, H5 18–20, H6 16–18,
body 16–18px equivalents, interpolated from 390 to 1200px in rem. Roboto
400/600/700 and real 400/700 italics; Mono 400 for explicit brand/technical uses.
Body leading 1.6, heading leading 1.2, paragraph gap 1em, prose measure 65ch.
Compact roles: card/group title 18/600, panel title 16/600, control value 16/400,
label 14/600, supporting text 14/400, brand Mono 16/400.

Page scales use viewport width; independent specimens use actual container width.
Preview overrides must not affect surrounding text or saved defaults. Keep narrow
defaults readable without JavaScript, and keep font fallbacks usable.

## Completion status

Implementation and automated/source validation are complete. On 2026-09-06 the
user explicitly instructed: “Skip the browser step.” Browser validation is
therefore skipped for this rollout and is not a remaining completion gate.
No browser checks are claimed as passed.

## Milestones

- [x] Shared foundation and typography reference; retain all preview controls.
- [x] Index and colour reference; isolated specimen scopes and unchanged tools.
- [x] Logotype dashboard; readable controls with preserved artwork/contracts.
- [x] Remove competing declarations; document intentional exceptions.
- [x] Source checks, independent review, and final acceptance audit.
- [x] Record the user's explicit browser-validation waiver.

## Uniformity follow-up

The user identified the header links as the visible inconsistency and preferred
the Logotype version. All four pages now use one shared header rule and the same
navigation structure: responsive Roboto body text, plain link labels in a fixed
order (omitting the current page), 1rem navigation gaps, a Mono brand identifier,
and a separate Appearance control. Page-specific header rules, including mobile
overrides, were removed. Navigation hover behaviour and the Appearance cursor
are also shared. Outer page widths remain appropriate to each page's content.

The review also corrected inconsistencies in specification usage:

- Control outputs and textareas use the documented 16px-equivalent value role.
  All logotype numeric fields use Mono, including the return-delay field outside
  the sidebar. Timeline values retain tabular numerals.
- Compact headings use explicit shared roles instead of overriding every H1,
  H2, or H3 on a page. Both colour reference cards use the same card-title role.
  All heading roles use 1.2 leading, and document headings retain shared spacing.
- Validation messages consistently use the supporting-text role. The index's
  typography prose follows body sizing, and link underline offsets are relative.

Two regression tests check the shared header contract and audit authored rules,
including media-query branches, for conflicting local typography or layout
declarations. They also check heading roles, control values, numeric fields,
validation messages, and navigation labels/destinations. Independent follow-up
reviews found no remaining material inconsistency. Browser checks remain skipped
at the user's request.

## Acceptance evidence

| Requirement                                                                                                       | Evidence                                                                                                                                                                                                                                                   |
|-------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Shared font families, styles, document scale, rhythm, compact roles                                               | typography.css is loaded once on each of the four HTML pages. Automated tests verify every scale endpoint, all font requests, the browser-relative root basis, and derived tokens in every independent scope. Source review confirms compact roles.        |
| Actual-width sizing and isolation                                                                                 | typography.js writes width progress only. Tests cover 390/795/1200px, widths outside the bounds, independent containers, unchanged document scope, and updates settling without repeated events. Geometry is supplied by tests, not measured in a browser. |
| Typography controls and saved defaults                                                                            | Tests exercise constrained width labels, scale, leading, measure, spacing on/off, complete Reset, history restoration, and isolation from controls and saved defaults.                                                                                     |
| Semantic specimens and navigation                                                                                 | Source review and page checks confirm the requested heading levels, prose, emphasis, lists, code, quotations, tables, valid local links/fragments, unique IDs, labels, and script syntax.                                                                  |
| Colour tools and themes                                                                                           | Tests cover all 27 roles in both appearances, valid/invalid edits, comparison thresholds, reset, exports, copying and selectable fallback. All 57 palette values remain approved defaults.                                                                 |
| Export compatibility                                                                                              | Approved and experimental CSS/JSON agree; Tailwind exports compile using the pinned v4 package without losing approved tokens or framework defaults.                                                                                                       |
| Logotype artwork and behaviour contracts                                                                          | Independent source review confirms the animation script, seven iframe contracts, and all 25 configuration controls match HEAD. logotype.svg is byte-identical to the baseline.                                                                             |
| Responsive layout, keyboard use, real font loading/fallback, browser enlargement and spacing, native interactions | Browser validation skipped at the user's request. Automated checks do not prove these rendered or native behaviours.                                                                                                                                       |
| Static implementation and scope                                                                                   | No app build, backend, persistence, hosting changes, commit, push, or deployment. The existing static pages use shared CSS and a deferred script. Test dependencies are development-only.                                                                  |

Final automated run: npm test — 17 tests passed, 0 failed. git diff --check passed.
The final implementation is covered by independent source review. Earlier
index/colour review caught a prose-measure rule narrowing the
index navigation; .designs now explicitly has max-width:none, with regression
coverage. No unresolved source findings remain.

## Intentional exceptions

logotype.svg remains independent brand artwork: Mono 400, 48px default,
12–96px configurable range, measured glyphs, animation and pixel/em geometry.
Its Git blob hash remains d1adcd91d4aca190d70d75e59178f4de3ca26648.
The decorative index “Aa” remains an oversized display specimen. Navigation card
lists are layout containers and do not inherit the prose measure. Palette values,
colour-only exports, CNAME, and repository/editor configuration need no typography
changes. Concurrent colour-rollout work was preserved.

## Colour baseline retained

57 palette values, 27 roles per theme, 35 passing computed contrast checks per
theme. Blue/white contrast is 7.547638846. Approved export SHA-256:

- CSS: e6b657ffb218a471a1be8f14ce1f9c8608405d902dd6bc9861b45081cb4758ac
- JSON: 37b0c05dcb3e79bb344b503262037e9c6d7539c2955a40dc74c9050b6f2d5669
- Tailwind: 64d8bb5693c03d3dba709e368c5e9358c80f09b15a56c2e1a539f7a1a0974a11

Earlier browser attempts were denied by saved site permissions, and some
preflights also encountered an unavailable Chrome connection or a locked Mac.
No permission settings were changed or restrictions bypassed. The user's later
instruction to skip browser validation supersedes the original browser gate.
