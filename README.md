# Salman & Safa — Nikkah Invitation

A mobile-first animated wedding invitation (React + Vite + framer-motion).

Flow: **sealed envelope** (tap to open, starts the music) → **curtain intro** → **invitation details**.

## Edit the details

All names, dates, venues, contacts and the story live in **`src/data/wedding.js`** — that is the only file you need to change.

The link-preview text (WhatsApp / social) and the browser tab title are in **`index.html`** (top of `<head>`).
To regenerate the preview image `public/og.png` with new names (Windows):

```powershell
powershell -ExecutionPolicy Bypass -File scripts/make-og.ps1 -Names "Salman & Safa" -Date "SUNDAY, 20 DECEMBER 2026"
```

## Music

Put your nikkah song at **`public/music/nikkah.mp3`**.
If the file is missing or can't play, a soft synthesized Arabic-style melody plays instead.
Guests can pause / resume with the floating button at the bottom-right.

## Run locally

```bash
npm install
npm run dev
```

Tip: open `http://localhost:5173/?skip=1` to jump straight to the details page.

## Deploy (Vercel)

```bash
npx vercel --prod
```

Then share the production URL on WhatsApp.
