import { Link, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Phone, ShieldCheck } from "lucide-react";
import { SEO } from "../components/SEO";
import { getServiceBySlug, processSteps, services } from "../constants";
import { BUSINESS_INFO } from "../siteContent";
import { NotFound } from "./NotFound";

interface ServiceDetailProps {
  openModal: (serviceTitle?: string) => void;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: "easeOut" as const },
};

export const ServiceDetail = ({ openModal }: ServiceDetailProps) => {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  if (!service) {
    return <NotFound />;
  }

  const otherServices = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <div className="bg-[#050505] pb-16 pt-24 sm:pt-28 md:pt-32">
      <SEO
        title={`${service.title} у Горохові: ціна та запис`}
        description={`${service.title} у Горохові: ${service.features.join(", ")}. Ціна ${service.price}, час — ${service.duration}. Запис онлайн у HubService.`}
        keywords={`${service.title} Горохів, ${service.shortTitle.toLowerCase()} ціна, автосервіс Горохів`}
        breadcrumb={[
          { name: "Головна", path: "/" },
          { name: "Послуги", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ]}
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: `${service.title} — HubService`,
          description: service.description,
          serviceType: service.title,
          areaServed: "Горохів, Волинська область",
          provider: {
            "@type": "AutoBodyShop",
            name: BUSINESS_INFO.brand,
            url: BUSINESS_INFO.siteUrl,
            telephone: BUSINESS_INFO.phoneE164,
            address: {
              "@type": "PostalAddress",
              streetAddress: BUSINESS_INFO.addressLine,
              addressLocality: BUSINESS_INFO.city,
              addressRegion: BUSINESS_INFO.region,
              postalCode: BUSINESS_INFO.postalCode,
              addressCountry: "UA",
            },
          },
          offers: {
            "@type": "Offer",
            price: service.priceValue,
            priceCurrency: "UAH",
            availability: "https://schema.org/InStock",
          },
        }}
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Хлібні крихти" className="mb-7">
          <ol className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-[#8b93a3]">
            <li>
              <Link to="/" className="transition-colors hover:text-white">
                Головна
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link to="/services" className="transition-colors hover:text-white">
                Послуги
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-[#d5b57a]" aria-current="page">
              {service.title}
            </li>
          </ol>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <span className="mb-4 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#d5b57a]">
              <span className="h-px w-8 bg-[#d5b57a]/80" aria-hidden="true" />
              Послуга #{service.id}
            </span>
            <h1 className="mb-5 font-display text-3xl font-semibold uppercase leading-[0.95] text-white sm:text-5xl lg:text-6xl">
              {service.title}
            </h1>
            <p className="mb-8 max-w-2xl text-base leading-relaxed text-[#c3cad6] sm:text-lg">
              {service.description}
            </p>

            <ul className="grid gap-3 sm:grid-cols-2">
              {service.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 border border-white/12 bg-white/[0.03] px-4 py-3 text-sm text-[#e7dfcd]"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#d5b57a]" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="h-fit border border-[#d5b57a]/30 bg-[#0a0a0a] p-6 lg:sticky lg:top-28"
          >
            <div className="mb-5 border-b border-white/10 pb-5">
              <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#c1a772]">
                Орієнтовна ціна
              </div>
              <div className="font-display text-4xl font-semibold text-white">{service.price}</div>
            </div>

            <div className="mb-5 flex items-center gap-3 text-sm text-[#c3cad6]">
              <Clock size={16} className="text-[#d5b57a]" aria-hidden="true" />
              <span>
                Час виконання: <strong className="text-white">{service.duration}</strong>
              </span>
            </div>

            <div className="mb-6 flex items-start gap-3 text-sm leading-relaxed text-[#aab3c2]">
              <ShieldCheck size={16} className="mt-0.5 shrink-0 text-[#d5b57a]" aria-hidden="true" />
              <span>{service.tooltip}. Остаточну вартість погоджуємо після огляду авто.</span>
            </div>

            <button
              type="button"
              onClick={() => openModal(service.title)}
              className="btn-shine group mb-3 flex min-h-12 w-full items-center justify-center gap-2 bg-[#d5b57a] px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-black transition-colors hover:bg-[#e8cf9c]"
            >
              Записатися <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href={`tel:${BUSINESS_INFO.phoneE164}`}
              className="flex min-h-12 w-full items-center justify-center gap-2 border border-white/25 px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:border-[#d5b57a]"
            >
              <Phone size={14} />
              {BUSINESS_INFO.phoneDisplay}
            </a>
          </motion.aside>
        </div>
      </section>

      <section className="mt-16 border-y border-white/10 bg-[#080808] py-14 sm:mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="mb-8 max-w-2xl">
            <h2 className="mb-3 font-display text-2xl font-semibold text-white sm:text-3xl">
              Як проходить візит
            </h2>
            <p className="text-base leading-relaxed text-[#aab3c2]">
              Однакова схема для всіх послуг: фіксуємо стан, погоджуємо кошторис, виконуємо роботи
              й перевіряємо результат.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <motion.article
                key={step.number}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="border border-white/12 bg-[#0a0a0a] p-5"
              >
                <div className="mb-3 font-display text-xl font-semibold text-[#d5b57a]">
                  {step.number}
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold text-white">{step.title}</h3>
                <p className="text-sm leading-relaxed text-[#aab3c2]">{step.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:mt-20 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">Інші послуги</h2>
          <Link
            to="/services"
            className="tap-link inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#d5b57a] transition-colors hover:text-white"
          >
            <ArrowLeft size={14} /> Усі послуги
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {otherServices.map((item) => (
            <Link
              key={item.slug}
              to={`/services/${item.slug}`}
              className="group border border-white/12 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#d5b57a]/45"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[#d5b57a]">{item.icon}</span>
                <span className="text-[10px] uppercase tracking-[0.16em] text-[#8b93a3]">
                  {item.price}
                </span>
              </div>
              <h3 className="mb-1 font-display text-lg font-semibold text-white group-hover:text-[#f0d9a8]">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#aab3c2]">{item.duration}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
