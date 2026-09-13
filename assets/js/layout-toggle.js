// Layout toggle — switches between grid and list views on shop page.
// Usage: renderLayoutToggle(containerId, callback)

function renderLayoutToggle(containerId, callback) {
    const container = document.getElementById(containerId);
    if (!container) return;
    let current = localStorage.getItem('lp_layout') || 'grid';
    container.innerHTML = `
        <div class="flex items-center gap-1 glass-panel rounded-lg p-1">
            <button class="layout-btn p-1.5 rounded-md transition-colors ${current === 'grid' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/60'}" data-layout="grid" title="Grid view">
                <span class="material-symbols-outlined text-lg">grid_view</span>
            </button>
            <button class="layout-btn p-1.5 rounded-md transition-colors ${current === 'list' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/60'}" data-layout="list" title="List view">
                <span class="material-symbols-outlined text-lg">view_list</span>
            </button>
        </div>`;
    container.querySelectorAll('.layout-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            current = btn.dataset.layout;
            localStorage.setItem('lp_layout', current);
            container.querySelectorAll('.layout-btn').forEach(b => {
                b.classList.toggle('bg-white/10', b.dataset.layout === current);
                b.classList.toggle('text-white', b.dataset.layout === current);
                b.classList.toggle('text-white/40', b.dataset.layout !== current);
            });
            if (callback) callback(current);
        });
    });
    return current;
}
