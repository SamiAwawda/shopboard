## Project

ShopBoard: a shop landing page with a product list and a sign-up form.

## Stack

- Vite (vanilla template), plain HTML, CSS and JavaScript. No frameworks.
- Prettier formats the code. ESLint checks it.
- husky + lint-staged run both on every commit.

## Commands

- `npm run dev`: start the dev server
- `npm run lint`: check the JavaScript
- `npm run format`: format every file
- `npm run build`: build for production

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

## Project structure

- `index.html`: the page
- `src/style.css`: all styles
- `src/products.js`: the product data
- `src/main.js`: JavaScript entry point

## Architecture

Separation of concerns: each file has one job.

- data.js: product data only.
- logic.js: pure functions (search, sort, cart math). No DOM, no localStorage, no imports.
- state.js: the cart and saving it to localStorage.
- ui.js : the only file that touches the DOM.
- main.js: connects the other files. No logic here.

## Where new features go

A new feature is split by job: its functions in logic.js, its saving in state.js,
its HTML in ui.js, and its events wired in main.js. Don't create a new file that touches the DOM.
