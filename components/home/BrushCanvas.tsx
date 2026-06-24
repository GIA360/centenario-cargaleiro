"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

// Pincel: traço de largura VARIÁVEL pela velocidade (rápido = fino, lento =
// grosso). Cada traço é desenhado como uma "fita" preenchida numa só passagem
// (transparência uniforme, sem bolas). O rasto persiste e limpa ao scroll down.
const CORES = ["#232A5E", "#2F4FB0", "#C25C84"];
const MAX_L = 20;
const MIN_L = 3;
const K_VEL = 0.5;
const ALPHA = 0.17;
const MAX_PONTOS = 1400;
const DIST_MIN = 2.2;

type Ponto = { x: number; y: number; w: number; corte: boolean; cor: string };

export function BrushCanvas({
  className,
  intro = false,
}: {
  className?: string;
  intro?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduzir = useReducedMotion();

  useEffect(() => {
    if (reduzir) return;
    const el = canvasRef.current;
    if (!el) return;
    const contexto = el.getContext("2d");
    if (!contexto) return;

    const cv: HTMLCanvasElement = el;
    const cx: CanvasRenderingContext2D = contexto;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pts: Ponto[] = [];
    let novoTraco = true;
    let corAtual = CORES[0];
    let larguraAtual = MAX_L;
    let limpo = false;

    function dimensionar() {
      const r = cv.getBoundingClientRect();
      cv.width = Math.round(r.width * dpr);
      cv.height = Math.round(r.height * dpr);
      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
      redesenhar();
    }

    function limparCanvas() {
      cx.save();
      cx.setTransform(1, 0, 0, 1, 0, 0);
      cx.clearRect(0, 0, cv.width, cv.height);
      cx.restore();
    }

    function desenharRun(run: Ponto[]) {
      const n = run.length;
      if (n < 2) {
        if (n === 1) {
          cx.beginPath();
          cx.arc(run[0].x, run[0].y, run[0].w / 2, 0, Math.PI * 2);
          cx.fill();
        }
        return;
      }
      // normal (perpendicular) em cada ponto, pela tangente média
      const nx: number[] = [];
      const ny: number[] = [];
      for (let i = 0; i < n; i++) {
        const a = run[Math.max(0, i - 1)];
        const b = run[Math.min(n - 1, i + 1)];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const len = Math.hypot(dx, dy) || 1;
        nx.push(-dy / len);
        ny.push(dx / len);
      }
      cx.beginPath();
      cx.moveTo(run[0].x + nx[0] * run[0].w * 0.5, run[0].y + ny[0] * run[0].w * 0.5);
      for (let i = 1; i < n; i++) {
        cx.lineTo(run[i].x + nx[i] * run[i].w * 0.5, run[i].y + ny[i] * run[i].w * 0.5);
      }
      for (let i = n - 1; i >= 0; i--) {
        cx.lineTo(run[i].x - nx[i] * run[i].w * 0.5, run[i].y - ny[i] * run[i].w * 0.5);
      }
      cx.closePath();
      cx.fill();
      // pontas redondas
      cx.beginPath();
      cx.arc(run[0].x, run[0].y, run[0].w / 2, 0, Math.PI * 2);
      cx.fill();
      cx.beginPath();
      cx.arc(run[n - 1].x, run[n - 1].y, run[n - 1].w / 2, 0, Math.PI * 2);
      cx.fill();
    }

    function redesenhar() {
      limparCanvas();
      cx.globalAlpha = ALPHA;
      let i = 0;
      while (i < pts.length) {
        const cor = pts[i].cor;
        const run: Ponto[] = [pts[i]];
        i++;
        while (i < pts.length && !pts[i].corte) {
          run.push(pts[i]);
          i++;
        }
        cx.fillStyle = cor;
        desenharRun(run);
      }
      cx.globalAlpha = 1;
    }

    function adicionar(x: number, y: number) {
      const ultimo = pts[pts.length - 1];
      let vel = 0;
      if (!novoTraco && ultimo) {
        vel = Math.hypot(x - ultimo.x, y - ultimo.y);
        if (vel < DIST_MIN) return;
      }
      // mais rápido → mais fino
      const alvo = Math.max(MIN_L, Math.min(MAX_L, MAX_L - vel * K_VEL));
      larguraAtual = novoTraco ? alvo : larguraAtual + (alvo - larguraAtual) * 0.5;
      if (novoTraco) {
        corAtual = CORES[Math.floor(Math.random() * CORES.length)];
        pts.push({ x, y, w: larguraAtual, corte: true, cor: corAtual });
        novoTraco = false;
      } else {
        pts.push({ x, y, w: larguraAtual, corte: false, cor: corAtual });
      }
      if (pts.length > MAX_PONTOS) pts.shift();
      redesenhar();
    }

    dimensionar();
    const ro = new ResizeObserver(dimensionar);
    ro.observe(cv);

    function aoMover(e: PointerEvent) {
      if (window.scrollY > 60) return;
      const r = cv.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (x < 0 || y < 0 || x > r.width || y > r.height) {
        novoTraco = true;
        return;
      }
      adicionar(x, y);
    }

    function aoSair() {
      novoTraco = true;
    }

    function aoScroll() {
      if (window.scrollY > 60) {
        if (!limpo) {
          pts.length = 0;
          limparCanvas();
          limpo = true;
          novoTraco = true;
        }
      } else {
        limpo = false;
      }
    }

    // Abertura automática: dois varrimentos que ficam marcados.
    function abertura() {
      const r = cv.getBoundingClientRect();
      const sweeps = [
        [
          [0.04, 0.42],
          [0.34, 0.52],
          [0.66, 0.44],
          [0.97, 0.53],
        ],
        [
          [0.96, 0.27],
          [0.62, 0.4],
          [0.32, 0.57],
          [0.05, 0.65],
        ],
      ];
      let s = 0;
      function correr() {
        if (s >= sweeps.length || window.scrollY > 60) return;
        const pontos = sweeps[s++].map(([fx, fy]) => ({ x: fx * r.width, y: fy * r.height }));
        novoTraco = true;
        let seg = 0;
        function passo() {
          if (seg >= pontos.length - 1) {
            setTimeout(correr, 140);
            return;
          }
          const a = pontos[seg];
          const b = pontos[seg + 1];
          seg++;
          const passos = 16;
          for (let k = 0; k <= passos; k++) {
            const t = k / passos;
            adicionar(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t);
          }
          requestAnimationFrame(passo);
        }
        passo();
      }
      correr();
    }

    window.addEventListener("pointermove", aoMover);
    window.addEventListener("pointerleave", aoSair);
    window.addEventListener("scroll", aoScroll, { passive: true });
    let arranque: ReturnType<typeof setTimeout> | undefined;
    if (intro) arranque = setTimeout(abertura, 450);

    return () => {
      if (arranque) clearTimeout(arranque);
      ro.disconnect();
      window.removeEventListener("pointermove", aoMover);
      window.removeEventListener("pointerleave", aoSair);
      window.removeEventListener("scroll", aoScroll);
    };
  }, [reduzir, intro]);

  if (reduzir) return null;
  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
