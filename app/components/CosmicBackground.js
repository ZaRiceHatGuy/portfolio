"use client";

import { useEffect, useRef } from "react";

const C = {
  spaceTop: "#05060f",
  spaceMid: "#0a0d24",
  spaceBottom: "#191238",
  line: "rgba(160,190,255,",
  outline: "#0a0a1c",
  robotBody: "#52527e",
  robotDark: "#303052",
  robotLight: "#6a6a9c",
  robotMetal: "#3c3c60",
  visorDark: "#12122e",
  cyan: "#35c3ff",
  cyanRGB: "53,195,255",
  cyanLight: "#a9e2ff",
  yellow: "#ffd64d",
  yellowRGB: "255,214,77",
  red: "#ff5f68",
  hull: "#e2e0f2",
  hullLight: "#f7f5ff",
};

const OUTLINE_OFFSETS = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

/**
 * Full-page retro space backdrop, painted on a fixed canvas behind the page:
 *  - a constellation of drifting star "nodes" connected by faint lines,
 *  - pixel robots and rockets that flow across space in horizontal, vertical
 *    and diagonal paths (with dark outlines so they pop),
 *  - several pixel planets, nebulae and the occasional shooting star.
 */
export default function CosmicBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let W = 0;
    let H = 0;
    let dpr = 1;
    let raf = 0;
    let t = 0;
    let stars = [];
    let robots = [];
    let rockets = [];
    let planets = [];
    let shooting = null;

    const rnd = (a, b) => a + Math.random() * (b - a);

    // Wrap an object around the screen edges based on its velocity.
    function wrap(o, m) {
      if (o.vx > 0 && o.x > W + m) o.x = -m;
      if (o.vx < 0 && o.x < -m) o.x = W + m;
      if (o.vy > 0 && o.y > H + m) o.y = -m;
      if (o.vy < 0 && o.y < -m) o.y = H + m;
    }

    // ── Stars: nearly stationary nodes (blue/yellow) with sparse connections ──
    function makeStars() {
      stars = [];
      for (let i = 0; i < 55; i++) {
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: rnd(-0.04, 0.04),
          vy: rnd(-0.04, 0.04),
          r: Math.random() < 0.6 ? 3 : 4,
          color: Math.random() < 0.5 ? C.cyan : C.yellow,
          base: rnd(0.35, 0.75),
          speed: rnd(0.6, 1.6),
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    // ── Robots flowing in space: drifting, gently rotating left/right ──
    function makeRobots() {
      robots = [
        {
          x: W * 0.22,
          y: H * 0.6,
          vx: 0.5,
          vy: 0.2,
          scale: 4.5,
          phase: 0,
          spin: -0.35,
          phase0: 0,
          accent: C.cyan,
          accentLight: C.cyanLight,
        },
        {
          x: W * 0.8,
          y: H * 0.25,
          vx: -0.36,
          vy: 0.26,
          scale: 3.6,
          phase: 1.7,
          spin: 0.3,
          phase0: 1.2,
          accent: C.yellow,
          accentLight: C.yellow,
        },
        {
          x: W * 0.45,
          y: H * 0.9,
          vx: 0.28,
          vy: -0.22,
          scale: 3,
          phase: 3.1,
          spin: -0.22,
          phase0: 2.4,
          accent: C.red,
          accentLight: "#ffb3b6",
        },
      ];
    }

    // ── Rockets: horizontal, vertical and diagonal drift paths ──
    function makeRockets() {
      rockets = [
        { x: -120, y: H * 0.32, vx: 1.05, vy: 0.26, scale: 3.6, phase: 0, spin: 0.4, phase0: 0 },
        { x: W + 120, y: H * 0.55, vx: -0.85, vy: -0.2, scale: 3.1, phase: 1.2, spin: -0.45, phase0: Math.PI / 2 },
        { x: W * 0.72, y: H + 120, vx: -0.28, vy: -0.95, scale: 2.9, phase: 2.1, spin: 0.3, phase0: Math.PI },
        { x: W * 0.28, y: -120, vx: 0.28, vy: 0.85, scale: 2.6, phase: 3.3, spin: -0.35, phase0: Math.PI * 1.5 },
      ];
    }

    // ── Pixel planets (low-res offscreen upscaled chunky) ──
    // The sprite is bigger than the planet body so a ring always fits fully
    // inside it and never gets clipped at the planet's edge.
    const SPRITE = 72;
    const BODY_R = 21;

    function makePlanet(opts) {
      const S = SPRITE;
      const cx = S / 2;
      const cy = S / 2;
      const off = document.createElement("canvas");
      off.width = S;
      off.height = S;
      const octx = off.getContext("2d");

      // back half of the ring sits behind the body
      if (opts.ring) {
        octx.strokeStyle = opts.ring;
        octx.lineWidth = 3;
        octx.beginPath();
        octx.ellipse(cx, cy + 2, BODY_R + 3, 11, -0.3, Math.PI, Math.PI * 2);
        octx.stroke();
      }

      const g = octx.createRadialGradient(cx - 6, cy - 9, 3, cx, cy, BODY_R);
      g.addColorStop(0, opts.light);
      g.addColorStop(0.55, opts.mid);
      g.addColorStop(1, opts.dark);
      octx.fillStyle = g;
      octx.beginPath();
      octx.arc(cx, cy, BODY_R, 0, Math.PI * 2);
      octx.fill();

      octx.fillStyle = opts.spot;
      for (const [sx, sy, sr] of opts.spots || []) {
        octx.beginPath();
        octx.arc(sx, sy, sr, 0, Math.PI * 2);
        octx.fill();
      }

      octx.fillStyle = "rgba(255,255,255,0.08)";
      octx.beginPath();
      octx.arc(cx - 9, cy - 11, 6, 0, Math.PI * 2);
      octx.fill();

      // front half of the ring sits over the body
      if (opts.ring) {
        octx.beginPath();
        octx.ellipse(cx, cy + 2, BODY_R + 3, 11, -0.3, 0, Math.PI);
        octx.stroke();
      }

      // on-screen draw size for the whole sprite (body diameter = opts.size)
      const draw = Math.round((opts.size * S) / (2 * BODY_R));
      return { cv: off, fx: opts.fx, fy: opts.fy, size: opts.size, draw };
    }

    function makePlanets() {
      planets = [
        // big ringed purple gas giant (top right)
        makePlanet({
          fx: 0.84, fy: 0.06, size: 168,
          light: "#8a6fe8", mid: "#5440a8", dark: "#221a5c",
          ring: "rgba(255,214,77,0.55)",
          spot: "rgba(10,8,30,0.4)",
          spots: [[27, 27, 4], [40, 38, 3], [32, 45, 2.2]],
        }),
        // teal ocean world (bottom left)
        makePlanet({
          fx: 0.05, fy: 0.78, size: 112,
          light: "#5fd4c2", mid: "#2a8f9e", dark: "#123c5e",
          ring: null,
          spot: "rgba(8,24,48,0.35)",
          spots: [[26, 30, 5], [39, 40, 4], [31, 45, 3], [44, 26, 2.5]],
        }),
        // fiery rocky planet with a thin ring (top left)
        makePlanet({
          fx: 0.08, fy: 0.14, size: 88,
          light: "#ff9a5c", mid: "#e0553a", dark: "#7a1e2e",
          ring: "rgba(169,226,255,0.4)",
          spot: "rgba(40,8,16,0.35)",
          spots: [[34, 28, 3], [42, 40, 2]],
        }),
        // small cratered moon (bottom right)
        makePlanet({
          fx: 0.74, fy: 0.86, size: 62,
          light: "#d8d4e8", mid: "#8f8aa8", dark: "#4a4666",
          ring: null,
          spot: "rgba(20,18,40,0.35)",
          spots: [[28, 28, 3.5], [39, 36, 2.5], [33, 42, 2], [44, 27, 1.8]],
        }),
      ];
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      makeStars();
      makeRobots();
      makeRockets();
      // Anchor each planet near its fraction, but clamp so the full sprite
      // (including any ring) always stays fully on screen.
      const M = 16;
      for (const p of planets) {
        p.x = Math.round(Math.min(Math.max(p.fx * W, M), Math.max(W - p.draw - M, M)));
        p.y = Math.round(Math.min(Math.max(p.fy * H, M), Math.max(H - p.draw - M, M)));
      }
    }

    function drawNebula(x, y, color) {
      const g = ctx.createRadialGradient(x, y, 0, x, y, 280);
      g.addColorStop(0, color);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(x - 280, y - 280, 560, 560);
    }

    // ── Sprites ──
    // Detailed robot: ears, crown, segmented visor, mouth grill, shoulders,
    // elbows, knee joints, vented chest and armored feet.
    const robotSprite = ({ px }) => {
      // antenna
      px(12, -3, 2, 3, C.robotDark);
      px(11, -5, 4, 3, C.robotDark);
      // head
      px(2, 1, 3, 8, C.robotDark); // left ear
      px(21, 1, 3, 8, C.robotDark); // right ear
      px(5, 0, 16, 2, C.robotLight); // crown shine
      px(5, 2, 16, 7, C.robotBody); // face
      px(6, 3, 14, 4, C.visorDark); // visor
      px(7, 4, 4, 2, C.cyan); // left eye
      px(15, 4, 4, 2, C.cyan); // right eye
      px(7, 4, 2, 2, C.cyanLight); // eye highlights
      px(15, 4, 2, 2, C.cyanLight);
      px(8, 8, 10, 1, C.robotDark); // mouth grill
      px(5, 8, 1, 1, C.robotMetal); // cheek bolts
      px(20, 8, 1, 1, C.robotMetal);
      px(10, 9, 6, 2, C.robotDark); // neck
      // shoulders
      px(1, 11, 4, 5, C.robotBody);
      px(21, 11, 4, 5, C.robotBody);
      px(1, 11, 4, 2, C.robotLight);
      px(21, 11, 4, 2, C.robotLight);
      // torso
      px(3, 11, 20, 17, C.robotBody);
      px(3, 11, 20, 2, C.robotLight);
      // chest panel + core lights + vents
      px(8, 14, 10, 9, C.visorDark);
      px(9, 16, 3, 2, C.yellow);
      px(14, 16, 3, 2, C.yellow);
      px(9, 20, 8, 1, C.robotDark);
      px(10, 21, 6, 1, C.robotDark);
      // waist
      px(3, 28, 20, 2, C.robotDark);
      // arms
      px(1, 16, 3, 7, C.robotBody); // upper L
      px(0, 22, 4, 2, C.robotDark); // elbow L
      px(1, 24, 3, 6, C.robotBody); // forearm L
      px(0, 29, 4, 3, C.robotMetal); // hand L
      px(22, 16, 3, 7, C.robotBody); // upper R
      px(22, 22, 4, 2, C.robotDark); // elbow R
      px(22, 24, 3, 6, C.robotBody); // forearm R
      px(22, 29, 4, 3, C.robotMetal); // hand R
      // legs
      px(5, 30, 6, 5, C.robotBody); // thigh L
      px(13, 30, 6, 5, C.robotBody); // thigh R
      px(4, 35, 8, 2, C.robotMetal); // knee L
      px(12, 35, 8, 2, C.robotMetal); // knee R
      px(5, 37, 7, 3, C.robotDark); // shin L
      px(13, 37, 7, 3, C.robotDark); // shin R
      px(4, 39, 8, 2, C.robotMetal); // foot L
      px(12, 39, 8, 2, C.robotMetal); // foot R
    };

    // Detailed rocket: antenna, nose highlight, window with glint, hull
    // stripes, rivets, fins and side thrusters.
    const rocketSprite = ({ px }) => {
      // antenna
      px(5, -3, 2, 3, C.robotDark);
      px(4, -5, 4, 2, C.red);
      // nose
      px(4, 0, 4, 4, C.red);
      px(4, 0, 4, 1, "#ff8a90");
      // upper hull
      px(3, 4, 6, 2, C.hullLight);
      px(3, 6, 6, 6, C.hull);
      px(3, 7, 1, 1, C.robotDark); // rivet
      px(8, 7, 1, 1, C.robotDark); // rivet
      // window
      px(4, 7, 4, 4, C.visorDark);
      px(5, 8, 2, 2, C.cyan);
      px(5, 8, 1, 1, C.cyanLight);
      // stripe
      px(3, 12, 6, 1, C.red);
      // lower hull
      px(3, 13, 6, 4, C.hull);
      // fins
      px(1, 13, 2, 5, C.red);
      px(9, 13, 2, 5, C.red);
      px(1, 18, 1, 1, "#ff8a90");
      px(10, 18, 1, 1, "#ff8a90");
      // side thrusters
      px(2, 16, 2, 3, C.robotDark);
      px(8, 16, 2, 3, C.robotDark);
      // engine + tail
      px(4, 17, 4, 3, C.robotDark);
      px(3, 20, 6, 1, C.robotDark);
    };

    // Robots flow through space, slowly rotating left or right.
    function drawRobot(r) {
      const s = r.scale;
      const bob = Math.sin(t * 1.2 + r.phase) * 3;
      const cx = r.x + Math.sin(t * 0.5 + r.phase) * 4;
      const cy = r.y + bob;
      const rot = r.spin * t + r.phase0;

      const paint = (ox, oy, outline) => {
        ctx.save();
        ctx.translate(cx + ox, cy + oy);
        ctx.rotate(rot);
        const px = (gx, gy, w, h, c) => {
          ctx.fillStyle = outline ? C.outline : c;
          ctx.fillRect(Math.round((gx - 13) * s), Math.round((gy - 18) * s), Math.ceil(w * s), Math.ceil(h * s));
        };
        robotSprite({ px });
        ctx.restore();
      };

      for (const [ox, oy] of OUTLINE_OFFSETS) paint(ox, oy, true);
      paint(0, 0, false);
    }

    // Rockets drift through space, slowly rotating left or right.
    function drawRocket(r) {
      const s = r.scale;
      const bob = Math.sin(t * 1.6 + r.phase) * 3;
      const cx = r.x;
      const cy = r.y + bob;
      const rot = r.spin * t + r.phase0;

      const paint = (ox, oy, outline) => {
        ctx.save();
        ctx.translate(cx + ox, cy + oy);
        ctx.rotate(rot);
        const px = (gx, gy, w, h, c) => {
          ctx.fillStyle = outline ? C.outline : c;
          ctx.fillRect(Math.round((gx - 6) * s), Math.round((gy - 11) * s), Math.ceil(w * s), Math.ceil(h * s));
        };
        rocketSprite({ px });
        ctx.restore();
      };

      for (const [ox, oy] of OUTLINE_OFFSETS) paint(ox, oy, true);
      paint(0, 0, false);
    }

    function frame() {
      t += 0.016;

      // sky gradient
      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, C.spaceTop);
      g.addColorStop(0.55, C.spaceMid);
      g.addColorStop(1, C.spaceBottom);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      // nebulae
      drawNebula(W * 0.22, H * 0.28, "rgba(41,173,255,0.08)");
      drawNebula(W * 0.78, H * 0.72, "rgba(255,214,77,0.05)");
      drawNebula(W * 0.5, H * 0.5, "rgba(176,90,255,0.06)");

      // constellation lines — sparse, so each star reads on its own
      ctx.lineWidth = 1;
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const a = stars[i];
          const b = stars[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 80 * 80) {
            const alpha = (1 - Math.sqrt(d2) / 80) * 0.15;
            ctx.strokeStyle = `${C.line}${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // star nodes (blue + yellow) with a strong pulsing glow
      for (const s of stars) {
        s.x += s.vx;
        s.y += s.vy;
        wrap(s, 30);
        const a = s.base * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
        const core = Math.max(0.2, Math.min(1, a));
        const x = Math.round(s.x);
        const y = Math.round(s.y);
        const rgb = s.color === C.yellow ? C.yellowRGB : C.cyanRGB;
        const glowR = s.r * 5.5;

        // soft halo that pulses with the twinkle (dimmer)
        const grad = ctx.createRadialGradient(x, y, 0, x, y, glowR);
        grad.addColorStop(0, `rgba(${rgb},${(core * 0.6).toFixed(3)})`);
        grad.addColorStop(0.35, `rgba(${rgb},${(core * 0.22).toFixed(3)})`);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.globalAlpha = 1;
        ctx.fillStyle = grad;
        ctx.fillRect(x - glowR, y - glowR, glowR * 2, glowR * 2);

        // bright core + glint
        ctx.fillStyle = s.color;
        ctx.fillRect(x - 2, y - 2, s.r, s.r);
        if (s.r > 3) {
          ctx.fillRect(x - 3, y, 6, 1);
          ctx.fillRect(x, y - 3, 1, 6);
        }
      }

      // planets
      ctx.imageSmoothingEnabled = false;
      for (const p of planets) {
        ctx.drawImage(p.cv, p.x, p.y, p.draw, p.draw);
      }

      // shooting star
      if (!shooting && Math.random() < 0.003) {
        shooting = {
          x: rnd(W * 0.2, W * 0.8),
          y: rnd(0, H * 0.3),
          vx: rnd(5, 8),
          vy: rnd(2.5, 4.5),
          life: 1,
        };
      }
      if (shooting) {
        shooting.x += shooting.vx;
        shooting.y += shooting.vy;
        shooting.life -= 0.02;
        ctx.strokeStyle = `rgba(235,232,255,${Math.max(0, shooting.life)})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(shooting.x, shooting.y);
        ctx.lineTo(shooting.x - shooting.vx * 7, shooting.y - shooting.vy * 7);
        ctx.stroke();
        if (shooting.life <= 0 || shooting.x > W + 100 || shooting.y > H + 100) shooting = null;
      }

      // rockets — horizontal, vertical and diagonal paths
      for (const r of rockets) {
        r.x += r.vx;
        r.y += r.vy;
        wrap(r, 140);
        drawRocket(r);
      }

      // robots — flowing in space
      for (const r of robots) {
        r.x += r.vx;
        r.y += r.vy;
        wrap(r, 160);
        drawRobot(r);
      }

      raf = requestAnimationFrame(frame);
    }      makePlanets();
    resize();
    frame();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 h-full w-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
