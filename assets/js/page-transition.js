// Page transition overlay — fade-to-dark when navigating between pages.
// Automatically adds exit animation to all internal links.

(function() {
    const overlay = document.createElement('div');
    overlay.id = 'page-transition';
    overlay.style.cssText = `
        position: fixed; inset: 0; z-index: 99999;
        background: #0b1326;
        opacity: 0; pointer-events: none;
        transition: opacity 0.3s ease;
    `;
    document.body.appendChild(overlay);

    function injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes page-exit {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    function init() {
        injectStyles();
        document.querySelectorAll('a[href]').forEach(link => {
            const href = link.getAttribute('href');
            // Only for internal links
            if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
            if (href.endsWith('.js') || href.endsWith('.css')) return;

            link.addEventListener('click', (e) => {
                e.preventDefault();
                overlay.style.opacity = '1';
                overlay.style.pointerEvents = 'auto';
                setTimeout(() => {
                    window.location.href = href;
                }, 250);
            });
        });
    }

    // Fade in on page load
    window.addEventListener('load', () => {
        overlay.style.transition = 'opacity 0.4s ease';
        overlay.style.opacity = '1';
        setTimeout(() => {
            overlay.style.opacity = '0';
            overlay.style.pointerEvents = 'none';
        }, 100);
    });

    document.addEventListener('DOMContentLoaded', init);
})();
