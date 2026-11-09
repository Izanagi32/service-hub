import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Phone } from "lucide-react";
import { SEO } from "../components/SEO";
import { BUSINESS_INFO } from "../siteContent";

export const NotFound = () => {
  return (
    <div className="flex min-h-[80svh] items-center bg-[#050505] pb-16 pt-28 sm:pt-32">
      <SEO
        title="Сторінку не знайдено"
        description="Такої сторінки немає. Перейдіть до послуг, контактів або на головну HubService."
        noindex
      />

      <div className="mx-auto w-full max-w-3xl px-4 text-center sm:px-6">
        <p className="mb-3 font-display text-[5rem] font-semibold leading-none text-[#d5b57a]/85 sm:text-[7rem]">
          404
        </p>
        <h1 className="mb-4 font-display text-3xl font-semibold text-white sm:text-4xl">
          Такої сторінки немає
        </h1>
        <p className="mx-auto mb-8 max-w-md text-base leading-relaxed text-[#aab3c2]">
          Можливо, посилання застаріло. Перейдіть до послуг або зв'яжіться з нами — підкажемо, що
          потрібно.
        </p>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 bg-[#2f66f5] px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#4a7bff] sm:w-auto"
          >
            <ArrowLeft size={15} />
            На головну
          </Link>
          <Link
            to="/services"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 border border-white/25 px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:border-[#d5b57a] sm:w-auto"
          >
            Послуги та ціни
            <ArrowRight size={15} />
          </Link>
        </div>

        <a
          href={`tel:${BUSINESS_INFO.phoneE164}`}
          className="mt-6 inline-flex items-center gap-2 text-sm text-[#c3cad6] transition-colors hover:text-white"
        >
          <Phone size={15} className="text-[#d5b57a]" />
          {BUSINESS_INFO.phoneDisplay}
        </a>
      </div>
    </div>
  );
};
