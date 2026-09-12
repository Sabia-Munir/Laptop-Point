// Toast notification system for Laptop Point
// Shows temporary feedback messages for cart actions, form submissions, etc.

const Toast = {
    container: null,

    init() {
        if (this.container) return;
        this.container = document.createElement('div');
        this.container.id = 'toast-container';
        this.container.className = 'fixed top-20 right-6 z-[9999] flex flex-col gap-3 pointer-events-none';
        this.container.setAttribute('aria-live', 'polite');
        this.container.setAttribute('aria-atomic', 'true');
        document.body.appendChild(this.container);
    },

    show(message, type = 'success', duration = 3000) {
        this.init();

        const toast = document.createElement('div');
        const bgColor = type === 'success' ? 'bg-green-500/15 border-green-500/30 text-green-400'
            : type === 'error' ? 'bg-red-500/15 border-red-500/30 text-red-400'
            : 'bg-blue-500/15 border-blue-500/30 text-blue-400';

        const icon = type === 'success' ? 'check_circle'
            : type === 'error' ? 'error'
            : 'info';

        toast.className = `${bgColor} border backdrop-blur-xl rounded-xl px-4 py-3 flex items-center gap-3 shadow-2xl pointer-events-auto transform translate-x-full opacity-0 transition-all duration-300`;
        toast.innerHTML = `
            <span class="material-symbols-outlined text-xl">${icon}</span>
            <span class="text-sm font-medium">${message}</span>
        `;

        this.container.appendChild(toast);

        // Slide in
        requestAnimationFrame(() => {
            toast.style.transform = 'translateX(0)';
            toast.style.opacity = '1';
        });

        // Auto dismiss
        setTimeout(() => {
            toast.style.transform = 'translateX(120%)';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    },

    success(message) { this.show(message, 'success'); },
    error(message) { this.show(message, 'error'); },
    info(message) { this.show(message, 'info'); }
};
