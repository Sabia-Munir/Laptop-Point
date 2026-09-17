// Account page enhancements — password toggle, loading spinner, improved UX.

document.addEventListener('DOMContentLoaded', () => {
    // Add show/hide password toggles to all password fields
    document.querySelectorAll('input[type="password"]').forEach(input => {
        const wrapper = document.createElement('div');
        wrapper.className = 'relative';
        input.parentNode.insertBefore(wrapper, input);
        wrapper.appendChild(input);

        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors';
        toggle.innerHTML = '<span class="material-symbols-outlined text-lg">visibility_off</span>';
        toggle.setAttribute('aria-label', 'Toggle password visibility');
        toggle.addEventListener('click', () => {
            const isPassword = input.type === 'password';
            input.type = isPassword ? 'text' : 'password';
            toggle.innerHTML = `<span class="material-symbols-outlined text-lg">${isPassword ? 'visibility' : 'visibility_off'}</span>`;
        });
        wrapper.appendChild(toggle);
    });

    // Add loading spinner to form submissions
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', () => {
            const btn = form.querySelector('button[type="submit"]');
            if (btn && !btn.disabled) {
                btn.dataset.originalText = btn.textContent;
                btn.disabled = true;
                btn.innerHTML = '<span class="material-symbols-outlined text-lg align-middle animate-spin mr-1">progress_activity</span> Processing...';
            }
        });
    });

    // Add animated entrance to auth forms
    const authSection = document.getElementById('auth-section');
    if (authSection) {
        authSection.style.opacity = '0';
        authSection.style.transform = 'translateY(10px)';
        authSection.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        requestAnimationFrame(() => {
            authSection.style.opacity = '1';
            authSection.style.transform = 'translateY(0)';
        });
    }
});
