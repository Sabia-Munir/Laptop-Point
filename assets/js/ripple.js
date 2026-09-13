// Material-style ripple effect on buttons and clickable elements
// Adds a .ripple-container with expanding circle on click.

(function() {
    function createRipple(e) {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2;
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        ripple.style.cssText = `
            position: absolute; border-radius: 50%; pointer-events: none;
            width: ${size}px; height: ${size}px; left: ${x}px; top: ${y}px;
            background: rgba(255,255,255,0.15);
            transform: scale(0); animation: ripple-expand 0.6s ease-out forwards;
        `;
        el.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }

    // Inject keyframes once
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-expand {
            to { transform: scale(1); opacity: 0; }
        }
        .ripple-host { position: relative; overflow: hidden; }
    `;
    document.head.appendChild(style);

    function init() {
        document.querySelectorAll('button, a.btn-ripple').forEach(el => {
            el.classList.add('ripple-host');
            el.addEventListener('click', createRipple);
        });
    }

    document.addEventListener('DOMContentLoaded', init);
})();
