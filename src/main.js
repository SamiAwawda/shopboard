import { products } from "./products/data.js";
import { filterProducts, sortByPrice } from "./products/logic.js";
import { countItems, cartLines, cartTotal } from "./cart/logic.js";
import { loadCart, addToCart, updateQty, removeFromCart, clearCart } from "./cart/state.js";
import { renderCartCount, renderCart, onCartAction, onClearCart } from "./cart/ui.js";
import { renderProducts, readControls, onControlsChange, onAddToCart } from "./products/ui.js";
import { onSignup, showSignupSuccess } from "./signup/ui.js";

function updateProducts() {
  const { text, category, direction } = readControls();
  renderProducts(sortByPrice(filterProducts(products, text, category), direction));
}

function updateCart() {
  const cart = loadCart();
  const lines = cartLines(cart, products);
  const count = countItems(cart);
  renderCartCount(count);
  renderCart(lines, cartTotal(lines), count);
}

onControlsChange(updateProducts);
onAddToCart((id) => {
  addToCart(id);
  updateCart();
});

const QTY_STEP = 1;

onCartAction((action, id) => {
  if (action === "increase") updateQty(id, QTY_STEP);
  if (action === "decrease") updateQty(id, -QTY_STEP);
  if (action === "remove") removeFromCart(id);
  updateCart();
});
onClearCart(() => {
  clearCart();
  updateCart();
});

updateProducts();
updateCart();

onSignup(showSignupSuccess);
