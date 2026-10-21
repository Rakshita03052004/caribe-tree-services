"use client";

import { useLang } from "@/lib/i18n";
import { SITE } from "@/lib/site";

export default function Footer() {
  const { t } = useLang();
  return (
    <>
      <footer className="footer">
        <div className="wrap footer-inner">
          <div>
            <p className="footer-brand">{SITE.legal}</p>
            <p>{t.footer.tag}</p>
          </div>
          <div className="footer-contact">
            <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a>
            <a href={SITE.whatsapp} target="_blank" rel="noopener">WhatsApp</a>
            <span>{SITE.city}</span>
          </div>
        </div>
        <div className="wrap footer-base">
          <span>© 2026 {SITE.legal}</span>
          <span>{t.footer.demo}</span>
        </div>
      </footer>

      {/* floating WhatsApp (desktop) + call bar (mobile) */}
      <a href={SITE.whatsapp} target="_blank" rel="noopener" className="wa-float">
        <span className="wa-dot" aria-hidden />
        {t.wa}
      </a>
      <div className="mbar">
        <a href={SITE.phoneHref}>{t.call}</a>
        <a href={SITE.whatsapp} target="_blank" rel="noopener" className="mbar-wa">
          {t.wa}
        </a>
      </div>
    </>
  );
}
