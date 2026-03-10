import { useState, useRef, useEffect, useCallback, SyntheticEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, 
  ChevronRight, 
  ChevronLeft,
  Sparkles,
  ShieldCheck,
  Trophy,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { portfolioItems, processSteps, testimonials, faqs, services } from '../constants';
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
  const portfolioImageFallbacks = services.map((service) => service.image);

  const getPortfolioImageCandidates = (
    primaryImage: string | undefined,
    legacyImage: string | undefined,
    index: number,
  ): string[] => {
    const serviceFallback =
      portfolioImageFallbacks.length > 0
        ? portfolioImageFallbacks[index % portfolioImageFallbacks.length]
        : undefined;

    return Array.from(
      new Set(
        [primaryImage, legacyImage, serviceFallback, ...portfolioImageFallbacks, portfolioFallbackImage].filter(
          Boolean,
        ) as string[],
      ),
    );
  };

  const handlePortfolioImageError = (event: SyntheticEvent<HTMLImageElement>) => {
    const target = event.currentTarget;
    const chain = (target.dataset.fallbackChain ?? "")
      .split("||")
      .map((src) => src.trim())
      .filter(Boolean);

    const nextSrc = chain.shift();
    if (nextSrc) {
      target.dataset.fallbackChain = chain.join("||");
      target.src = nextSrc;
      return;
    }

    if (target.dataset.finalFallbackApplied === "true") {
      return;
    }

    target.dataset.finalFallbackApplied = "true";
    target.src = portfolioFallbackImage;
  };

  const getCardWidth = useCallback(() => {
    if (trackRef.current && trackRef.current.firstElementChild) {
      const firstCard = trackRef.current.firstElementChild as HTMLElement;
      const trackStyles = window.getComputedStyle(trackRef.current);
      const gap = Number.parseFloat(trackStyles.columnGap || trackStyles.gap || "0");
      return firstCard.offsetWidth + (Number.isNaN(gap) ? 0 : gap);
    }

    if (window.innerWidth >= 1024) {
      return window.innerWidth * 0.78;
    }

    if (window.innerWidth >= 640) {
      return window.innerWidth * 0.84;
    }

    return window.innerWidth * 0.9;
  }, []);

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
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? -1 : index));
  };

  useEffect(() => {
    const syncCarouselPosition = () => {
      const nextX = -carouselIndex * getCardWidth();
      setDragX((prev) => (Math.abs(prev - nextX) < 0.5 ? prev : nextX));
    };

    const handleViewportChange = () => {
      window.requestAnimationFrame(syncCarouselPosition);
    };

    syncCarouselPosition();
    window.addEventListener('resize', handleViewportChange);
    window.addEventListener('orientationchange', handleViewportChange);

    return () => {
      window.removeEventListener('resize', handleViewportChange);
      window.removeEventListener('orientationchange', handleViewportChange);
    };
  }, [carouselIndex, getCardWidth]);

  return (
    <>
      <SEO 
        title="Головна" 
        description="HubService - автосервіс у Горохові. Мийка, хімчистка, полірування, заправка кондиціонерів та 3D розвал-сходження."
        keywords="мийка горохів, хімчистка авто, полірування авто, заправка кондиціонера авто, 3d розвал-сходження"
        schema={{
          "@context": "https://schema.org",
          "@type": "AutoBodyShop",
          "name": "HubService",
          "image": "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop",
          "@id": BUSINESS_INFO.siteUrl,
          "url": BUSINESS_INFO.siteUrl,
          "telephone": BUSINESS_INFO.phoneE164,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "вул. Козацька, 98",
            "addressLocality": "Горохів",
            "postalCode": "45700",
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
            "https://www.facebook.com/hubservice",
            "https://www.instagram.com/hubservice"
          ]
        }}
      />
      {/* Hero Section */}
      <section className="relative min-h-[100svh] md:h-screen flex items-center justify-center overflow-hidden pt-24 sm:pt-28 md:pt-0">
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 sm:mb-8">
              <Star className="w-3 h-3 text-blue-400 fill-blue-400" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-300">Преміальний догляд за авто</span>
            </div>
            
            <h1 className="text-[2.2rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-display mb-6 sm:mb-8 tracking-tighter text-white leading-[0.92]">
              ДОСКОНАЛІСТЬ <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
                У ДЕТАЛЯХ
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-gray-400 mb-8 sm:mb-12 max-w-xl mx-auto font-light leading-relaxed">
              Студія професійного догляду за автомобілем. 
              Ми створюємо еталонний вигляд та бездоганний технічний стан.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto">
              <Link 
                to="/services"
                className="group tap-feedback relative w-full sm:w-auto px-7 sm:px-10 py-4 sm:py-5 bg-blue-600 overflow-hidden touch-manipulation"
              >
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative text-white group-hover:text-black font-bold text-xs tracking-[0.3em] uppercase transition-colors">Наші Послуги</span>
              </Link>
              <Link 
                to="/contact"
                className="group tap-feedback w-full sm:w-auto px-7 sm:px-10 py-4 sm:py-5 border border-white/20 hover:border-white transition-all touch-manipulation"
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
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 hidden md:flex flex-col items-center gap-4"
        >
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-500">Гортай</span>
          <div className="w-px h-12 bg-gradient-to-b from-blue-600 to-transparent" />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-[#050505] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
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
                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 border border-white/10 mb-4 sm:mb-6 group-hover:border-blue-500 transition-colors">
                  <div className="text-blue-500">{stat.icon}</div>
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-white mb-1 sm:mb-2">{stat.value}</div>
                <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.16em] sm:tracking-widest text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-[#050505] relative border-t border-white/5 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[420px] bg-[radial-gradient(circle,rgba(37,99,235,0.16),rgba(0,0,0,0))] blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div {...fadeInUp} className="mb-12 sm:mb-14 lg:mb-16 text-center max-w-3xl mx-auto">
            <span className="text-blue-500 text-xs font-bold tracking-[0.22em] uppercase mb-4 block">Як ми працюємо</span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold font-display text-white mb-5">Процес Досконалості</h2>
            <p className="text-gray-300/90 leading-relaxed">
              Кожен етап побудований так, щоб ви отримали прогнозований результат, прозору комунікацію та контроль якості на фініші.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-6 sm:gap-8 lg:gap-10 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="border border-white/10 bg-white/[0.02] p-6 sm:p-8 md:p-10"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 border border-blue-500/35 bg-blue-500/10 mb-8">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span className="text-[10px] uppercase tracking-[0.22em] font-bold text-blue-300">Service Blueprint</span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-display text-white font-bold mb-4">4 кроки до ідеального результату</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-8">
                Ми працюємо за чіткою схемою: від первинної консультації до фінального контролю якості та рекомендацій по подальшому догляду.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {[
                  { label: 'Етапів', value: String(processSteps.length) },
                  { label: 'Контроль', value: '100%' },
                  { label: 'Комунікація', value: 'Прозора' },
                  { label: 'Підхід', value: 'Індивідуальний' },
                ].map((item) => (
                  <div key={item.label} className="border border-white/10 bg-black/20 p-4">
                    <div className="text-[10px] text-gray-500 uppercase tracking-[0.16em] mb-2">{item.label}</div>
                    <div className="text-white font-bold text-sm break-words">{item.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {processSteps.map((step, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="relative border border-white/10 bg-white/[0.02] p-5 sm:p-6 md:p-7 group hover:border-blue-500/45 hover:bg-blue-950/10 transition-all"
                >
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">Крок</span>
                    <span className="text-xl font-display font-bold text-blue-300">{step.number}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white font-display mb-3 group-hover:text-blue-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{step.description}</p>

                  <div className="mt-6 h-px w-full bg-gradient-to-r from-blue-500/40 via-white/20 to-transparent" />
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-[#080808] relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-full h-[800px] -translate-y-1/2 bg-blue-900/5 blur-[150px] pointer-events-none" />

        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div {...fadeInUp} className="mb-12 sm:mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 sm:gap-8 max-w-7xl mx-auto">
            <div className="max-w-xl">
              <span className="text-blue-500 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Портфоліо</span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display text-white mb-5 sm:mb-6 leading-[0.92]">
                Мистецтво <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">Деталей</span>
              </h2>
              <p className="text-gray-500 text-base sm:text-lg font-light">
                Кожен проект — це індивідуальна історія відновлення та захисту. Подивіться на результати нашої роботи.
              </p>
            </div>
            
            <div className="flex items-center justify-between md:justify-start gap-4 sm:gap-8 w-full md:w-auto">
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
              <div className="flex gap-3 sm:gap-4">
                <button 
                  onClick={() => scroll('left')}
                  className="tap-feedback touch-manipulation w-12 h-12 sm:w-16 sm:h-16 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-white group"
                  disabled={carouselIndex === 0}
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => scroll('right')}
                  className="tap-feedback touch-manipulation w-12 h-12 sm:w-16 sm:h-16 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-white group"
                  disabled={carouselIndex === portfolioItems.length - 1}
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>

          <div className="relative overflow-visible cursor-grab active:cursor-grabbing touch-pan-y px-[4vw] sm:px-[5vw]">
            <motion.div 
              ref={trackRef}
              drag="x"
              dragConstraints={{ left: -(portfolioItems.length - 1) * getCardWidth(), right: 0 }}
              onDragEnd={onDragEnd}
              animate={{ x: dragX }}
              transition={{ type: "spring", stiffness: 150, damping: 25 }}
              className="flex gap-4 sm:gap-6 lg:gap-8"
            >
              {portfolioItems.map((item, index) => {
                const isActive = index === carouselIndex;
                const imageCandidates = getPortfolioImageCandidates(item.image, item.url, index);
                const primaryImage = imageCandidates[0] ?? portfolioFallbackImage;
                const fallbackChain = imageCandidates.slice(1).join("||");

                return (
                  <motion.div 
                    key={index}
                    animate={{ 
                      scale: isActive ? 1 : 0.95,
                      opacity: isActive ? 1 : 0.4,
                    }}
                    className="min-w-[88vw] sm:min-w-[82vw] md:min-w-[74vw] lg:min-w-[760px] xl:min-w-[820px] aspect-[16/9] relative group overflow-hidden border border-white/5 bg-white/5"
                  >
                    <div className="absolute inset-0">
                      <img
                        src={portfolioFallbackImage}
                        alt={`${item.title} placeholder`}
                        className="w-full h-full object-cover opacity-35"
                      />
                      <img 
                        src={primaryImage}
                        data-fallback-chain={fallbackChain}
                        alt={item.title} 
                        className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        decoding="async"
                        onError={handlePortfolioImageError}
                      />
                    </div>
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                    
                    {/* Content */}
                    <div className="absolute inset-0 p-5 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-end">
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
                        <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold font-display text-white mb-4 sm:mb-6 tracking-tight group-hover:text-blue-400 transition-colors">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-6 overflow-hidden">
                          <div className="flex items-center gap-3 group/link cursor-pointer">
                            <span className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-[0.22em] sm:tracking-[0.3em]">Деталі Проекту</span>
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
      <section className="py-16 sm:py-24 lg:py-32 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 sm:gap-14 lg:gap-20">
            <div className="lg:col-span-1">
              <span className="text-blue-500 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Відгуки</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white mb-6 sm:mb-8">Що Кажуть Клієнти</h2>
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
              <div className="relative h-[460px] sm:h-[400px] md:h-[360px] lg:h-[350px]">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={testimonialIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, ease: "easeOut" as const }}
                    className="absolute inset-0 bg-white/[0.02] border border-white/5 p-6 sm:p-8 md:p-14 lg:p-16 flex flex-col justify-center group hover:border-blue-500/30 transition-colors"
                  >
                    <div className="flex gap-1 mb-8">
                      {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-4 h-4 text-blue-500 fill-blue-500" />)}
                    </div>
                    <p className="text-lg sm:text-xl md:text-2xl text-gray-300 italic leading-relaxed mb-8 sm:mb-10 font-light">
                      "{testimonials[testimonialIndex].text}"
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white text-base sm:text-lg font-bold font-display tracking-wide">{testimonials[testimonialIndex].name}</div>
                        <div className="text-blue-500 text-xs font-bold uppercase tracking-[0.2em]">{testimonials[testimonialIndex].role}</div>
                      </div>
                      <div className="text-5xl sm:text-6xl font-display font-bold text-white/5 pointer-events-none select-none">
                        {String(testimonialIndex + 1).padStart(2, '0')}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex gap-3 sm:gap-4 mt-8">
                <button 
                  onClick={prevTestimonial}
                  className="tap-feedback touch-manipulation w-11 h-11 sm:w-14 sm:h-14 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all group"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={nextTestimonial}
                  className="tap-feedback touch-manipulation w-11 h-11 sm:w-14 sm:h-14 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all group"
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
      <section className="py-16 sm:py-24 lg:py-32 bg-[#080808] relative overflow-hidden border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 w-[820px] h-[820px] -translate-x-1/2 -translate-y-1/2 bg-blue-700/10 blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-6 sm:gap-10 lg:gap-14 items-start">
            <motion.aside
              {...fadeInUp}
              className="lg:sticky lg:top-28 p-5 sm:p-8 md:p-10 border border-white/10 bg-white/[0.02]"
            >
              <span className="text-blue-400 text-[10px] font-bold tracking-[0.24em] uppercase mb-5 block">FAQ Concierge</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white leading-[1.02] mb-6">
                Часті <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Запитання</span>
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed mb-8">
                Зібрали найважливіші відповіді перед записом: терміни, оплата, зберігання авто та формат онлайн-заявки.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8">
                {[
                  { label: 'Відповідь', value: 'до 15 хв' },
                  { label: 'Пакетів', value: '6+' },
                  { label: 'Графік', value: '09:00-20:00' },
                  { label: 'Сервіс', value: 'Premium' },
                ].map((item) => (
                  <div key={item.label} className="border border-white/10 bg-black/20 p-4">
                    <div className="text-[10px] text-gray-500 uppercase tracking-[0.18em] mb-2">{item.label}</div>
                    <div className="text-white text-sm font-bold">{item.value}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <Link
                  to="/contact"
                  className="tap-feedback touch-manipulation w-full inline-flex items-center justify-center gap-3 px-5 sm:px-6 py-4 bg-blue-600 text-white text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.22em] hover:bg-white hover:text-black transition-all"
                >
                  Поставити питання <ArrowRight size={14} />
                </Link>
                <a
                  href={`tel:${BUSINESS_INFO.phoneE164}`}
                  className="tap-feedback touch-manipulation w-full inline-flex items-center justify-center border border-white/15 px-5 sm:px-6 py-4 text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.22em] text-gray-200 hover:border-blue-400 hover:text-white transition-all"
                >
                  Зателефонувати
                </a>
              </div>
            </motion.aside>

            <div className="space-y-4">
              {faqs.map((faq, i) => {
                const isOpen = openFaqIndex === i;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    className={`border transition-all ${isOpen ? 'border-blue-500/45 bg-blue-950/10' : 'border-white/10 bg-white/[0.02] hover:border-white/25'}`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${i}`}
                      className="tap-feedback touch-manipulation w-full p-4 sm:p-6 md:p-7 text-left flex items-center justify-between gap-4"
                    >
                      <span className={`font-display text-base sm:text-lg md:text-xl leading-snug ${isOpen ? 'text-white' : 'text-gray-100'}`}>
                        {faq.question}
                      </span>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-[10px] text-gray-500 font-bold tracking-[0.22em]">{String(i + 1).padStart(2, '0')}</span>
                        <span className={`w-9 h-9 border flex items-center justify-center transition-all ${isOpen ? 'border-blue-400 text-blue-300 rotate-90' : 'border-white/15 text-gray-400'}`}>
                          <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-answer-${i}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: 'easeOut' }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 sm:px-6 md:px-7 pb-4 sm:pb-6 md:pb-7 border-t border-white/10 pt-4 sm:pt-5">
                            <p className="text-gray-300 text-sm md:text-base leading-relaxed">{faq.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
