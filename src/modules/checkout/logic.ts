// Checkout logic: pure functions for promo codes, delivery and the order total.
import type { DeliveryOption, OrderSummary, Promo } from "./checkout.types";

const PERCENT = 100;

// The promo that matches what the person typed (spaces and letter case don't matter), or null.
export function findPromo(promos: Promo[], input: string): Promo | null {
  const code = input.trim().toUpperCase();
  return promos.find((promo) => promo.code === code) ?? null;
}

// The delivery option with this id, or null.
export function findDelivery(options: DeliveryOption[], id: string): DeliveryOption | null {
  return options.find((option) => option.id === id) ?? null;
}

// Subtotal minus the promo discount plus delivery. An empty cart costs nothing to deliver.
export function orderSummary(
  subtotal: number,
  promo: Promo | null,
  delivery: DeliveryOption | null,
): OrderSummary {
  const discount = promo ? Math.round((subtotal * promo.percentOff) / PERCENT) : 0;
  const deliveryCost = subtotal > 0 && delivery ? delivery.priceCents : 0;
  return { subtotal, discount, delivery: deliveryCost, total: subtotal - discount + deliveryCost };
}
