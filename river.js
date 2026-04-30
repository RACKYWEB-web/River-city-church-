/**
 * river.js — Flowing River of Life Canvas Animation
 * City Revival Center Church
 *
 * Creates continuous, steady flowing water streams across the background.
 * Multiple layered sinusoidal streams with shimmering light ripples,
 * floating particles, and gold light bursts.
 */

(function () {
  'use strict';

  /* ── Setup ── */
  const canvas = document.getElementById('river-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, dpr;
  let t = 0;
  let rafId;

  /* ── Resize ── */
  function resize() {
    dpr = window.devicePixelRatio || 1;
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width  = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildStreams();
    buildParticles();
  }

  /* ══════════════════════════════════════════
     STREAM DEFINITIONS
  ══════════════════════════════════════════ */
  const streams = [];

  function buildStreams() {
    streams.length = 0;

    // Each stream: a sinusoidal ribbon flowing from top/left → bottom/right
    const definitions = [
      // ── MAIN WIDE RIVER — deep blue glow ──
      { yBias: 0.28, amplitude: 0.09, freq: 1.1, speed: 0.38, width: 220, alpha: 0.28, color: [74, 144, 217] },
      { yBias: 0.28, amplitude: 0.09, freq: 1.1, speed: 0.38, width: 70,  alpha: 0.55, color: [126,200,247] },
      { yBias: 0.28, amplitude: 0.09, freq: 1.1, speed: 0.42, width: 14,  alpha: 0.90, color: [200,235,255] },
      // ── SECONDARY CURRENT — mid blue ──
      { yBias: 0.55, amplitude: 0.11, freq: 0.9, speed: 0.28, width: 180, alpha: 0.22, color: [27, 79, 170] },
      { yBias: 0.55, amplitude: 0.11, freq: 0.9, speed: 0.28, width: 55,  alpha: 0.45, color: [74,144,217] },
      { yBias: 0.55, amplitude: 0.11, freq: 0.9, speed: 0.32, width: 10,  alpha: 0.80, color: [140,210,255] },
      // ── GOLD RIVER OF LIFE — shimmering current ──
      { yBias: 0.72, amplitude: 0.07, freq: 1.4, speed: 0.50, width: 120, alpha: 0.18, color: [240,192, 64] },
      { yBias: 0.72, amplitude: 0.07, freq: 1.4, speed: 0.50, width: 40,  alpha: 0.50, color: [255,215,100] },
      { yBias: 0.72, amplitude: 0.07, freq: 1.4, speed: 0.56, width: 8,   alpha: 0.95, color: [255,240,160] },
      // ── UPPER SOFT WASH ──
      { yBias: 0.12, amplitude: 0.05, freq: 0.7, speed: 0.18, width: 350, alpha: 0.12, color: [27, 79, 170] },
      { yBias: 0.12, amplitude: 0.05, freq: 0.7, speed: 0.22, width: 50,  alpha: 0.30, color: [74,144,217] },
      // ── LOWER DEEP WASH ──
      { yBias: 0.90, amplitude: 0.05, freq: 0.7, speed: 0.20, width: 320, alpha: 0.12, color: [10, 36, 99] },
      { yBias: 0.90, amplitude: 0.05, freq: 0.7, speed: 0.24, width: 45,  alpha: 0.28, color: [74,144,217] },
      // ── BRIGHT LIGHT RIPPLES ──
      { yBias: 0.42, amplitude: 0.05, freq: 2.0, speed: 0.65, width: 45,  alpha: 0.35, color: [200,230,255] },
      { yBias: 0.38, amplitude: 0.03, freq: 2.6, speed: 0.80, width: 12,  alpha: 0.70, color: [220,245,255] },
      // ── GOLD MICRO CURRENTS ──
      { yBias: 0.65, amplitude: 0.04, freq: 2.4, speed: 0.75, width: 20,  alpha: 0.40, color: [255,224,132] },
      { yBias: 0.60, amplitude: 0.03, freq: 3.0, speed: 0.90, width: 8,   alpha: 0.65, color: [255,240,160] },
      // ── CENTRE GLOW RIVER ──
      { yBias: 0.50, amplitude: 0.06, freq: 0.8, speed: 0.22, width: 260, alpha: 0.10, color: [74,144,217] },
      { yBias: 0.50, amplitude: 0.06, freq: 0.8, speed: 0.26, width: 30,  alpha: 0.40, color: [126,200,247] },
    ];

    for (const d of definitions) {
      streams.push({
        yBias:     d.yBias,
        amplitude: d.amplitude,
        freq:      d.freq,
        speed:     d.speed,
        width:     d.width,
        alpha:     d.alpha,
        r: d.color[0], g: d.color[1], b: d.color[2],
        phaseOffset: Math.random() * Math.PI * 2,
      });
    }
  }

  /* Evaluate stream y at normalised x (0→1) */
  function streamY(s, nx, time) {
    return (s.yBias + Math.sin(nx * Math.PI * 2 * s.freq + time * s.speed + s.phaseOffset) * s.amplitude) * H;
  }

  function drawStreams(time) {
    const STEPS = 180;

    for (const s of streams) {
      ctx.save();

      // Build path for the ribbon centre
      const pts = [];
      for (let i = 0; i <= STEPS; i++) {
        pts.push({ x: (i / STEPS) * W, y: streamY(s, i / STEPS, time) });
      }

      // Draw wide soft glow first (large width, very low alpha)
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
      ctx.lineWidth   = s.width;
      ctx.strokeStyle = `rgba(${s.r},${s.g},${s.b},${s.alpha * 0.5})`;
      ctx.lineJoin    = 'round';
      ctx.lineCap     = 'round';

      // Soft glow via shadow
      ctx.shadowBlur  = s.width * 0.8;
      ctx.shadowColor = `rgba(${s.r},${s.g},${s.b},${s.alpha * 0.4})`;
      ctx.stroke();

      // Core bright line
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
      ctx.lineWidth   = Math.max(1, s.width * 0.12);
      ctx.strokeStyle = `rgba(${s.r},${s.g},${s.b},${Math.min(1, s.alpha * 2.5)})`;
      ctx.shadowBlur  = 12;
      ctx.shadowColor = `rgba(${s.r},${s.g},${s.b},0.6)`;
      ctx.stroke();

      ctx.restore();
    }
  }

  /* ══════════════════════════════════════════
     FLOATING PARTICLES (sparkles on water)
  ══════════════════════════════════════════ */
  const PARTICLE_COUNT = 90;
  const particles = [];

  function buildParticles() {
    particles.length = 0;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      spawnParticle(particles, true);
    }
  }

  function spawnParticle(arr, randomLife) {
    const isGold = Math.random() < 0.22;
    arr.push({
      x:    Math.random() * W,
      y:    Math.random() * H,
      vx:   (Math.random() * 0.6 + 0.2) * (Math.random() < 0.5 ? 1 : -1),
      vy:   (Math.random() * 0.3 - 0.15),
      r:    Math.random() * 2.2 + 0.4,
      life: randomLife ? Math.random() : 0,
      maxLife: Math.random() * 220 + 80,
      gold: isGold,
    });
  }

  function drawParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life++;

      const progress = p.life / p.maxLife;
      const alpha    = progress < 0.15
        ? (progress / 0.15)
        : progress > 0.75
          ? (1 - (progress - 0.75) / 0.25)
          : 1;

      ctx.save();
      if (p.gold) {
        ctx.shadowBlur  = 10;
        ctx.shadowColor = 'rgba(240,192,64,0.8)';
        ctx.fillStyle   = `rgba(240,192,64,${alpha * 0.85})`;
      } else {
        ctx.shadowBlur  = 8;
        ctx.shadowColor = 'rgba(126,200,247,0.7)';
        ctx.fillStyle   = `rgba(200,230,255,${alpha * 0.7})`;
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      if (p.life >= p.maxLife || p.x < -10 || p.x > W + 10 || p.y < -10 || p.y > H + 10) {
        particles.splice(i, 1);
        spawnParticle(particles, false);
      }
    }
  }

  /* ══════════════════════════════════════════
     LIGHT BURST RIPPLES
  ══════════════════════════════════════════ */
  const ripples = [];
  let nextRipple = 0;

  function spawnRipple() {
    // Attach ripples near stream paths
    const s = streams[Math.floor(Math.random() * streams.length)];
    const nx = Math.random();
    const cy = streamY(s, nx, t);
    const isGold = Math.random() < 0.3;
    ripples.push({
      x: nx * W, y: cy,
      r: 0, maxR: Math.random() * 50 + 20,
      alpha: 0.35,
      gold: isGold,
      speed: Math.random() * 0.6 + 0.3,
    });
  }

  function drawRipples() {
    for (let i = ripples.length - 1; i >= 0; i--) {
      const rp = ripples[i];
      rp.r += rp.speed;
      rp.alpha -= 0.005;

      if (rp.alpha <= 0 || rp.r > rp.maxR) { ripples.splice(i, 1); continue; }

      ctx.save();
      const color = rp.gold ? `rgba(240,192,64,${rp.alpha})` : `rgba(126,200,247,${rp.alpha})`;
      ctx.beginPath();
      ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
      ctx.strokeStyle = color;
      ctx.lineWidth   = 1.2;
      ctx.shadowBlur  = 12;
      ctx.shadowColor = color;
      ctx.stroke();
      ctx.restore();
    }
  }

  /* ══════════════════════════════════════════
     RENDER LOOP
  ══════════════════════════════════════════ */
  function frame() {
    ctx.clearRect(0, 0, W, H);

    t += 0.008; // global time tick — steady and smooth

    // Ripple spawn rate
    if (++nextRipple > 18) {
      nextRipple = 0;
      spawnRipple();
    }

    drawStreams(t);
    drawRipples();
    drawParticles();

    rafId = requestAnimationFrame(frame);
  }

  /* ── Init ── */
  window.addEventListener('resize', () => {
    cancelAnimationFrame(rafId);
    resize();
    frame();
  });

  resize();
  frame();

})();
