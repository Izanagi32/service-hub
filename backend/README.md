# Lead relay для HubService

Cloudflare Worker, який приймає заявки з фронтенду (`src/lib/submissions.ts`), валідує їх, обмежує частоту, перевіряє honeypot/Turnstile і надсилає в Telegram (за потреби — у CRM).

## Навіщо

Фронтенд статичний, тому webhook-URL видно в бандлі. Прямий Telegram-бот із токеном у браузері неприпустимий. Цей воркер ховає токени й додає захист від спаму.

## Деплой

```bash
cd backend
npm install -g wrangler        # або npx wrangler
wrangler login

wrangler secret put TELEGRAM_BOT_TOKEN
wrangler secret put TELEGRAM_CHAT_ID
# необов'язково:
# wrangler secret put TURNSTILE_SECRET
# wrangler secret put CRM_WEBHOOK_URL

wrangler deploy
```

Після деплою Wrangler виведе URL виду `https://hubservice-leads.<account>.workers.dev`. Пропишіть його у фронтенді:

```
VITE_BOOKING_WEBHOOK_URL="https://hubservice-leads.<account>.workers.dev/"
VITE_CONTACT_WEBHOOK_URL="https://hubservice-leads.<account>.workers.dev/"
```

## Rate limit

Щоб увімкнути обмеження 5 заявок/хвилину з одного IP, створіть KV namespace і розкоментуйте блок у `wrangler.toml`:

```bash
wrangler kv namespace create RATE_LIMIT
```

Без KV воркер працює, але без rate limit.

## Перевірка

```bash
curl -X POST https://hubservice-leads.<account>.workers.dev/ \
  -H "Content-Type: application/json" \
  -H "Origin: https://servicehubmaster.com" \
  -d '{"name":"Тест","phone":"0671050555","service":"Мийка","consent":true,"consentVersion":"2026-11-09"}'
```

Очікувано: `{"ok":true}` і повідомлення в Telegram.

## Що перевіряє воркер

- `Origin` — лише домени з `ALLOWED_ORIGINS`.
- `consent === true` — без згоди заявка не проходить.
- honeypot `website` — тихо ігнорується.
- телефон/email/довжини полів.
- Turnstile, якщо заданий `TURNSTILE_SECRET` (токен приходить у `turnstileToken`).
- Помилки Telegram повертають 502, щоб фронтенд показав повідомлення, а не фальшивий успіх.
