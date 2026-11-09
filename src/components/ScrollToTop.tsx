import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUp } from "lucide-react";

export const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 720);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <aside aria-label="Навігація сторінкою">
      <AnimatePresence>
        {visible && (
          <motion.button
            type="button"
            aria-label="Прокрутити на початок сторінки"
            onClick={() =>
              window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })
            }
            initial={{ opacity: 0, scale: 0.7, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 12 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            whileHover={reduceMotion ? undefined : { y: -3 }}
            className="fixed bottom-[calc(5.25rem+var(--safe-bottom))] right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#0b1220]/90 text-white shadow-[0_10px_30px_rgba(0,0,0,0.45)] backdrop-blur transition-colors hover:border-[#d5b57a] hover:text-[#d5b57a] md:bottom-8 md:right-8 md:h-12 md:w-12"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </aside>
  );
};
