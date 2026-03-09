import { SEO } from "../components/SEO";
import { BUSINESS_INFO } from "../siteContent";

export const PrivacyPolicy = () => {
  return (
    <div className="pt-32 pb-20">
      <SEO
        title="Політика конфіденційності"
        description="Політика конфіденційності ServiceHub: які дані ми збираємо, як використовуємо та як захищаємо персональну інформацію."
        keywords="політика конфіденційності, servicehub, персональні дані"
      />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl font-bold font-display text-white mb-6">Політика конфіденційності</h1>
        <p className="text-gray-400 mb-10">Останнє оновлення: 6 березня 2026 року.</p>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Які дані ми збираємо</h2>
            <p>Через форми на сайті ми можемо отримувати ім'я, номер телефону, email та текст вашого запиту.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Мета обробки</h2>
            <p>Ми використовуємо дані для зв'язку з вами, запису на послуги, уточнення деталей заявки та покращення сервісу.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Зберігання та захист</h2>
            <p>Ми вживаємо технічних та організаційних заходів для захисту персональних даних від несанкціонованого доступу.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Передача третім особам</h2>
            <p>Ми не продаємо персональні дані. Передача можлива лише у випадках, передбачених законодавством України.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Ваші права</h2>
            <p>Ви можете звернутися щодо уточнення, оновлення або видалення ваших даних за контактами нижче.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. Контакти</h2>
            <p>{BUSINESS_INFO.legalName}</p>
            <p>{BUSINESS_INFO.addressLine}, {BUSINESS_INFO.city}</p>
            <p>Email: {BUSINESS_INFO.email}</p>
            <p>Телефон: {BUSINESS_INFO.phoneDisplay}</p>
          </section>
        </div>
      </section>
    </div>
  );
};