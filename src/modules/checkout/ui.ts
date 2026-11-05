// Checkout UI: the only checkout file that touches the DOM (delivery, promo code, summary, checkout button).
import { escapeHtml, getElement } from "../../shared/dom";
import { formatPrice } from "../../shared/money";
import { replayClass, tweenNumber } from "../../shared/motion";
import type { DeliveryOption, OrderSummary, Promo } from "./checkout.types";

const deliveryList = getElement<HTMLElement>("#delivery-options");
const promoForm = getElement<HTMLFormElement>("#promo-form");
const promoInput = getElement<HTMLInputElement>("#promo-code");
const promoStatus = getElement<HTMLElement>("#promo-status");
const subtotalValue = getElement<HTMLElement>("#summary-subtotal");
const discountValue = getElement<HTMLElement>("#summary-discount");
const deliveryValue = getElement<HTMLElement>("#summary-delivery");
const totalValue = getElement<HTMLElement>("#summary-total");
const checkoutButton = getElement<HTMLButtonElement>("#checkout");
const checkoutStatus = getElement<HTMLElement>("#checkout-status");

const SHAKE_CLASS = "is-shaking";

const TRUCK_ICON = `
  <svg class="icon" viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
    <path d="M3 6h11v10H3z" />
    <path d="M14 10h4l3 3v3h-7" />
    <circle cx="7" cy="17.5" r="1.8" />
    <circle cx="17" cy="17.5" r="1.8" />
  </svg>`;

// "1 day" or "4 days".
function daysText(days: number): string {
  return days === 1 ? "1 day" : `${days} days`;
}

// One delivery card: a native radio button inside its label, so the whole card is clickable.
function deliveryCard(option: DeliveryOption, selectedId: string | null): string {
  const checked = option.id === selectedId ? " checked" : "";
  return `
    <label class="delivery-option">
      <input type="radio" name="delivery" value="${option.id}"${checked} />
      <span class="delivery-icon">${TRUCK_ICON}</span>
      <span class="delivery-text">
        <span class="delivery-name">${escapeHtml(option.name)}</span>
        <span class="delivery-days">Expect delivery: ${daysText(option.days)}</span>
      </span>
      <span class="delivery-price">${formatPrice(option.priceCents)}</span>
    </label>`;
}

// Draws the delivery cards with one of them chosen.
export function renderDeliveryOptions(options: DeliveryOption[], selectedId: string | null): void {
  deliveryList.innerHTML = options.map((option) => deliveryCard(option, selectedId)).join("");
}

// Calls handler with the option id when the person picks a delivery option.
export function onDeliveryChange(handler: (id: string) => void): void {
  deliveryList.addEventListener("change", (event) => {
    if (event.target instanceof HTMLInputElement) handler(event.target.value);
  });
}

// Calls handler with the typed code when the promo form is sent (the browser checks it isn't empty).
export function onPromoSubmit(handler: (code: string) => void): void {
  promoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    handler(promoInput.value);
  });
}

// Shows the applied promo as a chip with a remove button, or nothing when promo is null.
export function showPromoApplied(promo: Promo | null): void {
  promoStatus.classList.remove("is-error");
  if (!promo) {
    promoStatus.innerHTML = "";
    return;
  }
  const code = escapeHtml(promo.code);
  promoStatus.innerHTML = `
    <span class="promo-chip">
      ${code} applied: ${promo.percentOff}% off
      <button type="button" class="chip-remove" data-action="remove-promo" aria-label="Remove promo code ${code}">
        <svg class="icon" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
      </button>
    </span>`;
  promoForm.reset();
}

// Says the code was not found, and shakes the field so the eye goes there.
export function showPromoInvalid(code: string): void {
  promoStatus.classList.add("is-error");
  promoStatus.textContent = `"${code.trim()}" is not a valid code. Check it and try again.`;
  replayClass(promoForm, SHAKE_CLASS);
}

// Calls handler when the person removes the applied promo code.
export function onPromoRemove(handler: () => void): void {
  promoStatus.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    if (event.target.closest("button[data-action='remove-promo']")) handler();
  });
}

// Counts the shown price from its old value to the new one.
function animatePrice(element: HTMLElement, cents: number, sign = ""): void {
  const from = Number(element.dataset.cents ?? cents);
  element.dataset.cents = String(cents);
  tweenNumber(from, cents, (value) => {
    element.textContent = `${sign}${formatPrice(Math.round(value))}`;
  });
}

// Shows the subtotal, discount, delivery and total, and turns the checkout button off for an empty cart.
export function renderSummary(summary: OrderSummary, itemCount: number): void {
  animatePrice(subtotalValue, summary.subtotal);
  animatePrice(discountValue, summary.discount, "-");
  animatePrice(deliveryValue, summary.delivery);
  animatePrice(totalValue, summary.total);
  checkoutButton.disabled = itemCount === 0;
}

// Calls handler when "Continue to checkout" is clicked.
export function onCheckout(handler: () => void): void {
  checkoutButton.addEventListener("click", handler);
}

// Shows a short message under the checkout button.
export function showCheckoutMessage(text: string): void {
  checkoutStatus.textContent = text;
}
