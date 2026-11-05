## Bug 1

- **What I saw:** The AI put 5 font files (`.ttf`) in `src/fonts/`, but `src/` must only have `.ts` files.
- **Type:** project structure (the page worked fine)
- **How I found it:** I checked the rule "every file in `src/` is `.ts`" with `find src -type f ! -name '*.ts'`.
- **Cause:** `src/fonts/*.ttf` and the `url("./src/fonts/...")` lines in `style.css`. The AI put the fonts there so Vite would bundle them.
- **Fix:** Moved the fonts to `public/fonts/` and changed the `url()` paths. Commit `9e588a4`.
- **Did I use AI? For what?** Yes. The AI made the mistake, then found and fixed it when I asked it to check the rule.

## Bug 2

- **What I saw:** Setting `cart` to `{bad` in Application > Local Storage and reloading showed a red `SyntaxError` in the Console, and the cart stopped working.
- **Type:** state / runtime
- **How I found it:** The review notes pointed at `loadCart`. I reproduced it with the Application tab and the Console.
- **Cause:** `src/modules/cart/state.ts` line 8: `JSON.parse` had no `try/catch`, so invalid JSON threw an error nobody caught. The key `"cart"` (line 5) was also too general. (`{"a":1}` was already handled by `isCart`.)
- **Fix:** Wrapped the read in `try/catch` and return `[]` on any error. Changed the keys to `shopboard-cart`, `shopboard-delivery` and `shopboard-promo`. Checked `{bad`, `{"a":1}` and an empty string: all give an empty cart with no error.
- **Did I use AI? For what?** Yes. I asked the AI to fix it after reading the review notes. It wrote the fix and tested it in a browser.
