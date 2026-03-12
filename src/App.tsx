import { lazy, Suspense, useEffect, useRef, useState, FormEvent } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { BookingModal } from "./components/BookingModal";
import { Analytics } from "./components/Analytics";
import { services } from "./constants";
import { submitBookingRequest } from "./lib/submissions";

const Home = lazy(() => import("./pages/Home").then((m) => ({ default: m.Home })));
const Services = lazy(() => import("./pages/Services").then((m) => ({ default: m.Services })));
const About = lazy(() => import("./pages/About").then((m) => ({ default: m.About })));
const Team = lazy(() => import("./pages/Team").then((m) => ({ default: m.Team })));
const Contact = lazy(() => import("./pages/Contact").then((m) => ({ default: m.Contact })));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy").then((m) => ({ default: m.PrivacyPolicy })));
const TermsOfService = lazy(() => import("./pages/TermsOfService").then((m) => ({ default: m.TermsOfService })));

export default function App() {
  const defaultServiceTitle = services[0]?.title ?? "";
  const successTimeoutRef = useRef<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: defaultServiceTitle,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    return () => {
      if (successTimeoutRef.current !== null) {
        window.clearTimeout(successTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const openModal = (serviceTitle?: string) => {
    setSubmitError("");
    setErrors({});
    setIsSuccess(false);
    if (serviceTitle) {
      setFormData((prev) => ({ ...prev, service: serviceTitle }));
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSubmitError("");
    setErrors({});
    setIsModalOpen(false);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Будь ласка, введіть ваше ім'я";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Ім'я має бути не менше 2 символів";
    }

    const phoneRegex = /^\+?3?8?(0\d{9})$/;
    const cleanPhone = formData.phone.replace(/[\s\-()]/g, "");

    if (!formData.phone.trim()) {
      newErrors.phone = "Будь ласка, введіть номер телефону";
    } else if (!phoneRegex.test(cleanPhone)) {
      newErrors.phone = "Невірний формат номера (наприклад 0671050555)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBookingSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      setSubmitError("");
      setIsSubmitting(true);
      await submitBookingRequest(formData.name.trim(), formData.phone.trim(), formData.service);
      setIsSuccess(true);

      if (successTimeoutRef.current !== null) {
        window.clearTimeout(successTimeoutRef.current);
      }
      successTimeoutRef.current = window.setTimeout(() => {
        setIsSuccess(false);
        closeModal();
        setFormData({ name: "", phone: "", service: defaultServiceTitle });
        successTimeoutRef.current = null;
      }, 3000);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Не вдалося надіслати запит. Спробуйте ще раз.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Analytics />

      <Layout openModal={openModal}>
        <Suspense
          fallback={
            <div className="min-h-[40vh] flex items-center justify-center text-gray-400 text-sm tracking-[0.12em] uppercase">
              Завантаження...
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services openModal={openModal} />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
          </Routes>
        </Suspense>
      </Layout>

      <BookingModal
        isOpen={isModalOpen}
        onClose={closeModal}
        services={services}
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        isSubmitting={isSubmitting}
        isSuccess={isSuccess}
        submitError={submitError}
        handleBookingSubmit={handleBookingSubmit}
      />
    </Router>
  );
}
