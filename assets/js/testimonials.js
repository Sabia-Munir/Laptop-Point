// Premium testimonial cards — renders customer reviews with star ratings.
// Usage: renderTestimonials(containerId, reviews)

function renderStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += `<span class="material-symbols-outlined text-sm ${i <= rating ? 'text-yellow-400' : 'text-white/20'}" style="font-variation-settings:'FILL' 1;">star</span>`;
    }
    return stars;
}

function renderTestimonials(containerId, reviews) {
    const container = document.getElementById(containerId);
    if (!container || !reviews.length) return;
    container.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-reveal">
            ${reviews.map(r => `
                <div class="premium-border shimmer-overlay rounded-2xl p-6 flex flex-col gap-4 hover-lift group">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-[#a855f7] to-[#3b82f6] flex items-center justify-center text-white font-bold text-sm shrink-0">
                            ${r.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                            <div class="text-sm font-semibold">${r.name}</div>
                            <div class="flex items-center gap-0.5">${renderStars(r.rating)}</div>
                        </div>
                    </div>
                    <p class="text-sm text-white/60 leading-relaxed flex-1 italic">"${r.text}"</p>
                    ${r.date ? `<div class="text-xs text-white/30 mt-auto">${r.date}</div>` : ''}
                </div>`).join('')}
        </div>`;
}

// Default reviews
const DEFAULT_REVIEWS = [
    { name: 'Ahmed R.', rating: 5, text: 'Best laptop prices in Islamabad. Bought a MacBook Pro and they even helped set it up. Genuine products, no regrets.', date: 'Aug 2026' },
    { name: 'Fatima K.', rating: 5, text: 'Ordered a gaming laptop online. Delivered next day in perfect condition. WhatsApp support is super responsive too.', date: 'Jul 2026' },
    { name: 'Hassan M.', rating: 4, text: 'Great range of accessories. The mechanical keyboard I got is top-notch. Will definitely shop here again.', date: 'Aug 2026' },
    { name: 'Sana A.', rating: 5, text: 'They helped me pick the right laptop for university. Honest advice, no pushy sales. Highly recommend Laptop Point.', date: 'Sep 2026' },
    { name: 'Bilal T.', rating: 5, text: 'Cash on delivery, genuine warranty, and real customer support. Finally a trustworthy laptop shop in Pakistan.', date: 'Jul 2026' },
    { name: 'Ayesha N.', rating: 5, text: 'Bought a headset and mouse. Both arrived quickly and work perfectly. The prices are better than Daraz too.', date: 'Sep 2026' }
];
