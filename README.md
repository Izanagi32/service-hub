# HubService — сайт автосервісу

Односторінковий React-застосунок (Vite + TypeScript + Tailwind) для автосервісу HubService у Горохові: послуги й ціни, галерея, FAQ, форма запису та контакти з картою.

## Стек

- React 18, React Router 7, TypeScript 5.8
- Vite 6, Tailwind CSS 4
- Framer Motion (`motion`), lucide-react
- Шрифти Inter + Oswald з кирилицею — локально в `src/assets/fonts`

## Вимоги

- Node.js 20+
- npm 10+

## Швидкий старт

```bash
npm install
copy .env.example .env.local   # Windows
npm run dev                    # http://localhost:3000
```

## Скрипти

| Команда | Що робить |
| --- | --- |
| `npm run dev` | Dev-сервер на порту 3000 |
| `npm run stop:dev` | Зупинити процес, що слухає порт 3000 |
| `npm run lint` | Перевірка кодування, TypeScript і ESLint |
| `npm run build` | Production-збірка в `dist/` |
| `npm run preview` | Локальний перегляд збірки |
| `npm test` | Unit-тести (Vitest): валідація, доставка заявок, retry, фолбек |
| `npm run check` | `lint` + `test` + `build` |

## Доставка заявок

Заявки з форми запису та форми на сторінці контактів працюють у двох режимах:

1. **Webhook (рекомендовано).** Задайте `VITE_BOOKING_WEBHOOK_URL` і `VITE_CONTACT_WEBHOOK_URL` — у Make, n8n, Cloudflare Worker або власному API. Ендпоінт має приймати `POST` із JSON і дозволяти CORS із домену сайту.
2. **WhatsApp-фолбек.** Якщо webhook не заданий, після валідації форми відкривається WhatsApp із готовим текстом заявки. Користувач бачить чесне «Заявку сформовано» і кнопку надіслати — жодного фейкового «успішно відправлено».

> Токени Telegram-бота чи інші секрети **не можна** тримати у фронтенді: усе, що потрапляє в бандл, видно в браузері.

Готовий релей із валідацією, rate limit, honeypot, Turnstile і надсиланням у Telegram лежить у [`backend/`](backend/README.md) (Cloudflare Worker). Задеплойте його та вкажіть URL у `VITE_*_WEBHOOK_URL`.

## Аналітика та згода

- GA4 вантажиться **лише** після натискання «Дозволити» в банері; вибір зберігається в `localStorage`.
- Події: `booking_open`, `booking_submit`, `contact_submit`, `call_click`, `whatsapp_click`, `maps_click`.
- Без `VITE_GA_MEASUREMENT_ID` аналітика повністю вимкнена.

## Де редагувати контент

- `src/siteContent.ts` — бренд, телефон, email, адреса, графік, посилання на Google Maps.
- `src/constants.tsx` — послуги (назва, slug, ціна, час, особливості), кроки процесу, галерея, ролі команди, гарантії, статистика, FAQ.
- `src/pages/*` — тексти сторінок; окремі сторінки послуг живуть за `/services/:slug` (`src/pages/ServiceDetail.tsx`).
- `src/lib/images.ts` — `srcset` для фото; згенеровані варіанти `*-800.jpg` лежать у `public/`.
- `public/` — фото (`hero-bg.jpg`, `photo-garage.jpg`, `truck-wash.jpg`), іконки, `og-image.jpg`, `robots.txt`, `sitemap.xml`, `CNAME`.

Після зміни цін або послуг оновіть також `public/sitemap.xml` (дата `lastmod`) — зараз там 13 URL, включно з `/services/<slug>` — і перевірте `npm run build`.

## SEO та домен

- Канонічний домен: `https://servicehubmaster.com` (задається у `VITE_SITE_URL`).
- `public/CNAME` містить домен для GitHub Pages; якщо хостинг інший — файл можна прибрати.
- `sitemap.xml` і `robots.txt` вказують на той самий домен.
- Мета-теги й JSON-LD генеруються компонентом `src/components/SEO.tsx` на кожній сторінці.
- `index.html` містить статичні meta для соцмереж і пошукових ботів без JS.

## Деплой

Поточний workflow `.github/workflows/deploy.yml` публікує `dist/` на GitHub Pages при пуші в `master`.

- `vite.config.ts` автоматично визначає `base` за назвою репозиторію (`GITHUB_REPOSITORY`), тому шляхи до ассетів коректні й у підкаталозі.
- `dist/index.html` дублюється в `dist/404.html` — це SPA-фолбек для GitHub Pages; невідомі маршрути показують сторінку 404.
- Файл `public/_headers` працює лише на хостингах із підтримкою заголовків (Netlify, Cloudflare Pages). GitHub Pages його ігнорує — CSP частково заданий у `index.html`.

## Доступність

- Skip-link до основного вмісту, фокус-стилі, `aria-*` для форм і акордеонів.
- Модалка запису й мобільне меню: focus trap, закриття на Escape, повернення фокуса.
- Повага до `prefers-reduced-motion` (Framer Motion і CSS).
- Контраст тексту перевірений для темної теми.
