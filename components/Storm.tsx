"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import Reveal from "./Reveal";

function RainCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let w = 0, h = 0, raf = 0, visible = false;
    type Drop = { x: number; y: number; v: number; l: number; o: number };
    let drops: Drop[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drops = Array.from({ length: Math.floor((w * h) / 9000) }, () => ({
        x: Math.random() * w * 1.2,
        y: Math.random() * h,
        v: 7 + Math.random() * 9,
        l: 10 + Math.random() * 22,
        o: 0.08 + Math.random() * 0.22,
      }));
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;
      for (const d of drops) {
        ctx.strokeStyle = `rgba(200,225,255,${d.o})`;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - d.l * 0.25, d.y + d.l);
        ctx.stroke();
        d.y += d.v;
        d.x -= d.v * 0.25;
        if (d.y > h) {
          d.y = -d.l;
          d.x = Math.random() * w * 1.2;
        }
      }
      if (visible) raf = requestAnimationFrame(tick);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(tick);
    });
    io.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={ref} className="rain" aria-hidden />;
}

function useSeason() {
  const [s, setS] = useState<{ pct: number; left: number; on: boolean } | null>(null);
  useEffect(() => {
    const now = new Date();
    const y = now.getFullYear();
    const start = new Date(y, 5, 1).getTime();
    const end = new Date(y, 10, 30, 23, 59).getTime();
    const t = now.getTime();
    const on = t >= start && t <= end;
    setS({
      on,
      pct: on ? ((t - start) / (end - start)) * 100 : t > end ? 100 : 0,
      left: on ? Math.ceil((end - t) / 86400000) : 0,
    });
  }, []);
  return s;
}

export default function Storm() {
  const { t } = useLang();
  const season = useSeason();

  return (
    <section id="storm" className="storm">
      <RainCanvas />
      <div className="storm-glow" aria-hidden />
      <div className="wrap storm-inner">
        <Reveal className="storm-copy">
          <p className="eyebrow eyebrow-light">{t.storm.eyebrow}</p>
          <h2>{t.storm.title}</h2>
          <p className="storm-body">{t.storm.body}</p>

          <div className="season">
            <div className="season-top">
              <span>{t.storm.season}</span>
              <span>{season ? (season.on ? t.storm.daysLeft(season.left) : t.storm.offSeason) : " "}</span>
            </div>
            <div className="season-track">
              <div className="season-fill" style={{ width: `${season?.pct ?? 0}%` }} />
            </div>
          </div>

          <a href={SITE.phoneHref} className="storm-phone">
            {SITE.phoneDisplay}
          </a>
          <div className="ctas ctas-left">
            <a href={SITE.phoneHref} className="btn btn-white">
              {t.storm.call}
            </a>
            <a href={SITE.whatsapp} target="_blank" rel="noopener" className="btn btn-wa">
              {t.storm.wa}
            </a>
          </div>
        </Reveal>

        <Reveal className="tips" delay={150}>
          <h3>{t.storm.tipsTitle}</h3>
          <ol>
            {t.storm.tips.map((tip, i) => (
              <li key={i}>
                <span>{i + 1}</span>
                {tip}
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
