// Mobile navigation menu — hamburger toggle for mobile viewports.
// Usage: initMobileNav() — auto-initializes on DOMContentLoaded.

function initMobileNav() {
    // Find all headers with nav.hidden.md:flex
    document.querySelectorAll('header').forEach(header => {
        const nav = header.querySelector('nav.hidden.md\\:flex');
        if (!nav) return;

        // Check if hamburger already exists
        if (header.querySelector('.mobile-nav-btn')) return;

        // Create hamburger button
        const btn = document.createElement('button');
        btn.className = 'mobile-nav-btn md:hidden text-white/70 hover:text-primary transition-colors p-1';
        btn.setAttribute('aria-label', 'Menu');
        btn.setAttribute('aria-expanded', 'false');
        btn.innerHTML = '<span class="material-symbols-outlined">menu</span>';

        // Create mobile menu panel
        const panel = document.createElement('div');
        panel.className = 'mobile-nav-panel hidden absolute left-0 top-full mt-2 w-56 rounded-xl bg-[#171f33] border border-white/10 shadow-2xl backdrop-blur-xl overflow-hidden z-50';

        // Clone nav links into panel
        const links = nav.querySelectorAll('a');
        links.forEach((link, i) => {
            const clone = link.cloneNode(true);
            clone.className = 'block px-5 py-3 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors' + (i > 0 ? ' border-t border-white/5' : '');
            panel.appendChild(clone);
        });

        // Add account link
        const accountLink = document.createElement('a');
        accountLink.href = 'account.html';
        accountLink.className = 'block px-5 py-3 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors border-t border-white/5';
        accountLink.innerHTML = '<span class="material-symbols-outlined text-lg align-middle mr-2">person</span>My Account';
        panel.appendChild(accountLink);

        // Insert button before the first child of header's flex container
        const headerFlex = header.querySelector('.flex');
        if (headerFlex) headerFlex.insertBefore(btn, headerFlex.firstChild);

        header.style.position = 'relative';
        header.appendChild(panel);

        // Toggle
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = !panel.classList.contains('hidden');
            panel.classList.toggle('hidden');
            btn.setAttribute('aria-expanded', String(!isOpen));
            btn.querySelector('.material-symbols-outlined').textContent = isOpen ? 'menu' : 'close';
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!panel.classList.contains('hidden') && !panel.contains(e.target) && !btn.contains(e.target)) {
                panel.classList.add('hidden');
                btn.setAttribute('aria-expanded', 'false');
                btn.querySelector('.material-symbols-outlined').textContent = 'menu';
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', initMobileNav);
