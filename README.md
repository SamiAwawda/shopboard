# ShopBoard

A small online shop with a product slider, a cart page and a sign-up form.

> **This is a training project.** I built it during a web development training course, step by step over several days. It is not a real shop: nothing can be bought, and the sign-up form saves nothing. The goal was to practice clean structure, TypeScript, working with an API, and a careful, accessible design.

**Author:** Sami Awawda

---

## What it does

**Home page** (`index.html`)

- A "Best Sellers" slider with arrow buttons. The first card in view is highlighted.
- Category tiles: press one to show only that category, press it again to show all.
- Search by name, and sorting by price (behind the round filter button).
- Products load from an API, and the page shows all four states: loading, error (with a "Try again" button), empty and success.
- Out-of-stock products can't be added to the cart.
- A short message appears when a product is added to the cart.
- A sign-up form with the browser's own validation (demo only).

**Cart page** (`cart.html`)

- Add, remove and change the quantity of products, or clear the whole cart.
- Choose a delivery option.
- Promo codes: `SAVE10` (10% off) and `SHOP20` (20% off).
- The order summary (subtotal, discount, delivery, total) updates with every change.
- The cart, the delivery choice and the promo code are saved in the browser (`localStorage`), so they survive a refresh.

**Design**

- Mobile first: works from 320px phones to wide laptop screens, with no sideways scroll.
- Smooth animations that stop when the system asks for reduced motion.
- Accessible: one `h1` per page, every input has a label, buttons and links are at least 44px, text contrast is at least 4.5:1.

---

## Built with

- [Vite](https://vite.dev) and plain HTML, CSS and **TypeScript** (`strict` mode). No frameworks.
- [Prettier](https://prettier.io) and [ESLint](https://eslint.org) (with typescript-eslint) check the code.
- [husky](https://typicode.github.io/husky) and [lint-staged](https://github.com/lint-staged/lint-staged) run both on every commit.
- The product data comes from the ShopBoard API that was given in the course.

---

## Run it

You need [Node.js](https://nodejs.org) and npm.

```bash
git clone https://github.com/SamiAwawda/shopboard.git
cd shopboard
npm install
npm run dev
```

Then open the address Vite prints (usually http://localhost:5173). The cart page is at `/cart.html`.

| Command                | What it does                                              |
| ---------------------- | --------------------------------------------------------- |
| `npm run dev`          | Starts the dev server                                     |
| `npm run build`        | Checks the types, then builds for production into `dist/` |
| `npm run preview`      | Serves the built site                                     |
| `npm run lint`         | Checks the code with ESLint                               |
| `npm run typecheck`    | Checks the types                                          |
| `npm run format`       | Formats every file with Prettier                          |
| `npm run format:check` | Checks the formatting without changing files              |

---

## How the project is organized

One folder per feature, and one job per file.

```
index.html, cart.html         the two pages
style.css                     all styles (design tokens are CSS variables at the top)
src/
  main.ts                     connects the modules for the home page
  cart-page.ts                connects the modules for the cart page
  modules/
    products/                 types, API paths, search/sort logic, slider and tiles
    cart/                     types, cart math, saving, cart page rows
    checkout/                 delivery options, promo codes, order summary
    signup/                   the sign-up form
  shared/
    api/client.ts             the API address and the one client every request uses
    dom.ts, money.ts, motion.ts, ui/   small helpers used by every module
public/                       favicon, logo, product photos
Design/logo/                  the logo source files
```

The main rules (the full list is in [`AGENTS.md`](AGENTS.md)):

- `logic.ts` files are pure functions: no DOM, no `localStorage`, no network.
- Only `ui.ts` files touch the DOM, and only `shared/api/client.ts` calls `fetch`.
- A module never imports from another module. The page entry files connect them.
- Everything in `src/` is TypeScript, with no `any`, no `as` and no `!` (ESLint fails on all three). Data from outside is checked with type guards.
- Prices are stored in cents, and only one function turns them into dollars.

---

## More documents

| File                                   | What it is                                                          |
| -------------------------------------- | ------------------------------------------------------------------- |
| [`DESIGN.md`](DESIGN.md)               | The design system: colors, type, spacing, motion, every component   |
| [`AGENTS.md`](AGENTS.md)               | The project rules and structure, for people and for AI coding tools |
| [`debugging-log.md`](debugging-log.md) | The bugs I hit, how I found them and how I fixed them               |

---

## About using AI

I used an AI coding assistant (Claude Code) while building this project. It wrote a lot of the code, and it also made mistakes that I had to catch. I write about those mistakes in [`debugging-log.md`](debugging-log.md).

---

## Notes

- This is a demo: "Continue to checkout" does not send an order, and the sign-up form does not save anything.
- Only six products have photos so far. The others show a placeholder image.
- The product list comes from a shared course API, so it needs an internet connection.
