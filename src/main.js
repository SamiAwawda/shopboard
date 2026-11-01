import { products } from "./data.js";
import { filterProducts, sortByPrice, countItems, cartLines, cartTotal } from "./logic.js";
import { loadCart, addToCart } from "./state.js";
import {
  renderProducts,
  renderCartCount,
  renderCart,
  readControls,
  onControlsChange,
  onAddToCart,
} from "./ui.js";

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

updateProducts();
updateCart();
