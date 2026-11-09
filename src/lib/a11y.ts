import { useEffect, useRef } from "react";

let lockCount = 0;

const applyLock = (locked: boolean) => {
  document.body.style.overflow = locked ? "hidden" : "";
  document.body.style.paddingRight = locked ? "0px" : "";
};

/** Shared body scroll lock so the menu and the modal never fight over `overflow`. */
export const useScrollLock = (active: boolean) => {
  useEffect(() => {
    if (!active) return;

    lockCount += 1;
    if (lockCount === 1) applyLock(true);

    return () => {
      lockCount = Math.max(0, lockCount - 1);
      if (lockCount === 0) applyLock(false);
    };
  }, [active]);
};

/**
 * Keeps keyboard focus inside an open dialog, closes it on Escape
 * and returns focus to the element that opened it.
 */
export const useFocusTrap = <T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  active: boolean,
  onClose: () => void,
) => {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!active) return;

    const node = ref.current;
    if (!node) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    const focusable = (): HTMLElement[] =>
      Array.from(
        node.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.offsetParent !== null || el === document.activeElement);

    const raf = window.requestAnimationFrame(() => {
      const target =
        node.querySelector<HTMLElement>("[data-autofocus]") ?? focusable()[0];
      target?.focus({ preventScroll: true });
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key !== "Tab") return;

      const items = focusable();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, [active, ref]);
};
