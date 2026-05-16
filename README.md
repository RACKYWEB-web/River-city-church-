# Rackyweb Nexus
## "The Future of Digital Innovation"

A premium global digital ecosystem — E-Commerce Marketplace · AI Learning Academy · Startup Hub · Creator Community

---

## 📁 File Structure

```
rackyweb-nexus/
├── index.html              ← Main homepage (all sections)
├── css/
│   └── style.css           ← Complete design system (964 lines)
├── js/
│   └── app.js              ← All interactions & animations (394 lines)
├── img/
│   └── logo.png            ← Rackyweb Global Media logo
├── pages/
│   ├── 404.html            ← Custom error page
│   ├── privacy.html        ← Full Privacy Policy
│   └── terms.html          ← Full Terms of Service
└── README.md               ← This file
```

---

## 🚀 How to Use

### Option 1 — Open Locally
Open `index.html` in any modern browser. No build tools, no npm, no server required.

### Option 2 — Deploy to GitHub Pages
1. Upload the entire folder to a GitHub repository
2. Go to Settings → Pages → Select `main` branch → Save
3. Your site will be live at `https://[username].github.io/[repo-name]/`

### Option 3 — Netlify (Recommended)
1. Drag and drop the project folder at **netlify.com/drop**
2. Live in 30 seconds with a shareable URL

### Option 4 — Vercel
```bash
npx vercel --prod
```

---

## 🎨 Design System

### Color Palette
| Token | Value | Usage |
|-------|-------|-------|
| `--b0` | `#04040a` | Primary background |
| `--b1` | `#070710` | Section backgrounds |
| `--b2` | `#0d0d1a` | Card backgrounds |
| `--g1` | `#c8a84b` | Gold primary accent |
| `--g2` | `#e2c472` | Gold light |
| `--g3` | `#f5e0a0` | Gold bright |
| `--n2` | `#2563eb` | Navy blue |
| `--n3` | `#60a5fa` | Sky blue |
| `--neo` | `#00d4ff` | Neon cyan highlight |
| `--e2` | `#10b981` | Emerald accent |
| `--tw` | `#f0eee8` | Primary text |
| `--tm` | `#5a586a` | Muted text |

### Typography
- **Headings/Display:** Syne (800 weight) — `var(--fh)`
- **Body Text:** Inter (300–700) — `var(--fs)`
- **Decorative/Serif:** Playfair Display (700) — `var(--fd)`
- **Monospace/Code:** JetBrains Mono (300–700) — `var(--fm)`

### Gradients
- `--gg` Gold gradient (navbar, CTAs)
- `--gs` Gold shine (buttons)
- `--gn` Navy blue gradient
- `--gne` Gold → Neon → Navy (hero text)
- `--gp` Prism rainbow (404, special accents)

---

## ✨ Features

### Home Page (15 Sections)
1. **Hero** — Cinematic full-screen with animated visuals, trust bar, 5 platform cards
2. **Marquee** — Infinite scrolling ticker
3. **Statistics** — Animated counters (48K members, 2.4K assets, 1.2M AI interactions, 190 countries)
4. **Marketplace** — Filterable product grid (8 products, 7 categories, cart system)
5. **Sell CTA** — 3-step seller onboarding section
6. **Academy** — 6 learning paths with animated progress bars
7. **Courses** — 6 featured courses with instructor bios
8. **Learning Dashboard** — Student progress tracking UI
9. **AI Hub** — Orbital animation + 6 AI tools
10. **Startup Hub** — 3 featured startups with funding details
11. **Partners** — 9 global technology partners
12. **Video Showcase** — Cinematic video section
13. **Testimonials** — Auto-rotating carousel (6 testimonials)
14. **Pricing** — 3 plans (Starter $19, Growth $49, Enterprise custom)
15. **Events** — 3 upcoming events with live countdown timers

### Additional Sections
- Community leaderboard + live activity feed
- Premium blog/insights (4 articles)
- FAQ accordion
- Newsletter signup
- Contact form
- QR codes (site + WhatsApp)
- Footer with 5-column layout

### Interactive Features
- 🖱️ Custom gold magnetic cursor with ring follow
- ✨ 120-particle canvas with gold/blue network connections
- 📊 Animated statistics counters
- 🛒 Functional cart with localStorage persistence
- 🤍 Wishlist toggle on products
- 🔍 Search modal (Ctrl+K shortcut)
- 👤 Login/Register modal with tab switching
- 🤖 Floating AI chat assistant (NexusAI)
- 💬 WhatsApp floating button
- 📊 Scroll progress bar
- 🎯 Sticky navbar (shrinks on scroll)
- 📱 Mobile hamburger menu with slide-down nav
- ⌛ Live countdown timers for 3 events
- ⚡ Live activity feed (auto-updates every 5.8s)
- 🎠 Auto-sliding testimonial carousel
- 🎛️ Floating dock navigation
- 🎯 Scroll-triggered reveal animations (up, left, right, scale)
- 🃏 3D card tilt on hover
- 💫 Ripple effects on all buttons
- 🎢 Parallax hero background
- 🔍 Active nav link highlighting
- 📧 Working newsletter + contact form with success states

---

## 📱 Responsive Breakpoints
- **Desktop:** 1280px max-width containers
- **Laptop:** 1100px — nav links hidden, hamburger shown
- **Tablet:** 900px — 2-column grid layouts
- **Mobile:** 768px — single column, mobile nav
- **Small:** 480px — compact spacing

---

## 🌐 Browser Support
| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 90+ | ✅ Full |
| Firefox | 88+ | ✅ Full |
| Safari | 14+ | ✅ Full |
| Edge | 90+ | ✅ Full |
| Mobile Chrome | Any | ✅ Full |
| Mobile Safari | Any | ✅ Full |

---

## 📞 Contact Details (Embedded in Site)

- **Founder & CEO:** Edward Prince
- **Email:** edwardzethan792@gmail.com
- **WhatsApp:** +234 708 780 6251
- **Tagline:** "The Future of Digital Innovation"

---

## 🛠️ Customisation

### Change Brand Colors
Edit CSS variables at the top of `css/style.css`:
```css
:root {
  --g1: #c8a84b;  /* Gold primary */
  --neo: #00d4ff; /* Neon blue */
  --b0: #04040a;  /* Background */
}
```

### Add Products
Add new `.prod` divs inside `.products` in `index.html`, following the existing pattern. Add `data-cat="your-category"` for filter support.

### Add Courses
Add new `.course` divs inside `.courses` in `index.html` following the existing pattern.

### Update Contact Info
Search for `edwardzethan792@gmail.com` and `+2347087806251` across all files to update contact details.

### Replace Logo
Replace `img/logo.png` with your own logo file (PNG, transparent background, recommended size 200×200px).

---

*Built with precision, passion, and purpose for Rackyweb Nexus.*  
*© 2026 Rackyweb Nexus — The Future of Digital Innovation*
