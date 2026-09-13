// Stock level indicator — shows visual bar for product availability.
// Usage: <div id="stock-bar"></div> then renderStockBar('stock-bar', quantity)

function renderStockBar(containerId, quantity) {
    const container = document.getElementById(containerId);
    if (!container) return;
    let status, color, width, text;
    if (quantity === 0) {
        status = 'Out of Stock'; color = 'bg-red-500'; width = '0%'; text = 'text-red-400';
    } else if (quantity <= 3) {
        status = `Only ${quantity} left`; color = 'bg-yellow-500'; width = `${(quantity / 10) * 100}%`; text = 'text-yellow-400';
    } else if (quantity <= 10) {
        status = `${quantity} in stock`; color = 'bg-blue-500'; width = `${(quantity / 10) * 100}%`; text = 'text-blue-400';
    } else {
        status = 'In Stock'; color = 'bg-green-500'; width = '100%'; text = 'text-green-400';
    }
    container.innerHTML = `
        <div class="flex items-center justify-between text-xs mb-1.5">
            <span class="${text} font-medium">${status}</span>
        </div>
        <div class="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div class="${color} h-full rounded-full transition-all duration-500" style="width: ${width}"></div>
        </div>`;
}
