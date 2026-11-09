import { ReactNode } from "react";
import {
  BadgeCheck,
  Brush,
  Car,
  Clock,
  Gauge,
  ShieldCheck,
  Sparkles,
  Wind,
} from "lucide-react";

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: ReactNode;
  tooltip: string;
  price: string;
  priceValue: number;
  duration: string;
  features: string[];
}

export const services: Service[] = [
  {
    id: "01",
    slug: "miyka",
    title: "Мийка",
    shortTitle: "Мийка",
    description:
      "Комплексне очищення кузова, дисків і складних зон безпечною автохімією, яка не шкодить лакофарбовому покриттю.",
    icon: <Car className="w-6 h-6" />,
    tooltip: "Безпечна автохімія",
    price: "від 300 ₴",
    priceValue: 300,
    duration: "40–60 хвилин",
    features: ["Мийка кузова", "Чистка дисків", "Сушка без розводів"],
  },
  {
    id: "02",
    slug: "himchistka-salonu",
    title: "Хімчистка салону",
    shortTitle: "Хімчистка",
    description:
      "Глибоке очищення салону: текстиль, пластик, шкіра. Прибираємо складні плями та стійкі запахи.",
    icon: <Sparkles className="w-6 h-6" />,
    tooltip: "Екстрактор і пар",
    price: "від 1500 ₴",
    priceValue: 1500,
    duration: "3–5 годин",
    features: ["Стеля та сидіння", "Пластик і шви", "Видалення запахів"],
  },
  {
    id: "03",
    slug: "poliruvannia",
    title: "Полірування",
    shortTitle: "Полірування",
    description:
      "Багатоступеневе полірування кузова: повертаємо блиск і прибираємо дрібні дефекти лакофарбового покриття.",
    icon: <Sparkles className="w-6 h-6" />,
    tooltip: "Професійні пасти та круги",
    price: "від 2500 ₴",
    priceValue: 2500,
    duration: "4–8 годин",
    features: ["Відновлення блиску", "Зняття павутинки", "Фінішний захист"],
  },
  {
    id: "04",
    slug: "himchistka-kylymiv",
    title: "Хімчистка килимів",
    shortTitle: "Килими",
    description:
      "Професійне очищення килимів екстрактором: делікатно видаляємо плями, бруд і запахи.",
    icon: <Brush className="w-6 h-6" />,
    tooltip: "Екстракторне очищення",
    price: "від 400 ₴",
    priceValue: 400,
    duration: "1–2 години",
    features: ["Глибоке очищення", "Делікатна сушка", "Обробка від запахів"],
  },
  {
    id: "05",
    slug: "zapravka-kondytsioneriv",
    title: "Заправка кондиціонерів",
    shortTitle: "Кондиціонер",
    description:
      "Діагностика системи кондиціювання, перевірка герметичності та заправка холодоагентом.",
    icon: <Wind className="w-6 h-6" />,
    tooltip: "Контроль тиску та герметичності",
    price: "від 800 ₴",
    priceValue: 800,
    duration: "1–1,5 години",
    features: ["Перевірка тиску", "Заправка фреоном", "Тест ефективності"],
  },
  {
    id: "06",
    slug: "rozval-shodzhennia",
    title: "3D Розвал-сходження",
    shortTitle: "Розвал-сходження",
    description:
      "Точне 3D-налаштування геометрії підвіски для стабільної керованості та рівномірного зносу шин.",
    icon: <Gauge className="w-6 h-6" />,
    tooltip: "Калібрований 3D стенд",
    price: "від 400 ₴",
    priceValue: 400,
    duration: "40–60 хвилин",
    features: ["3D діагностика", "Налаштування кутів", "Друк протоколу"],
  },
];

export const getServiceBySlug = (slug?: string): Service | undefined =>
  services.find((service) => service.slug === slug);

export const processSteps = [
  {
    number: "01",
    title: "Консультація",
    description: "Уточнюємо задачу, оглядаємо авто та узгоджуємо обсяг робіт.",
  },
  {
    number: "02",
    title: "Оцінка",
    description: "Перевіряємо стан покриття, салону й технічних вузлів перед стартом.",
  },
  {
    number: "03",
    title: "Виконання",
    description: "Роботи виконуються за технологічними картами та погодженим кошторисом.",
  },
  {
    number: "04",
    title: "Контроль",
    description: "Фінальна перевірка якості, видача авто та рекомендації по догляду.",
  },
];

export interface GalleryItem {
  title: string;
  caption: string;
  image: string;
  alt: string;
  width: number;
  height: number;
}

export const galleryItems: GalleryItem[] = [
  {
    title: "Наша студія",
    caption: "вул. Козацька, 98 — бокс, зона приймання та вантажна мийка",
    image: "hero-bg.jpg",
    alt: "Будівля сервісу HubService у Горохові з боксом і шиномонтажем",
    width: 1195,
    height: 850,
  },
  {
    title: "Робочий бокс",
    caption: "Підйомник, 3D-стенд розвал-сходження та професійне освітлення",
    image: "photo-garage.jpg",
    alt: "Робочий бокс з підйомником і обладнанням для розвал-сходження",
    width: 1554,
    height: 772,
  },
  {
    title: "Вантажна мийка",
    caption: "Мийка вантажного транспорту на території сервісу",
    image: "truck-wash.jpg",
    alt: "Мийка вантажного автомобіля з причепом на території сервісу",
    width: 1193,
    height: 819,
  },
];

export interface TeamRole {
  icon: ReactNode;
  title: string;
  focus: string;
  description: string;
}

export const teamRoles: TeamRole[] = [
  {
    icon: <BadgeCheck className="w-6 h-6" />,
    title: "Керівник студії",
    focus: "Приймання, кошторис, контроль якості",
    description:
      "Приймає авто, фіксує стан, погоджує обсяг робіт і перевіряє результат перед видачею.",
  },
  {
    icon: <Gauge className="w-6 h-6" />,
    title: "Майстер розвал-сходження",
    focus: "3D-стенд, геометрія підвіски, шинний сервіс",
    description:
      "Працює з 3D-стендом: вимірює кути, коригує геометрію та видає протокол налаштувань.",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Спеціаліст з хімчистки",
    focus: "Салон, текстиль, пластик і шкіра",
    description:
      "Виконує хімчистку салону та килимів, підбирає склади під матеріали й усуває запахи.",
  },
];

export const guarantees = [
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "Гарантія на роботи",
    text: "Якщо після візиту залишилися питання до якості — повертаємося до робіт і усуваємо зауваження.",
  },
  {
    icon: <BadgeCheck className="w-5 h-5" />,
    title: "Ціна після огляду",
    text: "Орієнтовна вартість відома заздалегідь, фінальний кошторис погоджуємо до старту робіт.",
  },
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: "Професійна автохімія",
    text: "Використовуємо склади, призначені для конкретних матеріалів кузова, скла, пластику та шкіри.",
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: "Підтвердження візиту",
    text: "Заявку з сайту опрацьовуємо в робочий час і підтверджуємо зручний для вас час візиту.",
  },
];

export const stats = [
  { value: String(services.length), label: "Послуг у прайсі" },
  { value: "09–20", label: "Пн–Сб графік роботи" },
  { value: "від 300 ₴", label: "Стартова ціна мийки" },
  { value: "3D", label: "Розвал-сходження" },
];

export const faqs = [
  {
    question: "Скільки триває обслуговування?",
    answer:
      "Залежить від послуги: мийка — 40–60 хвилин, розвал-сходження — близько години, хімчистка салону — 3–5 годин, полірування — від 4 годин. Точний час називаємо після огляду авто.",
  },
  {
    question: "Чи можна залишити авто на території?",
    answer:
      "За потреби авто можна залишити на території сервісу — це погоджуємо заздалегідь під час запису.",
  },
  {
    question: "Як часто робити розвал-сходження?",
    answer:
      "Рекомендуємо перевірку кожні 10–15 тис. км, після ремонту підвіски або після ударів у колесо.",
  },
  {
    question: "Чи можна зачекати на місці?",
    answer:
      "Так, є зона очікування. Для тривалих робіт можемо узгодити час, коли авто буде готове.",
  },
  {
    question: "Які способи оплати доступні?",
    answer: "Приймаємо готівку, банківські картки та безготівковий розрахунок.",
  },
  {
    question: "Чи можна записатися онлайн?",
    answer:
      "Так, через форму на сайті або телефоном. Ми підтвердимо заявку в робочий час.",
  },
  {
    question: "Які матеріали ви використовуєте?",
    answer:
      "Професійні склади перевірених брендів — підбираємо під матеріал поверхні, щоб не пошкодити покриття чи салон.",
  },
  {
    question: "Чи працюєте у вихідні?",
    answer:
      "Працюємо з понеділка по суботу з 09:00 до 20:00. У неділю — за попереднім записом.",
  },
  {
    question: "Чи миєте вантажний транспорт?",
    answer:
      "Так, на території сервісу є вантажна мийка. Умови та час узгоджуйте телефоном або через форму запису.",
  },
];
