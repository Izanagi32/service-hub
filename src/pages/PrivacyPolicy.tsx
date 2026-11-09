import { Calendar, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { SEO } from "../components/SEO";
import { ADDRESS_FULL, BUSINESS_INFO } from "../siteContent";

const POLICY_UPDATED_AT = "9 листопада 2026 року";

const policySections: Array<{ title: string; body: string }> = [
  {
    title: "1. Хто обробляє ваші дані",
    body: `Володільцем персональних даних є автосервіс ${BUSINESS_INFO.brand} за адресою ${ADDRESS_FULL}. З питань обробки даних пишіть на ${BUSINESS_INFO.email} або телефонуйте ${BUSINESS_INFO.phoneDisplay}.`,
  },
  {
    title: "2. Які дані ми збираємо",
    body: "Через форми на сайті ми отримуємо ім'я, номер телефону, електронну пошту, обрану послугу, бажану дату й час візиту та текст вашого повідомлення. Технічно браузер також передає адресу сторінки та дані про пристрій — це потрібно, щоб зрозуміти контекст звернення.",
  },
  {
    title: "3. Мета та правові підстави",
    body: "Дані використовуємо, щоб відповісти на звернення, підтвердити запис, узгодити обсяг і вартість робіт та виконати замовлення. Підстава — ваша згода під час надсилання форми, а також необхідність виконати договір про надання послуг.",
  },
  {
    title: "4. Файли cookie та аналітика",
    body: "Аналітика вмикається лише після вашої згоди в банері на сайті: до цього Google Analytics 4 не завантажується. Після згоди він збирає знеособлену статистику відвідувань (переглянуті сторінки, тип пристрою, приблизне місцезнаходження) з увімкненим анонімізуванням IP. Згоду можна відкликати, очистивши дані сайту в браузері. Рекламних cookie сайт не встановлює.",
  },
  {
    title: "5. Передача даних третім особам",
    body: "Ми не продаємо персональні дані. Заявка може передаватися сервісу-обробнику (наприклад, формі-релею або месенджеру), який використовується для доставки повідомлень, і сервісу веб-аналітики — виключно в межах зазначених цілей. Передача також можлива на вимогу закону.",
  },
  {
    title: "6. Строк зберігання",
    body: "Дані заявок зберігаємо не довше 24 місяців з моменту останнього звернення, якщо інше не потрібно для виконання замовлення або захисту прав. Після цього видаляємо або знеособлюємо їх.",
  },
  {
    title: "7. Ваші права",
    body: "Ви можете запросити доступ до своїх даних, виправлення, видалення чи обмеження обробки, а також відкликати згоду. Напишіть на вказану пошту — відповімо протягом 30 днів. Якщо вважаєте, що права порушено, можете звернутися до Уповноваженого Верховної Ради України з прав людини.",
  },
  {
    title: "8. Безпека",
    body: "Доступ до заявок мають лише працівники, які працюють із записами. Передача даних із сайту відбувається захищеним з'єднанням HTTPS. Ми не зберігаємо дані банківських карток — оплата відбувається на місці або через платіжний термінал.",
  },
  {
    title: "9. Зміни політики",
    body: "Якщо зміниться перелік даних або способи обробки, оновимо цю сторінку та дату редакції. Актуальна версія завжди доступна за адресою /privacy.",
  },
];

export const PrivacyPolicy = () => {
  return (
    <div className="bg-[#050505] pb-16 pt-24 sm:pt-28 md:pt-32">
      <SEO
        title="Політика конфіденційності та cookie"
        description="Які дані збирає HubService, з якою метою, як довго зберігає та як захищає. Права користувача й контакти для запитів."
        keywords="політика конфіденційності, персональні дані, HubService"
        breadcrumb={[{ name: "Головна", path: "/" }, { name: "Політика конфіденційності", path: "/privacy" }]}
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
          <aside className="h-fit border border-white/12 bg-white/[0.03] p-5 sm:p-7 lg:sticky lg:top-28">
            <span className="mb-5 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#d5b57a]">
              <ShieldCheck className="h-4 w-4" />
              Дані та приватність
            </span>
            <h1 className="mb-5 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
              Політика конфіденційності
            </h1>

            <p className="mb-5 inline-flex items-center gap-2 border border-[#d5b57a]/35 bg-[#d5b57a]/10 px-4 py-2.5 text-sm text-[#f0d9a8]">
              <Calendar className="h-4 w-4" />
              Оновлено: {POLICY_UPDATED_AT}
            </p>

            <p className="mb-7 text-sm leading-relaxed text-[#aab3c2]">
              Коротко: ми беремо лише ті дані, які потрібні, щоб відповісти на ваш запит і
              виконати роботу. Не продаємо їх і не використовуємо для спаму.
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
              <p className="flex items-start gap-3 border border-white/12 px-4 py-3 text-[#c3cad6]">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#d5b57a]" />
                <span>{ADDRESS_FULL}</span>
              </p>
            </div>
          </aside>

          <div className="space-y-3">
            {policySections.map((section) => (
              <article key={section.title} className="border border-white/12 bg-white/[0.03] p-5 sm:p-6">
                <h2 className="mb-3 font-display text-lg font-semibold text-white sm:text-xl">
                  {section.title}
                </h2>
                <p className="text-[15px] leading-relaxed text-[#c3cad6]">{section.body}</p>
              </article>
            ))}

            <article className="border border-[#d5b57a]/35 bg-[#d5b57a]/8 p-5 sm:p-6">
              <h2 className="mb-3 font-display text-lg font-semibold text-white sm:text-xl">
                10. Контакти для запитів
              </h2>
              <p className="text-[15px] leading-relaxed text-[#e7dfcd]">
                {BUSINESS_INFO.legalName}, {ADDRESS_FULL}. Email: {BUSINESS_INFO.email}. Телефон:{" "}
                {BUSINESS_INFO.phoneDisplay}.
              </p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};
