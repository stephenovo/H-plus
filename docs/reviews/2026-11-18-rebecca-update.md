# Rebecca update review — 18 November 2026

Reviewed PR #1, branch `rebeccaluo37-boop-patch-1`, commit `798b9e6`, against main `3ffeba9`.

The branch uploads an entire older project under `H-plus-improved/`. That directory is not the application deployed by the root build. This selective merge records the contribution's ancestry but integrates only the accepted changes into the root app; it intentionally does not add the duplicate project directory. Deferred work remains available in the original branch and commit and must be explicitly extracted in a future update.

## Integrated now

- Confirmation before Clear & leave, adapted to the existing accessible modal system: Escape/backdrop cancellation, keyboard focus containment and focus restoration; clear action retains session cleanup and stale-request invalidation.
- Clearer AI status explanation and Traditional Chinese label. Tooltip accurately directs users to Preferences, rather than claiming the privacy information modal has an AI toggle.
- Disable question input while an answer is pending.
- Broader large-text coverage for informational cards, form labels, summary and controls. Preserve the latest switch proportions and mobile navigation styles.

## Already present on main

SVG UU mascot, active-navigation underline, mock-phone overflow correction, adaptive chat height, hidden previously asked prompt chips, location-topic service navigation, and larger chat text were integrated previously (`18f9495`). Preserve them, including resetting prompt chips when clearing the session.

## Deferred or rejected

- **Map cannot ship unchanged:** `public/_headers` only allows same-origin/data images, so OpenStreetMap tiles are blocked. Automatic third-party tile requests also require corresponding user-facing privacy information and deliberate loading behavior.
- **Map language regression:** the map initialization effect has empty dependencies; the language effect only closes popups, leaving their text in the original language.
- **Unverified/misleading map data:** the Gay Harmony marker uses an area coordinate while its own text says the precise venue is only provided after booking. A treatment/referral centre is rendered with a generic testing-point pin. Some outreach bases reuse these coordinates. These need provider-level verification and appropriate labels before publication. The ACTS official page confirms appointment-only anonymous free testing and its hours, but does not substantiate all supplied addresses, coordinates and outreach claims: https://www.aids.gov.hk/english/hotline/acts.html
- **Overbroad topic rule:** matching any `where`, `near` or `address` before weather/identity rules misroutes unrelated questions. Keep main's targeted rules and ACTS citation.
- **Main regressions avoided:** do not remove the mobile dock/progress indicator, the clear-session chip reset, the near-input fictional-data reminder or the compact accessible switch fix.
- Keep the prominent direct testing-options action and current bounded placeholder; optional conversation must not become a required primary path.
- No Leaflet dependencies or duplicate docs/assets added because the map is deferred.

## Validation

- `npm run check`: 20/20 tests passed; TypeScript and Vite production build passed.
- Browser: English confirmation shown; Escape cancels and returns focus to Clear & leave; Traditional Chinese large-text confirmation renders correctly; confirming returns to the homepage.
- This change does not modify health guidance, API contracts, dependencies, deployment configuration or service destinations.

## Follow-up

The map was subsequently repaired and integrated at the user's request. See [map integration review](2026-11-18-map-integration.md) for accepted data, corrected coordinates, privacy behavior and verification. The original deferral above describes the initial review, not the current map status.
