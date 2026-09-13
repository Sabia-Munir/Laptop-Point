// Animated number counter — counts up from 0 to target value.
// Usage: <span data-count="2499">0</span> or call animateCounter(el, 2499)

function animateCounter(el, target, duration = 1200) {
    const start = performance.now();
    const initial = 0;
    const step = (timestamp) => {
        const progress = Math.min((timestamp - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        el.textContent = Math.round(initial + (target - initial) * eased).toLocaleString();
        if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
}

function initCounters() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count, 10);
                if (!isNaN(target)) animateCounter(el, target);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-count]').forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', initCounters);
