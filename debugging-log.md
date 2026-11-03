## Bug 1

- **What I saw:** Claude added files inside `src/` that don't belong there. It copied the five Shubbak font files (`.ttf`) into `src/fonts/`, so `src/` had files that are not `.ts`. The assignment says every file in `src/` must be `.ts`.
- **Type:** project structure / convention (not runtime, logic or state: the page worked fine)
- **How I found it:** I checked the code against the assignment rule "Every file in `src/` is `.ts`" with `find src -type f ! -name '*.ts'`. It listed the 5 `.ttf` files.
- **Cause:** `src/fonts/*.ttf` (5 files), and `style.css` lines 4, 10, 16, 22 and 28 pointed to them with `url("./src/fonts/...")`. Claude put the fonts in `src/` so Vite would bundle them from the CSS. It worked in the browser, but it broke the rule about what `src/` may contain. Nobody checked the new files against the project rules before committing them.
- **Fix:** Moved the fonts to `public/fonts/` with `git mv` and changed the five `url()` paths in `style.css` to `/fonts/...`. Added ESLint rules so `any`, `as` and `!` fail lint too. Then checked that `src/` has 0 non-`.ts` files, that the fonts still load in the browser, and that the build passes. Fixed in commit `9e588a4`.
- **Did I use AI? For what?** Yes. Claude Code added the font files to `src/` (the bug), and then found it and fixed it when I asked it to check the "everything in TypeScript" rule. I decided what the rule means and I reviewed the result.
