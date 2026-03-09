import { SEO } from "../components/SEO";
import { BUSINESS_INFO } from "../siteContent";

export const TermsOfService = () => {
  return (
    <div className="pt-32 pb-20">
      <SEO
        title="Умови сервісу"
        description="Умови надання послуг ServiceHub: запис, оплата, перенесення візиту, гарантійні умови та відповідальність сторін."
        keywords="умови сервісу, правила обслуговування, servicehub"
      />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl font-bold font-display text-white mb-6">Умови сервісу</h1>
        <p className="text-gray-400 mb-10">Останнє оновлення: 6 березня 2026 року.</p>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Запис на послуги</h2>
            <p>Запис здійснюється через сайт або телефоном. Підтвердження часу візиту відбувається після зв'язку з менеджером.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Вартість та оплата</h2>
            <p>Орієнтовна вартість вказана на сайті. Фінальна ціна залежить від стану автомобіля та погоджується перед початком робіт.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Перенесення або скасування</h2>
            <p>Просимо повідомляти про перенесення візиту заздалегідь. Це допомагає нам оптимально планувати завантаження майстрів.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Гарантія</h2>
            <p>Гарантія надається на послуги відповідно до технології виконання та рекомендацій з подальшого догляду.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Відповідальність сторін</h2>
            <p>Ми несемо відповідальність за якість наданих робіт у межах погодженого обсягу послуг.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. Контакти</h2>
            <p>{BUSINESS_INFO.legalName}</p>
            <p>Email: {BUSINESS_INFO.email}</p>
            <p>Телефон: {BUSINESS_INFO.phoneDisplay}</p>
          </section>
        </div>
      </section>
    </div>
  );
};