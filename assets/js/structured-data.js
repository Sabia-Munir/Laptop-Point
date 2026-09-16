// SEO structured data — injects JSON-LD schema markup for products and organization.
// Usage: initStructuredData() on product pages, initOrgSchema() on all pages.

function initOrgSchema() {
    if (document.getElementById('org-schema')) return;
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Laptop Point",
        "url": window.location.origin,
        "logo": window.location.origin + "/assets/images/logo.png",
        "description": "Premium laptops, keyboards, mice, and accessories in Pakistan.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Khanapul, Dubai Plaza",
            "addressLocality": "Islamabad",
            "addressCountry": "PK"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+92-311-5245535",
            "contactType": "customer service",
            "availableLanguage": ["English", "Urdu"]
        }
    };
    const script = document.createElement('script');
    script.id = 'org-schema';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
}

function initProductSchema(product) {
    if (document.getElementById('product-schema')) return;
    if (!product) return;
    const schema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "description": product.description || '',
        "image": product.images || [],
        "brand": {
            "@type": "Brand",
            "name": product.brand || 'Laptop Point'
        },
        "sku": product.id,
        "offers": {
            "@type": "Offer",
            "priceCurrency": "PKR",
            "price": product.discount_price || product.price,
            "availability": product.availability === 'in_stock' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
            "url": window.location.href
        }
    };
    if (product.discount_price) {
        schema.offers.highPrice = product.price;
    }
    const script = document.createElement('script');
    script.id = 'product-schema';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
}

// Auto-init org schema on all pages
document.addEventListener('DOMContentLoaded', initOrgSchema);
