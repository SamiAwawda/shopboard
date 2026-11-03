---
version: alpha
name: "Walmart"
website: "https://www.walmart.com"
description: >-
  An American mass-market retail brand whose marketing site runs the Walmart Living Design System (LDS) — anchored on Walmart Blue (#0053e2) as the load-bearing action voltage and Spark Yellow (#ffc220) as the secondary "alt" CTA tone, both wired to a brand-bold navy (#001e60) for the nav band. Typography is EverydaySans, Walmart's proprietary metric clone of Helvetica Neue, used across nav, body, and tile chrome. The shape language pairs an 8px workhorse radius with a 9999px fully-rounded pill for category-tab "scrollers" and the search-bar input, while the bottom of the top nav carries the brand-bold navy strip with white-on-navy category links — a Walmart-only chrome move that no other US mass-market site applies at this saturation.

seo:
  title: "Walmart Design System: Walmart Blue and Spark Yellow"
  metaDescription: "Walmart's Living Design System: Walmart Blue #0053e2 for actions, Spark Yellow alt CTAs, a navy top nav and EverydaySans, for React and AI tools."
  highlights:
    - "Walmart Blue as primary action — #0053e2 wired into --ld-semantic-color-fill-brand and --ld-semantic-color-action-fill-primary, the load-bearing CTA fill across the Living Design System"
    - "Spark Yellow as alt-CTA — #ffc220 wired into --wcp-semantic-color-action-fill-primary-alt with text intentionally rendered in brand-bold navy #001e60 rather than white"
    - "Brand-bold navy top nav — #001e60 fills the persistent top-nav band with white text, while #002e99 carries the bottom-nav band for mobile app surfaces"
    - "EverydaySans across the system — Walmart ships a proprietary Helvetica Neue metric clone with no secondary display, serif, or monospace voice"
    - "Two-tier radius system — 8px on offer cards and tile grids; 9999px fully-rounded pill on the search input, category tabs, and bottom-nav buttons"
  tags:
    - "E-commerce & Retail"
  lastUpdated: "2026-05-19"
  author:
    name: "Dov Azencot"
    url: "https://x.com/dovazencot"
  opening: |
    Walmart's homepage opens with a persistent navy top-nav band (Walmart brand-bold #001e60) carrying white "Pickup or delivery?", a full-width search bar, and the right-aligned utility cluster (Reorder, Sign In, Cart) — and below that a secondary navy strip with white category links (Departments, Memorial Day, Get it Fast, Pharmacy, New Arrivals, Father's Day, Graduation, Meals Made Easy, My Items, Only at Walmart, Walmart+). The above-fold canvas alternates between hero offer tiles ("Savings on fashion", "Find relief for aches & pains") at 8px corners on cream-and-color backdrops, with the yellow "Flash Deals" badge as the only spark moment in the captured frame. Where Target paints the hero in a single saturated red and Nordstrom commits to one editorial photograph, Walmart anchors on a navy chrome band and lets the tile grid below it carry seasonal merchandise photography on tinted product-color backgrounds.
    
    The DESIGN.md file packages the system into a machine-readable spec for React and AI coding tools. Inside: 15 color tokens drawn from the Walmart Living Design System (LDS) tokens exposed under the `--ld-*` and `--wcp-*` CSS custom-property prefixes — Walmart Blue brand voltage, the Spark Yellow alt-CTA tier, brand-bold navy for chrome bands, charcoal ink for body chrome, and a small set of semantic colors for confidence (info-blue), urgency, and savings signals. 12 typography tokens run EverydaySans — Walmart's proprietary face shipped with Helvetica Neue / Helvetica / Arial fallbacks. 18 components cover the navy top-nav band, the secondary nav strip, the Walmart-Blue primary CTA, the Spark Yellow alt CTA, the search-input pill, the 8px offer tile, the category-scroller pill tab, and the bottom-nav fill (mobile shelf).

    Feed this file to Claude or Cursor and it will reproduce Walmart's specific moves: navy brand-bold top-nav band with white category links, two-tier action voltage (blue primary, yellow alt), EverydaySans across the chrome, and the binary radius split between 8px tile rounding and 9999px pill on every tappable input. The tokens resolve cleanly without invention. Treat it as a reference: the move worth borrowing only if you have the brand permission Walmart has is the two-tier CTA — letting a saturated blue carry the primary action while a yellow spark carries the savings-emphasis CTA, with intentional text-on-yellow rendered in brand-bold navy rather than white.
  related:
    - href: "/design"
      title: "Browse all design systems"
      description: "The full directory of DESIGN.md files on shadcn.io, with live mockups for each."
    - href: "https://www.walmart.com"
      title: "Walmart — official site"
      description: "Walmart's public marketing site — the source of truth for the live tokens captured in this file."
    - href: "https://github.com/google-labs-code/design.md"
      title: "The DESIGN.md specification"
      description: "Google Labs' open spec for machine-readable design system files — the format this page is built on."
  questions:
    - id: "primary-color"
      title: "What is Walmart's primary brand color?"
      answer: "Walmart's action voltage is Walmart Blue (#0053e2) — wired into the Living Design System as --ld-semantic-color-fill-brand, --ld-semantic-color-action-fill-primary, --ld-semantic-color-border-brand, and --ld-semantic-color-text-brand. It is the load-bearing fill for every primary CTA. The brand-bold navy (#001e60) is the chrome companion, wired as --ld-semantic-color-fill-brand-bold and --ld-primitive-color-blue-160, carrying the top-nav band fill and the brand-text-bold token. The Spark Yellow (#ffc220), wired as --wcp-semantic-color-action-fill-primary-alt and --ld-semantic-color-fill-accent-spark, is the secondary alt-CTA used for savings and Flash Deals callouts — with text intentionally rendered in brand-bold navy rather than white, since yellow-on-yellow contrast requires the deeper companion."
    - id: "typography"
      title: "What typeface does Walmart use, and what should I use as a substitute?"
      answer: "Walmart's marketing site runs EverydaySans — a proprietary face shipped with the fallback chain `EverydaySans, \"Helvetica Neue\", Helvetica, Arial, sans-serif`. The face is Walmart's metric clone of Helvetica Neue, commissioned for brand consistency across digital and in-store signage. Typography uses weight 400 for body and weight 700 for nav links, button labels, headings, and savings flags. Display headlines run at 16-18px / 700 in the captured frame (the homepage is tile-heavy and does not carry a 38px-plus hero display moment the way Target's does). The closest open-source substitute is Inter at the same weights, or Roboto for a closer metric match to the Helvetica Neue fallback chain."
    - id: "navy-nav"
      title: "Why does Walmart use a navy top-nav band when most retailers use white?"
      answer: "Walmart's persistent top-nav band is filled with brand-bold navy (#001e60) carrying white text, and the second strip beneath it (the categories nav) is filled with a slightly lighter blue (#002e99, wired as --wcp-semantic-color-bottom-nav-fill-brand) also carrying white text. The double-band chrome creates a navy 'walmart shelf' header that no other US mass-market retailer applies at this saturation. The decision keeps the brand voltage permanently visible regardless of where the customer is in the page scroll, and lets the body floor below it remain pure white so the merchandise photography and Spark Yellow savings callouts can read as the loudest moments. Target uses a white top-nav with a thin red utility strip; Walmart inverts the convention."
    - id: "cta-shape"
      title: "Why does Walmart use a fully-rounded pill on the search bar and category tabs?"
      answer: "The Walmart Living Design System uses a binary radius scale: 8px for content surfaces (offer tiles, product cards, savings cards) and 9999px fully-rounded pill for inputs and category-scroller tabs (the search bar, the 'Is this the right location?' confirm pill, the category-scroller chips in the navy strip). The pill treatment echoes the lowercase 'walmart' wordmark's rounded letterforms, and gives the search bar — which is the primary action on the homepage for most users — the warmest, most-tappable shape in the system. Primary CTA buttons sit at 32px corners (close to a pill at 40-44px button heights), splitting the difference between Target's 999px and a flat rectangle."
    - id: "use-in-project"
      title: "Can I use this DESIGN.md to build my own React mass-market retail site?"
      answer: "Yes — the file is designed to be fed into Claude, Cursor, or any AI tool that reads structured design tokens. The agent will reproduce Walmart's specific moves: navy brand-bold top-nav band with white category links, two-tier CTA voltage (Walmart Blue primary, Spark Yellow alt with brand-bold-navy text), 8px offer-tile rounding, and the fully-rounded pill on the search input. The tokens resolve cleanly to the LDS variable names that Walmart's own engineers reference. The one move worth borrowing only if you have the brand permission is the two-tier action voltage; on most sites, putting both a blue CTA and a yellow CTA on the same surface reads as a brand-tone conflict rather than as a savings-emphasis hierarchy."

mockups:
  - "marketing-hero"
  - "media-grid"

colors:
  primary: "#0053e2"
  primary-hover: "#114ab6"
  primary-pressed: "#002e99"
  brand-bold: "#001e60"
  brand-max: "#002d58"
  spark: "#ffc220"
  spark-hover: "#ffc836"
  spark-pressed: "#e6a31d"
  ink: "#2e2f32"
  ink-deep: "#000000"
  canvas: "#ffffff"
  surface-subtle: "#e3e4e5"
  surface-brand-subtle: "#e6f1fc"
  brand-subtle: "#e9f1fe"
  text-subdued: "#767676"
  link-legacy: "#0000ee"

typography:
  display-md:
    fontFamily: "EverydaySans, \"Helvetica Neue\", Helvetica, Arial, sans-serif"
    fontSize: 24px
    fontWeight: 700
    lineHeight: 28px
    letterSpacing: 0
  heading-lg:
    fontFamily: "EverydaySans, \"Helvetica Neue\", Helvetica, Arial, sans-serif"
    fontSize: 20px
    fontWeight: 700
    lineHeight: 24px
    letterSpacing: 0
  heading-md:
    fontFamily: "EverydaySans, \"Helvetica Neue\", Helvetica, Arial, sans-serif"
    fontSize: 18px
    fontWeight: 700
    lineHeight: 24px
    letterSpacing: 0
  body-lg:
    fontFamily: "EverydaySans, \"Helvetica Neue\", Helvetica, Arial, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 24px
    letterSpacing: 0
  body-bold:
    fontFamily: "EverydaySans, \"Helvetica Neue\", Helvetica, Arial, sans-serif"
    fontSize: 16px
    fontWeight: 700
    lineHeight: 24px
    letterSpacing: 0
  body-md:
    fontFamily: "EverydaySans, \"Helvetica Neue\", Helvetica, Arial, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 20px
    letterSpacing: 0
  label-md:
    fontFamily: "EverydaySans, \"Helvetica Neue\", Helvetica, Arial, sans-serif"
    fontSize: 14px
    fontWeight: 700
    lineHeight: 17.5px
    letterSpacing: 0
  label-sm:
    fontFamily: "EverydaySans, \"Helvetica Neue\", Helvetica, Arial, sans-serif"
    fontSize: 14px
    fontWeight: 700
    lineHeight: 15.4px
    letterSpacing: 0
  caption:
    fontFamily: "EverydaySans, \"Helvetica Neue\", Helvetica, Arial, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 16px
    letterSpacing: 0
  nav-link:
    fontFamily: "EverydaySans, \"Helvetica Neue\", Helvetica, Arial, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 20px
    letterSpacing: 0
  nav-utility:
    fontFamily: "EverydaySans, \"Helvetica Neue\", Helvetica, Arial, sans-serif"
    fontSize: 14px
    fontWeight: 700
    lineHeight: 17.5px
    letterSpacing: 0
  button-md:
    fontFamily: "EverydaySans, \"Helvetica Neue\", Helvetica, Arial, sans-serif"
    fontSize: 16px
    fontWeight: 700
    lineHeight: 24px
    letterSpacing: 0

rounded:
  none: "0px"
  sm: "4px"
  md: "8px"
  lg: "32px"
  pill: "100px"
  full: "9999px"

spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  base: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "64px"

components:
  top-nav:
    backgroundColor: "{colors.brand-bold}"
    textColor: "{colors.canvas}"
    typography: "{typography.nav-utility}"
    rounded: "{rounded.none}"
    padding: "12px 24px"
    height: "56px"
  category-nav:
    backgroundColor: "{colors.primary-pressed}"
    textColor: "{colors.canvas}"
    typography: "{typography.nav-link}"
    rounded: "{rounded.none}"
    padding: "8px 24px"
    height: "44px"
  nav-link:
    backgroundColor: transparent
    textColor: "{colors.canvas}"
    typography: "{typography.nav-link}"
    rounded: "{rounded.lg}"
    padding: "4px 16px 4px 12px"
    height: "52px"
  search-input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-lg}"
    rounded: "{rounded.full}"
    padding: "0px 24px"
    height: "48px"
  search-submit:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.canvas}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    padding: "0"
    height: "40px"
  location-pill:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-bold}"
    rounded: "{rounded.full}"
    padding: "6px 12px"
    height: "40px"
    borderColor: "{colors.primary}"
  hero-heading:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.display-md}"
  section-heading:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.heading-lg}"
  body-paragraph:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.body-lg}"
  body-paragraph-muted:
    backgroundColor: transparent
    textColor: "{colors.text-subdued}"
    typography: "{typography.body-md}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.canvas}"
    typography: "{typography.button-md}"
    rounded: "{rounded.lg}"
    padding: "0px 24px"
    height: "44px"
    border: "0"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.canvas}"
    typography: "{typography.button-md}"
    rounded: "{rounded.lg}"
    padding: "0px 24px"
    height: "44px"
  button-spark:
    backgroundColor: "{colors.spark}"
    textColor: "{colors.brand-bold}"
    typography: "{typography.button-md}"
    rounded: "{rounded.lg}"
    padding: "0px 24px"
    height: "44px"
    border: "0"
  button-spark-hover:
    backgroundColor: "{colors.spark-hover}"
    textColor: "{colors.brand-bold}"
    typography: "{typography.button-md}"
    rounded: "{rounded.lg}"
    padding: "0px 24px"
    height: "44px"
  button-secondary:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.lg}"
    padding: "0px 24px"
    height: "44px"
    borderColor: "{colors.primary}"
  card-offer:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-lg}"
    rounded: "{rounded.md}"
    padding: "16px"
    borderColor: "{colors.surface-subtle}"
  card-spark:
    backgroundColor: "{colors.spark}"
    textColor: "{colors.brand-bold}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
  badge-flash-deals:
    backgroundColor: "{colors.spark}"
    textColor: "{colors.brand-bold}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: "4px 8px"
  link-shop-now:
    backgroundColor: transparent
    textColor: "{colors.primary}"
    typography: "{typography.body-bold}"
  footer:
    backgroundColor: "{colors.brand-bold}"
    textColor: "{colors.canvas}"
    typography: "{typography.body-md}"
    padding: "32px 24px"
---

## Overview

Walmart's marketing chrome does what no other US mass-market retailer does at the same saturation. **Double-navy nav band.** The persistent top of every page carries two stacked dark-blue strips: the brand-bold navy (`{colors.brand-bold}` — #001e60) wired as `--ld-semantic-color-fill-brand-bold` runs the utility band with white "Pickup or delivery?" + the full-width search input + the right-aligned Reorder/Sign In/Cart cluster, and a second strip just beneath it at the pressed-state navy (`{colors.primary-pressed}` — #002e99, wired as `--wcp-semantic-color-bottom-nav-fill-brand`) carries the white category links (Departments, Memorial Day, Pharmacy, New Arrivals, Father's Day, Graduation, Meals Made Easy, Walmart+). Where Target uses a thin red utility strip atop a white nav, and Nordstrom uses a single white nav with charcoal text, Walmart commits to a 100px-tall navy header that stays present at every scroll position — a visual shelf-edge that anchors the page in brand voltage from the top.

The CTA system runs on **two-tier action voltage**. Walmart Blue (`{colors.primary}` — #0053e2) is the load-bearing primary action — wired as `--ld-semantic-color-fill-brand`, `--ld-semantic-color-action-fill-primary`, `--ld-semantic-color-border-brand`. Spark Yellow (`{colors.spark}` — #ffc220) is the secondary alt-CTA — wired as `--wcp-semantic-color-action-fill-primary-alt` and `--ld-semantic-color-fill-accent-spark`. The yellow is the brand's "savings" signal — it appears on Flash Deals badges, Walmart+ membership callouts, and rollback price tags. Critically, the text on the Spark Yellow CTA is rendered in brand-bold navy (`{colors.brand-bold}`, via `--wcp-semantic-color-action-text-on-fill-primary-alt`), not in white — the yellow-and-white contrast is too low to meet AA, so the LDS pairs every yellow surface with a deep-navy text token by default. This pairing is the system's signature accessibility-design move.

Typography is **EverydaySans monoculture** — a proprietary face shipped with the fallback chain `EverydaySans, "Helvetica Neue", Helvetica, Arial, sans-serif`. EverydaySans is Walmart's commissioned metric clone of Helvetica Neue, designed for brand ownership across digital and in-store signage. Weight 400 carries body and longer copy; weight 700 carries every nav link, button, heading, and savings flag. There is no second display family, no serif, no monospace voice.

**Key Characteristics:**
- Walmart Blue (`{colors.primary}` — #0053e2) is the primary action voltage — wired across `--ld-semantic-color-fill-brand`, `--ld-semantic-color-action-fill-primary`, `--ld-semantic-color-border-brand`, `--ld-semantic-color-text-brand`. The single load-bearing CTA fill.
- Spark Yellow (`{colors.spark}` — #ffc220) is the alt-CTA / savings voltage — wired as `--wcp-semantic-color-action-fill-primary-alt`. Text on yellow renders in brand-bold navy, never white.
- Brand-bold navy (`{colors.brand-bold}` — #001e60) carries the top-nav band fill, the brand-text-bold token, and the footer surface. Frequency 53 captured.
- Pressed-state navy (`{colors.primary-pressed}` — #002e99, `--wcp-semantic-color-bottom-nav-fill-brand`) carries the secondary category-nav strip beneath the utility band.
- EverydaySans across 12 size steps with binary weights (400 body / 700 everything else). No middle weight, no second family.
- Two-tier radius scale: `{rounded.md}` 8px on offer cards and tile grids (frequency 32); `{rounded.full}` 9999px and `{rounded.pill}` 100px on the search input, location confirm pill, and category scrollers (frequency 13 / 3).
- Charcoal ink (`{colors.ink}` — #2e2f32) for body chrome and headings — wired as `--ld-semantic-color-input-border-activated-hovered` and `--ld-semantic-color-action-text-on-fill-secondary-hovered`. Never pure black for body text.
- Brand-subtle surface (`{colors.brand-subtle}` — #e9f1fe, `--ld-semantic-color-fill-brand-subtle`) for the focused/hovered states on filter chips and the confidence-message backgrounds.

## Colors

### Brand

- **Walmart Blue** (`{colors.primary}` — #0053e2): the load-bearing primary action voltage. Wired across `--ld-semantic-color-action-fill-primary`, `--ld-semantic-color-fill-brand`, `--ld-semantic-color-border-brand`, `--ld-semantic-color-text-brand`, and `--color-core-blue-100`. Every primary CTA fill, the "Shop now" inline links, the search-submit button, the focused-input border, and the filter-chip border-activated state.
- **Primary Hover** (`{colors.primary-hover}` — #114ab6): the hover/focus state on primary CTAs. Wired as `--ld-semantic-color-action-fill-primary-hovered` and `--ld-semantic-color-action-fill-primary-focused`. A step deeper into navy.
- **Primary Pressed** (`{colors.primary-pressed}` — #002e99): frequency 2 — the pressed-state navy. Wired as `--ld-semantic-color-action-fill-primary-pressed` and `--wcp-semantic-color-bottom-nav-fill-brand`. Carries the secondary category-nav band fill below the brand-bold utility band.
- **Brand Bold** (`{colors.brand-bold}` — #001e60): frequency 53 — used as text (27), border (25), background (1). The chrome companion to Walmart Blue, wired as `--ld-semantic-color-fill-brand-bold`, `--ld-semantic-color-text-brand-bold`, `--ld-semantic-color-border-brand-bold`, and `--color-core-blue-160`. Carries the top-nav band fill, the text-on-yellow-CTA token, and the footer surface.
- **Brand Max** (`{colors.brand-max}` — #002d58): the deepest navy tier. Wired as `--color-primary-max`. Used only on the most contrast-intense brand-coded text surfaces.

### Spark

- **Spark Yellow** (`{colors.spark}` — #ffc220): the alt-CTA / savings voltage. Wired as `--wcp-semantic-color-action-fill-primary-alt`, `--ld-semantic-color-fill-accent-spark`, `--ld-semantic-color-fill-warning`, `--wcp-semantic-color-rating-fill-activated`, and `--color-core-spark-100`. The yellow that appears on Flash Deals badges, Walmart+ callouts, rollback flags, and review-star fills. Always paired with brand-bold-navy text, never white.
- **Spark Hover** (`{colors.spark-hover}` — #ffc836): the hover-state lighter spark. Wired as `--wcp-semantic-color-action-fill-primary-alt-hovered` and `--color-core-spark-90`. One step lighter.
- **Spark Pressed** (`{colors.spark-pressed}` — #e6a31d): the pressed-state deeper spark. Wired as `--wcp-semantic-color-action-fill-primary-alt-pressed` and `--color-core-spark-110`. A step deeper into amber.

### Ink

- **Ink** (`{colors.ink}` — #2e2f32): frequency 2 — text (1), border (1). The charcoal chrome text color, wired as `--ld-semantic-color-input-border-activated-hovered`, `--ld-semantic-color-action-border-secondary`, and `--ld-semantic-color-action-text-on-fill-secondary-hovered`. Body text and section headings on the white floor.
- **Ink Deep** (`{colors.ink-deep}` — #000000): frequency 328 — text (159), border (163). Reserved for `--ld-semantic-color-action-border-transparent-focused`, `--ld-semantic-color-action-fill-transparent-focused`, and the `--color-core-transparent` token base. The high captured frequency reflects the LDS's heavy use of transparent-state borders that resolve to #000000 on the page.
- **Text Subdued** (`{colors.text-subdued}` — #767676): secondary metadata, "Shop now" sub-labels, footer copy. Wired as `--ld-semantic-color-text-accent-gray`, `--ld-semantic-color-fill-accent-gray`, and `--ld-semantic-color-bottom-nav-text-on-fill-hovered`.

### Surface

- **Canvas** (`{colors.canvas}` — #ffffff): frequency 138 — text (51), background (40), border (47). The body floor below the navy nav. Pure white — Walmart does not soften it.
- **Surface Subtle** (`{colors.surface-subtle}` — #e3e4e5): frequency 2 — the disabled-input background and the bottom-nav separator. Wired as `--ld-semantic-color-loading-subtle`, `--ld-semantic-color-action-fill-tertiary-pressed`, and `--ld-semantic-color-bottom-nav-separator`.
- **Surface Brand Subtle** (`{colors.surface-brand-subtle}` — #e6f1fc): frequency 7 — text (1), background (4), border (2). The brand-tinted background for filter chips in active/focus states. Wired as `--wcp-semantic-color-fill-confidence-subtle`, `--ld-semantic-color-page-nav-fill-activated`, and `--ld-semantic-color-page-nav-fill-focused`.
- **Brand Subtle** (`{colors.brand-subtle}` — #e9f1fe): the soft brand-tinted background wired as `--ld-semantic-color-fill-brand-subtle` and `--ld-semantic-color-surface-brand`. Carries the confidence-message backgrounds and the brand-subtle button-fill resting state.

### Semantic

- **Link Legacy** (`{colors.link-legacy}` — #0000ee): frequency 10 — text (5), border (5). The browser-default link color, surfaced on a handful of legacy inline links that have not yet been migrated to the LDS brand-text token. Not a brand token — a fallback artefact.

## Typography

### Font Family

The system runs **EverydaySans** for every typographic surface — Walmart's proprietary face shipped via WOFF with the fallback chain `EverydaySans, "Helvetica Neue", Helvetica, Arial, sans-serif`. EverydaySans is a metric clone of Helvetica Neue commissioned for brand consistency between digital surfaces and in-store signage. The fallback chain is a safety net for the custom font's failed-load case. There is no secondary serif, no display family, no monospace voice.

### Hierarchy

| Token | Size | Weight | Line Height | Use |
|---|---|---|---|---|
| `{typography.display-md}` | 24px | 700 | 28px | Page-level display moments (section headers on landing tiles) |
| `{typography.heading-lg}` | 20px | 700 | 24px | Category-shelf headings ("Summer essentials", "Top picks for you") |
| `{typography.heading-md}` | 18px | 700 | 24px | Tile titles, modal headings |
| `{typography.body-lg}` | 16px | 400 | 24px | Default running text in tiles and tile copy |
| `{typography.body-bold}` | 16px | 700 | 24px | "Shop now" inline links, button labels in 16px tier |
| `{typography.body-md}` | 14px | 400 | 20px | Secondary tile metadata, descriptive copy |
| `{typography.label-md}` | 14px | 700 | 17.5px | Savings flags, Flash Deals labels |
| `{typography.label-sm}` | 14px | 700 | 15.4px | Compact tile labels, badge captions |
| `{typography.caption}` | 12px | 400 | 16px | Fine print, footnotes, legal disclosures |
| `{typography.nav-link}` | 14px | 400 | 20px | Category-nav links in the white-on-navy second band |
| `{typography.nav-utility}` | 14px | 700 | 17.5px | Top-nav utility labels (Reorder, Sign In, Cart) |
| `{typography.button-md}` | 16px | 700 | 24px | Primary and Spark CTA button labels |

### Principles

Weight contrast is binary: 400 for prose, 700 for everything tappable or scannable. There is no 500/600 middle tier. The captured frame does not expose a 38px-plus hero display moment the way Target's does — Walmart's homepage is tile-heavy rather than display-led, and the typographic "loudest moment" sits at 24px display in the rare landing-band heading. Letter-spacing is uniformly normal; there is no tight tracking on display.

### Note on Font Substitutes

EverydaySans is proprietary. The closest open-source substitute is **Inter** at the same weights — the x-height and counter widths transfer cleanly. For a closer metric match to the Helvetica Neue fallback that the stack will reach if the custom font fails, **Roboto** at weight 700 is the safer substitute. **Arial** at weight 700 reproduces the final fallback exactly — useful for testing the Walmart system's graceful-degradation behavior.

## Layout

### Spacing System

- **Base unit:** 4px. The dominant offer-tile padding is 6×12px (frequency 13 in the captured frame).
- **Tokens:** `{spacing.xs}` 4px · `{spacing.sm}` 8px · `{spacing.md}` 12px · `{spacing.base}` 16px · `{spacing.lg}` 24px · `{spacing.xl}` 32px · `{spacing.2xl}` 48px · `{spacing.3xl}` 64px.
- **Top-nav padding:** 12×24px vertical/horizontal; the navy band sits at ~56px height with the search input centered.
- **Category-nav padding:** 8×24px; the secondary navy band sits at ~44px height.
- **Card internal padding:** `{spacing.base}` (16px) on offer tiles, `{spacing.md}` (12px) on smaller savings badges.

### Grid & Container

- **Max content width:** ~1280px on the offer-tile grids below the navy nav band; the nav bands themselves run full-bleed edge-to-edge.
- **Nav bands:** stacked full-bleed — the brand-bold navy utility band on top, the pressed-state navy category strip beneath. Together ~100px tall.
- **Hero offer-tile grid:** 2-column at desktop ("Savings on fashion", "Find relief for aches & pains") with full-bleed product photography on tinted-color backgrounds.
- **Below-fold rows:** 4-up and 6-up tile grids with savings labels, product thumbnails, and price strings stacked vertically.

### Rhythm

The page's rhythm is **navy header + tile shelves**. The persistent navy nav band sets the tempo, and the body below is a stack of horizontal product shelves — each anchored on a heading and a horizontal scroll of product tiles, separated by 24-32px vertical gaps. The cadence is less editorial than Nordstrom's photograph-inventory-photograph and tighter than Target's offer-band-campaign-tile alternation — Walmart prioritizes inventory density over visual breathing.

## Elevation

The system has essentially **no shadow tier** on the captured marketing chrome.

- **Flat (no shadow):** body, nav, offer tiles, savings cards — 99% of surfaces.
- **Hairline outlines:** `{colors.surface-subtle}` (#e3e4e5) on disabled controls and the bottom-nav separator.
- **Tonal lift:** the navy nav bands sit at `{colors.brand-bold}` and `{colors.primary-pressed}` against the white body floor — the deep-saturation gap reads as elevation without a drawn shadow.
- **Focus indicators:** the focused-input border thickens to `{colors.primary}` (#0053e2) at 2px — wired as `--ld-semantic-color-field-border-magic` and `--ld-semantic-color-filter-border-activated-hovered`. The system uses border-color shift rather than a soft glow.

## Shapes

The radius scale is **mixed**, with two distinct surface tiers:

- `{rounded.none}` 0px — the full-bleed nav bands, hero offer-tile backgrounds (square tiles).
- `{rounded.sm}` 4px (frequency 12) — small chips, secondary badges, savings flags.
- `{rounded.md}` 8px (frequency 32) — the dominant content-surface radius. Offer cards, product cards, savings badges, modal corners.
- `{rounded.lg}` 32px (frequency 4) — the primary CTA buttons and nav-link rounded-pill states (a 32px radius on a 44-52px-tall surface reads as fully rounded).
- `{rounded.pill}` 100px (frequency 3) — the category-scroller chip pills.
- `{rounded.full}` 9999px (frequency 13) — the search-input field and the location-confirm pill (`"Is this the right location?"`). The fully-rounded pill is reserved for input surfaces.

The split is intentional: the search input is the warmest, most-tappable surface in the system and gets the full pill; content cards get the workhorse 8px rounding; primary CTAs sit at 32px (close to pill at button height).

## Components

**`top-nav`** — Brand-bold navy `{colors.brand-bold}` (#001e60) fill, white text, 56px height, 12×24px padding. Houses the spark-yellow Walmart sun-logo flush left, the "Pickup or delivery?" address pill, the full-width search input, and the right-aligned Reorder / Sign In / Cart utility cluster.

**`category-nav`** — Pressed-state navy `{colors.primary-pressed}` (#002e99) fill, white text, 44px height. The secondary persistent strip beneath the top-nav band, carrying the category links (Departments, Memorial Day, Pharmacy, New Arrivals, Father's Day, Graduation, Meals Made Easy, My Items, Only at Walmart, Walmart+, More). Wired as `--wcp-semantic-color-bottom-nav-fill-brand`.

**`nav-link`** — Transparent fill on the navy strips, white text in `{typography.nav-link}` (14px / 400), 4×16×4×12px padding, 52px height. The hover state applies a 32px rounded pill background at white-low-alpha.

**`search-input`** — White `{colors.canvas}` fill, ink text, `{rounded.full}` 9999px corners, 0×24px padding, 48px height. The system's most-tappable surface — fully-rounded pill, dominating the top-nav band.

**`search-submit`** — Walmart Blue `{colors.primary}` fill, white search-glass icon, `{rounded.full}` 9999px corners, 40px height. The blue circle anchored to the right edge of the search input — the primary brand-voltage moment in the persistent nav.

**`location-pill`** — White `{colors.canvas}` fill, ink text, 1px `{colors.primary}` border, `{rounded.full}` 9999px corners, 6×12px padding, 40px height. The "Is this the right location?" confirm pill that floats over the Departments menu.

**`hero-heading`** — Ink `{colors.ink}` text at `{typography.display-md}` (24px / 700). The largest typographic moment on the captured frame.

**`section-heading`** — Ink text at `{typography.heading-lg}` (20px / 700). The shelf headings above each product-tile row.

**`body-paragraph`** — Default ink running-text at `{typography.body-lg}` — the workhorse paragraph in tile copy.

**`body-paragraph-muted`** — Text-subdued `{colors.text-subdued}` (#767676) variant at `{typography.body-md}` for secondary metadata.

**`button-primary`** — The signature CTA. Walmart Blue `{colors.primary}` fill, white text, `{rounded.lg}` 32px corners (renders as fully-rounded on the 44px button height), 0×24px padding, 44px height, weight 700. No border. "Shop now" inline CTAs and the primary checkout flow.

**`button-primary-hover`** — Background deepens to `{colors.primary-hover}` (#114ab6). Same dimensions as the resting state.

**`button-spark`** — Spark Yellow `{colors.spark}` (#ffc220) fill, brand-bold navy `{colors.brand-bold}` text, `{rounded.lg}` 32px corners, 0×24px padding, 44px height, weight 700. The alt-CTA — Flash Deals, Walmart+ membership, rollback callouts. The yellow-on-navy text pairing is the system's accessibility-design move; yellow-on-white would fail AA contrast.

**`button-spark-hover`** — Background lifts to `{colors.spark-hover}` (#ffc836) — a step lighter, not darker. The hover-direction reverses the Walmart Blue's deepen-on-hover convention.

**`button-secondary`** — White `{colors.canvas}` fill, Walmart Blue text, 1px Walmart Blue border, `{rounded.lg}` 32px corners. Used for tertiary actions that need to signal brand affiliation without claiming primary-action voltage.

**`card-offer`** — White `{colors.canvas}` surface, ink text, 1px `{colors.surface-subtle}` border, `{rounded.md}` 8px corners, 16px padding. The default offer-tile that carries product imagery + savings label + price.

**`card-spark`** — Spark Yellow `{colors.spark}` fill, brand-bold navy text, `{rounded.md}` 8px corners, 8×12px padding. The savings-emphasis card for Flash Deals callouts.

**`badge-flash-deals`** — The compact Spark Yellow flag that overlays offer tiles. Yellow fill, brand-bold navy text in `{typography.label-md}`, `{rounded.md}` 8px corners, 4×8px padding. Visible in the captured frame as the "Flash Deals" badge on the dress/fashion tile.

**`link-shop-now`** — Walmart Blue `{colors.primary}` text at `{typography.body-bold}`, no fill or border. The default inline-link treatment beneath every offer tile ("Shop now").

**`footer`** — Brand-bold navy `{colors.brand-bold}` (#001e60) surface, white text, 32×24px padding. The mega-footer carries the brand voltage from the top of the page through to the bottom — a chrome continuity move that Walmart applies more aggressively than any other US mass-market retailer.

## Do's and Don'ts

**Do** keep the top-nav band filled with brand-bold navy `{colors.brand-bold}` (#001e60) and the secondary category strip filled with pressed-state navy `{colors.primary-pressed}` (#002e99). The double-navy chrome is the system's most distinctive structural move — replacing either strip with white loses the shelf-edge effect.

**Do** render Spark Yellow `{colors.spark}` CTA text in brand-bold navy `{colors.brand-bold}`, never white. The yellow-on-white pairing fails WCAG AA contrast; the LDS pairs yellow surfaces with a deep-navy text token by default and the discipline must be preserved.

**Do** use the binary radius split — `{rounded.md}` 8px on content surfaces, `{rounded.full}` 9999px on input surfaces. The search input is the warmest, most-tappable element on the page; rounding it to 8px reads as a generic form field rather than as the brand's primary affordance.

**Do** treat Walmart Blue `{colors.primary}` as the primary action voltage and Spark Yellow `{colors.spark}` as the alt voltage — never the inverse. The blue carries Add to Cart, Shop Now, Sign In; the yellow carries Flash Deals, Walmart+, rollback savings. Switching the semantics breaks every customer's learned affordance.

**Don't** use `{colors.brand-bold}` (#001e60) for primary CTAs. It is the chrome-and-text companion to Walmart Blue, not a stand-in for it; primary actions use `{colors.primary}` (#0053e2) instead.

**Don't** introduce a third action voltage. The system is two-tier — blue primary, yellow alt. Adding a red or green CTA reads as borrowed from another retailer's palette and dilutes the savings-vs-cart semantic.

**Don't** soften `{colors.canvas}` (#ffffff) to a cream below the navy nav. The contrast between the deep navy header and the bright-white body floor is the page's primary structural device; tinting the canvas warms the page in a way that conflicts with the navy chrome's signal of inventory directness.

**Don't** use the legacy `{colors.link-legacy}` (#0000ee) anywhere new. It is a fallback artefact on a handful of unmigrated links; new inline links use `{colors.primary}` via the LDS `--ld-semantic-color-text-brand` token.

## Known Gaps

- **Hero typography:** Walmart's homepage does not currently expose a 38px-plus display hero moment the way Target's "HELLO SUMMER SAVINGS" does. The captured display tier sits at 24/700; larger seasonal banners exist on category landing pages but are not represented here.
- **Bot block:** the extraction triggered Walmart's Akamai bot-protection "Press & hold" CAPTCHA, so the captured screenshot shows the challenge overlay rather than the full homepage tile grid. Token data was recovered from the LDS CSS custom-property exposure even with the overlay visible. The component descriptions above were composed from public knowledge of the Walmart marketing chrome.
- **Hover and focus states:** documented for `{component.button-primary-hover}` and `{component.button-spark-hover}`; the full LDS state matrix (focused, pressed, disabled, error) lives in the `--ld-semantic-color-action-*` token family but is not exercised across every component above.
- **Dark mode:** the captured surface is light-only. The LDS exposes `--ld-semantic-color-surface-overlay-inverse` and a handful of inverse tokens but no full dark-mode primary surface is rendered on the marketing site.
- **Motion:** the offer-tile grid animates on scroll-into-view and the search-input expands on focus; the spec captures end-state values only. Easing curves and durations live in the live React components.
- **Bottom-nav surfaces:** the mobile-app bottom nav uses a separate `--wcp-semantic-color-bottom-nav-*` token family that is not represented in the components above; this DESIGN.md captures the desktop marketing chrome only.
- **Walmart+ + Sam's Club subbrands:** Walmart+ membership pages and the Sam's Club site (`samsclub.com`) carry their own design systems with different brand voltages (membership-gold for +, navy-and-gold for Sam's) that are not represented here.
- **Spark logo:** the Walmart sun-spark logo in the top-nav uses six radiating Spark Yellow strokes around a circle; the asset is treated as a brand SVG rather than a composable token.
