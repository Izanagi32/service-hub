import { motion } from 'motion/react';
import { teamMembers } from '../constants';
import { SEO } from '../components/SEO';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut" as const }
};

export const Team = () => {
  return (
    <div className="pt-24 sm:pt-28 md:pt-32 pb-14 sm:pb-16 md:pb-20">
      <SEO 
        title="Команда" 
        description="Познайомтеся з нашими сертифікованими майстрами у Києві. Професіонали з багаторічним досвідом у сфері детейлінгу та сервісу."
        keywords="команда детейлерів, майстри розвал-сходження, спеціалісти з детейлінгу"
        schema={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": teamMembers.map((m, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "item": {
                "@type": "Person",
                "name": m.name,
                "jobTitle": m.role,
                "description": `${m.specialty}. ${m.experience}`,
                "image": m.image
              }
            }))
          }
        }}
      />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center mb-12 sm:mb-16 md:mb-20">
          <span className="text-blue-500 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Наша Команда</span>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold font-display text-white mb-5 sm:mb-6">Майстри Своєї Справи</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg font-light">
            Кожен член нашої команди - це сертифікований спеціаліст з багаторічним досвідом роботи у сфері детейлінгу.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10, scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                y: { type: "spring", stiffness: 400, damping: 25 },
                scale: { type: "spring", stiffness: 400, damping: 25 }
              }}
              className="group relative p-3 sm:p-4 rounded-2xl transition-all duration-500 hover:bg-white/[0.02] hover:shadow-[0_20px_50px_-20px_rgba(37,99,235,0.15)]"
            >
              <div className="relative aspect-[3/4] overflow-hidden border border-white/10 mb-6">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="bg-blue-600/90 backdrop-blur-md p-4 border border-blue-400/30">
                    <p className="text-white text-xs font-bold uppercase tracking-widest mb-1">{member.specialty}</p>
                    <p className="text-blue-100 text-[10px] uppercase tracking-wider">{member.experience}</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-lg sm:text-xl font-bold text-white font-display mb-1 tracking-wide">{member.name}</h3>
                <p className="text-blue-500 text-xs font-bold uppercase tracking-[0.2em]">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};


