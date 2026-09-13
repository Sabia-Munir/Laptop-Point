// Empty cart / wishlist state component — renders a friendly empty state with CTA.
// Usage: renderEmptyState(containerId, { icon, title, description, buttonText, buttonUrl })

function renderEmptyState(containerId, opts = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const { icon = 'shopping_cart', title = 'Nothing here yet', description = 'Start exploring our collection.', buttonText = 'Browse Products', buttonUrl = 'shop.html' } = opts;
    container.innerHTML = `
        <div class="flex flex-col items-center justify-center py-16 px-6 text-center">
            <span class="material-symbols-outlined text-white/20 text-7xl mb-4">${icon}</span>
            <h3 class="text-lg font-semibold text-white/80 mb-2">${title}</h3>
            <p class="text-sm text-white/40 mb-6 max-w-xs">${description}</p>
            <a href="${buttonUrl}" class="bg-gradient-to-r from-[#a855f7] to-[#3b82f6] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all">
                ${buttonText}
            </a>
        </div>`;
}
