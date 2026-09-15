// Premium 3D tilt effect — adds mouse-tracking perspective tilt + shine overlay.
// Usage: initTiltCards(selector) e.g. initTiltCards('.tilt-card')

function initTiltCards(selector = '.tilt-card') {
    document.querySelectorAll(selector).forEach(card => {
        card.style.transformStyle = 'preserve-3d';
        card.style.transition = 'transform 0.15s ease-out';

        let shine = card.querySelector('.card-shine');
        if (!shine) {
            shine = document.createElement('div');
            shine.className = 'card-shine';
            shine.style.cssText = 'position:absolute;inset:0;border-radius:inherit;pointer-events:none;z-index:10;opacity:0;transition:opacity 0.3s ease;background:radial-gradient(circle at var(--mx,50%) var(--my,50%),rgba(255,255,255,0.15) 0%,transparent 60%);';
            card.style.position = 'relative';
            card.appendChild(shine);
        }

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            const tiltX = (y - 0.5) * -12;
            const tiltY = (x - 0.5) * 12;
            card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
            shine.style.setProperty('--mx', (x * 100) + '%');
            shine.style.setProperty('--my', (y * 100) + '%');
            shine.style.opacity = '1';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
            shine.style.opacity = '0';
        });
    });
}

// Auto-init on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => initTiltCards());
