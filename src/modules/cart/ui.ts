// Cart UI: the only cart file that touches the DOM. It draws the cart page (rows, empty state, messages).
import { escapeHtml, getElement, usePlaceholderImages } from "../../shared/dom";
import { formatPrice } from "../../shared/money";
import { motionMs, replayClass } from "../../shared/motion";
import type { CartMessageState } from "./cart.types";
import type { CartLine } from "./logic";

const rows = getElement<HTMLElement>("#cart-rows");
const columns = getElement<HTMLElement>("#cart-columns");
const empty = getElement<HTMLElement>("#cart-empty");
const itemsLabel = getElement<HTMLElement>("#cart-items-label");
const clearButton = getElement<HTMLButtonElement>("#clear-cart");

const POP_CLASS = "is-popping";
// How far a removed row slides to the left before it folds away.
const REMOVE_SLIDE_PX = 32;
// Rows leave one after another when the cart is cleared.
const CLEAR_STAGGER_MS = 50;
// The leave motion is a bit longer than a normal one: first it slides, then it folds.
const LEAVE_LENGTH = 1.5;
const SLIDE_PART = 0.6;

usePlaceholderImages(rows);

const MINUS_ICON = `<svg class="icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M5 12h14" /></svg>`;
const PLUS_ICON = `<svg class="icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>`;
const CROSS_ICON = `<svg class="icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>`;

// "1 item" or "3 items".
function itemsText(count: number): string {
  return count === 1 ? "1 item" : `${count} items`;
}

// One cart row. `entering` plays the entry animation; `index` staggers it.
function cartRow(line: CartLine, index: number, entering: boolean): string {
  const name = escapeHtml(line.name);
  return `
    <li class="cart-row${entering ? " is-entering" : ""}" data-id="${line.id}" style="--i: ${index}">
      <img class="cart-row-image" src="${line.image}" alt="" width="80" height="80" />
      <div class="cart-row-name">
        <span class="cart-row-title">${name}</span>
        <span class="cart-row-category">${escapeHtml(line.category)}</span>
      </div>
      <div class="qty" role="group" aria-label="Quantity of ${name}">
        <button type="button" class="qty-button" data-action="decrease" data-id="${line.id}" aria-label="Decrease quantity of ${name}">${MINUS_ICON}</button>
        <span class="qty-value">${line.qty}</span>
        <button type="button" class="qty-button" data-action="increase" data-id="${line.id}" aria-label="Increase quantity of ${name}">${PLUS_ICON}</button>
      </div>
      <span class="cart-row-price">${formatPrice(line.subtotal)}</span>
      <button type="button" class="remove-button" data-action="remove" data-id="${line.id}" aria-label="Remove ${name}">${CROSS_ICON}</button>
    </li>`;
}

// Draws the cart rows, or the empty state. Rows animate in only on the first draw;
// after a quantity change only that row's number pops.
export function renderCartPage(
  lines: CartLine[],
  options: { firstRender: boolean; changedId: number | null; count: number },
): void {
  itemsLabel.textContent = `(${itemsText(options.count)})`;
  clearButton.disabled = lines.length === 0;
  const isEmpty = lines.length === 0;
  const wasEmpty = !empty.hidden;
  empty.hidden = !isEmpty;
  columns.hidden = isEmpty;
  if (isEmpty && !wasEmpty) replayClass(empty, "is-entering");
  rows.innerHTML = lines.map((line, index) => cartRow(line, index, options.firstRender)).join("");
  if (options.changedId !== null) {
    const value = rows.querySelector(`li[data-id="${options.changedId}"] .qty-value`);
    if (value) replayClass(value, POP_CLASS);
  }
}

// Shows "loading" or an error with a retry button in place of the rows.
export function renderCartMessage(state: CartMessageState): void {
  empty.hidden = true;
  columns.hidden = true;
  clearButton.disabled = true;
  rows.innerHTML =
    state.status === "loading"
      ? '<li class="cart-message" role="status">Loading your cart…</li>'
      : `<li class="cart-message" role="alert">
           <p>Could not load your cart. ${escapeHtml(state.error.message)}.</p>
           <button type="button" class="primary-button" data-action="retry">Try again</button>
         </li>`;
}

// Slides a row to the left and folds it away. Resolves when the motion has finished.
function animateOut(row: HTMLElement, delay: number): Promise<void> {
  const duration = motionMs();
  if (duration === 0) return Promise.resolve();
  const height = row.offsetHeight;
  const animation = row.animate(
    [
      { opacity: 1, transform: "translateX(0)", height: `${height}px` },
      {
        opacity: 0,
        transform: `translateX(-${REMOVE_SLIDE_PX}px)`,
        height: `${height}px`,
        offset: SLIDE_PART,
      },
      {
        opacity: 0,
        transform: `translateX(-${REMOVE_SLIDE_PX}px)`,
        height: "0px",
        paddingBlock: "0px",
        marginBlock: "0px",
        borderWidth: "0px",
      },
    ],
    { duration: duration * LEAVE_LENGTH, delay, easing: "ease-in-out", fill: "forwards" },
  );
  return animation.finished.then(() => undefined);
}

// Plays the "leave" motion for one row.
export function animateRowOut(id: number): Promise<void> {
  const row = rows.querySelector<HTMLElement>(`li[data-id="${id}"]`);
  return row ? animateOut(row, 0) : Promise.resolve();
}

// Plays the "leave" motion for every row, one after another (used by "Clear cart").
export function animateAllRowsOut(): Promise<void> {
  const list = [...rows.querySelectorAll<HTMLElement>("li.cart-row")];
  return Promise.all(list.map((row, index) => animateOut(row, index * CLEAR_STAGGER_MS))).then(
    () => undefined,
  );
}

// Calls handler(action, id) when +, - or remove is clicked in a row.
export function onCartAction(handler: (action: string, id: number) => void): void {
  rows.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const button = event.target.closest<HTMLButtonElement>("button[data-id]");
    if (button?.dataset.action) handler(button.dataset.action, Number(button.dataset.id));
  });
}

// Calls handler when "Clear cart" is clicked.
export function onClearCart(handler: () => void): void {
  clearButton.addEventListener("click", handler);
}

// Calls handler when "Try again" is clicked after an error.
export function onCartRetry(handler: () => void): void {
  rows.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    if (event.target.closest("button[data-action='retry']")) handler();
  });
}
