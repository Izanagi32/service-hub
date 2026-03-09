const DEFAULT_SITE_URL = "https://servicehub.kyiv.ua";

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
};
