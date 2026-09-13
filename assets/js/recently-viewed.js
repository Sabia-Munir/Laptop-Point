// Recently viewed products — tracks last 8 viewed items in localStorage.
// Usage: trackRecentlyViewed(product) on product page, getRecentlyViewed() anywhere.

const RECENTLY_VIEWED_KEY = 'lp_recently_viewed';
const MAX_RECENT = 8;

function getRecentlyViewed() {
    try {
        return JSON.parse(localStorage.getItem(RECENTLY_VIEWED_KEY)) || [];
    } catch { return []; }
}

function trackRecentlyViewed(product) {
    if (!product || !product.id) return;
    const recent = getRecentlyViewed().filter(p => p.id !== product.id);
    recent.unshift({
        id: product.id,
        name: product.name,
        price: product.discount_price || product.price,
        image: (product.images && product.images[0]) || '',
        category: product.category,
        viewedAt: Date.now()
    });
    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(recent.slice(0, MAX_RECENT)));
}

function renderRecentlyViewed(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const items = getRecentlyViewed();
    if (items.length === 0) { container.parentElement?.classList.add('hidden'); return; }
    container.innerHTML = items.map(p => `
        <a href="product.html?id=${p.id}" class="flex-none w-48 snap-start glass-panel rounded-xl overflow-hidden hover-lift transition-all">
            <div class="h-28 w-full bg-surface-container overflow-hidden">
                <img src="${p.image}" alt="${p.name}" loading="lazy" class="w-full h-full object-cover"/>
            </div>
            <div class="p-3">
                <div class="text-xs text-white/40 truncate">${p.name}</div>
                <div class="text-sm font-bold text-tertiary mt-1">Rs. ${Number(p.price).toLocaleString()}</div>
            </div>
        </a>`).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    if (typeof renderRecentlyViewed === 'function') renderRecentlyViewed('recently-viewed-grid');
});
