// Animated stats counter — scrolls into view and counts up.
// Usage: renderStats(containerId, stats)
// stats: [{ value: 500, suffix: '+', label: 'Happy Customers' }, ...]

function renderStats(containerId, stats) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = `
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 stagger-reveal">
            ${stats.map((s, i) => `
                <div class="premium-border rounded-2xl p-6 text-center hover-lift group" style="transition-delay:${i * 0.05}s">
                    <div class="text-3xl md:text-4xl font-bold text-gradient-animated mb-2" data-target="${s.value}" data-suffix="${s.suffix || ''}">
                        0${s.suffix || ''}
                    </div>
                    <div class="text-sm text-white/50 tracking-wide">${s.label}</div>
                </div>`).join('')}
        </div>`;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('[data-target]').forEach(el => {
                    animateCounter(el, parseInt(el.dataset.target), el.dataset.suffix);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    observer.observe(container);
}

function animateCounter(el, target, suffix) {
    const duration = 2000;
    const start = performance.now();
    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);
        el.textContent = current.toLocaleString() + (suffix || '');
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

const DEFAULT_STATS = [
    { value: 500, suffix: '+', label: 'Happy Customers' },
    { value: 150, suffix: '+', label: 'Laptops Sold' },
    { value: 50, suffix: '+', label: 'Products Available' },
    { value: 98, suffix: '%', label: 'Satisfaction Rate' }
];
