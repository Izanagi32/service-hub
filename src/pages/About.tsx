import { motion } from "motion/react";
import { ArrowRight, BadgeCheck, Clock, Gauge, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "../components/SEO";
import { buildSrcSet } from "../lib/images";
import { BUSINESS_INFO } from "../siteContent";

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

const facts = [
  { icon: <MapPin className="h-4 w-4" />, value: BUSINESS_INFO.city, label: "Де ми працюємо" },
  { icon: <Clock className="h-4 w-4" />, value: "09–20", label: "Пн–Сб графік" },
  { icon: <Gauge className="h-4 w-4" />, value: "3D", label: "Розвал-сходження" },
  { icon: <BadgeCheck className="h-4 w-4" />, value: "6", label: "Послуг у прайсі" },
];

const standards = [
  {
    step: "01",
    title: "Аудит стану",
    text: "Фіксуємо початковий стан авто, ризики та цілі по результату.",
    icon: <Gauge className="h-5 w-5" />,
  },
  {
    step: "02",
    title: "План робіт",
    text: "Узгоджуємо сценарій послуг, матеріали, терміни та бюджет.",
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    step: "03",
    title: "Виконання",
    text: "Роботи ведуться за технологічними картами та перевіреними складами.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    step: "04",
    title: "Фінальний контроль",
    text: "Перевірка якості, рекомендації по догляду, видача авто клієнту.",
    icon: <BadgeCheck className="h-5 w-5" />,
  },
];

export const About = () => {
  return (
    <div className="overflow-hidden bg-[#050505] pb-16 pt-24 sm:pt-28 md:pt-32">
      <SEO
        title="Про автосервіс у Горохові: підхід і стандарти"
        description="HubService — автосервіс у Горохові: мийка, хімчистка, полірування, кондиціонери та 3D розвал-сходження. Як ми працюємо, які стандарти й де знаходимося."
        keywords="про автосервіс HubService, автосервіс Горохів, хімчистка та полірування"
        breadcrumb={[
          { name: "Головна", path: "/" },
          { name: "Про нас", path: "/about" },
        ]}
        schema={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          mainEntity: {
            "@type": "AutoBodyShop",
            name: BUSINESS_INFO.brand,
            url: BUSINESS_INFO.siteUrl,
            telephone: BUSINESS_INFO.phoneE164,
            email: BUSINESS_INFO.email,
            address: {
              "@type": "PostalAddress",
              streetAddress: BUSINESS_INFO.addressLine,
              addressLocality: BUSINESS_INFO.city,
              addressRegion: BUSINESS_INFO.region,
              postalCode: BUSINESS_INFO.postalCode,
              addressCountry: "UA",
            },
          },
        }}
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <motion.div {...fadeInUp}>
            <span className="mb-5 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#d5b57a]">
              <span className="h-px w-8 bg-[#d5b57a]/80" aria-hidden="true" />
              Про нас
            </span>

            <h1 className="mb-6 font-display text-3xl font-semibold uppercase leading-[0.95] text-white sm:text-5xl lg:text-6xl">
              Сервіс, де все <span className="text-[#d5b57a]">зрозуміло</span>
            </h1>

            <p className="mb-5 max-w-xl text-base leading-relaxed text-[#c3cad6] sm:text-lg">
              HubService — автосервіс у Горохові. Ми беремося за догляд, який можна перевірити:
              мийка, хімчистка, полірування, кондиціонери та розвал-сходження.
            </p>
            <p className="mb-8 max-w-xl text-base leading-relaxed text-[#aab3c2]">
              Працюємо так, щоб ви розуміли кожен етап: що робимо, скільки це коштує і чому саме
              так. Без «пакетів нав'язування» і робіт, яких авто не потребує.
            </p>

            <div className="grid max-w-xl grid-cols-2 gap-3">
              {facts.map((fact, index) => (
                <motion.div
                  key={fact.label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="border border-white/12 bg-white/[0.03] p-4"
                >
                  <div className="mb-2 text-[#d5b57a]">{fact.icon}</div>
                  <div className="font-display text-2xl font-semibold text-white">{fact.value}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.12em] text-[#aab3c2]">
                    {fact.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="grid grid-cols-2 gap-3"
          >
            <div className="col-span-2 overflow-hidden border border-white/12">
              <img
                src={`${import.meta.env.BASE_URL}hero-bg.jpg`}
                srcSet={buildSrcSet("hero-bg.jpg", 1195)}
                sizes="(min-width: 1024px) 50vw, 100vw"
                alt="Будівля сервісу HubService у Горохові"
                width={1195}
                height={850}
                loading="lazy"
                decoding="async"
                className="aspect-[16/10] w-full object-cover"
              />
            </div>

            <div className="overflow-hidden border border-white/12">
              <img
                src={`${import.meta.env.BASE_URL}photo-garage.jpg`}
                srcSet={`${import.meta.env.BASE_URL}photo-garage-800.jpg 800w, ${import.meta.env.BASE_URL}photo-garage-1200.jpg 1200w, ${import.meta.env.BASE_URL}photo-garage.jpg 1554w`}
                sizes="(min-width: 1024px) 25vw, 50vw"
                alt="Робочий бокс з підйомником"
                width={1554}
                height={772}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            <div className="overflow-hidden border border-white/12">
              <img
                src={`${import.meta.env.BASE_URL}truck-wash.jpg`}
                srcSet={buildSrcSet("truck-wash.jpg", 1193)}
                sizes="(min-width: 1024px) 25vw, 50vw"
                alt="Вантажна мийка на території сервісу"
                width={1193}
                height={819}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mt-16 border-y border-white/10 bg-[#080808] py-14 sm:mt-20 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="mb-10 max-w-3xl sm:mb-12">
            <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.24em] text-[#d5b57a]">
              Стандарт
            </span>
            <h2 className="mb-4 font-display text-3xl font-semibold text-white sm:text-4xl">
              Працюємо по системі, а не хаотично
            </h2>
            <p className="text-base leading-relaxed text-[#aab3c2]">
              Кожен автомобіль проходить чіткий маршрут: від діагностики до фінального контролю.
              Тому результат стабільний, а не випадковий.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {standards.map((item, index) => (
              <motion.article
                key={item.step}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.45 }}
                className="border border-white/12 bg-[#0a0a0a] p-5 transition-colors hover:border-[#d5b57a]/45"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="font-display text-2xl font-semibold text-white/40">
                    {item.step}
                  </span>
                  <span className="text-[#d5b57a]">{item.icon}</span>
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-[#aab3c2]">{item.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-4 sm:mt-20 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="mb-10 max-w-2xl">
          <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.24em] text-[#d5b57a]">
            Принципи
          </span>
          <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
            Чому нас обирають
          </h2>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: <ShieldCheck className="h-7 w-7" />,
              title: "Якість без компромісів",
              desc: "Кожен етап проходить перевірку до фінальної видачі авто. Зауваження — виправляємо.",
            },
            {
              icon: <Sparkles className="h-7 w-7" />,
              title: "Технологічний підхід",
              desc: "Склади й обладнання підбираємо під матеріал і стан поверхні, а не «що є».",
            },
            {
              icon: <BadgeCheck className="h-7 w-7" />,
              title: "Повага до клієнта",
              desc: "Прозорий кошторис, чіткі терміни й рекомендації після робіт — без зайвих обіцянок.",
            },
          ].map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07, duration: 0.45 }}
              className="border border-white/12 bg-white/[0.03] p-6"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center border border-[#d5b57a]/35 text-[#d5b57a]">
                {item.icon}
              </div>
              <h3 className="mb-2 font-display text-lg font-semibold text-white">{item.title}</h3>
              <p className="text-sm leading-relaxed text-[#aab3c2]">{item.desc}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-4 sm:mt-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden border border-white/15 bg-[linear-gradient(120deg,#12224a_0%,#1c3a7d_55%,#2453b8_100%)] p-7 sm:p-10 lg:p-12"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_45%)]" />
          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="mb-3 font-display text-3xl font-semibold text-white sm:text-4xl">
                Готові до змін?
              </h2>
              <p className="text-base leading-relaxed text-[#dbe4f5]">
                Запишіться на огляд — підкажемо, що дійсно потрібно зробити саме вашому авто.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex min-h-12 touch-manipulation items-center justify-center gap-2 bg-white px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#0a1022] transition-colors hover:bg-[#e7ecf7]"
              >
                Зв'язатися <ArrowRight size={15} />
              </Link>
              <a
                href={`tel:${BUSINESS_INFO.phoneE164}`}
                className="inline-flex min-h-12 touch-manipulation items-center justify-center border border-white/40 px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white/10"
              >
                {BUSINESS_INFO.phoneDisplay}
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};


