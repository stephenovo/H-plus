# Privacy, safety and pilot readiness

This is an educational competition prototype. Do not enter real health histories, test results, identifying information or third-party details.

## Data flow

| Data | Current handling |
| --- | --- |
| Shopping history | Never requested or processed |
| Language / accessibility preferences | React state in current tab |
| Built-in questions and replies | Browser memory only |
| AI-enabled question | Current question sent to Worker and Workers AI after explicit opt-in |
| Connecting IP | Infrastructure metadata; used by rate-limit binding |
| Referral summary | Browser memory, optional local text export |
| Clinical results | Not collected; no upload feature |
| Pilot-studio statistics | Hard-coded synthetic scenarios |

No application database, cookies, analytics SDK or browser persistent storage is used. Network providers still process data under their own terms. Do not describe this as absolute anonymity or zero infrastructure retention. Browser/OS speech synthesis may use a remote voice service. External official links use their own privacy policies.

## Clinical boundaries

- No diagnosis, medication recommendation, personalised HIV probability or interpretation of uploaded tests.
- A reactive self-test requires confirmatory testing; it is not a confirmed diagnosis.
- Possible recent exposure should prompt timely professional assessment, not a wait for kit delivery. The prototype explains the 72-hour PEP initiation window and routes to authoritative information.
- U=U refers to prevention of sexual transmission when treatment achieves and maintains an undetectable viral load. A self-test or medication check-in cannot establish this state.
- Casual contact transmission information is distinct from U=U; respectful treatment never depends on viral suppression.
- Self-test costs and result-upload conditions are not advertised as unconditional free services.
- The code and medical wording have not undergone independent clinical validation.

## Security measures implemented

Input bounds, same-origin API policy, content-type validation, server-side inference, per-IP rate limiting, topic allowlisting, fixed output content, React text rendering, CSP, self-hosted fonts and no embedded secrets. Automated tests exercise request rejection and model-output boundaries.

These measures are not a complete security or clinical assurance case. Same-origin validation is bypassable by non-browser clients. Keyword matching can miss a concerning question; the application must not replace professional assessment.

## Before a real pilot

1. Obtain community and clinical review of wording, accessibility, priority pathways and translations.
2. Confirm provider agreements, testing arrangements, costs, capacity and follow-up responsibilities.
3. Separate service consent from evaluation consent and define withdrawal/retention arrangements.
4. Conduct an appropriate privacy and security assessment, including all AI subprocessors.
5. Introduce approved identity/access controls only if actual referral data must be handled.
6. Agree event definitions, deduplication, verification permissions and suppression of small aggregates.
7. Test accessibility with intended participants, not only the development team.
8. Review institutional/ethics requirements before participant recruitment and evaluation.

The repository does not contain a partner commitment, ethics approval or claim of clinical effectiveness.
