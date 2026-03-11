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

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const formatSubmittedAt = (iso: string): string => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return iso;
  }

  return new Intl.DateTimeFormat("uk-UA", {
    timeZone: "Europe/Kyiv",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
};

const formatPage = (pageUrl: string): string => {
  try {
    const parsed = new URL(pageUrl);
    return `${parsed.origin}${parsed.pathname}`;
  } catch {
    return pageUrl;
  }
};

const formatSource = (source: string): string => {
  if (source === "booking-modal") {
    return "\u041c\u043e\u0434\u0430\u043b\u044c\u043d\u0435 \u0432\u0456\u043a\u043d\u043e \u0437\u0430\u043f\u0438\u0441\u0443";
  }

  if (source === "contact-form") {
    return "\u0424\u043e\u0440\u043c\u0430 \u043a\u043e\u043d\u0442\u0430\u043a\u0442\u0456\u0432";
  }

  return source;
};

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
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    throw new Error(`Telegram delivery failed, status code ${response.status}`);
  }
};

const sendBookingToTelegram = async (payload: BookingPayload): Promise<void> => {
  const text = [
    "<b>\u041d\u041e\u0412\u0410 \u0417\u0410\u042f\u0412\u041a\u0410 \u041d\u0410 \u0417\u0410\u041f\u0418\u0421</b>",
    "",
    `<b>\u041f\u043e\u0441\u043b\u0443\u0433\u0430:</b> ${escapeHtml(payload.service)}`,
    `<b>\u041a\u043b\u0456\u0454\u043d\u0442:</b> ${escapeHtml(payload.name)}`,
    `<b>\u0422\u0435\u043b\u0435\u0444\u043e\u043d:</b> ${escapeHtml(payload.phone)}`,
    `<b>\u0414\u0436\u0435\u0440\u0435\u043b\u043e:</b> ${escapeHtml(formatSource(payload.source))}`,
    `<b>\u0421\u0442\u043e\u0440\u0456\u043d\u043a\u0430:</b> ${escapeHtml(formatPage(payload.pageUrl))}`,
    `<b>\u0427\u0430\u0441:</b> ${escapeHtml(formatSubmittedAt(payload.submittedAt))}`,
  ].join("\n");

  await sendTelegramMessage(text);
};

const sendContactToTelegram = async (payload: ContactPayload): Promise<void> => {
  const text = [
    "<b>\u041d\u041e\u0412\u0415 \u041f\u041e\u0412\u0406\u0414\u041e\u041c\u041b\u0415\u041d\u041d\u042f</b>",
    "",
    `<b>\u041a\u043b\u0456\u0454\u043d\u0442:</b> ${escapeHtml(payload.name)}`,
    `<b>Email:</b> ${escapeHtml(payload.email)}`,
    `<b>\u041f\u043e\u0432\u0456\u0434\u043e\u043c\u043b\u0435\u043d\u043d\u044f:</b> ${escapeHtml(payload.message)}`,
    `<b>\u0414\u0436\u0435\u0440\u0435\u043b\u043e:</b> ${escapeHtml(formatSource(payload.source))}`,
    `<b>\u0421\u0442\u043e\u0440\u0456\u043d\u043a\u0430:</b> ${escapeHtml(formatPage(payload.pageUrl))}`,
    `<b>\u0427\u0430\u0441:</b> ${escapeHtml(formatSubmittedAt(payload.submittedAt))}`,
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
