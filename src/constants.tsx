import { ReactNode } from "react";
import { Car, Sparkles, Gauge, ShieldCheck } from "lucide-react";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  tooltip: string;
  price: string;
  features: string[];
  image: string;
  video?: string;
}

export const services: Service[] = [
  {
    id: "01",
    title: "3D Розвал-сходження",
    description: "Точне 3D налаштування геометрії підвіски на стенді Hunter Elite для стабільної керованості.",
    icon: <Gauge className="w-6 h-6" />,
    tooltip: "Калібрований стенд Hunter",
    price: "від 400 ₴",
    features: ["3D діагностика", "Налаштування кутів", "Друк протоколу"],
    image: "https://images.unsplash.com/photo-1597762636733-dc1956554dd7?q=80&w=800&auto=format&fit=crop",
    video: "https://assets.mixkit.co/videos/preview/mixkit-mechanic-working-on-a-car-wheel-4933-large.mp4",
  },
  {
    id: "02",
    title: "Premium Полірування",
    description: "Глибоке багатоступеневе полірування кузова для відновлення блиску та видалення більшості дрібних дефектів.",
    icon: <Sparkles className="w-6 h-6" />,
    tooltip: "Професійні пасти та круги",
    price: "від 2500 ₴",
    features: ["Відновлення блиску", "Зняття павутинки", "Фінішний захист"],
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=800&auto=format&fit=crop",
    video: "https://assets.mixkit.co/videos/preview/mixkit-man-polishing-a-car-with-a-machine-44445-large.mp4",
  },
  {
    id: "03",
    title: "Комплексна Мийка",
    description: "Детальне очищення кузова, дисків і складних зон з безпечними складами для лакофарбового покриття.",
    icon: <Car className="w-6 h-6" />,
    tooltip: "Безпечна автохімія",
    price: "від 300 ₴",
    features: ["Мийка кузова", "Чистка дисків", "Сушка без розводів"],
    image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=800&auto=format&fit=crop",
    video: "https://assets.mixkit.co/videos/preview/mixkit-washing-a-car-with-a-pressure-washer-44444-large.mp4",
  },
  {
    id: "04",
    title: "Хімчистка Салону",
    description: "Глибоке очищення текстилю, пластику та шкіри з видаленням запахів і складних плям.",
    icon: <Sparkles className="w-6 h-6" />,
    tooltip: "Професійний пар та екстрактор",
    price: "від 1500 ₴",
    features: ["Стеля та сидіння", "Пластик і шви", "Озонація салону"],
    image: "https://images.unsplash.com/photo-1552933529-e359b24772ff?q=80&w=800&auto=format&fit=crop",
    video: "https://assets.mixkit.co/videos/preview/mixkit-cleaning-the-interior-of-a-car-44446-large.mp4",
  },
  {
    id: "05",
    title: "Захисна Плівка",
    description: "Нанесення поліуретанової плівки для захисту кузова від сколів, подряпин і дорожньої хімії.",
    icon: <ShieldCheck className="w-6 h-6" />,
    tooltip: "PPF преміум-класу",
    price: "від 8000 ₴",
    features: ["Бронювання зон ризику", "Повне оклеювання", "Гарантія до 5 років"],
    image: "https://images.unsplash.com/photo-1621359953476-5c7418643f18?q=80&w=800&auto=format&fit=crop",
    video: "https://assets.mixkit.co/videos/preview/mixkit-applying-a-protective-film-to-a-car-44447-large.mp4",
  },
  {
    id: "06",
    title: "Керамічний Захист",
    description: "Нанесення керамічного покриття для гідрофобного ефекту, глибокого блиску та спрощеного догляду.",
    icon: <ShieldCheck className="w-6 h-6" />,
    tooltip: "Сертифіковані склади",
    price: "від 4500 ₴",
    features: ["Підготовка поверхні", "Нанесення 1-3 шарів", "Рекомендації по догляду"],
    image: "https://images.unsplash.com/photo-1504222490245-4367b8b971c0?q=80&w=800&auto=format&fit=crop",
    video: "https://assets.mixkit.co/videos/preview/mixkit-car-detailing-with-wax-44395-large.mp4",
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Консультація",
    description: "Огляд авто, фіксація задач і погодження оптимального плану робіт.",
  },
  {
    number: "02",
    title: "Діагностика",
    description: "Перевірка стану покриття, салону та технічних вузлів перед стартом робіт.",
  },
  {
    number: "03",
    title: "Виконання",
    description: "Роботи виконують сертифіковані майстри за технологічними картами.",
  },
  {
    number: "04",
    title: "Контроль",
    description: "Фінальна перевірка якості, видача авто та рекомендації по подальшому догляду.",
  },
];

export interface PortfolioItem {
  title: string;
  category: string;
  image?: string;
  url?: string;
}

export const portfolioItems: PortfolioItem[] = [
  { url: "https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=1200&auto=format&fit=crop", title: "Porsche 911 GT3 RS", category: "Detailing" },
  { url: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1200&auto=format&fit=crop", title: "Ferrari 488 Pista", category: "Ceramic" },
  { url: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1200&auto=format&fit=crop", title: "Ford Mustang Shelby", category: "Polishing" },
  { url: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop", title: "Tesla Model S Plaid", category: "Interior" },
  { url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop", title: "Chevrolet Corvette C8", category: "Detailing" },
  { url: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf048?q=80&w=1200&auto=format&fit=crop", title: "Lamborghini Huracan", category: "PPF" },
  { url: "https://images.unsplash.com/photo-1562141989-c5c79ac8f576?q=80&w=1200&auto=format&fit=crop", title: "Range Rover Vogue", category: "Restoration" },
  { url: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=1200&auto=format&fit=crop", title: "Ferrari F8 Tributo", category: "Ceramic" },
  { url: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=1200&auto=format&fit=crop", title: "Mercedes G-Class AMG", category: "Alignment" },
  { url: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=1200&auto=format&fit=crop", title: "Bentley Continental GT", category: "Leather Care" },
  { url: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop", title: "Audi RS7 Sportback", category: "Polishing" },
  { url: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=1200&auto=format&fit=crop", title: "Porsche Taycan Turbo", category: "Detailing" },
];

export const testimonials = [
  { name: "Олександр К.", role: "BMW X5", text: "Відмінна якість сервісу. Авто повернули в ідеальному стані, результат перевершив очікування." },
  { name: "Марина Т.", role: "Porsche Macan", text: "Робили 3D розвал. Керованість стала помітно кращою, все швидко і професійно." },
  { name: "Андрій Л.", role: "Audi RS6", text: "Полірування кузова на високому рівні. Лак виглядає як новий." },
  { name: "Ігор М.", role: "Mercedes S-Class", text: "Дуже акуратна хімчистка салону, без різкого запаху і з увагою до деталей." },
  { name: "Роман С.", role: "Range Rover Sport", text: "Плівка нанесена чисто, краї акуратні. Рекомендую майстрів ServiceHub." },
  { name: "Вікторія Н.", role: "Tesla Model 3", text: "Пояснили всі етапи робіт і дали чіткі рекомендації по догляду. Дуже задоволена." },
  { name: "Павло Д.", role: "Volkswagen Touareg", text: "Сервіс організований добре, комунікація швидка, все виконано в строк." },
  { name: "Юлія П.", role: "Lexus RX", text: "Приємна команда і справді якісний результат. Повернусь ще." },
];

export const teamMembers = [
  {
    name: "Олег Мельник",
    role: "Керівник студії",
    experience: "8 років досвіду",
    specialty: "Детейлінг та полірування",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Андрій Коваль",
    role: "Майстер розвал-сходження",
    experience: "12 років досвіду",
    specialty: "Стенд Hunter",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Максим Гнатюк",
    role: "Спеціаліст з хімчистки",
    experience: "5 років досвіду",
    specialty: "Догляд за салоном",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
  },
];

export const faqs = [
  {
    question: "Скільки триває детейлінг?",
    answer: "Залежно від пакета послуг: базові роботи займають 1-3 години, комплексні - до 1-2 днів.",
  },
  {
    question: "Чи можна залишити авто на ніч?",
    answer: "Так, у нас є охоронювана територія та закрите приміщення для безпечного зберігання.",
  },
  {
    question: "Як часто робити розвал-сходження?",
    answer: "Рекомендуємо перевірку кожні 10-15 тис. км або після ремонту підвіски/ударів у колесо.",
  },
  {
    question: "Чи є зона очікування?",
    answer: "Так, є комфортна зона очікування з Wi-Fi та напоями.",
  },
  {
    question: "Які способи оплати доступні?",
    answer: "Працюємо з готівкою, банківськими картками та безготівковим розрахунком.",
  },
  {
    question: "Чи можна записатися онлайн?",
    answer: "Так, через форму на сайті або телефоном. Ми швидко підтвердимо заявку.",
  },
  {
    question: "Яку хімію ви використовуєте?",
    answer: "Використовуємо професійні перевірені склади від провідних брендів для безпечного догляду.",
  },
  {
    question: "Чи працюєте у вихідні?",
    answer: "Так, працюємо щоденно з 09:00 до 20:00 за попереднім записом.",
  },
];