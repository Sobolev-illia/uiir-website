# UIIR corporate website — Next.js App Router

A bilingual, reusable corporate site starter for **Український міжнародний інститут відновлення (УМІВ / UIIR)**. The visual system is based on the supplied architectural references: warm off-white surfaces, black typography, restrained bronze accents, thin technical rules, oversized uppercase headings and image-led project presentation.

## Stack

- Next.js App Router
- JavaScript only (no TypeScript)
- CSS Modules (`page.module.css` and component modules)
- `i18next` + `react-i18next`
- `lottie-react` loader
- Next Metadata API for page-level SEO, canonical/hreflang, Open Graph and Twitter cards
- Server route example for contact-form validation

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The root route redirects to Ukrainian (`/uk`). English lives under `/en`.

For a production build:

```bash
npm run build
npm start
```

## Content architecture

Routes:

- `/uk` and `/en` — home
- `/[locale]/about` — About UIIR, specialized centers, founders/leadership placeholders, organizational structure, mission and vision
- `/[locale]/activities` — all activity areas
- `/[locale]/projects` — project index
- `/[locale]/projects/[slug]` — project detail and gallery
- `/[locale]/join` — membership / participation
- `/[locale]/documents` — document categories
- `/[locale]/contact` — contact details and proposal form
- `/api/contact` — validation-only POST example ready to connect to a provider

The original Ukrainian Markdown supplied for the project is preserved verbatim at `content/source-ua.md`. Site copy is organized in `locales/uk/common.json`; the English version is in `locales/en/common.json`.

## Brand customization

The main visual tokens are centralized at the top of `app/globals.css`:

```css
:root {
  --color-bg: #f0ede6;
  --color-surface: #f8f6f1;
  --color-ink: #151515;
  --color-accent: #b69a68;
  --font-sans: "Arial Narrow", "Helvetica Neue", Arial, sans-serif;
  --font-body: "Helvetica Neue", Arial, sans-serif;
}
```

Changing these variables reskins the site without touching individual components.

### Custom font

A commented `@font-face` template is already included in `app/globals.css`. Put licensed local font files under `public/fonts/` and enable that block, or wire a Google Font through `next/font/google` in `app/layout.js`.

## Logo

The supplied PNG logo is stored at:

`public/images/uiir-logo.png`

It is reused in the header, footer and loader fallback. Replace the file while keeping the path if you want to update the mark without changing code.

## Hero image or video

Edit `lib/siteConfig.js`:

```js
heroMedia: {
  type: "image", // change to "video"
  src: "/images/hero/your-image.jpg",
  poster: "/images/hero/video-poster.jpg",
  alt: "",
},
```

For video, set `type: "video"` and use a public MP4/WebM path for `src`. The component already renders autoplay, muted, looped and `playsInline` video.

## Project content and galleries

Project data is in `lib/projects.js`. Add project objects there or replace this file with a CMS/data source later. Each project supports:

- localized title
- localized long description
- year, location and category
- cover image
- a gallery array with 2–9 (or more) images

The reusable `components/Gallery.js` creates a responsive editorial grid. Clicking any image opens a full-screen lightbox; left/right arrow buttons and keyboard arrows navigate inside the same gallery, while Escape closes it.

Place real project photos under `public/images/projects/...` and update the paths. Placeholder SVGs are currently used so layout behavior is visible before photography is supplied.

## Team cards

`components/TeamCard.js` accepts:

```js
{
  name,
  position,
  description,
  image
}
```

The About page currently renders placeholders. Replace them with real team/founder data and photos when available.

## Lottie loading animation

Put the supplied/exported animation JSON at exactly:

`public/animations/logo-animation.json`

`components/SiteLoader.js` tries to load it automatically. If it does not exist yet, the supplied UIIR PNG logo is shown as a graceful fallback. Once the browser load event completes, the loader animates away and reveals the site.

## Contact form and endpoint

The form has client-side validation for:

- required name
- valid email format
- message minimum length
- consent checkbox
- honeypot spam field

`app/api/contact/route.js` repeats validation server-side and sanitizes/limits values. It intentionally **does not send or persist data yet**. Connect your mail/CRM/database provider in the marked TODO block. Keep provider secrets in server-only environment variables, never `NEXT_PUBLIC_*`.

Public contact display values can be configured with:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.example
NEXT_PUBLIC_CONTACT_EMAIL=office@example.org
NEXT_PUBLIC_CONTACT_PHONE=+380...
NEXT_PUBLIC_SOCIAL_URL=https://...
```

Copy `.env.example` to `.env.local` for local work.

## Documents

Put final PDFs or other downloadable files in `public/documents/`. The Documents page deliberately shows “file pending” until real files are provided. Once available, wrap the cards with links or add a `documents` data structure with filenames.

## SEO

Each route generates localized metadata with:

- title and description
- canonical URL
- `uk-UA`, `en`, and `x-default` language alternates
- Open Graph metadata
- Twitter large-image card
- default OG image at `public/og-default.png`

Project detail pages generate their own title, description and image metadata. The site also includes `sitemap.js`, `robots.js`, `manifest.js`, and Organization / CreativeWork structured data.

Before deployment, set `NEXT_PUBLIC_SITE_URL` to the canonical production origin.

## Motion and accessibility

- smooth scroll (respects `prefers-reduced-motion`)
- scroll-triggered reveal animation powered by `IntersectionObserver`
- hover/press microinteractions
- responsive mobile menu
- skip link
- keyboard-operable gallery (`Escape`, `←`, `→`)
- focusable semantic buttons/links and form validation messages

## Recommended next edits

1. Replace placeholder hero/project/team images.
2. Add `public/animations/logo-animation.json`.
3. Replace placeholder contact values in `.env.local` / hosting environment.
4. Add real founders and leadership data.
5. Add downloadable documents.
6. Connect `/api/contact` to your delivery/CRM provider.
7. Set the production domain and verify metadata in social preview tools.
