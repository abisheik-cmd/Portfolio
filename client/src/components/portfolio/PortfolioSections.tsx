import {
  Aperture,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Layers3,
  Mail,
  Scissors,
  WandSparkles,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { portfolioAssets } from "./portfolioAssets";
import { BrandFlicker } from "./BrandFlicker";
import { MinimalVideoPlayer } from "./MinimalVideoPlayer";

function WiggleText({ text, offset = 0 }: { text: string; offset?: number }) {
  return Array.from(text).map((character, index) => (
    <span
      className="wiggle-char"
      aria-hidden="true"
      key={`${offset}-${index}`}
      style={{ animationDelay: `${(offset + index) * 48}ms` }}
    >
      {character === " " ? "\u00a0" : character}
    </span>
  ));
}

export function Hero() {
  return (
    <section className="hero section-shell" id="home" aria-labelledby="hero-title">
      <div className="hero-title-wrap">
        <h1 className="hero-wordmark" id="hero-title" aria-label="ABIZK."><BrandFlicker wiggle /><span className="hero-period" aria-hidden="true">.</span></h1>
        <aside className="hero-about-aside" id="about" aria-labelledby="about-title">
          <h2 id="about-title">A clear idea.<br /><span>A visual point of view.</span></h2>
          <div className="hero-about-copy">
            <span className="hero-about-symbol" aria-hidden="true"><Aperture size={17} strokeWidth={1.3} /></span>
            <p>I'm ABIZK, a creative editor and designer working across video editing, motion graphics and graphic design. I bring those disciplines together to give each idea a clear visual direction.</p>
          </div>
        </aside>
      </div>
      <div className="hero-bottom">
        <div className="hero-role-block">
          <h2 className="hero-role">CREATIVE EDITOR<br /><span>&amp; DESIGNER</span></h2>
        </div>
        <div className="hero-intro-block">
          <p className="hero-positioning">Transforming ideas into impactful visuals through editing, motion and design.</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#works"><span>View My Work</span><ArrowUpRight size={17} strokeWidth={1.8} aria-hidden="true" /></a>
            <a className="text-link" href="#contact">Contact Me <ArrowRight size={15} aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

const posterProjects = [
  { number: "01", asset: portfolioAssets.posterOne },
  { number: "02", asset: portfolioAssets.posterTwo },
];

function PosterFrame({ number, asset }: { number: string; asset: string | null }) {
  return (
    <div className={`project-frame poster-frame${asset ? " has-asset" : ""}`}>
      {asset ? (
        <img src={asset} alt={`User-supplied poster design ${number}`} loading="lazy" />
      ) : (
        <div className="asset-placeholder poster-placeholder" role="img" aria-label={`Poster design ${number} placeholder`} />
      )}
    </div>
  );
}

export function FeaturedWork() {
  const videoSource = portfolioAssets.featuredVideo;

  return (
    <section className="works-section section-shell" id="works" aria-labelledby="works-title">
      <div className="section-heading works-heading">
        <h2 id="works-title" aria-label="THE WORK."><WiggleText text="THE WORK" /><span className="blue-period" aria-hidden="true">.</span></h2>
      </div>

      <div className="work-grid">
        {posterProjects.map(({ number, asset }) => (
          <article className="work-card poster-card" key={number} aria-label={`Project ${number} — Poster Design`}>
            <PosterFrame number={number} asset={asset} />
          </article>
        ))}

        <article className="work-card video-card" aria-label="Project 03 — Video Editing and Motion Graphics">
          <div className="project-frame video-frame">
            {videoSource ? (
              <MinimalVideoPlayer src={videoSource} />
            ) : (
              <div className="asset-placeholder video-placeholder" role="img" aria-label="Video project placeholder" />
            )}
          </div>
        </article>
      </div>
    </section>
  );
}

const services: { title: string; note: string; Icon: LucideIcon }[] = [
  { title: "Motion Graphics", note: "Give type and form a pulse through considered motion.", Icon: WandSparkles },
  { title: "Video Editing", note: "Shape the story with rhythm, pacing and a thoughtful cut.", Icon: Scissors },
  { title: "Graphic Design", note: "Build a clear visual language from image, type and layout.", Icon: Layers3 },
];

export function Services() {
  return (
    <section className="services-section section-shell" id="services" aria-labelledby="services-title">
      <div className="section-heading services-heading">
        <h2 id="services-title" aria-label="MADE TO MOVE."><WiggleText text="MADE TO" /><br /><span className="outlined-text"><WiggleText text="MOVE" offset={7} /></span><span className="blue-period" aria-hidden="true">.</span></h2>
      </div>
      <div className="service-list">
        {services.map(({ title, note, Icon }) => (
          <article className="service-row" key={title}>
            <div className="service-copy"><h3>{title}</h3><p className="service-note">{note}</p></div>
            <span className="service-icon"><Icon size={19} strokeWidth={1.5} aria-hidden="true" /></span>
          </article>
        ))}
      </div>
    </section>
  );
}

const processSteps = [
  { title: "GOT AN IDEA?", copy: "Bring the vision. Let's figure out the recipe." },
  { title: "PREP THE CONCEPT", copy: "Planning the ingredients before we cook." },
  { title: "LET'S COOK", copy: "Editing, designing and animating the vision." },
  { title: "SERVE THE FINAL CUT", copy: "Polished visuals, ready to make an impression." },
  { title: "GOT ANOTHER RECIPE?", copy: "Let's cook something new together." },
];

export function Process() {
  const trackRef = useRef<HTMLOListElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateActiveStep = () => {
      const slides = Array.from(track.querySelectorAll<HTMLElement>("[data-process-step]"));
      if (slides.length === 0) return;

      const trackLeft = track.getBoundingClientRect().left;
      const nearestStep = slides.reduce((nearest, slide, index) => {
        const currentDistance = Math.abs(slide.getBoundingClientRect().left - trackLeft);
        const nearestDistance = Math.abs(slides[nearest].getBoundingClientRect().left - trackLeft);
        return currentDistance < nearestDistance ? index : nearest;
      }, 0);

      setActiveStep((current) => current === nearestStep ? current : nearestStep);
    };

    track.addEventListener("scroll", updateActiveStep, { passive: true });
    return () => track.removeEventListener("scroll", updateActiveStep);
  }, []);

  const goToStep = (index: number) => {
    const track = trackRef.current;
    const slide = track?.querySelector<HTMLElement>(`[data-process-step="${index}"]`);
    if (!track || !slide) return;

    const left = slide.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left, behavior: reduceMotion ? "auto" : "smooth" });
    setActiveStep(index);
  };

  return (
    <section className="process-section" id="process" aria-labelledby="process-title">
      <div className="section-shell process-inner">
        <div className="process-heading">
          <h2 id="process-title" aria-label="THE RECIPE."><span className="process-word"><WiggleText text="T H E" /></span>{"  "}<span className="process-word"><WiggleText text="R E C I P E" offset={7} /></span><span className="process-period" aria-hidden="true">.</span></h2>
          <div className="process-controls" role="group" aria-label="Recipe step navigation">
            <span className="process-step-count" aria-live="polite">0{activeStep + 1}<span aria-hidden="true"> / 0{processSteps.length}</span></span>
            <button className="process-control" type="button" aria-label="Previous recipe step" disabled={activeStep === 0} onClick={() => goToStep(activeStep - 1)}><ChevronLeft size={18} aria-hidden="true" /></button>
            <button className="process-control" type="button" aria-label="Next recipe step" disabled={activeStep === processSteps.length - 1} onClick={() => goToStep(activeStep + 1)}><ChevronRight size={18} aria-hidden="true" /></button>
          </div>
        </div>
        <ol className="process-list" ref={trackRef} tabIndex={0} aria-label="Recipe steps">
          {processSteps.map(({ title, copy }, index) => (
            <li className="process-step" data-process-step={index} aria-current={activeStep === index ? "step" : undefined} aria-label={`Step ${index + 1} of ${processSteps.length}: ${title}`} key={title}>
              <span className="process-number">0{index + 1}</span>
              <div className="process-copy-wrap"><h3 className="process-name">{title}</h3><p className="process-copy">{copy}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const tools = [
  { name: "Adobe After Effects", logo: "/software/after-effects.svg" },
  { name: "Adobe Premiere Pro", logo: "/software/premiere-pro.svg" },
  { name: "Adobe Photoshop", logo: "/software/photoshop.svg" },
];

export function Tools() {
  return (
    <section className="tools-section section-shell" id="tools" aria-labelledby="tools-title">
      <div className="tools-intro">
        <h2 id="tools-title" aria-label="THE TOOLKIT."><WiggleText text="THE TOOLKIT" /><span className="blue-period" aria-hidden="true">.</span></h2>
      </div>
      <div className="tool-list">
        {tools.map(({ name, logo }) => (
          <div className="tool-item" key={name}>
            <img className="tool-logo" src={logo} alt="" aria-hidden="true" loading="lazy" />
            <span className="tool-name">{name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <footer className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="section-shell contact-inner">
        <div className="contact-main">
          <h2 id="contact-title" aria-label="LET’S MAKE IT MOVE."><WiggleText text="LET’S MAKE" /><br /><span className="outlined-text"><WiggleText text="IT MOVE" offset={11} /></span><b aria-hidden="true">.</b></h2>
          <a className="contact-button" href="mailto:abizk0306@gmail.com"><span>Let’s Cook</span><ArrowUpRight size={19} strokeWidth={1.6} aria-hidden="true" /></a>
        </div>
        <div className="contact-bottom" id="contact-details">
          <div className="contact-details">
            <a className="contact-method" href="https://www.instagram.com/abizk.ae/" target="_blank" rel="noreferrer"><Instagram size={17} strokeWidth={1.7} aria-hidden="true" /><span>@abizk.ae</span></a>
            <a className="contact-method" href="mailto:abizk0306@gmail.com"><Mail size={17} strokeWidth={1.7} aria-hidden="true" /><span>abizk0306@gmail.com</span></a>
          </div>
          <div className="pricing-note"><p>Every project has its own recipe. Pricing is determined by creative complexity, production requirements, editing time and delivery expectations.</p></div>
        </div>
        <div className="footer-signoff"><a href="#home" className="footer-wordmark" aria-label="ABIZK home"><BrandFlicker /><span className="footer-period" aria-hidden="true">.</span></a></div>
      </div>
    </footer>
  );
}
