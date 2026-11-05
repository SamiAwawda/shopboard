// Checkout data: the delivery options and the promo codes the shop accepts.
import type { DeliveryOption, Promo } from "./checkout.types";

export const DELIVERY_OPTIONS: DeliveryOption[] = [
  { id: "standard", name: "Standard delivery", days: 4, priceCents: 450 },
  { id: "courier", name: "Courier", days: 2, priceCents: 750 },
  { id: "express", name: "Express", days: 1, priceCents: 950 },
];

export const DEFAULT_DELIVERY_ID = "standard";

export const PROMO_CODES: Promo[] = [
  { code: "SAVE10", percentOff: 10 },
  { code: "SHOP20", percentOff: 20 },
];
