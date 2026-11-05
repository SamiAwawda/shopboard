// Cart page entry: connects the cart, checkout and products modules for cart.html. No logic here.
import { loadProducts } from "./modules/products/products.api";
import type { Product } from "./modules/products/products.types";
import { cartLines, cartTotal, countItems, isLastOne } from "./modules/cart/logic";
import { clearCart, loadCart, removeFromCart, updateQty } from "./modules/cart/state";
import {
  animateAllRowsOut,
  animateRowOut,
  onCartAction,
  onCartRetry,
  onClearCart,
  renderCartMessage,
  renderCartPage,
} from "./modules/cart/ui";
import { DEFAULT_DELIVERY_ID, DELIVERY_OPTIONS, PROMO_CODES } from "./modules/checkout/data";
import { findDelivery, findPromo, orderSummary } from "./modules/checkout/logic";
import {
  loadDeliveryId,
  loadPromoCode,
  saveDeliveryId,
  savePromoCode,
} from "./modules/checkout/state";
import {
  onCheckout,
  onDeliveryChange,
  onPromoRemove,
  onPromoSubmit,
  renderDeliveryOptions,
  renderSummary,
  showCheckoutMessage,
  showPromoApplied,
  showPromoInvalid,
} from "./modules/checkout/ui";
import type { ApiState } from "./shared/api/client";
import { renderCartBadge } from "./shared/ui/header";

const QTY_STEP = 1;

// The products from the API (the cart needs their names, photos and prices). Null until loaded.
let products: Product[] | null = null;
// The rows animate in only the first time they are drawn.
let firstRender = true;

function selectedDeliveryId(): string {
  return loadDeliveryId() ?? DEFAULT_DELIVERY_ID;
}

function appliedPromoCode(): string {
  return loadPromoCode() ?? "";
}

// Draws everything that depends on the cart: header badge, rows and the money summary.
function refresh(changedId: number | null = null): void {
  const lines = cartLines(loadCart(), products ?? []);
  const count = countItems(lines);
  renderCartBadge(count);
  if (products !== null) {
    renderCartPage(lines, { firstRender, changedId, count });
    firstRender = false;
  }
  const promo = findPromo(PROMO_CODES, appliedPromoCode());
  const delivery = findDelivery(DELIVERY_OPTIONS, selectedDeliveryId());
  renderSummary(orderSummary(cartTotal(lines), promo, delivery), count);
}

// Handles every state of the products request: loading, error, empty and success.
function onProductsState(state: ApiState<Product[]>): void {
  if (state.status === "loading" || state.status === "error") {
    renderCartMessage(state);
    return;
  }
  products = state.status === "success" ? state.data : [];
  refresh();
}

function startLoadingProducts(): void {
  void loadProducts(onProductsState);
}

onCartAction(async (action, id) => {
  const removes = action === "remove" || (action === "decrease" && isLastOne(loadCart(), id));
  if (removes) {
    await animateRowOut(id);
    removeFromCart(id);
    refresh();
    return;
  }
  updateQty(id, action === "increase" ? QTY_STEP : -QTY_STEP);
  refresh(id);
});

onClearCart(async () => {
  await animateAllRowsOut();
  clearCart();
  refresh();
});

onCartRetry(startLoadingProducts);

renderDeliveryOptions(DELIVERY_OPTIONS, selectedDeliveryId());
onDeliveryChange((id) => {
  saveDeliveryId(id);
  refresh();
});

showPromoApplied(findPromo(PROMO_CODES, appliedPromoCode()));
onPromoSubmit((code) => {
  const promo = findPromo(PROMO_CODES, code);
  if (promo) {
    savePromoCode(promo.code);
    showPromoApplied(promo);
  } else {
    showPromoInvalid(code);
  }
  refresh();
});
onPromoRemove(() => {
  savePromoCode(null);
  showPromoApplied(null);
  refresh();
});

onCheckout(() => {
  showCheckoutMessage("This is a demo shop, so no order was sent. Your cart is still saved.");
});

startLoadingProducts();
refresh();
