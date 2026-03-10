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
            className="relative w-full max-w-6xl overflow-hidden border border-white/15 bg-[#06080f]/95 shadow-[0_30px_80px_rgba(0,0,0,0.55)] rounded-2xl flex flex-col md:flex-row"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
          >
            <button
              onClick={onClose}
              type="button"
              aria-label="Закрити форму запису"
              className="absolute top-4 right-4 z-20 w-10 h-10 border border-white/15 bg-black/30 text-white/65 hover:text-white hover:border-white/35 transition-all flex items-center justify-center"
            >
              <X size={20} />
            </button>

            <aside className="w-full md:w-[44%] p-7 md:p-10 lg:p-12 relative overflow-hidden bg-gradient-to-br from-[#1f5cff] via-[#245bd8] to-[#173c93]">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.13] pointer-events-none" />
              <div className="absolute -top-20 -left-12 w-48 h-48 rounded-full bg-white/12 blur-2xl pointer-events-none" />
              <div className="absolute -bottom-20 -right-14 w-52 h-52 rounded-full bg-[#d5b57a]/28 blur-2xl pointer-events-none" />

              <div className="relative z-10 h-full flex flex-col">
                <div className="mb-10">
                  <div className="w-14 h-14 border border-white/25 bg-white/10 flex items-center justify-center mb-6">
                    <Sparkles className="text-white w-7 h-7" />
                  </div>
                  <h2 id="booking-modal-title" className="text-4xl md:text-5xl font-bold font-display text-white mb-4 leading-[0.95]">
                    Запис на візит
                  </h2>
                  <p className="text-blue-50/85 text-base leading-relaxed max-w-md">
                    Оберіть послугу та залиште контакти. Наш менеджер зв'яжеться з вами протягом 15 хвилин для підтвердження деталей.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-8">
                  <div className="border border-white/20 bg-black/20 p-3">
                    <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-100/80 mb-1">Відповідь</div>
                    <div className="text-white text-sm font-semibold">до 15 хв</div>
                  </div>
                  <div className="border border-white/20 bg-black/20 p-3">
                    <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-100/80 mb-1">Графік</div>
                    <div className="text-white text-sm font-semibold">09:00-20:00</div>
                  </div>
                </div>

                <div className="mt-auto space-y-4">
                  {trustHighlights.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.text} className="flex items-center gap-3 text-white/90">
                        <div className="w-9 h-9 border border-white/20 bg-black/20 flex items-center justify-center">
                          <Icon size={16} className="text-blue-100" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-[0.16em]">{item.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </aside>

            <section className="w-full md:w-[56%] p-7 md:p-10 lg:p-12 bg-[#06080f] relative">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center"
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
                <form onSubmit={handleBookingSubmit} className="space-y-7">
                  <div className="space-y-2">
                    <label htmlFor="booking-service" className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-400">
                      Послуга
                    </label>
                    <div className="relative">
                      <select
                        id="booking-service"
                        value={formData.service}
                        onChange={(e) => {
                          setFormData({ ...formData, service: e.target.value });
                        }}
                        className="w-full bg-white/[0.03] border border-white/12 px-5 py-4 text-white text-lg leading-none focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                      >
                        {services.map((service) => (
                          <option key={service.id} value={service.title} className="bg-[#06080f] text-white">
                            {service.title}
                          </option>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">▾</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="booking-name" className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-400">
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
                      className={`w-full bg-transparent border px-5 py-4 text-white text-[30px] md:text-[34px] leading-none focus:outline-none transition-colors placeholder:text-[#26365a] ${
                        errors.name ? "border-red-500" : "border-white/12 focus:border-blue-500"
                      }`}
                      placeholder="Олександр"
                    />
                    {errors.name && <p className="text-red-400 text-xs leading-relaxed">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="booking-phone" className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-400">
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
                      className={`w-full bg-transparent border px-5 py-4 text-[30px] md:text-[34px] text-white leading-none focus:outline-none transition-colors placeholder:text-[#26365a] ${
                        errors.phone ? "border-red-500" : "border-white/12 focus:border-blue-500"
                      }`}
                      placeholder="+38 (0__) ___ __ __"
                    />
                    {errors.phone && <p className="text-red-400 text-xs leading-relaxed">{errors.phone}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative overflow-hidden w-full py-6 bg-gradient-to-r from-[#1e5fff] to-[#2a69f0] text-white font-bold text-xs tracking-[0.36em] uppercase hover:from-[#3470ff] hover:to-[#3c79ff] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin" />
                    ) : (
                      <>
                        Записатися <ArrowRight size={16} />
                      </>
                    )}
                  </button>

                  <div className="inline-flex items-center gap-2 text-[11px] text-gray-400">
                    <BadgeCheck className="w-4 h-4 text-blue-300" />
                    <span>Без прихованих платежів. Узгоджуємо ціну перед стартом робіт.</span>
                  </div>

                  <div className="inline-flex items-center gap-2 text-[11px] text-gray-400">
                    <Clock3 className="w-4 h-4 text-blue-300" />
                    <span>Підтвердження заявки в робочий час до 15 хвилин.</span>
                  </div>

                  {submitError && (
                    <p className="border border-red-500/40 bg-red-500/10 px-4 py-3 text-red-300 text-sm leading-relaxed">
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
