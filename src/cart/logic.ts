// Cart logic: pure functions for cart math (no DOM, no localStorage).

import type { Cart } from "./cart.types";

// The product fields the cart needs (no import from the products folder).
export type CartProduct = { id: number; name: string; price: number };
// A cart entry joined with its product, plus the subtotal for display.
export type CartLine = CartProduct & { qty: number; subtotal: number };

export function addItem(cart: Cart, id: number): Cart {
  const exists = cart.some((item) => item.id === id);
  if (!exists) return [...cart, { id, qty: 1 }];
  return cart.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item));
}

export function cartLines(cart: Cart, products: CartProduct[]): CartLine[] {
  return cart.flatMap((item) => {
    const product = products.find((p) => p.id === item.id);
    return product ? [{ ...product, qty: item.qty, subtotal: product.price * item.qty }] : [];
  });
}

export function cartTotal(lines: CartLine[]): number {
  return lines.reduce((total, line) => total + line.subtotal, 0);
}

export function countItems(cart: Cart): number {
  return cart.reduce((total, item) => total + item.qty, 0);
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
