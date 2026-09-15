// Brand marquee — infinite horizontal scrolling brand/logo strip.
// Usage: renderMarquee(containerId, items)
// items: [{ name: 'Intel', icon: 'memory' }, ...]

function renderMarquee(containerId, items) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const duplicated = [...items, ...items, ...items];
    container.innerHTML = `
        <div class="relative overflow-hidden py-6 group">
            <div class="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0b1326] to-transparent z-10 pointer-events-none"></div>
            <div class="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0b1326] to-transparent z-10 pointer-events-none"></div>
            <div class="flex gap-12 animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]">
                ${duplicated.map(item => `
                    <div class="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/5 bg-white/[0.02] shrink-0 hover:border-[#a855f7]/30 hover:bg-[#a855f7]/5 transition-all cursor-default">
                        <span class="material-symbols-outlined text-xl text-white/30">${item.icon || 'chip'}</span>
                        <span class="text-sm text-white/40 font-medium tracking-wide">${item.name}</span>
                    </div>`).join('')}
            </div>
        </div>
        <style>
            @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }
            .animate-marquee { animation: marquee 25s linear infinite; }
        </style>`;
}

const BRAND_ITEMS = [
    { name: 'Intel', icon: 'memory' },
    { name: 'AMD', icon: 'developer_board' },
    { name: 'NVIDIA', icon: 'sports_esports' },
    { name: 'Apple', icon: 'laptop_mac' },
    { name: 'Dell', icon: 'computer' },
    { name: 'HP', icon: 'computer' },
    { name: 'Lenovo', icon: 'keyboard' },
    { name: 'ASUS', icon: 'devices' },
    { name: 'MSI', icon: 'memory' },
    { name: 'Samsung', icon: 'phone_iphone' },
    { name: 'Logitech', icon: 'mouse' },
    { name: 'HyperX', icon: 'headset' }
];
