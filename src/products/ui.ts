// Products UI: the only products file that touches the DOM.
import { getElement } from "../shared/dom";
import type { Product } from "./products.types";

const searchInput = getElement<HTMLInputElement>("#search");
const categorySelect = getElement<HTMLSelectElement>("#category");
const sortSelect = getElement<HTMLSelectElement>("#sort");
const grid = getElement<HTMLElement>("#products .grid");

const PLACEHOLDER_IMAGE = "/images/placeholder.svg";

// If a product photo is missing, show the placeholder instead (once, so it can't loop).
grid.addEventListener(
  "error",
  (event) => {
    const image = event.target;
    if (image instanceof HTMLImageElement && !image.src.endsWith(PLACEHOLDER_IMAGE)) {
      image.src = PLACEHOLDER_IMAGE;
    }
  },
  true,
);

function productCard(product: Product): string {
  return `
    <article class="card">
      <img src="${product.image}" alt="${product.name}" width="400" height="300" loading="lazy" />
      <h3>${product.name}</h3>
      <p class="price">$${product.price}</p>
      <button type="button" data-id="${product.id}">Add to cart</button>
    </article>`;
}

export function renderProducts(list: Product[]): void {
  grid.innerHTML = list.map(productCard).join("");
}

export function readControls(): { text: string; category: string; direction: string } {
  return {
    text: searchInput.value,
    category: categorySelect.value,
    direction: sortSelect.value,
  };
}

export function onControlsChange(handler: () => void): void {
  searchInput.addEventListener("input", handler);
  categorySelect.addEventListener("change", handler);
  sortSelect.addEventListener("change", handler);
}

export function onAddToCart(handler: (id: number) => void): void {
  grid.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const button = event.target.closest<HTMLButtonElement>("button[data-id]");
    if (button) handler(Number(button.dataset.id));
  });
}
