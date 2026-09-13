// Trust badges — displays trust signals on product and checkout pages.
// Usage: renderTrustBadges(containerId)

function renderTrustBadges(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const badges = [
        { icon: 'verified', text: 'Genuine Products', sub: '100% authentic' },
        { icon: 'local_shipping', text: 'Free Delivery', sub: 'On orders over Rs. 50,000' },
        { icon: 'support_agent', text: '24/7 Support', sub: 'WhatsApp or call us' },
        { icon: 'replay', text: '7-Day Returns', sub: 'Easy return policy' }
    ];
    container.innerHTML = `<div class="grid grid-cols-2 sm:grid-cols-4 gap-3">${badges.map(b => `
        <div class="glass-panel rounded-xl p-3 text-center hover-lift">
            <span class="material-symbols-outlined text-primary text-2xl mb-1">${b.icon}</span>
            <div class="text-xs font-medium text-white/80">${b.text}</div>
            <div class="text-[0.65rem] text-white/40 mt-0.5">${b.sub}</div>
        </div>`).join('')}</div>`;
}
