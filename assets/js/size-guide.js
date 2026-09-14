// Size guide modal — shows laptop size comparisons and recommendations.
// Usage: renderSizeGuide(triggerId) — binds click on trigger to open modal

function renderSizeGuide(triggerId) {
    const trigger = document.getElementById(triggerId);
    if (!trigger) return;
    const modal = document.createElement('div');
    modal.id = 'size-guide-modal';
    modal.className = 'fixed inset-0 z-[200] hidden';
    modal.innerHTML = `
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" id="size-guide-overlay"></div>
        <div class="absolute inset-4 sm:inset-10 md:inset-20 glass-panel rounded-2xl overflow-hidden flex flex-col animate-slide-up">
            <div class="flex items-center justify-between p-5 border-b border-white/10">
                <h2 class="text-lg font-bold">Laptop Size Guide</h2>
                <button id="size-guide-close" class="text-white/50 hover:text-white"><span class="material-symbols-outlined">close</span></button>
            </div>
            <div class="p-5 overflow-y-auto flex-1">
                <div class="grid sm:grid-cols-2 gap-4">
                    ${[
                        { size: '13"', weight: '1.0 – 1.4 kg', use: 'Portability', desc: 'Best for students and frequent travelers. Compact and lightweight.' },
                        { size: '14"', weight: '1.3 – 1.6 kg', use: 'Balance', desc: 'Great balance of screen size and portability for most users.' },
                        { size: '15.6"', weight: '1.7 – 2.2 kg', use: 'General Use', desc: 'Most popular size. Good for office work, media, and light gaming.' },
                        { size: '16"', weight: '1.8 – 2.4 kg', use: 'Creative Work', desc: 'Larger display for designers and content creators.' },
                        { size: '17.3"', weight: '2.5 – 3.2 kg', use: 'Desktop Replacement', desc: 'Maximum screen real estate. Best for gaming and workstation use.' }
                    ].map(s => `
                        <div class="glass-panel rounded-xl p-4 hover-lift">
                            <div class="flex items-center gap-3 mb-2">
                                <span class="text-2xl font-bold text-primary">${s.size}</span>
                                <span class="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">${s.use}</span>
                            </div>
                            <p class="text-sm text-white/60 mb-1">${s.desc}</p>
                            <p class="text-xs text-white/40">Typical weight: ${s.weight}</p>
                        </div>`).join('')}
                </div>
            </div>
        </div>`;
    document.body.appendChild(modal);
    const open = () => modal.classList.remove('hidden');
    const close = () => modal.classList.add('hidden');
    trigger.addEventListener('click', open);
    modal.querySelector('#size-guide-overlay').addEventListener('click', close);
    modal.querySelector('#size-guide-close').addEventListener('click', close);
}
