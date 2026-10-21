"use client";

import { useEffect, useRef } from "react";

// A procedurally grown tree that sways in the breeze. Seeded so it looks the same every load.
type Node = { a: number; l: number; c: Node[]; depth: number; start: number; leafHue: number };

const MAX_DEPTH = 9;

function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function build(r: () => number, depth: number, a: number, start: number): Node {
  const n: Node = {
    a,
    l: depth === 0 ? 1 : 0.7 + r() * 0.12,
    c: [],
    depth,
    start,
    leafHue: r(),
  };
  if (depth < MAX_DEPTH) {
    const three = depth > 1 && depth < 6 && r() < 0.28;
    const spread = 0.26 + r() * 0.18 + depth * 0.012;
    const angles = three ? [-spread * 1.2, (r() - 0.5) * 0.2, spread * 1.2] : [-spread, spread];
    for (const off of angles) {
      if (depth > 3 && r() < 0.08) continue; // a few gaps make the crown feel natural
      n.c.push(build(r, depth + 1, off + (r() - 0.5) * 0.25, start + 0.075 + r() * 0.03));
    }
  }
  return n;
}

const LEAF = ["#2f7d4f", "#3f9a5f", "#5bb36f", "#1f6b43", "#86c77d", "#2a8a5a"];

export default function TreeCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const root = build(rng(20260804), 0, 0, 0);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, raf = 0, visible = true;
    const t0 = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const ease = (x: number) => 1 - Math.pow(1 - Math.min(Math.max(x, 0), 1), 3);

    const draw = (now: number) => {
      const time = (now - t0) / 1000;
      const progress = reduce ? 10 : time / 2.6; // growth over ~2.6s
      ctx.clearRect(0, 0, w, h);

      const scale = Math.min(h * 0.21, w * 0.15);
      const baseX = w / 2;
      const baseY = h - 18;

      // ground shadow
      const g = ctx.createRadialGradient(baseX, baseY, 0, baseX, baseY, scale * 2.2);
      g.addColorStop(0, "rgba(20,60,38,0.22)");
      g.addColorStop(1, "rgba(20,60,38,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.ellipse(baseX, baseY, scale * 2.2, scale * 0.16, 0, 0, Math.PI * 2);
      ctx.fill();

      const leaves: [number, number, number, string, number][] = [];

      const walk = (n: Node, x: number, y: number, ang: number, len: number) => {
        const grow = ease((progress - n.start) / 0.14);
        if (grow <= 0) return;
        const sway = reduce ? 0 : Math.sin(time * 0.9 + n.depth * 0.7) * 0.012 * n.depth;
        const a = ang + n.a + sway;
        const L = len * n.l * grow;
        const x2 = x + Math.sin(a) * L;
        const y2 = y - Math.cos(a) * L;

        ctx.strokeStyle = n.depth < 3 ? "#4a3426" : n.depth < 6 ? "#5b4232" : "#6b5340";
        ctx.lineWidth = Math.max(scale * 0.11 * Math.pow(0.66, n.depth), 0.6);
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        // leaves on the outer branches, plus smaller ones inside so the crown reads as full
        if (n.depth >= MAX_DEPTH - 4) {
          const lg = ease((progress - n.start - 0.1) / 0.25);
          if (lg > 0) {
            const outer = n.depth >= MAX_DEPTH - 1;
            const size = scale * (outer ? 0.06 + n.leafHue * 0.05 : 0.09 + n.leafHue * 0.06) * lg;
            leaves.push([x2, y2, size, LEAF[Math.floor(n.leafHue * LEAF.length)], 0.5 + n.leafHue * 0.35]);
          }
        }
        if (grow >= 1) for (const c of n.c) walk(c, x2, y2, a, L);
      };

      walk(root, baseX, baseY, 0, scale);

      for (const [x, y, s, c, o] of leaves) {
        ctx.globalAlpha = o;
        ctx.fillStyle = c;
        ctx.beginPath();
        ctx.arc(x, y, s, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (visible && !(reduce && time > 0.1)) raf = requestAnimationFrame(draw);
    };

    resize();
    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(draw);
    });
    io.observe(canvas);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={ref} className="tree-canvas" aria-hidden />;
}
