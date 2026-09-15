// Premium CTA banner — animated particle background with call-to-action.
// Usage: renderCTABanner(containerId)

function renderCTABanner(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = `
        <div class="premium-border rounded-2xl p-8 md:p-12 relative overflow-hidden group">
            <canvas id="cta-particles" class="absolute inset-0 w-full h-full pointer-events-none opacity-40"></canvas>
            <div class="absolute inset-0 bg-gradient-to-br from-[#a855f7]/10 to-[#3b82f6]/10 pointer-events-none"></div>
            <div class="relative z-10 text-center max-w-lg mx-auto">
                <span class="inline-block text-xs uppercase tracking-[0.3em] text-[#a855f7] mb-4">Limited Time Offer</span>
                <h2 class="text-2xl md:text-3xl font-bold mb-3">Upgrade Your Setup</h2>
                <p class="text-sm text-white/50 mb-6">Get up to 15% off on selected gaming laptops. Free accessories included with every purchase.</p>
                <a href="shop.html?type=laptops" class="inline-block bg-gradient-to-r from-[#a855f7] to-[#3b82f6] text-white px-8 py-3 rounded-lg text-sm font-medium uppercase tracking-wider hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all hover:scale-105">
                    Shop Now
                </a>
            </div>
        </div>`;

    // Particle animation
    const canvas = document.getElementById('cta-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let w, h;

    function resize() {
        w = canvas.width = canvas.offsetWidth;
        h = canvas.height = canvas.offsetHeight;
    }

    function createParticles() {
        particles = [];
        const count = Math.min(Math.floor((w * h) / 12000), 60);
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                r: Math.random() * 2 + 0.5,
                alpha: Math.random() * 0.5 + 0.1
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = w;
            if (p.x > w) p.x = 0;
            if (p.y < 0) p.y = h;
            if (p.y > h) p.y = 0;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(168, 85, 247, ${p.alpha})`;
            ctx.fill();
        });
        // Connect nearby particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(168, 85, 247, ${0.08 * (1 - dist / 100)})`;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(draw);
    }

    resize();
    createParticles();
    draw();
    window.addEventListener('resize', () => { resize(); createParticles(); });
}
