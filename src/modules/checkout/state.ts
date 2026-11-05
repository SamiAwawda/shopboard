// Checkout state: the chosen delivery option and the applied promo code, saved in localStorage.
// Keys start with the project name, so another project on the same address can't use them.
const DELIVERY_KEY = "shopboard-delivery";
const PROMO_KEY = "shopboard-promo";

// The saved delivery option id, or null if none was chosen yet.
export function loadDeliveryId(): string | null {
  return localStorage.getItem(DELIVERY_KEY);
}

export function saveDeliveryId(id: string): void {
  localStorage.setItem(DELIVERY_KEY, id);
}

// The saved promo code, or null if none is applied.
export function loadPromoCode(): string | null {
  return localStorage.getItem(PROMO_KEY);
}

// Saves a promo code, or removes it when code is null.
export function savePromoCode(code: string | null): void {
  if (code === null) localStorage.removeItem(PROMO_KEY);
  else localStorage.setItem(PROMO_KEY, code);
}
