# Verification record

Checked on 10 November 2026 (Hong Kong time).

## Automated checks

`npm test`: 14 passing Node tests.

- English/Chinese priority routing precedes ordinary kit guidance.
- Reactive self-test guidance distinguishes screening from diagnosis.
- U=U content includes sustained treatment, sexual transmission and follow-up.
- Unknown/malicious topic names cannot select arbitrary content.
- Demo-plan confirmation requires review and a valid option.
- Every knowledge topic has both languages.
- Missing AI consent rejects the request before inference.
- Valid model labels resolve to canonical source-based responses.
- Recognised urgent requests bypass model execution.
- Provider outage returns labelled fallback.
- Arbitrary model prose is not returned to the UI.
- Oversized messages, cross-origin calls and exhausted rate limits are rejected.

`npm run build`: TypeScript validation and Vite production build passed. GitHub Actions repeats tests and build for the committed code.

## Browser checks

The live/local interfaces were inspected using the browser at 1440 px desktop and 390 px mobile.

| Check | Observation |
| --- | --- |
| Homepage | Desktop and Traditional Chinese mobile layouts inspected |
| Mobile overflow | Document width equals viewport width at 390 px for checked journey pages |
| AI off | U=U prompt returns labelled built-in guidance |
| Live AI | English free-text U=U question returned `AI topic matching · source-based reply` |
| Traditional Chinese AI | Live API returned topic `uu`, Chinese canonical text and mode `ai` |
| Selection gating | Continue disabled before choosing a testing option |
| Summary consent | Confirmation disabled before affirmative review |
| Field withdrawal | Removing preferred option removes it from final preview |
| Completion | English and Chinese completion states clearly say no referral was sent |
| Clear session | Returns to homepage and resets journey state |
| Pilot studio | Scenario switch changes explicitly synthetic counts |
| QR invitation | QR graphic and production journey URL present |
| Modal | Close and Escape dismissal checked |

Screenshots are in `docs/assets`. The downloadable plan and print controls are implemented, but OS print output and every browser/voice configuration have not been independently verified. No clinical effectiveness study, penetration test, full accessibility audit or real partner integration has been completed.
