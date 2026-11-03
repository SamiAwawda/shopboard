// Products logic: pure functions to search, filter and sort products.
import type { Product } from "./products.types";
export function filterProducts(products: Product[], text: string, category: string): Product[] {
  const query = text.trim().toLowerCase();
  return products.filter(
    (p) => p.name.toLowerCase().includes(query) && (category === "All" || p.category === category),
  );
}

const DEFAULT_SORT = "default";

// Sorts by price, or keeps the original order when direction is the default.
export function sortByPrice(products: Product[], direction: string): Product[] {
  if (direction === DEFAULT_SORT) return products;
  return [...products].sort((a, b) =>
    direction === "asc" ? a.price - b.price : b.price - a.price,
  );
}
