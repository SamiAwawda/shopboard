// Cart logic: pure functions for cart math (no DOM, no localStorage).

export function addItem(cart, id) {
  const exists = cart.some((item) => item.id === id);
  if (!exists) return [...cart, { id, qty: 1 }];
  return cart.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item));
}

export function cartLines(cart, products) {
  return cart.flatMap((item) => {
    const product = products.find((p) => p.id === item.id);
    return product ? [{ ...product, qty: item.qty, subtotal: product.price * item.qty }] : [];
  });
}

export function cartTotal(lines) {
  return lines.reduce((total, line) => total + line.subtotal, 0);
}

export function countItems(cart) {
  return cart.reduce((total, item) => total + item.qty, 0);
}

const MIN_QTY = 1;

// Changes one item's quantity by delta; an item that would drop below MIN_QTY is removed.
export function changeQty(cart, id, delta) {
  return cart
    .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
    .filter((item) => item.qty >= MIN_QTY);
}

// Returns the cart without the item that has this id.
export function removeItem(cart, id) {
  return cart.filter((item) => item.id !== id);
}
