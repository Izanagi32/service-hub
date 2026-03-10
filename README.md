# Service Hub

Локальний запуск і базовий quality workflow для фронтенд-застосунку на Vite + React.

## Вимоги

- Node.js 20+
- npm 10+

## Налаштування

1. Встановіть залежності:
   `npm install`
2. Створіть локальний env-файл:
   `copy .env.example .env.local`
3. За потреби відредагуйте `VITE_SITE_URL` у `.env.local`.

## Запуск

- Dev сервер (порт `3000`):
  `npm run dev`
- Зупинити dev сервер на порту `3000`:
  `npm run stop:dev`

## Перевірки

- TypeScript + ESLint:
  `npm run lint`
- Повна перевірка (lint + build):
  `npm run check`

## Збірка

- Production build:
  `npm run build`
- Preview build:
  `npm run preview`


## Telegram form delivery

To receive form submissions in Telegram, set one of these options in `.env.local`:

- Preferred: use `VITE_BOOKING_WEBHOOK_URL` and `VITE_CONTACT_WEBHOOK_URL` pointing to a secure relay (Make/n8n/Cloudflare Worker) that forwards to Telegram.
- Direct mode: set `VITE_TELEGRAM_BOT_TOKEN` and `VITE_TELEGRAM_CHAT_ID`.

Direct mode works, but token is exposed in a static frontend build.
