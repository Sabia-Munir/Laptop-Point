# Laptop Point

E-commerce website for laptops and accessories. Dark glassmorphism ("Neon Flux")
theme with a scroll-reactive 3D laptop hero, live product data from Supabase, a
shopping cart, checkout, customer accounts, and an admin dashboard.

## Structure

```
laptop-point-site/
├── index.html                # Storefront — 3D hero, horizontal-scroll product rows, nav
├── shop.html                  # Full filterable listing (?type=laptops / ?type=accessories, price filter)
├── product.html                # Product detail page (gallery, specs, add to cart)
├── cart.html                    # Cart (localStorage-backed)
├── checkout.html                 # Checkout — Cash on Delivery, writes a real order
├── account.html                   # Customer login / signup / order history
├── admin/
│   ├── login.html               # Admin sign-in (Supabase Auth)
│   └── dashboard.html           # Admin CRUD: add/edit/delete products, photo upload
├── assets/
│   ├── js/
│   │   ├── supabase-client.js    # Shared Supabase client (anon key — safe to expose)
│   │   ├── cart.js               # localStorage cart helpers
│   │   ├── product-card.js       # Shared card markup (index.html + shop.html)
│   │   └── account.js            # Reflects customer login state in each page's header
│   ├── models/
│   │   └── laptop.glb            # 3D model used in the hero
│   └── reference/                # Stitch export references (not loaded by the live site)
├── database/
│   ├── schema.sql                 # Tables + RLS policies + public_products view
│   ├── place-order-function.sql       # place_order() — atomic order + stock decrement
│   ├── customer-accounts.sql          # profiles table, roles, customer order-history RLS
│   └── fix-orders-insert-policy.sql   # Legacy: allowed direct anon insert into orders
├── DESIGN.md                  # Design system exported from Stitch (colors, type, spacing)
└── README.md
```

## Status

- [x] Landing page hero (3D rotating laptop, scroll-triggered headline, mouse parallax)
- [x] Visible top nav (Home / Laptops / Accessories / Cart / Account) across every page,
      with a hamburger fallback on mobile
- [x] Homepage product rows are horizontal-scroll, each ending in a "View All" card
- [x] `shop.html` — full filterable listing per category, with a min/max price filter
- [x] Product detail page (gallery, specs, quantity picker, add to cart)
- [x] Cart (localStorage) + Checkout (Cash on Delivery) — writes a real row to `orders`
- [x] Stock decrements atomically when an order is placed (`place_order` DB function),
      so two customers can't both "win" the last unit of stock
- [x] Customer accounts — sign up / log in, order history tied to their account
      (guest checkout still works without an account)
- [x] Admin dashboard — add/edit/delete products, image upload to Supabase Storage,
      stock badges (in stock / low stock / out of stock)
- [x] Admin login (Supabase Auth, session-protected dashboard, role-based — see below)
- [x] Backend + database (products, customers, orders, stock_log, profiles — RLS on)
- [ ] JazzCash / EasyPaisa online payment (Cash on Delivery works today)
- [ ] Order confirmation email / SMS
- [ ] Deployment (in progress — see Netlify)

## Running locally

Static HTML using the Tailwind CDN build — no build step required:

```bash
# from the project folder
python3 -m http.server 8000
# then open http://localhost:8000
```

Admin dashboard: `admin/login.html` (or the "Admin" link in the mobile nav menu).
Customer account / order history: `account.html` (or the "Login" / "My Account" link
in the top nav on any page).

## Database setup

Run these once, **in this exact order**, in Supabase → SQL Editor:

1. `database/schema.sql` — tables, RLS policies, `public_products` view.
2. `database/place-order-function.sql` — the `place_order()` function checkout calls.
3. `database/customer-accounts.sql` — adds the `profiles` table (customer vs admin role),
   rewrites the admin RLS policies to check that role instead of just "is logged in", and
   lets a logged-in customer see their own orders. **Must run before step 4.**
4. Re-run `database/place-order-function.sql` a second time — it now also stamps orders
   with `customer_auth_id` so logged-in customers see them in Order History, which only
   works once the column from step 3 exists.
5. **Promote your existing admin account.** Step 3's trigger gives every new signup
   (including your own admin login) a `customer` role by default — that's intentional,
   so a public signup can never grant itself admin. Run this once, editing in your email:
   ```sql
   update profiles set role = 'admin' where id = (
     select id from auth.users where email = 'YOUR-ADMIN-EMAIL-HERE'
   );
   ```
6. `database/fix-orders-insert-policy.sql` — optional now that checkout uses `place_order()`,
   kept for reference/rollback.

Also:
- Create a Storage bucket named `product-images` (public read) — the dashboard uploads
  photos there.
- If you haven't already, create your admin user in Supabase Auth → Users (this is separate
  from customer signups, which now go through `account.html`).

## Next steps

1. **JazzCash / EasyPaisa** — API-based, non-redirect checkout, as an option alongside COD.
2. **Order confirmation** — email or SMS receipt after checkout (currently just an on-screen
   "Order placed!" message).
3. **Deployment** — connect the GitHub repo to Netlify for auto-deploy on every push.

See `DESIGN.md` for the full color palette, typography, and component rules to keep new
pages visually consistent with the rest of the site.
