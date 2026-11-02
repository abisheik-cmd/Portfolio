import AimCursor from "@/components/portfolio/AimCursor";
import PortfolioNav from "@/components/portfolio/PortfolioNav";
import {
  Contact,
  FeaturedWork,
  Hero,
  Process,
  Services,
  Tools,
} from "@/components/portfolio/PortfolioSections";
import { useEffect, useState } from "react";

export default function Home() {
  const [isOpening, setIsOpening] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (!isOpening) return;
    const openingTimer = window.setTimeout(() => setIsOpening(false), 2050);
    return () => window.clearTimeout(openingTimer);
  }, [isOpening]);

  useEffect(() => {
    const blocks = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isOpening) {
      blocks.forEach((block) => block.classList.add("is-visible"));
      return;
    }

    if (reduceMotion || !("IntersectionObserver" in window)) {
      blocks.forEach((block) => block.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -7% 0px" },
    );

    blocks.forEach((block) => observer.observe(block));
    return () => observer.disconnect();
  }, [isOpening]);

  return (
    <>
      <AimCursor />
      <div className={`portfolio-page reveal-enabled${isOpening ? " is-opening" : ""}`}>
        <PortfolioNav isOpening={isOpening} />
        <main>
          <div className="reveal-block" data-reveal><Hero /></div>
          <div className="reveal-block" data-reveal><FeaturedWork /></div>
          <div className="reveal-block" data-reveal><Services /></div>
          <div className="reveal-block" data-reveal><Process /></div>
          <div className="reveal-block" data-reveal><Tools /></div>
        </main>
        <div className="reveal-block" data-reveal><Contact /></div>
      </div>
    </>
  );
}
