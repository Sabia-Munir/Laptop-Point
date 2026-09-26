// Shared product card rendering — used by index.html (homepage rows) and
// shop.html (full filterable listing). Keeping this in one place means both
// pages always look identical instead of drifting apart over edits.

// HTML entity escaping to prevent XSS from user-supplied product data
function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

const availabilityLabel = {
    in_stock: '<span class="text-green-400">In Stock</span>',
    low_stock: '<span class="text-yellow-400">Low Stock</span>',
    out_of_stock: '<span class="text-red-400">Out of Stock</span>',
};

// fixedWidth: true = card has a set width for horizontal-scroll rows (homepage).
// fixedWidth: false = card fills its grid cell (shop.html's responsive grid).
function renderProductCard(p, fixedWidth) {
    const img = (p.images && p.images[0]) || 'https://placehold.co/600x400/171f33/dae2fd?text=Laptop+Point';
    const widthClass = fixedWidth ? 'flex-none w-72 sm:w-80 snap-start' : '';
    const priceHTML = p.discount_price
        ? `<span class="font-body-lg text-body-lg font-bold text-tertiary">Rs. ${Number(p.discount_price).toLocaleString()}</span>
           <span class="text-xs text-on-surface-variant line-through ml-1">Rs. ${Number(p.price).toLocaleString()}</span>`
        : `<span class="font-body-lg text-body-lg font-bold text-tertiary">Rs. ${Number(p.price).toLocaleString()}</span>`;

    return `
    <a href="product.html?id=${escapeHtml(p.id)}" class="glass-panel neon-border rounded-xl overflow-hidden flex flex-col group cursor-pointer ${widthClass} hover-lift tilt-card premium-overlay">
        <div class="h-64 w-full bg-surface-container relative overflow-hidden theme-tint product-image-zoom">
            <img alt="${escapeHtml(p.name)}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" src="${escapeHtml(img)}" onerror="this.onerror=null;this.src='https://placehold.co/600x400/171f33/dae2fd?text=Laptop+Point'"/>
        </div>
        <div class="p-6 flex-grow flex flex-col justify-between">
            <div>
                <div class="flex justify-between items-center mb-3 pb-3 border-b border-white/10">
                    <span class="font-label-sm text-label-sm text-primary tracking-[0.2em] uppercase">${escapeHtml(p.category)}</span>
                    <span class="text-xs uppercase tracking-wide">${availabilityLabel[p.availability] || ''}</span>
                </div>
                <h3 class="font-headline-md text-headline-md text-on-surface mb-2">${escapeHtml(p.name)}</h3>
                <p class="font-body-md text-body-md text-on-surface-variant mb-6">${escapeHtml(p.description || '')}</p>
            </div>
            <div class="flex justify-between items-center mt-auto">
                ${priceHTML}
                <span class="flex items-center gap-1.5 font-label-sm text-label-sm uppercase tracking-wider text-on-surface group-hover:text-primary transition-colors">View <span class="material-symbols-outlined text-base">arrow_forward</span></span>
            </div>
        </div>
        <button class="quick-view-btn absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" data-product-id="${escapeHtml(p.id)}" onclick="event.preventDefault(); event.stopPropagation(); openQuickView('${escapeHtml(p.id)}')" aria-label="Quick view ${escapeHtml(p.name)}">
            <span class="material-symbols-outlined text-sm">visibility</span>
        </button>
    </a>`;
}

// "View All" card shown at the end of a homepage horizontal row, linking to
// the full filterable listing page.
function renderViewAllCard(href) {
    return `
    <a href="${href}" class="glass-panel neon-border rounded-xl overflow-hidden flex-none w-72 sm:w-80 snap-start flex flex-col items-center justify-center gap-3 text-center p-8 group cursor-pointer">
        <span class="material-symbols-outlined text-4xl text-primary group-hover:scale-110 transition-transform">arrow_forward</span>
        <span class="font-label-sm text-label-sm uppercase tracking-wider text-on-surface group-hover:text-primary transition-colors">View All</span>
    </a>`;
}
