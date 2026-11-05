// Shared money helper: turns a price in cents into text like "$89.00".
const CENTS_PER_DOLLAR = 100;
const PRICE_DECIMALS = 2;

export function formatPrice(cents: number): string {
  return `$${(cents / CENTS_PER_DOLLAR).toFixed(PRICE_DECIMALS)}`;
}
