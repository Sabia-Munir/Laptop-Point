// Smooth parallax scroll effect — elements with .parallax move at different speeds.
// data-speed="0.5" means it moves at half the scroll speed (default 0.3).

(function() {
    function initParallax() {
        const elements = document.querySelectorAll('.parallax');
        if (!elements.length) return;

        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    elements.forEach(el => {
                        const speed = parseFloat(el.dataset.speed) || 0.3;
                        const offset = scrollY * speed;
                        el.style.transform = `translate3d(0, ${offset}px, 0)`;
                    });
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    document.addEventListener('DOMContentLoaded', initParallax);
})();
