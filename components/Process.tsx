"use client";

import { useLang } from "@/lib/i18n";
import Reveal from "./Reveal";

export default function Process() {
  const { t } = useLang();
  return (
    <section className="section">
      <div className="wrap">
        <Reveal className="head">
          <p className="eyebrow">{t.process.eyebrow}</p>
          <h2>{t.process.title}</h2>
        </Reveal>
        <ol className="steps">
          {t.process.steps.map((s, i) => (
            <Reveal as="li" key={i} delay={i * 120} className="step">
              <span className="step-n">{i + 1}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
