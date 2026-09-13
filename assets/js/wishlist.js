// Wishlist — localStorage-based, toggleable per product.
// Usage: toggleWishlist(product), isInWishlist(id), getWishlist(), renderWishlistCount()

const WISHLIST_KEY = 'lp_wishlist';

function getWishlist() {
    try { return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || []; }
    catch { return []; }
}

function isInWishlist(id) {
    return getWishlist().some(p => p.id === id);
}

function toggleWishlist(product) {
    if (!product || !product.id) return;
    const list = getWishlist();
    const idx = list.findIndex(p => p.id === product.id);
    if (idx >= 0) {
        list.splice(idx, 1);
        if (typeof Toast !== 'undefined') Toast.info('Removed from wishlist');
    } else {
        list.push({
            id: product.id, name: product.name,
            price: product.discount_price || product.price,
            image: (product.images && product.images[0]) || '',
            category: product.category
        });
        if (typeof Toast !== 'undefined') Toast.success('Added to wishlist');
    }
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
    renderWishlistCount();
    updateWishlistButtons();
}

function renderWishlistCount() {
    const el = document.getElementById('wishlist-count');
    if (!el) return;
    const count = getWishlist().length;
    el.textContent = count;
    el.classList.toggle('hidden', count === 0);
}

function updateWishlistButtons() {
    document.querySelectorAll('.wishlist-toggle').forEach(btn => {
        const id = btn.dataset.productId;
        const filled = isInWishlist(id);
        btn.innerHTML = `<span class="material-symbols-outlined text-xl">${filled ? 'favorite' : 'favorite_border'}</span>`;
        btn.classList.toggle('text-red-400', filled);
    });
}

function renderWishlistPage(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const items = getWishlist();
    if (items.length === 0) {
        container.innerHTML = '<div class="text-center py-12 text-white/40"><p class="mb-3">Your wishlist is empty.</p><a href="shop.html" class="text-sm text-[#c9a6f5] hover:underline">Browse products</a></div>';
        return;
    }
    container.innerHTML = items.map(p => `
        <div class="glass-panel rounded-xl p-4 flex items-center gap-4">
            <a href="product.html?id=${p.id}"><img src="${p.image}" class="w-16 h-16 rounded-lg object-cover"/></a>
            <div class="flex-1">
                <a href="product.html?id=${p.id}" class="font-medium hover:text-primary transition-colors">${p.name}</a>
                <div class="text-sm text-tertiary mt-1">Rs. ${Number(p.price).toLocaleString()}</div>
            </div>
            <button class="wishlist-remove text-white/30 hover:text-red-400" data-id="${p.id}">
                <span class="material-symbols-outlined">delete</span>
            </button>
        </div>`).join('');
    container.querySelectorAll('.wishlist-remove').forEach(btn => {
        btn.addEventListener('click', () => {
            const list = getWishlist().filter(p => p.id !== btn.dataset.id);
            localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
            renderWishlistPage(containerId);
            renderWishlistCount();
        });
    });
}

document.addEventListener('DOMContentLoaded', () => { renderWishlistCount(); updateWishlistButtons(); });
