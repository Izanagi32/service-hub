import { Calendar, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { SEO } from "../components/SEO";
import { BUSINESS_INFO } from "../siteContent";

const POLICY_UPDATED_AT = "6 березня 2026 року";

const policySections: Array<{ title: string; body: string }> = [
  {
    title: "1. Які дані ми збираємо",
    body: "Через форми на сайті ми можемо отримувати ім'я, номер телефону, email та текст вашого запиту.",
  },
  {
    title: "2. Мета обробки",
    body: "Ми використовуємо дані для зв'язку з вами, запису на послуги, уточнення деталей заявки та покращення сервісу.",
  },
  {
    title: "3. Зберігання та захист",
    body: "Ми вживаємо технічних та організаційних заходів для захисту персональних даних від несанкціонованого доступу.",
  },
  {
    title: "4. Передача третім особам",
    body: "Ми не продаємо персональні дані. Передача можлива лише у випадках, передбачених законодавством України.",
  },
  {
    title: "5. Ваші права",
    body: "Ви можете звернутися щодо уточнення, оновлення або видалення ваших даних за контактами нижче.",
  },
];

export const PrivacyPolicy = () => {
  return (
    <div className="pt-24 sm:pt-28 md:pt-32 pb-14 sm:pb-16 md:pb-20 bg-[#050505] overflow-hidden">
      <SEO
        title="Політика конфіденційності"
        description="Політика конфіденційності HubService: які дані ми збираємо, як використовуємо та як захищаємо персональну інформацію."
        keywords="політика конфіденційності, hubservice, персональні дані"
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[880px] h-[420px] bg-[radial-gradient(circle,rgba(37,99,235,0.14),rgba(0,0,0,0))] blur-[120px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-6 sm:gap-8 lg:gap-10">
          <aside className="lg:sticky lg:top-28 h-fit border border-white/10 bg-white/[0.02] p-5 sm:p-7 md:p-8 rounded-xl">
            <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] font-bold text-blue-300 mb-5">
              <ShieldCheck className="w-4 h-4" />
              Privacy Notice
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white leading-[1.02] mb-5 sm:mb-6">Політика конфіденційності</h1>

            <div className="border border-blue-500/30 bg-blue-500/10 px-4 py-3 text-[12px] sm:text-sm text-blue-100 mb-6 inline-flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Останнє оновлення: {POLICY_UPDATED_AT}
            </div>

            <p className="text-gray-300 text-[13px] sm:text-sm leading-relaxed mb-7 sm:mb-8">
              Ми цінуємо вашу довіру та прозоро описуємо, які дані обробляємо, з якою метою і як забезпечуємо їх захист.
            </p>

            <div className="space-y-3 text-[13px] sm:text-sm">
              <a href={`mailto:${BUSINESS_INFO.email}`} className="tap-feedback touch-manipulation flex items-center gap-3 border border-white/10 px-4 py-3 text-gray-200 hover:border-blue-400 transition-colors">
                <Mail className="w-4 h-4 text-blue-300" />
                {BUSINESS_INFO.email}
              </a>
              <a href={`tel:${BUSINESS_INFO.phoneE164}`} className="tap-feedback touch-manipulation flex items-center gap-3 border border-white/10 px-4 py-3 text-gray-200 hover:border-blue-400 transition-colors">
                <Phone className="w-4 h-4 text-blue-300" />
                {BUSINESS_INFO.phoneDisplay}
              </a>
              <div className="flex items-start gap-3 border border-white/10 px-4 py-3 text-gray-200">
                <MapPin className="w-4 h-4 mt-0.5 text-blue-300" />
                <span>{BUSINESS_INFO.addressLine}, {BUSINESS_INFO.city}</span>
              </div>
            </div>
          </aside>

          <div className="space-y-4">
            {policySections.map((section, index) => (
              <article key={index} className="border border-white/10 bg-white/[0.02] p-5 sm:p-6 md:p-7 hover:border-blue-500/40 hover:bg-blue-950/10 transition-all">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold font-display text-white mb-3">{section.title}</h2>
                <p className="text-gray-300 leading-relaxed">{section.body}</p>
              </article>
            ))}

            <article className="border border-blue-500/35 bg-blue-950/10 p-5 sm:p-6 md:p-7">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold font-display text-white mb-4">6. Контакти</h2>
              <div className="space-y-2 text-gray-200 leading-relaxed">
                <p>{BUSINESS_INFO.legalName}</p>
                <p>{BUSINESS_INFO.addressLine}, {BUSINESS_INFO.city}</p>
                <p>Email: {BUSINESS_INFO.email}</p>
                <p>Телефон: {BUSINESS_INFO.phoneDisplay}</p>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

