// Signup UI: the only signup file that touches the DOM.
import { getElement } from "../../shared/dom";

const form = getElement<HTMLFormElement>("#signup-form");
const status = getElement<HTMLElement>("#signup-status");
const nameInput = getElement<HTMLInputElement>("#signup-name");

// Calls handler(name) when the form is submitted and passes the browser's own validation.
export function onSignup(handler: (name: string) => void): void {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    handler(nameInput.value.trim());
  });
}

// Shows a welcome message and empties the form.
export function showSignupSuccess(name: string): void {
  status.textContent = `Welcome, ${name}! Your account is ready.`;
  form.reset();
}
