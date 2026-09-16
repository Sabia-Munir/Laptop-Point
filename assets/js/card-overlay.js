// Premium card overlay — adds a hover overlay with quick action buttons to product cards.
// Usage: initCardOverlays(selector) or auto-init on '.premium-overlay'

function initCardOverlays(selector = '.premium-overlay') {
    document.querySelectorAll(selector).forEach(card => {
        if (card.querySelector('.card-actions-overlay')) return;

        // Extract product ID from the card's href
        const href = card.getAttribute('href') || '';
        const idMatch = href.match(/id=([^&]+)/);
        const productId = idMatch ? idMatch[1] : null;

        const overlay = document.createElement('div');
        overlay.className = 'card-actions-overlay';
        overlay.innerHTML = `
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-end p-4">
                <div class="flex gap-2 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    <button class="card-quick-view flex-1 bg-white/10 backdrop-blur-sm text-white text-xs font-medium py-2 rounded-lg text-center hover:bg-white/20 transition-colors" data-product-id="${productId || ''}">
                        <span class="material-symbols-outlined text-sm align-middle mr-1">visibility</span>Quick View
                    </button>
                    <button class="card-add-to-cart flex-1 bg-gradient-to-r from-[#a855f7] to-[#3b82f6] text-white text-xs font-medium py-2 rounded-lg text-center hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all" data-product-id="${productId || ''}">
                        <span class="material-symbols-outlined text-sm align-middle mr-1">shopping_cart</span>Add to Cart
                    </button>
                </div>
            </div>`;
        overlay.style.cssText = 'position:absolute;inset:0;z-index:20;pointer-events:none;';
        overlay.querySelector('.card-actions-overlay').style.pointerEvents = 'auto';

        // Quick View button
        overlay.querySelector('.card-quick-view').addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (productId && typeof openQuickView === 'function') openQuickView(productId);
        });

        // Add to Cart button
        overlay.querySelector('.card-add-to-cart').addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!productId || typeof addToCart !== 'function') return;

            // Fetch product from Supabase to get full data
            if (typeof supabaseClient !== 'undefined') {
                supabaseClient.from('public_products').select('*').eq('id', productId).single().then(({ data }) => {
                    if (data) {
                        addToCart(data, 1);
                        updateCartCount();
                        if (typeof Toast !== 'undefined') Toast.success(`${data.name} added to cart`);
                    }
                });
            }
        });

        card.appendChild(overlay);
    });
}

document.addEventListener('DOMContentLoaded', () => initCardOverlays());
