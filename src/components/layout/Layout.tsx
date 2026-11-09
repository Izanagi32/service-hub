import { useEffect, useRef, useState, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Clock, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { BUSINESS_INFO } from "../../siteContent";
import { ScrollProgress } from "../ScrollProgress";
import { ScrollToTop } from "../ScrollToTop";
import { useFocusTrap, useScrollLock } from "../../lib/a11y";

interface LayoutProps {
  children: ReactNode;
  openModal: (serviceTitle?: string) => void;
}

const navItems = [
  { name: "Головна", path: "/" },
  { name: "Послуги", path: "/services" },
  { name: "Про нас", path: "/about" },
  { name: "Команда", path: "/team" },
  { name: "Контакти", path: "/contact" },
];

export const Layout = ({ children, openModal }: LayoutProps) => {
  const logoSrc = `${import.meta.env.BASE_URL}logo-512.jpg`;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLElement>(null);

  useScrollLock(isMenuOpen);
  useFocusTrap(menuRef, isMenuOpen, () => setIsMenuOpen(false));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#050505] pb-[calc(4.75rem+var(--safe-bottom))] text-white selection:bg-[#3b6dff]/35 lg:pb-0">
      <ScrollProgress />
      <a href="#main-content" className="skip-link">
        Перейти до вмісту
      </a>

      <header className="fixed inset-x-0 top-0 z-50 px-2 pt-[calc(var(--safe-top)+0.625rem)] sm:px-4 sm:pt-[calc(var(--safe-top)+0.75rem)] lg:px-6">
        <div
          className={`mx-auto max-w-7xl rounded-lg border transition-all duration-500 sm:rounded-xl ${
            scrolled
              ? "border-white/20 bg-[#070a10]/95 shadow-[0_14px_34px_rgba(0,0,0,0.45)] backdrop-blur-xl"
              : "border-white/12 bg-[#070a10]/80 backdrop-blur-lg shadow-[0_8px_26px_rgba(0,0,0,0.35)]"
          }`}
        >
          <div className="flex h-[74px] items-center justify-between gap-3 px-3 sm:h-[84px] sm:px-6 lg:h-[90px] lg:px-8">
            <Link
              to="/"
              className="group inline-flex min-w-0 shrink-0 touch-manipulation items-center gap-2 sm:gap-3"
            >
              <span className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/25 bg-[#0d1421] sm:h-14 sm:w-14 lg:h-16 lg:w-16">
                <img
                  src={logoSrc}
                  alt=""
                  width={64}
                  height={64}
                  className="h-10 w-10 rounded-full object-cover transition-transform group-hover:scale-105 sm:h-12 sm:w-12 lg:h-14 lg:w-14"
                />
              </span>
              <span className="min-w-0 leading-none">
                <span className="block whitespace-nowrap text-[12px] font-semibold uppercase tracking-[0.16em] text-white sm:text-[13px] sm:tracking-[0.2em]">
                  {BUSINESS_INFO.brand}
                </span>
                <span className="mt-1.5 hidden whitespace-nowrap text-[9px] uppercase tracking-[0.2em] text-[#aab3c2] sm:block lg:text-[10px]">
                  {BUSINESS_INFO.tagline}
                </span>
              </span>
            </Link>

            <nav aria-label="Основна навігація" className="hidden items-center gap-7 lg:flex xl:gap-9">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    aria-current={isActive ? "page" : undefined}
                    className={`group relative py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors ${
                      isActive ? "text-white" : "text-[#aab3c2] hover:text-white"
                    }`}
                  >
                    {item.name}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-px bg-[#d5b57a] transition-all ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            <div className="hidden shrink-0 items-center gap-3 md:flex">
              <a
                href={`tel:${BUSINESS_INFO.phoneE164}`}
                className="hidden items-center gap-2 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#c3cad6] transition-colors hover:text-white xl:flex"
              >
                <Phone size={14} />
                {BUSINESS_INFO.phoneDisplay}
              </a>
              <button
                type="button"
                onClick={() => openModal()}
                className="touch-manipulation rounded-md border border-[#d5b57a]/45 bg-gradient-to-r from-[#243754] to-[#2c4266] px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] transition-all hover:from-[#2c4266] hover:to-[#35507a]"
              >
                Записатися
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsMenuOpen((value) => !value)}
              aria-label={isMenuOpen ? "Закрити меню" : "Відкрити меню"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-main-menu"
              className="touch-manipulation rounded-md border border-white/20 bg-white/[0.04] p-2.5 text-white transition-colors hover:border-white/40 lg:hidden"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#d5b57a]/35 to-transparent" />
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.button
                type="button"
                aria-label="Закрити меню"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-40 bg-black/75 backdrop-blur-[2px] lg:hidden"
                onClick={() => setIsMenuOpen(false)}
              />

              <motion.aside
                ref={menuRef}
                id="mobile-main-menu"
                aria-label="Мобільне меню"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 32 }}
                className="fixed right-0 top-0 z-50 h-[100svh] w-[88vw] max-w-[390px] border-l border-white/15 bg-[#060a12]/97 shadow-[-18px_0_50px_rgba(0,0,0,0.55)] backdrop-blur-xl lg:hidden"
              >
                <div className="flex h-full flex-col">
                  <div className="border-b border-white/10 px-4 pb-4 pt-[calc(var(--safe-top)+1rem)]">
                    <div className="flex items-center justify-between gap-3">
                      <div className="inline-flex min-w-0 items-center gap-3">
                        <img
                          src={logoSrc}
                          alt=""
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-full border border-white/20 object-cover"
                        />
                        <div className="min-w-0">
                          <div className="truncate text-[12px] font-semibold uppercase tracking-[0.16em] text-white">
                            {BUSINESS_INFO.brand}
                          </div>
                          <div className="mt-1 truncate text-[9px] uppercase tracking-[0.16em] text-[#aab3c2]">
                            {BUSINESS_INFO.tagline}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        aria-label="Закрити меню"
                        onClick={() => setIsMenuOpen(false)}
                        className="touch-manipulation rounded-md border border-white/20 p-2.5 text-white transition-colors hover:border-white/40"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>

                  <nav aria-label="Мобільна навігація" className="flex-1 overflow-y-auto px-3 py-3">
                    {navItems.map((item, index) => {
                      const isActive = location.pathname === item.path;
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          aria-current={isActive ? "page" : undefined}
                          className={`group flex items-center justify-between rounded-lg border px-3.5 py-4 text-sm font-semibold uppercase tracking-[0.1em] transition-colors ${
                            isActive
                              ? "border-[#d5b57a]/45 bg-white/5 text-[#f0d9a8]"
                              : "border-transparent text-[#d7dbe3] hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          <span>{item.name}</span>
                          <span className="text-[10px] tabular-nums text-[#8b93a3]">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </Link>
                      );
                    })}
                  </nav>

                  <div className="space-y-3 border-t border-white/10 px-4 pb-[max(var(--safe-bottom),1rem)] pt-3">
                    <button
                      type="button"
                      onClick={() => {
                        setIsMenuOpen(false);
                        openModal();
                      }}
                      className="w-full touch-manipulation rounded-lg border border-[#d5b57a]/45 bg-gradient-to-r from-[#243754] to-[#2c4266] px-4 py-4 text-[11px] font-bold uppercase tracking-[0.16em]"
                    >
                      Записатися
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={`tel:${BUSINESS_INFO.phoneE164}`}
                        className="touch-manipulation rounded-lg border border-white/15 bg-white/[0.03] px-3 py-3 text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-[#e5e9f0]"
                      >
                        Дзвінок
                      </a>
                      <a
                        href={BUSINESS_INFO.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="touch-manipulation rounded-lg border border-white/15 bg-white/[0.03] px-3 py-3 text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-[#e5e9f0]"
                      >
                        Карта
                      </a>
                    </div>
                  </div>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </header>

      <main id="main-content" tabIndex={-1}>
        {children}
      </main>

      <footer className="border-t border-white/10 bg-[#050505] pb-10 pt-16 sm:pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-12">
            <div className="md:col-span-2">
              <div className="mb-6 inline-flex items-center gap-3 rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3">
                <img
                  src={logoSrc}
                  alt=""
                  width={56}
                  height={56}
                  className="h-12 w-12 rounded-full border border-white/20 object-cover"
                />
                <div>
                  <div className="text-[13px] font-semibold uppercase tracking-[0.18em] text-white">
                    {BUSINESS_INFO.brand}
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-[#d5b57a]">
                    {BUSINESS_INFO.tagline}
                  </div>
                </div>
              </div>
              <p className="mb-6 max-w-sm text-base leading-relaxed text-[#aab3c2]">
                Студія догляду за авто у Горохові: мийка, хімчистка, полірування, кондиціонери
                та 3D розвал-сходження. Працюємо за погодженим кошторисом.
              </p>
              <a
                href={BUSINESS_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-white/20 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#e5e9f0] transition-colors hover:border-[#d5b57a] hover:text-white"
              >
                <MapPin size={15} />
                Ми на Google Maps
              </a>
            </div>

            <nav aria-label="Навігація у підвалі">
              <h2 className="mb-5 font-display text-sm font-semibold uppercase tracking-[0.16em] text-white">
                Навігація
              </h2>
              <ul className="space-y-3">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="tap-link text-sm text-[#aab3c2] transition-colors hover:text-white"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="mb-5 font-display text-sm font-semibold uppercase tracking-[0.16em] text-white">
                Контакти
              </h2>
              <ul className="space-y-4 text-sm text-[#aab3c2]">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#d5b57a]" />
                  <span>
                    {BUSINESS_INFO.addressLine},
                    <br />
                    {BUSINESS_INFO.city}, {BUSINESS_INFO.region}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-[#d5b57a]" />
                  <a
                    href={`tel:${BUSINESS_INFO.phoneE164}`}
                    className="tap-link transition-colors hover:text-white"
                  >
                    {BUSINESS_INFO.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 shrink-0 text-[#d5b57a]" />
                  <a
                    href={`mailto:${BUSINESS_INFO.email}`}
                    className="tap-link break-all transition-colors hover:text-white"
                  >
                    {BUSINESS_INFO.email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="h-5 w-5 shrink-0 text-[#d5b57a]" />
                  <span>{BUSINESS_INFO.workingHoursShort}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-8 md:flex-row md:items-start">
            <p className="text-center text-xs text-[#8b93a3] md:text-left">
              © {new Date().getFullYear()} {BUSINESS_INFO.legalName}. Усі права захищені.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-5 md:justify-end md:gap-8">
              <Link
                to="/privacy"
                className="tap-link text-xs uppercase tracking-[0.14em] text-[#8b93a3] transition-colors hover:text-white"
              >
                Політика конфіденційності
              </Link>
              <Link
                to="/terms"
                className="tap-link text-xs uppercase tracking-[0.14em] text-[#8b93a3] transition-colors hover:text-white"
              >
                Умови сервісу
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <ScrollToTop />

      <aside aria-label="Швидкий запис" className="fixed inset-x-0 bottom-0 z-30 border-t border-white/15 bg-[#080b12]/96 px-3 pb-[calc(var(--safe-bottom)+0.6rem)] pt-2.5 backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex max-w-md gap-2.5">
          <button
            type="button"
            onClick={() => openModal()}
            className="flex-1 touch-manipulation rounded-lg bg-[#2f66f5] px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white"
          >
            Записатися
          </button>
          <a
            href={`tel:${BUSINESS_INFO.phoneE164}`}
            className="flex flex-1 touch-manipulation items-center justify-center gap-2 rounded-lg border border-white/25 px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white"
          >
            <Phone size={15} />
            Подзвонити
          </a>
        </div>
      </aside>
    </div>
  );
};
