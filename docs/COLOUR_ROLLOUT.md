# i12e colour rollout

Current project policy: keep only static site assets, domain/Git configuration,
and Markdown documentation. The Node tooling and tests described in this
historical rollout have been removed; do not recreate them for this static site.

## Design-reference follow-up, 6 September 2026

The approved follow-up supersedes this rollout's white-artboard and unchanged-SVG
constraints. Embedded logos now follow the page surface/text roles while explicit
colour edits remain in place. Official flags and approved palette values retain
their colours. The SVG accepts an `appearance` message that updates paint without
rebuilding geometry; `configure` accepts optional `editedColors` metadata. Original
rollout evidence below remains historical. Current follow-up evidence and pending
browser validation are recorded in [PROGRESS.md](PROGRESS.md).

## Goal

Complete the approved colour specification across all four HTML pages, preserve
the logotype artwork and its controls, and verify the result through reproducible
checks. Work stays local; deployment is excluded.

Validation amendment, 6 September 2026: the user explicitly instructed “Skip the
browser step.” Browser validation is waived for this colour rollout; it was not
performed or counted as passing. Automated checks and the final source review
remain required. The separate Typography rollout keeps its own acceptance record.

## Specification and interfaces

- `colours.css` is authoritative: 57 fixed palette colours and 27 semantic roles
  for each appearance. Preserve all existing `--palette-*`, `--color-*`, brand and
  emblem interfaces, including Typography's existing colour variables.
- EU web blue is `#0E47CB`; the blue scale retains ECL EU v5.2.1 values mapped in
  ascending order to i12e 50–950. Neutral values and the encoded-sRGB status-scale
  calculations retain the approved specification.
- Each HTML page starts light with a temporary Light/Dark selector. No storage,
  operating-system theme detection or cross-page theme persistence.
- Underline links including visited links. Use semantic control boundaries and
  visible focus outlines with a surface-coloured gap. Preserve Roboto/Roboto Mono.
- Colours keeps approved references immutable, separate sample-only experiments
  per appearance, strict HEX validation, independent comparison and live contrast.
  Reset clears experiments and comparison changes and restores light defaults.
- Copy HEX/RGB and export CSS, JSON and Tailwind from actual stylesheet values.
  JSON retains `{schemaVersion, kind, brand, emblem, palette, themes}`. Tailwind
  v4.3.3 uses prefixed colours, `@theme static`, `@theme inline` and a manual dark
  variant. Export choice distinguishes approved and experimental values; clipboard
  failure leaves selectable output. Exports never modify project files.

## Project coverage

- Finish Colours and audit all displayed and exported values.
- Audit Typography's samples and preserve its controls; remove stale fallbacks.
- Audit the index's navigation and previews in both appearances.
- Add shared colours, navigation and independent appearance controls to Logotype.
  Play/Pause is primary; Restart and utility controls use secondary treatment.
  Appearance controls must work independently of SVG readiness and must never send
  artwork configuration commands or change playback or custom settings.
- Audit SVG and nonvisual configuration without changing artwork or hosting.

### Deliberate artwork exceptions

Keep white artboards and the white index preview in both appearances. Preserve
black/white logotype defaults, user-selected artwork colours, hinge shadows, EU
emblem `#003399`/`#FFCC00`, and factual national-flag colours. `logotype.svg` must
remain byte-for-byte unchanged. Its standalone parameters, frozen `window.i12e`
API, seven-variant messaging/synchronisation and reduced-motion behaviour remain.
Instructional colour examples and picker bootstrap values are audited for
consistency, not indiscriminately replaced as interface colour literals.

## Checkpoints

1. Record repository status, baseline and this plan. Chrome baseline capture waived.
2. Finish Logotype integration and remaining inconsistencies on connected pages.
3. Add locked, development-only Node tests; expose `npm test`. No site build.
4. Chrome acceptance checks waived by the user; record the resulting evidence limits.
5. Review the complete diff, verify artwork integrity and record final evidence.

After each checkpoint update `PROGRESS.md` with verified work, blockers and next
action. Independent audits can run in parallel; coordinate shared-file edits.
Do not complete the goal while a mandatory check remains unverified.

## Acceptance

- Independently verify exact palettes, scale rounding, role assignments and aliases.
- Calculate WCAG luminance; compare unrounded values against 4.5:1 normal-text and
  3:1 essential-boundary targets. Include interaction states, buttons, focus, inputs
  and four statuses; distinguish decorative borders. Retain light secondary #666666.
- Exercise valid/invalid entries, theme isolation, sample isolation, comparison,
  copying/fallback, Reset and reload. Verify CSS/JSON/Tailwind exports in both kinds
  and themes, compile representative utilities and retain Tailwind defaults.
- Verify local links, script syntax, Typography control behaviour and preserved
  Logotype animation, iframe and configuration contracts through automated checks
  and source review. No SVG or hosting changes.
- Browser validation waived: all pages in both themes at 320, 768 and 1440px,
  200% text enlargement, keyboard traversal, rendered focus/contrast/overflow,
  native copying, browser errors, and rendered Typography/Logotype interactions.
  Retain these as optional future checks, without claiming they passed.
- Record commands and results as independently reviewable evidence.

## Sources

- [EU interface blue](https://op.europa.eu/en/web/webguide/links)
- [ECL EU v5.2.1](https://github.com/ec-europa/europa-component-library/blob/v5.2.1/src/themes/eu/maps/color.scss)
- [EU emblem](https://style-guide.europa.eu/o/opportal-service/isg?resource=en/annex-a1-graphics-guide-european-emblem.html)
- [Tailwind themes](https://tailwindcss.com/docs/theme)
- [Bounded goals and checkpoints](https://learn.chatgpt.com/use-cases/follow-goals)
