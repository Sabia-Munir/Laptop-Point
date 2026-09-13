// Back-in-stock notification signup — stores emails in localStorage for out-of-stock products.
// Usage: renderStockNotification(containerId, productId, productName, availability)

const STOCK_ALERTS_KEY = 'lp_stock_alerts';

function getStockAlerts() {
    try { return JSON.parse(localStorage.getItem(STOCK_ALERTS_KEY)) || []; }
    catch { return []; }
}

function signupStockAlert(productId, email) {
    const alerts = getStockAlerts();
    if (alerts.some(a => a.productId === productId && a.email === email)) return false;
    alerts.push({ productId, email, signedUpAt: Date.now() });
    localStorage.setItem(STOCK_ALERTS_KEY, JSON.stringify(alerts));
    return true;
}

function renderStockNotification(containerId, productId, productName, availability) {
    const container = document.getElementById(containerId);
    if (!container || availability !== 'out_of_stock') { if (container) container.innerHTML = ''; return; }
    container.innerHTML = `
        <div class="glass-panel rounded-xl p-4 mt-4">
            <div class="flex items-center gap-3 mb-3">
                <span class="material-symbols-outlined text-yellow-400">notifications_active</span>
                <span class="text-sm font-medium">Get notified when back in stock</span>
            </div>
            <form class="flex gap-2" id="stock-alert-form">
                <input type="email" required placeholder="your@email.com" class="input-animated flex-1 text-sm"/>
                <button type="submit" class="bg-gradient-to-r from-[#a855f7] to-[#3b82f6] text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap">Notify Me</button>
            </form>
            <p id="stock-alert-msg" class="text-xs text-green-400 mt-2 hidden">You'll be notified when ${productName} is back!</p>
        </div>`;
    document.getElementById('stock-alert-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input').value.trim();
        if (signupStockAlert(productId, email)) {
            document.getElementById('stock-alert-msg').classList.remove('hidden');
            e.target.querySelector('input').value = '';
            if (typeof Toast !== 'undefined') Toast.success('You\'ll be notified when back in stock!');
        }
    });
}
