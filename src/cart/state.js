// Cart state: loads and saves the cart in localStorage.
import { addItem, changeQty, removeItem } from "./logic.js";

const CART_KEY = "cart";

export function loadCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) ?? "[]");
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(id) {
  const cart = addItem(loadCart(), id);
  saveCart(cart);
  return cart;
}

// Changes an item's quantity by delta, saves the cart and returns it.
export function updateQty(id, delta) {
  const cart = changeQty(loadCart(), id, delta);
  saveCart(cart);
  return cart;
}

// Removes an item from the saved cart and returns the new cart.
export function removeFromCart(id) {
  const cart = removeItem(loadCart(), id);
  saveCart(cart);
  return cart;
}

// Empties the saved cart.
export function clearCart() {
  saveCart([]);
}
