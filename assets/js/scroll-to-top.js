// Scroll-to-top button — appears after 400px, pulse glow, moves above FAB on mobile.

function createScrollToTop() {
    // Remove existing FAB if present (conflicts with scroll-to-top)
    const existingFab = document.getElementById('fab-container');
    if (existingFab) existingFab.style.bottom = '5.5rem';

    const btn = document.createElement('button');
    btn.id = 'scroll-to-top';
    btn.className = 'fixed bottom-20 right-6 sm:bottom-6 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-[#a855f7] to-[#3b82f6] text-white shadow-lg shadow-[#a855f7]/20 flex items-center justify-center opacity-0 pointer-events-none transition-all duration-300 hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] hover:scale-110';
    btn.setAttribute('aria-label', 'Scroll to top');
    btn.innerHTML = '<span class="material-symbols-outlined text-xl">arrow_upward</span>';
    btn.style.cssText = 'transform: translateY(20px);';

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    document.body.appendChild(btn);

    let ticking = false;
    let visible = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const shouldShow = window.scrollY > 400;
                if (shouldShow !== visible) {
                    visible = shouldShow;
                    btn.style.opacity = shouldShow ? '1' : '0';
                    btn.style.pointerEvents = shouldShow ? 'auto' : 'none';
                    btn.style.transform = shouldShow ? 'translateY(0)' : 'translateY(20px)';
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

document.addEventListener('DOMContentLoaded', createScrollToTop);
