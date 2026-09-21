// Premium Quick View modal — shows product details in a popup with Add to Cart.

// HTML entity escaping to prevent XSS from user-supplied product data
function _qvEscapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function openQuickView(productId) {
    let modal = document.getElementById('quick-view-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'quick-view-modal';
        modal.className = 'fixed inset-0 z-[100] hidden';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-labelledby', 'qv-title');
        modal.innerHTML = `
            <div class="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" id="qv-overlay"></div>
            <div class="absolute inset-4 sm:inset-10 md:inset-16 flex items-center justify-center">
                <div class="glass-panel rounded-2xl w-full max-w-lg relative z-10 max-h-[90vh] overflow-y-auto transform scale-95 opacity-0 transition-all duration-300" id="qv-content">
                    <div class="p-6 text-center text-white/40 flex items-center justify-center gap-2">
                        <span class="material-symbols-outlined animate-spin">progress_activity</span> Loading...
                    </div>
                </div>
            </div>`;
        document.body.appendChild(modal);
        document.getElementById('qv-overlay').addEventListener('click', closeQuickView);
    }
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // Store the element that triggered the modal for focus restoration
    modal._triggerEl = document.activeElement;

    // Animate in
    requestAnimationFrame(() => {
        const content = document.getElementById('qv-content');
        content.style.transform = 'scale(1)';
        content.style.opacity = '1';
        // Focus the close button once content loads
        const closeBtn = content.querySelector('[aria-label="Close quick view"]');
        if (closeBtn) closeBtn.focus();
    });
    loadQuickView(productId);
}

function closeQuickView() {
    const modal = document.getElementById('quick-view-modal');
    if (!modal) return;
    const content = document.getElementById('qv-content');
    content.style.transform = 'scale(0.95)';
    content.style.opacity = '0';
    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
        // Restore focus to the trigger element
        if (modal._triggerEl) modal._triggerEl.focus();
    }, 200);
}

// Focus trap — keeps Tab cycling inside the modal
function _trapFocus(e) {
    const modal = document.getElementById('quick-view-modal');
    if (!modal || modal.classList.contains('hidden')) return;
    if (e.key !== 'Tab') return;

    const focusable = modal.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
    }
}

async function loadQuickView(id) {
    const content = document.getElementById('qv-content');
    try {
        const { data: p, error } = await supabaseClient.from('public_products').select('*').eq('id', id).single();
        if (error || !p) { content.innerHTML = '<div class="p-6 text-center text-red-400">Product not found.</div>'; return; }
        const img = (p.images && p.images[0]) || 'https://placehold.co/600x400/171f33/dae2fd?text=Laptop+Point';
        const price = p.discount_price
            ? `<span class="text-xl font-bold text-tertiary">Rs. ${Number(p.discount_price).toLocaleString()}</span><span class="text-sm text-white/40 line-through ml-2">Rs. ${Number(p.price).toLocaleString()}</span>`
            : `<span class="text-xl font-bold text-tertiary">Rs. ${Number(p.price).toLocaleString()}</span>`;
        const avail = { in_stock: '<span class="text-green-400 text-xs font-medium">In Stock</span>', low_stock: '<span class="text-yellow-400 text-xs font-medium">Low Stock</span>', out_of_stock: '<span class="text-red-400 text-xs font-medium">Out of Stock</span>' };

        content.innerHTML = `
            <button onclick="closeQuickView()" class="absolute top-4 right-4 text-white/50 hover:text-white z-10 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center transition-colors" aria-label="Close quick view"><span class="material-symbols-outlined text-lg">close</span></button>
            <div class="h-56 w-full overflow-hidden rounded-t-2xl relative">
                <img src="${_qvEscapeHtml(img)}" alt="${_qvEscapeHtml(p.name)}" class="w-full h-full object-cover"/>
                <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
            <div class="p-6">
                <div class="flex items-center gap-2 mb-2">
                    <span class="text-xs uppercase tracking-wider text-primary font-medium">${_qvEscapeHtml(p.category)}</span>
                    <span class="text-white/20">·</span>
                    ${avail[p.availability] || ''}
                </div>
                <h3 class="text-lg font-bold mb-2">${_qvEscapeHtml(p.name)}</h3>
                <p class="text-sm text-white/50 mb-4 line-clamp-2">${_qvEscapeHtml(p.description || '')}</p>
                <div class="flex items-center gap-3 mb-5">${price}</div>
                <div class="flex gap-3">
                    <a href="product.html?id=${_qvEscapeHtml(p.id)}" class="flex-1 text-center bg-gradient-to-r from-[#a855f7] to-[#3b82f6] text-white py-2.5 rounded-lg text-sm font-medium uppercase tracking-wider hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all">View Details</a>
                    <button onclick="quickViewAddToCart('${_qvEscapeHtml(p.id)}')" class="quickview-cart-btn flex items-center gap-2 bg-white/10 border border-white/20 text-white py-2.5 px-5 rounded-lg text-sm font-medium hover:bg-white/15 transition-all" aria-label="Add ${_qvEscapeHtml(p.name)} to cart">
                        <span class="material-symbols-outlined text-lg">shopping_cart</span>Add
                    </button>
                </div>
            </div>`;
    } catch(e) { content.innerHTML = '<div class="p-6 text-center text-red-400">Error loading product.</div>'; }
}

async function quickViewAddToCart(productId) {
    if (typeof addToCart !== 'function' || typeof supabaseClient === 'undefined') return;
    const { data } = await supabaseClient.from('public_products').select('*').eq('id', productId).single();
    if (data) {
        addToCart(data, 1);
        updateCartCount();
        if (typeof Toast !== 'undefined') Toast.success(`${data.name} added to cart`);
        closeQuickView();
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeQuickView();
    _trapFocus(e);
});
