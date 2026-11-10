import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  Check,
  ShieldCheck,
  Leaf,
  MessageCircle,
  Heart,
  LockKeyhole,
  ExternalLink,
  X,
  Send,
  ChevronRight,
  Download,
  RotateCcw,
  Menu,
  CheckCircle2,
  MapPin,
  Clock,
  Globe,
  BookOpen,
  Activity,
  Printer,
  Volume2,
  Square,
  Info,
  Accessibility,
  Code2,
} from "lucide-react";
import QRCode from "qrcode";
import { answer, localTopic, canConfirm, sources } from "./knowledge.mjs";
type Lang = "en" | "zh";
type Msg = {
  role: "user" | "assistant";
  text: string;
  mode?: string;
  source?: { title: string; url: string } | null;
};
const repo = "https://github.com/stephenovo/H-plus";
const official = "https://www.hivtest.gov.hk/en/index.html";
function Mascot({ small = false }: { small?: boolean }) {
  return (
    <span className={`mascot ${small ? "small" : ""}`} aria-hidden="true">
      <span className="tuft">✦</span>
      <span className="eyes">● ●</span>
      <span className="smile">⌣</span>
    </span>
  );
}
function Brand() {
  return (
    <span className="brand">
      <img src="/brand.svg" alt="" />
      H+
    </span>
  );
}
function App() {
  const [lang, setLang] = useState<Lang>("en");
  const [page, setPage] = useState(location.hash.slice(1) || "home");
  const [menu, setMenu] = useState(false);
  const [large, setLarge] = useState(false);
  const [modal, setModal] = useState<"privacy" | "receipt" | null>(null);
  const [qr, setQr] = useState("");
  const t = (en: string, zh: string) => (lang === "en" ? en : zh);
  const [step, setStep] = useState(0);
  const [ai, setAi] = useState(false);
  const [choice, setChoice] = useState("");
  const [consent, setConsent] = useState(false);
  const [shareTopics, setShareTopics] = useState(true);
  const [sharePreference, setSharePreference] = useState(true);
  const [note, setNote] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [reading, setReading] = useState(false);
  const [scenario, setScenario] = useState(0);
  const run = useRef(0);
  const chatEnd = useRef<HTMLDivElement>(null);
  function go(p: string) {
    window.speechSynthesis?.cancel();
    setReading(false);
    location.hash = p;
    setMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  useEffect(() => {
    const fn = () => setPage(location.hash.slice(1) || "home");
    window.addEventListener("hashchange", fn);
    return () => window.removeEventListener("hashchange", fn);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang === "en" ? "en" : "zh-Hant";
  }, [lang]);
  useEffect(() => {
    QRCode.toDataURL(`${location.origin}/#journey`, {
      width: 240,
      margin: 1,
      color: { dark: "#173e36", light: "#ffffff" },
    }).then(setQr);
  }, []);
  useEffect(() => {
    if (messages.length)
      chatEnd.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, busy]);
  useEffect(
    () => () => {
      window.speechSynthesis?.cancel();
    },
    [],
  );
  useEffect(() => {
    if (!modal) return;
    const previous = document.activeElement as HTMLElement | null;
    const box = document.querySelector("[role=dialog]");
    const focusables = () =>
      Array.from(
        box?.querySelectorAll<HTMLElement>("button,a[href],input,textarea") ||
          [],
      );
    focusables()[0]?.focus();
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModal(null);
        return;
      }
      if (e.key === "Tab") {
        const nodes = focusables(),
          first = nodes[0],
          last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
      previous?.focus();
    };
  }, [modal]);
  function clearSession() {
    run.current++;
    setStep(0);
    setAi(false);
    setChoice("");
    setConsent(false);
    setNote("");
    setShareTopics(true);
    setSharePreference(true);
    setMessages([]);
    setInput("");
    setBusy(false);
    setError("");
    window.speechSynthesis?.cancel();
    setReading(false);
  }
  function leave() {
    clearSession();
    go("home");
  }
  function start() {
    clearSession();
    go("journey");
  }
  function next(n: number) {
    setStep(n);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  async function ask(text: string) {
    if (busy || !text.trim()) return;
    const question = text.trim().slice(0, 800);
    setInput("");
    setError("");
    setMessages((m) => [...m, { role: "user", text: question }]);
    setBusy(true);
    const id = run.current;
    let result = answer(localTopic(question), lang, "guide");
    if (ai)
      try {
        const r = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: question, lang, aiConsent: true }),
          signal: AbortSignal.timeout(18000),
        });
        if (!r.ok) throw new Error("unavailable");
        result = await r.json();
      } catch {
        result = answer(localTopic(question), lang, "fallback");
      }
    if (id !== run.current) return;
    setMessages((m) => [...m, { role: "assistant", ...result }]);
    setBusy(false);
  }
  function readAloud() {
    if (reading) {
      speechSynthesis.cancel();
      setReading(false);
      return;
    }
    const latest = [...messages].reverse().find((m) => m.role === "assistant");
    if (!latest) return;
    const u = new SpeechSynthesisUtterance(latest.text);
    u.lang = lang === "zh" ? "zh-HK" : "en-GB";
    u.rate = 0.88;
    u.onend = () => setReading(false);
    u.onerror = () => setReading(false);
    speechSynthesis.speak(u);
    setReading(true);
  }
  const summary = [
    t("H+ — DEMONSTRATION PLAN", "H+ — 演示計劃"),
    t("No appointment or referral has been sent.", "沒有發送預約或轉介。"),
    ...(sharePreference
      ? [
          `${t("Preferred option", "偏好選項")}: ${choice === "self" ? t("Self-testing", "自我檢測") : t("Provider-based testing", "到服務點檢測")}`,
        ]
      : []),
    ...(shareTopics
      ? [
          t(
            "Question: Please explain the testing process and privacy arrangements.",
            "問題：請解釋檢測流程及私隱安排。",
          ),
        ]
      : []),
    ...(note.trim() ? [note.trim()] : []),
    t(
      "Next step: visit the official service to check arrangements.",
      "下一步：到官方服務查詢實際安排。",
    ),
    official,
  ].join("\n\n");
  function download() {
    const url = URL.createObjectURL(
      new Blob([summary], { type: "text/plain;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "H-plus-demo-plan.txt";
    a.click();
    URL.revokeObjectURL(url);
  }
  const steps = [
    t("Your comfort", "你的選擇"),
    t("Ask Ah Hong", "問問阿康"),
    t("Explore options", "了解選項"),
    t("Your decision", "自主決定"),
  ];
  return (
    <div className={large ? "app large" : "app"}>
      <a
        className="skip-link"
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main")?.focus();
        }}
      >
        Skip to content
      </a>
      <header>
        <div className="nav-shell">
          <button
            className="brand-button"
            onClick={() => go("home")}
            aria-label="H+ home"
          >
            <Brand />
          </button>
          <nav className={menu ? "open" : ""}>
            <button
              className={page === "home" ? "active" : ""}
              onClick={() => go("home")}
            >
              {t("Our approach", "我們的理念")}
            </button>
            <button
              className={page === "journey" ? "active" : ""}
              onClick={() => go("journey")}
            >
              {t("Meet Ah Hong", "認識阿康")}
            </button>
            <button
              className={page === "impact" ? "active" : ""}
              onClick={() => go("impact")}
            >
              {t("Pilot studio", "試點工作室")}
            </button>
            <button
              className={page === "evidence" ? "active" : ""}
              onClick={() => go("evidence")}
            >
              {t("Evidence & design", "資料與設計")}
            </button>
          </nav>
          <div className="nav-tools">
            <button
              className="language"
              onClick={() => {
                setLang(lang === "en" ? "zh" : "en");
                speechSynthesis?.cancel();
                setReading(false);
              }}
            >
              <Globe size={15} />
              {lang === "en" ? "繁中" : "EN"}
            </button>
            <button
              className="icon-button"
              onClick={() => setLarge(!large)}
              aria-label="Toggle larger text"
              aria-pressed={large}
            >
              <Accessibility size={20} />
            </button>
            <button
              className="menu-button icon-button"
              onClick={() => setMenu(!menu)}
              aria-label="Toggle navigation"
            >
              <Menu />
            </button>
          </div>
        </div>
      </header>
      <main id="main" tabIndex={-1}>
        {page === "home" && (
          <>
            <section className="hero shell">
              <div className="hero-copy">
                <div className="eyebrow">
                  <span />{" "}
                  {t(
                    "HIV + ONE TEST · HIV + HEALTH",
                    "HIV 多一次檢測・多一份健康",
                  )}
                </div>
                <h1>
                  {t("A little support.", "多一點支持，")}
                  <br />
                  <em>{t("A step forward.", "安心踏出一步。")}</em>
                </h1>
                <p className="hero-description">
                  {t(
                    "Good health starts with a conversation. Explore HIV testing at your own pace, with a friendly guide and choices that stay yours.",
                    "健康，由一次安心對話開始。跟阿康慢慢了解 HIV 檢測，每一步，都由你選擇。",
                  )}
                </p>
                <div className="hero-actions">
                  <button className="button primary" onClick={start}>
                    {t("Have a chat with Ah Hong", "與阿康聊聊")}
                    <ArrowUpRight size={20} />
                  </button>
                  <button
                    className="text-button"
                    onClick={() => setModal("receipt")}
                  >
                    {t("See the community invitation", "看看社區邀請")}
                    <ArrowRight size={17} />
                  </button>
                </div>
                <div className="trust-line">
                  <ShieldCheck size={17} />
                  {t(
                    "No account. No pressure. You decide.",
                    "不用註冊，不必急於決定。",
                  )}
                </div>
              </div>
              <div className="hero-art">
                <div className="art-circle" />
                <div className="art-dots" />
                <div className="floating-label">
                  <span className="tiny-dot" />
                  {t(
                    "A familiar face. A private space.",
                    "親切的陪伴，安心的空間。",
                  )}
                </div>
                <div className="phone">
                  <div className="phone-top">
                    <span>9:41</span>
                    <span>▮▮▮ ▰</span>
                  </div>
                  <div className="phone-head">
                    <Mascot small />
                    <div>
                      <strong>{t("Ah Hong", "街坊阿康")}</strong>
                      <small>
                        {t("Your community health guide", "你的社區健康嚮導")}
                      </small>
                    </div>
                    <ShieldCheck size={18} />
                  </div>
                  <div className="phone-body">
                    <div className="chat-date">
                      {t("YOUR CONVERSATION, YOUR PACE", "按你的步伐，慢慢聊")}
                    </div>
                    <div className="mock-bubble">
                      {t(
                        "Hello, I’m Ah Hong 👋 What would help you feel more comfortable today?",
                        "你好，我係阿康 👋 今日有咩想慢慢了解？",
                      )}
                    </div>
                    <div className="mock-bubble user">
                      {t(
                        "I’ve never had an HIV test. Where do I start?",
                        "我未做過 HIV 檢測，應該點開始？",
                      )}
                    </div>
                    <div className="mock-bubble">
                      {t(
                        "We can take it one step at a time. You choose what to share.",
                        "我哋可以一步一步嚟，分享幾多，由你決定。",
                      )}
                      <span className="bubble-source">
                        <BookOpen size={12} />
                        {t("Information with a source", "有來源的健康資訊")}
                      </span>
                    </div>
                    <button className="mock-choice" onClick={start}>
                      {t("Explore my options", "了解我的選項")}
                      <ArrowRight size={16} />
                    </button>
                  </div>
                  <div className="phone-input">
                    <span>
                      {t("Ask at your own pace…", "慢慢問，唔使急……")}
                    </span>
                    <span className="send-circle">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                </div>
                <div className="privacy-stamp">
                  <ShieldCheck size={22} />
                  <div>
                    <strong>{t("You’re in control", "你，掌握選擇權")}</strong>
                    <span>{t("At every step.", "每一步都是。")}</span>
                  </div>
                </div>
                <div className="leaf-art">✳</div>
              </div>
            </section>
            <div className="prototype-strip shell">
              <span className="pill">
                {t("INTERACTIVE PROTOTYPE", "互動原型")}
              </span>
              <p>
                {t(
                  "Built for HIV Hackathon 2026. Explore a real interface with simulated referrals.",
                  "為 HIV Hackathon 2026 製作。體驗可操作介面及模擬轉介。",
                )}
              </p>
              <button onClick={() => go("evidence")}>
                {t("What’s live?", "哪些功能可用？")}
                <ArrowUpRight size={15} />
              </button>
            </div>
            <section className="shell journey-intro">
              <div className="section-head">
                <div>
                  <div className="eyebrow">
                    {t("A SMALL STEP, CLOSE TO HOME", "由街坊日常，踏出一小步")}
                  </div>
                  <h2>
                    {t("Care that meets you", "在熟悉的地方，")}
                    <br />
                    {t("where you already are.", "遇見一點關懷。")}
                  </h2>
                </div>
                <p>
                  {t(
                    "From a neighbourhood pharmacy to a private conversation. A simple bridge to existing testing and support services.",
                    "由街坊藥房的一張邀請，開始一場私密對話，連接現有檢測與支援服務。",
                  )}
                </p>
              </div>
              <div className="path-grid">
                {[
                  [
                    <MapPin />,
                    t("An everyday invitation", "日常的一張邀請"),
                    t(
                      "The same QR invitation for adult customers. No shopping profiles or risk labels.",
                      "成年顧客收到相同邀請，不分析購物記錄，不貼風險標籤。",
                    ),
                  ],
                  [
                    <MessageCircle />,
                    t("A conversation, on your terms", "按你的意願，開始對話"),
                    t(
                      "Ask questions, skip what feels personal, and understand your choices with Ah Hong.",
                      "問你想知的，跳過不想答的，跟阿康了解自己的選項。",
                    ),
                  ],
                  [
                    <Heart />,
                    t("A next step you choose", "自主選擇下一步"),
                    t(
                      "Explore self-testing or professional support. Review every detail before you share.",
                      "了解自測或專業支援；分享前，先看清楚每一項資料。",
                    ),
                  ],
                ].map(([icon, title, body], i) => (
                  <article className="path-card" key={i}>
                    <div className="card-top">
                      <span className="icon-tile">{icon}</span>
                      <span className="number">0{i + 1}</span>
                    </div>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </article>
                ))}
              </div>
            </section>
            <section className="shell uu-banner">
              <div className="uu-mark">
                U<span>=</span>U
              </div>
              <div>
                <div className="eyebrow">
                  {t(
                    "KNOWLEDGE THAT CHANGES THE CONVERSATION",
                    "讓科學，帶來安心",
                  )}
                </div>
                <h2>
                  {t(
                    "There is life beyond a diagnosis.",
                    "確診之後，生活仍有可能。",
                  )}
                </h2>
                <p>
                  {t(
                    "People on HIV treatment who achieve and maintain an undetectable viral load do not transmit HIV through sex. Everyone deserves care and respect.",
                    "接受 HIV 治療並持續保持病毒載量無法檢測，就不會透過性接觸傳播 HIV。每個人都值得獲得關懷與尊重。",
                  )}
                </p>
                <button
                  className="text-button"
                  onClick={() => {
                    clearSession();
                    setStep(1);
                    setMessages([{ role: "assistant", ...answer("uu", lang) }]);
                    go("journey");
                  }}
                >
                  {t("Understand U=U with Ah Hong", "與阿康了解 U=U")}
                  <ArrowRight size={17} />
                </button>
              </div>
            </section>
            <section className="shell closing">
              <Leaf size={26} />
              <h2>
                {t(
                  "Your health. Your pace. Your choice.",
                  "你的健康，你的步伐，你的選擇。",
                )}
              </h2>
              <button className="button primary" onClick={start}>
                {t("Take the first step", "開始第一步")}
                <ArrowRight size={18} />
              </button>
            </section>
          </>
        )}
        {page === "journey" && (
          <section className="shell workspace">
            <div className="workspace-top">
              <div>
                <div className="eyebrow">
                  {t("YOUR PRIVATE SPACE", "你的安心空間")}
                </div>
                <h1 className="page-title">
                  {t("Let’s take it one step at a time.", "我哋，一步一步嚟。")}
                </h1>
              </div>
              <button className="text-button" onClick={leave}>
                <X size={16} />
                {t("Clear & leave", "清除並離開")}
              </button>
            </div>
            <div className="journey-layout">
              <aside className="journey-sidebar">
                <div className="guide-profile">
                  <Mascot />
                  <h3>{t("Hello, I’m Ah Hong.", "你好，我係阿康。")}</h3>
                  <p>
                    {t(
                      "I’m here to help you understand your choices. You can skip questions or leave whenever you like.",
                      "我會幫你了解選擇。你可以跳過問題，或隨時離開。",
                    )}
                  </p>
                </div>
                <ol className="steps">
                  {steps.map((s, i) => (
                    <li
                      key={s}
                      className={
                        step === i ? "current" : step > i ? "done" : ""
                      }
                    >
                      <span>{step > i ? <Check size={14} /> : i + 1}</span>
                      {s}
                    </li>
                  ))}
                </ol>
                <div className="sidebar-note">
                  <LockKeyhole size={18} />
                  <p>
                    {t(
                      "Choices stay in this tab. AI questions are sent only if you enable AI.",
                      "選擇只保留於此分頁。啟用 AI 後才傳送問題。",
                    )}
                  </p>
                </div>
                <button
                  className="text-button"
                  onClick={() => setModal("privacy")}
                >
                  {t("How your data is handled", "了解資料如何處理")}
                  <ArrowUpRight size={14} />
                </button>
              </aside>
              <div className="journey-panel" key={step}>
                {step === 0 && (
                  <>
                    <span className="step-label">
                      01 / {t("YOUR COMFORT COMES FIRST", "先照顧你的感受")}
                    </span>
                    <h2>
                      {t("Make yourself comfortable.", "先選一個舒服的方式。")}
                    </h2>
                    <p className="muted">
                      {t(
                        "This is an educational prototype. Please use fictional questions and do not enter names, phone numbers or test results.",
                        "這是教育用途原型。請使用虛構問題，不要輸入姓名、電話或檢測結果。",
                      )}
                    </p>
                    <div className="preference-row">
                      <div>
                        <strong>{t("Your language", "對話語言")}</strong>
                        <p>{t("Switch any time.", "隨時可以更改。")}</p>
                      </div>
                      <div className="segmented">
                        <button
                          className={lang === "en" ? "selected" : ""}
                          onClick={() => setLang("en")}
                        >
                          English
                        </button>
                        <button
                          className={lang === "zh" ? "selected" : ""}
                          onClick={() => setLang("zh")}
                        >
                          繁體中文
                        </button>
                      </div>
                    </div>
                    <div className="preference-row">
                      <div>
                        <strong>
                          {t("Larger, easier-to-read text", "放大字體")}
                        </strong>
                        <p>
                          {t(
                            "A little extra breathing room.",
                            "看得舒服一點。",
                          )}
                        </p>
                      </div>
                      <button
                        className={`switch ${large ? "on" : ""}`}
                        role="switch"
                        aria-checked={large}
                        aria-label="Larger text"
                        onClick={() => setLarge(!large)}
                      >
                        <span />
                      </button>
                    </div>
                    <label className="consent-box">
                      <input
                        type="checkbox"
                        checked={ai}
                        onChange={(e) => setAi(e.target.checked)}
                      />
                      <span>
                        <strong>
                          {t(
                            "Enable AI-assisted topic matching (optional)",
                            "啟用 AI 主題辨識（自選）",
                          )}
                        </strong>
                        <span>
                          {t(
                            "I agree to send each question to Cloudflare Workers AI to identify its topic. Health answers come from a source-linked knowledge library. Without AI, built-in guidance still works.",
                            "我同意將每條問題傳送至 Cloudflare Workers AI 作主題辨識。健康資訊來自附來源的知識庫。不啟用 AI，仍可使用內置指引。",
                          )}
                        </span>
                      </span>
                    </label>
                    <div className="inline-note">
                      <ShieldCheck size={18} />
                      {t(
                        "No account, no notifications, no background sharing.",
                        "不設帳戶、不發通知、不在背景分享。",
                      )}
                    </div>
                    <button
                      className="button primary full"
                      onClick={() => next(1)}
                    >
                      {t("Continue to Ah Hong", "開始與阿康對話")}
                      <ArrowRight size={18} />
                    </button>
                  </>
                )}
                {step === 1 && (
                  <>
                    <div className="chat-header">
                      <div>
                        <span className="step-label">
                          02 / {t("ASK AT YOUR OWN PACE", "按你的步伐，慢慢問")}
                        </span>
                        <h2>{t("What’s on your mind?", "有咩想了解？")}</h2>
                      </div>
                      <span className="status-badge">
                        <span />
                        {ai
                          ? t("AI enabled", "AI 已啟用")
                          : t("Built-in guide", "內置指引")}
                      </span>
                    </div>
                    <p className="muted">
                      {t(
                        "Ask about testing, privacy or U=U. You can also skip the conversation.",
                        "可以問檢測、私隱或 U=U，也可以直接跳過對話。",
                      )}
                    </p>
                    <div className="chat-log" aria-live="polite">
                      <div className="message assistant">
                        <Mascot small />
                        <div className="message-content">
                          {t(
                            "Hello! There’s no right or wrong question. What would help you feel ready to take a next step?",
                            "你好！有問題就可以問。你想先了解邊一方面，再決定下一步？",
                          )}
                        </div>
                      </div>
                      {messages.map((m, i) => (
                        <div className={`message ${m.role}`} key={i}>
                          {m.role === "assistant" && <Mascot small />}
                          <div className="message-content">
                            {m.text}
                            {m.source && (
                              <a
                                className="answer-source"
                                href={m.source.url}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <BookOpen size={12} />
                                {m.source.title}
                                <ExternalLink size={11} />
                              </a>
                            )}
                            {m.mode && (
                              <small className="answer-mode">
                                {m.mode === "ai"
                                  ? t(
                                      m.source
                                        ? "AI topic matching · source-based reply"
                                        : "AI topic matching · prepared reply",
                                      m.source
                                        ? "AI 主題辨識・來源知識庫回覆"
                                        : "AI 主題辨識・預設回覆",
                                    )
                                  : m.mode === "fallback"
                                    ? t(
                                        "AI unavailable · built-in guidance",
                                        "AI 暫時無法使用・已改用內置指引",
                                      )
                                    : m.mode === "safety-rule"
                                      ? t(
                                          "Priority guidance · rule-based",
                                          "優先指引・固定規則",
                                        )
                                      : m.mode === "smalltalk"
                                        ? t(
                                            "Friendly reply · built-in",
                                            "輕鬆對話・內置回覆",
                                          )
                                      : t("Built-in guidance", "內置指引")}
                              </small>
                            )}
                          </div>
                        </div>
                      ))}
                      {busy && (
                        <div className="thinking">
                          {t(
                            "Ah Hong is finding the right information…",
                            "阿康正尋找相關資訊……",
                          )}
                        </div>
                      )}
                      <div ref={chatEnd} />
                    </div>
                    <div className="prompt-chips">
                      {[
                        [
                          "Where do I start with testing?",
                          "第一次檢測，點開始？",
                        ],
                        ["What is U=U?", "甚麼是 U=U？"],
                        ["Who sees my information?", "誰會看到我的私隱資料？"],
                      ].map(([en, zh]) => (
                        <button
                          disabled={busy}
                          key={en}
                          onClick={() => ask(t(en, zh))}
                        >
                          {t(en, zh)}
                        </button>
                      ))}
                    </div>
                    <form
                      className="chat-form"
                      onSubmit={(e) => {
                        e.preventDefault();
                        ask(input);
                      }}
                    >
                      <input
                        aria-label={t("Your question", "你的問題")}
                        placeholder={t(
                          "Type a fictional question…",
                          "輸入虛構問題……",
                        )}
                        value={input}
                        maxLength={800}
                        onChange={(e) => setInput(e.target.value)}
                      />
                      <button
                        disabled={busy || !input.trim()}
                        aria-label="Send question"
                      >
                        <Send size={19} />
                      </button>
                    </form>
                    <div className="chat-controls">
                      <button
                        className="text-button"
                        onClick={() => {
                          run.current++;
                          setBusy(false);
                          setAi(false);
                          next(0);
                        }}
                      >
                        {t("Privacy settings", "私隱設定")}
                      </button>
                      {"speechSynthesis" in window &&
                        messages.some((m) => m.role === "assistant") && (
                          <button className="text-button" onClick={readAloud}>
                            {reading ? (
                              <Square size={14} />
                            ) : (
                              <Volume2 size={14} />
                            )}{" "}
                            {t("Read latest reply", "讀出最新回覆")}
                          </button>
                        )}
                    </div>
                    <button
                      className="button primary full"
                      onClick={() => {
                        run.current++;
                        setBusy(false);
                        speechSynthesis?.cancel();
                        setReading(false);
                        next(2);
                      }}
                    >
                      {t("Explore testing options", "了解檢測選項")}
                      <ArrowRight size={18} />
                    </button>
                    <button
                      className="skip-step"
                      onClick={() => {
                        run.current++;
                        setBusy(false);
                        next(2);
                      }}
                    >
                      {t(
                        "Skip questions — continue without answering",
                        "跳過問題，繼續了解",
                      )}
                    </button>
                  </>
                )}
                {step === 2 && (
                  <>
                    <span className="step-label">
                      03 / {t("EXPLORE YOUR OPTIONS", "了解你的選項")}
                    </span>
                    <h2>
                      {t("There’s more than one way.", "選一個適合你的方式。")}
                    </h2>
                    <p className="muted">
                      {t(
                        "Choose what feels comfortable. These are service options, not confirmed appointments or partner offers.",
                        "按你的需要選擇。以下是服務選項，並非已確認的預約或合作優惠。",
                      )}
                    </p>
                    <div className="urgent-note">
                      <Clock size={20} />
                      <div>
                        <strong>
                          {t("Possible recent exposure?", "可能近期接觸 HIV？")}
                        </strong>
                        <p>
                          {t(
                            "Seek professional assessment promptly. PEP is time-sensitive; do not wait for a kit.",
                            "請盡快尋求專業評估。PEP 有時間限制，切勿等待自測盒。",
                          )}
                        </p>
                        <button
                          onClick={() => {
                            setMessages((m) => [
                              ...m,
                              {
                                role: "assistant",
                                ...answer("urgent", lang, "safety-rule"),
                              },
                            ]);
                            next(1);
                          }}
                        >
                          {t("Read urgent guidance", "查看及時求助指引")}
                          <ArrowRight size={13} />
                        </button>
                      </div>
                    </div>
                    <div className="option-list">
                      {(["self", "clinic"] as const).map((k) => (
                        <button
                          key={k}
                          className={`option ${choice === k ? "chosen" : ""}`}
                          onClick={() => {
                            setChoice(k);
                            setConsent(false);
                          }}
                          aria-pressed={choice === k}
                        >
                          <span className="option-icon">
                            {k === "self" ? <Leaf /> : <MapPin />}
                          </span>
                          <span>
                            <strong>
                              {k === "self"
                                ? t(
                                    "Self-test, in your own space",
                                    "在自己的空間自測",
                                  )
                                : t(
                                    "Test with professional support",
                                    "由工作人員協助檢測",
                                  )}
                            </strong>
                            <span>
                              {k === "self"
                                ? t(
                                    "Follow kit instructions. Check current ordering costs and result-upload terms. Reactive results need confirmation.",
                                    "按試劑說明操作，先了解訂購費用與結果上傳條款。有反應結果需要確認檢測。",
                                  )
                                : t(
                                    "Explore official testing services and speak with trained staff. Check availability directly.",
                                    "了解官方檢測服務，向受訓工作人員查詢，直接確認服務安排。",
                                  )}
                            </span>
                          </span>
                          <span className="radio-dot">
                            {choice === k && <Check size={13} />}
                          </span>
                        </button>
                      ))}
                    </div>
                    <a
                      className="source-link"
                      href={choice === "self" ? sources[2].url : official}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t(
                        "Read official service information",
                        "閱讀官方服務資料",
                      )}
                      <ExternalLink size={14} />
                    </a>
                    <button
                      className="button primary full"
                      disabled={!choice}
                      onClick={() => next(3)}
                    >
                      {t("Review my next step", "查看下一步")}
                      <ArrowRight size={18} />
                    </button>
                    <button className="skip-step" onClick={leave}>
                      {t(
                        "Not ready? Leave without choosing",
                        "還未準備好？可以先離開",
                      )}
                    </button>
                  </>
                )}
                {step === 3 && (
                  <>
                    <span className="step-label">
                      04 / {t("YOUR DECISION", "由你決定")}
                    </span>
                    <h2>
                      {t("See it before you share it.", "分享之前，先看清楚。")}
                    </h2>
                    <p className="muted">
                      {t(
                        "Build a sample referral summary. Nothing is sent to a provider. Choose which details appear in your preview.",
                        "建立模擬轉介摘要。資料不會發送至機構。請選擇預覽中出現的內容。",
                      )}
                    </p>
                    <label className="check-row">
                      <input
                        type="checkbox"
                        checked={sharePreference}
                        onChange={(e) => setSharePreference(e.target.checked)}
                      />
                      {t(
                        "Include my preferred testing option",
                        "加入偏好的檢測方式",
                      )}
                    </label>
                    <label className="check-row">
                      <input
                        type="checkbox"
                        checked={shareTopics}
                        onChange={(e) => setShareTopics(e.target.checked)}
                      />
                      {t(
                        "Ask about the process and privacy arrangements",
                        "查詢流程及私隱安排",
                      )}
                    </label>
                    <label className="field-label" htmlFor="note">
                      {t(
                        "A fictional question to add (optional)",
                        "加入虛構問題（自選）",
                      )}
                    </label>
                    <textarea
                      id="note"
                      value={note}
                      maxLength={300}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder={t(
                        "For example: Can I choose when to be contacted?",
                        "例如：可以選擇聯絡時間嗎？",
                      )}
                    />
                    <div className="summary">
                      <span className="step-label">
                        {t("YOUR EXACT PREVIEW", "你的完整預覽")}
                      </span>
                      <pre>{summary}</pre>
                    </div>
                    <label className="consent-box">
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                      />
                      <span>
                        <strong>
                          {t(
                            "I have reviewed this demo summary.",
                            "我已閱讀這份演示摘要。",
                          )}
                        </strong>
                        <span>
                          {t(
                            "I understand this is HIV testing navigation, and continuing does not send a referral or book a test.",
                            "我明白這是 HIV 檢測導航，繼續操作不會發送轉介或預約。",
                          )}
                        </span>
                      </span>
                    </label>
                    <button
                      className="button primary full"
                      disabled={!canConfirm(consent, choice)}
                      onClick={() => next(4)}
                    >
                      {t("Confirm my demo plan", "確認演示計劃")}
                      <Check size={18} />
                    </button>
                    <button
                      className="skip-step"
                      onClick={() => {
                        setConsent(false);
                        next(2);
                      }}
                    >
                      {t("Go back — keep exploring", "返回，再了解一下")}
                    </button>
                  </>
                )}
                {step === 4 && (
                  <div className="completion">
                    <span className="success-icon">
                      <CheckCircle2 size={35} />
                    </span>
                    <span className="step-label">
                      {t("ONE STEP FORWARD", "向前一小步")}
                    </span>
                    <h2>
                      {t("Your next step is yours.", "下一步，仍由你決定。")}
                    </h2>
                    <p>
                      {t(
                        "You explored your options and reviewed a plan. No appointment was booked and no personal information was sent to a provider.",
                        "你已了解選項並查看計劃。沒有預約，亦沒有向機構發送個人資料。",
                      )}
                    </p>
                    <div className="summary">
                      <pre>{summary}</pre>
                    </div>
                    <a
                      className="button primary full"
                      href={official}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t(
                        "Visit the official testing service",
                        "前往官方檢測服務",
                      )}
                      <ExternalLink size={17} />
                    </a>
                    <p className="micro">
                      {t(
                        "External website · its own terms and privacy policy apply.",
                        "外部網站・適用其服務條款與私隱政策。",
                      )}
                    </p>
                    <button
                      className="button secondary full"
                      onClick={download}
                    >
                      <Download size={17} />
                      {t("Download demo plan", "下載演示計劃")}
                    </button>
                    <p className="micro">
                      {t(
                        "A downloaded file remains on your device after this session is cleared.",
                        "清除此對話後，已下載檔案仍會留在裝置上。",
                      )}
                    </p>
                    <button className="skip-step" onClick={leave}>
                      {t("Clear this session & finish", "清除對話並完成")}
                    </button>
                  </div>
                )}
                {error && <p role="alert">{error}</p>}
              </div>
            </div>
          </section>
        )}
        {page === "impact" && (
          <section className="shell studio">
            <div className="workspace-top">
              <div>
                <div className="eyebrow">
                  {t(
                    "FROM COMMUNITY REACH TO INFORMED CHOICE",
                    "由社區接觸，到知情選擇",
                  )}
                </div>
                <h1 className="page-title">
                  {t(
                    "A clearer picture of the journey.",
                    "看清服務旅程的每一步。",
                  )}
                </h1>
              </div>
              <span className="pill amber">
                {t("SYNTHETIC DEMO DATA", "合成演示資料")}
              </span>
            </div>
            <p className="intro-text">
              {t(
                "A prototype of what a partner could learn from an agreed pilot. These numbers are fictional scenarios—not visitors, health records or measured outcomes.",
                "示範合作機構可以如何評估試點。以下數字是虛構場景，並非訪客、健康記錄或已測量成果。",
              )}
            </p>
            <div className="studio-toolbar">
              <span>
                {t("Explore an illustrative scenario", "選擇示範情境")}
              </span>
              <div className="segmented">
                <button
                  className={!scenario ? "selected" : ""}
                  onClick={() => setScenario(0)}
                >
                  {t("Initial invitation", "原有邀請")}
                </button>
                <button
                  className={scenario ? "selected" : ""}
                  onClick={() => setScenario(1)}
                >
                  {t("Clearer service information", "更清晰的服務資訊")}
                </button>
              </div>
            </div>
            <div className="metric-grid">
              {[
                [
                  scenario ? "380" : "300",
                  t("Engaged with invitation", "查看邀請"),
                  t("out of 2,000 invitations", "共 2,000 次邀請"),
                ],
                [
                  scenario ? "64" : "42",
                  t("Completed testing", "完成檢測"),
                  t("fictional, authorised verification", "虛構、經授權核實"),
                ],
                [
                  scenario ? "37 / 64" : "23 / 42",
                  t("First-ever testers", "首次檢測者"),
                  t("self-reported among completers", "完成者自願自報"),
                ],
                [
                  scenario ? "88%" : "74%",
                  t("Understood their choices", "理解自己的選擇"),
                  t("fictional comprehension check", "虛構理解檢查"),
                ],
              ].map(([value, label, sub]) => (
                <article className="metric" key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                  <small>{sub}</small>
                </article>
              ))}
            </div>
            <div className="studio-grid">
              <article className="panel">
                <div className="panel-title">
                  <h3>
                    {t(
                      "Every step has a denominator.",
                      "每一步，都有清楚的分母。",
                    )}
                  </h3>
                  <Activity size={20} />
                </div>
                <p className="muted">
                  {t(
                    "Illustrative service funnel · counts, not risk scores",
                    "示範服務流程・人次，不是風險分數",
                  )}
                </p>
                {[
                  [t("Invitations offered", "發出邀請"), 2000],
                  [t("Engaged", "查看資訊"), scenario ? 380 : 300],
                  [t("Selected an option", "選擇方式"), scenario ? 125 : 90],
                  [t("Completed a test", "完成檢測"), scenario ? 64 : 42],
                ].map(([label, n], i) => (
                  <div className="funnel-row" key={label}>
                    <div>
                      <span>{label}</span>
                      <strong>{n}</strong>
                    </div>
                    <div className="bar-track">
                      <span
                        style={{
                          width: `${Math.max(8, (Number(n) / 2000) * 100)}%`,
                          opacity: 1 - i * 0.14,
                        }}
                      />
                    </div>
                  </div>
                ))}
                <p className="micro">
                  {t(
                    "A future pilot needs consented follow-up to verify completion; a click is not a test.",
                    "未來試點須經同意跟進，才能核實完成檢測；點擊不等於檢測。",
                  )}
                </p>
              </article>
              <article className="panel">
                <div className="panel-title">
                  <h3>{t("Listen. Adjust. Learn.", "聆聽，調整，再學習。")}</h3>
                  <MessageCircle size={20} />
                </div>
                <p className="muted">
                  {t(
                    "Example feedback themes for human review",
                    "供工作人員審閱的示範回饋主題",
                  )}
                </p>
                {[
                  [
                    t("Unclear contact arrangements", "不清楚聯絡安排"),
                    t(
                      "Explain when and how a provider might contact someone.",
                      "解釋機構可能何時、如何聯絡。",
                    ),
                  ],
                  [
                    t("No private space at home", "家中缺少私密空間"),
                    t(
                      "Make provider-based testing equally visible.",
                      "同樣清晰地展示到場檢測選項。",
                    ),
                  ],
                  [
                    t("Unsure what happens next", "不知道下一步會怎樣"),
                    t(
                      "Show the follow-up pathway before the decision.",
                      "在決定之前展示後續安排。",
                    ),
                  ],
                ].map(([title, desc]) => (
                  <div className="insight" key={title}>
                    <span className="insight-dot" />
                    <div>
                      <strong>{title}</strong>
                      <p>{desc}</p>
                    </div>
                  </div>
                ))}
              </article>
            </div>
            <div className="privacy-principle">
              <ShieldCheck size={24} />
              <div>
                <h3>
                  {t(
                    "Improve services without profiling people.",
                    "改善服務，毋須為人貼標籤。",
                  )}
                </h3>
                <p>
                  {t(
                    "The demo has no participant database. A future pilot would require separate evaluation consent, minimal data, appropriate aggregation and community review. No retailer access to health conversations.",
                    "本演示不設參與者資料庫。未來試點須另外取得評估同意、減少資料、適當匯總並邀請社區審閱。零售商不可存取健康對話。",
                  )}
                </p>
              </div>
            </div>
          </section>
        )}
        {page === "evidence" && (
          <section className="shell evidence">
            <div className="eyebrow">
              {t("BUILT TO BE UNDERSTOOD", "設計透明，才值得信任")}
            </div>
            <h1 className="page-title">
              {t("A working prototype.", "可操作的原型。")}
              <br />
              <em>{t("Clear about its boundaries.", "清楚交代每項功能。")}</em>
            </h1>
            <p className="intro-text">
              {t(
                "H+ explores a simple question: can an everyday community invitation help someone take an informed first step towards HIV testing?",
                "H+ 探索一個簡單問題：日常社區邀請，能否幫助一個人知情地踏出 HIV 檢測的第一步？",
              )}
            </p>
            <div className="evidence-grid">
              <article className="panel">
                <span className="icon-tile">
                  <Code2 />
                </span>
                <h3>{t("What works today", "現在可以體驗")}</h3>
                <ul>
                  {[
                    t(
                      "English / Traditional Chinese, larger text and optional read-aloud.",
                      "中英文切換、放大字體及自選朗讀。",
                    ),
                    t(
                      "Opt-in Workers AI topic matching with source-based answers.",
                      "自選 Workers AI 主題辨識及附來源答案。",
                    ),
                    t(
                      "Built-in guidance without sending a question to the server.",
                      "無需傳送問題至伺服器的內置指引。",
                    ),
                    t(
                      "Service selection, editable summary and consent-gated demo plan.",
                      "服務選擇、可編輯摘要及確認流程。",
                    ),
                    t(
                      "Printable QR invitation and illustrative pilot dashboard.",
                      "可列印 QR 邀請及示範試點看板。",
                    ),
                  ].map((x) => (
                    <li key={x}>
                      <Check size={15} />
                      {x}
                    </li>
                  ))}
                </ul>
              </article>
              <article className="panel">
                <span className="icon-tile sand">
                  <Info />
                </span>
                <h3>{t("What remains a proposal", "仍屬計劃的部分")}</h3>
                <ul>
                  {[
                    t(
                      "WhatsApp Business, pharmacy POS and logistics integrations.",
                      "WhatsApp Business、藥房 POS 及物流串接。",
                    ),
                    t(
                      "Actual clinic bookings, test-kit distribution and referrals.",
                      "實際診所預約、試劑分發及轉介。",
                    ),
                    t(
                      "Clinical and community review before real-world use.",
                      "真實使用前的臨床及社區審閱。",
                    ),
                    t(
                      "Partner agreements, evaluation approval and verified outcomes.",
                      "合作協議、評估審批及真實成果。",
                    ),
                    t(
                      "No diagnosis, individual risk scoring or claimed clinical validation.",
                      "不診斷、不評分個人風險，未聲稱已完成臨床驗證。",
                    ),
                  ].map((x) => (
                    <li key={x}>
                      <span className="list-dot" />
                      {x}
                    </li>
                  ))}
                </ul>
              </article>
            </div>
            <div className="architecture">
              <span>Community invitation</span>
              <ArrowRight />
              <span>Private choices</span>
              <ArrowRight />
              <span>Rules + bounded AI</span>
              <ArrowRight />
              <span>Informed next step</span>
            </div>
            <div className="section-head">
              <div>
                <div className="eyebrow">
                  {t("INFORMATION YOU CAN TRACE", "可以追溯的資訊")}
                </div>
                <h2>{t("Sources, not guesswork.", "有來源，才有依據。")}</h2>
              </div>
              <p>
                {t(
                  "Source-linked content prepared for this prototype. Last checked 10 November 2026. Clinical review is still required before a real pilot.",
                  "原型內容附官方來源，於 2026 年 11 月 10 日核對。真實試點前仍需臨床審閱。",
                )}
              </p>
            </div>
            <div className="sources">
              {sources.map((s, i) => (
                <a key={s.id} href={s.url} target="_blank" rel="noreferrer">
                  <span>0{i + 1}</span>
                  <strong>{s.title}</strong>
                  <ArrowUpRight size={20} />
                </a>
              ))}
            </div>
            <div className="evidence-bottom">
              <button
                className="button secondary"
                onClick={() => setModal("receipt")}
              >
                <Printer size={18} />
                {t("View printable invitation", "查看可列印邀請")}
              </button>
              <a
                className="button primary"
                href={repo}
                target="_blank"
                rel="noreferrer"
              >
                {t("Explore the open-source project", "查看開源項目")}
                <ArrowUpRight size={18} />
              </a>
            </div>
          </section>
        )}
        {!["home", "journey", "impact", "evidence"].includes(page) && (
          <section className="shell closing">
            <h1>Page not found</h1>
            <button className="button primary" onClick={() => go("home")}>
              Return home
            </button>
          </section>
        )}
      </main>
      <footer className="shell">
        <div>
          <Brand />
          <p>{t("Everyday care. In your hands.", "日常關懷，選擇在你。")}</p>
        </div>
        <div className="footer-links">
          <button onClick={() => setModal("privacy")}>
            {t("Privacy & choices", "私隱與選擇")}
          </button>
          <a href={repo} target="_blank" rel="noreferrer">
            GitHub
            <ArrowUpRight size={13} />
          </a>
          <button onClick={() => go("evidence")}>
            {t("Sources & scope", "資料與範圍")}
          </button>
        </div>
        <span className="footer-note">
          HIV HACKATHON 2026
          <br />
          {t("Independent educational prototype", "獨立教育用途原型")}
        </span>
      </footer>
      {modal && (
        <div className="modal-backdrop" onClick={() => setModal(null)}>
          <section
            className={`modal ${modal === "receipt" ? "receipt-modal" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close icon-button"
              onClick={() => setModal(null)}
              aria-label="Close dialog"
            >
              <X />
            </button>
            {modal === "privacy" ? (
              <>
                <ShieldCheck size={32} />
                <h2 id="modal-title">
                  {t("Privacy, in plain language.", "簡單講清楚，資料點處理。")}
                </h2>
                <p>
                  {t(
                    "No account, tracking analytics, database or browser storage is used by this application. Choices and messages exist only in the current tab’s memory. Refreshing or “Clear & leave” removes them from the interface.",
                    "本程式不設帳戶、分析追蹤、資料庫或瀏覽器儲存。選擇與對話只在當前分頁記憶體中。重新整理或「清除並離開」會從介面移除。",
                  )}
                </p>
                <p>
                  {t(
                    "AI is off by default. If enabled, each question is sent to Cloudflare Workers and Workers AI for topic classification. The app does not log message bodies; infrastructure providers still process technical metadata under their own policies. Use fictional information only.",
                    "AI 預設關閉。啟用後，每條問題會傳送至 Cloudflare Workers 及 Workers AI 作分類。本程式不記錄對話內容；基礎設施服務商仍按其政策處理技術中繼資料。請只使用虛構資料。",
                  )}
                </p>
                <p>
                  {t(
                    "Referrals are simulated. No clinic receives your plan. Downloads, printouts, browser history and device speech services have their own privacy implications and are not erased by clearing this session. Read-aloud may use your device’s speech provider.",
                    "轉介均為模擬，診所不會收到計劃。下載、列印、瀏覽記錄及裝置語音服務各有私隱考量，清除此對話不會刪除它們。朗讀可能使用裝置的語音服務。",
                  )}
                </p>
                <button
                  className="button primary full"
                  onClick={() => setModal(null)}
                >
                  {t("Understood", "明白")}
                </button>
              </>
            ) : (
              <>
                <div className="receipt-paper">
                  <Brand />
                  <div className="receipt-rule" />
                  <p className="receipt-kicker">
                    COMMUNITY HEALTH INVITATION
                    <br />
                    街坊健康邀請
                  </p>
                  <h2 id="modal-title">
                    {t(
                      "A little care,\nclose to home.",
                      "一點關懷，\n就在身邊。",
                    )}
                  </h2>
                  <p>
                    {t(
                      "Explore health information and optional HIV testing services. Privately, at your own pace.",
                      "私密了解健康資訊及自選 HIV 檢測服務，按你的步伐決定。",
                    )}
                  </p>
                  {qr && (
                    <img
                      className="qr"
                      src={qr}
                      alt="QR code to the H+ demo journey"
                    />
                  )}
                  <p className="receipt-url">{location.host}/#journey</p>
                  <div className="receipt-rule" />
                  <small>
                    {t(
                      "Same invitation for every adult customer.\nNo purchase history. No obligation.",
                      "每位成年顧客收到相同邀請。\n不記錄購物資料，不必參加。",
                    )}
                  </small>
                  <p className="micro">
                    DEMONSTRATION · NOT A SERVICE VOUCHER
                    <br />
                    演示用途・並非服務兌換券
                  </p>
                </div>
                <button
                  className="button primary full no-print"
                  onClick={() => window.print()}
                >
                  <Printer size={17} />
                  {t("Print invitation", "列印邀請")}
                </button>
              </>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
export default App;
