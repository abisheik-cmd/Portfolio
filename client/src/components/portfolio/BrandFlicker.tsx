import { useEffect, useState } from "react";

const BRAND_LETTERS = Array.from("ABIZK");

interface BrandFlickerProps {
  wiggle?: boolean;
}

export function BrandFlicker({ wiggle = false }: BrandFlickerProps) {
  const [flickeringLetters, setFlickeringLetters] = useState<Set<number>>(() => new Set());

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let active = true;
    const timeoutIds = new Set<number>();

    const scheduleTimeout = (callback: () => void, delay: number) => {
      const timeoutId = window.setTimeout(() => {
        timeoutIds.delete(timeoutId);
        if (active) callback();
      }, delay);
      timeoutIds.add(timeoutId);
    };

    const scheduleFlicker = (index: number) => {
      scheduleTimeout(() => {
        setFlickeringLetters((previous) => {
          const next = new Set(previous);
          next.add(index);
          return next;
        });

        scheduleTimeout(() => {
          setFlickeringLetters((previous) => {
            const next = new Set(previous);
            next.delete(index);
            return next;
          });
          scheduleFlicker(index);
        }, 55 + Math.random() * 90);
      }, 1600 + Math.random() * 5800);
    };

    BRAND_LETTERS.forEach((_, index) => scheduleFlicker(index));

    return () => {
      active = false;
      timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
      timeoutIds.clear();
    };
  }, []);

  return (
    <span className="brand-flicker" aria-hidden="true">
      {BRAND_LETTERS.map((letter, index) => (
        <span
          className={`brand-flicker-glyph${wiggle ? " wiggle-char" : ""}`}
          aria-hidden="true"
          key={`${letter}-${index}`}
          style={wiggle ? { animationDelay: `${index * 48}ms` } : undefined}
        >
          <span className={`brand-flicker-ink${flickeringLetters.has(index) ? " is-flickering" : ""}`}>
            {letter}
          </span>
        </span>
      ))}
    </span>
  );
}
