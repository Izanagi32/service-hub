import { useState, FormEvent } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import { About } from "./pages/About";
import { Team } from "./pages/Team";
import { Contact } from "./pages/Contact";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsOfService } from "./pages/TermsOfService";
import { BookingModal } from "./components/BookingModal";
import { Analytics } from "./components/Analytics";
import { services } from "./constants";
import { submitBookingRequest } from "./lib/submissions";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServiceTitle, setSelectedServiceTitle] = useState(services[0].title);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: services[0].title,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const openModal = () => {
    setSubmitError("");
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setSubmitError("");
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
      newErrors.phone = "Невірний формат номера (наприклад 0991234567)";
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

      setTimeout(() => {
        setIsSuccess(false);
        closeModal();
        setFormData({ name: "", phone: "", service: services[0].title });
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services openModal={openModal} />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
        </Routes>
      </Layout>

      <BookingModal
        isOpen={isModalOpen}
        onClose={closeModal}
        services={services}
        selectedServiceTitle={selectedServiceTitle}
        setSelectedServiceTitle={setSelectedServiceTitle}
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




