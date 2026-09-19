// ═══════════════════════════════════════════════════════════
// HERO PARTICLES — Interactive canvas particle system
// Mouse-reactive particles with connections and glow
// ═══════════════════════════════════════════════════════════

(function () {
    const canvas = document.getElementById('hero-particles');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let W, H;
    let particles = [];
    let mouse = { x: null, y: null, radius: 150 };
    let animFrame;

    const CONFIG = {
        count: 80,
        maxSpeed: 0.4,
        size: 1.5,
        connectionDist: 140,
        colors: [
            'rgba(168,85,247,',
            'rgba(59,130,246,',
            'rgba(6,182,212,',
            'rgba(221,183,255,',
        ],
        mouseForce: 0.06,
        friction: 0.98,
    };

    function resize() {
        W = canvas.width = canvas.parentElement.offsetWidth;
        H = canvas.height = canvas.parentElement.offsetHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * W;
            this.y = Math.random() * H;
            this.vx = (Math.random() - 0.5) * CONFIG.maxSpeed;
            this.vy = (Math.random() - 0.5) * CONFIG.maxSpeed;
            this.size = Math.random() * CONFIG.size + 0.5;
            this.colorBase = CONFIG.colors[Math.floor(Math.random() * CONFIG.colors.length)];
            this.alpha = Math.random() * 0.5 + 0.2;
            this.pulse = Math.random() * Math.PI * 2;
            this.pulseSpeed = 0.005 + Math.random() * 0.01;
        }

        update() {
            this.pulse += this.pulseSpeed;
            const pulseAlpha = this.alpha + Math.sin(this.pulse) * 0.1;

            if (mouse.x !== null && mouse.y !== null) {
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius * CONFIG.mouseForce;
                    this.vx += (dx / dist) * force;
                    this.vy += (dy / dist) * force;
                }
            }

            this.vx *= CONFIG.friction;
            this.vy *= CONFIG.friction;

            const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            if (speed > CONFIG.maxSpeed * 1.5) {
                this.vx = (this.vx / speed) * CONFIG.maxSpeed * 1.5;
                this.vy = (this.vy / speed) * CONFIG.maxSpeed * 1.5;
            }

            this.x += this.vx;
            this.y += this.vy;

            if (this.x < -10) this.x = W + 10;
            if (this.x > W + 10) this.x = -10;
            if (this.y < -10) this.y = H + 10;
            if (this.y > H + 10) this.y = -10;

            return Math.max(0, Math.min(1, pulseAlpha));
        }

        draw(alpha) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.colorBase + alpha + ')';
            ctx.fill();

            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
            ctx.fillStyle = this.colorBase + (alpha * 0.15) + ')';
            ctx.fill();
        }
    }

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < CONFIG.connectionDist) {
                    const alpha = (1 - dist / CONFIG.connectionDist) * 0.12;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(168,85,247,${alpha})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, W, H);
        drawConnections();
        particles.forEach(p => {
            const a = p.update();
            p.draw(a);
        });
        animFrame = requestAnimationFrame(animate);
    }

    function init() {
        resize();
        particles = [];
        const count = Math.min(CONFIG.count, Math.floor((W * H) / 15000));
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
        animate();
    }

    canvas.parentElement.addEventListener('mousemove', e => {
        const rect = canvas.parentElement.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    canvas.parentElement.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            resize();
            particles.forEach(p => {
                if (p.x > W) p.x = Math.random() * W;
                if (p.y > H) p.y = Math.random() * H;
            });
        }, 200);
    });

    if (window.innerWidth < 768) {
        CONFIG.count = 35;
        CONFIG.connectionDist = 100;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!animFrame) animate();
            } else {
                cancelAnimationFrame(animFrame);
                animFrame = null;
            }
        });
    }, { threshold: 0.1 });

    if (document.getElementById('top')) {
        observer.observe(document.getElementById('top'));
    }

    init();
})();
