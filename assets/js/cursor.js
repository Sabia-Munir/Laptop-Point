// Custom cursor follower — glowing dot that follows the mouse.
// Only activates on desktop (no touch devices).

(function() {
    if ('ontouchstart' in window) return;

    const cursor = document.createElement('div');
    cursor.id = 'cursor-follower';
    cursor.style.cssText = `
        position: fixed; width: 20px; height: 20px; border-radius: 50%;
        background: radial-gradient(circle, rgba(168,85,247,0.4), transparent 70%);
        pointer-events: none; z-index: 99999; transform: translate(-50%, -50%);
        transition: width 0.3s, height 0.3s, background 0.3s;
        mix-blend-mode: screen;
    `;
    document.body.appendChild(cursor);

    const ring = document.createElement('div');
    ring.id = 'cursor-ring';
    ring.style.cssText = `
        position: fixed; width: 40px; height: 40px; border-radius: 50%;
        border: 1px solid rgba(168,85,247,0.3);
        pointer-events: none; z-index: 99998; transform: translate(-50%, -50%);
        transition: width 0.3s, height 0.3s, border-color 0.3s;
    `;
    document.body.appendChild(ring);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        ringX += (mouseX - ringX) * 0.08;
        ringY += (mouseY - ringY) * 0.08;

        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';

        requestAnimationFrame(animate);
    }
    animate();

    // Scale up on hover over interactive elements
    document.querySelectorAll('a, button, .hover-lift, .hover-glow').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            ring.style.width = '60px';
            ring.style.height = '60px';
            ring.style.borderColor = 'rgba(168,85,247,0.6)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            ring.style.width = '40px';
            ring.style.height = '40px';
            ring.style.borderColor = 'rgba(168,85,247,0.3)';
        });
    });
})();
