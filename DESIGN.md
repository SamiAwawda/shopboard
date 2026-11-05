# ShopBoard Design System

ShopBoard is a small online shop with two pages: the home page (a "Best Sellers" slider, category tiles and a sign-up form) and the cart page (cart rows, delivery, promo code and the order summary). The look is soft and friendly: white cards, a lavender and purple palette, a sky-blue shape behind the slider, round buttons and smooth motion.

The home page was built from a reference image (a "Best Sellers" slider shop): the colors were measured from it with a script, and a few were made a little darker so every text keeps at least 4.5:1 contrast. The cart page took its layout from a second reference image, with the colors of this file. The reference images are no longer in the project: this file is now the only description of the design.

This file describes the design as it is built. If you change the design, change this file too.

---

## 1. Where the design lives

| File                                  | What it holds                                                                                                          |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `style.css`                           | All styles. The tokens (colors, type, spacing, radii, shadows, motion, sizes) are CSS variables in `:root` at the top. |
| `index.html`                          | The home page: header, slider section, category tiles, sign-up, footer.                                                |
| `cart.html`                           | The cart page: header, cart rows, delivery, promo code, summary, footer.                                               |
| `src/modules/products/ui.ts`          | The slider behavior (arrows, active card, fade), the filter button and the category tiles.                             |
| `src/modules/cart/ui.ts`              | The cart rows and their motion (enter, pop, leave), the empty state.                                                   |
| `src/modules/checkout/ui.ts`          | Delivery cards, the promo code field and chip, the summary numbers.                                                    |
| `src/shared/motion.ts`                | Reads `--duration` for JavaScript motion, counts numbers, replays CSS animations.                                      |
| `src/shared/ui/header.ts`, `toast.ts` | The cart badge bump and the toasts, on every page.                                                                     |
| `Design/logo/`                        | The logo source files (SVG). The ones the site uses are copied to `public/`.                                           |

Rule: never write a color, size or duration straight into a CSS rule. Use a token, or add a new one to `:root`.

---

## 2. Logo

| File                            | Use it for                                                                                                                                                                  |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `shopboard-lockup.svg`          | Default. The site header (copied to `public/images/logo/shopboard-lockup.svg`).                                                                                             |
| `shopboard-lockup-reversed.svg` | The same on dark or photo grounds.                                                                                                                                          |
| `shopboard-mark.svg`            | Square spots: avatars, loading screens, social profiles.                                                                                                                    |
| `shopboard-mark-reversed.svg`   | The mark on dark grounds.                                                                                                                                                   |
| `shopboard-favicon.svg`         | Browser tab. `public/favicon.svg` is a copy that turns the board line white when the browser is in dark mode (the awning stays the same), so it stays visible on dark tabs. |
| `shopboard-app-icon.svg`        | Home-screen icon. Its 180×180 PNG is `public/apple-touch-icon.png`.                                                                                                         |

- **Wordmark.** "Shop" bold, "Board" regular, one word. It is outlined in the SVG, so it looks the same without the font.
- **Size.** 32px tall in the header (`--logo-height`). Never below 24px. Below that, use the favicon.
- **Colors are fixed.** The awning is always `#2D5BFF` and `#FF7A2F`. Do not recolor it to match the purple palette.
- **Don't** stretch it, add shadows or outlines, or swap the stripe order.

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<img src="/images/logo/shopboard-lockup.svg" alt="ShopBoard" width="150" height="32" />
```

---

## 3. Color

| Token             | Value     | Use                                                                                      | Contrast                       |
| ----------------- | --------- | ---------------------------------------------------------------------------------------- | ------------------------------ |
| `--ink`           | `#22292F` | Body text, nav links, icons.                                                             | 14.7:1 on white                |
| `--heading`       | `#443486` | Headings, product names, tile names, round-button icons.                                 | 10.1:1 on white, 9.0:1 on hero |
| `--ink-muted`     | `#5F5D78` | Secondary text: category under a name, placeholder, footer.                              | 6.3:1 on white, 4.8:1 on tint  |
| `--ink-soft`      | `#5F5B80` | Prices on lavender cards.                                                                | 4.8:1 on tint                  |
| `--surface`       | `#FFFFFF` | Page, cards, inputs, panels. Text on purple.                                             |                                |
| `--hero`          | `#E0F6FD` | The sky-blue shape behind the title and the slider.                                      |                                |
| `--border`        | `#EBE9F5` | Hairlines: panels, tiles, cart rows. Decoration only.                                    |                                |
| `--border-strong` | `#8E89B0` | Edges people must see: inputs, outline buttons.                                          | 3.3:1 on white                 |
| `--primary`       | `#6C63BD` | The action color: the active card, the pressed tile, primary buttons, links, focus ring. | White on it 5.1:1              |
| `--primary-deep`  | `#544996` | Dark purple: bag button on the active card, count pill, cart badge, primary hover.       | White on it 7.6:1              |
| `--primary-tint`  | `#DFDEF5` | Lavender: inactive card info boxes, button hover.                                        |                                |
| `--tile-circle`   | `#DCDCF3` | The circle behind a tile photo.                                                          |                                |
| `--disabled-bg`   | `#EBEAF3` | Disabled buttons (out of stock).                                                         |                                |
| `--disabled-ink`  | `#8A89A0` | Text and icons on disabled controls, the arrow at the end of the slider.                 |                                |

The measured colors from the image that were made darker:

| In the image    | In the site                 | Why                                                  |
| --------------- | --------------------------- | ---------------------------------------------------- |
| `#766EC3`       | `--primary` `#6C63BD`       | White text on `#766EC3` is only 4.4:1.               |
| `#8888A0`       | `--ink-muted` `#5F5D78`     | The grey under the names was 2.6:1 on lavender.      |
| faint grey edge | `--border-strong` `#8E89B0` | The search border in the image was too faint to see. |

Rules:

- Purple means "this one": the active card, the pressed tile, the main button. Don't use it for decoration.
- On purple, all text and icons are white.
- `--border` is only decoration. Anything a person has to find or use gets `--border-strong`.

---

## 4. Typography

One family: **Poppins** (Google Fonts, weights 400, 500, 600, 700), with `system-ui, sans-serif` as the fallback.

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

| Element                  | Phone     | Tablet (768px+) | Desktop (1024px+)        | Weight                         | Color                            |
| ------------------------ | --------- | --------------- | ------------------------ | ------------------------------ | -------------------------------- |
| `h1` "Best Sellers"      | 36 / 44px | 48 / 56px       | 64 / 72px                | 700                            | `--heading`                      |
| `h2` section titles      | 24 / 32px | 24 / 32px       | 28 / 36px ("Categories") | 600                            | `--heading`                      |
| Product name (card `h3`) | 26 / 32px | 26 / 32px       | 26 / 32px                | 600                            | `--heading` (white when active)  |
| Tile name                | 22 / 28px | 22 / 28px       | 26 / 30px                | 600                            | `--heading` (white when pressed) |
| Cart total               | 20 / 28px | 20 / 28px       | 20 / 28px                | 600                            | `--heading`                      |
| Body text                | 16 / 24px |                 |                          | 400                            | `--ink`                          |
| Nav link                 | 16px      | 16px            | 17px                     | 400 (500 for the current page) | `--ink`                          |
| Price                    | 16px      |                 |                          | 500                            | `--ink-soft` (white when active) |
| Button label             | 15 / 20px |                 |                          | 500                            | depends on the button            |
| Category under a name    | 15px      |                 |                          | 400                            | `--ink-muted`                    |
| Form labels              | 14px      |                 |                          | 500                            | `--ink`                          |
| Footer, count pill       | 14 / 20px |                 |                          | 400                            | `--ink-muted` / white            |
| Cart badge               | 12 / 20px |                 |                          | 600                            | white                            |

Inputs and selects are always 16px (`--input-font-size`). Below 16px, iPhone Safari zooms the page when you tap the field.

---

## 5. Spacing

| Token        | Value                                  | Use                                                                |
| ------------ | -------------------------------------- | ------------------------------------------------------------------ |
| `--space-1`  | 4px                                    | Label to input, badge padding.                                     |
| `--space-2`  | 8px                                    | Card padding (the white frame around the info box), small gaps.    |
| `--space-3`  | 12px                                   | Gap between the arrows, under a product's category.                |
| `--space-4`  | 16px                                   | Button and input side padding, gaps between tiles and form fields. |
| `--space-6`  | 24px                                   | Gap between cards, card info padding.                              |
| `--space-8`  | 32px                                   | Panel padding on tablet and up.                                    |
| `--space-12` | 48px                                   | Space between sections, room under the slider for the card shadow. |
| `--page-pad` | 16px → 24px → `clamp(32px, 4vw, 64px)` | The page's side margin on phone → tablet → desktop.                |

---

## 6. Corner radius

| Token                | Value  | Use                                                                                     |
| -------------------- | ------ | --------------------------------------------------------------------------------------- |
| `--radius-md`        | 12px   | Buttons, inputs, selects.                                                               |
| `--radius-card-info` | 22px   | The info box inside a card.                                                             |
| `--radius-lg`        | 28px   | Cards, panels (cart, sign-up), messages.                                                |
| `--radius-xl`        | 32px   | Category tiles, the bottom of the sky-blue shape.                                       |
| `--radius-full`      | 9999px | Round buttons, arrows, bag buttons, the count pill, the cart badge, tile photo circles. |

---

## 7. Shadows

| Token             | Value                                       | Use                                                                   |
| ----------------- | ------------------------------------------- | --------------------------------------------------------------------- |
| `--shadow-card`   | `0 30px 40px -24px rgba(84, 73, 150, 0.35)` | Cards, messages, the pressed tile. A soft purple glow under the item. |
| `--shadow-button` | `0 10px 24px rgba(84, 73, 150, 0.18)`       | Round white buttons: filter, arrows, bag buttons.                     |

Shadows are purple (from `--primary-deep`), never grey or black.

---

## 8. Motion

| Token         | Value                               | Use                                                                                     |
| ------------- | ----------------------------------- | --------------------------------------------------------------------------------------- |
| `--duration`  | 350ms                               | Every transition. Card entry is 1.5× (525ms).                                           |
| `--ease`      | `cubic-bezier(0.22, 0.61, 0.36, 1)` | A soft ease-out for everything.                                                         |
| `--stagger`   | 60ms                                | The delay between cards when they appear (`--i` is the card's index).                   |
| `--lift`      | -6px                                | How far a card rises on hover.                                                          |
| `--slide-in`  | 40px                                | How far a card slides in from the right (and a cart row from the left) when it appears. |
| `--rise`      | 16px                                | How far panels and toasts rise when they appear.                                        |
| `--pop-scale` | 1.3                                 | How big a number grows when it pops (quantity, cart badge, promo chip).                 |
| `--shake`     | 6px                                 | How far the promo field shakes for a wrong code.                                        |

The animations:

1. **Slide between cards.** Clicking an arrow scrolls the slider smoothly by one card. Swiping on a phone does the same.
2. **Active card.** The card at the left edge of the slider is the active one: its info box fades from lavender to purple and its text to white.
3. **Cards appear.** After loading, filtering or sorting, the cards fade in and slide from the right, one after another.
4. **Hover.** Cards rise by 6px. Round buttons grow by 6%, bag buttons by 8%.
5. **Category tile.** Pressing a tile fades it to purple, grows it 40px to the left (desktop) and opens the vertical count pill.
6. **Colors.** Links, buttons and borders fade their color changes.

On the cart page:

7. **Page opens.** The cart panel, the delivery section and the order column rise in one after another. Then the cart rows slide in from the left, one after another.
8. **Quantity.** The purple number pops when it changes. The summary numbers count up or down to their new value.
9. **Remove.** The row slides 32px to the left and fades, then folds its height to 0. Only then is it taken out of the cart, so nothing jumps.
10. **Clear cart.** Every row leaves the same way, one after another (50ms apart). Then the empty state rises in, with a bag that floats up and down.
11. **Delivery.** The chosen card gets a purple edge and a shadow, and its truck turns purple and drives 4px to the right.
12. **Promo code.** A wrong code shakes the field. A right code pops in as a lavender chip and the discount counts in.
13. **Checkout button.** It rises 2px with a shadow on hover.
14. **Header badge.** The cart count pops every time it changes (on both pages).
15. **Toast.** "Leather Tote Bag added to cart. View cart" rises in at the bottom of the screen, stays 3 seconds, then fades down.

JavaScript motion (the row leave, the counting numbers) reads `--duration` through `motionMs()`, so it stops with reduced motion too.

**Reduced motion.** When the system asks for less motion, `--duration` and `--stagger` become 0ms and the slider scrolls without smoothing. Everything still works; it just changes at once. Every new animation must use these tokens, so it turns off too.

---

## 9. Layout and breakpoints

Mobile first: base styles are for phones, then `min-width` media queries only.

|                          | Phone (base)                                               | Tablet (768px+)         | Desktop (1024px+)                                                                          |
| ------------------------ | ---------------------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------ |
| Side margin              | 16px                                                       | 24px                    | 32–64px (`clamp`)                                                                          |
| Header                   | 3 rows: logo + cart, nav, search                           | 1 row, search 220px     | 1 row, 100px tall, search 336px                                                            |
| Card width               | 78% of the screen                                          | 300px                   | 328px                                                                                      |
| Slider fade on the right | 48px                                                       | 48px                    | 240px                                                                                      |
| Category tiles           | Below the slider                                           | Below the slider        | A 400px column on the right                                                                |
| Tile photo               | 80px                                                       | 80px                    | 100px, tile 152px tall                                                                     |
| Sky-blue shape           | A panel behind the title and slider, rounded at the bottom | Same                    | Starts at the top of the page, reaches the left edge, slanted right edge (`skewX(-11deg)`) |
| Cart rows                | Name, then quantity + price, then Remove                   | One line, fixed columns | One line, fixed columns                                                                    |

The cart page:

|                | Phone (base)                                                                      | Tablet (768px+)                                                                             | Desktop (1024px+)                                                                                                                    |
| -------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Columns        | One: cart, delivery, then promo code and summary                                  | One                                                                                         | Two: cart and delivery on the left, the order column (360px) on the right, which stays in view while you scroll (`position: sticky`) |
| Cart row       | Photo (64px), name and remove on the first line; quantity and price on the second | One line: photo (80px), name, quantity, price, remove, with "Product / Count / Price" above | Same                                                                                                                                 |
| Delivery cards | One per line, the price under the name                                            | Two per line, the price under the name                                                      | Two per line, the price on the right                                                                                                 |

- **Full width.** The page fills the screen. There is no frame or window around it. The content grows until `--content-max` (1760px), then stays centered while the backgrounds still reach both edges.
- **No sideways scroll** at any width down to 320px. `.app` clips the sky-blue shape (`overflow: clip`).

---

## 10. Components

### Header

Logo on the left, then the nav (Products, Cart, Sign up), then the search field, then the cart link. The current page's link is `--heading`, weight 500, with a 2px underline 8px below the text.

### Search

A white field with a `--border-strong` edge, `--radius-md` corners and a search icon inside on the right. The label "Search products" is hidden from the screen (`.visually-hidden`) but read by screen readers. The wrapper has `role="search"`.

### Cart link

A 44×44px bag icon. The count sits on it as a small `--primary-deep` badge with white 12px text. Screen readers hear "Cart: 2".

### Buttons

| Kind              | Look                                                                                         | Where                       |
| ----------------- | -------------------------------------------------------------------------------------------- | --------------------------- |
| Default (outline) | White, `--border-strong` edge, `--ink` text. Hover: lavender fill, purple edge.              | Remove, Clear cart, + and − |
| Primary           | `--primary` fill, white text. Hover: `--primary-deep`.                                       | Create account, Try again   |
| Round             | 52px circle (60px on desktop), white, `--shadow-button`, `--heading` icon. Purple when open. | The filter button           |
| Arrow             | Like round, 52px. Disabled at the ends of the slider: no circle, `--disabled-ink`.           | Previous / next             |
| Bag               | 52px white circle with a bag icon. On the active card: `--primary-deep` with a white icon.   | Add to cart on each card    |
| Disabled          | `--disabled-bg` fill, `--disabled-ink` text, no pointer.                                     | Out-of-stock products       |

All buttons are at least 44px tall and use `--radius-md`, except the round ones.

### Inputs and selects

White, `--border-strong` edge, `--radius-md` corners, 44px tall, 16px text. Every input has a `<label>`.

### Focus

Every link, button, input and select shows a 2px `--primary` outline, 2px away from the edge, when reached with the keyboard.

### Best Sellers slider

- The `h1`, the round filter button and the two arrows sit in one row (they wrap on small phones).
- The filter button opens the sort options ("Sort by": Default, low to high, high to low). It uses `aria-expanded` and `aria-controls`.
- The track scrolls sideways and snaps to each card. The scrollbar is hidden. The right edge fades out, and the fade switches off at the last card (`.is-at-end`).
- **Card:** a white frame (`--radius-lg`, `--space-2` padding, `--shadow-card`) with the photo on top (`--card-image-ratio` 11 / 12, the whole photo visible) and an info box at the bottom (`--primary-tint`, `--radius-card-info`): name, category, price and the bag button.
- **Active card:** the first card in view. Its info box is `--primary` with white text.
- **Out of stock:** the category line says "Out of stock" and the bag button is disabled. Its label says "… is out of stock".

### Category tiles

- One tile per category: a vertical count pill (hidden), a round photo (the category's first product) and the name.
- White, `--border` edge, `--radius-xl`. Hover: purple edge.
- **Pressed:** `--primary` fill, white name, `--shadow-card`, the count pill ("4 items") appears, and on desktop the tile grows 40px to the left with its right edge staying in line.
- Pressing a tile shows only that category. Pressing it again shows all. It uses `aria-pressed`.

### Messages (the four states)

In place of the cards, a white box (`--radius-lg`, `--shadow-card`):

- **Loading:** "Loading products…" (`role="status"`).
- **Error:** "Could not load the products." with the reason, and a primary "Try again" button (`role="alert"`).
- **Empty:** "There are no products yet."
- **No match:** "No products match your search."

### Cart panel and sign-up panel

White panels with a `--border` edge, `--radius-lg` corners and `--space-8` padding (from tablet). The + and − buttons are round. The total is 20px in `--heading`. The sign-up form is at most 400px wide.

### Footer

A `--border` line on top, `--ink-muted` 14px text.

### Toast

A dark purple pill (`--heading` with white text, `--radius-full`) at the bottom center of the screen. It can carry a link ("View cart"). Screen readers hear it (`role="status"`).

## Cart page components

### Cart panel

A white panel (`--border` edge, `--radius-lg`). The `h1` "Cart" is 32px with the item count next to it in `--ink-muted` ("(4 items)"). "Clear cart" is a quiet text button with a × icon on the right. It is off when the cart is empty.

### Cart row

A white box with a `--border` edge and `--radius-md`. On hover the edge turns lavender and the card shadow appears. It holds:

- the product photo (`--cart-image`, the whole photo visible),
- the name (`--heading`, 600) and the category (`--ink-muted`, 14px),
- the quantity: a round − button, the number in a purple circle (`--qty-bubble`, white text) and a round + button,
- the line price (18px, 500),
- a round × remove button (`--ink-muted`).

Pressing − at 1 removes the row (with the leave motion).

### Empty cart

A floating bag icon in `--primary`, "Your cart is empty." and a "Browse best sellers" link that looks like a primary button.

### Delivery cards

Native radio buttons inside their label, so the whole card is clickable and the arrow keys move between them (`<fieldset>` with a hidden `<legend>`). Each card: the radio (purple when chosen), a truck in a lavender circle, the name, "Expect delivery: 4 days" and the price. The chosen card has a purple edge and a shadow.

| Option            | Days | Price |
| ----------------- | ---- | ----- |
| Standard delivery | 4    | $4.50 |
| Courier           | 2    | $7.50 |
| Express           | 1    | $9.50 |

### Promo code

One box with a `--border-strong` edge that holds the field and a primary "Apply" button. The focus ring goes around the whole box. A wrong code shows `"abc" is not a valid code. Check it and try again.` and shakes. A right code shows a chip "SAVE10 applied: 10% off" with a × to remove it. The codes are `SAVE10` (10% off) and `SHOP20` (20% off).

### Order summary

A `<dl>` under a hairline: Subtotal, Discount (shown as "-$0.00"), Delivery and Total (20px, `--heading`). Numbers use `tabular-nums` so they don't jump while they count. Total = subtotal − discount + delivery. An empty cart has no delivery cost.

### Checkout button

A full-width primary button, 52px tall. It is off for an empty cart. This is a demo shop: it shows "This is a demo shop, so no order was sent. Your cart is still saved."

---

## 11. Product photos

- **Folder:** `public/images/products/`. The whole `public/` folder:

  ```
  public/
    favicon.svg            browser tab icon (browsers look for it here)
    apple-touch-icon.png   iPhone home-screen icon (iPhones look for it here)
    images/
      logo/shopboard-lockup.svg   the header logo
      placeholder.svg             shown when a product has no photo
      products/                   one photo per product
  ```

- **Name:** the product title in lowercase with dashes, `.jpg`. "Leather Tote Bag" → `leather-tote-bag.jpg`.
- **Shape:** square, 800×800px, the product in the center with a little space around it, on its own plain background (white is best).
- **Size:** about 15–40 KB each (JPEG quality around 80%).
- **Missing photo:** the card shows `public/images/placeholder.svg` (a light purple picture icon) instead.
- **Originals:** never put full-size photos in `public/`: everything there is sent to the visitor. Keep the originals outside the project.

To make a square 800×800 copy of a photo with ffmpeg (it adds white space, it does not crop):

```bash
ffmpeg -i original.jpg -vf "scale=800:800:force_original_aspect_ratio=decrease,pad=800:800:(ow-iw)/2:(oh-ih)/2:white" -q:v 4 public/images/products/leather-tote-bag.jpg
```

For the best look, crop the empty space around the product first, so it fills the square.

---

## 12. Accessibility

- Text contrast is at least 4.5:1 everywhere (see the Color table). Control edges are at least 3:1.
- Every button, link and input is at least 44×44px.
- Inputs are 16px so phones don't zoom.
- One `h1` per page. Headings go h1 → h2 → h3 with no skipped levels.
- Every input has a `<label>`. Icon-only buttons have an `aria-label` ("Next products", "Add Leather Tote Bag to cart").
- Toggles say their state: `aria-expanded` on the filter button, `aria-pressed` on the tiles.
- Icons are decoration (`aria-hidden="true"`). Tile photos have `alt=""` because the name is right next to them. Card photos have the product name as `alt`.
- Product names from the API go through `escapeHtml` before they are put into HTML.
- All motion stops with reduced motion (see Motion).

---

## 13. Voice

Short, plain and helpful, like a good shopkeeper. Say what happened and what to do next: "Could not load the products. Try again." Use numbers and product names over adjectives. No exclamation marks in errors. Sentence case for buttons and messages ("Add to cart", "Try again", "Promo code"). The big title "Best Sellers" keeps the capitals of the reference design.

Messages in use: "Loading products…", "Loading your cart…", "Could not load the products.", "Could not load your cart.", "There are no products yet.", "No products match your search.", "Your cart is empty.", "… added to cart.", "… is not a valid code. Check it and try again."

---

## 14. Icons

Line icons drawn inline as SVG in a 24×24 box, with the `.icon` class: no fill, `currentColor` stroke, 1.75px wide, round caps and joins. They take the color of the text around them. The set: search, bag, filter (three lines), arrow left, arrow right, minus, plus, cross (×) and truck.

---

## 15. Deliberate differences from the reference images

| In the image                     | In ShopBoard                              | Why                                                       |
| -------------------------------- | ----------------------------------------- | --------------------------------------------------------- |
| "Joy" logo                       | The ShopBoard logo                        | It is our brand.                                          |
| Brands, Contacts, Blog links     | Products, Cart, Sign up                   | We have no pages for the others.                          |
| Heart (wishlist) icon            | Not shown                                 | There is no wishlist feature.                             |
| A list of chairs on the right    | Category tiles (Bags, Shoes, Accessories) | Our products come from the ShopBoard API in 3 categories. |
| Price in the vertical pill       | Number of items in the category           | A tile is a category, not one product.                    |
| A window on a lavender frame     | Full-width page                           | The frame left too much empty space on laptops.           |
| Slightly lighter purple and grey | A little darker                           | To keep 4.5:1 text contrast.                              |

The cart page image:

| In the image                    | In ShopBoard                                          | Why                                                      |
| ------------------------------- | ----------------------------------------------------- | -------------------------------------------------------- |
| Red × and "Clear cart"          | `--ink-muted`, purple on hover                        | This design system has no red.                           |
| Omniva delivery names and logos | Standard delivery, Courier, Express with a truck icon | Omniva is a real company; we don't use its name or logo. |
| "(3 products)"                  | "(4 items)"                                           | It counts every item, like the header badge.             |
| Total equals the subtotal       | Total = subtotal − discount + delivery                | The image's numbers don't add up.                        |
| A window on a lavender frame    | Full-width page                                       | Same as the home page.                                   |

---

## 16. CSS variables

The tokens at the top of `style.css` (phone values; tablet and desktop change a few, see Layout):

```css
:root {
  /* Color */
  --ink: #22292f;
  --heading: #443486;
  --ink-muted: #5f5d78;
  --ink-soft: #5f5b80;
  --surface: #ffffff;
  --hero: #e0f6fd;
  --border: #ebe9f5;
  --border-strong: #8e89b0;
  --primary: #6c63bd;
  --primary-deep: #544996;
  --primary-tint: #dfdef5;
  --tile-circle: #dcdcf3;
  --disabled-bg: #ebeaf3;
  --disabled-ink: #8a89a0;

  /* Type */
  --font-sans: Poppins, system-ui, sans-serif;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --page-pad: 16px;

  /* Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-card-info: 22px;
  --radius-lg: 28px;
  --radius-xl: 32px;
  --radius-full: 9999px;

  /* Shadow */
  --shadow-card: 0 30px 40px -24px rgba(84, 73, 150, 0.35);
  --shadow-button: 0 10px 24px rgba(84, 73, 150, 0.18);

  /* Motion */
  --duration: 350ms;
  --ease: cubic-bezier(0.22, 0.61, 0.36, 1);
  --stagger: 60ms;
  --lift: -6px;
  --slide-in: 40px;
  --rise: 16px;
  --pop-scale: 1.3;
  --shake: 6px;

  /* Sizes */
  --touch-target: 44px;
  --input-font-size: 16px;
  --focus-width: 2px;
  --logo-height: 32px;
  --round-button: 52px;
  --card-width: 78%;
  --card-image-ratio: 11 / 12;
  --tile-image: 80px;
  --tile-shift: 0px;
  --fade-width: 48px;
  --search-width: 100%;
  --content-max: 1760px;
  --cart-image: 64px;
  --cart-qty-width: 140px;
  --cart-price-width: 110px;
  --qty-bubble: 32px;
  --order-width: 360px;
}
```
