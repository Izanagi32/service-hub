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
    throw new Error(`Request delivery failed, status code ${response.status}`);
  }
};

const wait = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

const sendTelegramMessage = async (text: string): Promise<void> => {
  if (!env.telegramBotToken || !env.telegramChatId) {
    return;
  }

  const response = await fetch(`https://api.telegram.org/bot${env.telegramBotToken}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: env.telegramChatId,
      text,
    }),
  });

  if (!response.ok) {
    throw new Error(`Telegram delivery failed, status code ${response.status}`);
  }
};

const sendBookingToTelegram = async (payload: BookingPayload): Promise<void> => {
  const text = [
    "New booking request",
    "",
    `Service: ${payload.service}`,
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    `Source: ${payload.source}`,
    `Page: ${payload.pageUrl}`,
    `Time: ${payload.submittedAt}`,
  ].join("\n");

  await sendTelegramMessage(text);
};

const sendContactToTelegram = async (payload: ContactPayload): Promise<void> => {
  const text = [
    "New contact message",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Message: ${payload.message}`,
    `Source: ${payload.source}`,
    `Page: ${payload.pageUrl}`,
    `Time: ${payload.submittedAt}`,
  ].join("\n");

  await sendTelegramMessage(text);
};

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

  const deliveries: Array<Promise<void>> = [];

  if (env.bookingWebhookUrl) {
    deliveries.push(postJson(env.bookingWebhookUrl, payload));
  }

  if (env.telegramBotToken && env.telegramChatId) {
    deliveries.push(sendBookingToTelegram(payload));
  }

  if (deliveries.length === 0) {
    await wait(1200);
    return;
  }

  await Promise.all(deliveries);
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

  const deliveries: Array<Promise<void>> = [];

  if (env.contactWebhookUrl) {
    deliveries.push(postJson(env.contactWebhookUrl, payload));
  }

  if (env.telegramBotToken && env.telegramChatId) {
    deliveries.push(sendContactToTelegram(payload));
  }

  if (deliveries.length === 0) {
    await wait(1200);
    return;
  }

  await Promise.all(deliveries);
};
