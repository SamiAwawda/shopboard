// Products UI: the only products file that touches the DOM (slider, category tiles, messages).
import { escapeHtml, getElement, usePlaceholderImages } from "../../shared/dom";
import { formatPrice } from "../../shared/money";
import type { CategorySummary, Product, ProductsMessageState } from "./products.types";

const searchInput = getElement<HTMLInputElement>("#search");
const sortSelect = getElement<HTMLSelectElement>("#sort");
const track = getElement<HTMLElement>("#products .product-track");
const prevButton = getElement<HTMLButtonElement>("#carousel-prev");
const nextButton = getElement<HTMLButtonElement>("#carousel-next");
const filterToggle = getElement<HTMLButtonElement>("#filter-toggle");
const filters = getElement<HTMLElement>("#filters");
const categoryList = getElement<HTMLElement>("#products .category-list");

const ALL_CATEGORIES = "All";
const ACTIVE_CARD_CLASS = "is-active";
// Added when the slider is at its last card, so the fade on the right switches off.
const AT_END_CLASS = "is-at-end";
// How close (in px) the scroll must be to an end before that arrow turns off.
const SCROLL_END_TOLERANCE = 1;

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const BAG_ICON = `
  <svg class="icon" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <path d="M5.5 8h13l-1.2 11.2a2 2 0 0 1-2 1.8H8.7a2 2 0 0 1-2-1.8L5.5 8Z" />
    <path d="M9 8a3 3 0 0 1 6 0" />
    <path d="M9.5 13.5a2.5 2.5 0 0 0 5 0" />
  </svg>`;

usePlaceholderImages(getElement("#products"));

// A search typed on another page arrives as ?q=… in the address: start with it.
searchInput.value = new URLSearchParams(window.location.search).get("q") ?? "";

// One slider card. `index` staggers the entry animation.
function productCard(product: Product, index: number): string {
  const name = escapeHtml(product.name);
  const label = product.inStock ? `Add ${name} to cart` : `${name} is out of stock`;
  return `
    <article class="card" style="--i: ${index}">
      <div class="card-image">
        <img src="${product.image}" alt="${name}" width="400" height="400" loading="lazy" />
      </div>
      <div class="card-info">
        <h3>${name}</h3>
        <p class="card-category">${product.inStock ? product.category : "Out of stock"}</p>
        <p class="price">${formatPrice(product.priceCents)}</p>
        <button type="button" class="bag-button" data-id="${product.id}" aria-label="${label}"${product.inStock ? "" : " disabled"}>
          ${BAG_ICON}
        </button>
      </div>
    </article>`;
}

// The slider cards in the track (the .card elements only, not messages).
function cards(): HTMLElement[] {
  return [...track.querySelectorAll<HTMLElement>(".card")];
}

// The left edge the track scrolls to for a card, so the card starts at the track's padding.
function cardScrollLeft(card: HTMLElement): number {
  return card.offsetLeft - parseFloat(getComputedStyle(track).paddingInlineStart);
}

// The card closest to the left edge of the track: that card is the active (purple) one.
function activeIndex(): number {
  const list = cards();
  let best = 0;
  list.forEach((card, index) => {
    const distance = Math.abs(cardScrollLeft(card) - track.scrollLeft);
    const bestDistance = Math.abs(cardScrollLeft(list[best] ?? card) - track.scrollLeft);
    if (distance < bestDistance) best = index;
  });
  return best;
}

// Colors the active card purple and turns an arrow off when the slider is at that end.
function updateSlider(): void {
  const active = activeIndex();
  cards().forEach((card, index) => card.classList.toggle(ACTIVE_CARD_CLASS, index === active));
  const maxScroll = track.scrollWidth - track.clientWidth;
  prevButton.disabled = track.scrollLeft <= SCROLL_END_TOLERANCE;
  nextButton.disabled = track.scrollLeft >= maxScroll - SCROLL_END_TOLERANCE;
  track.classList.toggle(AT_END_CLASS, nextButton.disabled);
}

// Slides to the card `step` places away from the active one (-1 = back, 1 = forward).
function slide(step: number): void {
  const target = cards()[activeIndex() + step];
  if (!target) return;
  track.scrollTo({
    left: cardScrollLeft(target),
    behavior: reducedMotion.matches ? "auto" : "smooth",
  });
}

prevButton.addEventListener("click", () => slide(-1));
nextButton.addEventListener("click", () => slide(1));

// Swiping or scrolling also moves the active card, at most once per frame.
let frameRequested = false;
track.addEventListener("scroll", () => {
  if (frameRequested) return;
  frameRequested = true;
  requestAnimationFrame(() => {
    frameRequested = false;
    updateSlider();
  });
});
window.addEventListener("resize", updateSlider);

// The round filter button shows or hides the sort options.
filterToggle.addEventListener("click", () => {
  const open = filterToggle.getAttribute("aria-expanded") !== "true";
  filterToggle.setAttribute("aria-expanded", String(open));
  filters.hidden = !open;
});

// Shows the products in the slider, or a message when the search and filters match nothing.
export function renderProducts(list: Product[]): void {
  track.innerHTML = list.length
    ? list.map(productCard).join("")
    : '<p class="grid-message">No products match your search.</p>';
  track.scrollLeft = 0;
  updateSlider();
}

// The text for a state where there is no list: loading, empty or error.
function messageHtml(state: ProductsMessageState): string {
  switch (state.status) {
    case "loading":
      return '<p class="grid-message" role="status">Loading products…</p>';
    case "empty":
      return '<p class="grid-message">There are no products yet.</p>';
    case "error":
      return `
        <div class="grid-message" role="alert">
          <p>Could not load the products. ${escapeHtml(state.error.message)}.</p>
          <button type="button" data-action="retry">Try again</button>
        </div>`;
  }
}

// Shows the message for loading, empty or error in place of the slider.
export function renderProductsMessage(state: ProductsMessageState): void {
  track.innerHTML = messageHtml(state);
  updateSlider();
}

// The category tile that is pressed right now, or null when all categories are shown.
function pressedTile(): HTMLButtonElement | null {
  return categoryList.querySelector<HTMLButtonElement>("button[aria-pressed='true']");
}

// One category tile. The vertical pill with the count shows when the tile is pressed.
function categoryTile(summary: CategorySummary, pressed: boolean): string {
  const name = escapeHtml(summary.category);
  const items = summary.count === 1 ? "1 item" : `${summary.count} items`;
  return `
    <li>
      <button type="button" class="category-tile" data-category="${name}" aria-pressed="${pressed}">
        <span class="tile-count">${items}</span>
        <span class="tile-image"><img src="${summary.image}" alt="" width="120" height="120" /></span>
        <span class="tile-name">${name}</span>
      </button>
    </li>`;
}

// Draws the category tiles and keeps the one that was pressed.
export function renderCategories(summaries: CategorySummary[]): void {
  const current = pressedTile()?.dataset.category;
  categoryList.innerHTML = summaries
    .map((summary) => categoryTile(summary, summary.category === current))
    .join("");
}

export function readControls(): { text: string; category: string; direction: string } {
  return {
    text: searchInput.value,
    category: pressedTile()?.dataset.category ?? ALL_CATEGORIES,
    direction: sortSelect.value,
  };
}

// Calls handler when the search, the sort or a category tile changes.
// A tile press shows only that category; pressing it again shows all categories.
export function onControlsChange(handler: () => void): void {
  searchInput.addEventListener("input", handler);
  sortSelect.addEventListener("change", handler);
  categoryList.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const tile = event.target.closest<HTMLButtonElement>("button.category-tile");
    if (!tile) return;
    const wasPressed = tile.getAttribute("aria-pressed") === "true";
    categoryList
      .querySelectorAll("button.category-tile")
      .forEach((other) => other.setAttribute("aria-pressed", "false"));
    tile.setAttribute("aria-pressed", String(!wasPressed));
    handler();
  });
}

export function onAddToCart(handler: (id: number) => void): void {
  track.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const button = event.target.closest<HTMLButtonElement>("button[data-id]");
    if (button) handler(Number(button.dataset.id));
  });
}

// Calls handler when the "Try again" button (shown after an error) is clicked.
export function onRetry(handler: () => void): void {
  track.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    if (event.target.closest("button[data-action='retry']")) handler();
  });
}
