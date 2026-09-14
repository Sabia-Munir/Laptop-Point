// Product comparison table — compare up to 3 laptops side by side.
// Usage: renderComparison(containerId, products)
// products: [{ name, processor, ram, storage, display, gpu, price }]

function renderComparison(containerId, products) {
    const container = document.getElementById(containerId);
    if (!container || !products.length) return;
    const specs = [
        { key: 'processor', label: 'Processor' },
        { key: 'ram', label: 'RAM' },
        { key: 'storage', label: 'Storage' },
        { key: 'display', label: 'Display' },
        { key: 'gpu', label: 'Graphics' },
        { key: 'price', label: 'Price' }
    ];
    container.innerHTML = `
        <div class="overflow-x-auto">
            <table class="w-full text-sm">
                <thead>
                    <tr class="border-b border-white/10">
                        <th class="text-left py-3 px-4 text-white/40 font-medium">Spec</th>
                        ${products.map(p => `<th class="text-left py-3 px-4 font-medium">${p.name}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${specs.map(s => `
                        <tr class="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td class="py-3 px-4 text-white/50">${s.label}</td>
                            ${products.map(p => `<td class="py-3 px-4">${p[s.key] || '—'}</td>`).join('')}
                        </tr>`).join('')}
                </tbody>
            </table>
        </div>`;
}
