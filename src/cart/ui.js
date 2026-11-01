// Cart UI: the only cart file that touches the DOM.
const cartCount = document.querySelector("#cart-count");
const cartItems = document.querySelector("#cart-items");
const cartTotal = document.querySelector("#cart-total");
const cartItemsCount = document.querySelector("#cart-items-count");

export function renderCartCount(count) {
  cartCount.textContent = count;
}

function cartLine(line) {
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

export function renderCart(lines, total, count) {
  cartItems.innerHTML = lines.length
    ? lines.map(cartLine).join("")
    : "<li>Your cart is empty.</li>";
  cartTotal.textContent = `$${total}`;
  cartItemsCount.textContent = count;
}

// Calls handler(action, id) when a button inside the cart list is clicked.
export function onCartAction(handler) {
  cartItems.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (button) handler(button.dataset.action, Number(button.dataset.id));
  });
}

// Calls handler when the "Clear cart" button is clicked.
export function onClearCart(handler) {
  document.querySelector("#clear-cart").addEventListener("click", handler);
}
