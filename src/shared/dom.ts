// Shared DOM helper: finds an element by selector and throws a clear error if it is missing.
export function getElement<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) throw new Error(`Missing element: ${selector}`);
  return element;
}
