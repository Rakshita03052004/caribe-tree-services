"use client";

import { useCallback, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import Reveal from "./Reveal";

// Illustrated stand-in for a real before/after photo pair.
function Scene({ after }: { after: boolean }) {
  const id = after ? "a" : "b";
  return (
    <svg viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" className="scene">
      <defs>
        <linearGradient id={`sky-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={after ? "#9fd3f2" : "#b7c3c9"} />
          <stop offset="1" stopColor={after ? "#e8f5fb" : "#e2e4e0"} />
        </linearGradient>
        <linearGradient id={`lawn-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={after ? "#7cc06a" : "#8c9b5e"} />
          <stop offset="1" stopColor={after ? "#4f9a4c" : "#6b7a43"} />
        </linearGradient>
        <radialGradient id={`crown-${id}`} cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor={after ? "#57b06a" : "#5d7a45"} />
          <stop offset="1" stopColor={after ? "#246b3e" : "#34482a"} />
        </radialGradient>
      </defs>

      <rect width="1200" height="700" fill={`url(#sky-${id})`} />
      {after && <circle cx="1020" cy="120" r="54" fill="#fff6d6" opacity="0.9" />}

      {/* distant tree line */}
      <path d="M0 470 Q80 420 160 455 T330 450 T520 440 T720 455 T920 440 T1200 450 V520 H0Z" fill={after ? "#8cc49a" : "#9aa58a"} opacity="0.7" />

      <rect y="500" width="1200" height="200" fill={`url(#lawn-${id})`} />

      {/* house */}
      <g>
        <rect x="610" y="330" width="420" height="190" rx="4" fill="#f4efe6" />
        <path d="M585 340 L820 215 L1055 340 Z" fill={after ? "#c4673f" : "#9d6a52"} />
        <rect x="660" y="385" width="80" height="70" rx="3" fill="#bcd9e6" />
        <rect x="900" y="385" width="80" height="70" rx="3" fill="#bcd9e6" />
        <rect x="790" y="410" width="60" height="110" rx="3" fill="#6b4a36" />
        {!after && (
          <g fill="#6f6040" opacity="0.8">
            <ellipse cx="700" cy="300" rx="34" ry="8" />
            <ellipse cx="770" cy="262" rx="26" ry="6" />
            <ellipse cx="880" cy="275" rx="30" ry="7" />
          </g>
        )}
      </g>

      {/* tree sits next to the house so the slider cuts through the overhang */}
      <g transform="translate(150 0)">
      <path d="M330 520 C335 440 340 380 352 300 L382 300 C392 380 398 440 408 520 Z" fill="#5a3f2d" />

      {after ? (
        <g>
          {/* tidy, lifted crown that clears the roof */}
          <path d="M366 330 C350 280 300 250 270 230 M366 320 C390 270 440 245 480 225" stroke="#5a3f2d" strokeWidth="16" fill="none" strokeLinecap="round" />
          <g fill={`url(#crown-${id})`}>
            <circle cx="370" cy="190" r="120" />
            <circle cx="270" cy="230" r="85" />
            <circle cx="470" cy="225" r="90" />
            <circle cx="330" cy="120" r="80" />
            <circle cx="430" cy="130" r="75" />
          </g>
          {/* neat bed + fresh mulch where stump was */}
          <ellipse cx="370" cy="530" rx="120" ry="16" fill="#6a4a33" opacity="0.6" />
          <ellipse cx="1080" cy="600" rx="70" ry="10" fill="#6a4a33" opacity="0.5" />
        </g>
      ) : (
        <g>
          {/* overgrown crown hanging over the roof */}
          <path d="M366 330 C420 260 560 250 690 260 M360 320 C320 270 250 260 190 250" stroke="#5a3f2d" strokeWidth="18" fill="none" strokeLinecap="round" />
          <g fill={`url(#crown-${id})`}>
            <circle cx="370" cy="210" r="150" />
            <circle cx="230" cy="260" r="110" />
            <circle cx="540" cy="235" r="125" />
            <circle cx="670" cy="270" r="95" />
            <circle cx="320" cy="110" r="100" />
            <circle cx="470" cy="120" r="95" />
            <circle cx="160" cy="330" r="70" />
          </g>
          {/* dead branch */}
          <path d="M470 160 L560 90 L600 100 M560 90 L590 50" stroke="#8b7b6b" strokeWidth="9" fill="none" strokeLinecap="round" />
        </g>
      )}
      </g>

      {!after && (
        <g>
          {/* fallen limb + old stump */}
          <path d="M880 610 L1080 585" stroke="#6b5240" strokeWidth="16" strokeLinecap="round" />
          <path d="M960 600 L990 560 M1030 592 L1050 560" stroke="#6b5240" strokeWidth="7" strokeLinecap="round" />
          <ellipse cx="160" cy="600" rx="42" ry="12" fill="#4c3626" />
          <rect x="118" y="570" width="84" height="30" fill="#5a3f2d" />
          <ellipse cx="160" cy="570" rx="42" ry="12" fill="#9b7a5a" />
          {/* scattered debris */}
          <g fill="#5d6b3a" opacity="0.8">
            <ellipse cx="560" cy="560" rx="40" ry="9" />
            <ellipse cx="700" cy="620" rx="34" ry="7" />
            <ellipse cx="300" cy="640" rx="50" ry="9" />
          </g>
        </g>
      )}
    </svg>
  );
}

export default function BeforeAfter() {
  const { t } = useLang();
  const [pos, setPos] = useState(56);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const move = useCallback((clientX: number) => {
    const r = box.current!.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  return (
    <section id="work" className="section section-alt">
      <div className="wrap">
        <Reveal className="head">
          <p className="eyebrow">{t.work.eyebrow}</p>
          <h2>{t.work.title}</h2>
          <p className="sub">{t.work.sub}</p>
        </Reveal>

        <Reveal>
          <div
            className="ba"
            ref={box}
            onPointerDown={(e) => {
              dragging.current = true;
              (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
              move(e.clientX);
            }}
            onPointerMove={(e) => dragging.current && move(e.clientX)}
            onPointerUp={() => (dragging.current = false)}
            onPointerCancel={() => (dragging.current = false)}
          >
            <Scene after={false} />
            <div className="ba-after" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
              <Scene after />
            </div>
            <span className="ba-tag ba-tag-l">{t.work.before}</span>
            <span className="ba-tag ba-tag-r">{t.work.after}</span>
            <div className="ba-line" style={{ left: `${pos}%` }}>
              <button
                className="ba-knob"
                role="slider"
                aria-label={`${t.work.before} / ${t.work.after}`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(pos)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
                  if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
                }}
              >
                <i />
                <i />
              </button>
            </div>
          </div>
          <div className="ba-caption">
            <span>{t.work.caption}</span>
            <span className="muted">{t.work.sample}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
