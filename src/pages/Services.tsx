import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Gauge,
  ChevronLeft,
  ChevronRight,
  Play,
  X,
} from 'lucide-react';
import { services } from '../constants';
import { SEO } from '../components/SEO';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: 'easeOut' as const },
};

interface ServicesProps {
  openModal: (serviceTitle?: string) => void;
}

export const Services = ({ openModal }: ServicesProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const normalizedIndex = ((activeIndex % services.length) + services.length) % services.length;
  const activeService = services[normalizedIndex] ?? services[0];

  const updateCarousel = (index: number) => {
    setActiveIndex(((index % services.length) + services.length) % services.length);
  };

  const scroll = (direction: 'left' | 'right') => {
    const nextIndex = direction === 'left' ? normalizedIndex - 1 : normalizedIndex + 1;
    updateCarousel(nextIndex);
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      updateCarousel(normalizedIndex + 1);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [normalizedIndex]);

  return (
    <div className="pt-32 pb-20 overflow-hidden">
      <SEO
        title="Послуги"
        description="Повний спектр послуг з догляду за авто: 3D розвал-сходження, преміальне полірування, хімчистка та захист кузова плівкою в Києві."
        keywords="ціни на детейлінг, вартість полірування авто, розвал-сходження ціна київ, хімчистка авто ціна"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: 'Детейлінг і догляд за авто',
          provider: {
            '@type': 'AutoBodyShop',
            name: 'ServiceHub',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Київ',
              addressCountry: 'UA',
            },
          },
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Каталог послуг',
            itemListElement: services.map((service) => ({
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: service.title,
                description: service.description,
              },
              priceSpecification: {
                '@type': 'PriceSpecification',
                price: service.price.replace(/[^0-9]/g, ''),
                priceCurrency: 'UAH',
              },
            })),
          },
        }}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <motion.div {...fadeInUp} className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="max-w-2xl">
            <span className="text-blue-500 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Наші Послуги</span>
            <h1 className="text-5xl md:text-7xl font-bold font-display text-white mb-6 leading-[0.9]">
              Еталонний <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">Догляд</span>
            </h1>
            <p className="text-gray-400 text-lg font-light">
              Оберіть послугу з галереї нижче. Головна картка показує деталі, вартість та швидкий запис без зайвих перемикачів.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => scroll('left')}
              aria-label="Попередня послуга"
              className="w-14 h-14 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all group"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              aria-label="Наступна послуга"
              className="w-14 h-14 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all group"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </section>

      <section className="relative mb-24">
        <div className="absolute top-1/2 left-0 w-full h-[620px] -translate-y-1/2 bg-blue-600/5 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatePresence mode="wait">
            <motion.article
              key={activeService.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45 }}
              className="relative overflow-hidden border border-white/10 bg-white/[0.02]"
            >
              <img
                src={activeService.image}
                alt={activeService.title}
                className="absolute inset-0 w-full h-full object-cover opacity-30"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/92 to-[#050505]/80" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 p-8 md:p-12">
                <div>
                  <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 border border-white/20 mb-8">
                    <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-blue-300">Послуга</span>
                    <span className="text-xs font-bold text-white">#{activeService.id}</span>
                  </div>

                  <h2 className="text-3xl md:text-5xl font-bold font-display text-white mb-5 leading-tight">
                    {activeService.title}
                  </h2>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl mb-10">
                    {activeService.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                    {activeService.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-gray-300">
                        <span className="w-1.5 h-1.5 bg-blue-500" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => openModal(activeService.title)}
                    className="w-full sm:w-auto px-10 py-5 bg-white text-black font-bold text-xs tracking-[0.3em] uppercase hover:bg-blue-600 hover:text-white transition-all inline-flex items-center justify-center gap-4 group/btn"
                  >
                    Записатися <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
                  </button>
                </div>

                <div className="flex flex-col justify-between gap-8">
                  <div className="p-6 border border-white/10 bg-black/25 backdrop-blur-sm">
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">Орієнтовна ціна</div>
                    <div className="text-3xl font-display font-bold text-white">{activeService.price}</div>
                  </div>

                  <div className="p-6 border border-white/10 bg-black/25 backdrop-blur-sm">
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Перевага</div>
                    <div className="flex items-center gap-3 text-blue-300 text-sm font-semibold">
                      {activeService.icon}
                      <span>{activeService.tooltip}</span>
                    </div>
                  </div>

                  {activeService.video && (
                    <button
                      type="button"
                      onClick={() => setActiveVideo(activeService.video!)}
                      className="w-full p-6 border border-white/10 bg-white/5 hover:bg-blue-600/20 hover:border-blue-500/40 transition-all text-left group/play"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Відео процесу</div>
                          <div className="text-white font-semibold">Переглянути роботу в динаміці</div>
                        </div>
                        <div className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white group-hover/play:scale-105 transition-transform">
                          <Play size={18} className="fill-current" />
                        </div>
                      </div>
                    </button>
                  )}
                </div>
              </div>
            </motion.article>
          </AnimatePresence>

          <div className="mt-8 overflow-x-auto pb-2">
            <div className="flex gap-4 min-w-max">
              {services.map((service, index) => {
                const isActive = index === normalizedIndex;
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => updateCarousel(index)}
                    className={`relative w-[240px] h-[140px] overflow-hidden border transition-all text-left ${
                      isActive
                        ? 'border-blue-500 shadow-[0_12px_30px_rgba(37,99,235,0.28)]'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                        isActive ? 'opacity-70 scale-105' : 'opacity-35'
                      }`}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <div className="text-[10px] uppercase tracking-[0.18em] text-blue-300 mb-1">{service.price}</div>
                      <div className="text-sm font-bold text-white leading-tight">{service.title}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <ShieldCheck className="w-8 h-8" />, title: 'Гарантія Якості', desc: 'Ми впевнені у своїй роботі та надаємо офіційну гарантію на всі послуги.' },
              { icon: <Sparkles className="w-8 h-8" />, title: 'Преміум Хімія', desc: 'Використовуємо тільки сертифіковані матеріали від світових лідерів.' },
              { icon: <Gauge className="w-8 h-8" />, title: 'Точне Обладнання', desc: 'Наше обладнання проходить регулярне калібрування для ідеального результату.' },
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
                type="button"
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
