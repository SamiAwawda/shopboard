// Cart logic: pure functions for cart math (no DOM, no localStorage).

import type { Cart, CartItem } from "./cart.types";

// The product fields the cart needs (no import from the products folder). The price is in cents.
export type CartProduct = {
  id: number;
  name: string;
  category: string;
  priceCents: number;
  image: string;
};
// A cart entry joined with its product, plus the subtotal in cents.
export type CartLine = CartProduct & { qty: number; subtotal: number };

// Checks that an unknown value is one cart entry: an object with a number id and a number qty.
function isCartItem(value: unknown): value is CartItem {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "qty" in value &&
    typeof value.id === "number" &&
    typeof value.qty === "number"
  );
}

// Checks that an unknown value (for example data read from localStorage) is a valid Cart.
export function isCart(value: unknown): value is Cart {
  return Array.isArray(value) && value.every(isCartItem);
}

export function addItem(cart: Cart, id: number): Cart {
  const exists = cart.some((item) => item.id === id);
  if (!exists) return [...cart, { id, qty: 1 }];
  return cart.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item));
}

export function cartLines(cart: Cart, products: CartProduct[]): CartLine[] {
  return cart.flatMap((item) => {
    const product = products.find((p) => p.id === item.id);
    return product ? [{ ...product, qty: item.qty, subtotal: product.priceCents * item.qty }] : [];
  });
}

export function cartTotal(lines: CartLine[]): number {
  return lines.reduce((total, line) => total + line.subtotal, 0);
}

// Counts the items in the lines, so the count always matches what the cart shows.
export function countItems(lines: CartLine[]): number {
  return lines.reduce((total, line) => total + line.qty, 0);
}

const MIN_QTY = 1;

// Changes one item's quantity by delta; an item that would drop below MIN_QTY is removed.
export function changeQty(cart: Cart, id: number, delta: number): Cart {
  return cart
    .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
    .filter((item) => item.qty >= MIN_QTY);
}

// Returns the cart without the item that has this id.
export function removeItem(cart: Cart, id: number): Cart {
  return cart.filter((item) => item.id !== id);
}

// True when the product is in the cart exactly MIN_QTY times, so one more "decrease" removes it.
export function isLastOne(cart: Cart, id: number): boolean {
  return cart.some((item) => item.id === id && item.qty === MIN_QTY);
}
