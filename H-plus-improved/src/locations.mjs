// Official Hong Kong HIV testing / service locations.
// Sources: Department of Health (hivtest.gov.hk / aids.gov.hk) and Hong Kong AIDS Foundation.
// Coordinates geocoded from the official addresses via OpenStreetMap Nominatim.
// These are real, publicly listed services — not synthetic data.

export const locations = [
  {
    id: "acts",
    name: { en: "AIDS Counselling & Testing Service (ACTS)", zh: "愛滋病輔導及測試服務（ACTS）" },
    org: { en: "Department of Health", zh: "衞生署" },
    type: "govt",
    address: {
      en: "7/F, Yau Ma Tei Jockey Club Polyclinic, 145 Battery Street, Yau Ma Tei, Kowloon",
      zh: "九龍油麻地炮台街145號油麻地賽馬會分科診療所7樓",
    },
    lat: 22.3096235,
    lng: 114.1692743,
    hours: {
      en: "Mon–Fri 8:30–17:15 · Closed weekends & public holidays",
      zh: "星期一至五 8:30–17:15 · 星期六、日及公眾假期休息",
    },
    free: true,
    anonymous: true,
    phone: "2780 2211",
    note: {
      en: "Free, anonymous and confidential. By appointment only.",
      zh: "免費、不記名及保密，須提前預約。",
    },
    url: "https://www.aids.gov.hk/english/hotline/acts.html",
  },
  {
    id: "hkaf-mk",
    name: { en: "Hong Kong AIDS Foundation — Mong Kok Service Centre", zh: "香港愛滋病基金會 — 旺角服務中心" },
    org: { en: "Hong Kong AIDS Foundation (NGO)", zh: "香港愛滋病基金會（非政府機構）" },
    type: "ngo",
    address: {
      en: "Bright Way Tower, 33 Mong Kok Road, Mong Kok, Kowloon",
      zh: "九龍旺角道33號凱途商業大廈",
    },
    lat: 22.3212215,
    lng: 114.1712947,
    hours: {
      en: "Mon–Fri 9:00–12:30 & 14:00–18:00 · Closed public holidays",
      zh: "星期一至五 9:00–12:30 及 14:00–18:00 · 公眾假期休息",
    },
    free: true,
    anonymous: true,
    phone: "2513 0513",
    note: {
      en: "Free, anonymous and confidential rapid & conventional testing.",
      zh: "免費、不記名及保密的快速及傳統檢測。",
    },
    url: "https://www.aids.org.hk/?p=14569",
  },
  {
    id: "hkaf-skw",
    name: { en: "Hong Kong AIDS Foundation — Shau Kei Wan", zh: "香港愛滋病基金會 — 筲箕灣" },
    org: { en: "Hong Kong AIDS Foundation (NGO)", zh: "香港愛滋病基金會（非政府機構）" },
    type: "ngo",
    address: {
      en: "5/F, Shau Kei Wan Jockey Club Clinic, 8 Chai Wan Road, Shau Kei Wan, Hong Kong Island",
      zh: "香港筲箕灣柴灣道8號筲箕灣賽馬會診所5樓",
    },
    lat: 22.2764036,
    lng: 114.2283519,
    hours: {
      en: "Mon–Fri 9:00–12:30 & 14:00–18:00 · Closed public holidays",
      zh: "星期一至五 9:00–12:30 及 14:00–18:00 · 公眾假期休息",
    },
    free: true,
    anonymous: true,
    phone: "2513 0513",
    note: {
      en: "Free, anonymous and confidential testing by appointment.",
      zh: "免費、不記名及保密的檢測，敬請預約。",
    },
    url: "https://www.aids.org.hk/?p=7705",
  },
  {
    id: "kln-bay",
    name: { en: "Kowloon Bay Integrated Treatment Centre", zh: "九龍灣綜合治療中心" },
    org: { en: "Department of Health", zh: "衞生署" },
    type: "treatment",
    address: {
      en: "8/F, Kowloon Bay Health Centre, 9 Kai Yan Street, Kowloon Bay, Kowloon",
      zh: "九龍九龍灣啟仁街9號九龍灣健康中心8樓",
    },
    lat: 22.328633,
    lng: 114.207045,
    hours: {
      en: "Mon–Fri 8:30–13:00 & 14:00–17:15 · Closed weekends & public holidays",
      zh: "星期一至五 8:30–13:00 及 14:00–17:15 · 星期六、日及公眾假期休息",
    },
    free: false,
    anonymous: false,
    phone: "2116 2888",
    note: {
      en: "Integrated HIV medical care. Referral and prior appointment required.",
      zh: "一站式愛滋病醫療服務，須轉介及提前預約。",
    },
    url: "https://www.aids.gov.hk/english/hotline/acts.html",
  },
  {
    id: "aids-concern",
    name: { en: "AIDS Concern — Health Service Centre", zh: "關懷愛滋 — 健康服務中心" },
    org: { en: "AIDS Concern (NGO)", zh: "關懷愛滋（非政府機構）" },
    type: "ngo",
    address: {
      en: "Flat B, 18/F, Hua Chiao Commercial Centre, 678 Nathan Road, Mong Kok (Exit D1 Mong Kok MTR)",
      zh: "九龍旺角彌敦道678號華僑商業中心18樓B室（旺角港鐵站D1出口）",
    },
    lat: 22.3235386,
    lng: 114.1685692,
    hours: {
      en: "Mon–Fri 9:30–22:00 (lunch & dinner breaks) · Sat alternate weeks · Sun by appointment",
      zh: "星期一至五 9:30–22:00（含午/晚膳休息）· 週六隔週開放 · 週日僅接受預約",
    },
    free: true,
    anonymous: true,
    phone: "2394 6677",
    note: {
      en: "Free rapid HIV & syphilis testing with pre/post counselling. Confirmatory testing available.",
      zh: "免費 HIV 及梅毒快速檢測，附檢測前後輔導；亦提供確認檢測。",
    },
    url: "https://aidsconcern.org.hk/test-service-intro",
  },
  {
    id: "afro",
    name: { en: "Action for REACH OUT (青鳥)", zh: "青鳥（Action for REACH OUT）" },
    org: { en: "Action for REACH OUT (NGO)", zh: "青鳥（非政府機構）" },
    type: "ngo",
    address: {
      en: "11/F, Southorn Centre, 130 Hennessy Road, Wan Chai, Hong Kong Island",
      zh: "香港灣仔軒尼詩道130號修頓中心11樓",
    },
    lat: 22.2771321,
    lng: 114.1727947,
    hours: {
      en: "By appointment · call to confirm",
      zh: "敬請預約 · 請致電確認",
    },
    free: true,
    anonymous: true,
    phone: "2770 1065",
    note: {
      en: "First sex-workers' support group; offers outreach, centre, hotline and HIV testing for women.",
      zh: "首個性工作者支援組織，提供外展、中心、熱線及女性 HIV 檢測。",
    },
    url: "https://www.afro.org.hk/",
  },
];

// Appointment-only / outreach-based NGOs (no fixed public testing address).
// Their locations are by appointment; not plotted as map pins.
export const appointmentNgos = [
  {
    id: "gay-harmony",
    name: { en: "Gay Harmony (大同)", zh: "大同（Gay Harmony）" },
    area: { en: "Tsuen Wan · Wan Chai · Yau Tsim Mong", zh: "荃灣 · 灣仔 · 油尖旺" },
    phone: "WhatsApp 9877 8308",
    note: {
      en: "LGBT+ community STD/HIV rapid testing. By appointment.",
      zh: "性小眾社群性病/HIV 快速檢測，敬請預約。",
    },
    url: "https://gayhar.org/",
  },
  {
    id: "sidebyside",
    name: { en: "SideBySide (善導會)", zh: "善導會（SideBySide）" },
    area: { en: "Yau Tsim Mong", zh: "油尖旺" },
    phone: "—",
    note: {
      en: "Priority-population testing & counselling programme partner.",
      zh: "優先關顧人群測試及輔導計劃合作機構。",
    },
    url: "https://sidebyside.org.hk/",
  },
  {
    id: "sarda",
    name: { en: "SARDA (香港戒毒會)", zh: "香港戒毒會（SARDA）" },
    area: { en: "Kowloon City · Sham Shui Po · Wan Chai", zh: "九龍城 · 深水埗 · 灣仔" },
    phone: "—",
    note: {
      en: "Testing and counselling for people who use drugs.",
      zh: "為吸毒人士提供檢測及輔導。",
    },
    url: "https://www.sarda.org.hk/",
  },
  {
    id: "teens-key",
    name: { en: "Teen's Key — Young Women Development Network (青躍)", zh: "青躍 — 青少女發展網絡" },
    area: { en: "Yau Tsim Mong", zh: "油尖旺" },
    phone: "—",
    note: {
      en: "Support and testing for young women.",
      zh: "為青少女提供支援及檢測。",
    },
    url: "https://teenskey.org/",
  },
  {
    id: "swan",
    name: { en: "SWAN Academy (Zerotopia)", zh: "SWAN Academy (Zerotopia)" },
    area: { en: "Wan Chai", zh: "灣仔" },
    phone: "—",
    note: {
      en: "Priority-population testing & counselling programme partner.",
      zh: "優先關顧人群測試及輔導計劃合作機構。",
    },
    url: "https://www.zerotopia.org/",
  },
];

// Outreach / street-based activities — for people who want to GET TESTED
// (not volunteers). Real formats run by real organisations. Times and venues
// change frequently — always confirm with the organiser on the day.
//
// lat/lng + anchor = the organisation's base office / service point (the place
// that runs the outreach), NOT a fixed event venue. Outreach teams move, so the
// pin marks the base to contact, not where a session happens right now.
export const outreach = [
  {
    id: "afro-outreach",
    name: { en: "AFRO street outreach", zh: "青鳥街站外展" },
    org: { en: "Action for REACH OUT", zh: "青鳥" },
    format: { en: "Street outreach + testing referral", zh: "街站外展 + 檢測轉介" },
    who: { en: "Women in the sex industry", zh: "性工作女性" },
    area: { en: "Various districts", zh: "各區" },
    detail: {
      en: "On-site outreach with health info, condoms and testing referral. Call or WhatsApp to find out where the team will be this week.",
      zh: "現場外展，提供健康資訊、安全套及檢測轉介。致電或 WhatsApp 查詢本週外展位置。",
    },
    phone: "2770 1065",
    url: "https://www.afro.org.hk/",
    lat: 22.2771321,
    lng: 114.1727947,
    anchor: {
      en: "11/F, Southorn Centre, 130 Hennessy Road, Wan Chai (base office)",
      zh: "灣仔軒尼詩道130號修頓中心11樓（機構辦事處）",
    },
  },
  {
    id: "aids-concern-outreach",
    name: { en: "AIDS Concern outreach testing", zh: "關懷愛滋外展檢測" },
    org: { en: "AIDS Concern", zh: "關懷愛滋" },
    format: { en: "Outreach rapid testing", zh: "外展快速檢測" },
    who: { en: "MSM & the wider community", zh: "男男性接觸者及公眾" },
    area: { en: "Announced per event", zh: "按活動公布" },
    detail: {
      en: "Rapid testing offered at community and venue-based outreach sessions. Check their testing calendar or call to confirm the next date.",
      zh: "於社區及場所外展時段提供快速檢測。查閱檢測時間表或致電確認下次日期。",
    },
    phone: "2394 6677",
    url: "https://aidsconcern.org.hk/test-service-intro",
    lat: 22.3235386,
    lng: 114.1685692,
    anchor: {
      en: "Flat B, 18/F, Hua Chiao Commercial Centre, 678 Nathan Road, Mong Kok (base office)",
      zh: "旺角彌敦道678號華僑商業中心18樓B室（機構辦事處）",
    },
  },
  {
    id: "gay-harmony-popup",
    name: { en: "Gay Harmony pop-up testing", zh: "大同快閃檢測" },
    org: { en: "Gay Harmony", zh: "大同" },
    format: { en: "Pop-up rapid testing", zh: "快閃快速檢測" },
    who: { en: "LGBT+ community", zh: "性小眾社群" },
    area: { en: "Tsuen Wan · Wan Chai · Yau Tsim Mong", zh: "荃灣 · 灣仔 · 油尖旺" },
    detail: {
      en: "Pop-up STD/HIV rapid testing at community spots. WhatsApp to book a slot and get the exact location.",
      zh: "於社區地點提供快閃性病/HIV 快速檢測。WhatsApp 預約並索取確實地點。",
    },
    phone: "WhatsApp 9877 8308",
    url: "https://gayhar.org/",
    lat: 22.3165,
    lng: 114.1692,
    anchor: {
      en: "By appointment only — exact pop-up venue shared after booking (Yau Tsim Mong area)",
      zh: "只限預約 — 快閃地點於預約後提供（油尖旺一帶）",
    },
  },
  {
    id: "sarda-outreach",
    name: { en: "SARDA outreach testing", zh: "香港戒毒會外展檢測" },
    org: { en: "SARDA", zh: "香港戒毒會" },
    format: { en: "Outreach for people who use drugs", zh: "面向吸毒人士的外展" },
    who: { en: "People who use drugs", zh: "吸毒人士" },
    area: { en: "Kowloon City · Sham Shui Po · Wan Chai", zh: "九龍城 · 深水埗 · 灣仔" },
    detail: {
      en: "Outreach testing and counselling for people who use drugs. Contact SARDA for outreach schedules.",
      zh: "為吸毒人士提供外展檢測及輔導。聯絡香港戒毒會查詢外展時間。",
    },
    phone: "2527 7723",
    url: "https://www.sarda.org.hk/",
    lat: 22.2780209,
    lng: 114.16962,
    anchor: {
      en: "3/F, Duke of Windsor Social Service Building, 15 Hennessy Road, Wan Chai (head office)",
      zh: "灣仔軒尼詩道15號溫莎公爵社會服務大廈3樓（總辦事處）",
    },
  },
  {
    id: "teens-key-outreach",
    name: { en: "Teen's Key outreach", zh: "青躍外展" },
    org: { en: "Teen's Key", zh: "青躍" },
    format: { en: "Outreach for young women", zh: "面向青少女的外展" },
    who: { en: "Young women", zh: "青少女" },
    area: { en: "Yau Tsim Mong", zh: "油尖旺" },
    detail: {
      en: "Outreach support and testing for young women. Contact Teen's Key to confirm outreach arrangements.",
      zh: "為青少女提供外展支援及檢測。聯絡青躍確認外展安排。",
    },
    phone: "2302 0068",
    url: "https://teenskey.org/",
    lat: 22.3227014,
    lng: 114.1687439,
    anchor: {
      en: "2/F, Kwong On Bank Building, 728 Nathan Road, Mong Kok (service hub)",
      zh: "旺角彌敦道728號廣安銀行大廈2樓（服務中心）",
    },
  },
  {
    id: "community-popup",
    name: { en: "Community pop-up rapid testing", zh: "社區快閃快速檢測" },
    org: { en: "Partner NGOs (衞生署 listed)", zh: "合作非政府機構（衞生署名錄）" },
    format: { en: "Pop-up rapid testing", zh: "快閃快速檢測" },
    who: { en: "General public", zh: "公眾" },
    area: { en: "Announced per event", zh: "按活動公布" },
    detail: {
      en: "Pop-up rapid-testing sessions held at community venues. Times and locations are announced per event — confirm with the organiser.",
      zh: "於社區場地舉辦的快閃快速檢測，時間地點按活動公布，請向主辦機構確認。",
    },
    phone: "—",
    url: "https://www.hivtest.gov.hk/en/hiv_testing/other_community_services.html",
    lat: null,
    lng: null,
    anchor: null,
  },
];

// Volunteer opportunities — for people who want to help, not be tested.
export const volunteering = [
  {
    id: "hkaf-volunteer",
    name: { en: "Hong Kong AIDS Foundation — volunteer programme", zh: "香港愛滋病基金會 — 義工計劃" },
    detail: {
      en: "Recruiting volunteers for education, events and community work. Training provided.",
      zh: "招募義工參與教育、活動及社區工作，提供培訓。",
    },
    url: "https://www.aids.org.hk/",
  },
  {
    id: "aids-concern-volunteer",
    name: { en: "AIDS Concern — get involved", zh: "關懷愛滋 — 參與義工" },
    detail: {
      en: "Volunteer and support opportunities in testing, education and advocacy.",
      zh: "提供檢測、教育及倡議方面的義工與支援機會。",
    },
    url: "https://aidsconcern.org.hk/",
  },
  {
    id: "afro-volunteer",
    name: { en: "Action for REACH OUT — volunteers", zh: "青鳥 — 義工招募" },
    detail: {
      en: "Volunteers support outreach, peer education and community work.",
      zh: "義工支援外展、同伴教育及社區工作。",
    },
    url: "https://www.afro.org.hk/",
  },
];

// Pilot demonstration scenarios — clearly illustrative, for the pilot studio only.
// These are NOT real services; they show what a partner-led pilot could look like.
export const pilotDemos = [
  {
    id: "pilot-pharmacy",
    name: { en: "Partner pharmacy corner (illustrative)", zh: "合作藥房角落（示意）" },
    type: { en: "Pilot scenario", zh: "試點情境" },
    detail: {
      en: "A consented pharmacy hosts the H+ invitation and QR in a discreet corner, staffed at set hours.",
      zh: "合作藥房在隱密角落擺放 H+ 邀請及 QR，指定時段有職員當值。",
    },
  },
  {
    id: "pilot-outreach",
    name: { en: "Community outreach day (illustrative)", zh: "社區外展日（示意）" },
    type: { en: "Pilot scenario", zh: "試點情境" },
    detail: {
      en: "A partner NGO runs a consented outreach day with rapid testing and counselling.",
      zh: "合作機構舉辦外展日，提供快速檢測及輔導。",
    },
  },
];

// District centroid for the initial map view (Hong Kong).
export const mapCenter = { lat: 22.32, lng: 114.17, zoom: 12 };
