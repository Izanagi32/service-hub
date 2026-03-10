const DEFAULT_SITE_URL = "https://servicehubmaster.com";

const toUrl = (value: string, key: string): string => {
  try {
    return new URL(value).toString().replace(/\/$/, "");
  } catch {
    throw new Error(`Invalid env variable ${key}: expected an absolute URL, got '${value}'`);
  }
};

const getOptionalString = (value: string | undefined): string | undefined => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
};

const siteUrlRaw = getOptionalString(import.meta.env.VITE_SITE_URL);

export const env = {
  siteUrl: siteUrlRaw ? toUrl(siteUrlRaw, "VITE_SITE_URL") : DEFAULT_SITE_URL,
  geminiApiKey: getOptionalString(import.meta.env.VITE_GEMINI_API_KEY),
  gaMeasurementId: getOptionalString(import.meta.env.VITE_GA_MEASUREMENT_ID),
  bookingWebhookUrl: getOptionalString(import.meta.env.VITE_BOOKING_WEBHOOK_URL),
  contactWebhookUrl: getOptionalString(import.meta.env.VITE_CONTACT_WEBHOOK_URL),
};

export const absoluteSiteUrl = (path = "/"): string => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalizedPath, `${env.siteUrl}/`).toString();
};
