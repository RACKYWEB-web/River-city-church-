/* ================================================================
   RACKYWEB NEXUS — app.js
   "The Future of Digital Innovation"
================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── LOADER ────────────────────────────────────────────── */
  const loader = document.getElementById('loader');
  if (loader) {
    window.addEventListener('load', () => setTimeout(() => loader.classList.add('gone'), 1800));
    setTimeout(() => loader?.classList.add('gone'), 3200);
  }

  /* ── CURSOR ────────────────────────────────────────────── */
  const dot = document.getElementById('cdot');
  const ring = document.getElementById('cring');
  const glow = document.getElementById('mglow');
  let mx = 0, my = 0, rx = 0, ry = 0;
  if (dot && ring) {
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px'; dot.style.top = my + 'px';
      if (glow) { glow.style.left = mx + 'px'; glow.style.top = my + 'px'; }
    });
    (function animRing() {
      rx += (mx - rx) * .1; ry += (my - ry) * .1;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(animRing);
    })();
    const hovEls = 'a,button,.btn,.card,.prod,.course,.path,.hv-card,.ai-tool,.price-c,.t-card,.ev-card,.startup,.blog-c,.partner,.c-item,.faq-q,.cat,.dk,.aca-f,.sell-step,.cert-card,.su,.lb-row,.feed-i,.hcard,.hv-main';
    document.querySelectorAll(hovEls).forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('hov'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('hov'));
    });
  }

  /* ── SCROLL PROGRESS + NAVBAR ──────────────────────────── */
  const sbar = document.getElementById('sbar');
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    const p = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    if (sbar) sbar.style.width = p + '%';
    if (nav) nav.classList.toggle('up', window.scrollY > 60);
  }, { passive: true });

  /* ── PARTICLES ─────────────────────────────────────────── */
  const cvs = document.getElementById('cvs');
  if (cvs) {
    const ctx = cvs.getContext('2d');
    let W, H, pts = [];
    const COLS = ['200,168,75','0,212,255','37,99,235','16,185,129','200,160,60'];
    const resize = () => { W = cvs.width = innerWidth; H = cvs.height = innerHeight; };
    resize(); window.addEventListener('resize', resize, { passive: true });
    class P {
      reset() {
        this.x = Math.random() * W; this.y = Math.random() * H;
        this.vx = (Math.random() - .5) * .22; this.vy = -Math.random() * .38 - .06;
        this.r = Math.random() * 1.3 + .3;
        this.a = Math.random() * .45 + .07;
        this.c = COLS[Math.floor(Math.random() * COLS.length)];
      }
      constructor() { this.reset(); this.y = Math.random() * H; }
      step() { this.x += this.vx; this.y += this.vy; this.a -= .0006; if (this.a <= 0 || this.y < -10) this.reset(); }
      draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(${this.c},${this.a})`; ctx.fill(); }
    }
    for (let i = 0; i < 120; i++) pts.push(new P());
    (function loop() {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => { p.step(); p.draw(); });
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 80) { ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.strokeStyle = `rgba(200,168,75,${.028 * (1 - d / 80)})`; ctx.lineWidth = .5; ctx.stroke(); }
      }
      requestAnimationFrame(loop);
    })();
  }

  /* ── REVEAL ANIMATIONS ─────────────────────────────────── */
  const rvEls = document.querySelectorAll('.rv,.rv-l,.rv-r,.rv-s');
  const rvObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('on');
      e.target.querySelectorAll('[data-fill]').forEach(b => setTimeout(() => { b.style.width = b.dataset.fill + '%'; }, 250));
      e.target.querySelectorAll('[data-count]').forEach(el => animCount(el));
    });
  }, { threshold: .1 });
  rvEls.forEach(el => rvObs.observe(el));
  document.querySelectorAll('[data-count]').forEach(el => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { animCount(el); o.disconnect(); } }, { threshold: .3 });
    o.observe(el);
  });

  /* ── COUNTER ───────────────────────────────────────────── */
  function animCount(el) {
    if (el._done) return; el._done = true;
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const isFloat = el.dataset.float === '1';
    const dur = 2200; const start = performance.now();
    (function tick(now) {
      const t = Math.min((now - start) / dur, 1);
      const e = t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const v = e * target;
      if (target >= 1e6) el.textContent = (v / 1e6).toFixed(1) + 'M' + suffix;
      else if (target >= 1000) el.textContent = Math.floor(v / 1000) + 'K' + suffix;
      else if (isFloat) el.textContent = v.toFixed(1) + suffix;
      else el.textContent = Math.floor(v) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    })(start);
  }

  /* ── RIPPLE ────────────────────────────────────────────── */
  window.ripple = e => {
    const btn = e.currentTarget;
    const s = document.createElement('span'); s.classList.add('rip');
    const r = btn.getBoundingClientRect(); const sz = Math.max(r.width, r.height);
    s.style.cssText = `width:${sz}px;height:${sz}px;left:${e.clientX-r.left-sz/2}px;top:${e.clientY-r.top-sz/2}px`;
    btn.appendChild(s); setTimeout(() => s.remove(), 700);
  };

  /* ── 3D TILT ───────────────────────────────────────────── */
  document.querySelectorAll('.hv-card,.hv-main,.price-c,.hcard').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      card.style.transform = `translateY(-5px) rotateY(${x * 9}deg) rotateX(${-y * 7}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  /* ── HAMBURGER ─────────────────────────────────────────── */
  const mob = document.getElementById('mob-nav');
  window.toggleNav = () => {
    mob?.classList.toggle('show');
    const spans = document.querySelectorAll('.hamburger span');
    const open = mob?.classList.contains('show');
    if (spans[0]) spans[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
    if (spans[1]) spans[1].style.opacity = open ? '0' : '';
    if (spans[2]) spans[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
  };

  /* ── SMOOTH SCROLL ─────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const t = document.querySelector(id);
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); mob?.classList.remove('show'); document.querySelectorAll('.hamburger span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; }); }
    });
  });

  /* ── SEARCH MODAL ──────────────────────────────────────── */
  const searchBg = document.getElementById('search-bg');
  window.openSearch = () => { searchBg?.classList.add('open'); setTimeout(() => document.querySelector('.s-inp')?.focus(), 80); };
  window.closeSearch = () => searchBg?.classList.remove('open');
  searchBg?.addEventListener('click', e => { if (e.target === searchBg) closeSearch(); });

  /* ── AUTH MODAL ────────────────────────────────────────── */
  const authBg = document.getElementById('auth-bg');
  window.openAuth = () => authBg?.classList.add('open');
  window.closeAuth = () => authBg?.classList.remove('open');
  authBg?.addEventListener('click', e => { if (e.target === authBg) closeAuth(); });
  window.switchTab = t => { document.querySelectorAll('.m-tab').forEach(x => x.classList.remove('on')); t.classList.add('on'); };

  /* ── KEYBOARD ──────────────────────────────────────────── */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeSearch(); closeAuth(); closeCart(); closeAI(); }
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
  });

  /* ── CART ──────────────────────────────────────────────── */
  let cart = JSON.parse(localStorage.getItem('nx-cart') || '[]');
  const cartPanel = document.getElementById('cart-panel');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartCount = document.getElementById('cart-count');
  const cartItemsEl = document.getElementById('cart-items');
  const cartTotalEl = document.getElementById('cart-total');

  function saveCart() { localStorage.setItem('nx-cart', JSON.stringify(cart)); }
  function updateCartUI() {
    if (cartCount) cartCount.textContent = cart.length;
    if (!cartItemsEl) return;
    cartItemsEl.innerHTML = cart.length === 0
      ? `<div style="text-align:center;padding:40px 20px;color:var(--tm);font-size:14px">Your cart is empty.<br><br><a href="#shop" onclick="closeCart()" style="color:var(--g2)">Browse Products →</a></div>`
      : cart.map((item, i) => `
        <div class="cart-item">
          <div class="cart-item-img">${item.icon || '📦'}</div>
          <div style="flex:1">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">${item.price}</div>
            <div class="cart-item-rm" onclick="removeFromCart(${i})">Remove ×</div>
          </div>
        </div>`).join('');
    const total = cart.reduce((s, i) => s + parseFloat(String(i.price).replace(/[^0-9.]/g, '')), 0);
    if (cartTotalEl) cartTotalEl.textContent = '$' + total.toFixed(2);
  }
  window.addToCart = (name, price, icon) => {
    cart.push({ name, price, icon }); saveCart(); updateCartUI(); openCart();
  };
  window.removeFromCart = i => { cart.splice(i, 1); saveCart(); updateCartUI(); };
  window.openCart = () => { cartPanel?.classList.add('open'); cartOverlay?.classList.add('open'); };
  window.closeCart = () => { cartPanel?.classList.remove('open'); cartOverlay?.classList.remove('open'); };
  cartOverlay?.addEventListener('click', closeCart);
  updateCartUI();

  /* ── WISHLIST ──────────────────────────────────────────── */
  window.toggleWish = (btn, name) => {
    const on = btn.classList.toggle('wish-on');
    btn.textContent = on ? '❤️' : '🤍';
    if (on) showToast(`${name} added to wishlist!`);
  };

  /* ── TOAST ─────────────────────────────────────────────── */
  window.showToast = (msg, type = 'success') => {
    const t = document.createElement('div');
    t.style.cssText = `position:fixed;bottom:160px;left:50%;transform:translateX(-50%);background:${type === 'success' ? 'var(--b3)' : '#7f1d1d'};border:1px solid ${type === 'success' ? 'var(--gb)' : 'rgba(239,68,68,.3)'};color:var(--tw);font-family:var(--fm);font-size:12px;letter-spacing:.06em;padding:10px 22px;border-radius:8px;z-index:99990;animation:fu .35s ease;white-space:nowrap;box-shadow:0 8px 30px rgba(0,0,0,.4)`;
    t.textContent = msg; document.body.appendChild(t);
    setTimeout(() => t.remove(), 3000);
  };

  /* ── AI PANEL ──────────────────────────────────────────── */
  const aiPanel = document.getElementById('ai-panel');
  window.toggleAI = () => aiPanel?.classList.toggle('open');
  window.closeAI = () => aiPanel?.classList.remove('open');
  const aiInput = document.getElementById('ai-input');
  const aiMsgs = document.getElementById('ai-msgs');
  const aiReplies = [
    "Great question! I can help you with that. Our platform has everything you need to get started.",
    "Absolutely! Rackyweb Nexus offers premium courses, AI tools, and a marketplace all in one place.",
    "You can find that in our Academy section. We have structured learning paths for all skill levels.",
    "Our AI tools can generate business plans, pitch decks, and market research in minutes.",
    "Head to the Marketplace to browse 2,400+ premium digital assets and templates.",
    "Feel free to contact Edward Prince directly at edwardzethan792@gmail.com for partnerships.",
    "The Growth plan gives you full access to all AI tools, courses, and marketplace features.",
    "We offer certificates upon course completion that you can share on LinkedIn and your portfolio."
  ];
  let aiIdx = 0;
  window.sendAI = () => {
    const msg = aiInput?.value?.trim();
    if (!msg) return;
    if (!aiMsgs) return;
    aiMsgs.innerHTML += `<div class="aip-msg-user">${msg}</div>`;
    aiInput.value = '';
    setTimeout(() => {
      aiMsgs.innerHTML += `<div class="aip-msg-bot">${aiReplies[aiIdx % aiReplies.length]}</div>`;
      aiIdx++; aiMsgs.scrollTop = aiMsgs.scrollHeight;
    }, 800);
    aiMsgs.scrollTop = aiMsgs.scrollHeight;
  };
  aiInput?.addEventListener('keydown', e => { if (e.key === 'Enter') sendAI(); });

  /* ── TESTIMONIAL SLIDER ────────────────────────────────── */
  let tIdx = 0;
  const tTrack = document.getElementById('t-track');
  window.goSlide = n => {
    tIdx = n;
    const w = innerWidth > 900 ? 33.333 : innerWidth > 560 ? 50 : 100;
    if (tTrack) tTrack.style.transform = `translateX(-${n * w}%)`;
    document.querySelectorAll('.t-dot').forEach((d, i) => d.classList.toggle('on', i === n));
  };
  setInterval(() => goSlide((tIdx + 1) % 3), 5500);

  /* ── FILTER PRODUCTS ───────────────────────────────────── */
  window.filterProd = (btn, cat) => {
    document.querySelectorAll('.cat').forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
    document.querySelectorAll('[data-cat]').forEach(c => {
      c.style.display = (cat === 'all' || c.dataset.cat === cat) ? '' : 'none';
    });
  };

  /* ── FAQ ACCORDION ─────────────────────────────────────── */
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-i');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-i').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* ── COUNTDOWN TIMERS ──────────────────────────────────── */
  function countdown(targetISO, prefix) {
    const diff = Math.max(0, new Date(targetISO) - new Date());
    const pad = n => String(Math.floor(n)).padStart(2, '0');
    const el = id => document.getElementById(id);
    if (el(`${prefix}d`)) {
      el(`${prefix}d`).textContent = pad(diff / 86400000);
      el(`${prefix}h`).textContent = pad(diff % 86400000 / 3600000);
      el(`${prefix}m`).textContent = pad(diff % 3600000 / 60000);
      el(`${prefix}s`).textContent = pad(diff % 60000 / 1000);
    }
  }
  function tick() {
    countdown('2026-05-28T18:00:00Z', 'ev1-');
    countdown('2026-06-10T16:00:00Z', 'ev2-');
    countdown('2026-06-20T14:00:00Z', 'ev3-');
  }
  setInterval(tick, 1000); tick();

  /* ── LIVE ACTIVITY FEED ────────────────────────────────── */
  const feedItems = [
    { icon: '🎓', bg: '200,168,75', text: '<strong>James W.</strong> enrolled in Full-Stack Mastery' },
    { icon: '🚀', bg: '0,212,255', text: '<strong>TechVenture X</strong> launched their startup page' },
    { icon: '💰', bg: '16,185,129', text: '<strong>Sarah K.</strong> made her first $2,000 on the marketplace' },
    { icon: '⭐', bg: '200,168,75', text: '<strong>UI Nexus Kit</strong> reached 1,000 downloads' },
    { icon: '🤖', bg: '37,99,235', text: '<strong>NexusAI</strong> generated 800 business plans today' },
    { icon: '🏆', bg: '200,168,75', text: '<strong>DevCrew Pro</strong> won the weekly pitch competition' },
    { icon: '🎨', bg: '16,185,129', text: '<strong>Luna Design</strong> published a new premium template' },
  ];
  let feedIdx = 0;
  setInterval(() => {
    const feed = document.getElementById('live-feed');
    if (!feed) return;
    const item = feedItems[feedIdx % feedItems.length];
    const el = document.createElement('div');
    el.className = 'feed-i';
    el.style.cssText = 'opacity:0;transform:translateX(-16px);transition:all .45s ease';
    el.innerHTML = `<div class="feed-av" style="background:rgba(${item.bg},.12)">${item.icon}</div><div><div class="feed-txt">${item.text}</div><div class="feed-time">Just now</div></div>`;
    feed.prepend(el);
    setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'none'; }, 50);
    if (feed.children.length > 5) { const last = feed.lastChild; last.style.opacity = '0'; setTimeout(() => last.remove(), 400); }
    feedIdx++;
  }, 5800);

  /* ── NEWSLETTER ────────────────────────────────────────── */
  document.getElementById('nl-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const orig = btn.textContent;
    btn.textContent = '✓ Subscribed!';
    btn.style.background = 'linear-gradient(135deg,#059669,#34d399)';
    e.target.reset();
    setTimeout(() => { btn.textContent = orig; btn.style.background = ''; }, 3200);
  });

  /* ── CONTACT FORM ──────────────────────────────────────── */
  document.getElementById('contact-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type=submit]');
    btn.textContent = '✓ Message Sent!';
    btn.disabled = true;
    showToast('Message sent! We\'ll reply within 2–4 hours.');
    setTimeout(() => { btn.textContent = 'Send Message'; btn.disabled = false; e.target.reset(); }, 3500);
  });

  /* ── PARALLAX HERO ─────────────────────────────────────── */
  const hero = document.getElementById('hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      if (scrollY < innerHeight) hero.style.backgroundPositionY = `calc(50% + ${scrollY * .3}px)`;
    }, { passive: true });
  }

  /* ── ACTIVE NAV LINK ───────────────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.n-link');
  const secObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(l => l.classList.toggle('act', l.getAttribute('href') === '#' + e.target.id));
      }
    });
  }, { threshold: .4 });
  sections.forEach(s => secObs.observe(s));

  /* ── WISHLIST HEARTS ───────────────────────────────────── */
  document.querySelectorAll('.wish-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      btn.classList.toggle('wish-on');
      btn.textContent = btn.classList.contains('wish-on') ? '❤️' : '🤍';
    });
  });

  /* ── VIDEO PLAY ────────────────────────────────────────── */
  document.querySelector('.play')?.addEventListener('click', () => {
    showToast('Video streaming coming soon!');
  });

  /* ── CHECKOUT ──────────────────────────────────────────── */
  window.checkout = () => {
    if (cart.length === 0) { showToast('Your cart is empty!', 'error'); return; }
    showToast('Redirecting to secure checkout…');
    setTimeout(() => closeCart(), 1500);
  };

  console.log('%c🌐 RACKYWEB NEXUS', 'color:#c8a84b;font-size:22px;font-weight:900;');
  console.log('%cThe Future of Digital Innovation', 'color:#00d4ff;font-size:13px;');
});

/* ── VIDEO LESSONS ─────────────────────────────────────── */
window.loadVideo = (src, title, lesson, vidTitle, instructor) => {
  const modal  = document.getElementById('vid-modal');
  const iframe = document.getElementById('vm-iframe');
  const t      = document.getElementById('vm-title');
  const l      = document.getElementById('vm-lesson');
  const ins    = document.getElementById('vm-inst');
  if (!modal || !iframe) return;
  iframe.src = src;
  if (t)   t.textContent   = vidTitle  || title;
  if (l)   l.textContent   = lesson    || '';
  if (ins) ins.textContent = instructor || '';
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
};

window.closeVid = () => {
  const modal  = document.getElementById('vid-modal');
  const iframe = document.getElementById('vm-iframe');
  if (modal)  modal.style.display = 'none';
  if (iframe) iframe.src = '';
  document.body.style.overflow = '';
};

// Close video modal on backdrop click
document.getElementById('vid-modal')?.addEventListener('click', e => {
  if (e.target === document.getElementById('vid-modal')) closeVid();
});

/* ── LESSON NOTES — Tab switcher ───────────────────────── */
window.showNote = (btn, noteId) => {
  // Update tab buttons
  document.querySelectorAll('#lesson-notes .cat').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  // Show correct pane
  document.querySelectorAll('.note-pane').forEach(p => { p.style.display = 'none'; });
  const pane = document.getElementById(noteId);
  if (pane) {
    pane.style.display = 'block';
    pane.style.animation = 'rvIn .4s ease';
  }
};

/* ── LESSON NOTES — Module switcher ───────────────────── */
window.showModule = (btn, modId) => {
  // All sidebar items in same panel
  const sidebar = btn.closest('[style*="border-right"]') ||
                  btn.parentElement;
  sidebar?.querySelectorAll('div[onclick]').forEach(d => {
    d.style.background = 'transparent';
    d.style.color = 'var(--tm)';
    d.style.borderLeft = '3px solid transparent';
    d.style.fontWeight = '400';
  });
  // Highlight active
  btn.style.background  = 'var(--gd)';
  btn.style.color       = 'var(--g2)';
  btn.style.borderLeft  = '3px solid var(--g1)';
  btn.style.fontWeight  = '600';

  // Hide all module panes in same content area
  const contentArea = btn.closest('[style*="grid"]')
                        ?.querySelector('[style*="overflow-y"]')
                     || btn.closest('[style*="grid-template-columns:260px"]')
                        ?.children[1];
  if (contentArea) {
    Array.from(contentArea.children).forEach(c => c.style.display = 'none');
  }
  // Show target
  const target = document.getElementById(modId);
  if (target) { target.style.display = 'block'; target.style.animation = 'rvIn .4s ease'; }
};

/* ── QUIZ answer handler ────────────────────────────────── */
window.answerQ = (el, type) => {
  const opts   = el.closest('[id$="-opts"]');
  const result = opts ? document.getElementById(opts.id.replace('-opts','-result')) : null;
  // Disable all options
  opts?.querySelectorAll('div').forEach(d => {
    d.style.pointerEvents = 'none';
    d.style.opacity = '0.5';
  });
  el.style.opacity = '1';
  if (type === 'correct') {
    el.style.background = 'rgba(16,185,129,.15)';
    el.style.borderColor = 'var(--eb)';
    el.style.color = 'var(--e3)';
    if (result) {
      result.style.display = 'block';
      result.style.background = 'rgba(16,185,129,.1)';
      result.style.border = '1px solid var(--eb)';
      result.style.color = 'var(--e3)';
      result.textContent = '✅ Correct! const is used for values that never change.';
    }
    window.showToast('🎉 Correct answer!');
  } else {
    el.style.background = 'rgba(239,68,68,.1)';
    el.style.borderColor = 'rgba(239,68,68,.3)';
    el.style.color = '#f87171';
    // Highlight correct
    const allOpts = opts?.querySelectorAll('div');
    if (allOpts) allOpts[2].style.background = 'rgba(16,185,129,.12)';
    if (allOpts) allOpts[2].style.borderColor = 'var(--eb)';
    if (allOpts) allOpts[2].style.color = 'var(--e3)';
    if (result) {
      result.style.display = 'block';
      result.style.background = 'rgba(239,68,68,.07)';
      result.style.border = '1px solid rgba(239,68,68,.2)';
      result.style.color = '#f87171';
      result.textContent = '❌ Not quite. The correct answer is C — const.';
    }
    window.showToast('Not quite — the answer is C: const', 'error');
  }
};
