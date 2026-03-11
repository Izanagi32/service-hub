import { motion } from 'motion/react';
import {
  Trophy,
  Star,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  BadgeCheck,
  Gauge,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: 'easeOut' as const },
};

export const About = () => {
  return (
    <div className="pt-24 sm:pt-28 md:pt-32 pb-14 sm:pb-16 md:pb-20 bg-[#050505] overflow-hidden">
      <SEO
        title="Про Нас"
        description="Дізнайтеся більше про HubService - лідера у сфері професійного детейлінгу в Горохові. Наша історія, цінності та безкомпромісний підхід до якості."
        keywords="про детейлінг студію, історія hubservice, цінності компанії, професійний сервіс авто"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          mainEntity: {
            '@type': 'Organization',
            name: 'HubService',
            description: 'Студія професійного догляду за автомобілем у Горохові.',
            foundingDate: '2014',
            areaServed: 'Horokhiv, Ukraine',
          },
        }}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20 lg:mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 sm:gap-14 lg:gap-20 items-center">
          <motion.div {...fadeInUp}>
            <span className="inline-flex items-center gap-3 text-blue-400 text-[10px] font-bold tracking-[0.24em] uppercase mb-5 sm:mb-6">
              <span className="w-8 h-px bg-blue-500/70" />
              Про Нас
            </span>

            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold font-display text-white mb-6 sm:mb-8 leading-[0.9] tracking-tight">
              Ми Створюємо <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-gray-500">
                Досконалість
              </span>
            </h1>

            <p className="text-gray-300 text-base sm:text-lg font-light leading-relaxed mb-8 sm:mb-10 max-w-xl">
              HubService - це не просто детейлінг студія. Це сервісний простір, де дисципліна,
              технології та увага до деталей перетворюють догляд за авто у прогнозований premium-результат.
            </p>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 max-w-xl">
              {[
                { value: '10+', label: 'Років досвіду', icon: <Trophy className="w-4 h-4" /> },
                { value: '5000+', label: 'Задоволених клієнтів', icon: <Star className="w-4 h-4" /> },
                { value: '100%', label: 'Контроль якості', icon: <BadgeCheck className="w-4 h-4" /> },
                { value: '24/7', label: 'Підтримка клієнта', icon: <ShieldCheck className="w-4 h-4" /> },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  {...fadeInUp}
                  transition={{ ...fadeInUp.transition, delay: index * 0.08 }}
                  className="border border-white/10 bg-white/[0.02] p-4 sm:p-5"
                >
                  <div className="text-blue-400 mb-2">{item.icon}</div>
                  <div className="text-2xl sm:text-3xl font-display font-bold text-white mb-1">{item.value}</div>
                  <div className="text-[10px] sm:text-xs uppercase tracking-[0.18em] text-gray-400">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="relative"
          >
            <div className="absolute -top-8 -left-8 w-40 h-40 bg-blue-600/20 blur-[80px]" />
            <div className="absolute -bottom-8 -right-8 w-44 h-44 bg-blue-500/15 blur-[80px]" />

            <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
              <div className="col-span-2 aspect-[16/10] overflow-hidden border border-white/10">
                <img
                  src={`${import.meta.env.BASE_URL}hero-bg.jpg`}
                  alt="HubService location"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="aspect-[4/5] overflow-hidden border border-white/10">
                <img
                  src={`${import.meta.env.BASE_URL}photo-garage.jpg`}
                  alt="HubService location detail"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="aspect-[4/5] overflow-hidden border border-white/10">
                <img
                  src={`${import.meta.env.BASE_URL}truck-wash.jpg`}
                  alt="Truck wash service"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 border-y border-white/5 bg-white/[0.015] mb-16 sm:mb-20 lg:mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-14">
            <span className="text-blue-400 text-[10px] font-bold tracking-[0.24em] uppercase mb-4 block">Стандарт HubService</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4">Працюємо по системі, а не хаотично</h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Кожен автомобіль проходить чіткий маршрут: від діагностики до фінального контролю.
              Тому ви отримуєте стабільний результат, а не випадковий ефект.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {[
              {
                step: '01',
                title: 'Аудит стану',
                text: 'Фіксуємо початковий стан авто, ризики та цілі по результату.',
                icon: <Gauge className="w-5 h-5" />,
              },
              {
                step: '02',
                title: 'План робіт',
                text: 'Узгоджуємо сценарій послуг, матеріали, терміни та бюджет.',
                icon: <Sparkles className="w-5 h-5" />,
              },
              {
                step: '03',
                title: 'Виконання',
                text: 'Роботи ведуться за картами процесу та перевіреними стандартами.',
                icon: <ShieldCheck className="w-5 h-5" />,
              },
              {
                step: '04',
                title: 'Фінальний контроль',
                text: 'Перевірка якості, рекомендації по догляду, видача авто клієнту.',
                icon: <BadgeCheck className="w-5 h-5" />,
              },
            ].map((item, index) => (
              <motion.article
                key={item.step}
                {...fadeInUp}
                transition={{ ...fadeInUp.transition, delay: index * 0.08 }}
                className="border border-white/10 bg-[#080b11] p-5 sm:p-6 group hover:border-blue-500/35 transition-colors"
              >
                <div className="flex items-center justify-between mb-4 sm:mb-5">
                  <span className="text-3xl sm:text-4xl font-display font-bold text-white/15 group-hover:text-blue-400/30 transition-colors">
                    {item.step}
                  </span>
                  <span className="text-blue-400">{item.icon}</span>
                </div>
                <h3 className="text-white font-display font-bold text-lg mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20 lg:mb-24">
        <motion.div {...fadeInUp} className="text-center mb-10 sm:mb-12 lg:mb-14">
          <span className="text-blue-400 text-[10px] font-bold tracking-[0.24em] uppercase mb-4 block">Наші Цінності</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white">Чому Обирають Нас</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              icon: <ShieldCheck className="w-7 h-7" />,
              title: 'Безкомпромісна Якість',
              desc: 'Ми не знижуємо планку. Кожен етап робіт проходить перевірку до фінальної видачі авто.',
            },
            {
              icon: <Sparkles className="w-7 h-7" />,
              title: 'Технологічний Підхід',
              desc: 'Працюємо сучасними матеріалами та методиками, які дають стабільний і прогнозований результат.',
            },
            {
              icon: <Star className="w-7 h-7" />,
              title: 'Повага До Клієнта',
              desc: 'Прозора комунікація, чіткі терміни та рекомендації після робіт - без зайвих обіцянок.',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: i * 0.08 }}
              className="group p-6 sm:p-8 bg-white/[0.02] border border-white/10 hover:border-blue-500/30 transition-all"
            >
              <div className="w-14 h-14 border border-white/10 flex items-center justify-center text-blue-400 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white font-display mb-4">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden border border-blue-500/30 bg-gradient-to-r from-[#0b1733] via-[#13306b] to-[#1b4db0] p-6 sm:p-10 md:p-14 lg:p-16"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.14),transparent_40%)]" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />

          <div className="relative z-10 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white mb-5 sm:mb-6">Готові До Трансформації?</h2>
            <p className="text-blue-100 text-base sm:text-lg mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
              Запишіться на консультацію вже сьогодні та отримайте персональний план догляду саме для вашого авто.
            </p>
            <Link
              to="/contact"
              className="tap-feedback touch-manipulation inline-flex items-center gap-4 px-8 sm:px-10 py-4 sm:py-5 bg-white text-black font-bold text-[11px] sm:text-xs tracking-[0.24em] uppercase hover:bg-gray-200 transition-colors"
            >
              Зв'язатися з Нами <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
