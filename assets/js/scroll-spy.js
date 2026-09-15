// Scroll spy — highlights active nav link based on scroll position.
// Usage: initScrollSpy()

function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    const isActive = link.getAttribute('href') === `#${id}`;
                    link.classList.toggle('text-primary', isActive);
                    link.classList.toggle('text-white/60', !isActive);
                    if (isActive) link.style.fontWeight = '600';
                    else link.style.fontWeight = '';
                });
            }
        });
    }, { rootMargin: '-20% 0px -60% 0px' });

    sections.forEach(section => observer.observe(section));
}

document.addEventListener('DOMContentLoaded', initScrollSpy);
