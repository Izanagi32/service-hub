import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle2, Sparkles, ShieldCheck, Trophy } from "lucide-react";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { Service } from "../constants";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: Service[];
  selectedServiceTitle: string;
  setSelectedServiceTitle: (title: string) => void;
  formData: { name: string; phone: string; service: string };
  setFormData: Dispatch<SetStateAction<{ name: string; phone: string; service: string }>>;
  errors: Record<string, string>;
  isSubmitting: boolean;
  isSuccess: boolean;
  handleBookingSubmit: (e: FormEvent) => void;
}

export const BookingModal = ({
  isOpen,
  onClose,
  services,
  selectedServiceTitle,
  setSelectedServiceTitle,
  formData,
  setFormData,
  errors,
  isSubmitting,
  isSuccess,
  handleBookingSubmit,
}: BookingModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-5xl bg-[#080808] border border-white/10 overflow-hidden flex flex-col md:flex-row"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-white z-20">
              <X size={24} />
            </button>

            <div className="w-full md:w-1/2 p-8 md:p-12 bg-blue-600 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />

              <div className="relative z-10 h-full flex flex-col">
                <div className="mb-12">
                  <div className="w-12 h-12 bg-white/10 flex items-center justify-center mb-6">
                    <Sparkles className="text-white w-6 h-6" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold font-display text-white mb-4">Запис на візит</h2>
                  <p className="text-blue-100/70 text-sm leading-relaxed">
                    Оберіть послугу та залиште контакти. Наш менеджер зв'яжеться з вами протягом 15 хвилин для підтвердження.
                  </p>
                </div>

                <div className="mt-auto space-y-6">
                  {[
                    { icon: <ShieldCheck size={18} />, text: "Гарантія на всі роботи" },
                    { icon: <Trophy size={18} />, text: "Сертифіковані майстри" },
                    { icon: <Sparkles size={18} />, text: "Преміум матеріали" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 text-white/80">
                      <div className="text-blue-300">{item.icon}</div>
                      <span className="text-xs font-bold uppercase tracking-widest">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 p-8 md:p-12 bg-[#080808] relative">
              {isSuccess ? (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-blue-600 flex items-center justify-center mb-8">
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold font-display text-white mb-4">Дякуємо!</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">Ваш запит відправлено. Менеджер скоро зателефонує.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Послуга</label>
                    <select
                      value={selectedServiceTitle}
                      onChange={(e) => {
                        setSelectedServiceTitle(e.target.value);
                        setFormData({ ...formData, service: e.target.value });
                      }}
                      className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
                    >
                      {services.map((s) => (
                        <option key={s.id} value={s.title} className="bg-[#080808]">
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Ваше ім'я</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full bg-transparent border-b ${errors.name ? "border-red-500" : "border-white/10"} py-4 text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-gray-800`}
                      placeholder="Олександр"
                    />
                    {errors.name && <p className="text-red-500 text-[10px] uppercase font-bold tracking-widest mt-2">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Телефон</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full bg-transparent border-b ${errors.phone ? "border-red-500" : "border-white/10"} py-4 text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-gray-800`}
                      placeholder="+38 (0__) ___ __ __"
                    />
                    {errors.phone && <p className="text-red-500 text-[10px] uppercase font-bold tracking-widest mt-2">{errors.phone}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-6 bg-blue-600 text-white font-bold text-xs tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-all flex items-center justify-center gap-4 group disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin" />
                    ) : (
                      <>
                        Записатися <X size={16} className="rotate-45 group-hover:translate-x-2 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};