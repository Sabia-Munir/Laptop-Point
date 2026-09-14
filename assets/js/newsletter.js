// Newsletter signup component — email capture with localStorage persistence.
// Usage: renderNewsletter(containerId)

function renderNewsletter(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const subscribers = JSON.parse(localStorage.getItem('lp_newsletter') || '[]');
    container.innerHTML = `
        <div class="glass-panel rounded-2xl p-6 sm:p-8 text-center relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-[#a855f7]/10 to-[#3b82f6]/10 pointer-events-none"></div>
            <div class="relative z-10">
                <span class="material-symbols-outlined text-primary text-4xl mb-3 block">mail</span>
                <h3 class="text-xl font-bold mb-2">Stay in the Loop</h3>
                <p class="text-sm text-white/50 mb-5 max-w-md mx-auto">Get exclusive deals, new arrivals, and tech tips delivered to your inbox.</p>
                <form class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" id="newsletter-form">
                    <input type="email" required placeholder="Enter your email" class="input-animated flex-1 text-sm"/>
                    <button type="submit" class="bg-gradient-to-r from-[#a855f7] to-[#3b82f6] text-white px-6 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all">Subscribe</button>
                </form>
                <p id="newsletter-msg" class="text-xs text-green-400 mt-3 hidden">Thanks for subscribing!</p>
            </div>
        </div>`;
    document.getElementById('newsletter-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input').value.trim();
        if (!subscribers.includes(email)) {
            subscribers.push(email);
            localStorage.setItem('lp_newsletter', JSON.stringify(subscribers));
        }
        document.getElementById('newsletter-msg').classList.remove('hidden');
        e.target.querySelector('input').value = '';
        if (typeof Toast !== 'undefined') Toast.success('Subscribed successfully!');
    });
}
