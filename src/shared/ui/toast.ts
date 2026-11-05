// Toast UI: the only file that makes toasts (short messages at the bottom of the screen).
import { escapeHtml } from "../dom";
import { motionMs } from "../motion";

const TOAST_VISIBLE_MS = 3000;
const LEAVING_CLASS = "is-leaving";

// The box all toasts go into. It is made the first time it is needed. Screen readers read new toasts.
function toastRegion(): HTMLElement {
  const existing = document.querySelector<HTMLElement>(".toasts");
  if (existing) return existing;
  const region = document.createElement("div");
  region.className = "toasts";
  region.setAttribute("role", "status");
  region.setAttribute("aria-live", "polite");
  document.body.append(region);
  return region;
}

// Shows a message for a few seconds, with an optional link (for example "View cart").
export function showToast(message: string, link?: { href: string; label: string }): void {
  const toast = document.createElement("p");
  toast.className = "toast";
  toast.innerHTML = escapeHtml(message);
  if (link) {
    const anchor = document.createElement("a");
    anchor.href = link.href;
    anchor.textContent = link.label;
    toast.append(" ", anchor);
  }
  toastRegion().append(toast);
  window.setTimeout(() => {
    toast.classList.add(LEAVING_CLASS);
    window.setTimeout(() => toast.remove(), motionMs());
  }, TOAST_VISIBLE_MS);
}
