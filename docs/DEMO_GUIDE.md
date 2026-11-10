# H+ 90-second demonstration

Use the public website with fictional questions. English is the default; select 繁中 for the Traditional Chinese journey. A desktop browser is convenient for presenting; the journey also works on a phone.

## Presentation sequence

| Time | Action | Suggested narration |
| --- | --- | --- |
| 0–15 s | Homepage → community invitation | “Some people never actively look for HIV services. We bring a transparent invitation into an everyday pharmacy visit, without inferring risk from purchases.” |
| 15–30 s | Start journey → privacy preferences | “Ah Hong supports English and Chinese. AI is optional, and people can explore services without answering sensitive questions.” |
| 30–45 s | Ask “What is U=U?” | “The model identifies the topic. The answer comes from a source-linked library, with clear conditions and no individual diagnosis.” |
| 45–60 s | Explore options → choose one | “The user sees both self-testing and professional support, and can check official arrangements before deciding.” |
| 60–75 s | Review summary → remove a field → confirm | “People see exactly what a future referral could contain. This demo sends nothing to a clinic.” |
| 75–90 s | Pilot studio | “The synthetic dashboard demonstrates the evaluation question: can we reach first-time testers and support informed service use? These are examples, not pilot results.” |

## Short Chinese narration

「我們讓日常藥房接觸，成為一次知情、自願的 HIV 檢測機會。每個成年顧客收到相同邀請，不分析購物資料。進入阿康後，使用者可以選擇語言、是否使用 AI，也可以跳過問題。AI 幫助理解需求，答案來自附來源的內容。最後，使用者自行選擇服務，查看及修改摘要。現在的轉介是演示；真正試點會與服務機構共同落實。右邊的工作室展示我們將如何評估首次檢測與服務完成，而不是替個人打風險分數。」

## Likely judge questions

**Is this already on WhatsApp?**
No. The web prototype demonstrates the proposed conversational service. WhatsApp Business integration requires a configured account, provider policies and a reviewed implementation.

**What exactly does AI do?**
With consent, a live Workers AI model maps free text to a small topic vocabulary. The server validates the label and returns authored content. Recognised urgent, reactive-result and everyday-contact cases use rules before the model. There is no model-generated diagnosis.

**What if someone declines AI or questions?**
Built-in guidance and service exploration remain available. Declining does not remove access to the demo.

**Are the pharmacies or clinics partners?**
No agreement is represented by this prototype. Partner recruitment and service validation are next steps.

**Are the dashboard outcomes real?**
No. Both scenarios are synthetic, deliberately labelled and do not show measured effects of clearer wording.

**Why not collect more data?**
The prototype tests the interaction without needing real health information. A pilot would collect only agreed data with separate evaluation consent.

## Backup if AI is unavailable

Keep AI off and use the built-in prompts. The same service journey remains functional. The interface labels fallback explicitly; do not describe a fallback response as a successful live model call. Screenshots in `docs/assets` can support a presentation if connectivity fails.

## Before recording

- Start a fresh session; use fictional questions only.
- Check the public link and language choice.
- Avoid making promises about free kits, appointments or partner capacity.
- State that referrals and dashboard data are simulated.
- Clear the session at the end.
