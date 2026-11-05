## Project

ShopBoard: a shop with two pages: the home page (a product slider, category tiles and a sign-up form) and the cart page (cart rows, delivery, promo code and the order summary).

## Stack

- Vite, plain HTML, CSS and TypeScript (`strict` mode). No frameworks.
- Prettier formats the code. ESLint (with typescript-eslint) checks it.
- husky + lint-staged run both on every commit.

## Commands

- `npm run dev`: start the dev server
- `npm run lint`: check the code
- `npm run typecheck`: check the types
- `npm run format`: format every file
- `npm run format:check`: check the formatting without changing files
- `npm run build`: typecheck, then build for production

## Design system

Before you write or change any HTML or CSS, read `DESIGN.md` (in the project root) and follow it every time. It describes the design as it is built: colors with their contrast, type, spacing, radii, shadows, motion, layout per screen size, every component, product photo rules, accessibility, voice, icons and the logo rules. The tokens are CSS variables at the top of `style.css`, with the same names as in `DESIGN.md`. When you change the design, update `DESIGN.md` in the same change.

The reference images the pages were built from are no longer in the project: `DESIGN.md` is the only description of the design.

Mobile details matter: inputs are at least 16px, tap targets are at least 44px, and nothing scrolls sideways at 320px. On laptops the page fills the screen (no frame or window); the content stops growing at `--content-max` and stays centered.

## Rules

1. Semantic HTML first: header, nav, main, section, article, footer. One h1 per page.
2. Buttons are `<button>`, links are `<a href>`. Never a clickable div.
3. Every input has a `<label>`. Use native validation (required, type, minlength) before JavaScript.
4. Mobile-first CSS: base styles are for phones, then `min-width` media queries only. No `!important`.
5. Use `===`, `const` by default, `let` only when the value changes. Never `var`.
6. No magic numbers: give them a name (`TAX_RATE`, not `1.2`).
7. Reuse existing functions. Don't duplicate logic.
8. Explain every new file and function in one line.
9. Don't change what I didn't ask for.
10. Everything in `src/` is `.ts`. Write the types yourself (`Product`, `CartItem`, `Cart`). No `any`, no `as`, no `!`: ESLint fails on all three. Give every function parameter and return value a type.

## Project structure

- `index.html`: the home page (entry: `src/main.ts`)
- `cart.html`: the cart page (entry: `src/cart-page.ts`)
- `vite.config.ts`: tells Vite to build both pages
- `style.css`: all styles (design tokens as CSS variables at the top)
- `DESIGN.md`: the design system. Read it before any HTML or CSS work.
- `Design/logo/`: the logo source files (SVG). The ones the site uses are copied to `public/`.
- `tsconfig.json`: TypeScript settings (`strict`)
- `public/`: files served as they are: `favicon.svg` and `apple-touch-icon.png` (at the root, where browsers look for them), `images/logo/shopboard-lockup.svg` (the header logo), `images/placeholder.svg` and `images/products/` (one photo per product, named after the product title in lowercase with dashes, for example `leather-tote-bag.jpg`; square, 800×800, product centered on its own background). A product without a photo shows the placeholder
- `src/main.ts`: connects the modules for the home page
- `src/cart-page.ts`: connects the modules for the cart page
- `src/modules/`: one folder per feature
  - `products/`: everything about products (`products.types.ts`, `products.api.ts`, `logic.ts`, `ui.ts`). `ui.ts` draws the slider and the category tiles.
  - `cart/`: everything about the cart (`cart.types.ts`, `logic.ts`, `state.ts`, `ui.ts`). `ui.ts` draws the cart page rows.
  - `checkout/`: delivery options, promo codes and the order summary (`checkout.types.ts`, `data.ts`, `logic.ts`, `state.ts`, `ui.ts`)
  - `signup/`: everything about the sign-up form (`ui.ts`)
- `src/shared/`: code used by every module
  - `dom.ts`: finds DOM elements safely, and `escapeHtml` for text that goes into HTML
  - `money.ts`: `formatPrice` turns cents into text like `$89.00`
  - `motion.ts`: `motionMs` (the `--duration` token for JavaScript motion), `tweenNumber`, `replayClass`
  - `ui/header.ts`: the cart badge in the header (every page has it)
  - `ui/toast.ts`: the only file that makes toasts
  - `api/client.ts`: the API address and the shared `api` client. Every request goes through it.

## Architecture

Separation of concerns: one folder per feature (in `src/modules/`), one job per file.

- `*.types.ts`: the types of a feature (for example `Category`, `Product`, `CartItem`, `Cart`). Types only, no code.
- `data.ts`: fixed data only (for example the delivery options and promo codes).
- `*.api.ts`: the module's API paths (for example `/api/products`), the type guards that check the reply, and the translation from API names to the module's types (for example `title` to `name`). It uses the shared client and never touches the DOM.
- `logic.ts`: pure functions (search, sort, cart math). No DOM, no localStorage, no imports (except `import type`).
- `state.ts`: saved data (the cart) in localStorage. Data read from localStorage is `unknown` until a type guard (like `isCart`) checks it, and reading it is wrapped in `try/catch` so broken text gives an empty value, never a crash. Every localStorage key starts with `shopboard-`.
- `ui.ts`: the only file in its feature that touches the DOM. Text that comes from an API goes through `escapeHtml` before it is put into HTML.
- Page entries (`main.ts`, `cart-page.ts`): one per HTML page. They connect the modules. No logic here.
- A new page gets its own HTML file at the root, its own entry in `src/` and a line in `vite.config.ts`. Its features still live in `src/modules/`.
- A module never imports from another module. The page entry passes data between them. Each module defines the types it needs itself (the cart has its own `CartProduct`).
- `src/shared/` is the only folder modules may import from. `shared/ui/` holds UI that every page shares (header badge, toasts).
- Prices are whole numbers of cents everywhere in the code (the API sends `price_cents`). Only `formatPrice` turns cents into dollars, when the price is shown.
- API calls: only `shared/api/client.ts` calls `fetch`. It returns data only after a type guard has checked it (no `as`, no `any`). The API address is written only in `shared/api/client.ts` (`API_BASE_URL`). Modules use the shared `api` client and pass only a path: `api.load("/api/products", ...)`. `client.load(...)` never throws: it reports each request as an `ApiState` (`loading`, `error`, `empty` or `success`), and the module's `ui.ts` draws every one of the four states.

## Where new features go

A new feature gets its own folder in `src/modules/` (for example `src/modules/signup/`, which only needs `ui.ts` so far). Split it by job: types in `<feature>.types.ts`, functions in `logic.ts`, saving in `state.ts`, HTML in `ui.ts`. Wire its events in the page entry (`main.ts` or `cart-page.ts`).
