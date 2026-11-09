import { useEffect, useRef, useState, FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "../components/SEO";
import { MapEmbed } from "../components/MapEmbed";
import { BUSINESS_INFO, ADDRESS_FULL, whatsappLink } from "../siteContent";
import { submitContactRequest, type DeliveryResult } from "../lib/submissions";
import { formatPhone, isValidEmail, isValidPhone } from "../lib/validation";
import { trackEvent } from "../lib/analytics";

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

interface ContactFormState {
  name: string;
  phone: string;
  email: string;
  message: string;
  consent: boolean;
  website: string;
}

const emptyForm = (): ContactFormState => ({
  name: "",
  phone: "",
  email: "",
  message: "",
  consent: false,
  website: "",
});

const inputClass =
  "w-full rounded-lg border border-white/20 bg-[#0b1020] px-4 py-3.5 text-[16px] text-white transition-colors placeholder:text-[#7d8798] focus:border-[#8fb0ff] focus:outline-none focus:ring-2 focus:ring-[#8fb0ff]/25";

export const Contact = () => {
  const [form, setForm] = useState<ContactFormState>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [delivery, setDelivery] = useState<DeliveryResult | null>(null);
  const [submitError, setSubmitError] = useState("");
  const submitLock = useRef(false);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (delivery) successRef.current?.focus({ preventScroll: true });
  }, [delivery]);

  const update = <K extends keyof ContactFormState>(key: K, value: ContactFormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validate = (): boolean => {
    const nextErrors: Record<string, string> = {};

    if (!form.name.trim()) {
      nextErrors.name = "Вкажіть ім'я";
    } else if (form.name.trim().length < 2) {
      nextErrors.name = "Ім'я має містити щонайменше 2 символи";
    }

    if (form.phone.trim() && !isValidPhone(form.phone)) {
      nextErrors.phone = "Перевірте номер телефону";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Вкажіть електронну пошту";
    } else if (!isValidEmail(form.email.trim())) {
      nextErrors.email = "Перевірте формат електронної пошти";
    }

    if (!form.message.trim()) {
      nextErrors.message = "Опишіть, будь ласка, ваш запит";
    } else if (form.message.trim().length < 10) {
      nextErrors.message = "Додайте хоча б 10 символів, щоб ми зрозуміли запит";
    }

    if (!form.consent) {
      nextErrors.consent = "Потрібна згода на обробку персональних даних";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      window.requestAnimationFrame(() => {
        document
          .querySelector<HTMLElement>('form [aria-invalid="true"]')
          ?.focus({ preventScroll: false });
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (submitLock.current) return;
    submitLock.current = true;

    try {
      if (!validate()) {
        trackEvent("contact_validation_error");
        return;
      }

      // Honeypot: real users never see or fill this field.
      if (form.website.trim()) return;

      setSubmitError("");
      setIsSubmitting(true);

      const consentAt = new Date().toISOString();
      const result = await submitContactRequest({
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
        consent: true,
        consentAt,
      });

      if (result.channel === "whatsapp") {
        window.open(result.url, "_blank", "noopener,noreferrer");
      }

      setDelivery(result);
      trackEvent("contact_submit", { channel: result.channel });
    } catch (error) {
      trackEvent("contact_error");
      setSubmitError(
        error instanceof Error ? error.message : "Не вдалося надіслати повідомлення. Спробуйте ще раз.",
      );
    } finally {
      submitLock.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#050505] pb-16 pt-24 sm:pt-28 md:pt-32">
      <SEO
        title="Контакти автосервісу в Горохові"
        description={`HubService у Горохові, ${BUSINESS_INFO.addressLine}. Телефон ${BUSINESS_INFO.phoneDisplay}. Графік Пн–Сб 09:00–20:00. Запис онлайн і карта проїзду.`}
        keywords="контакти автосервіс Горохів, адреса, телефон, графік роботи, запис на сервіс"
        breadcrumb={[
          { name: "Головна", path: "/" },
          { name: "Контакти", path: "/contact" },
        ]}
        schema={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          mainEntity: {
            "@type": "AutoBodyShop",
            name: BUSINESS_INFO.brand,
            telephone: BUSINESS_INFO.phoneE164,
            email: BUSINESS_INFO.email,
            url: BUSINESS_INFO.siteUrl,
            hasMap: BUSINESS_INFO.mapsUrl,
            address: {
              "@type": "PostalAddress",
              streetAddress: BUSINESS_INFO.addressLine,
              addressLocality: BUSINESS_INFO.city,
              addressRegion: BUSINESS_INFO.region,
              postalCode: BUSINESS_INFO.postalCode,
              addressCountry: "UA",
            },
            openingHoursSpecification: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              opens: "09:00",
              closes: "20:00",
            },
          },
        }}
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 max-w-3xl sm:mb-14"
        >
          <span className="mb-4 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#d5b57a]">
            <span className="h-px w-8 bg-[#d5b57a]/80" aria-hidden="true" />
            Контакти
          </span>
          <h1 className="mb-4 font-display text-3xl font-semibold uppercase leading-[0.95] text-white sm:text-5xl lg:text-6xl">
            Зв'яжіться <span className="text-[#d5b57a]">з нами</span>
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-[#aab3c2] sm:text-lg">
            Подзвоніть, напишіть у WhatsApp або залиште заявку — підкажемо, що потрібно авто, і
            підберемо час.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <motion.div {...fadeInUp}>
            <ul className="space-y-3">
              {[
                {
                  icon: <MapPin className="h-5 w-5" />,
                  title: "Адреса",
                  content: ADDRESS_FULL,
                  href: BUSINESS_INFO.mapsUrl,
                  external: true,
                },
                {
                  icon: <Phone className="h-5 w-5" />,
                  title: "Телефон",
                  content: BUSINESS_INFO.phoneDisplay,
                  href: `tel:${BUSINESS_INFO.phoneE164}`,
                },
                {
                  icon: <Mail className="h-5 w-5" />,
                  title: "Електронна пошта",
                  content: BUSINESS_INFO.email,
                  href: `mailto:${BUSINESS_INFO.email}`,
                },
                {
                  icon: <Clock className="h-5 w-5" />,
                  title: "Графік роботи",
                  content: BUSINESS_INFO.workingHoursFull,
                },
              ].map((item) => {
                const content = (
                  <>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/20 text-[#d5b57a]">
                      {item.icon}
                    </span>
                    <span>
                      <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.16em] text-[#8b93a3]">
                        {item.title}
                      </span>
                      <span className="block text-sm leading-relaxed text-white">{item.content}</span>
                    </span>
                  </>
                );

                return (
                  <li key={item.title}>
                    {item.href ? (
                      <a
                        href={item.href}
                        {...(item.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="flex items-start gap-4 border border-white/12 bg-white/[0.03] p-4 transition-colors hover:border-[#d5b57a]/45"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="flex items-start gap-4 border border-white/12 bg-white/[0.03] p-4">
                        {content}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <a
                href={whatsappLink(
                  `Вітаю! Пишу з сайту ${BUSINESS_INFO.brand}. Хочу уточнити щодо послуг.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#12813f] px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#16924a]"
              >
                <MessageCircle size={15} />
                Написати в WhatsApp
              </a>
              <a
                href={`tel:${BUSINESS_INFO.phoneE164}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/25 px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:border-[#d5b57a]"
              >
                <Phone size={15} />
                Подзвонити
              </a>
            </div>

            <div className="mt-6">
              <MapEmbed />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative border border-white/12 bg-white/[0.03] p-5 sm:p-8"
          >
            <h2 className="mb-2 font-display text-2xl font-semibold text-white sm:text-3xl">
              Напишіть нам
            </h2>
            <p className="mb-7 text-sm leading-relaxed text-[#aab3c2]">
              Опишіть запит — відповімо в робочий час. Поля з <span aria-hidden="true">*</span>
              обов'язкові.
            </p>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {Object.keys(errors).length > 0 && (
                <div
                  role="alert"
                  className="rounded-lg border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm leading-relaxed text-red-200"
                >
                  Перевірте, будь ласка, поля: {Object.values(errors).join("; ")}.
                </div>
              )}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-[#aab3c2]"
                  >
                    Ім'я <span className="text-[#d5b57a]">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                    className={`${inputClass} ${errors.name ? "border-red-400" : ""}`}
                    placeholder="Олександр"
                  />
                  {errors.name && (
                    <p id="contact-name-error" className="mt-2 text-sm text-red-300">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-phone"
                    className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-[#aab3c2]"
                  >
                    Телефон
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    onBlur={(e) => update("phone", formatPhone(e.target.value))}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? "contact-phone-error" : undefined}
                    className={`${inputClass} ${errors.phone ? "border-red-400" : ""}`}
                    placeholder="+38 (0XX) XXX-XX-XX"
                  />
                  {errors.phone && (
                    <p id="contact-phone-error" className="mt-2 text-sm text-red-300">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-[#aab3c2]"
                >
                  Електронна пошта <span className="text-[#d5b57a]">*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
                  className={`${inputClass} ${errors.email ? "border-red-400" : ""}`}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p id="contact-email-error" className="mt-2 text-sm text-red-300">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-[#aab3c2]"
                >
                  Повідомлення <span className="text-[#d5b57a]">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  maxLength={1200}
                  required
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "contact-message-error" : undefined}
                  className={`${inputClass} resize-y ${errors.message ? "border-red-400" : ""}`}
                  placeholder="Марка авто, послуга, зручний час"
                />
                {errors.message && (
                  <p id="contact-message-error" className="mt-2 text-sm text-red-300">
                    {errors.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-consent"
                  className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-[#c3cad6]"
                >
                  <input
                    id="contact-consent"
                    name="consent"
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => update("consent", e.target.checked)}
                    aria-invalid={Boolean(errors.consent)}
                    aria-describedby={errors.consent ? "contact-consent-error" : undefined}
                    className="mt-0.5 h-5 w-5 shrink-0 rounded border-white/30 bg-[#0b1020] accent-[#4f7cff]"
                  />
                  <span>
                    Погоджуюся з{" "}
                    <Link
                      to="/privacy"
                      className="text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
                    >
                      політикою конфіденційності
                    </Link>{" "}
                    і обробкою даних для відповіді на запит.
                  </span>
                </label>
                {errors.consent && (
                  <p id="contact-consent-error" className="mt-2 text-sm text-red-300">
                    {errors.consent}
                  </p>
                )}
              </div>

              <div aria-hidden="true" className="hidden">
                <label htmlFor="contact-website">Website</label>
                <input
                  id="contact-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(e) => update("website", e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-shine group flex w-full items-center justify-center gap-3 bg-[#2f66f5] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#4a7bff] disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    Надіслати <Send size={15} className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>

              {submitError && (
                <p role="alert" className="border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm leading-relaxed text-red-200">
                  {submitError}
                </p>
              )}
            </form>

            <AnimatePresence>
              {delivery && (
                <motion.div
                  ref={successRef}
                  tabIndex={-1}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-[#080b12] p-6 text-center outline-none"
                >
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-500/15">
                    <CheckCircle2 className="h-10 w-10 text-emerald-300" />
                  </div>

                  {delivery.channel === "whatsapp" ? (
                    <>
                      <h3 className="mb-3 font-display text-2xl font-semibold text-white">
                        Повідомлення сформовано
                      </h3>
                      <p className="mb-6 max-w-sm text-sm leading-relaxed text-[#c3cad6]">
                        Ми відкрили WhatsApp із готовим текстом. Натисніть «Надіслати» — і ми
                        відповімо в робочий час.
                      </p>
                      <a
                        href={delivery.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#12813f] px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#16924a]"
                      >
                        <MessageCircle size={15} />
                        Відкрити WhatsApp
                      </a>
                    </>
                  ) : (
                    <>
                      <h3 className="mb-3 font-display text-2xl font-semibold text-white">
                        Дякуємо!
                      </h3>
                      <p className="mb-6 max-w-sm text-sm leading-relaxed text-[#c3cad6]">
                        Повідомлення надіслано. Ми відповімо на вказану пошту в робочий час.
                      </p>
                    </>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setDelivery(null);
                      setForm(emptyForm());
                      setErrors({});
                    }}
                    className="mt-7 text-[11px] font-bold uppercase tracking-[0.18em] text-[#8fb0ff] transition-colors hover:text-white"
                  >
                    Надіслати ще одне
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
