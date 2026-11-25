# SUN STAR — Theme, Security & Performance Review

## Delivered in this project

- Brand theme normalized to the supplied SUN STAR guide: **#0DA3CE**, **#076B8A**, **#FDC21E**, **#E0A800**, **#E6F6FB**, **#FFF6D6**, **#1E1E1E**, **#5F6B73**, **#E5E9EC**, **#F8FBFC**, **#FFFFFF**.
- New `src/styles/brand-accuracy.css` is loaded last from `src/main.jsx`. It adds a smoothly animated blue/ice/white mesh gradient, readable glass surfaces, mobile blur reductions, and reduced-motion fallback.
- Original pages, college datasets, photos and fee PDF are retained.
- Original six PNG homepage banners are retained. The carousel now requests optimized WebP duplicates: approximately **5.70 MB to 0.55 MB** combined, around **92% fewer banner-image bytes**, for browsers supporting WebP.
- Bangalore listing card images are lazy loaded.
- Deployment headers added in `vercel.json`: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`; caching for `/assets/` and `/documents/`.
- Browser theme color and favicon updated.

## Checks performed

- Original project validator passed: **71** Tamil Nadu institutions, **61** fee examples, intact **115-page** fee PDF and previews.
- **8** Bangalore entries remain.
- **37** JavaScript/JSX modules parsed successfully with Babel's parser.
- **10** CSS files parsed without syntax errors.
- Frontend source scan found no `dangerouslySetInnerHTML`, `eval` or `document.write` use.
- Git history, local `node_modules`, macOS Finder metadata and secret `.env` files are excluded from the distribution archive.

## Important limitations and deployment recommendations

- This is a **static React frontend**, not a database-backed backend. The enquiry form prepares a WhatsApp message; lead persistence and server-side spam protection are not added.
- **4× more traffic cannot be guaranteed** from source changes alone. Hosting/CDN bandwidth, concurrent users, cache hit rate, traffic profile and real load tests determine capacity. The smaller banner downloads and caching rules reduce transfer costs, but the 19 MB fee PDF and video remain large when accessed.
- A complete `npm run build`, browser visual/regression test and dependency `npm audit` **could not be completed in this offline environment**, because npm dependency installation timed out. Run `npm ci && npm run build && npm audit --omit=dev` on a connected development machine before publishing.
- Check Vercel (or other host) caching and HTTPS headers after deployment. Static headers in `vercel.json` apply to Vercel, not automatically to all hosts.
- Verify all college information and permission to reuse college/campus images before public release.
- Apply rate limits, spam filtering and strong admin authentication when you later connect a backend.

## How to run

```bash
npm install
npm run dev
```

For a deployable build:

```bash
npm run build
npm run preview
```

## Testing responsive layouts

Test in the browser at **320, 375, 430, 768, 1024 and 1440 CSS pixels**. Verify hero, carousel, all course lists, fee tables, Bangalore detail banners, AI counsellor (normal and expanded), enquiry form, navigation and floating contact buttons. Use Lighthouse or browser performance tools to compare before and after deployment.
