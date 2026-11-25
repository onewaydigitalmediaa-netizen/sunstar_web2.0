# SUN STAR — Reference design remake (React frontend)

This update recreates the **design language** of the supplied image across the existing SUN STAR website. It is not a replacement for the existing React project and does not remove college data or enquiry functionality.

## Main updates

- New `src/components/ReferenceHomeHero.jsx`: bright branded homepage hero, genuine SUN STAR student image, glass badges, working search, four grounded directory/service facts, service cards, three genuine college previews, and Tamil Nadu/Bangalore directory CTAs.
- `src/pages/Home.jsx`: new design-led hero and sections at the top; original homepage sections, FAQ, reviews, abroad section, impact demo, and original banner carousel retained further down.
- `src/styles/reference-remake.css`: extensive site-wide visual redesign—blue/cyan mesh gradients, yellow CTA buttons, frosted-glass UI, unified course/directory/enquiry styling, responsive tablet/mobile rules, and reduced-motion support.
- `src/main.jsx`: imports new CSS *after* the existing theme to ensure design overrides are applied.
- `design-reference/SUN-STAR-REFERENCE.png`: copy of the user-supplied design image used as the layout/color target.

## Exact brand palette

- Sky Blue: `#0DA3CE`
- Deep Blue: `#076B8A`
- Sunny Yellow: `#FDC21E`
- Light Blue: `#E6F6FB`
- White: `#FFFFFF`
- Ink: `#142C49` for readable text

## Running

Use Node.js 22 or newer:

```bash
npm install
npm run dev
npm run build
```

Open the local URL Vite prints (typically `http://localhost:5173`).

**Testing status:** JSX parsing/import resolution passed for 38 source modules; CSS parsing passed; existing dataset validator passed (71 colleges, 61 representative fee entries, 115 PDF page previews). A production build could not be completed in this environment: npm package installation was unavailable, and a preexisting dependency bundle was missing the platform-specific `@rollup/rollup-linux-x64-gnu` binary. Run `npm install` and `npm run build` on your own machine to fully verify. Visual matching was completed at the code/CSS design level, not by full browser screenshot diff.

## Data integrity

No Tamil Nadu or Bangalore institution records, fees, PDFs, counselling logic, or server code were intentionally removed. The animated impact statistics in the preexisting project remain clearly labeled **demo data**, not verified SUN STAR achievements.

## How to fine tune the visual match

Change the brand variables at the top of `src/styles/reference-remake.css`. The reference's desktop collage is not directly reused as a page screenshot; instead its design is implemented as responsive components with working navigation, search and link targets. Campus imagery is sourced from assets already present in the project.
