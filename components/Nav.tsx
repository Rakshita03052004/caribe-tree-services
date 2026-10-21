"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";

export default function Nav() {
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <>
      <div className="demo-bar">{t.demoBar}</div>
      <nav className={`nav ${scrolled ? "is-scrolled" : ""}`}>
        <div className="wrap nav-inner">
          <a href="#top" className="brand" aria-label="Caribe Tree Services">
            <span className="brand-mark" aria-hidden />
            Caribe <span className="brand-sub">Tree Services</span>
          </a>
          <div className="nav-links">
            <a href="#services">{t.nav.services}</a>
            <a href="#storm">{t.nav.storm}</a>
            <a href="#work">{t.nav.work}</a>
            <a href="#reviews">{t.nav.reviews}</a>
            <a href="#area">{t.nav.area}</a>
          </div>
          <div className="nav-right">
            <div className="seg" role="group" aria-label="Language">
              <span className="seg-thumb" style={{ transform: lang === "es" ? "translateX(100%)" : "none" }} />
              <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")} aria-pressed={lang === "en"}>
                EN
              </button>
              <button className={lang === "es" ? "on" : ""} onClick={() => setLang("es")} aria-pressed={lang === "es"}>
                ES
              </button>
            </div>
            <a href="#estimate" className="pill">
              {t.nav.estimate}
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
