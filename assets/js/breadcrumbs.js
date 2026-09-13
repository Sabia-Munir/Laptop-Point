// Breadcrumbs component — renders breadcrumb navigation.
// Usage: renderBreadcrumbs(containerId, items)
// items: [{ label: 'Home', url: 'index.html' }, { label: 'Shop', url: 'shop.html' }, { label: 'MacBook Pro' }]

function renderBreadcrumbs(containerId, items) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = `<nav aria-label="Breadcrumb" class="text-xs text-white/50 mb-6">
        <ol class="flex items-center gap-1.5 flex-wrap" role="list">
            ${items.map((item, i) => {
                const isLast = i === items.length - 1;
                return `<li class="flex items-center gap-1.5">
                    ${i > 0 ? '<span class="material-symbols-outlined text-white/20 text-[14px]">chevron_right</span>' : ''}
                    ${isLast
                        ? `<span class="text-white/80" aria-current="page">${item.label}</span>`
                        : `<a href="${item.url}" class="hover:text-primary transition-colors">${item.label}</a>`}
                </li>`;
            }).join('')}
        </ol>
    </nav>`;
}
