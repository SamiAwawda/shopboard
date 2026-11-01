import { addItem } from "./logic.js";

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
