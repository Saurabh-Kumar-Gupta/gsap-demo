# Motion Lab

A dark, cinematic single-page demo of **GSAP 3** and **ScrollTrigger**. No bundler, no build step — open `index.html` or serve the folder.

## What it shows

1. **Hero** — word-by-word clip reveal, eyebrow, CTA, floating gradient orbs
2. **Reveal** — sticky, scrubbed character opacity for *Type that arrives*
3. **Pin** — four horizontal panels pinned with ScrollTrigger
4. **Cards** — staggered feature cards
5. **Outro** — two-line Instrument Serif closer

Navigation uses in-page anchors. `prefers-reduced-motion: reduce` skips timelines, pins, and loops, and leaves copy fully visible.

## Stack

- [GSAP 3.13](https://gsap.com/) + ScrollTrigger via jsDelivr
- [Instrument Sans](https://fonts.google.com/specimen/Instrument+Sans) and [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif)

## Run locally

```bash
# any static server
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

Or double-click `index.html` — CDN scripts need a network connection.

## Files

| File | Role |
| --- | --- |
| `index.html` | Markup and CDN hooks |
| `styles.css` | Layout, type, cinematic skin |
| `main.js` | Splitting, timelines, ScrollTrigger |
