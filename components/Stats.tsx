"use client";

import { useLang } from "@/lib/i18n";
import Reveal from "./Reveal";

export default function Stats() {
  const { t } = useLang();
  return (
    <section className="stats-band">
      <div className="wrap stats">
        {t.stats.map((s, i) => (
          <Reveal key={i} delay={i * 90} className="stat">
            <b>{s.v}</b>
            <small>{s.l}</small>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
