// Dark/light theme toggle — switches between dark and light themes.
// Usage: initThemeToggle(triggerId)

function initThemeToggle(triggerId) {
    const trigger = document.getElementById(triggerId);
    if (!trigger) return;
    const saved = localStorage.getItem('lp_theme') || 'dark';
    function apply(theme) {
        document.documentElement.classList.toggle('light-theme', theme === 'light');
        localStorage.setItem('lp_theme', theme);
        const icon = trigger.querySelector('.material-symbols-outlined');
        if (icon) icon.textContent = theme === 'light' ? 'dark_mode' : 'light_mode';
    }
    apply(saved);
    trigger.addEventListener('click', () => {
        const current = document.documentElement.classList.contains('light-theme') ? 'light' : 'dark';
        apply(current === 'dark' ? 'light' : 'dark');
    });
}
