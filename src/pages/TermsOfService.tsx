import { Calendar, CheckCircle2, Mail, Phone, ShieldCheck } from "lucide-react";
import { SEO } from "../components/SEO";
import { ADDRESS_FULL, BUSINESS_INFO } from "../siteContent";

const TERMS_UPDATED_AT = "9 листопада 2026 року";

const termsSections: Array<{ title: string; body: string }> = [
  {
    title: "1. Загальні положення",
    body: `Ці умови регулюють надання послуг автосервісом ${BUSINESS_INFO.brand} за адресою ${ADDRESS_FULL}. Користуючись сайтом і залишаючи заявку, ви погоджуєтеся з цими умовами.`,
  },
  {
    title: "2. Запис і підтвердження",
    body: "Заявка через сайт або телефон не є остаточним підтвердженням візиту. Ми зв'язуємося з вами, уточнюємо обсяг робіт і погоджуємо дату та час. Візит вважається підтвердженим після нашої відповіді.",
  },
  {
    title: "3. Ціни та оплата",
    body: "Ціни на сайті — орієнтовні та вказані як «від». Фінальна вартість залежить від розміру авто, стану поверхні й обраного обсягу робіт. Кошторис погоджуємо до початку робіт. Оплата — готівкою, карткою або безготівково після виконання.",
  },
  {
    title: "4. Терміни виконання",
    body: "Орієнтовний час виконання вказаний для кожної послуги. Він може змінюватися через стан авто або погоджений додатковий обсяг робіт — у такому разі ми повідомляємо заздалегідь.",
  },
  {
    title: "5. Перенесення та скасування",
    body: "Про перенесення або скасування візиту просимо повідомляти заздалегідь телефоном. Це дозволяє нам не тримати бокс заброньованим і прийняти інше авто.",
  },
  {
    title: "6. Гарантія",
    body: "На виконані роботи надається гарантія. Її строк і умови залежать від послуги та фіксуються в замовленні. Гарантія не поширюється на пошкодження, спричинені механічними впливами, самостійним втручанням або недотриманням рекомендацій по догляду.",
  },
  {
    title: "7. Відповідальність сторін",
    body: "Ми відповідаємо за якість виконаних робіт у межах погодженого обсягу. Ви відповідаєте за достовірність наданої інформації про авто та за своєчасне повідомлення про приховані дефекти.",
  },
  {
    title: "8. Форс-мажор",
    body: "Сторони звільняються від відповідальності за невиконання зобов'язань у разі обставин непереборної сили: воєнних дій, відключень електроенергії, рішень органів влади тощо.",
  },
  {
    title: "9. Зміни умов",
    body: "Ми можемо оновлювати ці умови. Актуальна редакція завжди доступна на цій сторінці із зазначенням дати оновлення.",
  },
];

export const TermsOfService = () => {
  return (
    <div className="bg-[#050505] pb-16 pt-24 sm:pt-28 md:pt-32">
      <SEO
        title="Умови надання послуг автосервісу"
        description="Умови надання послуг HubService: запис і підтвердження візиту, ціни та оплата, терміни, гарантія й відповідальність сторін."
        keywords="умови сервісу, правила обслуговування, гарантія, HubService"
        breadcrumb={[{ name: "Головна", path: "/" }, { name: "Умови сервісу", path: "/terms" }]}
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
          <aside className="h-fit border border-white/12 bg-white/[0.03] p-5 sm:p-7 lg:sticky lg:top-28">
            <span className="mb-5 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#d5b57a]">
              <ShieldCheck className="h-4 w-4" />
              Правила сервісу
            </span>
            <h1 className="mb-5 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
              Умови сервісу
            </h1>

            <p className="mb-5 inline-flex items-center gap-2 border border-[#d5b57a]/35 bg-[#d5b57a]/10 px-4 py-2.5 text-sm text-[#f0d9a8]">
              <Calendar className="h-4 w-4" />
              Оновлено: {TERMS_UPDATED_AT}
            </p>

            <p className="mb-7 text-sm leading-relaxed text-[#aab3c2]">
              Прозорі правила: як підтверджуємо запис, узгоджуємо ціну, виконуємо роботи й
              відповідаємо за результат.
            </p>

            <div className="space-y-3 text-sm">
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="flex items-center gap-3 border border-white/12 px-4 py-3 text-[#e5e9f0] transition-colors hover:border-[#d5b57a]/50"
              >
                <Mail className="h-4 w-4 text-[#d5b57a]" />
                <span className="break-all">{BUSINESS_INFO.email}</span>
              </a>
              <a
                href={`tel:${BUSINESS_INFO.phoneE164}`}
                className="flex items-center gap-3 border border-white/12 px-4 py-3 text-[#e5e9f0] transition-colors hover:border-[#d5b57a]/50"
              >
                <Phone className="h-4 w-4 text-[#d5b57a]" />
                {BUSINESS_INFO.phoneDisplay}
              </a>
            </div>
          </aside>

          <div className="space-y-3">
            {termsSections.map((section) => (
              <article key={section.title} className="border border-white/12 bg-white/[0.03] p-5 sm:p-6">
                <h2 className="mb-3 font-display text-lg font-semibold text-white sm:text-xl">
                  {section.title}
                </h2>
                <p className="text-[15px] leading-relaxed text-[#c3cad6]">{section.body}</p>
              </article>
            ))}

            <article className="border border-[#d5b57a]/35 bg-[#d5b57a]/8 p-5 sm:p-6">
              <h2 className="mb-3 font-display text-lg font-semibold text-white sm:text-xl">
                10. Контакти
              </h2>
              <div className="space-y-2 text-[15px] leading-relaxed text-[#e7dfcd]">
                <p>{BUSINESS_INFO.legalName}</p>
                <p>{ADDRESS_FULL}</p>
                <p>Email: {BUSINESS_INFO.email}</p>
                <p>Телефон: {BUSINESS_INFO.phoneDisplay}</p>
                <p className="inline-flex items-center gap-2 pt-1 text-[#f0d9a8]">
                  <CheckCircle2 className="h-4 w-4" />
                  Готові відповісти на питання перед записом
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};
