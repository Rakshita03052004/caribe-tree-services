"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";
import Reveal from "./Reveal";

export default function Faq() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section section-alt">
      <div className="wrap narrow">
        <Reveal className="head">
          <p className="eyebrow">{t.faq.eyebrow}</p>
          <h2>{t.faq.title}</h2>
        </Reveal>
        <Reveal className="faq">
          {t.faq.items.map((it, i) => (
            <div key={i} className={`faq-item ${open === i ? "open" : ""}`}>
              <button className="faq-q" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
                {it.q}
                <span className="plus" aria-hidden />
              </button>
              <div className="faq-a">
                <div>
                  <p>{it.a}</p>
                </div>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
