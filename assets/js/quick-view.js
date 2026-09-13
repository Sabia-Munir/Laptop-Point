// Quick View modal — shows product details in a popup without leaving the page.
// Call openQuickView(productId) to open. Fetches product from Supabase.

function openQuickView(productId) {
    let modal = document.getElementById('quick-view-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'quick-view-modal';
        modal.className = 'fixed inset-0 z-[100] flex items-center justify-center p-4';
        modal.innerHTML = `
            <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" id="qv-overlay"></div>
            <div class="glass-panel rounded-2xl w-full max-w-lg relative z-10 max-h-[90vh] overflow-y-auto" id="qv-content">
                <div class="p-6 text-center text-white/40">Loading...</div>
            </div>`;
        document.body.appendChild(modal);
        document.getElementById('qv-overlay').addEventListener('click', closeQuickView);
    }
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    loadQuickView(productId);
}

function closeQuickView() {
    const modal = document.getElementById('quick-view-modal');
    if (modal) modal.classList.add('hidden');
    document.body.style.overflow = '';
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
        const avail = { in_stock: '<span class="text-green-400 text-xs">In Stock</span>', low_stock: '<span class="text-yellow-400 text-xs">Low Stock</span>', out_of_stock: '<span class="text-red-400 text-xs">Out of Stock</span>' };
        content.innerHTML = `
            <button onclick="closeQuickView()" class="absolute top-4 right-4 text-white/50 hover:text-white z-10"><span class="material-symbols-outlined">close</span></button>
            <div class="h-56 w-full overflow-hidden rounded-t-2xl"><img src="${img}" alt="${p.name}" class="w-full h-full object-cover"/></div>
            <div class="p-6">
                <span class="text-xs uppercase tracking-wider text-primary">${p.category}</span>
                <h3 class="text-lg font-bold mt-1 mb-2">${p.name}</h3>
                <div class="flex items-center gap-3 mb-3">${price}${avail[p.availability] || ''}</div>
                <p class="text-sm text-white/50 mb-4">${p.description || ''}</p>
                <div class="flex gap-3">
                    <a href="product.html?id=${p.id}" class="flex-1 text-center bg-gradient-to-r from-[#a855f7] to-[#3b82f6] text-white py-2.5 rounded-lg text-sm font-medium uppercase tracking-wider">View Full Details</a>
                </div>
            </div>`;
    } catch(e) { content.innerHTML = '<div class="p-6 text-center text-red-400">Error loading product.</div>'; }
}

document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeQuickView(); });
