import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { env } from "../env";
import { trackEvent } from "../lib/analytics";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __dshAnalyticsReady?: boolean;
  }
}

const SCRIPT_ID = "ga4-gtag-script";
const CONSENT_KEY = "hubservice-analytics-consent";

type Consent = "granted" | "denied" | null;

const readConsent = (): Consent => {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
};

const saveConsent = (value: Exclude<Consent, null>) => {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* private mode — consent is valid for this session only */
  }
};

export const Analytics = () => {
  const location = useLocation();
  const [consent, setConsent] = useState<Consent>(() => readConsent());

  const measurementId = env.gaMeasurementId;

  useEffect(() => {
    if (!measurementId || consent !== "granted") return;

    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.appendChild(script);
    }

    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      ((...args: unknown[]) => {
        window.dataLayer?.push(args);
      });

    if (!window.__dshAnalyticsReady) {
      window.gtag("js", new Date());
      window.gtag("config", measurementId, {
        send_page_view: false,
        anonymize_ip: true,
      });
      window.__dshAnalyticsReady = true;
    }
  }, [measurementId, consent]);

  useEffect(() => {
    if (!measurementId || consent !== "granted" || !window.gtag) return;
    trackEvent("page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: `${location.pathname}${location.search}`,
    });
  }, [location.pathname, location.search, measurementId, consent]);

  // Contact intent tracking: calls, WhatsApp and map clicks.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link) return;

      const href = link.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) trackEvent("call_click", { phone: href.replace("tel:", "") });
      else if (href.includes("wa.me")) trackEvent("whatsapp_click");
      else if (href.includes("maps")) trackEvent("maps_click");
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  if (!measurementId || consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-label="Згода на веб-аналітику"
      className="fixed inset-x-3 bottom-[calc(5.5rem+var(--safe-bottom))] z-[80] rounded-xl border border-white/20 bg-[#0a1020]/98 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur sm:left-auto sm:right-4 sm:bottom-4 sm:max-w-sm"
    >
      <p className="mb-3 text-sm leading-relaxed text-[#d7dbe3]">
        Ми хочемо вмикати Google Analytics, щоб розуміти, які послуги цікавлять відвідувачів.
        Знеособлена статистика, без реклами.
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => {
            saveConsent("granted");
            setConsent("granted");
          }}
          className="min-h-11 flex-1 rounded-lg bg-[#2f66f5] px-4 text-[11px] font-bold uppercase tracking-[0.14em] text-white"
        >
          Дозволити
        </button>
        <button
          type="button"
          onClick={() => {
            saveConsent("denied");
            setConsent("denied");
          }}
          className="min-h-11 flex-1 rounded-lg border border-white/25 px-4 text-[11px] font-bold uppercase tracking-[0.14em] text-white"
        >
          Лише необхідні
        </button>
      </div>
    </div>
  );
};
