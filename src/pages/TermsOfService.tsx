import { Calendar, CheckCircle2, Mail, Phone, ShieldCheck } from "lucide-react";
import { SEO } from "../components/SEO";
import { BUSINESS_INFO } from "../siteContent";

const TERMS_UPDATED_AT = "6 березня 2026 року";

const termsSections: Array<{ title: string; body: string }> = [
  {
    title: "1. Запис на послуги",
    body: "Запис здійснюється через сайт або телефоном. Підтвердження часу візиту відбувається після зв'язку з менеджером.",
  },
  {
    title: "2. Вартість та оплата",
    body: "Орієнтовна вартість вказана на сайті. Фінальна ціна залежить від стану автомобіля та погоджується перед початком робіт.",
  },
  {
    title: "3. Перенесення або скасування",
    body: "Просимо повідомляти про перенесення візиту заздалегідь. Це допомагає нам оптимально планувати завантаження майстрів.",
  },
  {
    title: "4. Гарантія",
    body: "Гарантія надається на послуги відповідно до технології виконання та рекомендацій з подальшого догляду.",
  },
  {
    title: "5. Відповідальність сторін",
    body: "Ми несемо відповідальність за якість наданих робіт у межах погодженого обсягу послуг.",
  },
];

export const TermsOfService = () => {
  return (
    <div className="pt-24 sm:pt-28 md:pt-32 pb-14 sm:pb-16 md:pb-20 bg-[#050505] overflow-hidden">
      <SEO
        title="Умови сервісу"
        description="Умови надання послуг ServiceHub: запис, оплата, перенесення візиту, гарантійні умови та відповідальність сторін."
        keywords="умови сервісу, правила обслуговування, servicehub"
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[420px] bg-[radial-gradient(circle,rgba(213,181,122,0.16),rgba(0,0,0,0))] blur-[130px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-6 sm:gap-8 lg:gap-10">
          <aside className="lg:sticky lg:top-28 h-fit border border-white/10 bg-white/[0.02] p-5 sm:p-7 md:p-8 rounded-xl">
            <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] font-bold text-[#d5b57a] mb-5">
              <ShieldCheck className="w-4 h-4" />
              Service Terms
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white leading-[1.02] mb-5 sm:mb-6">Умови сервісу</h1>

            <div className="border border-[#d5b57a]/35 bg-[#d5b57a]/12 px-4 py-3 text-[12px] sm:text-sm text-[#f3dfb5] mb-6 inline-flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Останнє оновлення: {TERMS_UPDATED_AT}
            </div>

            <p className="text-gray-300 text-[13px] sm:text-sm leading-relaxed mb-7 sm:mb-8">
              Ці умови визначають правила надання послуг, порядок запису, оплати та гарантійні зобов'язання сторін.
            </p>

            <div className="space-y-3 text-[13px] sm:text-sm">
              <a href={`mailto:${BUSINESS_INFO.email}`} className="tap-feedback touch-manipulation flex items-center gap-3 border border-white/10 px-4 py-3 text-gray-200 hover:border-[#d5b57a]/45 transition-colors">
                <Mail className="w-4 h-4 text-[#d5b57a]" />
                {BUSINESS_INFO.email}
              </a>
              <a href={`tel:${BUSINESS_INFO.phoneE164}`} className="tap-feedback touch-manipulation flex items-center gap-3 border border-white/10 px-4 py-3 text-gray-200 hover:border-[#d5b57a]/45 transition-colors">
                <Phone className="w-4 h-4 text-[#d5b57a]" />
                {BUSINESS_INFO.phoneDisplay}
              </a>
            </div>
          </aside>

          <div className="space-y-4">
            {termsSections.map((section, index) => (
              <article key={index} className="border border-white/10 bg-white/[0.02] p-5 sm:p-6 md:p-7 hover:border-[#d5b57a]/45 hover:bg-[#d5b57a]/8 transition-all">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold font-display text-white mb-3">{section.title}</h2>
                <p className="text-gray-300 leading-relaxed">{section.body}</p>
              </article>
            ))}

            <article className="border border-[#d5b57a]/35 bg-[#d5b57a]/12 p-5 sm:p-6 md:p-7">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold font-display text-white mb-4">6. Контакти</h2>
              <div className="space-y-3 text-gray-100 leading-relaxed">
                <p>{BUSINESS_INFO.legalName}</p>
                <p>Email: {BUSINESS_INFO.email}</p>
                <p>Телефон: {BUSINESS_INFO.phoneDisplay}</p>
                <div className="inline-flex items-center gap-2 mt-1 text-[#f3dfb5]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-sm">Готові відповісти на питання перед записом</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};
