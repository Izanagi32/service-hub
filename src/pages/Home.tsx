import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ChevronRight,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "../components/SEO";
import { Marquee } from "../components/Marquee";
import {
  faqs,
  galleryItems,
  guarantees,
  processSteps,
  services,
  stats,
} from "../constants";
import { BUSINESS_INFO } from "../siteContent";
import { buildSrcSet } from "../lib/images";

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

interface HomeProps {
  openModal: (serviceTitle?: string) => void;
}

export const Home = ({ openModal }: HomeProps) => {
  const [openFaqIndex, setOpenFaqIndex] = useState(-1);
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const heroContentY = useTransform(scrollYProgress, [0, 1], [0, -48]);

  return (
    <>
      <SEO
        title="Автосервіс у Горохові: мийка, хімчистка, розвал"
        description="HubService — автосервіс у Горохові: мийка, хімчистка салону та килимів, полірування, заправка кондиціонерів і 3D розвал-сходження. Ціни від 300 ₴, запис онлайн."
        keywords="автосервіс Горохів, мийка авто Горохів, хімчистка салону, полірування, розвал-сходження, заправка кондиціонера"
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "AutoBodyShop",
              name: BUSINESS_INFO.brand,
              image: `${BUSINESS_INFO.siteUrl}${import.meta.env.BASE_URL}hero-bg.jpg`,
              "@id": BUSINESS_INFO.siteUrl,
              url: BUSINESS_INFO.siteUrl,
              telephone: BUSINESS_INFO.phoneE164,
              email: BUSINESS_INFO.email,
              priceRange: "від 300 ₴",
              address: {
                "@type": "PostalAddress",
                streetAddress: BUSINESS_INFO.addressLine,
                addressLocality: BUSINESS_INFO.city,
                addressRegion: BUSINESS_INFO.region,
                postalCode: BUSINESS_INFO.postalCode,
                addressCountry: "UA",
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                  opens: "09:00",
                  closes: "20:00",
                },
              ],
              hasMap: BUSINESS_INFO.mapsUrl,
              makesOffer: services.map((service) => ({
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: service.title },
                price: service.priceValue,
                priceCurrency: "UAH",
              })),
            },
            {
              "@type": "FAQPage",
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: { "@type": "Answer", text: faq.answer },
              })),
            },
          ],
        }}
      />

      <section
        ref={heroRef}
        className="relative flex min-h-[92svh] items-center overflow-hidden pt-28 sm:pt-32 md:min-h-screen"
      >
        <div className="absolute inset-0 z-0">
          <motion.div
            style={reduceMotion ? undefined : { y: heroImageY }}
            className="absolute inset-0"
          >
            <img
              src={`${import.meta.env.BASE_URL}hero-bg.jpg`}
              srcSet={buildSrcSet("hero-bg.jpg", 1195)}
              sizes="100vw"
              alt="Будівля сервісу HubService у Горохові"
              width={1195}
              height={850}
              loading="eager"
              decoding="async"
              className="h-full w-full scale-110 object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[#050505]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(47,102,245,0.22),transparent_60%)]" />
        </div>

        <motion.div
          style={reduceMotion ? undefined : { y: heroContentY }}
          className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 pt-10 sm:px-6 sm:pb-28 lg:px-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d5b57a] backdrop-blur">
              <Star className="h-3 w-3 fill-[#d5b57a] text-[#d5b57a]" aria-hidden="true" />
              {BUSINESS_INFO.city} · {BUSINESS_INFO.region}
            </p>

            <h1 className="mb-6 font-display text-[2.6rem] font-semibold uppercase leading-[0.94] tracking-[0.01em] text-white sm:text-6xl lg:text-7xl">
              Догляд за авто,
              <br />
              <span className="text-[#d5b57a]">який видно</span>
            </h1>

            <p className="mb-8 max-w-xl text-base leading-relaxed text-[#d7dbe3] sm:text-lg">
              Мийка, хімчистка, полірування, кондиціонери та 3D розвал-сходження. Погоджуємо
              кошторис до старту робіт і підтверджуємо час візиту.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => openModal()}
                className="btn-shine group inline-flex min-h-13 touch-manipulation items-center justify-center gap-3 bg-[#2f66f5] px-7 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#4a7bff]"
              >
                Записатися на візит
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
              <Link
                to="/services"
                className="inline-flex min-h-13 touch-manipulation items-center justify-center border border-white/30 px-7 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:border-white hover:bg-white/5"
              >
                Послуги та ціни
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#c3cad6]">
              <span className="inline-flex items-center gap-2">
                <Clock size={16} className="text-[#d5b57a]" aria-hidden="true" />
                {BUSINESS_INFO.workingHoursShort}
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin size={16} className="text-[#d5b57a]" aria-hidden="true" />
                {BUSINESS_INFO.addressLine}, {BUSINESS_INFO.city}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section aria-label="Коротко про сервіс" className="border-y border-white/10 bg-[#080808] py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="text-center md:text-left"
            >
              <div className="mb-1 font-display text-2xl font-semibold text-white sm:text-3xl">
                {stat.value}
              </div>
              <div className="text-[11px] uppercase tracking-[0.14em] text-[#aab3c2]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-[#050505] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="mb-10 max-w-2xl sm:mb-14">
            <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.24em] text-[#d5b57a]">
              Послуги
            </span>
            <h2 className="mb-4 font-display text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
              Що можна зробити за один візит
            </h2>
            <p className="text-base leading-relaxed text-[#aab3c2]">
              Шість напрямів, одна команда й один кошторис. Оберіть потрібне — або запитайте, що
              доцільно зробити саме вашому авто.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.45 }}
                className="group flex flex-col border border-white/12 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#d5b57a]/50 hover:bg-[#d5b57a]/5 hover:shadow-[0_18px_40px_-24px_rgba(213,181,122,0.5)]"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <span className="flex h-11 w-11 items-center justify-center border border-[#d5b57a]/35 text-[#d5b57a]">
                    {service.icon}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8b93a3]">
                    {service.id}
                  </span>
                </div>
                <h3 className="mb-2 font-display text-xl font-semibold text-white">
                  <Link
                    to={`/services/${service.slug}`}
                    className="transition-colors hover:text-[#f0d9a8]"
                  >
                    {service.title}
                  </Link>
                </h3>
                <p className="mb-5 text-sm leading-relaxed text-[#aab3c2]">{service.description}</p>
                <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-sm font-semibold text-[#f0d9a8]">{service.price}</span>
                  <button
                    type="button"
                    onClick={() => openModal(service.title)}
                    className="-mx-2 inline-flex min-h-11 items-center gap-1.5 px-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:text-[#d5b57a]"
                  >
                    Записатися
                    <ArrowRight size={13} />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-8">
            <Link
              to="/services"
              className="tap-link inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#d5b57a] transition-colors hover:text-white"
            >
              Детально про кожну послугу <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#080808] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <motion.div {...fadeInUp}>
              <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.24em] text-[#d5b57a]">
                Як ми працюємо
              </span>
              <h2 className="mb-4 font-display text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
                Чотири кроки без сюрпризів
              </h2>
              <p className="mb-8 max-w-md text-base leading-relaxed text-[#aab3c2]">
                Ви завжди знаєте, що відбувається з авто, скільки це коштує і коли буде готово.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 border border-white/12 bg-white/[0.03] p-4">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#d5b57a]" aria-hidden="true" />
                  <p className="text-sm leading-relaxed text-[#d7dbe3]">
                    Фіксуємо стан авто на прийманні — щоб після робіт не було суперечок.
                  </p>
                </div>
                <div className="flex items-start gap-3 border border-white/12 bg-white/[0.03] p-4">
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#d5b57a]" aria-hidden="true" />
                  <p className="text-sm leading-relaxed text-[#d7dbe3]">
                    Кошторис погоджуємо до початку робіт, без доплат «по факту».
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2">
              {processSteps.map((step, index) => (
                <motion.article
                  key={step.number}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06, duration: 0.45 }}
                  className="border border-white/12 bg-[#0a0a0a] p-5 transition-colors hover:border-white/25"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8b93a3]">
                      Крок
                    </span>
                    <span className="font-display text-xl font-semibold text-[#d5b57a]">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="mb-2 font-display text-lg font-semibold text-white">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-[#aab3c2]">{step.description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#050505] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="mb-10 max-w-2xl sm:mb-14">
            <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.24em] text-[#d5b57a]">
              Наш сервіс
            </span>
            <h2 className="mb-4 font-display text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
              Подивіться, де ми працюємо
            </h2>
            <p className="text-base leading-relaxed text-[#aab3c2]">
              Реальні фото території та боксу: приймання, підйомник, 3D-стенд і вантажна мийка.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryItems.map((item, index) => (
              <motion.figure
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07, duration: 0.5 }}
                className="group relative overflow-hidden border border-white/12 bg-white/5 transition-colors duration-300 hover:border-[#d5b57a]/45"
              >
                <img
                  src={`${import.meta.env.BASE_URL}${item.image}`}
                  srcSet={buildSrcSet(item.image, item.width)}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-5 pt-12 transition-transform duration-500 group-hover:-translate-y-1">
                  <div className="mb-1 font-display text-lg font-semibold text-white">
                    {item.title}
                  </div>
                  <p className="text-sm leading-relaxed text-[#d7dbe3]">{item.caption}</p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <Marquee
        items={[...services.map((service) => service.title), "Вантажна мийка", "Гарантія якості"]}
      />

      <section className="border-y border-white/10 bg-[#080808] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="mb-10 flex flex-col gap-6 sm:mb-14 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.24em] text-[#d5b57a]">
                Гарантії
              </span>
              <h2 className="mb-4 font-display text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
                Домовляємося на березі
              </h2>
              <p className="text-base leading-relaxed text-[#aab3c2]">
                Без «зробимо — потім порахуємо». Ось на чому тримається робота з нами.
              </p>
            </div>
            <a
              href={BUSINESS_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="tap-link inline-flex w-fit items-center gap-2 border border-white/25 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:border-[#d5b57a] hover:text-[#d5b57a]"
            >
              <MapPin size={15} />
              Відгуки на Google Maps
            </a>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {guarantees.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.45 }}
                className="group border border-white/12 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#d5b57a]/45"
              >
                <span className="mb-4 flex h-11 w-11 items-center justify-center border border-[#d5b57a]/35 text-[#d5b57a]">
                  {item.icon}
                </span>
                <h3 className="mb-2 font-display text-lg font-semibold text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-[#aab3c2]">{item.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#050505] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
            <motion.div {...fadeInUp} className="lg:sticky lg:top-28 lg:self-start">
              <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.24em] text-[#d5b57a]">
                Питання
              </span>
              <h2 className="mb-4 font-display text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
                Часті запитання
              </h2>
              <p className="mb-7 text-base leading-relaxed text-[#aab3c2]">
                Терміни, оплата, зберігання авто та формат запису — коротко й без дрібного шрифту.
              </p>
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => openModal()}
                  className="inline-flex w-full touch-manipulation items-center justify-center gap-2 bg-[#2f66f5] px-5 py-4 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#4a7bff]"
                >
                  Поставити питання <ArrowRight size={14} />
                </button>
                <a
                  href={`tel:${BUSINESS_INFO.phoneE164}`}
                  className="inline-flex w-full touch-manipulation items-center justify-center gap-2 border border-white/25 px-5 py-4 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:border-[#d5b57a] hover:text-[#d5b57a]"
                >
                  <Phone size={14} />
                  {BUSINESS_INFO.phoneDisplay}
                </a>
              </div>
            </motion.div>

            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <motion.div
                    key={faq.question}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.03 }}
                    className={`border transition-colors ${
                      isOpen
                        ? "border-[#d5b57a]/50 bg-[#d5b57a]/5"
                        : "border-white/12 bg-white/[0.03] hover:border-white/25"
                    }`}
                  >
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${index}`}
                        className="flex w-full items-center justify-between gap-4 p-5 text-left"
                      >
                        <span className="font-display text-base font-medium leading-snug text-white sm:text-lg">
                          {faq.question}
                        </span>
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center border transition-all ${
                            isOpen
                              ? "border-[#d5b57a] text-[#d5b57a]"
                              : "border-white/20 text-[#aab3c2]"
                          }`}
                        >
                          <ChevronRight
                            className={`h-4 w-4 transition-transform ${isOpen ? "rotate-90" : ""}`}
                            aria-hidden="true"
                          />
                        </span>
                      </button>
                    </h3>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-answer-${index}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <p className="border-t border-white/10 px-5 py-4 text-sm leading-relaxed text-[#c3cad6]">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="cta-gradient relative overflow-hidden border border-white/15 bg-[linear-gradient(120deg,#12224a_0%,#1c3a7d_55%,#2453b8_100%)] p-7 sm:p-10 lg:p-14">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.16),transparent_45%)]" />
            <div className="relative z-10 flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-3 inline-flex items-center gap-2 text-[#f0d9a8]">
                  <CheckCircle2 size={16} aria-hidden="true" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                    Вільні слоти на цьому тижні
                  </span>
                </div>
                <h2 className="mb-3 font-display text-3xl font-semibold text-white sm:text-4xl">
                  Запишіться — підберемо час під вас
                </h2>
                <p className="text-base leading-relaxed text-[#dbe4f5]">
                  Залиште контакти, і ми підтвердимо візит у робочий час. Або зателефонуйте прямо
                  зараз.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => openModal()}
                  className="inline-flex min-h-13 touch-manipulation items-center justify-center gap-2 bg-white px-6 py-4 text-[11px] font-bold uppercase tracking-[0.16em] text-[#0a1022] transition-colors hover:bg-[#e7ecf7]"
                >
                  Записатися <ArrowRight size={15} />
                </button>
                <a
                  href={`tel:${BUSINESS_INFO.phoneE164}`}
                  className="inline-flex min-h-13 touch-manipulation items-center justify-center gap-2 border border-white/40 px-6 py-4 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white/10"
                >
                  <Phone size={15} />
                  Подзвонити
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};


