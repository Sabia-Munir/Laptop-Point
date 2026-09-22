// Shared Tailwind CSS configuration — Neon Flux design system
// Include this AFTER the Tailwind CDN script on every page.

if (typeof tailwind !== 'undefined') {
    tailwind.config = {
        darkMode: "class",
        theme: {
            extend: {
                "colors": {
                    "on-secondary-fixed-variant": "#004395",
                    "tertiary-fixed": "#c9e6ff",
                    "tertiary-container": "#009ada",
                    "on-tertiary-container": "#002d43",
                    "surface-variant": "#2d3449",
                    "on-tertiary-fixed-variant": "#004c6e",
                    "surface-container-lowest": "#060e20",
                    "surface-bright": "#31394d",
                    "on-secondary-fixed": "#001a42",
                    "on-secondary-container": "#e6ecff",
                    "inverse-surface": "#dae2fd",
                    "secondary-fixed": "#d8e2ff",
                    "on-background": "#dae2fd",
                    "surface-container-low": "#131b2e",
                    "error": "#ffb4ab",
                    "surface-container-highest": "#2d3449",
                    "on-primary-fixed-variant": "#6900b3",
                    "primary": "#ddb7ff",
                    "on-surface-variant": "#cfc2d6",
                    "primary-fixed": "#f0dbff",
                    "on-tertiary-fixed": "#001e2f",
                    "on-primary-container": "#400071",
                    "secondary-container": "#0566d9",
                    "surface-dim": "#0b1326",
                    "outline": "#988d9f",
                    "inverse-on-surface": "#283044",
                    "primary-fixed-dim": "#ddb7ff",
                    "background": "#0b1326",
                    "surface": "#0b1326",
                    "inverse-primary": "#842bd2",
                    "on-primary-fixed": "#2c0051",
                    "outline-variant": "#4d4354",
                    "primary-container": "#b76dff",
                    "surface-tint": "#ddb7ff",
                    "on-error-container": "#ffdad6",
                    "on-surface": "#dae2fd",
                    "on-primary": "#490080",
                    "on-tertiary": "#00344d",
                    "on-secondary": "#002e6a",
                    "secondary-fixed-dim": "#adc6ff",
                    "on-error": "#690005",
                    "surface-container": "#171f33",
                    "tertiary-fixed-dim": "#89ceff",
                    "tertiary": "#89ceff",
                    "secondary": "#adc6ff",
                    "error-container": "#93000a",
                    "surface-container-high": "#222a3d"
                },
                "borderRadius": {
                    "DEFAULT": "0.125rem",
                    "lg": "0.25rem",
                    "xl": "0.5rem",
                    "full": "0.75rem"
                },
                "spacing": {
                    "stack-md": "24px",
                    "gutter": "24px",
                    "margin-mobile": "16px",
                    "stack-lg": "48px",
                    "stack-sm": "8px",
                    "container-max": "1280px",
                    "unit": "4px"
                },
                "fontFamily": {
                    "label-sm": ["JetBrains Mono"],
                    "display-lg": ["Geist"],
                    "body-md": ["Inter"],
                    "body-lg": ["Inter"],
                    "display-lg-mobile": ["Geist"],
                    "headline-md": ["Geist"]
                },
                "fontSize": {
                    "label-sm": ["12px", { "lineHeight": "1.0", "letterSpacing": "0.05em", "fontWeight": "500" }],
                    "display-lg": ["48px", { "lineHeight": "1.1", "letterSpacing": "-0.04em", "fontWeight": "800" }],
                    "body-md": ["16px", { "lineHeight": "1.5", "fontWeight": "400" }],
                    "body-lg": ["18px", { "lineHeight": "1.6", "fontWeight": "400" }],
                    "display-lg-mobile": ["32px", { "lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "800" }],
                    "headline-md": ["24px", { "lineHeight": "1.3", "fontWeight": "700" }]
                }
            }
        }
    };
}
