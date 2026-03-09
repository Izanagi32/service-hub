import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, 
  ChevronRight, 
  ChevronLeft,
  Sparkles,
  ShieldCheck,
  Trophy,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { portfolioItems, processSteps, testimonials, faqs } from '../constants';
import { BUSINESS_INFO } from '../siteContent';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut" as const }
};

export const Home = () => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const portfolioFallbackImage = '/logo.png';

  const getCardWidth = () => {
    if (trackRef.current && trackRef.current.firstElementChild) {
      return (trackRef.current.firstElementChild as HTMLElement).offsetWidth + 24;
    }
    return window.innerWidth > 768 ? 724 : window.innerWidth * 0.85 + 24;
  };

  const scroll = (direction: 'left' | 'right') => {
    const cardWidth = getCardWidth();
    const maxIndex = portfolioItems.length - 1;
    
    let nextIndex = direction === 'left' ? carouselIndex - 1 : carouselIndex + 1;
    if (nextIndex < 0) nextIndex = 0;
    if (nextIndex > maxIndex) nextIndex = maxIndex;
    
    setCarouselIndex(nextIndex);
    setDragX(-nextIndex * cardWidth);
  };

  const onDragEnd = (_: any, info: any) => {
    const cardWidth = getCardWidth();
    const threshold = 50;
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    if (offset < -threshold || velocity < -500) {
      const nextIndex = Math.min(carouselIndex + 1, portfolioItems.length - 1);
      setCarouselIndex(nextIndex);
      setDragX(-nextIndex * cardWidth);
    } else if (offset > threshold || velocity > 500) {
      const nextIndex = Math.max(carouselIndex - 1, 0);
      setCarouselIndex(nextIndex);
      setDragX(-nextIndex * cardWidth);
    } else {
      setDragX(-carouselIndex * cardWidth);
    }
  };

  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <>
      <SEO 
        title="Головна" 
        description="ServiceHub - преміальна студія детейлінгу та сервісу в Києві. Професійне полірування, 3D розвал-сходження, хімчистка та захист кузова."
        keywords="детейлінг київ, полірування авто, розвал-сходження 3d, хімчистка салону, кераміка для авто, захисна плівка"
        schema={{
          "@context": "https://schema.org",
          "@type": "AutoBodyShop",
          "name": "ServiceHub Detailing Studio",
          "image": "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop",
          "@id": BUSINESS_INFO.siteUrl,
          "url": BUSINESS_INFO.siteUrl,
          "telephone": BUSINESS_INFO.phoneE164,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "вул. Велика Васильківська, 100",
            "addressLocality": "Київ",
            "postalCode": "03150",
            "addressCountry": "UA"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 50.4285,
            "longitude": 30.5212
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday"
            ],
            "opens": "09:00",
            "closes": "20:00"
          },
          "sameAs": [
            "https://www.facebook.com/servicehub",
            "https://www.instagram.com/servicehub"
          ]
        }}
      />
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-20" />
          <img 
            src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2940&auto=format&fit=crop" 
            alt="Преміальний автомобіль" 
            className="w-full h-full object-cover scale-105"
          />
        </div>

        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" as const }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
              <Star className="w-3 h-3 text-blue-400 fill-blue-400" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-300">Преміальний догляд за авто</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-bold font-display mb-8 tracking-tighter text-white leading-[0.9]">
              ДОСКОНАЛІСТЬ <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
                У ДЕТАЛЯХ
              </span>
            </h1>
            
            <p className="text-lg text-gray-400 mb-12 max-w-xl mx-auto font-light leading-relaxed">
              Студія професійного догляду за автомобілем. 
              Ми створюємо еталонний вигляд та бездоганний технічний стан.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                to="/services"
                className="group relative px-10 py-5 bg-blue-600 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative text-white group-hover:text-black font-bold text-xs tracking-[0.3em] uppercase transition-colors">Наші Послуги</span>
              </Link>
              <Link 
                to="/contact"
                className="group px-10 py-5 border border-white/20 hover:border-white transition-all"
              >
                <span className="text-white font-bold text-xs tracking-[0.3em] uppercase">Консультація</span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4"
        >
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-500">Гортай</span>
          <div className="w-px h-12 bg-gradient-to-b from-blue-600 to-transparent" />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-[#050505] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: "Років досвіду", value: "10+", icon: <Trophy className="w-5 h-5" /> },
              { label: "Задоволених клієнтів", value: "5000+", icon: <Star className="w-5 h-5" /> },
              { label: "Послуг у прайсі", value: "25+", icon: <Sparkles className="w-5 h-5" /> },
              { label: "Гарантія якості", value: "100%", icon: <ShieldCheck className="w-5 h-5" /> }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 border border-white/10 mb-6 group-hover:border-blue-500 transition-colors">
                  <div className="text-blue-500">{stat.icon}</div>
                </div>
                <div className="text-3xl md:text-4xl font-bold font-display text-white mb-2">{stat.value}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 bg-[#050505] relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="mb-20 text-center">
            <span className="text-blue-500 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Як ми працюємо</span>
            <h2 className="text-4xl md:text-5xl font-bold font-display text-white">Процес Досконалості</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="text-6xl font-display font-bold text-white/5 mb-4 group-hover:text-blue-500/10 transition-colors">{step.number}</div>
                <h3 className="text-xl font-bold text-white mb-3 font-display">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-12 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-32 bg-[#080808] relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-full h-[800px] -translate-y-1/2 bg-blue-900/5 blur-[150px] pointer-events-none" />

        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div {...fadeInUp} className="mb-16 flex flex-col md:flex-row justify-between items-end gap-8 max-w-7xl mx-auto">
            <div className="max-w-xl">
              <span className="text-blue-500 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Портфоліо</span>
              <h2 className="text-5xl md:text-7xl font-bold font-display text-white mb-6 leading-[0.9]">
                Мистецтво <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">Деталей</span>
              </h2>
              <p className="text-gray-500 text-lg font-light">
                Кожен проект — це індивідуальна історія відновлення та захисту. Подивіться на результати нашої роботи.
              </p>
            </div>
            
            <div className="flex items-center gap-8">
              <div className="hidden md:flex items-center gap-6">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">
                  {String(carouselIndex + 1).padStart(2, '0')} <span className="mx-2 opacity-30">/</span> {String(portfolioItems.length).padStart(2, '0')}
                </div>
                <div className="w-48 h-[2px] bg-white/5 relative">
                  <motion.div 
                    className="absolute top-0 left-0 h-full bg-blue-600"
                    animate={{ width: `${((carouselIndex + 1) / portfolioItems.length) * 100}%` }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => scroll('left')}
                  className="w-16 h-16 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-white group"
                  disabled={carouselIndex === 0}
                >
                  <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => scroll('right')}
                  className="w-16 h-16 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-white group"
                  disabled={carouselIndex === portfolioItems.length - 1}
                >
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>

          <div className="relative overflow-visible cursor-grab active:cursor-grabbing px-[5vw]">
            <motion.div 
              ref={trackRef}
              drag="x"
              dragConstraints={{ left: -(portfolioItems.length - 1) * getCardWidth(), right: 0 }}
              onDragEnd={onDragEnd}
              animate={{ x: dragX }}
              transition={{ type: "spring", stiffness: 150, damping: 25 }}
              className="flex gap-8"
            >
              {portfolioItems.map((item, index) => {
                const isActive = index === carouselIndex;
                
                return (
                  <motion.div 
                    key={index}
                    animate={{ 
                      scale: isActive ? 1 : 0.95,
                      opacity: isActive ? 1 : 0.4,
                    }}
                    className="min-w-[85vw] md:min-w-[800px] aspect-[16/9] relative group overflow-hidden border border-white/5 bg-white/5"
                  >
                    <img 
                      src={item.image ?? item.url ?? portfolioFallbackImage} 
                      alt={item.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      onError={(event) => {
                        event.currentTarget.src = portfolioFallbackImage;
                      }}
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                    
                    {/* Content */}
                    <div className="absolute inset-0 p-12 flex flex-col justify-end">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="relative z-10"
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <span className="px-3 py-1 bg-blue-600 text-[10px] font-bold text-white uppercase tracking-[0.2em]">
                            {item.category}
                          </span>
                          <div className="h-px w-12 bg-white/20" />
                        </div>
                        <h3 className="text-3xl md:text-5xl font-bold font-display text-white mb-6 tracking-tight group-hover:text-blue-400 transition-colors">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-6 overflow-hidden">
                          <div className="flex items-center gap-3 group/link cursor-pointer">
                            <span className="text-xs font-bold text-white uppercase tracking-[0.3em]">Деталі Проекту</span>
                            <div className="w-12 h-px bg-white/30 group-hover/link:w-20 group-hover/link:bg-blue-500 transition-all duration-500" />
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Corner Accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent -translate-y-full translate-x-full group-hover:translate-y-0 group-hover:translate-x-0 transition-transform duration-700" />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
            <div className="lg:col-span-1">
              <span className="text-blue-500 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Відгуки</span>
              <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-8">Що Кажуть Клієнти</h2>
              <p className="text-gray-500 leading-relaxed mb-12">
                Ми цінуємо кожного клієнта та прагнемо до ідеального результату в кожній роботі.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-[#050505] bg-gray-800 overflow-hidden">
                      <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Avatar" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="text-white font-bold">4.9 / 5.0</div>
                  <div className="text-gray-500 text-xs uppercase tracking-widest">Відгуки Google</div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2 relative">
              <div className="relative h-[400px] md:h-[350px]">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={testimonialIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, ease: "easeOut" as const }}
                    className="absolute inset-0 bg-white/[0.02] border border-white/5 p-10 md:p-16 flex flex-col justify-center group hover:border-blue-500/30 transition-colors"
                  >
                    <div className="flex gap-1 mb-8">
                      {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-4 h-4 text-blue-500 fill-blue-500" />)}
                    </div>
                    <p className="text-xl md:text-2xl text-gray-300 italic leading-relaxed mb-10 font-light">
                      "{testimonials[testimonialIndex].text}"
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white text-lg font-bold font-display tracking-wide">{testimonials[testimonialIndex].name}</div>
                        <div className="text-blue-500 text-xs font-bold uppercase tracking-[0.2em]">{testimonials[testimonialIndex].role}</div>
                      </div>
                      <div className="text-6xl font-display font-bold text-white/5 pointer-events-none select-none">
                        {String(testimonialIndex + 1).padStart(2, '0')}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex gap-4 mt-8">
                <button 
                  onClick={prevTestimonial}
                  className="w-14 h-14 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all group"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={nextTestimonial}
                  className="w-14 h-14 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all group"
                >
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex-1 flex items-center justify-end gap-2 px-4">
                  {testimonials.map((_, i) => (
                    <button 
                      key={i}
                      onClick={() => setTestimonialIndex(i)}
                      className={`h-[2px] transition-all duration-500 ${i === testimonialIndex ? 'w-8 bg-blue-600' : 'w-4 bg-white/10 hover:bg-white/30'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-[#080808]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-20">
            <span className="text-blue-500 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Питання та відповіді</span>
            <h2 className="text-4xl md:text-5xl font-bold font-display text-white">Часті Запитання</h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-white/[0.02] border border-white/5 overflow-hidden transition-all">
                <summary className="flex items-center justify-between p-8 cursor-pointer list-none">
                  <span className="text-white font-bold font-display tracking-wide group-open:text-blue-500 transition-colors">{faq.question}</span>
                  <div className="w-8 h-8 border border-white/10 flex items-center justify-center group-open:rotate-45 transition-transform">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </summary>
                <div className="px-8 pb-8 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-8">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};


