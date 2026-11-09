interface MarqueeProps {
  items: string[];
  reverse?: boolean;
}

/**
 * Seamless CSS marquee. Decorative: the same items are already available
 * in the services list, so the strip is hidden from assistive tech.
 */
export const Marquee = ({ items, reverse = false }: MarqueeProps) => {
  const group = (key: string) => (
    <div key={key} className="flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12">
      {items.map((item) => (
        <span key={`${key}-${item}`} className="flex items-center gap-8 sm:gap-12">
          <span className="whitespace-nowrap font-display text-lg font-medium uppercase tracking-[0.14em] text-white/70 sm:text-2xl">
            {item}
          </span>
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#d5b57a]" />
        </span>
      ))}
    </div>
  );

  return (
    <div
      aria-hidden="true"
      className="group relative flex overflow-hidden border-y border-white/10 bg-[#080808] py-5 sm:py-6"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#080808] to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#080808] to-transparent sm:w-32" />

      <div className={`marquee-track flex w-max ${reverse ? "marquee-track--reverse" : ""}`}>
        {group("a")}
        {group("b")}
      </div>
    </div>
  );
};
