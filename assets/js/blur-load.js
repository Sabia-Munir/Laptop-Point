// Blur-up lazy image loading — shows a blurred placeholder, fades to sharp image.
// Add class="blur-load" and data-src="real-image.jpg" to <img> tags.
// The src should be a tiny placeholder or empty.

(function() {
    const style = document.createElement('style');
    style.textContent = `
        .blur-load {
            filter: blur(10px);
            transition: filter 0.6s ease;
            transform: scale(1.02);
        }
        .blur-load.loaded {
            filter: blur(0);
            transform: scale(1);
        }
    `;
    document.head.appendChild(style);

    function initBlurLoad() {
        const images = document.querySelectorAll('.blur-load');
        if (!images.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.dataset.src || img.src;
                    if (src && img.src !== src) {
                        img.src = src;
                    }
                    img.onload = () => img.classList.add('loaded');
                    if (img.complete) img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, { rootMargin: '100px' });

        images.forEach(img => observer.observe(img));
    }

    document.addEventListener('DOMContentLoaded', initBlurLoad);
})();
