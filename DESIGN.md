---
name: Neon Flux
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#cfc2d6'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#988d9f'
  outline-variant: '#4d4354'
  surface-tint: '#ddb7ff'
  primary: '#ddb7ff'
  on-primary: '#490080'
  primary-container: '#b76dff'
  on-primary-container: '#400071'
  inverse-primary: '#842bd2'
  secondary: '#adc6ff'
  on-secondary: '#002e6a'
  secondary-container: '#0566d9'
  on-secondary-container: '#e6ecff'
  tertiary: '#89ceff'
  on-tertiary: '#00344d'
  tertiary-container: '#009ada'
  on-tertiary-container: '#002d43'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#f0dbff'
  primary-fixed-dim: '#ddb7ff'
  on-primary-fixed: '#2c0051'
  on-primary-fixed-variant: '#6900b3'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#c9e6ff'
  tertiary-fixed-dim: '#89ceff'
  on-tertiary-fixed: '#001e2f'
  on-tertiary-fixed-variant: '#004c6e'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  stack-sm: 8px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style
The design system embodies a high-performance "gamer-tech" aesthetic tailored for a premium e-commerce experience. It merges the technical precision of developer tools with the high-energy visual language of modern gaming hardware.

The style is defined by **Glassmorphism** and **Cyber-Minimalism**. It utilizes deep, obsidian-like backgrounds to provide a canvas for vibrant neon accents and translucent surfaces. The emotional goal is to evoke a sense of "premium power"—equipment that is both cutting-edge and sophisticated. Interfaces should feel like a futuristic head-up display (HUD), prioritizing clarity and speed without sacrificing visual flair.

## Colors
The palette is built on a "Deep Space" foundation using dark charcoal and navy neutrals to ensure neon accents truly pop.

- **Primary (#a855f7):** An electric violet used for primary actions, progress indicators, and "active" states.
- **Secondary (#3b82f6):** A technical blue used for links, information callouts, and secondary highlights.
- **Gradients:** Use a linear gradient from Primary to Secondary at 135 degrees for hero elements and high-impact CTAs.
- **Glass Surfaces:** Use white or light grey with 5% to 10% opacity combined with a background blur (20px+) to create the frosted-glass effect.
- **Accents:** Neon glows should use the primary or secondary colors with 20% opacity and large blur radii.

## Typography
Typography follows a "System/Technical" hierarchy. 

**Geist** is used for headlines to provide a sharp, geometric, and modern tech feel. **Inter** handles the heavy lifting for product descriptions and body copy to ensure maximum legibility during the shopping experience. **JetBrains Mono** is utilized sparingly for technical specs, price tags, and SKU labels to reinforce the "gamer-tech" aesthetic.

All headlines should use tight letter-spacing to feel "packed" and powerful. Labels should be set in uppercase when used for categorization or utility text.

## Layout & Spacing
The layout utilizes a **12-column fluid grid** for desktop and a **4-column grid** for mobile. 

The rhythm is based on a 4px baseline, but favors generous "breathing room" around glass cards to prevent the UI from feeling cluttered. Product grids should use a 24px gutter to allow for the "glow" of card borders to occupy the negative space without overlapping adjacent content. 

Margins on mobile should be kept tight (16px) to maximize the screen real estate for product imagery.

## Elevation & Depth
Depth is created through **Layered Translucency** rather than traditional drop shadows.

1.  **Base:** The dark `#0f172a` background.
2.  **Middles:** Glassmorphic cards with a `backdrop-filter: blur(12px)` and a 1px border. The border should have a linear gradient (white at 10% to white at 0%) to simulate a light catch on an edge.
3.  **Floating:** Elements that need to stand out (like the Cart or active Modals) use a subtle **Neon Rim**. This is a 1px solid border using the Primary color, paired with a matching color outer glow (`box-shadow: 0 0 15px rgba(168, 85, 247, 0.3)`).

## Shapes
This design system uses **Soft (0.25rem)** roundedness for standard elements to maintain a precise, engineered look. 

Avoid high-radius "pill" shapes for buttons or inputs, as they lean too "friendly." Instead, use the `rounded-sm` or `rounded-md` approach to keep corners tight and technical. The only exception is for circular icon-only buttons (like a "Close" or "Wishlist" button) which should remain perfectly circular.

## Components

### Buttons
- **Primary CTA:** Gradient background (Purple to Blue), bold white text, and a persistent soft glow matching the background. On hover, increase the glow intensity.
- **Ghost Action:** 1px border using a semi-transparent version of the Secondary color. No fill, white text.

### Product Cards
- **Structure:** Frosted glass background, minimal padding (16px).
- **Edge-to-edge imagery:** Images should sit at the top of the card with no top padding.
- **Hover State:** Card scales slightly (1.02x) and the border brightness increases to 100% white.

### Input Fields
- **Style:** Deep charcoal fill (darker than the page background) with a 1px border. 
- **Focus:** The border changes to the Primary neon color with a small 4px outer glow. Text should be monospaced (JetBrains Mono).

### Chips & Tags
- **Technical Specs:** Small, rectangular tags with a dark background and neon text. Use monospaced font for these to denote technical data.

### Navigation
- **Header:** Sticky glass bar with `backdrop-filter: blur(20px)`. Use a 1px bottom border to separate it from the main content.
- **Links:** Clean sans-serif, turning into a neon color on hover with a small dot or bar indicator underneath.