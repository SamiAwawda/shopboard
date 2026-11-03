// Cart UI: the only cart file that touches the DOM.
import { getElement } from "../shared/dom";
import type { CartLine } from "./logic";

const cartCount = getElement<HTMLElement>("#cart-count");
const cartItems = getElement<HTMLElement>("#cart-items");
const cartTotal = getElement<HTMLElement>("#cart-total");
const cartItemsCount = getElement<HTMLElement>("#cart-items-count");
const clearButton = getElement<HTMLButtonElement>("#clear-cart");

export function renderCartCount(count: number): void {
  cartCount.textContent = String(count);
}

function cartLine(line: CartLine): string {
  return `
    <li>
      <span>${line.name}</span>
      <span class="qty">
        <button type="button" data-action="decrease" data-id="${line.id}" aria-label="Decrease quantity of ${line.name}">−</button>
        <span>${line.qty}</span>
        <button type="button" data-action="increase" data-id="${line.id}" aria-label="Increase quantity of ${line.name}">+</button>
      </span>
      <span>$${line.subtotal}</span>
      <button type="button" data-action="remove" data-id="${line.id}" aria-label="Remove ${line.name}">Remove</button>
    </li>`;
}

export function renderCart(lines: CartLine[], total: number, count: number): void {
  cartItems.innerHTML = lines.length
    ? lines.map(cartLine).join("")
    : "<li>Your cart is empty.</li>";
  cartTotal.textContent = `$${total}`;
  cartItemsCount.textContent = String(count);
}

// Calls handler(action, id) when a button inside the cart list is clicked.
export function onCartAction(handler: (action: string, id: number) => void): void {
  cartItems.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const button = event.target.closest<HTMLButtonElement>("button[data-action]");
    if (button?.dataset.action) handler(button.dataset.action, Number(button.dataset.id));
  });
}

// Calls handler when the "Clear cart" button is clicked.
export function onClearCart(handler: () => void): void {
  clearButton.addEventListener("click", handler);
}
