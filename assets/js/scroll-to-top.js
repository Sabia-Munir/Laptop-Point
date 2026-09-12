// Scroll-to-top button for Laptop Point
// Appears after scrolling down 400px, smooth-scrolls back to top.

function createScrollToTop() {
    const btn = document.createElement('button');
    btn.id = 'scroll-to-top';
    btn.className = 'fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-[#a855f7] to-[#3b82f6] text-white shadow-lg flex items-center justify-center opacity-0 pointer-events-none transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:scale-110';
    btn.setAttribute('aria-label', 'Scroll to top');
    btn.innerHTML = '<span class="material-symbols-outlined text-xl">arrow_upward</span>';
    btn.style.cssText = 'transform: translateY(20px);';
    
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    document.body.appendChild(btn);

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                if (window.scrollY > 400) {
                    btn.style.opacity = '1';
                    btn.style.pointerEvents = 'auto';
                    btn.style.transform = 'translateY(0)';
                } else {
                    btn.style.opacity = '0';
                    btn.style.pointerEvents = 'none';
                    btn.style.transform = 'translateY(20px)';
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

document.addEventListener('DOMContentLoaded', createScrollToTop);
