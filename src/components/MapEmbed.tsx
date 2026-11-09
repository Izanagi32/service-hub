import { useState } from "react";
import { ExternalLink, MapPin } from "lucide-react";
import { ADDRESS_FULL, BUSINESS_INFO } from "../siteContent";

/**
 * Google Maps is loaded only after an explicit click: it keeps the page fast,
 * avoids third-party cookies before consent and prevents a blank white iframe
 * when ad blockers block Google.
 */
export const MapEmbed = () => {
  const [requested, setRequested] = useState(false);

  return (
    <div className="overflow-hidden border border-white/12 bg-[#0b1020]">
      <div className="relative h-[280px] w-full sm:h-[320px]">
        {requested ? (
          <iframe
            title="HubService на карті Google"
            src={BUSINESS_INFO.mapsEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full [filter:invert(0.92)_hue-rotate(180deg)_contrast(0.92)]"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[radial-gradient(circle_at_50%_35%,rgba(47,102,245,0.16),transparent_65%)] px-6 text-center">
            <span className="flex h-12 w-12 items-center justify-center border border-[#d5b57a]/40 text-[#d5b57a]">
              <MapPin className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="text-sm leading-relaxed text-[#c3cad6]">{ADDRESS_FULL}</p>
            <button
              type="button"
              onClick={() => setRequested(true)}
              className="inline-flex min-h-11 items-center justify-center gap-2 border border-white/25 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:border-[#d5b57a] hover:text-[#d5b57a]"
            >
              Показати карту
            </button>
            <p className="text-[11px] leading-relaxed text-[#8b93a3]">
              Карта Google завантажить сторонні cookie після натискання.
            </p>
          </div>
        )}
      </div>

      <a
        href={BUSINESS_INFO.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="tap-link flex items-center justify-center gap-2 border-t border-white/10 bg-white/[0.03] px-4 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#c3cad6] transition-colors hover:text-white"
      >
        <ExternalLink size={14} />
        Прокласти маршрут у Google Maps
      </a>
    </div>
  );
};
