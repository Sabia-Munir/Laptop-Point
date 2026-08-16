# Laptop Point

E-commerce website for laptops and accessories. Dark glassmorphism ("Neon Frost Tech")
theme with a scroll-reactive 3D laptop hero.

## Structure

```
laptop-point/
├── index.html          # Landing page (hero + product grid) — live site entry point
├── DESIGN.md           # Design system exported from Stitch (colors, type, spacing)
└── assets/
    └── reference/
        ├── landing-page-preview.png     # Stitch preview screenshot
        └── threejs-hero-standalone.html # Standalone copy of the 3D hero scene (for reference)
```

## Status

- [x] Landing page hero (3D rotating laptop, scroll-triggered headline)
- [x] Featured products grid
- [ ] Product detail page
- [ ] Admin dashboard
- [ ] Cart / checkout
- [ ] Backend + database (products, orders)
- [ ] PayFast payment integration
- [ ] Deployment

## Running locally

This is currently a static HTML file using the Tailwind CDN build, so no install step
is required yet:

```bash
# from the project folder
python3 -m http.server 8000
# then open http://localhost:8000
```

## Next steps

1. Design and export the product detail page and admin dashboard from Stitch.
2. Migrate the project into Next.js once the backend/database work starts (needed for
   dynamic product pages and the admin dashboard).
3. Wire up PayFast (API-based, non-redirect checkout) once the storefront and database
   are working end to end.

See `DESIGN.md` for the full color palette, typography, and component rules to keep
new pages visually consistent with this one.
