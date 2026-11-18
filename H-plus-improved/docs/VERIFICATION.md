# Verification record

Checked on 10 November 2026 (Hong Kong time).

## Automated checks

`npm test`: 19 passing Node tests.

- English/Chinese priority routing precedes ordinary kit guidance.
- Reactive self-test guidance distinguishes screening from diagnosis.
- U=U content includes sustained treatment, sexual transmission and follow-up.
- Unknown/malicious topic names cannot select arbitrary content.
- Demo-plan confirmation requires review and a valid option.
- Every knowledge topic has both languages.
- Missing AI consent rejects the request before inference.
- Valid model labels resolve to canonical source-based responses.
- Recognised urgent, reactive-result and everyday-contact requests bypass model execution. The Chinese question “一起吃饭或拥抱会传染吗？” returns casual-contact guidance even if a model would label it U=U.
- Recognised greeting, thanks, assistant identity and weather requests receive matching prepared replies. The weather reply does not invent live conditions and links to the Hong Kong Observatory.
- Provider outage returns labelled fallback.
- Arbitrary model prose is not returned to the UI.
- Oversized messages, cross-origin calls and exhausted rate limits are rejected.

`npm run build`: TypeScript validation and Vite production build passed. GitHub Actions repeats tests and build for the committed code.

## Browser checks

The live/local interfaces were inspected using the browser at 1440 px desktop and 390 px mobile.

| Check | Observation |
| --- | --- |
| Homepage | Desktop and Traditional Chinese mobile layouts inspected; guide name is UU / 悠悠 |
| Conversation entry | Invitation-focused wording and direct access to testing options checked in both languages |
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


## Final-round update — 15 November 2026

Invite → Explore → Choose → Connect. Home offers direct testing options or optional UU conversation. Each testing option has its own official service destination and external privacy notice; the editable demo plan is optional. Mixed-intent safety rules run before casual-contact answers. No booking or referral is sent. Provider information uses the official ACTS page; online service availability must be confirmed directly. Verification: 19 automated tests and production build pass. The 50+ rationale cites the November 2024 CHP recommendations, page 3; it concerns late presentation, not individual infection risk.
