import { env } from "../env";

export interface BookingPayload {
  name: string;
  phone: string;
  service: string;
  source: string;
  pageUrl: string;
  userAgent: string;
  submittedAt: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
  source: string;
  pageUrl: string;
  userAgent: string;
  submittedAt: string;
}

const postJson = async (url: string, payload: BookingPayload | ContactPayload): Promise<void> => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Помилка надсилання запиту, код статусу ${response.status}`);
  }
};

const wait = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

export const submitBookingRequest = async (name: string, phone: string, service: string): Promise<void> => {
  const payload: BookingPayload = {
    name,
    phone,
    service,
    source: "booking-modal",
    pageUrl: window.location.href,
    userAgent: navigator.userAgent,
    submittedAt: new Date().toISOString(),
  };

  if (env.bookingWebhookUrl) {
    await postJson(env.bookingWebhookUrl, payload);
    return;
  }

  await wait(1200);
};

export const submitContactRequest = async (name: string, email: string, message: string): Promise<void> => {
  const payload: ContactPayload = {
    name,
    email,
    message,
    source: "contact-form",
    pageUrl: window.location.href,
    userAgent: navigator.userAgent,
    submittedAt: new Date().toISOString(),
  };

  if (env.contactWebhookUrl) {
    await postJson(env.contactWebhookUrl, payload);
    return;
  }

  await wait(1200);
};
