// Shared motion helpers: the motion length from the CSS tokens, and a number that counts to a new value.

const MS_PER_SECOND = 1000;

// The length of one motion in ms, read from the --duration token (0 when the system asks for less motion).
export function motionMs(): number {
  const value = getComputedStyle(document.documentElement).getPropertyValue("--duration").trim();
  const number = parseFloat(value);
  if (Number.isNaN(number)) return 0;
  return value.endsWith("ms") ? number : number * MS_PER_SECOND;
}

// Ease-out: fast at the start, slow at the end.
function easeOut(progress: number): number {
  return 1 - (1 - progress) ** 3;
}

// Counts from `from` to `to` over one motion and calls onFrame with each value in between.
export function tweenNumber(from: number, to: number, onFrame: (value: number) => void): void {
  const duration = motionMs();
  if (duration === 0 || from === to) {
    onFrame(to);
    return;
  }
  const start = performance.now();
  const step = (now: number): void => {
    const progress = Math.min((now - start) / duration, 1);
    onFrame(from + (to - from) * easeOut(progress));
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// Plays a CSS animation class again on an element, even if it is already there.
export function replayClass(element: Element, className: string): void {
  element.classList.remove(className);
  void element.getBoundingClientRect(); // forces the browser to notice the removal
  element.classList.add(className);
}
