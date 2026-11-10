# H+ architecture

H+ is a React/TypeScript single-page application and a small Cloudflare Worker. The deployed application is stateless: no D1, KV, R2, authentication or participant store is configured.

## Surfaces

| Hash route | Purpose |
| --- | --- |
| `/#home` | Product story, QR invitation, U=U introduction |
| `/#journey` | Preferences → conversation → options → review → demo plan |
| `/#impact` | Synthetic pilot scenarios, never production analytics |
| `/#evidence` | Sources, implemented scope and proposed integrations |

Hash navigation preserves in-tab state until the user clears it or reloads. The clear control resets the conversation, AI consent, selected option, summary settings and note. Outstanding client requests are ignored after reset or stage changes. This is not a promise to erase infrastructure records, browser history or exported files.

## AI request contract

`POST /api/chat`, JSON:

```json
{
  "message": "What does U=U mean?",
  "lang": "en",
  "aiConsent": true
}
```

Requirements: same Origin as the deployed Worker, JSON content type, explicit AI consent, 1–800 characters, bounded request body, and available rate-limit budget. The deployed limiter permits 10 requests per minute per connecting IP. An Origin header is an abuse-reduction measure, not proof of identity; a non-browser caller can reproduce it.

The sequence is:

1. Validate request and consent.
2. Apply rate limit.
3. Route recognised urgent, reactive-result, everyday-contact and light conversational phrases directly to authored replies.
4. Ask `@cf/meta/llama-3.1-8b-instruct-fast` for one topic label.
5. Accept only own properties of the topic library; reject arbitrary generated prose.
6. Return authored text, an applicable source and a mode label.
7. On provider failure, return explicit built-in fallback.

Response modes: `ai`, `safety-rule`, `smalltalk`, `fallback`. Browser-only responses use `guide`. Recognised urgent, reactive-result and everyday-contact questions use the `safety-rule` path before model classification; greetings, thanks, assistant identity and weather use `smalltalk`. The model does not receive a full conversation, a summary, a test image, shopping history or identity.

## Knowledge

`src/knowledge.mjs` contains English and Traditional Chinese content, source identifiers, local rules and a small confirmation predicate. It is a curated static library, **not** vector retrieval and **not** a clinically validated triage model. Content is source-informed and needs professional/community review before real use.

No probabilistic personal risk score is calculated. A new model label cannot create a new medical response. Incorrect topic classification is still possible, and simple keyword priority rules are not an exhaustive assessment of exposure.

## Consent preview

The user can remove the testing preference and question field or add a fictional note. The confirmation button requires a valid selected service and affirmative review. No referral API exists; confirmation changes local UI state only. Export creates a local text file containing the visible summary. The official service link opens a separately governed website.

## Deployment and operations

The separate `legacy-redirect/` Worker sends GET requests from the former demonstration URL to H+. It returns 410 for non-GET requests, so old API clients cannot silently submit questions to the new origin.


- Frontend: Vite builds into `dist`.
- Worker: `worker/index.mjs` handles `/api/*`; Cloudflare serves static assets.
- Fonts: packaged and self-hosted.
- Headers: CSP, no-referrer, frame denial, no camera/microphone/geolocation permission.
- Health: `GET /api/health` reports binding availability and simulation status, not model uptime.
- No message-body logging is implemented; Worker observability is disabled in project configuration. Hosting/inference provider handling remains separate.
- The public AI endpoint should receive stronger bot controls, usage monitoring and a reviewed budget before a broader launch.

To update: run `npm run check`, then `npm run deploy`. Verify `/api/health` and one fictional AI question. Review previous versions with `npx wrangler deployments list`; rollback procedures are provided by Wrangler and should be used only for the intended Worker/account.
