import { env } from "../env";
import { PRIVACY_VERSION, whatsappLink } from "../siteContent";

export interface BookingRequest {
  name: string;
  phone: string;
  service: string;
  date?: string;
  time?: string;
  comment?: string;
  consent: boolean;
  consentAt: string;
}

export interface ContactRequest {
  name: string;
  phone: string;
  email: string;
  message: string;
  consent: boolean;
  consentAt: string;
}

export type DeliveryResult =
  | { channel: "webhook" }
  | { channel: "whatsapp"; url: string };

interface LeadPayload extends Record<string, unknown> {
  source: "booking-modal" | "contact-form";
  pageUrl: string;
  userAgent: string;
  submittedAt: string;
  consent: boolean;
  consentAt: string;
  consentVersion: string;
  referrer: string;
}

const wait = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

const postJson = async (url: string, payload: LeadPayload): Promise<void> => {
  let lastError: Error | null = null;

  // One retry covers short network hiccups without double-charging the user with requests.
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      });

      if (response.ok) return;

      lastError = new Error(
        `Сервер відхилив заявку (код ${response.status}). Спробуйте ще раз або зателефонуйте.`,
      );

      // 4xx will not become successful on retry.
      if (response.status < 500) break;
    } catch {
      lastError = new Error(
        "Не вдалося зв'язатися із сервером. Перевірте з'єднання або зателефонуйте нам.",
      );
    }

    if (attempt === 0) await wait(600);
  }

  throw lastError ?? new Error("Не вдалося надіслати заявку. Спробуйте ще раз.");
};

const buildMeta = () => ({
  pageUrl: window.location.href,
  userAgent: navigator.userAgent,
  submittedAt: new Date().toISOString(),
  consentVersion: PRIVACY_VERSION,
  referrer: document.referrer,
});

const buildBookingMessage = (data: BookingRequest): string => {
  const lines = [
    "Заявка з сайту HubService",
    `Ім'я: ${data.name}`,
    `Телефон: ${data.phone}`,
    `Послуга: ${data.service}`,
  ];

  if (data.date) lines.push(`Бажана дата: ${data.date}`);
  if (data.time) lines.push(`Бажаний час: ${data.time}`);
  if (data.comment) lines.push(`Коментар: ${data.comment}`);

  lines.push(`Сторінка: ${window.location.href}`);
  return lines.join("\n");
};

const buildContactMessage = (data: ContactRequest): string =>
  [
    "Повідомлення з сайту HubService",
    `Ім'я: ${data.name}`,
    `Телефон: ${data.phone || "не вказано"}`,
    `Email: ${data.email}`,
    `Повідомлення: ${data.message}`,
  ].join("\n");

/**
 * Sends the booking lead to the configured webhook.
 * Without a webhook the lead is handed over to WhatsApp with a prefilled message,
 * so the visitor never sees a fake "success" for a request that was not delivered.
 */
export const submitBookingRequest = async (
  data: BookingRequest,
): Promise<DeliveryResult> => {
  const payload: LeadPayload = {
    ...data,
    source: "booking-modal",
    ...buildMeta(),
  };

  if (env.bookingWebhookUrl) {
    await postJson(env.bookingWebhookUrl, payload);
    return { channel: "webhook" };
  }

  return { channel: "whatsapp", url: whatsappLink(buildBookingMessage(data)) };
};

export const submitContactRequest = async (
  data: ContactRequest,
): Promise<DeliveryResult> => {
  const payload: LeadPayload = {
    ...data,
    source: "contact-form",
    ...buildMeta(),
  };

  if (env.contactWebhookUrl) {
    await postJson(env.contactWebhookUrl, payload);
    return { channel: "webhook" };
  }

  return { channel: "whatsapp", url: whatsappLink(buildContactMessage(data)) };
};
