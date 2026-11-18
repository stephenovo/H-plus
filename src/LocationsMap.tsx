import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { locations } from "./locations.mjs";

type Lang = "en" | "zh";
export default function LocationsMap({ lang }: { lang: Lang }) {
  const [enabled, setEnabled] = useState(false);
  const [failed, setFailed] = useState(false);
  const target = useRef<HTMLDivElement>(null);
  const t = (en: string, zh: string) => lang === "en" ? en : zh;
  useEffect(() => {
    if (!enabled || !target.current) return;
    setFailed(false);
    const map = L.map(target.current, { scrollWheelZoom: false, zoomControl: false });
    L.control.zoom({ zoomInTitle: lang === "en" ? "Zoom in" : "放大地圖", zoomOutTitle: lang === "en" ? "Zoom out" : "縮小地圖" }).addTo(map);
    const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      // Explicit origin-only referrer satisfies OSM tile policy without exposing a path or chat.
      referrerPolicy: "strict-origin-when-cross-origin",
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap contributors</a>',
    });
    tiles.on("tileerror", () => setFailed(true));
    tiles.addTo(map);
    const icon = L.divIcon({ className: "hplus-marker", html: '<span class="hplus-marker-dot"></span>', iconSize: [26, 26], iconAnchor: [13, 26] });
    for (const loc of locations) {
      // Use textContent rather than interpolated popup HTML for provider data.
      const popup = document.createElement("div"); popup.className = "map-popup";
      const add = (tag: string, text: string, className = "") => {
        const element = document.createElement(tag); element.textContent = text; element.className = className; popup.append(element);
      };
      add("span", lang === "en" ? "Testing · appointment required" : "檢測・須預約", "map-tag map-tag-test");
      add("strong", loc.name[lang]); add("small", loc.org[lang]);
      add("p", loc.address[lang]); add("p", loc.hours[lang], "map-hours"); add("p", loc.note[lang], "map-note");
      const call = document.createElement("a"); call.href = `tel:+852${loc.phone.replace(/\s/g, "")}`; call.textContent = `${lang === "en" ? "Call" : "致電"} · ${loc.phone}`; popup.append(call, document.createElement("br"));
      const link = document.createElement("a"); link.href = loc.url; link.target = "_blank"; link.rel = "noreferrer"; link.textContent = lang === "en" ? "Official source ↗" : "官方來源 ↗"; popup.append(link);
      L.marker([loc.lat, loc.lng], { icon, title: loc.name[lang], alt: loc.name[lang], keyboard: true }).addTo(map).bindPopup(popup);
    }
    map.fitBounds(L.latLngBounds(locations.map(loc => [loc.lat, loc.lng] as [number, number])), { padding: [35, 35], maxZoom: 13 });
    const resize = new ResizeObserver(() => map.invalidateSize()); resize.observe(target.current);
    return () => { resize.disconnect(); tiles.off(); map.remove(); };
  }, [enabled, lang]);
  return <div>
    {enabled ? <>
      <div ref={target} className="locations-map" role="region" aria-label={t("Map of testing services", "檢測服務地圖")} />
      {failed && <p className="map-error" role="status">{t("Some map tiles could not load. Service addresses and official links remain available in the list.", "部分底圖未能載入。你仍可查看列表內的服務地址及官方連結。")}</p>}
      <div className="map-controls"><button className="text-button" onClick={() => setEnabled(false)}>{t("Hide map", "隱藏地圖")}</button><a href="https://www.openstreetmap.org/fixthemap" target="_blank" rel="noreferrer">{t("Report a map issue", "回報地圖問題")}</a></div>
    </> : <div className="map-placeholder">
      <h2>{t("See testing points on the map", "在地圖上查看檢測點")}</h2>
      <p>{t("Load the interactive map from OpenStreetMap. It receives your IP address, browser information, this site's origin and the area you view. Your conversation is not shared, and we do not request your location.", "互動底圖由 OpenStreetMap 提供，載入後會向其傳送 IP 位址、瀏覽器資料、本網站來源及你查看的範圍。不會分享對話，也不會要求你的裝置位置。")}</p>
      <button className="button primary" onClick={() => setEnabled(true)}>{t("Load map", "載入地圖")}</button>
      <a href="https://osmfoundation.org/wiki/Privacy_Policy" target="_blank" rel="noreferrer">{t("OpenStreetMap privacy policy", "OpenStreetMap 私隱政策")}</a>
    </div>}
  </div>;
}
