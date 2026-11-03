// Cart state: loads and saves the cart in localStorage.
import type { Cart } from "./cart.types";
import { addItem, changeQty, isCart, removeItem } from "./logic";

const CART_KEY = "cart";

export function loadCart(): Cart {
  const saved: unknown = JSON.parse(localStorage.getItem(CART_KEY) ?? "[]");
  return isCart(saved) ? saved : [];
}

function saveCart(cart: Cart): void {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(id: number): Cart {
  const cart = addItem(loadCart(), id);
  saveCart(cart);
  return cart;
}

// Changes an item's quantity by delta, saves the cart and returns it.
export function updateQty(id: number, delta: number): Cart {
  const cart = changeQty(loadCart(), id, delta);
  saveCart(cart);
  return cart;
}

// Removes an item from the saved cart and returns the new cart.
export function removeFromCart(id: number): Cart {
  const cart = removeItem(loadCart(), id);
  saveCart(cart);
  return cart;
}

// Empties the saved cart.
export function clearCart(): void {
  saveCart([]);
}
