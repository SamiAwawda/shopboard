## Project

ShopBoard: a computer shop (Newegg-style) landing page with a product list, a cart and a sign-up form.

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

Before you write or change any HTML or CSS, read `walmart.design.md` (in the project root) and follow it every time. ShopBoard uses its colors, type, spacing, radii, buttons and cards. They are CSS variables at the top of `style.css`. The design's font (EverydaySans) is proprietary, so the font stack falls back to Shubbak (`public/fonts/`).

Mobile details matter: inputs are at least 16px, tap targets are at least 44px, and nothing scrolls sideways at 320px.

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

- `index.html`: the page
- `style.css`: all styles (design tokens as CSS variables at the top)
- `walmart.design.md`: the design system. Read it before any HTML or CSS work.
- `tsconfig.json`: TypeScript settings (`strict`)
- `public/`: files served as they are: `favicon.svg`, `fonts/`, `images/placeholder.svg` and `images/products/` (one photo per product)
- `src/main.ts`: TypeScript entry point
- `src/products/`: everything about products (`products.types.ts`, `data.ts`, `logic.ts`, `ui.ts`)
- `src/cart/`: everything about the cart (`cart.types.ts`, `logic.ts`, `state.ts`, `ui.ts`)
- `src/signup/`: everything about the sign-up form (`ui.ts`)
- `src/shared/`: small helpers used by every feature (`dom.ts`)

## Architecture

Separation of concerns: one folder per feature, one job per file.

- `*.types.ts`: the types of a feature (for example `Category`, `Product`, `CartItem`, `Cart`). Types only, no code.
- `data.ts`: data only.
- `logic.ts`: pure functions (search, sort, cart math). No DOM, no localStorage, no imports (except `import type`).
- `state.ts`: saved data (the cart) in localStorage. Data read from localStorage is `unknown` until a type guard (like `isCart`) checks it.
- `ui.ts`: the only file in its feature that touches the DOM.
- `main.ts`: connects the features. No logic here.
- A feature folder never imports from another feature folder. `main.ts` passes data between them. Each feature defines the types it needs itself (the cart has its own `CartProduct`).
- `src/shared/` is the only folder features may import from.

## Where new features go

A new feature gets its own folder in `src/` (for example `src/signup/`, which only needs `ui.ts` so far). Split it by job: types in `<feature>.types.ts`, functions in `logic.ts`, saving in `state.ts`, HTML in `ui.ts`. Wire its events in `main.ts`.
