import { useState, useEffect, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Instagram, Facebook, MapPin, Phone, Clock } from "lucide-react";
import { BUSINESS_INFO } from "../../siteContent";

interface LayoutProps {
  children: ReactNode;
  openModal: (serviceTitle?: string) => void;
}

export const Layout = ({ children, openModal }: LayoutProps) => {
  const logoSrc = `${import.meta.env.BASE_URL}logo.png`;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: "Головна", path: "/" },
    { name: "Послуги", path: "/services" },
    { name: "Про нас", path: "/about" },
    { name: "Команда", path: "/team" },
    { name: "Контакти", path: "/contact" },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30 selection:text-blue-100">
      <header className="fixed top-0 left-0 right-0 z-50 px-2 sm:px-4 lg:px-6 pt-[calc(var(--safe-top)+0.625rem)] sm:pt-[calc(var(--safe-top)+0.75rem)]">
        <div
          className={`mx-auto max-w-7xl rounded-lg sm:rounded-xl border transition-all duration-500 ${
            scrolled
              ? "border-white/15 bg-[#070a10]/88 backdrop-blur-xl shadow-[0_14px_34px_rgba(0,0,0,0.45)]"
              : "border-white/10 bg-[#070a10]/72 backdrop-blur-lg shadow-[0_8px_26px_rgba(0,0,0,0.35)]"
          }`}
        >
          <div className="h-[74px] sm:h-[84px] lg:h-[94px] px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
            <Link to="/" className="group tap-feedback inline-flex items-center gap-2 sm:gap-4 shrink-0 min-w-0 touch-manipulation">
              <div className="relative h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 rounded-full border border-white/20 bg-[#0d1421] flex items-center justify-center overflow-hidden shadow-[0_6px_14px_rgba(0,0,0,0.45)]">
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
                <img
                  src={logoSrc}
                  alt={BUSINESS_INFO.brand}
                  className="h-9 w-9 sm:h-12 sm:w-12 lg:h-16 lg:w-16 rounded-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="leading-none min-w-0">
                <div className="text-[11px] sm:text-[13px] lg:text-[14px] tracking-[0.16em] sm:tracking-[0.22em] uppercase text-gray-200 font-semibold whitespace-nowrap">
                  HubService
                </div>
                <div className="hidden sm:block text-[9px] lg:text-[10px] tracking-[0.2em] uppercase text-gray-500 mt-1.5 whitespace-nowrap">
                  Преміальний догляд за авто
                </div>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-8 lg:gap-10">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors relative group ${
                    location.pathname === item.path ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-[#d5b57a] transition-all ${
                      location.pathname === item.path ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => openModal()}
                className="tap-feedback touch-manipulation rounded-md border border-[#d5b57a]/35 bg-gradient-to-r from-[#1d2b42] to-[#23344f] hover:from-[#24354f] hover:to-[#2a3e5d] px-4 py-2 text-[11px] font-bold tracking-[0.16em] uppercase transition-all"
              >
                Записатися
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsMenuOpen((v) => !v)}
              aria-label={isMenuOpen ? "Закрити меню" : "Відкрити меню"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-main-menu"
              className="tap-feedback touch-manipulation md:hidden p-2.5 rounded-md border border-white/10 bg-white/[0.03] text-white/90 hover:text-white hover:border-white/25 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#d5b57a]/35 to-transparent" />
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-main-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="md:hidden mt-2 mx-auto max-w-7xl rounded-lg border border-white/15 bg-[#070a10]/95 backdrop-blur-xl shadow-[0_14px_28px_rgba(0,0,0,0.45)] max-h-[calc(100svh-112px-var(--safe-bottom))] overflow-y-auto pb-[max(var(--safe-bottom),0.5rem)]"
            >
              <div className="p-4 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`tap-feedback touch-manipulation block rounded-lg px-4 py-3 text-sm font-medium tracking-[0.12em] uppercase transition-colors ${
                      location.pathname === item.path ? "text-[#d5b57a] bg-white/5" : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    openModal();
                    setIsMenuOpen(false);
                  }}
                  className="tap-feedback touch-manipulation w-full mt-3 rounded-lg border border-[#d5b57a]/35 bg-gradient-to-r from-[#1d2b42] to-[#23344f] px-4 py-3 text-[11px] font-bold tracking-[0.16em] uppercase"
                >
                  Записатися
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>{children}</main>

      <footer className="bg-[#050505] pt-20 sm:pt-24 lg:pt-32 pb-10 sm:pb-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12 mb-14 sm:mb-16 lg:mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="inline-flex items-center gap-3 sm:gap-4 mb-7 sm:mb-8 rounded-xl border border-white/10 bg-white/[0.02] px-3.5 sm:px-4 py-3">
                <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full border border-white/20 bg-[#0d1421] flex items-center justify-center overflow-hidden shadow-[0_6px_14px_rgba(0,0,0,0.45)]">
                  <img src={logoSrc} alt={BUSINESS_INFO.brand} className="h-9 w-9 sm:h-11 sm:w-11 rounded-full object-cover" />
                </div>
                <div>
                  <div className="text-[12px] sm:text-[13px] tracking-[0.18em] sm:tracking-[0.2em] uppercase font-semibold text-white">HubService</div>
                  <div className="text-[9px] sm:text-[10px] tracking-[0.18em] sm:tracking-[0.2em] uppercase text-[#d5b57a] mt-1">Преміальний догляд за авто Studio</div>
                </div>
              </div>
              <p className="text-gray-500 max-w-sm mb-7 sm:mb-8 leading-relaxed text-sm sm:text-base">
                Ми надаємо преміальний сервіс догляду за автомобілем у Горохові.
                Наша репутація - це якість робіт, прозора комунікація та увага до деталей.
              </p>
              <div className="flex gap-4">
                <a href={BUSINESS_INFO.instagramUrl} target="_blank" rel="noopener noreferrer" className="tap-feedback touch-manipulation w-11 h-11 sm:w-12 sm:h-12 border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all group">
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-white" />
                </a>
                <a href={BUSINESS_INFO.facebookUrl} target="_blank" rel="noopener noreferrer" className="tap-feedback touch-manipulation w-11 h-11 sm:w-12 sm:h-12 border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all group">
                  <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-white" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold font-display uppercase tracking-widest mb-6 sm:mb-8">Навігація</h4>
              <ul className="space-y-4">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link to={item.path} className="tap-feedback touch-manipulation inline-flex text-gray-500 hover:text-blue-500 transition-colors text-sm uppercase tracking-widest">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold font-display uppercase tracking-widest mb-6 sm:mb-8">Контакти</h4>
              <ul className="space-y-5 sm:space-y-6">
                <li className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <span className="text-gray-500 text-sm leading-relaxed">{BUSINESS_INFO.addressLine},<br />{BUSINESS_INFO.city}, {BUSINESS_INFO.country}</span>
                </li>
                <li className="flex items-center gap-4">
                  <Phone className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <a href={`tel:${BUSINESS_INFO.phoneE164}`} className="tap-feedback touch-manipulation text-gray-500 text-sm hover:text-white transition-colors">{BUSINESS_INFO.phoneDisplay}</a>
                </li>
                <li className="flex items-center gap-4">
                  <Clock className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <span className="text-gray-500 text-sm">{BUSINESS_INFO.workingHoursShort}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-10 sm:pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center md:items-start gap-5 sm:gap-6">
            <p className="text-gray-600 text-[11px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-widest text-center md:text-left">© {new Date().getFullYear()} {BUSINESS_INFO.legalName}. Усі права захищені.</p>
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-5 sm:gap-8">
              <Link to="/privacy" className="tap-feedback touch-manipulation text-gray-600 hover:text-white text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.2em] transition-colors">Політика конфіденційності</Link>
              <Link to="/terms" className="tap-feedback touch-manipulation text-gray-600 hover:text-white text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.2em] transition-colors">Умови сервісу</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
