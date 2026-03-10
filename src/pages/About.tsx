import { motion } from 'motion/react';
import { 
  Trophy, 
  Star, 
  ShieldCheck, 
  Sparkles,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut" as const }
};

export const About = () => {
  return (
    <div className="pt-24 sm:pt-28 md:pt-32 pb-14 sm:pb-16 md:pb-20">
      <SEO 
        title="Про Нас" 
        description="Дізнайтеся більше про ServiceHub - лідера у сфері професійного детейлінгу в Києві. Наша історія, цінності та безкомпромісний підхід до якості."
        keywords="про детейлінг студію, історія servicehub, цінності компанії, професійний сервіс авто"
        schema={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "mainEntity": {
            "@type": "Organization",
            "name": "ServiceHub",
            "description": "Студія професійного догляду за автомобілем у Києві.",
            "foundingDate": "2014",
            "areaServed": "Kyiv, Ukraine"
          }
        }}
      />
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24 lg:mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-20 items-center">
          <motion.div {...fadeInUp}>
            <span className="text-blue-500 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Про Нас</span>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold font-display text-white mb-6 sm:mb-8 leading-[0.92]">
              Ми Створюємо <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
                Досконалість
              </span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg font-light leading-relaxed mb-8 sm:mb-12">
              ServiceHub - це не просто детейлінг студія. Це місце, де пристрасть до автомобілів зустрічається з найвищими стандартами якості та професіоналізму.
            </p>
            <div className="grid grid-cols-2 gap-6 sm:gap-10 md:gap-12">
              <div>
                <div className="text-3xl sm:text-4xl font-bold font-display text-white mb-2">10+</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Років Досвіду</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold font-display text-white mb-2">5000+</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Задоволених Клієнтів</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative aspect-square max-w-[520px] mx-auto w-full"
          >
            <div className="absolute inset-0 bg-blue-600/20 blur-[100px] pointer-events-none" />
            <img 
              src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=2300&auto=format&fit=crop" 
              alt="Detailing Studio" 
              className="w-full h-full object-cover border border-white/10 grayscale hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-white/[0.01] border-y border-white/5 mb-16 sm:mb-24 lg:mb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-12 sm:mb-16 md:mb-20">
            <span className="text-blue-500 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Наші Цінності</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white">Чому Обирають Нас</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            {[
              { icon: <ShieldCheck className="w-8 h-8" />, title: "Безкомпромісна Якість", desc: "Ми не шукаємо компромісів, коли йдеться про результат. Кожна деталь має бути ідеальною." },
              { icon: <Sparkles className="w-8 h-8" />, title: "Інноваційні Технології", desc: "Ми постійно впроваджуємо нові методи та матеріали, щоб залишатися лідерами ринку." },
              { icon: <Star className="w-8 h-8" />, title: "Індивідуальний Підхід", desc: "Кожен автомобіль унікальний, тому ми розробляємо персональні рішення для кожного клієнта." }
            ].map((item, i) => (
              <div key={i} className="group p-6 sm:p-8 md:p-10 bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all">
                <div className="w-16 h-16 border border-white/10 flex items-center justify-center text-blue-500 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white font-display mb-6">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-blue-600 p-6 sm:p-10 md:p-16 lg:p-20 text-center relative overflow-hidden rounded-[20px]"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold font-display text-white mb-6 sm:mb-8 relative z-10">Готові До Трансформації?</h2>
          <p className="text-blue-100 text-base sm:text-lg mb-8 sm:mb-12 max-w-2xl mx-auto relative z-10">
            Запишіться на безкоштовну консультацію вже сьогодні та дізнайтеся, як ми можемо покращити вигляд вашого авто.
          </p>
          <Link 
            to="/contact"
            className="tap-feedback touch-manipulation inline-flex items-center gap-3 sm:gap-4 px-7 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 bg-white text-black font-bold text-[11px] sm:text-xs tracking-[0.22em] sm:tracking-[0.3em] uppercase hover:bg-gray-200 transition-all relative z-10"
          >
            Зв'язатися з Нами <ArrowRight size={16} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
};
