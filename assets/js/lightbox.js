// Image lightbox — click-to-zoom overlay for product images.
// Usage: initLightbox(selector) e.g. initLightbox('.lightbox-trigger')

function initLightbox(selector = '.lightbox-trigger') {
    if (document.getElementById('lightbox-overlay')) return;
    const overlay = document.createElement('div');
    overlay.id = 'lightbox-overlay';
    overlay.className = 'fixed inset-0 z-[300] hidden';
    overlay.innerHTML = `
        <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" id="lightbox-backdrop"></div>
        <div class="absolute inset-4 sm:inset-10 md:inset-16 flex items-center justify-center">
            <button id="lightbox-close" class="absolute top-0 right-0 text-white/60 hover:text-white z-10 p-2">
                <span class="material-symbols-outlined text-3xl">close</span>
            </button>
            <img id="lightbox-img" src="" alt="" class="max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-transform duration-300 cursor-zoom-out"/>
        </div>`;
    document.body.appendChild(overlay);

    let zoomed = false;
    const img = document.getElementById('lightbox-img');

    function open(src, alt) {
        img.src = src;
        img.alt = alt || '';
        zoomed = false;
        img.style.transform = 'scale(1)';
        overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function close() {
        overlay.classList.add('hidden');
        document.body.style.overflow = '';
    }

    img.addEventListener('click', () => {
        zoomed = !zoomed;
        img.style.transform = zoomed ? 'scale(2)' : 'scale(1)';
        img.style.cursor = zoomed ? 'zoom-out' : 'zoom-in';
    });

    document.getElementById('lightbox-backdrop').addEventListener('click', close);
    document.getElementById('lightbox-close').addEventListener('click', close);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

    // Attach to all triggers
    document.querySelectorAll(selector).forEach(el => {
        el.style.cursor = 'zoom-in';
        el.addEventListener('click', (e) => {
            e.preventDefault();
            open(el.src || el.href, el.alt);
        });
    });

    return { open, close };
}

document.addEventListener('DOMContentLoaded', () => initLightbox());
