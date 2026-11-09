import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Clock, Gauge, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { services } from "../constants";
import { SEO } from "../components/SEO";
import { BUSINESS_INFO } from "../siteContent";

interface ServicesProps {
  openModal: (serviceTitle?: string) => void;
}

export const Services = ({ openModal }: ServicesProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = services[activeIndex];

  const priceRows = useMemo(
    () => services.map((service) => ({ ...service, price: service.price })),
    [],
  );

  return (
    <div className="bg-[#050505] pb-16 pt-24 sm:pt-28 md:pt-32">
      <SEO
        title="Послуги та ціни автосервісу в Горохові"
        description="Послуги HubService у Горохові: мийка від 300 ₴, хімчистка салону від 1500 ₴, полірування, кондиціонери та 3D розвал-сходження. Ціни й час виконання."
        keywords="ціни автосервіс Горохів, мийка авто, хімчистка салону, полірування, розвал-сходження, заправка кондиціонера"
        breadcrumb={[
          { name: "Головна", path: "/" },
          { name: "Послуги та ціни", path: "/services" },
        ]}
        schema={{
          "@context": "https://schema.org",
          "@type": "OfferCatalog",
          name: `Послуги ${BUSINESS_INFO.brand}`,
          itemListElement: services.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.title,
              description: service.description,
              provider: {
                "@type": "AutoBodyShop",
                name: BUSINESS_INFO.brand,
                address: {
                  "@type": "PostalAddress",
                  streetAddress: BUSINESS_INFO.addressLine,
                  addressLocality: BUSINESS_INFO.city,
                  addressCountry: "UA",
                },
              },
            },
            price: service.priceValue,
            priceCurrency: "UAH",
            availability: "https://schema.org/InStock",
          })),
        }}
      />

      <section className="mx-auto mb-10 max-w-7xl px-4 sm:mb-14 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <span className="mb-4 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#d5b57a]">
            <span className="h-px w-8 bg-[#d5b57a]/80" aria-hidden="true" />
            Послуги та ціни
          </span>
          <h1 className="mb-5 font-display text-3xl font-semibold uppercase leading-[0.95] text-white sm:text-5xl lg:text-6xl">
            Еталонний <span className="text-[#d5b57a]">догляд</span>
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-[#aab3c2] sm:text-lg">
            Орієнтовні ціни та час виконання. Фінальну вартість погоджуємо після огляду авто —
            без доплат «по факту».
          </p>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden border border-[#d5b57a]/30 bg-[#0a0a0a]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(213,181,122,0.16),transparent_55%)]" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />

          <AnimatePresence mode="wait">
            <motion.article
              key={activeService.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
              aria-live="polite"
              className="relative z-10 grid gap-8 p-5 sm:p-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12 lg:p-12"
            >
              <div>
                <div className="mb-6 inline-flex items-center gap-3 border border-[#d5b57a]/35 bg-[#d5b57a]/10 px-3.5 py-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#f0d9a8]">
                    Послуга
                  </span>
                  <span className="font-display text-sm font-semibold text-white">
                    #{activeService.id}
                  </span>
                </div>

                <h2 className="mb-4 font-display text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
                  {activeService.title}
                </h2>
                <p className="mb-7 max-w-2xl text-base leading-relaxed text-[#c3cad6]">
                  {activeService.description}
                </p>

                <ul className="mb-8 grid gap-3 sm:grid-cols-2">
                  {activeService.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-sm text-[#e7dfcd]"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 bg-[#d5b57a]" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => openModal(activeService.title)}
                  className="btn-shine group inline-flex min-h-13 w-full touch-manipulation items-center justify-center gap-3 bg-[#d5b57a] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-[#e8cf9c] sm:w-auto"
                >
                  Записатися
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
                <div className="mt-4 flex flex-wrap items-center gap-5">
                  <Link
                    to={`/services/${activeService.slug}`}
                    className="tap-link inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#f0d9a8] transition-colors hover:text-white"
                  >
                    Детальніше про послугу <ArrowRight size={14} />
                  </Link>
                  <span className="text-[11px] text-[#8b93a3]">Процес, склад робіт і час виконання</span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="border border-white/15 bg-black/40 p-5">
                  <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#c1a772]">
                    Орієнтовна ціна
                  </div>
                  <div className="mb-3 font-display text-3xl font-semibold text-white sm:text-4xl">
                    {activeService.price}
                  </div>
                  <p className="text-sm leading-relaxed text-[#aab3c2]">
                    Остаточна вартість — після огляду авто.
                  </p>
                </div>

                <div className="border border-white/15 bg-black/40 p-5">
                  <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#aab3c2]">
                    <Clock size={13} aria-hidden="true" />
                    Час виконання
                  </div>
                  <div className="text-lg font-semibold text-white">{activeService.duration}</div>
                </div>

                <div className="border border-white/15 bg-black/40 p-5">
                  <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#aab3c2]">
                    Ключова перевага
                  </div>
                  <div className="flex items-center gap-3 text-[#f0d9a8]">
                    {activeService.icon}
                    <span className="text-sm font-semibold text-white">{activeService.tooltip}</span>
                  </div>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </section>

      <section className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Вибір послуги">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {services.map((service, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={service.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-pressed={isActive}
                className={`group flex min-h-[96px] flex-col justify-between border p-4 text-left transition-colors ${
                  isActive
                    ? "border-[#d5b57a] bg-[#d5b57a]/10"
                    : "border-white/15 bg-white/[0.03] hover:border-white/35"
                }`}
              >
                <span
                  className={`text-[10px] font-bold uppercase tracking-[0.16em] ${
                    isActive ? "text-[#f0d9a8]" : "text-[#8b93a3]"
                  }`}
                >
                  {service.price}
                </span>
                <span className="mt-3 font-display text-sm font-medium leading-tight text-white">
                  {service.shortTitle}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-4 sm:mt-20 sm:px-6 lg:px-8" aria-labelledby="price-table-title">
        <h2
          id="price-table-title"
          className="mb-6 font-display text-2xl font-semibold text-white sm:text-3xl"
        >
          Прайс-лист
        </h2>

        <div className="overflow-x-auto border border-white/12">
          <table className="w-full border-collapse text-left text-sm md:min-w-[640px]">
            <caption className="sr-only">
              Орієнтовні ціни та час виконання послуг {BUSINESS_INFO.brand}
            </caption>
            <thead>
              <tr className="bg-white/[0.06] text-[10px] uppercase tracking-[0.16em] text-[#aab3c2]">
                <th scope="col" className="px-5 py-4 font-semibold">Послуга</th>
                <th scope="col" className="hidden px-5 py-4 font-semibold md:table-cell">Що входить</th>
                <th scope="col" className="px-5 py-4 font-semibold">Час</th>
                <th scope="col" className="px-5 py-4 text-right font-semibold">Ціна</th>
              </tr>
            </thead>
            <tbody>
              {priceRows.map((service) => (
                <tr key={service.id} className="border-t border-white/10 align-top">
                  <th scope="row" className="px-4 py-4 font-medium text-white sm:px-5">
                    <Link
                      to={`/services/${service.slug}`}
                      className="transition-colors hover:text-[#f0d9a8]"
                    >
                      {service.title}
                    </Link>
                  </th>
                  <td className="hidden px-5 py-4 text-[#aab3c2] md:table-cell">{service.features.join(" · ")}</td>
                  <td className="whitespace-nowrap px-4 py-4 text-[#c3cad6] sm:px-5">{service.duration}</td>
                  <td className="whitespace-nowrap px-4 py-4 text-right font-semibold text-[#f0d9a8] sm:px-5">
                    {service.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-[#8b93a3]">
          Ціни орієнтовні. Точна вартість залежить від розміру авто та стану поверхні.
        </p>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-4 sm:mt-20 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: <ShieldCheck className="h-6 w-6" />,
              title: "Гарантія якості",
              text: "Якщо після візиту є зауваження до результату — повертаємося до робіт і усуваємо їх.",
            },
            {
              icon: <Sparkles className="h-6 w-6" />,
              title: "Професійна автохімія",
              text: "Підбираємо склади під матеріал поверхні: лак, скло, пластик, текстиль або шкіра.",
            },
            {
              icon: <Gauge className="h-6 w-6" />,
              title: "Точне обладнання",
              text: "3D-стенд розвал-сходження проходить калібрування, а результати видаємо протоколом.",
            },
          ].map((item) => (
            <div key={item.title} className="border border-white/12 bg-white/[0.03] p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center border border-[#d5b57a]/35 text-[#d5b57a]">
                {item.icon}
              </div>
              <h3 className="mb-2 font-display text-lg font-semibold text-white">{item.title}</h3>
              <p className="text-sm leading-relaxed text-[#aab3c2]">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-4 sm:mt-20 sm:px-6 lg:px-8">
        <div className="border border-white/15 bg-[#0b1224] p-6 sm:p-8">
          <h2 className="mb-3 font-display text-xl font-semibold text-white sm:text-2xl">
            Не знаєте, що потрібно?
          </h2>
          <p className="mb-5 max-w-2xl text-sm leading-relaxed text-[#aab3c2]">
            Опишіть стан авто — підкажемо мінімальний доцільний набір робіт і чесно скажемо, що
            робити не потрібно.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => openModal()}
              className="btn-shine inline-flex min-h-12 touch-manipulation items-center justify-center gap-2 bg-[#2f66f5] px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#4a7bff]"
            >
              Записатися на консультацію <ArrowRight size={14} />
            </button>
            <a
              href={`tel:${BUSINESS_INFO.phoneE164}`}
              className="inline-flex min-h-12 touch-manipulation items-center justify-center gap-2 border border-white/25 px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:border-[#d5b57a]"
            >
              {BUSINESS_INFO.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
