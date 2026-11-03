import { products } from "./products/data";
import { filterProducts, sortByPrice } from "./products/logic";
import { countItems, cartLines, cartTotal } from "./cart/logic";
import { loadCart, addToCart, updateQty, removeFromCart, clearCart } from "./cart/state";
import { renderCartCount, renderCart, onCartAction, onClearCart } from "./cart/ui";
import { renderProducts, readControls, onControlsChange, onAddToCart } from "./products/ui";
import { onSignup, showSignupSuccess } from "./signup/ui";

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
