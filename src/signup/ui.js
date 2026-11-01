// Signup UI: the only signup file that touches the DOM.
const form = document.querySelector("#signup-form");
const status = document.querySelector("#signup-status");
const nameInput = document.querySelector("#signup-name");

// Calls handler(name) when the form is submitted and passes the browser's own validation.
export function onSignup(handler) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    handler(nameInput.value.trim());
  });
}

// Shows a welcome message and empties the form.
export function showSignupSuccess(name) {
  status.textContent = `Welcome, ${name}! Your account is ready.`;
  form.reset();
}
