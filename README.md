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
