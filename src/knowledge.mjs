export const sources = [
  {
    id: "chp",
    title: "Hong Kong CHP · HIV testing & U=U",
    url: "https://www.info.gov.hk/gia/general/202608/25/P2026082500601p.htm",
  },
  {
    id: "guidance",
    title: "Hong Kong HIV testing recommendations",
    url: "https://www.chp.gov.hk/files/pdf/recommendations_on_hiv_testing_in_hk_nov_2024.pdf",
  },
  {
    id: "kits",
    title: "Department of Health · Self-testing",
    url: "https://www.hivtest.gov.hk/en/hiv_testing/ordering_system.html",
  },
  {
    id: "pep",
    title: "CDC · Post-exposure prophylaxis",
    url: "https://www.cdc.gov/hivnexus/hcp/pep/index.html",
  },
  {
    id: "transmission",
    title: "NIH · Understanding HIV transmission",
    url: "https://hivinfo.nih.gov/understanding-hiv/fact-sheets/understanding-hiv-transmission",
  },
];
export const knowledge = {
  testing: {
    en: "You can explore HIV testing even if you feel well or have never tested before. Hong Kong’s Department of Health encourages people who have had sex to test at least once. You can choose a self-test or a provider-based test. You do not need to answer personal questions to view these options.",
    zh: "即使沒有不適，或從未檢測，也可以了解 HIV 檢測。香港衞生署鼓勵曾有性接觸的人至少接受一次檢測。你可選擇自我檢測或到服務點檢測；不回答私人問題，也可以查看選項。",
    source: "chp",
  },
  privacy: {
    en: "You choose what to share. This prototype keeps your choices in this tab’s memory, with no account or saved conversation. If you enable AI, each question is sent to our Cloudflare Worker and Workers AI to identify its topic. Hosting providers process technical metadata. No referral or result is sent to a clinic. Your browser history and device are outside this app’s control.",
    zh: "分享多少，由你決定。本原型只在這個分頁的記憶體保留選擇，不設帳戶，也不儲存對話。啟用 AI 後，每條問題會傳送到 Cloudflare Worker 及 Workers AI 作主題辨識；服務商會處理技術中繼資料。不會向診所發送轉介或結果。瀏覽記錄和裝置的私隱設定不受本程式控制。",
    source: null,
  },
  uu: {
    en: "U=U means Undetectable = Untransmittable. People living with HIV who take treatment and achieve and maintain an undetectable viral load do not transmit HIV through sex. This is established through viral-load testing and clinical follow-up—not a self-test or medication check-in. U=U does not mean HIV is cured or prevent other STIs. Everyone deserves respectful care, regardless of viral load.",
    zh: "U=U 是「測不到＝傳不到」。HIV 感染者接受治療，並持續保持病毒載量無法檢測，就不會透過性接觸傳播 HIV。這需要病毒載量檢測及醫療跟進確認，不能靠自測或服藥打卡判斷。U=U 不代表治癒，也不預防其他性傳播感染。無論病毒載量如何，每個人都值得被尊重。",
    source: "chp",
  },
  kit: {
    en: "A self-test lets you collect a sample and read the result yourself. Follow the kit instructions and reading time. The DH ordering service lists a HK$130 payment hold, cancelled after its required result/photo upload and questionnaire within 14 days; check current terms directly. A reactive result needs confirmatory testing. Recent exposure may not be detected during the window period.",
    zh: "自測讓你自行採樣及讀取結果，請按試劑說明及指定時間操作。衞生署訂購服務列有港幣 130 元預授權；須按要求在 14 天內提交結果、照片及問卷才取消收費，請直接核對最新條款。有反應結果需要確認檢測；空窗期內可能未能檢出近期感染。",
    source: "kits",
  },
  clinic: {
    en: "Provider-based testing includes support from trained staff. The DH offers free, anonymous and confidential HIV antibody testing. Check the official service for appointments and eligibility. This prototype does not book visits, guarantee same-day testing or represent a partner agreement with a clinic.",
    zh: "到服務點檢測，可獲受訓工作人員支援。衞生署提供免費、不記名及保密的 HIV 抗體檢測。請到官方服務確認預約及安排。本原型不會預約、不保證即日檢測，也不代表已與診所建立合作。",
    source: "chp",
  },
  urgent: {
    en: "If there may have been a recent HIV exposure, seek professional assessment now. PEP needs to start as soon as possible and within 72 hours after a possible exposure. Do not wait for a self-test kit. If more than 72 hours have passed or the timing is uncertain, still contact a healthcare professional promptly for testing and prevention advice. This chat cannot determine whether PEP is appropriate for you.",
    zh: "如可能近期接觸 HIV，請立即尋求專業評估。暴露後預防用藥（PEP）須盡早，並於可能暴露後 72 小時內開始，切勿等待自測盒。即使已超過 72 小時或不確定時間，仍應盡快向醫護詢問檢測及預防安排。本對話不能判斷你是否適合 PEP。",
    source: "pep",
  },
  reactive: {
    en: "A reactive self-test is not a confirmed HIV diagnosis. Contact a testing service or healthcare professional promptly for confirmatory testing and support. Do not upload a result or photo here. Effective treatment is available. This prototype can show a referral preview, but cannot contact a provider or guarantee an appointment.",
    zh: "自測有反應不等於已確診 HIV。請盡快聯絡檢測服務或醫護，安排確認檢測及支援。不要在這裡上傳結果或照片。HIV 有有效治療。本原型可以展示轉介預覽，但不能聯絡機構或保證預約。",
    source: "guidance",
  },
  contact: {
    en: "No. HIV is not transmitted by sharing a meal, hugging, shaking hands or other everyday contact. This does not depend on whether the person has an undetectable viral load. U=U is a separate concept about sexual transmission when HIV is durably suppressed through treatment.",
    zh: "不會。HIV 不會透過一起吃飯、擁抱、握手等日常接觸傳播；這與對方是否達到病毒載量無法檢測無關。U=U 是另一個概念，指接受治療並持續抑制病毒後，不會透過性接觸傳播 HIV。",
    source: "transmission",
  },
  unknown: {
    en: "I can help explain testing choices, privacy, U=U and how to find professional support. I cannot assess symptoms, interpret a personal test or recommend medication. Try one of the topics below, or use the official testing service for individual advice.",
    zh: "我可以解釋檢測選擇、私隱、U=U，以及如何尋找專業支援。我不能評估症狀、判讀個人檢測或建議用藥。你可選擇下面的主題，或向官方檢測服務尋求個人建議。",
    source: "guidance",
  },
};
export function localTopic(input) {
  const t = input.toLowerCase();
  if (
    /hug|hugg|sharing (?:a )?meal|share (?:a )?meal|sharing food|eat(?:ing)? together|shake hands|handshake|casual contact|擁抱|拥抱|抱抱|吃飯|吃饭|共餐|聚餐|一起吃|同桌|握手|日常接觸|日常接触/.test(
      t,
    )
  )
    return "contact";
  if (
    /\bpep\b|expos|72|yesterday|last night|unprotected|condom.*broke|needle|昨[天晚日]|暴露|接觸.*hiv|無套|破[裂了]|針刺/.test(
      t,
    )
  )
    return "urgent";
  if (/reactive|positive|陽性|阳性|有反應|有反应/.test(t)) return "reactive";
  if (/u\s*=\s*u|undetect|viral load|測不到|测不到|病毒載量/.test(t))
    return "uu";
  if (
    /priva|share|data|roommate|family|confiden|record|私隱|隐私|分享|家人|室友|保密|記錄|记录/.test(
      t,
    )
  )
    return "privacy";
  if (/kit|cost|free|price|130|自測|自测|費用|费用|免費|免费/.test(t))
    return "kit";
  if (/clinic|appoint|provider|診所|诊所|預約|预约|服務點/.test(t))
    return "clinic";
  if (/test|檢測|检测|篩查|筛查/.test(t)) return "testing";
  return "unknown";
}
export function answer(topic, lang = "en", mode = "guide") {
  const valid = Object.hasOwn(knowledge, topic) ? topic : "unknown";
  return {
    topic: valid,
    text: knowledge[valid][lang === "zh" ? "zh" : "en"],
    source: sources.find((s) => s.id === knowledge[valid].source) || null,
    mode,
  };
}
export function canConfirm(consent, choice) {
  return consent === true && ["self", "clinic"].includes(choice);
}
