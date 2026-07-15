# SmartCity Nexus

A five-page marketing site for **SmartCity Nexus** — a fictional SaaS platform
that unifies a city's traffic, energy, water, and public-safety data into one
real-time operating layer. The product itself isn't real; this project is a
**frontend portfolio build** demonstrating what a polished, production-style
marketing site for that kind of platform would look like.

Built entirely with vanilla **HTML, CSS, and JavaScript** — no framework, no
build step, no bundler. Every interactive feature (animated counters, a live
dashboard simulation, a working contact form, FAQ accordions, a pricing
toggle) is hand-written JS with zero external dependencies beyond two free
CDN-hosted assets (Google Fonts and a couple of hotlinked stock photos).

## What this project demonstrates

- A **multi-page static site** structured without any templating engine — shared design tokens and components, page-specific markup, no duplicated logic
- A cohesive **design system**: white/black-hairline/glassmorphism visual language driven entirely by CSS custom properties, so the whole site can be re-themed from one file
- **Vanilla JS interactivity** with no libraries: IntersectionObserver-based scroll reveals and counters, a live-updating dashboard mockup, an accordion, a working form — each in its own small, single-responsibility module
- Real, working **form handling on a static site** (no backend) via a free third-party form endpoint
- Attention to **accessibility basics**: focus states, reduced-motion handling, semantic markup, alt text
- A **from-scratch SVG icon set and hero illustration**, built to match the site's own color tokens instead of pulled from a stock icon pack

## Pages

| File | What's on it |
|---|---|
| `index.html` | Hero (photo background + live status card + interactive metrics panel), trust strip, animated stat counters, a dark "deployment" split section, feature grid, a live-updating dashboard preview, how-it-works steps, testimonials, closing CTA |
| `about.html` | Project mission, core values, and an honest "who built this" profile section |
| `pricing.html` | Three pricing tiers with a working monthly/annual toggle, plus a pricing-specific FAQ |
| `case-studies.html` | Four illustrative deployment write-ups, each paired with real photography |
| `contact.html` | A working contact form, an FAQ accordion, and direct contact details |

## Interactive features

- **Hero metrics panel** — Traffic / Energy / Safety tabs swap the data-layer dropdown options (`js/hero.js`)
- **Animated stat counters** — count up from 0 once scrolled into view (`js/stats-counter.js`)
- **Live dashboard preview** — KPI numbers and a bar chart re-randomize every few seconds to simulate a live data feed (`js/dashboard.js`)
- **FAQ accordions** — used on both the Contact and Pricing pages (`js/faq.js`)
- **Pricing toggle** — switches every price on the page between monthly/annual (`js/pricing-toggle.js`)
- **Working contact form** — submits via a real HTML POST into a hidden iframe (not `fetch`/AJAX, which is prone to silently failing on statically-hosted pages), so it can't hang and doesn't depend on CORS (`js/contact-form.js`)

Every animated feature respects `prefers-reduced-motion` and degrades
gracefully — e.g. stat counters just render their final value immediately,
and the dashboard renders once and stops re-randomizing.

## Run it

```
npx serve .
```

or just double-click `index.html` — every page works straight off the
filesystem, no server required.

## Structure

```
index.html / about.html / pricing.html / case-studies.html / contact.html
assets/images/           Original SVG icons + hero illustration
css/
  variables.css            Design tokens — start here to retheme anything
  reset.css
  typography.css
  layout.css                Container/grid/section rhythm
  glass.css                 .glass / .glass--strong / .panel utilities
  buttons.css
  cards.css
  nav.css
  hero.css                  Homepage hero + trust strip
  split.css                 Dark "deployment" split section
  dashboard.css              Live dashboard preview panel
  stats.css
  features.css
  about.css                  "How it works" steps (on the homepage)
  about-page.css             About page layout
  pricing.css
  case-studies.css
  contact.css
  faq.css                    Shared accordion, used on Contact + Pricing
  page-header.css            Shared banner for every non-home page
  cta.css
  footer.css
  responsive.css             Cross-cutting breakpoint rules only
js/
  nav.js                    Mobile menu + scroll shadow
  hero.js                   Hero panel tab switching
  stats-counter.js          Count-up animation
  dashboard.js               Live-updating dashboard simulation
  faq.js                    Accordion open/close
  pricing-toggle.js          Monthly/annual price switch
  contact-form.js            Form submission handling
  scroll-reveal.js          [data-reveal] fade-in-on-scroll
  main.js                   Entry point, minimal by design
```

Each page duplicates its own `<nav>` and `<footer>` markup (there's no
templating without a build step), but every page pulls from the same shared
CSS/JS files — so a change to `nav.css` or `nav.js` updates every page at
once. Only genuinely page-specific markup (the hero, pricing cards, case
studies, the contact form) lives in its own file.

## Design tokens (`css/variables.css`)

- Background `#FFFFFF`, borders `#111111` at full or reduced opacity
- One primary accent, electric indigo `#3B5BFF`, plus a secondary mint `#6FE3B4` used only on dark surfaces (hero scrim, CTA band, split section)
- Glass surfaces: `rgba(255,255,255,0.55)` + `backdrop-filter: blur(20px)`
- Type: Space Grotesk (display) / Inter (body) / IBM Plex Mono (data labels, stats, eyebrows)

## Images

- **Hero background** and the four **case-study photos**: real, license-free photography hotlinked directly from Pexels (`images.pexels.com`) — free for commercial use, no attribution required, nothing downloaded or re-hosted.
- **About page photo**: same source, a general collaboration/team scene (not presented as depicting specific named individuals).
- **Feature icons** (`assets/images/icon-*.svg`) and the **homepage hero illustration** (`assets/images/hero-city-isometric.svg`): original SVGs built from this project's own color tokens rather than a stock icon pack — trivial to recolor, no licensing considerations.
- **Testimonial avatars**: hotlinked from Pravatar (`i.pravatar.cc`), a free placeholder-headshot service made for exactly this kind of mockup use.

To swap any photo, the `<img src="...">` is a plain URL — replace it with
another `images.pexels.com` link or your own hosted file.

## The contact form

The form on `contact.html` posts to a free third-party form backend
([FormSubmit](https://formsubmit.co)) via a real HTML form POST targeted at a
hidden iframe — deliberately not `fetch`/AJAX, since that approach can fail
silently (no error, no email) when a page is opened straight from the
filesystem rather than a real server.

If you fork this project and want the form to email *you*, open
`contact.html` and change the `action` attribute on `#contactForm` to
`https://formsubmit.co/your-email@example.com`. FormSubmit requires a
one-time confirmation — your first submission triggers an activation email
instead of delivering the message. Click that link once, and every
submission after that arrives normally.

## Accessibility / quality baseline

- Visible focus rings (`:focus-visible`) everywhere, not just buttons
- `prefers-reduced-motion` respected by every animated feature
- Fallback background for browsers without `backdrop-filter` support
- Mobile nav collapses to a hairline-bordered glass sheet under 860px
- Semantic sections throughout, `alt` text on every meaningful image (decorative icons use `alt=""`)

## About the builder

Designed and built by **Muhammad Umar**, a Computer Science student and
frontend developer, as an independent portfolio project.

- GitHub: [github.com/muhammadumar-dev07](https://github.com/muhammadumar-dev07)
- LinkedIn: [linkedin.com/in/muhammad-umar-647859338](https://www.linkedin.com/in/muhammad-umar-647859338/)

(Direct email and phone contact details are included on the live site's
footer and Contact page, not reproduced here.)
