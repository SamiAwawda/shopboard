// Header UI: the cart count badge in the header, used by every page.
import { getElement } from "../dom";
import { replayClass } from "../motion";

const BUMP_CLASS = "is-bumping";

// Shows the number of items in the cart, and bumps the badge when the number changes.
export function renderCartBadge(count: number): void {
  const badge = getElement<HTMLElement>("#cart-count");
  const text = String(count);
  if (badge.textContent === text) return;
  badge.textContent = text;
  replayClass(badge, BUMP_CLASS);
}
