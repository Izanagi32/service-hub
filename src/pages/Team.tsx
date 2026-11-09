import { motion } from "motion/react";
import { MapPin, Phone, ShieldCheck } from "lucide-react";
import { SEO } from "../components/SEO";
import { buildSrcSet } from "../lib/images";
import { teamRoles } from "../constants";
import { BUSINESS_INFO } from "../siteContent";

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

export const Team = () => {
  return (
    <div className="bg-[#050505] pb-16 pt-24 sm:pt-28 md:pt-32">
      <SEO
        title="Команда та стандарти автосервісу в Горохові"
        description="Хто працює з вашим авто в HubService: приймання, 3D розвал-сходження та хімчистка. Як розподілені ролі й хто відповідає за якість."
        keywords="команда автосервісу, майстер розвал-сходження, хімчистка салону Горохів"
        breadcrumb={[
          { name: "Головна", path: "/" },
          { name: "Команда", path: "/team" },
        ]}
        schema={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "Команда та стандарти HubService",
          mainEntity: {
            "@type": "Organization",
            name: BUSINESS_INFO.brand,
            url: BUSINESS_INFO.siteUrl,
            telephone: BUSINESS_INFO.phoneE164,
            address: {
              "@type": "PostalAddress",
              streetAddress: BUSINESS_INFO.addressLine,
              addressLocality: BUSINESS_INFO.city,
              addressCountry: "UA",
            },
          },
        }}
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="max-w-3xl">
          <span className="mb-4 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#d5b57a]">
            <span className="h-px w-8 bg-[#d5b57a]/80" aria-hidden="true" />
            Команда
          </span>
          <h1 className="mb-5 font-display text-3xl font-semibold uppercase leading-[0.95] text-white sm:text-5xl lg:text-6xl">
            Хто працює <span className="text-[#d5b57a]">з вашим авто</span>
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-[#aab3c2] sm:text-lg">
            У нас невелика команда, тому кожне авто веде конкретна людина — від приймання до
            видачі. Ось як розподілені ролі.
          </p>
        </motion.div>
      </section>

      <section className="mx-auto mt-12 max-w-7xl px-4 sm:mt-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {teamRoles.map((role, index) => (
            <motion.article
              key={role.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="group flex flex-col border border-white/12 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#d5b57a]/45 sm:p-7"
            >
              <span className="mb-5 flex h-12 w-12 items-center justify-center border border-[#d5b57a]/35 text-[#d5b57a] transition-transform duration-300 group-hover:scale-110">
                {role.icon}
              </span>
              <h2 className="mb-2 font-display text-xl font-semibold text-white">{role.title}</h2>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#d5b57a]">
                {role.focus}
              </p>
              <p className="text-sm leading-relaxed text-[#aab3c2]">{role.description}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-4 sm:mt-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 border border-white/12 bg-[#080808] p-5 sm:p-7 lg:grid-cols-2 lg:gap-10 lg:p-10">
          <motion.div {...fadeInUp}>
            <h2 className="mb-4 font-display text-2xl font-semibold text-white sm:text-3xl">
              Обладнання, а не обіцянки
            </h2>
            <p className="mb-6 text-base leading-relaxed text-[#aab3c2]">
              Результат залежить від підготовки. У боксі є підйомник для робіт під авто,
              3D-стенд розвал-сходження та окрема зона приймання, де фіксуємо стан кузова.
            </p>
            <ul className="space-y-3">
              {[
                "Підйомник і робоча зона для шинного сервісу",
                "3D-стенд розвал-сходження з протоколом",
                "Професійне освітлення для контролю покриття",
                "Окрема зона вантажної мийки",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[#d7dbe3]">
                  <ShieldCheck
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#d5b57a]"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="grid grid-cols-2 gap-3"
          >
            <img
              src={`${import.meta.env.BASE_URL}photo-garage.jpg`}
              srcSet={buildSrcSet("photo-garage.jpg", 1554, 800)}
              sizes="(min-width: 1024px) 25vw, 50vw"
              alt="Робочий бокс з підйомником"
              width={1554}
              height={772}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full border border-white/10 object-cover"
            />
            <img
              src={`${import.meta.env.BASE_URL}truck-wash.jpg`}
              srcSet={buildSrcSet("truck-wash.jpg", 1193)}
              sizes="(min-width: 1024px) 25vw, 50vw"
              alt="Вантажна мийка на території сервісу"
              width={1193}
              height={819}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full border border-white/10 object-cover"
            />
          </motion.div>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-4 sm:mt-20 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 border border-white/15 bg-[#0b1224] p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="mb-2 font-display text-2xl font-semibold text-white">
              Познайомимося особисто
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-[#aab3c2]">
              Приїжджайте на огляд — покажемо бокс, розкажемо про етапи й дамо орієнтовний
              кошторис.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={`tel:${BUSINESS_INFO.phoneE164}`}
              className="btn-shine inline-flex min-h-12 touch-manipulation items-center justify-center gap-2 bg-[#2f66f5] px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#4a7bff]"
            >
              <Phone size={14} />
              {BUSINESS_INFO.phoneDisplay}
            </a>
            <a
              href={BUSINESS_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 touch-manipulation items-center justify-center gap-2 border border-white/25 px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:border-[#d5b57a]"
            >
              <MapPin size={14} />
              Маршрут
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
