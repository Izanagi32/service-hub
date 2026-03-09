import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Gauge,
  ChevronLeft,
  ChevronRight,
  Star,
  Play,
  X
} from 'lucide-react';
import { services } from '../constants';
import { SEO } from '../components/SEO';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut" as const }
};

interface ServicesProps {
  openModal: () => void;
}

export const Services = ({ openModal }: ServicesProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [showGrid, setShowGrid] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const getCardWidth = () => {
    if (trackRef.current && trackRef.current.firstElementChild) {
      return (trackRef.current.firstElementChild as HTMLElement).offsetWidth + 32;
    }
    const isMobile = window.innerWidth < 768;
    return isMobile ? window.innerWidth * 0.85 + 32 : 532; // 500px + 32px gap
  };

  const getOffset = (index: number) => {
    const cardWidth = getCardWidth();
    const containerWidth = containerRef.current?.offsetWidth || window.innerWidth;
    const centerOffset = (containerWidth - cardWidth + 32) / 2;
    return -index * cardWidth + centerOffset;
  };

  const updateCarousel = (index: number) => {
    setActiveIndex(index);
    setDragX(getOffset(index));
  };

  const scroll = (direction: 'left' | 'right') => {
    let nextIndex = direction === 'left' ? activeIndex - 1 : activeIndex + 1;
    if (nextIndex < 0) nextIndex = services.length - 1;
    if (nextIndex >= services.length) nextIndex = 0;
    updateCarousel(nextIndex);
  };

  const onDragEnd = (_: any, info: any) => {
    const cardWidth = getCardWidth();
    const threshold = 50;
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    if (offset < -threshold || velocity < -500) {
      const nextIndex = Math.min(activeIndex + 1, services.length - 1);
      updateCarousel(nextIndex);
    } else if (offset > threshold || velocity > 500) {
      const nextIndex = Math.max(activeIndex - 1, 0);
      updateCarousel(nextIndex);
    } else {
      updateCarousel(activeIndex);
    }
  };

  useEffect(() => {
    const handleResize = () => updateCarousel(activeIndex);
    window.addEventListener('resize', handleResize);
    // Initial position
    setTimeout(() => updateCarousel(0), 100);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      scroll('right');
    }, 6000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  return (
    <div className="pt-32 pb-20 overflow-hidden">
      <SEO 
        title="Послуги" 
        description="Повний спектр послуг з догляду за авто: 3D розвал-сходження, преміальне полірування, хімчистка та захист кузова плівкою в Києві."
        keywords="ціни на детейлінг, вартість полірування авто, розвал-сходження ціна київ, хімчистка авто ціна"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Детейлінг і догляд за авто",
          "provider": {
            "@type": "AutoBodyShop",
            "name": "ServiceHub",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Київ",
              "addressCountry": "UA"
            }
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Каталог послуг",
            "itemListElement": services.map(s => ({
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": s.title,
                "description": s.description
              },
              "priceSpecification": {
                "@type": "PriceSpecification",
                "price": s.price.replace(/[^0-9]/g, ''),
                "priceCurrency": "UAH"
              }
            }))
          }
        }}
      />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div {...fadeInUp} className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="max-w-2xl">
            <span className="text-blue-500 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Наші Послуги</span>
            <h1 className="text-5xl md:text-7xl font-bold font-display text-white mb-6 leading-[0.9]">
              Еталонний <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">Догляд</span>
            </h1>
            <p className="text-gray-400 text-lg font-light">
              Ми поєднали передові технології та багаторічний досвід, щоб надати вашому авто бездоганний вигляд.
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex bg-white/5 p-1 rounded-sm border border-white/10">
              <button 
                onClick={() => setShowGrid(false)}
                className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${!showGrid ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-white'}`}
              >
                Carousel
              </button>
              <button 
                onClick={() => setShowGrid(true)}
                className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${showGrid ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-white'}`}
              >
                Grid
              </button>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => scroll('left')}
                className="w-16 h-16 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all group"
              >
                <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="w-16 h-16 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all group"
              >
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Main Content Area */}
      <section className="relative mb-32 min-h-[600px]" ref={containerRef}>
        <div className="absolute top-1/2 left-0 w-full h-[600px] -translate-y-1/2 bg-blue-600/5 blur-[120px] pointer-events-none" />
        
        <AnimatePresence mode="wait">
          {!showGrid ? (
            <motion.div
              key="carousel"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                ref={trackRef}
                drag="x"
                dragConstraints={{ left: getOffset(services.length - 1), right: getOffset(0) }}
                onDragEnd={onDragEnd}
                animate={{ x: dragX }}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
                className="flex gap-8 cursor-grab active:cursor-grabbing px-[10vw]"
              >
                {services.map((service, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <motion.div
                      key={service.id}
                      animate={{ 
                        scale: isActive ? 1.05 : 0.85,
                        opacity: isActive ? 1 : 0.4,
                        filter: isActive ? 'blur(0px)' : 'blur(8px)',
                        zIndex: isActive ? 10 : 0
                      }}
                      className="min-w-[85vw] md:min-w-[550px] bg-white/[0.02] border border-white/10 relative overflow-hidden group transition-shadow duration-500"
                      style={{
                        boxShadow: isActive ? '0 20px 50px -12px rgba(37, 99, 235, 0.2)' : 'none'
                      }}
                    >
                      {/* Background Image with Dynamic Effects */}
                      <div className="absolute inset-0 z-0">
                        <motion.img 
                          src={service.image} 
                          alt={service.title} 
                          animate={{
                            opacity: isActive ? 0.6 : 0.15,
                            scale: isActive ? 1.1 : 1,
                            filter: isActive ? 'grayscale(0%)' : 'grayscale(100%)'
                          }}
                          transition={{ duration: 0.8 }}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent" />
                      </div>

                      <div className="relative z-10 p-10 md:p-12 h-full flex flex-col">
                        <div className="flex justify-between items-start mb-12">
                          <div className="text-6xl font-display font-bold text-white/5">{service.id}</div>
                          <div className="flex flex-col items-end gap-4">
                            <div className="bg-blue-600 text-white text-[10px] font-bold px-4 py-2 uppercase tracking-[0.2em]">
                              {service.price}
                            </div>
                            {service.video && (
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveVideo(service.video!);
                                }}
                                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-blue-600 hover:border-blue-600 transition-all group/play"
                              >
                                <Play size={20} className="fill-current group-hover/play:scale-110 transition-transform" />
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="mb-8">
                          <div className="w-14 h-14 border border-white/10 flex items-center justify-center text-blue-500 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                            {service.icon}
                          </div>
                          <h3 className="text-3xl font-bold text-white font-display mb-4 tracking-tight">{service.title}</h3>
                          <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                            {service.description}
                          </p>
                        </div>

                        <div className="mt-auto">
                          <div className="grid grid-cols-1 gap-4 mb-10">
                            {service.features.map((feature, i) => (
                              <motion.div 
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={isActive ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: 0.3 + i * 0.1 }}
                                className="flex items-center gap-3 text-[10px] text-gray-500 uppercase tracking-widest"
                              >
                                <div className="w-1 h-1 bg-blue-500" />
                                {feature}
                              </motion.div>
                            ))}
                          </div>

                          <button 
                            onClick={openModal}
                            className="w-full py-5 bg-white text-black font-bold text-xs tracking-[0.3em] uppercase hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-4 group/btn"
                          >
                            Записатися <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Progress Indicator */}
              <div className="mt-16 flex justify-center items-center gap-4 mb-20">
                {services.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => updateCarousel(i)}
                    className="group relative p-2"
                  >
                    <div className={`w-12 h-[2px] transition-all duration-500 ${i === activeIndex ? 'bg-blue-600' : 'bg-white/10 group-hover:bg-white/30'}`} />
                    {i === activeIndex && (
                      <motion.div 
                        layoutId="activeDot"
                        className="absolute -top-1 left-0 w-full h-full border-t-2 border-blue-600"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Quick Access Grid (Bento Style) */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-4 mb-10">
                  <div className="h-px flex-1 bg-white/5" />
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">Швидка Навігація</span>
                  <div className="h-px flex-1 bg-white/5" />
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {services.map((service, i) => (
                    <button
                      key={service.id}
                      onClick={() => updateCarousel(i)}
                      className={`group p-6 border transition-all duration-500 text-left relative overflow-hidden ${
                        i === activeIndex 
                          ? 'bg-blue-600 border-blue-600' 
                          : 'bg-white/[0.02] border-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className={`mb-4 transition-colors ${i === activeIndex ? 'text-white' : 'text-blue-500'}`}>
                        {service.icon}
                      </div>
                      <div className={`text-[10px] font-bold uppercase tracking-widest leading-tight ${
                        i === activeIndex ? 'text-white' : 'text-gray-400'
                      }`}>
                        {service.title}
                      </div>
                      <div className="absolute -bottom-2 -right-2 text-4xl font-display font-bold opacity-5 pointer-events-none">
                        {service.id}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {services.map((service, i) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => {
                      updateCarousel(i);
                      setShowGrid(false);
                    }}
                    className="group bg-white/[0.02] border border-white/5 p-8 hover:border-blue-500/50 transition-all cursor-pointer relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-6 flex flex-col items-end gap-4">
                      <div className="text-4xl font-display font-bold text-white/5 group-hover:text-blue-500/10 transition-colors">
                        {service.id}
                      </div>
                      {service.video && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveVideo(service.video!);
                          }}
                          className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-blue-600 hover:border-blue-600 transition-all group/play"
                        >
                          <Play size={16} className="fill-current group-hover/play:scale-110 transition-transform" />
                        </button>
                      )}
                    </div>
                    <div className="w-12 h-12 border border-white/10 flex items-center justify-center text-blue-500 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white font-display mb-4">{service.title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed mb-6 line-clamp-2">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-3 text-[10px] font-bold text-blue-500 uppercase tracking-widest">
                      Переглянути в каруселі <ArrowRight size={12} className="group-hover:translate-x-2 transition-transform" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Trust Section */}
      <section className="py-32 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <ShieldCheck className="w-8 h-8" />, title: "Гарантія Якості", desc: "Ми впевнені у своїй роботі та надаємо офіційну гарантію на всі послуги." },
              { icon: <Sparkles className="w-8 h-8" />, title: "Преміум Хімія", desc: "Використовуємо тільки сертифіковані матеріали від світових лідерів." },
              { icon: <Gauge className="w-8 h-8" />, title: "Точне Обладнання", desc: "Наше обладнання проходить регулярну калібрування для ідеального результату." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                {...fadeInUp}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 border border-white/10 text-blue-500 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white font-display mb-4">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-xl"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video bg-black shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setActiveVideo(null)}
                className="absolute -top-12 right-0 text-white/50 hover:text-white flex items-center gap-2 text-xs uppercase tracking-[0.2em] transition-colors"
              >
                Закрити <X size={20} />
              </button>
              
              <video 
                src={activeVideo} 
                autoPlay 
                controls 
                className="w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


