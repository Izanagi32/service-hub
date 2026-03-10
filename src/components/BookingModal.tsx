import { motion, AnimatePresence } from "motion/react";
import {
  X,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Trophy,
  Clock3,
  BadgeCheck,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { Service } from "../constants";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: Service[];
  formData: { name: string; phone: string; service: string };
  setFormData: Dispatch<SetStateAction<{ name: string; phone: string; service: string }>>;
  errors: Record<string, string>;
  isSubmitting: boolean;
  isSuccess: boolean;
  submitError?: string;
  handleBookingSubmit: (e: FormEvent) => void;
}

const trustHighlights: Array<{ icon: typeof ShieldCheck; text: string }> = [
  { icon: ShieldCheck, text: "Гарантія на всі роботи" },
  { icon: Trophy, text: "Сертифіковані майстри" },
  { icon: Sparkles, text: "Преміум матеріали" },
];

export const BookingModal = ({
  isOpen,
  onClose,
  services,
  formData,
  setFormData,
  errors,
  isSubmitting,
  isSuccess,
  submitError,
  handleBookingSubmit,
}: BookingModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-[1160px] overflow-hidden rounded-[28px] border border-white/12 bg-[#040712]/95 shadow-[0_40px_120px_rgba(0,0,0,0.62)] flex flex-col md:flex-row"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
          >
            <button
              onClick={onClose}
              type="button"
              aria-label="Закрити форму запису"
              className="absolute top-5 right-5 z-20 w-11 h-11 rounded-lg border border-white/20 bg-black/35 text-white/65 hover:text-white hover:border-white/35 hover:bg-white/10 transition-all flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300/50"
            >
              <X size={20} />
            </button>

            <aside className="w-full md:w-[43%] p-7 md:p-10 lg:p-12 relative overflow-hidden bg-[linear-gradient(160deg,#2963ff_0%,#2148b7_56%,#0f1e4d_100%)]">
              <div
                className="absolute inset-0 pointer-events-none opacity-45"
                style={{
                  backgroundImage: "radial-gradient(rgba(255,255,255,0.14) 0.8px, transparent 0.8px)",
                  backgroundSize: "10px 10px",
                }}
              />
              <div className="absolute -top-20 -left-10 w-56 h-56 rounded-full bg-white/12 blur-2xl pointer-events-none" />
              <div className="absolute -bottom-24 -right-12 w-56 h-56 rounded-full bg-[#d5b57a]/22 blur-2xl pointer-events-none" />

              <div className="relative z-10 h-full flex flex-col">
                <div className="mb-10">
                  <div className="w-14 h-14 rounded-xl border border-white/25 bg-white/10 flex items-center justify-center mb-6 shadow-[0_10px_24px_rgba(0,0,0,0.2)]">
                    <Sparkles className="text-white w-7 h-7" />
                  </div>
                  <h2 id="booking-modal-title" className="text-4xl md:text-5xl font-bold font-display text-white mb-4 leading-[0.95]">
                    Запис на візит
                  </h2>
                  <p className="text-blue-50/88 text-base leading-relaxed max-w-md">
                    Оберіть послугу та залиште контакти. Наш менеджер зв'яжеться з вами протягом 15 хвилин для підтвердження деталей.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-9">
                  <div className="rounded-xl border border-white/22 bg-black/22 backdrop-blur-sm p-3.5">
                    <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-100/80 mb-1">Відповідь</div>
                    <div className="text-white text-sm font-semibold">до 15 хв</div>
                  </div>
                  <div className="rounded-xl border border-white/22 bg-black/22 backdrop-blur-sm p-3.5">
                    <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-100/80 mb-1">Графік</div>
                    <div className="text-white text-sm font-semibold">09:00-20:00</div>
                  </div>
                </div>

                <div className="mt-auto space-y-4">
                  {trustHighlights.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.text} className="flex items-center gap-3 text-white/90">
                        <div className="w-9 h-9 rounded-lg border border-white/22 bg-black/25 flex items-center justify-center">
                          <Icon size={16} className="text-blue-100" />
                        </div>
                        <span className="text-[13px] font-semibold uppercase tracking-[0.14em]">{item.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </aside>

            <section className="w-full md:w-[57%] p-7 md:p-10 lg:p-12 bg-[#040712] relative">
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(52,112,255,0.18),transparent_36%)]" />

              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative z-10 h-full flex flex-col items-center justify-center text-center"
                >
                  <div className="w-24 h-24 rounded-full border border-blue-400/50 bg-blue-500/15 flex items-center justify-center mb-7">
                    <CheckCircle2 className="w-12 h-12 text-blue-300" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold font-display text-white mb-4">Дякуємо!</h3>
                  <p className="text-gray-300 text-base leading-relaxed max-w-md">
                    Ваш запит успішно відправлено. Менеджер зв'яжеться з вами найближчим часом для підтвердження візиту.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="relative z-10 space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="booking-service" className="text-[11px] font-bold uppercase tracking-[0.22em] text-gray-400">
                      Послуга
                    </label>
                    <div className="relative">
                      <select
                        id="booking-service"
                        value={formData.service}
                        onChange={(e) => {
                          setFormData({ ...formData, service: e.target.value });
                        }}
                        className="w-full rounded-xl bg-[#0a1022]/95 border border-white/15 px-4 py-4 pr-12 text-white text-[17px] md:text-[18px] leading-[1.2] font-medium focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/25 transition-colors appearance-none"
                      >
                        {services.map((service) => (
                          <option key={service.id} value={service.title} className="bg-[#06080f] text-white">
                            {service.title}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="booking-name" className="text-[11px] font-bold uppercase tracking-[0.22em] text-gray-400">
                      Ваше ім'я
                    </label>
                    <input
                      id="booking-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      aria-invalid={Boolean(errors.name)}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full rounded-xl bg-[#0a1022]/95 border px-4 py-4 text-white text-[17px] md:text-[18px] leading-[1.2] focus:outline-none transition-colors placeholder:text-[#4a6096]/90 ${
                        errors.name ? "border-red-500" : "border-white/15 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/25"
                      }`}
                      placeholder="Олександр"
                    />
                    {errors.name && <p className="text-red-400 text-xs leading-relaxed">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="booking-phone" className="text-[11px] font-bold uppercase tracking-[0.22em] text-gray-400">
                      Телефон
                    </label>
                    <input
                      id="booking-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      aria-invalid={Boolean(errors.phone)}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full rounded-xl bg-[#0a1022]/95 border px-4 py-4 text-[17px] md:text-[18px] text-white leading-[1.2] focus:outline-none transition-colors placeholder:text-[#4a6096]/90 ${
                        errors.phone ? "border-red-500" : "border-white/15 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/25"
                      }`}
                      placeholder="+38 (0__) ___ __ __"
                    />
                    {errors.phone && <p className="text-red-400 text-xs leading-relaxed">{errors.phone}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative overflow-hidden w-full rounded-xl border border-blue-300/20 py-4 md:py-5 bg-gradient-to-r from-[#1e5fff] to-[#2a69f0] text-white font-bold text-[11px] tracking-[0.34em] uppercase hover:from-[#3470ff] hover:to-[#3c79ff] transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-[0_14px_34px_rgba(36,94,255,0.35)]"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    {isSubmitting ? (
                      <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    ) : (
                      <>
                        Записатися <ArrowRight size={16} />
                      </>
                    )}
                  </button>

                  <div className="inline-flex items-start gap-2 text-[12px] text-gray-400 leading-relaxed">
                    <BadgeCheck className="w-4 h-4 text-blue-300 mt-0.5" />
                    <span>Без прихованих платежів. Узгоджуємо ціну перед стартом робіт.</span>
                  </div>

                  <div className="inline-flex items-start gap-2 text-[12px] text-gray-400 leading-relaxed">
                    <Clock3 className="w-4 h-4 text-blue-300 mt-0.5" />
                    <span>Підтвердження заявки в робочий час до 15 хвилин.</span>
                  </div>

                  {submitError && (
                    <p className="border border-red-500/40 bg-red-500/10 px-4 py-3 rounded-lg text-red-300 text-sm leading-relaxed">
                      {submitError}
                    </p>
                  )}
                </form>
              )}
            </section>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
