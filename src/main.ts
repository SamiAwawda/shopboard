// Home page entry: connects the products, cart and sign-up modules for index.html. No logic here.
import { loadProducts } from "./modules/products/products.api";
import type { Product } from "./modules/products/products.types";
import {
  categorySummaries,
  filterProducts,
  findProduct,
  sortByPrice,
} from "./modules/products/logic";
import type { ApiState } from "./shared/api/client";
import { countItems, cartLines } from "./modules/cart/logic";
import { loadCart, addToCart } from "./modules/cart/state";
import { renderCartBadge } from "./shared/ui/header";
import { showToast } from "./shared/ui/toast";
import {
  renderCategories,
  renderProducts,
  renderProductsMessage,
  readControls,
  onControlsChange,
  onAddToCart,
  onRetry,
} from "./modules/products/ui";
import { onSignup, showSignupSuccess } from "./modules/signup/ui";

// The products from the API. It is null until they have loaded.
let products: Product[] | null = null;

function updateProducts(): void {
  if (products === null) return;
  const { text, category, direction } = readControls();
  renderProducts(sortByPrice(filterProducts(products, text, category), direction));
}

// The cart lives on its own page (cart.html); here only the header badge shows the count.
function updateCart(): void {
  renderCartBadge(countItems(cartLines(loadCart(), products ?? [])));
}

// Handles every state of the products request: loading, error, empty and success.
function onProductsState(state: ApiState<Product[]>): void {
  if (state.status === "success") {
    products = state.data;
    renderCategories(categorySummaries(products));
    updateProducts();
    updateCart();
    return;
  }
  renderProductsMessage(state);
}

function startLoadingProducts(): void {
  void loadProducts(onProductsState);
}

onControlsChange(updateProducts);
onAddToCart((id) => {
  addToCart(id);
  updateCart();
  const product = findProduct(products ?? [], id);
  if (product)
    showToast(`${product.name} added to cart.`, { href: "/cart.html", label: "View cart" });
});
onRetry(startLoadingProducts);

startLoadingProducts();
updateCart();

onSignup(showSignupSuccess);
