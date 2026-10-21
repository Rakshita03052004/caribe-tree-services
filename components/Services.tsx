"use client";

import { useLang } from "@/lib/i18n";
import Reveal from "./Reveal";

// Each card gets its own abstract "texture" made from CSS gradients instead of stock icons.
const TONES = ["tone-forest", "tone-moss", "tone-bark", "tone-storm", "tone-sun"];

export default function Services() {
  const { t } = useLang();
  return (
    <section id="services" className="section">
      <div className="wrap">
        <Reveal className="head">
          <p className="eyebrow">{t.services.eyebrow}</p>
          <h2>{t.services.title}</h2>
          <p className="sub">{t.services.sub}</p>
        </Reveal>

        <div className="stack">
          {t.services.items.map((s, i) => (
            <article key={i} className={`stack-card ${TONES[i]}`} style={{ top: `calc(96px + ${i * 22}px)` }}>
              <div className="stack-copy">
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.name}</h3>
                <p>{s.desc}</p>
                <ul>
                  {s.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
              <div className="stack-art" aria-hidden>
                <span className="big-num">{String(i + 1).padStart(2, "0")}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
