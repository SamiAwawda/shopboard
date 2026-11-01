const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const sortSelect = document.querySelector("#sort");
const grid = document.querySelector("#products .grid");
const cartCount = document.querySelector("#cart-count");
const cartItems = document.querySelector("#cart-items");
const cartTotal = document.querySelector("#cart-total");
const cartItemsCount = document.querySelector("#cart-items-count");

function productCard(product) {
  return `
    <article class="card">
      <h3>${product.name}</h3>
      <p class="price">$${product.price}</p>
      <button type="button" data-id="${product.id}">Add to cart</button>
    </article>`;
}

export function renderProducts(list) {
  grid.innerHTML = list.map(productCard).join("");
}

export function renderCartCount(count) {
  cartCount.textContent = count;
}

function cartLine(line) {
  return `
    <li>
      <span>${line.name} × ${line.qty}</span>
      <span>$${line.subtotal}</span>
    </li>`;
}

export function renderCart(lines, total, count) {
  cartItems.innerHTML = lines.length
    ? lines.map(cartLine).join("")
    : "<li>Your cart is empty.</li>";
  cartTotal.textContent = `$${total}`;
  cartItemsCount.textContent = count;
}

export function readControls() {
  return {
    text: searchInput.value,
    category: categorySelect.value,
    direction: sortSelect.value,
  };
}

export function onControlsChange(handler) {
  searchInput.addEventListener("input", handler);
  categorySelect.addEventListener("change", handler);
  sortSelect.addEventListener("change", handler);
}

export function onAddToCart(handler) {
  grid.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-id]");
    if (button) handler(Number(button.dataset.id));
  });
}
