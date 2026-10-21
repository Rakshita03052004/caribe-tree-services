"use client";

import { useLang } from "@/lib/i18n";
import Reveal from "./Reveal";

export default function Reviews() {
  const { t } = useLang();
  const items = t.reviews.items;
  const rowA = [...items.slice(0, 3), ...items.slice(0, 3)];
  const rowB = [...items.slice(3), ...items.slice(3)];

  const Card = ({ r }: { r: (typeof items)[number] }) => (
    <figure className="review">
      <div className="stars" aria-label="5 stars">★★★★★</div>
      <blockquote>“{r.q}”</blockquote>
      <figcaption>
        {r.n} · {r.c}
      </figcaption>
    </figure>
  );

  return (
    <section id="reviews" className="section section-alt reviews-section">
      <div className="wrap">
        <Reveal className="head">
          <p className="eyebrow">{t.reviews.eyebrow}</p>
          <h2>{t.reviews.title}</h2>
          <p className="sub">{t.reviews.sample}</p>
        </Reveal>
      </div>
      <div className="marquee">
        <div className="marquee-track">
          {rowA.map((r, i) => (
            <Card key={`a${i}`} r={r} />
          ))}
        </div>
        <div className="marquee-track reverse">
          {rowB.map((r, i) => (
            <Card key={`b${i}`} r={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
