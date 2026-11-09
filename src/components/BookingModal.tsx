import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ChevronDown,
  Clock3,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { Dispatch, FormEvent, SetStateAction, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import type { BookingFormState } from "../App";
import { services } from "../constants";
import { BUSINESS_INFO } from "../siteContent";
import type { DeliveryResult } from "../lib/submissions";
import { TIME_SLOTS, formatPhone, isPastSlot, isSunday, maxBookingDate, todayIsoDate } from "../lib/validation";
import { useFocusTrap, useScrollLock } from "../lib/a11y";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: BookingFormState;
  setFormData: Dispatch<SetStateAction<BookingFormState>>;
  errors: Record<string, string>;
  isSubmitting: boolean;
  delivery: DeliveryResult | null;
  submitError?: string;
  handleBookingSubmit: (e: FormEvent) => void;
}

const trustHighlights = [
  { icon: ShieldCheck, text: "Прозорий кошторис до старту робіт" },
  { icon: Sparkles, text: "Професійна автохімія та обладнання" },
  { icon: Clock3, text: "Підтвердження візиту в робочий час" },
];

const inputBase =
  "w-full rounded-xl bg-[#0a1022] border px-4 py-3.5 text-white text-[16px] leading-[1.2] transition-colors placeholder:text-[#7d8798] focus:outline-none";
const inputOk = "border-white/20 focus:border-[#8fb0ff] focus:ring-2 focus:ring-[#8fb0ff]/25";

export const BookingModal = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  errors,
  isSubmitting,
  delivery,
  submitError,
  handleBookingSubmit,
}: BookingModalProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useScrollLock(isOpen);
  useFocusTrap(dialogRef, isOpen, onClose);

  useEffect(() => {
    if (delivery) successRef.current?.focus({ preventScroll: true });
  }, [delivery]);

  const update = <K extends keyof BookingFormState>(key: K, value: BookingFormState[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const isWhatsApp = delivery?.channel === "whatsapp";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center p-2.5 pb-[calc(var(--safe-bottom)+0.5rem)] sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0, scale: 0.96, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="relative w-full max-w-[1080px] max-h-[calc(100svh-1rem-var(--safe-bottom))] overflow-y-auto rounded-[22px] sm:rounded-[26px] border border-white/15 bg-[#040712] shadow-[0_40px_120px_rgba(0,0,0,0.62)]"
            role="dialog"
            aria-modal="true"
            aria-label="Запис на візит"
          >
            <button
              onClick={onClose}
              type="button"
              aria-label="Закрити форму запису"
              className="absolute top-3 right-3 z-20 flex h-11 w-11 items-center justify-center rounded-lg border border-white/25 bg-black/50 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col lg:flex-row">
              <aside className="relative hidden overflow-hidden bg-[linear-gradient(160deg,#24479f_0%,#1b3576_55%,#0d1a3d_100%)] p-5 sm:p-7 lg:block lg:w-[40%] lg:p-10">
                <div
                  className="pointer-events-none absolute inset-0 opacity-40"
                  style={{
                    backgroundImage:
                      "radial-gradient(rgba(255,255,255,0.16) 0.8px, transparent 0.8px)",
                    backgroundSize: "10px 10px",
                  }}
                />
                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl border border-white/25 bg-white/10 sm:h-14 sm:w-14">
                    <Sparkles className="h-6 w-6 text-white sm:h-7 sm:w-7" />
                  </div>

                  <h2
                    id="booking-modal-title"
                    className="mb-3 font-display text-3xl font-semibold leading-[1.05] text-white sm:text-4xl"
                  >
                    Запис на візит
                  </h2>
                  <p id="booking-modal-description" className="mb-8 max-w-md text-base leading-relaxed text-blue-50">
                    Оберіть послугу, залиште контакти й зручний час. Ми підтвердимо візит у робочий час.
                  </p>

                  <div className="mb-8 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-white/25 bg-black/25 p-3.5">
                      <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-blue-100">
                        Графік
                      </div>
                      <div className="text-sm font-semibold text-white">Пн–Сб 09–20</div>
                    </div>
                    <div className="rounded-xl border border-white/25 bg-black/25 p-3.5">
                      <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-blue-100">
                        Телефон
                      </div>
                      <a
                        href={`tel:${BUSINESS_INFO.phoneE164}`}
                        className="text-sm font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
                      >
                        {BUSINESS_INFO.phoneDisplay}
                      </a>
                    </div>
                  </div>

                  <div className="mt-auto space-y-3">
                    {trustHighlights.map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-center gap-3 text-white">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/25 bg-black/25">
                          <Icon size={15} className="text-blue-100" />
                        </span>
                        <span className="text-[12px] font-medium tracking-[0.02em]">{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>

              <section className="relative w-full p-5 sm:p-7 lg:w-[60%] lg:p-10">
                <div className="mb-6 flex items-center gap-3 pr-12 lg:hidden">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-white/[0.06]">
                    <Sparkles className="h-5 w-5 text-[#8fb0ff]" aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="font-display text-2xl font-semibold leading-none text-white">
                      Запис на візит
                    </h2>
                    <p className="mt-1 text-xs text-[#aab3c2]">Пн–Сб 09:00–20:00</p>
                  </div>
                </div>
                {delivery ? (
                  <motion.div
                    ref={successRef}
                    tabIndex={-1}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex h-full flex-col items-center justify-center py-6 text-center outline-none"
                  >
                    <motion.div
                      initial={{ scale: 0.4, opacity: 0, rotate: -12 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                      className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-500/15"
                    >
                      <CheckCircle2 className="h-10 w-10 text-emerald-300" />
                    </motion.div>

                    {isWhatsApp ? (
                      <>
                        <h3 className="mb-3 font-display text-2xl font-semibold text-white sm:text-3xl">
                          Заявку сформовано
                        </h3>
                        <p className="mb-6 max-w-md text-base leading-relaxed text-[#c3cad6]">
                          Ми відкрили WhatsApp із готовим текстом заявки. Натисніть «Надіслати» в
                          месенджері — і ми підтвердимо візит.
                        </p>
                        <a
                          href={delivery.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-emerald-500 px-6 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#04210f] transition-colors hover:bg-emerald-400 sm:w-auto"
                        >
                          <MessageCircle size={17} />
                          Відкрити WhatsApp
                        </a>
                        <p className="mt-5 text-sm text-[#aab3c2]">
                          Не відкрилося? Зателефонуйте{" "}
                          <a
                            href={`tel:${BUSINESS_INFO.phoneE164}`}
                            className="font-semibold text-white underline decoration-white/40 underline-offset-4"
                          >
                            {BUSINESS_INFO.phoneDisplay}
                          </a>
                        </p>
                      </>
                    ) : (
                      <>
                        <h3 className="mb-3 font-display text-2xl font-semibold text-white sm:text-3xl">
                          Дякуємо!
                        </h3>
                        <p className="mb-6 max-w-md text-base leading-relaxed text-[#c3cad6]">
                          Заявку надіслано. Ми зв'яжемося з вами в робочий час, щоб підтвердити
                          деталі візиту.
                        </p>
                      </>
                    )}

                    <button
                      type="button"
                      onClick={onClose}
                      className="mt-8 text-[11px] font-bold uppercase tracking-[0.22em] text-[#8fb0ff] transition-colors hover:text-white"
                    >
                      Повернутися на сайт
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleBookingSubmit} noValidate className="space-y-5">
                    {Object.keys(errors).length > 0 && (
                      <div
                        role="alert"
                        className="rounded-lg border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm leading-relaxed text-red-200"
                      >
                        Перевірте, будь ласка, поля: {Object.values(errors).join("; ")}.
                      </div>
                    )}
                    <div>
                      <label
                        htmlFor="booking-service"
                        className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-[#aab3c2]"
                      >
                        Послуга
                      </label>
                      <div className="relative">
                        <select
                          id="booking-service"
                          data-autofocus
                          value={formData.service}
                          onChange={(e) => update("service", e.target.value)}
                          className={`${inputBase} ${inputOk} appearance-none pr-12`}
                        >
                          {services.map((service) => (
                            <option key={service.id} value={service.title} className="bg-[#06080f]">
                              {service.title} — {service.price}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#aab3c2]" />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="booking-name"
                          className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-[#aab3c2]"
                        >
                          Ваше ім'я
                        </label>
                        <input
                          id="booking-name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          required
                          aria-invalid={Boolean(errors.name)}
                          aria-describedby={errors.name ? "booking-name-error" : undefined}
                          value={formData.name}
                          onChange={(e) => update("name", e.target.value)}
                          className={`${inputBase} ${errors.name ? "border-red-400" : inputOk}`}
                          placeholder="Олександр"
                        />
                        {errors.name && (
                          <p id="booking-name-error" className="mt-2 text-sm text-red-300">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="booking-phone"
                          className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-[#aab3c2]"
                        >
                          Телефон
                        </label>
                        <input
                          id="booking-phone"
                          name="phone"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          required
                          aria-invalid={Boolean(errors.phone)}
                          aria-describedby={errors.phone ? "booking-phone-error" : undefined}
                          value={formData.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          onBlur={(e) => update("phone", formatPhone(e.target.value))}
                          className={`${inputBase} ${errors.phone ? "border-red-400" : inputOk}`}
                          placeholder="+38 (0XX) XXX-XX-XX"
                        />
                        {errors.phone && (
                          <p id="booking-phone-error" className="mt-2 text-sm text-red-300">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="booking-date"
                          className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-[#aab3c2]"
                        >
                          Бажана дата <span className="normal-case tracking-normal text-[#8b93a3]">(необов'язково)</span>
                        </label>
                        <input
                          id="booking-date"
                          name="date"
                          type="date"
                          min={todayIsoDate()}
                          max={maxBookingDate()}
                          aria-invalid={Boolean(errors.date)}
                          aria-describedby={errors.date ? "booking-date-error" : undefined}
                          value={formData.date}
                          onChange={(e) => update("date", e.target.value)}
                          className={`${inputBase} ${errors.date ? "border-red-400" : inputOk} [color-scheme:dark]`}
                        />
                        {errors.date && (
                          <p id="booking-date-error" className="mt-2 text-sm text-red-300">
                            {errors.date}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="booking-time"
                          className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-[#aab3c2]"
                        >
                          Бажаний час <span className="normal-case tracking-normal text-[#8b93a3]">(необов'язково)</span>
                        </label>
                        <div className="relative">
                          <select
                            id="booking-time"
                            value={formData.time}
                            onChange={(e) => update("time", e.target.value)}
                            aria-invalid={Boolean(errors.time)}
                            aria-describedby={errors.time ? "booking-time-error" : undefined}
                            className={`${inputBase} ${errors.time ? "border-red-400" : inputOk} appearance-none pr-12`}
                          >
                            <option value="" className="bg-[#06080f]">
                              Будь-який час
                            </option>
                            {TIME_SLOTS.map((slot) => {
                              const past = isPastSlot(formData.date, slot);
                              return (
                                <option
                                  key={slot}
                                  value={slot}
                                  disabled={past}
                                  className="bg-[#06080f]"
                                >
                                  {past ? `${slot} — уже минув` : slot}
                                </option>
                              );
                            })}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#aab3c2]" />
                        </div>
                        {errors.time && (
                          <p id="booking-time-error" className="mt-2 text-sm text-red-300">
                            {errors.time}
                          </p>
                        )}
                        {formData.date && isSunday(formData.date) && (
                          <p className="mt-2 text-xs leading-relaxed text-[#d5b57a]">
                            Неділя — за попереднім записом. Ми підтвердимо час телефоном.
                          </p>
                        )}
                        {formData.date === todayIsoDate() && (
                          <p className="mt-2 text-xs leading-relaxed text-[#8b93a3]">
                            Слоти, що вже минули, недоступні.
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="booking-comment"
                        className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-[#aab3c2]"
                      >
                        Коментар <span className="normal-case tracking-normal text-[#8b93a3]">(необов'язково)</span>
                      </label>
                      <textarea
                        id="booking-comment"
                        name="comment"
                        rows={3}
                        maxLength={600}
                        value={formData.comment}
                        onChange={(e) => update("comment", e.target.value)}
                        className={`${inputBase} ${inputOk} resize-y`}
                        placeholder="Марка авто, стан, побажання"
                      />
                    </div>

                    <div>
                      <label htmlFor="booking-consent" className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-[#c3cad6]">
                        <input
                          id="booking-consent"
                          name="consent"
                          type="checkbox"
                          checked={formData.consent}
                          onChange={(e) => update("consent", e.target.checked)}
                          aria-invalid={Boolean(errors.consent)}
                          aria-describedby={errors.consent ? "booking-consent-error" : undefined}
                          className="mt-0.5 h-5 w-5 shrink-0 rounded border-white/30 bg-[#0a1022] accent-[#4f7cff]"
                        />
                        <span>
                          Погоджуюся з{" "}
                          <Link to="/privacy" className="text-white underline decoration-white/40 underline-offset-4 hover:decoration-white">
                            політикою конфіденційності
                          </Link>{" "}
                          і обробкою моїх даних для підтвердження запису.
                        </span>
                      </label>
                      {errors.consent && (
                        <p id="booking-consent-error" className="mt-2 text-sm text-red-300">
                          {errors.consent}
                        </p>
                      )}
                    </div>

                    <div aria-hidden="true" className="hidden">
                      <label htmlFor="booking-website">Website</label>
                      <input
                        id="booking-website"
                        name="website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={formData.website}
                        onChange={(e) => update("website", e.target.value)}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-shine group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#2a63f6] to-[#3a76ff] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition-all hover:from-[#3a76ff] hover:to-[#4a86ff] disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      ) : (
                        <>
                          Записатися <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>

                    {submitError && (
                      <p role="alert" className="rounded-lg border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm leading-relaxed text-red-200">
                        {submitError}
                      </p>
                    )}

                    <div aria-live="polite" className="space-y-2">
                      <p className="flex items-start gap-2 text-[12px] leading-relaxed text-[#aab3c2]">
                        <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#8fb0ff]" />
                        <span>Без прихованих платежів: ціну погоджуємо перед стартом робіт.</span>
                      </p>
                      <p className="flex items-start gap-2 text-[12px] leading-relaxed text-[#aab3c2]">
                        <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#8fb0ff]" />
                        <span>
                          Потрібна допомога?{" "}
                          <a
                            href={`tel:${BUSINESS_INFO.phoneE164}`}
                            className="font-semibold text-white underline decoration-white/40 underline-offset-4"
                          >
                            {BUSINESS_INFO.phoneDisplay}
                          </a>
                        </span>
                      </p>
                    </div>
                  </form>
                )}
              </section>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
