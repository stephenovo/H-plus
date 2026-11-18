# Testing-points map integration — 18 November 2026

This completes the map follow-up to the selective Rebecca merge. The source is the map design in `798b9e6` (`H-plus-improved/`); the duplicate application is not copied into main. The previous review's map deferral is superseded by this implementation.

## Result

Preserve the two-column map and service cards, green pins, community service cards, outreach section, volunteer links and clearly labelled pilot scenarios. Add desktop navigation, a fourth mobile-dock entry and a direct UU location-answer link. Keep main's mobile journey, safety routing and accessible clear-session behavior.

Leaflet and its CSS load in a separate chunk. The map and all tile requests start only after Load map. Hiding the map or leaving the page destroys the instance. Language changes rebuild the markers and popups in the selected language, with cleanup and ResizeObserver invalidation. Provider text is inserted with textContent rather than interpolated HTML. Map tiles have an error message and the independent address list remains available.

CSP now permits images from exactly `https://tile.openstreetmap.org`. Other directives remain unchanged. Tiles set an origin-only cross-origin referrer as required by [OSM tile policy](https://operations.osmfoundation.org/policies/tiles/); the rest of the site retains no-referrer. Use native browser caching, visible attribution and no prefetch/offline/geolocation features. Map disclosure and privacy documentation describe request metadata without claiming zero third-party processing.

## Reviewed data

Four approximate building markers:

| Service | Provider evidence | OSM building coordinate evidence |
| --- | --- | --- |
| ACTS | [Service and hours](https://www.aids.gov.hk/english/hotline/acts.html); [address](https://www.aids.gov.hk/english/itc/main.html) | [way 694500941](https://www.openstreetmap.org/way/694500941) |
| HKAF Mong Kok | [Testing locations and appointment arrangements](https://aids.org.hk/?page_id=7700); [centre announcement](https://www.aids.org.hk/?p=14569) | [way 316843081](https://www.openstreetmap.org/way/316843081) |
| HKAF Shau Kei Wan | [Testing locations and appointment arrangements](https://aids.org.hk/?page_id=7700) | [way 1547692508](https://www.openstreetmap.org/way/1547692508) |
| AIDS Concern | [Testing page and July 2026 relocation notice](https://aidsconcern.org.hk/en/testing-service/) | [way 316843212](https://www.openstreetmap.org/way/316843212) |

The Mong Kok HKAF and AIDS Concern coordinates in the uploaded copy did not match these buildings. Replace them with 22.3204673, 114.1682816 and 22.3198650, 114.1694915 respectively. Coordinates are building approximations, not clinic entrances or live availability. OSM data is attributed to OpenStreetMap contributors under ODbL.

- HKAF's current provider page uses a testing calendar and appointments. Replace the uploaded fixed office-hour claims with instructions to confirm testing times.
- [AFRO's health site](https://www.afrohealth.org.hk/en) confirms its audience and contact 2770 1002. Remove the uploaded Wan Chai address and old contact from the map; list AFRO with an appointment enquiry link.
- The [DH community directory](https://www.hivtest.gov.hk/en/hiv_testing/other_community_services.html) supports listing AFRO, Gay Harmony, SideBySide, SARDA, Teen's Key and SWAN by district. No invented pins, detailed schedules or unverified appointment locations are assigned.
- Keep two source-supported outreach enquiries (AFRO and AIDS Concern), with no event coordinates or claims of scheduled sessions. Remove speculative pop-up events.
- Do not include the Kowloon Bay treatment/referral centre among public testing pins.
- These are independent service providers, not claimed H+ partners. Cards include provider links and the verification date; visitors confirm eligibility and appointment details directly.

## Validation

- `npm run check`: 22 tests pass, including location-routing negative cases, urgent/reactive precedence, and data integrity; TypeScript and Vite build pass.
- Browser checked against Wrangler's production assets and security headers: no tile images before opt-in; all nine initial visible tile images loaded; four accessible marker buttons; English and Traditional Chinese popup text; phone and source links.
- At 390 px with enlarged text: no horizontal overflow; four-button mobile dock and map/list remain usable.
- UU location chip opens the map page; re-entering the map requires Load map again.
- Original privacy, mobile, and service-option flows remain available.
