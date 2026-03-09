import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";
import { SEO } from "../components/SEO";
import { BUSINESS_INFO } from "../siteContent";
import { submitContactRequest } from "../lib/submissions";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut" as const },
};

export const Contact = () => {
  const [contactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const [isContactSuccess, setIsContactSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validateContactForm = () => {
    const newErrors: Record<string, string> = {};

    if (!contactFormData.name.trim()) {
      newErrors.name = "Будь ласка, введіть ваше ім'я";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!contactFormData.email.trim()) {
      newErrors.email = "Будь ласка, введіть email";
    } else if (!emailRegex.test(contactFormData.email)) {
      newErrors.email = "Невірний формат email";
    }

    if (!contactFormData.message.trim()) {
      newErrors.message = "Будь ласка, введіть повідомлення";
    } else if (contactFormData.message.trim().length < 10) {
      newErrors.message = "Повідомлення має бути не менше 10 символів";
    }

    setContactErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateContactForm()) {
      return;
    }

    try {
      setSubmitError("");
      setIsContactSubmitting(true);
      await submitContactRequest(
        contactFormData.name.trim(),
        contactFormData.email.trim(),
        contactFormData.message.trim(),
      );
      setIsContactSuccess(true);
      setTimeout(() => {
        setIsContactSuccess(false);
        setContactFormData({ name: "", email: "", message: "" });
      }, 5000);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Failed to send message. Please try again.");
    } finally {
      setIsContactSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-20">
      <SEO
        title="Контакти"
        description="Зв'яжіться з нами для запису на детейлінг або сервіс у Києві: адреса, телефон, графік роботи та форма зворотного зв'язку."
        keywords="контакти детейлінг, запис на сервіс, детейлінг київ адреса"
        schema={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          mainEntity: {
            "@type": "AutoBodyShop",
            name: BUSINESS_INFO.brand,
            telephone: BUSINESS_INFO.phoneE164,
            email: BUSINESS_INFO.email,
            address: {
              "@type": "PostalAddress",
              streetAddress: BUSINESS_INFO.addressLine,
              addressLocality: BUSINESS_INFO.city,
              postalCode: BUSINESS_INFO.postalCode,
              addressCountry: "UA",
            },
          },
        }}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center mb-20">
          <span className="text-blue-500 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Контакти</span>
          <h1 className="text-5xl md:text-7xl font-bold font-display text-white mb-6">Зв'яжіться з нами</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
            Ми готові відповісти на запитання та підібрати оптимальний пакет послуг для вашого авто.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div {...fadeInUp}>
            <div className="space-y-12">
              {[
                {
                  icon: <MapPin className="w-8 h-8" />,
                  title: "Адреса",
                  content: `${BUSINESS_INFO.addressLine}, ${BUSINESS_INFO.city}, ${BUSINESS_INFO.country}`,
                },
                { icon: <Phone className="w-8 h-8" />, title: "Телефон", content: BUSINESS_INFO.phoneDisplay },
                { icon: <Mail className="w-8 h-8" />, title: "Email", content: BUSINESS_INFO.email },
                { icon: <Clock className="w-8 h-8" />, title: "Графік роботи", content: BUSINESS_INFO.workingHoursFull },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-8 group">
                  <div className="w-16 h-16 border border-white/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white font-display mb-2">{item.title}</h3>
                    <p className="text-gray-500 leading-relaxed">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 aspect-video bg-white/[0.02] border border-white/5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2300&auto=format&fit=crop')] grayscale opacity-30 group-hover:opacity-50 transition-opacity duration-700" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-blue-600 p-4 rounded-none shadow-2xl">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/[0.02] border border-white/5 p-12 relative"
          >
            <h3 className="text-2xl font-bold text-white font-display mb-10">Напишіть нам</h3>

            <form onSubmit={handleContactSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Ваше ім'я</label>
                <input
                  type="text"
                  value={contactFormData.name}
                  onChange={(e) => setContactFormData({ ...contactFormData, name: e.target.value })}
                  className={`w-full bg-transparent border-b ${contactErrors.name ? "border-red-500" : "border-white/10"} py-4 text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-gray-800`}
                  placeholder="Олександр Коваль"
                />
                {contactErrors.name && <p className="text-red-500 text-[10px] uppercase font-bold tracking-widest mt-2">{contactErrors.name}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Ваш Email</label>
                <input
                  type="email"
                  value={contactFormData.email}
                  onChange={(e) => setContactFormData({ ...contactFormData, email: e.target.value })}
                  className={`w-full bg-transparent border-b ${contactErrors.email ? "border-red-500" : "border-white/10"} py-4 text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-gray-800`}
                  placeholder="alex@example.com"
                />
                {contactErrors.email && <p className="text-red-500 text-[10px] uppercase font-bold tracking-widest mt-2">{contactErrors.email}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Повідомлення</label>
                <textarea
                  rows={4}
                  value={contactFormData.message}
                  onChange={(e) => setContactFormData({ ...contactFormData, message: e.target.value })}
                  className={`w-full bg-transparent border-b ${contactErrors.message ? "border-red-500" : "border-white/10"} py-4 text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-gray-800 resize-none`}
                  placeholder="Розкажіть нам про ваш запит..."
                />
                {contactErrors.message && <p className="text-red-500 text-[10px] uppercase font-bold tracking-widest mt-2">{contactErrors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isContactSubmitting}
                className="w-full py-6 bg-blue-600 text-white font-bold text-xs tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-all flex items-center justify-center gap-4 group disabled:opacity-50"
              >
                {isContactSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin" />
                ) : (
                  <>
                    Відправити <Send size={16} className="group-hover:translate-x-2 transition-transform" />
                  </>
                )}
              </button>

              {submitError && (
                <p className="text-red-400 text-xs leading-relaxed">{submitError}</p>
              )}
            </form>

            <AnimatePresence>
              {isContactSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute inset-0 bg-[#050505] flex flex-col items-center justify-center p-12 text-center z-20"
                >
                  <div className="w-20 h-20 bg-blue-600 flex items-center justify-center mb-8">
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold font-display text-white mb-4">Дякуємо!</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">Ваше повідомлення відправлено. Ми зв'яжемося з вами найближчим часом.</p>
                  <button
                    onClick={() => setIsContactSuccess(false)}
                    className="mt-12 text-blue-500 text-[10px] font-bold uppercase tracking-[0.3em] hover:text-white transition-colors"
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




