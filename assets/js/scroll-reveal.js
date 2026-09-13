// Professional scroll-triggered reveal animations for Laptop Point
// Uses IntersectionObserver for performant on-scroll animations.

(function() {
    const REVEAL_SELECTORS = [
        '.reveal', '.reveal-left', '.reveal-right', '.reveal-scale',
        '.stagger-item'
    ];

    function initReveal() {
        const elements = document.querySelectorAll(REVEAL_SELECTORS.join(', '));
        if (!elements.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -60px 0px'
        });

        elements.forEach(el => observer.observe(el));
    }

    // Stagger children inside a container
    function initStaggerContainers() {
        document.querySelectorAll('[data-stagger]').forEach(container => {
            const children = container.children;
            Array.from(children).forEach((child, i) => {
                child.classList.add('stagger-item');
                child.style.transitionDelay = (i * 80) + 'ms';
            });
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        initStaggerContainers();
        initReveal();
    });
})();
