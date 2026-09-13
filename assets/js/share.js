// Social share buttons for product pages.
// Usage: renderShareButtons(containerId, url, title)

function renderShareButtons(containerId, url, title) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const platforms = [
        { name: 'WhatsApp', icon: 'chat', url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`, color: 'text-green-400' },
        { name: 'Facebook', icon: 'share', url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, color: 'text-blue-400' },
        { name: 'Twitter', icon: 'tag', url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, color: 'text-sky-400' },
        { name: 'Copy Link', icon: 'content_copy', url: null, color: 'text-white/50' }
    ];
    container.innerHTML = platforms.map(p => `
        <button class="share-btn flex items-center gap-2 text-sm ${p.color} hover:text-white transition-colors" data-url="${p.url || ''}" data-name="${p.name}" title="Share on ${p.name}">
            <span class="material-symbols-outlined text-lg">${p.icon}</span>
            <span class="hidden sm:inline">${p.name}</span>
        </button>`).join('');
    container.querySelectorAll('.share-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            if (btn.dataset.name === 'Copy Link') {
                try { await navigator.clipboard.writeText(url); if (typeof Toast !== 'undefined') Toast.success('Link copied!'); }
                catch { if (typeof Toast !== 'undefined') Toast.error('Failed to copy'); }
            } else {
                window.open(btn.dataset.url, '_blank', 'width=600,height=400');
            }
        });
    });
}
