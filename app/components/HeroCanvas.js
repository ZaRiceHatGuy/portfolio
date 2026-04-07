'use client';

import { useEffect, useRef } from 'react';

const BLUES = ['#2f7fff', '#4a9aff', '#6aaeff'];
const YELLOWS = ['#f5c842', '#ffd966'];

function randColor(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function HeroCanvas() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -999, y: -999 });
  const stateRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = 0, H = 0;

    function mkP(layer) {
      const speeds = [0.12, 0.38, 0.85];
      const sizes  = [0.55, 1.15, 2.1];
      const alphas = [0.1,  0.28, 0.52];
      return {
        x: Math.random() * W, y: Math.random() * H, ox: 0, oy: 0,
        dx: (Math.random() - .5) * speeds[layer],
        dy: (Math.random() - .5) * speeds[layer],
        r: sizes[layer], alpha: alphas[layer] * (Math.random() * .4 + 0.8),
        layer, color: layer === 2 ? randColor(YELLOWS) : randColor(BLUES),
      };
    }

    function mkNode(color) {
      const speed = 0.28 + Math.random() * 0.32;
      const angle = Math.random() * Math.PI * 2;
      return {
        x: Math.random() * W * .8 + W * .1,
        y: Math.random() * H * .8 + H * .1,
        dx: Math.cos(angle) * speed, dy: Math.sin(angle) * speed,
        r: 3 + Math.random() * 2.2,
        phase: Math.random() * Math.PI * 2,
        color, speed: 0.02 + Math.random() * 0.016,
      };
    }

    function init() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      stateRef.current = {
        t: stateRef.current?.t ?? 0,
        particles: [
          ...Array.from({ length: 30 }, () => mkP(0)),
          ...Array.from({ length: 40 }, () => mkP(1)),
          ...Array.from({ length: 20 }, () => mkP(2)),
        ],
        nodes: [
          ...Array.from({ length: 30 }, () => mkNode('#2f7fff')),
          ...Array.from({ length: 30 }, () => mkNode('#f5c842')),
        ],
      };
    }

    function draw() {
      const state = stateRef.current;
      if (!state) return;
      const { particles, nodes } = state;
      const mx = mouseRef.current.x, my = mouseRef.current.y;

      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          if (Math.abs(a.layer - b.layer) > 1) continue;
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          const maxD = [130, 105, 75][Math.min(a.layer, b.layer)];
          if (d < maxD) {
            ctx.beginPath(); ctx.strokeStyle = a.color;
            ctx.globalAlpha = (1 - d / maxD) * Math.min(a.alpha, b.alpha) * 0.7;
            ctx.lineWidth = a.layer === 0 ? 0.3 : 0.55;
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        for (const p of particles) {
          const d = Math.hypot(n.x - p.x, n.y - p.y);
          if (d < 115) {
            ctx.beginPath(); ctx.strokeStyle = n.color;
            ctx.globalAlpha = (1 - d / 115) * 0.14; ctx.lineWidth = 0.5;
            ctx.moveTo(n.x, n.y); ctx.lineTo(p.x, p.y); ctx.stroke();
          }
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 140) {
            ctx.beginPath(); ctx.strokeStyle = a.color;
            ctx.globalAlpha = (1 - d / 140) * 0.18; ctx.lineWidth = 0.7;
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        const dx = p.x - mx, dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy), rep = 50;
        const rs = p.layer === 2 ? 1.2 : p.layer === 1 ? 0.6 : 0.2;
        if (dist < rep && dist > 0) {
          const f = (rep - dist) / rep;
          p.ox += (dx / dist) * f * rs; p.oy += (dy / dist) * f * rs;
        }
        p.ox *= 0.9; p.oy *= 0.9;
        p.x += p.dx + p.ox; p.y += p.dy + p.oy;
        if (p.x < 0 || p.x > W) p.dx *= -1;
        if (p.y < 0 || p.y > H) p.dy *= -1;
        ctx.beginPath(); ctx.globalAlpha = p.alpha; ctx.fillStyle = p.color;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }

      for (const n of nodes) {
        n.x += n.dx; n.y += n.dy;
        if (n.x < n.r * 5 || n.x > W - n.r * 5) n.dx *= -1;
        if (n.y < n.r * 5 || n.y > H - n.r * 5) n.dy *= -1;
        const pulse = Math.sin(state.t * n.speed * 60 + n.phase);
        const glow = n.r + pulse * 1.5;
        const rgb = n.color === '#2f7fff' ? '47,127,255' : '245,200,66';
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glow * 4);
        grad.addColorStop(0, `rgba(${rgb},0.22)`); grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath(); ctx.globalAlpha = 1; ctx.fillStyle = grad;
        ctx.arc(n.x, n.y, glow * 4, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.globalAlpha = 0.8; ctx.fillStyle = n.color;
        ctx.arc(n.x, n.y, glow, 0, Math.PI * 2); ctx.fill();
      }

      ctx.globalAlpha = 1;
      state.t += 0.016;
      rafRef.current = requestAnimationFrame(draw);
    }

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) * (W / rect.width),
        y: (e.clientY - rect.top) * (H / rect.height),
      };
    };
    const onMouseLeave = () => { mouseRef.current = { x: -999, y: -999 }; };

    canvas.parentElement?.addEventListener('mousemove', onMouseMove);
    canvas.parentElement?.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('resize', init);

    init();
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.parentElement?.removeEventListener('mousemove', onMouseMove);
      canvas.parentElement?.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', init);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full z-0"
    />
  );
}