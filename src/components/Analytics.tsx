import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { env } from "../env";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const SCRIPT_ID = "ga4-gtag-script";

export const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    const measurementId = env.gaMeasurementId;
    if (!measurementId) {
      return;
    }

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

    window.gtag("js", new Date());
    window.gtag("config", measurementId, {
      send_page_view: false,
      anonymize_ip: true,
    });
  }, []);

  useEffect(() => {
    if (!env.gaMeasurementId || !window.gtag) {
      return;
    }

    window.gtag("event", "page_view", {
      page_title: document.title,
      page_path: `${location.pathname}${location.search}`,
      page_location: window.location.href,
    });
  }, [location.pathname, location.search]);

  return null;
};
