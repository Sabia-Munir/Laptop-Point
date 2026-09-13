// Shared footer component for Laptop Point storefront pages.
// Injects a consistent footer with contact info, nav links, and social proof.

function renderFooter() {
    const footer = document.createElement('footer');
    footer.className = 'border-t border-white/10 mt-16';
    footer.setAttribute('role', 'contentinfo');
    footer.innerHTML = `
    <div class="max-w-5xl mx-auto px-6 py-8">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8" data-stagger>
            <div class="reveal">
                <div class="font-bold text-[#ddb7ff] tracking-tighter text-lg mb-3">LAPTOP POINT</div>
                <p class="text-sm text-white/40 leading-relaxed">Premium laptops and accessories. Power that fits your world.</p>
            </div>
            <div class="reveal">
                <h3 class="text-xs uppercase tracking-wider text-white/50 mb-3">Quick Links</h3>
                <nav class="flex flex-col gap-2" aria-label="Footer navigation">
                    <a href="index.html" class="text-sm text-white/40 hover:text-white/70 transition-colors">Home</a>
                    <a href="shop.html?type=laptops" class="text-sm text-white/40 hover:text-white/70 transition-colors">Laptops</a>
                    <a href="shop.html?type=accessories" class="text-sm text-white/40 hover:text-white/70 transition-colors">Accessories</a>
                    <a href="account.html" class="text-sm text-white/40 hover:text-white/70 transition-colors">My Account</a>
                </nav>
            </div>
            <div class="reveal">
                <h3 class="text-xs uppercase tracking-wider text-white/50 mb-3">Contact</h3>
                <div class="space-y-2">
                    <a href="tel:03115245535" class="flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors">
                        <span class="material-symbols-outlined text-base">call</span> 0311-5245535
                    </a>
                    <a href="https://www.google.com/maps/search/?api=1&query=Khanapul+Dubai+Plaza" target="_blank" rel="noopener" class="flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors">
                        <span class="material-symbols-outlined text-base">location_on</span> Khanapul, Dubai Plaza
                    </a>
                    <div class="flex items-center gap-1.5 text-sm text-white/40">
                        <span class="material-symbols-outlined text-base">schedule</span> Mon-Sat, 10AM-10PM
                    </div>
                </div>
            </div>
        </div>
        <div class="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/30">
            <div>&copy; ${new Date().getFullYear()} Laptop Point. All rights reserved.</div>
            <div class="flex items-center gap-1">
                <span>Cash on Delivery</span>
                <span class="mx-1">&middot;</span>
                <span>Free Delivery in Islamabad</span>
            </div>
        </div>
    </div>`;
    return footer;
}

// Auto-inject footer before closing </body> on pages that have a <main> element
document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('main');
    if (main && !document.querySelector('footer[role="contentinfo"]')) {
        main.parentNode.insertBefore(renderFooter(), main.nextSibling);
    }
});
