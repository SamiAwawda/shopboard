// Shared DOM helper: finds an element by selector and throws a clear error if it is missing.
export function getElement<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) throw new Error(`Missing element: ${selector}`);
  return element;
}

// Makes text safe to put inside HTML, so data from an API can't inject tags.
export function escapeHtml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

const PLACEHOLDER_IMAGE = "/images/placeholder.svg";

// Inside root, a photo that fails to load shows the placeholder instead (once, so it can't loop).
export function usePlaceholderImages(root: Element): void {
  root.addEventListener(
    "error",
    (event) => {
      const image = event.target;
      if (image instanceof HTMLImageElement && !image.src.endsWith(PLACEHOLDER_IMAGE)) {
        image.src = PLACEHOLDER_IMAGE;
      }
    },
    true,
  );
}
