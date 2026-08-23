# Laptop Point

E-commerce website for laptops and accessories. Dark glassmorphism ("Neon Flux")
theme with a scroll-reactive 3D laptop hero, live product data from Supabase, a
working shopping cart and checkout, and an admin dashboard.

## Structure

```
laptop-point-site/
├── index.html                # Storefront — 3D hero, live Laptops/Accessories grids, nav menu
├── product.html               # Product detail page (gallery, specs, add to cart)
├── cart.html                  # Cart (localStorage-backed)
├── checkout.html               # Checkout — Cash on Delivery, writes a real order
├── admin/
│   ├── login.html               # Admin sign-in (Supabase Auth)
│   └── dashboard.html           # Admin CRUD: add/edit/delete products, photo upload
├── assets/
│   ├── js/
│   │   ├── supabase-client.js    # Shared Supabase client (anon key — safe to expose)
│   │   └── cart.js               # localStorage cart helpers, shared by product/cart/checkout
│   ├── models/
│   │   └── laptop.glb            # 3D model used in the hero
│   └── reference/                # Stitch export references (not loaded by the live site)
├── database/
│   ├── schema.sql                 # Tables + RLS policies + public_products view
│   ├── fix-orders-insert-policy.sql   # Legacy: allowed direct anon insert into orders
│   └── place-order-function.sql       # place_order() — atomic order + stock decrement
├── DESIGN.md                  # Design system exported from Stitch (colors, type, spacing)
└── README.md
```

## Status

- [x] Landing page hero (3D rotating laptop, scroll-triggered headline, mouse parallax)
- [x] Working nav menu (hamburger → Home / Laptops / Accessories / Cart / Admin)
- [x] Featured products grid — live from Supabase (`public_products` view), split into
      Laptops / Accessories
- [x] Product detail page (gallery, specs, quantity picker, add to cart)
- [x] Cart (localStorage) + Checkout (Cash on Delivery) — writes a real row to `orders`
- [x] Stock decrements atomically when an order is placed (`place_order` DB function),
      so two customers can't both "win" the last unit of stock
- [x] Admin dashboard — add/edit/delete products, image upload to Supabase Storage,
      stock badges (in stock / low stock / out of stock)
- [x] Admin login (Supabase Auth, session-protected dashboard)
- [x] Backend + database (products, customers, orders, stock_log — Row Level Security on)
- [ ] JazzCash / EasyPaisa online payment (Cash on Delivery works today)
- [ ] Order confirmation email / SMS
- [ ] Deployment

## Running locally

Static HTML using the Tailwind CDN build — no build step required:

```bash
# from the project folder
python3 -m http.server 8000
# then open http://localhost:8000
```

Reach the dashboard from the storefront's hamburger menu → **Admin**, or go directly to
`admin/login.html`.

## Database setup

Run these once, in order, in Supabase → SQL Editor:

1. `database/schema.sql` — tables, RLS policies, `public_products` view.
2. `database/place-order-function.sql` — the `place_order()` function checkout calls.
3. `database/fix-orders-insert-policy.sql` — optional now that checkout uses `place_order()`,
   kept for reference/rollback.

Also:
- Create a Storage bucket named `product-images` (public read) — the dashboard uploads
  photos there.
- Create at least one user in Supabase Auth → Users to sign in to the dashboard with.

## Next steps

1. **JazzCash / EasyPaisa** — API-based, non-redirect checkout, as an option alongside COD.
2. **Order confirmation** — email or SMS receipt after checkout (currently just an on-screen
   "Order placed!" message).
3. **Deployment** — push to GitHub, deploy as a static site on Netlify/Vercel/GitHub Pages.
   No build step needed since it's plain HTML/JS.

See `DESIGN.md` for the full color palette, typography, and component rules to keep new
pages visually consistent with the rest of the site.
