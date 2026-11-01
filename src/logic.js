export function filterProducts(products, text, category) {
  const query = text.trim().toLowerCase();
  return products.filter(
    (p) => p.name.toLowerCase().includes(query) && (category === "All" || p.category === category),
  );
}

export function sortByPrice(products, direction) {
  return [...products].sort((a, b) =>
    direction === "asc" ? a.price - b.price : b.price - a.price,
  );
}

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
