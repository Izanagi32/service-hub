import { motion, useScroll, useSpring } from "motion/react";

/** Thin progress line that follows the page scroll. */
export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-[#d5b57a] via-[#f0d9a8] to-[#2f66f5]"
    />
  );
};
