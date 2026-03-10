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
    <div className="pt-32 pb-20 overflow-hidden bg-[#050505]">
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
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-3 text-[#d5b57a] text-[10px] font-bold tracking-[0.28em] uppercase mb-5">
              <span className="w-8 h-px bg-[#d5b57a]/80" />
              Преміальна Лінійка
            </span>
            <h1 className="text-5xl md:text-7xl font-bold font-display text-white mb-6 leading-[0.92]">
              Еталонний <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f4e4bf] via-[#d5b57a] to-[#b9904d]">Догляд</span>
            </h1>
            <p className="text-gray-300/90 text-lg font-light max-w-2xl leading-relaxed">
              Кожна послуга оформлена як окремий преміальний пакет: фокус на якості, результаті та чіткому сценарії запису.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => scroll('left')}
              aria-label="Попередня послуга"
              className="w-14 h-14 border border-[#d5b57a]/35 text-[#d5b57a] flex items-center justify-center hover:bg-[#d5b57a] hover:text-black transition-all group"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              aria-label="Наступна послуга"
              className="w-14 h-14 border border-[#d5b57a]/35 text-[#d5b57a] flex items-center justify-center hover:bg-[#d5b57a] hover:text-black transition-all group"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </section>

      <section className="relative mb-24">
        <div className="absolute top-1/2 left-0 w-full h-[640px] -translate-y-1/2 bg-[radial-gradient(circle_at_center,rgba(213,181,122,0.18),rgba(5,5,5,0))] blur-[90px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatePresence mode="wait">
            <motion.article
              key={activeService.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45 }}
              className="relative overflow-hidden border border-[#d5b57a]/25 bg-[#0a0a0a] shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
            >
              <img
                src={activeService.image}
                alt={activeService.title}
                className="absolute inset-0 w-full h-full object-cover opacity-28"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#070707]/94 to-[#090909]/84" />
              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(213,181,122,0.12),transparent_35%)]" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 p-8 md:p-12 lg:p-14">
                <div>
                  <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#d5b57a]/12 border border-[#d5b57a]/30 mb-8">
                    <span className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#e6cc95]">Пакет</span>
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
                      <div key={i} className="flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-gray-200">
                        <span className="w-1.5 h-1.5 bg-[#d5b57a]" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => openModal(activeService.title)}
                    className="w-full sm:w-auto px-10 py-5 bg-[#d5b57a] text-black font-bold text-xs tracking-[0.3em] uppercase hover:bg-[#e6cc95] transition-all inline-flex items-center justify-center gap-4 group/btn"
                  >
                    Записатися <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
                  </button>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="p-6 border border-[#d5b57a]/25 bg-black/35 backdrop-blur-sm">
                    <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#c1a772] mb-3">Орієнтовна ціна</div>
                    <div className="text-3xl md:text-4xl font-display font-bold text-white">{activeService.price}</div>
                  </div>

                  <div className="p-6 border border-white/10 bg-black/35 backdrop-blur-sm">
                    <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-400 mb-4">Ключова перевага</div>
                    <div className="flex items-center gap-3 text-[#e6cc95] text-sm font-semibold">
                      {activeService.icon}
                      <span className="text-white">{activeService.tooltip}</span>
                    </div>
                  </div>

                  {activeService.video && (
                    <button
                      type="button"
                      onClick={() => setActiveVideo(activeService.video!)}
                      className="w-full p-6 border border-[#d5b57a]/25 bg-[#d5b57a]/8 hover:bg-[#d5b57a]/16 transition-all text-left group/play"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#c1a772] mb-2">Відео процесу</div>
                          <div className="text-white font-semibold">Переглянути роботу в динаміці</div>
                        </div>
                        <div className="w-11 h-11 rounded-full border border-[#d5b57a]/45 flex items-center justify-center text-[#e6cc95] group-hover/play:scale-105 transition-transform">
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
                    className={`relative w-[240px] h-[144px] overflow-hidden border transition-all text-left ${
                      isActive
                        ? 'border-[#d5b57a] shadow-[0_16px_34px_rgba(213,181,122,0.25)]'
                        : 'border-white/10 hover:border-[#d5b57a]/45'
                    }`}
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                        isActive ? 'opacity-78 scale-105' : 'opacity-35'
                      }`}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <div className="text-[10px] uppercase tracking-[0.18em] text-[#d5b57a] mb-1">{service.price}</div>
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
                <div className="inline-flex items-center justify-center w-16 h-16 border border-[#d5b57a]/30 text-[#d5b57a] mb-6 group-hover:bg-[#d5b57a] group-hover:text-black transition-all">
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
              className="relative w-full max-w-5xl aspect-video bg-black shadow-2xl border border-[#d5b57a]/25"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="absolute -top-12 right-0 text-[#d5b57a] hover:text-white flex items-center gap-2 text-xs uppercase tracking-[0.2em] transition-colors"
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
