// Products logic: pure functions to search, filter and sort products.
import type { CategorySummary, Product } from "./products.types";
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
    direction === "asc" ? a.priceCents - b.priceCents : b.priceCents - a.priceCents,
  );
}

// One summary per category, in the order the categories first appear: the count and the first photo.
export function categorySummaries(products: Product[]): CategorySummary[] {
  const summaries: CategorySummary[] = [];
  for (const product of products) {
    const summary = summaries.find((s) => s.category === product.category);
    if (summary) summary.count += 1;
    else summaries.push({ category: product.category, count: 1, image: product.image });
  }
  return summaries;
}

// The product with this id, or null.
export function findProduct(products: Product[], id: number): Product | null {
  return products.find((product) => product.id === id) ?? null;
}
