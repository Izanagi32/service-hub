export const PRIVACY_VERSION = "2026-11-09";

export const BUSINESS_INFO = {
  brand: "HubService",
  legalName: "HubService",
  tagline: "Преміальний догляд за авто",
  siteUrl: "https://servicehubmaster.com",
  phoneDisplay: "+38 (067) 105 05 55",
  phoneE164: "+380671050555",
  /** Digits only — used for wa.me links */
  whatsappNumber: "380671050555",
  email: "info@servicehubmaster.com",
  addressLine: "вул. Козацька, 98",
  city: "Горохів",
  region: "Волинська область",
  country: "Україна",
  postalCode: "45700",
  workingHoursShort: "Пн–Сб: 09:00–20:00",
  workingHoursFull: "Пн–Сб: 09:00–20:00, Нд — за попереднім записом",
  mapsUrl: "https://maps.app.goo.gl/Jpm5GDXnnsxSL3ih9",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=%D0%B2%D1%83%D0%BB.+%D0%9A%D0%BE%D0%B7%D0%B0%D1%86%D1%8C%D0%BA%D0%B0,+98,+%D0%93%D0%BE%D1%80%D0%BE%D1%85%D1%96%D0%B2,+%D0%92%D0%BE%D0%BB%D0%B8%D0%BD%D1%81%D1%8C%D0%BA%D0%B0+%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C&output=embed",
} as const;

export const ADDRESS_FULL = `${BUSINESS_INFO.addressLine}, ${BUSINESS_INFO.city}, ${BUSINESS_INFO.region}, ${BUSINESS_INFO.postalCode}`;

export const whatsappLink = (message: string): string =>
  `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
