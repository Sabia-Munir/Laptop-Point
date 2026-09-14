// Order tracking UI — visual step tracker for order status.
// Usage: renderOrderTracker(containerId, status)
// status: 'placed' | 'confirmed' | 'shipped' | 'out_for_delivery' | 'delivered'

function renderOrderTracker(containerId, status) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const steps = [
        { key: 'placed', label: 'Placed', icon: 'receipt_long' },
        { key: 'confirmed', label: 'Confirmed', icon: 'check_circle' },
        { key: 'shipped', label: 'Shipped', icon: 'local_shipping' },
        { key: 'out_for_delivery', label: 'Out for Delivery', icon: 'directions_bike' },
        { key: 'delivered', label: 'Delivered', icon: 'home' }
    ];
    const activeIndex = steps.findIndex(s => s.key === status);
    container.innerHTML = `
        <div class="flex items-center justify-between relative px-2">
            <div class="absolute top-5 left-0 right-0 h-0.5 bg-white/10"></div>
            <div class="absolute top-5 left-0 h-0.5 bg-gradient-to-r from-[#a855f7] to-[#3b82f6] transition-all duration-500" style="width: ${(activeIndex / (steps.length - 1)) * 100}%"></div>
            ${steps.map((step, i) => {
                const isComplete = i <= activeIndex;
                return `<div class="flex flex-col items-center relative z-10">
                    <div class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isComplete ? 'bg-gradient-to-r from-[#a855f7] to-[#3b82f6] shadow-[0_0_12px_rgba(168,85,247,0.4)]' : 'bg-white/10 text-white/30'}">
                        <span class="material-symbols-outlined text-lg ${isComplete ? 'text-white' : 'text-white/30'}">${step.icon}</span>
                    </div>
                    <span class="text-[0.65rem] mt-2 text-center ${isComplete ? 'text-white/80' : 'text-white/30'}">${step.label}</span>
                </div>`;
            }).join('')}
        </div>`;
}
