// Product recommendation carousel — horizontally scrolling product cards.
// Usage: renderRecommendations(containerId, products)
// products: array of product objects with { id, name, price, image, url }

function renderRecommendations(containerId, products) {
    const container = document.getElementById(containerId);
    if (!container || !products.length) return;
    container.innerHTML = `
        <div class="relative">
            <div class="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide" id="rec-scroll" style="scrollbar-width: none;">
                ${products.map(p => `
                    <a href="${p.url || 'product.html?id=' + p.id}" class="snap-start shrink-0 w-52 glass-panel rounded-xl overflow-hidden hover-lift transition-all group block">
                        <div class="h-32 bg-white/5 flex items-center justify-center overflow-hidden">
                            ${p.image ? `<img src="${p.image}" alt="${p.name}" class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"/>` : `<span class="material-symbols-outlined text-white/10 text-5xl">laptop_mac</span>`}
                        </div>
                        <div class="p-3">
                            <div class="text-xs font-medium text-white/80 truncate">${p.name}</div>
                            <div class="text-sm font-bold text-primary mt-1">Rs. ${(p.price || 0).toLocaleString()}</div>
                        </div>
                    </a>`).join('')}
            </div>
            <button class="absolute left-0 top-1/2 -translate-y-1/2 -ml-3 w-8 h-8 glass-panel rounded-full flex items-center justify-center text-white/60 hover:text-white z-10" onclick="document.getElementById('rec-scroll').scrollBy({left:-220,behavior:'smooth'})">
                <span class="material-symbols-outlined text-lg">chevron_left</span>
            </button>
            <button class="absolute right-0 top-1/2 -translate-y-1/2 -mr-3 w-8 h-8 glass-panel rounded-full flex items-center justify-center text-white/60 hover:text-white z-10" onclick="document.getElementById('rec-scroll').scrollBy({left:220,behavior:'smooth'})">
                <span class="material-symbols-outlined text-lg">chevron_right</span>
            </button>
        </div>`;
}
