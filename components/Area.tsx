"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";
import Reveal from "./Reveal";

// Approximate positions on a stylised Central Florida map (0–100 grid). Kissimmee is home base.
const PLACES = [
  { n: "Kissimmee", x: 50, y: 56, home: true },
  { n: "St. Cloud", x: 64, y: 58 },
  { n: "Celebration", x: 41, y: 50 },
  { n: "Poinciana", x: 47, y: 74 },
  { n: "Hunters Creek", x: 52, y: 44 },
  { n: "Lake Nona", x: 66, y: 40 },
  { n: "Orlando", x: 56, y: 26 },
  { n: "Davenport", x: 30, y: 66 },
  { n: "Haines City", x: 26, y: 80 },
  { n: "Windermere", x: 38, y: 30 },
];

export default function Area() {
  const { t } = useLang();
  const [hover, setHover] = useState<string | null>("Kissimmee");

  return (
    <section id="area" className="section">
      <div className="wrap area">
        <Reveal className="area-copy">
          <p className="eyebrow">{t.area.eyebrow}</p>
          <h2>{t.area.title}</h2>
          <p className="sub sub-left">{t.area.sub}</p>
          <ul className="chips">
            {PLACES.map((p) => (
              <li key={p.n}>
                <button
                  className={`chip ${hover === p.n ? "on" : ""}`}
                  onMouseEnter={() => setHover(p.n)}
                  onFocus={() => setHover(p.n)}
                  onClick={() => setHover(p.n)}
                >
                  {p.n}
                </button>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="map" delay={120}>
          <svg viewBox="0 0 100 100" aria-hidden>
            <defs>
              <radialGradient id="reach" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" stopColor="#2f7d4f" stopOpacity="0.22" />
                <stop offset="1" stopColor="#2f7d4f" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* lakes */}
            <ellipse cx="58" cy="66" rx="7" ry="4.5" className="lake" />
            <ellipse cx="44" cy="62" rx="3" ry="2" className="lake" />
            <ellipse cx="70" cy="70" rx="5" ry="6" className="lake" />
            <ellipse cx="34" cy="38" rx="3.5" ry="2.5" className="lake" />
            {/* main roads */}
            <path d="M20 90 C35 70 45 55 56 26 L62 5" className="road" />
            <path d="M5 60 C30 58 60 57 95 55" className="road" />
            <path d="M48 95 C50 75 52 50 66 40 L90 30" className="road" />
            <circle cx="50" cy="56" r="34" fill="url(#reach)" />
            <circle cx="50" cy="56" r="34" className="ring" />
            {PLACES.map((p) => (
              <g key={p.n} className={`pin ${hover === p.n ? "on" : ""} ${p.home ? "home" : ""}`} transform={`translate(${p.x} ${p.y})`}>
                {p.home && <circle r="4" className="pulse" />}
                <circle r={p.home ? 1.8 : 1.2} />
                <text y="-3" textAnchor="middle">{p.n}</text>
              </g>
            ))}
          </svg>
        </Reveal>
      </div>
    </section>
  );
}
