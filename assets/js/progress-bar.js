// Premium page load progress bar — animates across the top during page load.
// Usage: just include this script, it auto-initializes.

(function() {
    const bar = document.createElement('div');
    bar.id = 'page-progress-bar';
    bar.style.cssText = 'position:fixed;top:0;left:0;height:3px;z-index:99999;background:linear-gradient(90deg,#a855f7,#3b82f6,#06b6d4,#a855f7);background-size:300% 100%;width:0%;transition:width 0.3s ease;animation:progress-gradient 2s linear infinite;box-shadow:0 0 10px rgba(168,85,247,0.5);';

    const style = document.createElement('style');
    style.textContent = `@keyframes progress-gradient { 0%{background-position:0% 0} 100%{background-position:300% 0} }`;
    document.head.appendChild(style);
    document.body.prepend(bar);

    let progress = 0;
    const interval = setInterval(() => {
        const remaining = 100 - progress;
        const step = Math.max(remaining * 0.15, 0.5);
        progress = Math.min(progress + step, 95);
        bar.style.width = progress + '%';
    }, 100);

    window.addEventListener('load', () => {
        clearInterval(interval);
        bar.style.width = '100%';
        bar.style.opacity = '0';
        bar.style.transition = 'width 0.3s ease, opacity 0.5s ease 0.3s';
        setTimeout(() => bar.remove(), 1000);
    });
})();
