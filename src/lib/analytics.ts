type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Sends a GA4 event when analytics is configured. Safe no-op otherwise.
 * Cookieless by default: no identifiers are attached.
 */
export const trackEvent = (name: string, params: EventParams = {}): void => {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", name, {
    ...params,
    page_path: `${window.location.pathname}${window.location.search}`,
  });
};
