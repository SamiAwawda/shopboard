# CLAUDE.md

## Project

ShopBoard: a shop landing page. Vanilla HTML, CSS and JavaScript. Vite for the dev server.

## Rules

- Semantic HTML: header, nav, main, section, article, footer. One h1.
- Buttons are <button>, links are <a href>.
- Mobile-first CSS: min-width media queries only. No !important.
- Every input has a label.
- Explain any file you create in one line.

## Architecture

- data.js: product data only
- logic.js: pure functions,
  no DOM, no localStorage
- state.js: the cart and saving
- ui.js: the only file that
  touches the DOM
- main.js: connects them
