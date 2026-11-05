// Vite settings: the site has two pages, so the build needs both HTML files.
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        cart: "cart.html",
      },
    },
  },
});
