// Checkout types: delivery options, promo codes and the order summary.

// One way to deliver the order. The price is in cents.
export type DeliveryOption = { id: string; name: string; days: number; priceCents: number };

// A promo code and how much it takes off the subtotal, in percent.
export type Promo = { code: string; percentOff: number };

// The money lines on the cart page, all in cents.
export type OrderSummary = { subtotal: number; discount: number; delivery: number; total: number };
