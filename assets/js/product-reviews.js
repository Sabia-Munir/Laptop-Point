// Product reviews — renders a reviews section with average rating, star distribution, and individual reviews.
// Usage: renderProductReviews(containerId, productId, reviews)

function renderProductReviews(containerId, productId, reviews) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Filter reviews for this product
    const productReviews = reviews.filter(r => r.productId === productId);
    const avg = productReviews.length ? (productReviews.reduce((s, r) => s + r.rating, 0) / productReviews.length) : 0;
    const distribution = [0, 0, 0, 0, 0];
    productReviews.forEach(r => { if (r.rating >= 1 && r.rating <= 5) distribution[r.rating - 1]++; });

    container.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Summary -->
            <div class="glass-panel rounded-xl p-6 text-center">
                <div class="text-4xl font-bold mb-1">${avg.toFixed(1)}</div>
                <div class="flex items-center justify-center gap-0.5 mb-2">
                    ${Array(5).fill(0).map((_, i) => `<span class="material-symbols-outlined text-sm ${i < Math.round(avg) ? 'text-yellow-400' : 'text-white/20'}" style="font-variation-settings:'FILL' 1;">star</span>`).join('')}
                </div>
                <div class="text-sm text-white/50">${productReviews.length} review${productReviews.length !== 1 ? 's' : ''}</div>
                <!-- Distribution -->
                <div class="mt-4 space-y-1.5">
                    ${[5, 4, 3, 2, 1].map(star => {
                        const count = distribution[star - 1];
                        const pct = productReviews.length ? (count / productReviews.length * 100) : 0;
                        return `<div class="flex items-center gap-2 text-xs">
                            <span class="w-3 text-white/40">${star}</span>
                            <div class="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden"><div class="h-full bg-yellow-400 rounded-full" style="width:${pct}%"></div></div>
                            <span class="w-6 text-right text-white/30">${count}</span>
                        </div>`;
                    }).join('')}
                </div>
            </div>
            <!-- Reviews list -->
            <div class="md:col-span-2 space-y-3">
                ${productReviews.length === 0 ? '<p class="text-sm text-white/40 py-4">No reviews yet. Be the first to review this product!</p>' : ''}
                ${productReviews.map(r => `
                    <div class="glass-panel rounded-xl p-4">
                        <div class="flex items-center gap-3 mb-2">
                            <div class="w-8 h-8 rounded-full bg-gradient-to-br from-[#a855f7] to-[#3b82f6] flex items-center justify-center text-white text-xs font-bold">${r.author.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
                            <div>
                                <div class="text-sm font-medium">${r.author}</div>
                                <div class="flex items-center gap-0.5">${Array(5).fill(0).map((_, i) => `<span class="material-symbols-outlined text-xs ${i < r.rating ? 'text-yellow-400' : 'text-white/20'}" style="font-variation-settings:'FILL' 1;">star</span>`).join('')}</div>
                            </div>
                            <div class="ml-auto text-xs text-white/30">${r.date || ''}</div>
                        </div>
                        <p class="text-sm text-white/60">${r.text}</p>
                    </div>`).join('')}
            </div>
        </div>`;
}

// Sample product reviews
const PRODUCT_REVIEWS = [
    { productId: 'placeholder', author: 'Ahmed K.', rating: 5, text: 'Incredible performance. Runs everything I throw at it without breaking a sweat.', date: 'Sep 2026' },
    { productId: 'placeholder', author: 'Sana M.', rating: 4, text: 'Great build quality and screen. Battery could be better for the price though.', date: 'Aug 2026' },
    { productId: 'placeholder', author: 'Bilal T.', rating: 5, text: 'Perfect for my design work. The display colors are accurate and vibrant.', date: 'Sep 2026' }
];
