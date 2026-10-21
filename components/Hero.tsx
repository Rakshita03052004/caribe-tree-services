"use client";

import { useEffect, useRef } from "react";
import { useLang } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import TreeCanvas from "./TreeCanvas";

export default function Hero() {
  const { t } = useLang();
  const copy = useRef<HTMLDivElement>(null);

  // Gentle parallax: the headline drifts and fades as you scroll past it.
  useEffect(() => {
    const el = copy.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 700);
        el.style.transform = `translateY(${y * 0.25}px) scale(${1 - y / 5000})`;
        el.style.opacity = String(1 - y / 650);
      });
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className="hero" id="top">
      <div className="hero-sky" aria-hidden />
      <div className="wrap hero-copy" ref={copy}>
        <p className="eyebrow fade-up" style={{ animationDelay: "100ms" }}>
          {t.hero.eyebrow}
        </p>
        <h1 className="hero-title">
          <span className="fade-up" style={{ animationDelay: "200ms" }}>
            {t.hero.title1}
          </span>
          <span className="fade-up grad" style={{ animationDelay: "380ms" }}>
            {t.hero.title2}
          </span>
        </h1>
        <p className="lede fade-up" style={{ animationDelay: "560ms" }}>
          {t.hero.lede}
        </p>
        <div className="ctas fade-up" style={{ animationDelay: "720ms" }}>
          <a href={SITE.phoneHref} className="btn btn-primary">
            {t.hero.call}
          </a>
          <a href="#estimate" className="btn btn-link">
            {t.hero.estimate} <span aria-hidden>›</span>
          </a>
        </div>
      </div>
      <div className="hero-stage">
        <TreeCanvas />
      </div>
      <div className="scroll-cue" aria-hidden>
        <span>{t.hero.scroll}</span>
        <i />
      </div>
    </header>
  );
}
