// Notification bell — dropdown showing recent activity (cart, wishlist, orders).
// Usage: initNotificationBell(triggerId)

function initNotificationBell(triggerId) {
    const trigger = document.getElementById(triggerId);
    if (!trigger) return;
    const panel = document.createElement('div');
    panel.className = 'fixed top-16 right-4 sm:right-8 w-80 glass-panel rounded-xl shadow-2xl z-[150] hidden';
    panel.id = 'notification-panel';
    document.body.appendChild(panel);
    function getNotifications() {
        const items = [];
        const cart = JSON.parse(localStorage.getItem('laptop_point_cart') || '[]');
        const wishlist = JSON.parse(localStorage.getItem('lp_wishlist') || '[]');
        if (cart.length) items.push({ icon: 'shopping_cart', text: `${cart.length} item${cart.length > 1 ? 's' : ''} in your cart`, color: 'text-primary' });
        if (wishlist.length) items.push({ icon: 'favorite', text: `${wishlist.length} item${wishlist.length > 1 ? 's' : ''} in wishlist`, color: 'text-red-400' });
        const recentViewed = JSON.parse(localStorage.getItem('lp_recently_viewed') || '[]');
        if (recentViewed.length) items.push({ icon: 'history', text: `Browsing ${recentViewed.length} recent item${recentViewed.length > 1 ? 's' : ''}`, color: 'text-blue-400' });
        if (!items.length) items.push({ icon: 'notifications_none', text: 'No notifications yet', color: 'text-white/40' });
        return items;
    }
    function render() {
        const items = getNotifications();
        panel.innerHTML = `
            <div class="p-4 border-b border-white/10 flex items-center justify-between">
                <span class="text-sm font-semibold">Notifications</span>
                <button id="notif-close" class="text-white/40 hover:text-white"><span class="material-symbols-outlined text-lg">close</span></button>
            </div>
            <div class="max-h-64 overflow-y-auto">${items.map(n => `
                <div class="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors">
                    <span class="material-symbols-outlined ${n.color} text-xl">${n.icon}</span>
                    <span class="text-sm text-white/70">${n.text}</span>
                </div>`).join('')}
            </div>`;
        panel.querySelector('#notif-close')?.addEventListener('click', () => panel.classList.add('hidden'));
    }
    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        render();
        panel.classList.toggle('hidden');
    });
    document.addEventListener('click', (e) => {
        if (!panel.contains(e.target) && !trigger.contains(e.target)) panel.classList.add('hidden');
    });
}
