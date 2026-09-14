// FAQ accordion component — expandable questions and answers.
// Usage: renderFAQ(containerId, items)
// items: [{ q: 'Question text?', a: 'Answer text.' }]

function renderFAQ(containerId, items) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = `<div class="space-y-3">${items.map((item, i) => `
        <div class="glass-panel rounded-xl overflow-hidden faq-item">
            <button class="faq-toggle w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors" aria-expanded="false">
                <span class="text-sm font-medium pr-4">${item.q}</span>
                <span class="material-symbols-outlined text-white/40 transition-transform duration-300 text-xl shrink-0 faq-icon">expand_more</span>
            </button>
            <div class="faq-answer max-h-0 overflow-hidden transition-all duration-300">
                <div class="px-4 pb-4 text-sm text-white/60 leading-relaxed">${item.a}</div>
            </div>
        </div>`).join('')}</div>`;
    container.querySelectorAll('.faq-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const expanded = btn.getAttribute('aria-expanded') === 'true';
            const answer = btn.nextElementSibling;
            const icon = btn.querySelector('.faq-icon');
            btn.setAttribute('aria-expanded', !expanded);
            answer.style.maxHeight = expanded ? '0' : answer.scrollHeight + 'px';
            icon.style.transform = expanded ? '' : 'rotate(180deg)';
        });
    });
}
