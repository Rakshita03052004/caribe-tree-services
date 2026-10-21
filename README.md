# Caribe Tree Services: Demo Website

A demo website for **Caribe Tree Services LLC**, a tree service company in Kissimmee, Florida. It's a single-page site in English and Spanish, made to show the owner what their business website could look like.

> **Demo content.** The business name, city and phone/WhatsApp number come from the public Google Maps listing. The reviews, before/after artwork, stats and other copy are sample content. Replace them before the site goes live.

## Features

- **English / Español toggle.** Switches the whole site, and remembers the choice.
- **Animated hero tree.** Drawn in code on a canvas: it grows when the page loads, then sways.
- **Storm section.** Animated rain, plus a hurricane-season countdown worked out from today's date.
- **Services as stacked cards.** Five services; the cards stack on each other as you scroll.
- **Before / after slider.** Works with mouse, touch or keyboard.
- **Free estimate form.** Four steps: service, tree size, timing, contact details.
- **Service area map** for Osceola County and the Orlando area, a **reviews marquee**, and an **FAQ**.
- **Contact buttons.** A floating WhatsApp button on desktop; Call and WhatsApp bars on mobile.
- **Design.** Apple-style layout and the system font stack. No icon libraries.

## Tech

Next.js 15 (App Router), React 19 and TypeScript. All styles are plain CSS in one file, `app/globals.css`. There are no UI or animation libraries.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Deploy

The site is meant for [Vercel](https://vercel.com):

1. Import this repo in Vercel.
2. Click **Deploy**. The default settings work.

Each push to `main` redeploys the site automatically.

## Project structure

```
app/
  layout.tsx       page metadata
  page.tsx         section order
  globals.css      all styles
components/        one file per section (Hero, Storm, BeforeAfter, Estimate, ...)
lib/
  site.ts          real business details (name, phone, WhatsApp)
  dict.ts          all English + Spanish copy
  i18n.tsx         language context
```

## Before going live

- [ ] Replace the sample reviews in `lib/dict.ts` with real Google reviews.
- [ ] Swap the before/after illustration for real job photos.
- [ ] Confirm the services, service area and claims (insurance, 24/7) with the owner.
- [ ] Connect the estimate form to email or SMS. In this demo it sends nothing.
- [ ] Remove the "Demo preview" bar and the demo note in the footer.
- [ ] Add a custom domain in Vercel.
