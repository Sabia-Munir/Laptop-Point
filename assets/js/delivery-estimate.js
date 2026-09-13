// Estimated delivery date calculator based on city.
// Renders a delivery estimate below the add-to-cart area.

const DELIVERY_ZONES = {
    islamabad: { days: [1, 2], label: '1-2 business days', fee: 'Free' },
    rawalpindi: { days: [1, 2], label: '1-2 business days', fee: 'Free' },
    lahore: { days: [2, 3], label: '2-3 business days', fee: 'Free' },
    karachi: { days: [3, 5], label: '3-5 business days', fee: 'Free' },
    peshawar: { days: [2, 4], label: '2-4 business days', fee: 'Free' },
    faisalabad: { days: [2, 4], label: '2-4 business days', fee: 'Free' },
    multan: { days: [3, 5], label: '3-5 business days', fee: 'Free' },
    default: { days: [3, 7], label: '3-7 business days', fee: 'Free' }
};

function getDeliveryEstimate(city) {
    if (!city) return DELIVERY_ZONES.default;
    const key = city.trim().toLowerCase();
    return DELIVERY_ZONES[key] || DELIVERY_ZONES.default;
}

function renderDeliveryEstimate(containerId, city) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const zone = getDeliveryEstimate(city);
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + zone.days[0]);
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + zone.days[1]);
    const formatDate = (d) => d.toLocaleDateString('en-PK', { weekday: 'short', month: 'short', day: 'numeric' });
    container.innerHTML = `
        <div class="flex items-center gap-3 text-sm">
            <span class="material-symbols-outlined text-primary text-xl">local_shipping</span>
            <div>
                <span class="text-white/70">Estimated delivery:</span>
                <span class="text-white font-medium">${formatDate(minDate)} – ${formatDate(maxDate)}</span>
            </div>
        </div>
        <div class="text-xs text-white/40 mt-1 ml-9">${zone.label} · ${zone.fee} delivery</div>`;
}
