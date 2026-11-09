/**
 * HubService lead relay (Cloudflare Worker).
 *
 * Receives the JSON payload produced by src/lib/submissions.ts, validates it,
 * rate-limits by IP, optionally verifies Turnstile and forwards the lead to
 * Telegram. Deploy with Wrangler — see ./README.md.
 */

const json = (data, status = 200, extra = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...extra },
  });

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]);

const isValidPhone = (value) => {
  const digits = String(value ?? "").replace(/\D/g, "");
  return /^0\d{9}$/.test(digits) || /^80\d{9}$/.test(digits) || /^380\d{9}$/.test(digits);
};

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value ?? ""));

const trim = (value, max = 2000) => String(value ?? "").trim().slice(0, max);

async function verifyTurnstile(env, token, ip) {
  if (!env.TURNSTILE_SECRET) return true;
  if (!token) return false;

  const body = new FormData();
  body.append("secret", env.TURNSTILE_SECRET);
  body.append("response", token);
  body.append("remoteip", ip);

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
  });
  const data = await res.json();
  return Boolean(data.success);
}

async function rateLimit(env, ip) {
  if (!env.RATE_LIMIT) return true;

  const bucket = `rl:${ip}:${Math.floor(Date.now() / 60_000)}`;
  const current = Number((await env.RATE_LIMIT.get(bucket)) ?? "0");

  if (current >= 5) return false;

  await env.RATE_LIMIT.put(bucket, String(current + 1), { expirationTtl: 120 });
  return true;
}

function formatLead(payload) {
  const lines = [
    "<b>Нова заявка з сайту</b>",
    `Тип: ${escapeHtml(payload.source ?? "unknown")}`,
    `Ім'я: ${escapeHtml(payload.name ?? "")}`,
  ];

  if (payload.phone) lines.push(`Телефон: ${escapeHtml(payload.phone)}`);
  if (payload.email) lines.push(`Email: ${escapeHtml(payload.email)}`);
  if (payload.service) lines.push(`Послуга: ${escapeHtml(payload.service)}`);
  if (payload.date) lines.push(`Дата: ${escapeHtml(payload.date)}`);
  if (payload.time) lines.push(`Час: ${escapeHtml(payload.time)}`);
  if (payload.comment) lines.push(`Коментар: ${escapeHtml(payload.comment)}`);
  if (payload.message) lines.push(`Повідомлення: ${escapeHtml(payload.message)}`);

  lines.push(`Сторінка: ${escapeHtml(payload.pageUrl ?? "")}`);
  lines.push(`Згода: ${payload.consent === true ? "так" : "ні"} (${escapeHtml(payload.consentVersion ?? "—")})`);
  return lines.join("\n");
}

export default {
  async fetch(request, env) {
    const allowedOrigins = String(env.ALLOWED_ORIGINS ?? "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);
    const origin = request.headers.get("Origin") ?? "";
    const allowOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0] ?? "";
    const cors = {
      "Access-Control-Allow-Origin": allowOrigin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
      Vary: "Origin",
    };

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    if (request.method !== "POST") return json({ ok: false, error: "Method not allowed" }, 405, cors);

    if (origin && allowOrigin && origin !== allowOrigin) {
      return json({ ok: false, error: "Origin not allowed" }, 403, cors);
    }

    const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
    if (!(await rateLimit(env, ip))) {
      return json({ ok: false, error: "Too many requests" }, 429, cors);
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return json({ ok: false, error: "Invalid JSON" }, 400, cors);
    }

    if (payload.website) return json({ ok: true }, 200, cors); // honeypot
    if (payload.consent !== true) return json({ ok: false, error: "Consent required" }, 400, cors);

    const name = trim(payload.name, 80);
    const message = trim(payload.message, 2000);
    const source = payload.source === "contact-form" ? "contact-form" : "booking-modal";

    if (name.length < 2) return json({ ok: false, error: "Invalid name" }, 400, cors);
    if (source === "contact-form" && (!isValidEmail(payload.email) || message.length < 10)) {
      return json({ ok: false, error: "Invalid contact request" }, 400, cors);
    }
    if (source === "booking-modal" && !isValidPhone(payload.phone)) {
      return json({ ok: false, error: "Invalid phone" }, 400, cors);
    }

    if (!(await verifyTurnstile(env, payload.turnstileToken, ip))) {
      return json({ ok: false, error: "Captcha failed" }, 400, cors);
    }

    if (env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID) {
      const telegram = await fetch(
        `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: env.TELEGRAM_CHAT_ID,
            text: formatLead({ ...payload, source }),
            parse_mode: "HTML",
            disable_web_page_preview: true,
          }),
        },
      );

      if (!telegram.ok) {
        return json({ ok: false, error: "Delivery failed" }, 502, cors);
      }
    }

    // Optional CRM: forward the same payload to another webhook.
    if (env.CRM_WEBHOOK_URL) {
      await fetch(env.CRM_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, source, receivedAt: new Date().toISOString() }),
      }).catch(() => {});
    }

    return json({ ok: true }, 200, cors);
  },
};
