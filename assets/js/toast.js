// Premium toast notification system — swipe to dismiss, progress bar, stacked layout.

const Toast = {
    container: null,
    maxVisible: 4,

    init() {
        if (this.container) return;
        this.container = document.createElement('div');
        this.container.id = 'toast-container';
        this.container.className = 'fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none max-w-sm w-full';
        this.container.setAttribute('aria-live', 'polite');
        this.container.setAttribute('aria-atomic', 'true');
        document.body.appendChild(this.container);
    },

    show(message, type = 'success', duration = 3500) {
        this.init();

        // Remove oldest if over limit
        while (this.container.children.length >= this.maxVisible) {
            this.container.firstChild?.remove();
        }

        const toast = document.createElement('div');
        const colors = {
            success: 'border-green-500/30 text-green-400',
            error: 'border-red-500/30 text-red-400',
            info: 'border-blue-500/30 text-blue-400'
        };
        const bgColors = {
            success: 'bg-green-500/10',
            error: 'bg-red-500/10',
            info: 'bg-blue-500/10'
        };
        const icons = { success: 'check_circle', error: 'error', info: 'info' };

        toast.className = `${bgColors[type]} ${colors[type]} border backdrop-blur-xl rounded-xl px-4 py-3 shadow-2xl pointer-events-auto transform translate-x-full opacity-0 transition-all duration-400 cursor-pointer select-none relative overflow-hidden`;
        toast.innerHTML = `
            <div class="flex items-center gap-3">
                <span class="material-symbols-outlined text-xl shrink-0">${icons[type]}</span>
                <span class="text-sm font-medium flex-1">${message}</span>
                <button class="toast-close text-current opacity-40 hover:opacity-100 transition-opacity shrink-0" aria-label="Dismiss">
                    <span class="material-symbols-outlined text-lg">close</span>
                </button>
            </div>
            <div class="absolute bottom-0 left-0 h-0.5 ${type === 'success' ? 'bg-green-400' : type === 'error' ? 'bg-red-400' : 'bg-blue-400'} transition-all" style="width:100%; transition:width ${duration}ms linear;"></div>`;

        this.container.appendChild(toast);

        // Slide in
        requestAnimationFrame(() => {
            toast.style.transform = 'translateX(0)';
            toast.style.opacity = '1';
        });

        // Start progress bar
        const bar = toast.querySelector('.absolute.bottom-0');
        requestAnimationFrame(() => { bar.style.width = '0%'; });

        // Close handlers
        const dismiss = () => {
            toast.style.transform = 'translateX(120%)';
            toast.style.opacity = '0';
            clearTimeout(timer);
            setTimeout(() => toast.remove(), 400);
        };

        toast.querySelector('.toast-close').addEventListener('click', dismiss);
        toast.addEventListener('click', dismiss);

        // Swipe to dismiss
        let startX = 0, currentX = 0, swiping = false;
        toast.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; swiping = true; }, { passive: true });
        toast.addEventListener('touchmove', (e) => {
            if (!swiping) return;
            currentX = e.touches[0].clientX - startX;
            if (currentX > 0) {
                toast.style.transform = `translateX(${currentX}px)`;
                toast.style.opacity = `${1 - currentX / 200}`;
            }
        }, { passive: true });
        toast.addEventListener('touchend', () => {
            if (currentX > 80) dismiss();
            else { toast.style.transform = 'translateX(0)'; toast.style.opacity = '1'; }
            swiping = false;
        });

        const timer = setTimeout(dismiss, duration);
    },

    success(msg) { this.show(msg, 'success'); },
    error(msg) { this.show(msg, 'error'); },
    info(msg) { this.show(msg, 'info'); }
};
