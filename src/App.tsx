import { lazy, Suspense, useCallback, useRef, useState, FormEvent } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Layout } from "./components/layout/Layout";
import { BookingModal } from "./components/BookingModal";
import { Analytics } from "./components/Analytics";
import { Home } from "./pages/Home";
import { services } from "./constants";
import { submitBookingRequest, type DeliveryResult } from "./lib/submissions";
import { isPastSlot, isValidPhone, todayIsoDate } from "./lib/validation";
import { trackEvent } from "./lib/analytics";

const Services = lazy(() => import("./pages/Services").then((m) => ({ default: m.Services })));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail").then((m) => ({ default: m.ServiceDetail })));
const About = lazy(() => import("./pages/About").then((m) => ({ default: m.About })));
const Team = lazy(() => import("./pages/Team").then((m) => ({ default: m.Team })));
const Contact = lazy(() => import("./pages/Contact").then((m) => ({ default: m.Contact })));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy").then((m) => ({ default: m.PrivacyPolicy })));
const TermsOfService = lazy(() => import("./pages/TermsOfService").then((m) => ({ default: m.TermsOfService })));
const NotFound = lazy(() => import("./pages/NotFound").then((m) => ({ default: m.NotFound })));

const AnimatedRoutes = ({ openModal }: { openModal: (serviceTitle?: string) => void }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.24, ease: "easeOut" }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home openModal={openModal} />} />
          <Route path="/services" element={<Services openModal={openModal} />} />
          <Route path="/services/:slug" element={<ServiceDetail openModal={openModal} />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

export interface BookingFormState {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  comment: string;
  consent: boolean;
  website: string;
}

const defaultServiceTitle = services[0]?.title ?? "";

const emptyForm = (): BookingFormState => ({
  name: "",
  phone: "",
  service: defaultServiceTitle,
  date: "",
  time: "",
  comment: "",
  consent: false,
  website: "",
});

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<BookingFormState>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [delivery, setDelivery] = useState<DeliveryResult | null>(null);
  const [submitError, setSubmitError] = useState("");

  const submitLock = useRef(false);
  const deliveryRef = useRef<DeliveryResult | null>(null);
  deliveryRef.current = delivery;

  const openModal = useCallback((serviceTitle?: string) => {
    setSubmitError("");
    setErrors({});
    setDelivery(null);
    setFormData((prev) => ({
      ...prev,
      service: serviceTitle ?? prev.service ?? defaultServiceTitle,
    }));
    setIsModalOpen(true);
    trackEvent("booking_open", { service: serviceTitle ?? defaultServiceTitle });
  }, []);

  const closeModal = useCallback(() => {
    setSubmitError("");
    setErrors({});
    setDelivery(null);
    setIsModalOpen(false);

    // Do not keep personal data or a pre-ticked consent after a successful request.
    setFormData((prev) =>
      deliveryRef.current ? emptyForm() : { ...prev, consent: false },
    );
  }, []);

  const validateForm = (): boolean => {
    const nextErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      nextErrors.name = "Вкажіть, будь ласка, ваше ім'я";
    } else if (formData.name.trim().length < 2) {
      nextErrors.name = "Ім'я має містити щонайменше 2 символи";
    }

    if (!formData.phone.trim()) {
      nextErrors.phone = "Вкажіть номер телефону";
    } else if (!isValidPhone(formData.phone)) {
      nextErrors.phone = "Перевірте номер: потрібен формат 0XX XXX XX XX";
    }

    if (formData.date && formData.date < todayIsoDate()) {
      nextErrors.date = "Дата не може бути в минулому";
    }

    if (formData.date && formData.time && isPastSlot(formData.date, formData.time)) {
      nextErrors.time = "Цей час уже минув — оберіть пізніший";
    }

    if (!formData.consent) {
      nextErrors.consent = "Потрібна згода на обробку персональних даних";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      window.requestAnimationFrame(() => {
        document
          .querySelector<HTMLElement>('[role="dialog"] [aria-invalid="true"]')
          ?.focus({ preventScroll: false });
      });
      return false;
    }

    return true;
  };

  const handleBookingSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (submitLock.current) return;
    submitLock.current = true;

    try {
      if (!validateForm()) {
        trackEvent("booking_validation_error");
        return;
      }

      // Honeypot: real users never see or fill this field.
      if (formData.website.trim()) {
        return;
      }

      setSubmitError("");
      setIsSubmitting(true);

      const consentAt = new Date().toISOString();
      const result = await submitBookingRequest({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        service: formData.service,
        date: formData.date || undefined,
        time: formData.time || undefined,
        comment: formData.comment.trim() || undefined,
        consent: true,
        consentAt,
      });

      if (result.channel === "whatsapp") {
        window.open(result.url, "_blank", "noopener,noreferrer");
      }

      setDelivery(result);
      setFormData((prev) => ({ ...prev, consent: true }));
      trackEvent("booking_submit", {
        channel: result.channel,
        service: formData.service,
      });
    } catch (error) {
      trackEvent("booking_error", { message: error instanceof Error ? error.message : "unknown" });
      setSubmitError(
        error instanceof Error ? error.message : "Не вдалося надіслати запит. Спробуйте ще раз.",
      );
    } finally {
      submitLock.current = false;
      setIsSubmitting(false);
    }
  };

  const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

  return (
    <Router basename={basename}>
      <Analytics />

      <Layout openModal={openModal}>
        <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center text-sm uppercase tracking-[0.12em] text-[#8b93a3]">
              Завантаження…
            </div>
          }
        >
          <AnimatedRoutes openModal={openModal} />
        </Suspense>
      </Layout>

      <BookingModal
        isOpen={isModalOpen}
        onClose={closeModal}
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        isSubmitting={isSubmitting}
        delivery={delivery}
        submitError={submitError}
        handleBookingSubmit={handleBookingSubmit}
      />
    </Router>
  );
}
