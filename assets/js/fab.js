// Floating action button (FAB) — expandable radial menu for quick navigation.
// Usage: initFAB()

function initFAB() {
    if (document.getElementById('fab-container')) return;
    const fab = document.createElement('div');
    fab.id = 'fab-container';
    fab.innerHTML = `
        <style>
            #fab-container { position: fixed; bottom: 2rem; right: 2rem; z-index: 100; }
            #fab-main {
                width: 56px; height: 56px; border-radius: 50%;
                background: linear-gradient(135deg, #a855f7, #3b82f6);
                border: none; cursor: pointer; display: flex; align-items: center; justify-content: center;
                box-shadow: 0 4px 20px rgba(168,85,247,0.4);
                transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease;
                color: white; font-size: 24px;
            }
            #fab-main:hover { transform: scale(1.1); box-shadow: 0 6px 30px rgba(168,85,247,0.6); }
            #fab-main.open { transform: rotate(45deg); }
            #fab-menu {
                position: absolute; bottom: 70px; right: 0;
                display: flex; flex-direction: column; gap: 12px;
                opacity: 0; pointer-events: none;
                transform: translateY(20px);
                transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1);
            }
            #fab-menu.open { opacity: 1; pointer-events: auto; transform: translateY(0); }
            .fab-item {
                display: flex; align-items: center; gap: 10px; justify-content: flex-end;
                opacity: 0; transform: translateX(20px);
                transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1);
            }
            #fab-menu.open .fab-item { opacity: 1; transform: translateX(0); }
            #fab-menu.open .fab-item:nth-child(1) { transition-delay: 0.05s; }
            #fab-menu.open .fab-item:nth-child(2) { transition-delay: 0.1s; }
            #fab-menu.open .fab-item:nth-child(3) { transition-delay: 0.15s; }
            #fab-menu.open .fab-item:nth-child(4) { transition-delay: 0.2s; }
            .fab-label {
                background: rgba(17,24,45,0.9); backdrop-filter: blur(8px);
                padding: 4px 10px; border-radius: 8px; font-size: 12px; color: white;
                white-space: nowrap; border: 1px solid rgba(255,255,255,0.1);
            }
            .fab-btn {
                width: 44px; height: 44px; border-radius: 50%; border: none; cursor: pointer;
                background: rgba(45,52,73,0.8); backdrop-filter: blur(8px);
                border: 1px solid rgba(255,255,255,0.1);
                display: flex; align-items: center; justify-content: center;
                color: rgba(255,255,255,0.7); transition: all 0.2s ease;
            }
            .fab-btn:hover { background: rgba(168,85,247,0.3); color: white; border-color: rgba(168,85,247,0.5); }
        </style>
        <div id="fab-menu">
            <div class="fab-item"><span class="fab-label">Home</span><a href="index.html" class="fab-btn"><span class="material-symbols-outlined text-lg">home</span></a></div>
            <div class="fab-item"><span class="fab-label">Shop</span><a href="shop.html?type=laptops" class="fab-btn"><span class="material-symbols-outlined text-lg">storefront</span></a></div>
            <div class="fab-item"><span class="fab-label">Cart</span><a href="cart.html" class="fab-btn"><span class="material-symbols-outlined text-lg">shopping_cart</span></a></div>
            <div class="fab-item"><span class="fab-label">Top</span><button class="fab-btn" onclick="window.scrollTo({top:0,behavior:'smooth'})"><span class="material-symbols-outlined text-lg">arrow_upward</span></button></div>
        </div>
        <button id="fab-main" aria-label="Quick actions">
            <span class="material-symbols-outlined">add</span>
        </button>`;

    document.body.appendChild(fab);
    const main = document.getElementById('fab-main');
    const menu = document.getElementById('fab-menu');
    let isOpen = false;

    main.addEventListener('click', () => {
        isOpen = !isOpen;
        main.classList.toggle('open', isOpen);
        menu.classList.toggle('open', isOpen);
    });

    document.addEventListener('click', (e) => {
        if (isOpen && !fab.contains(e.target)) {
            isOpen = false;
            main.classList.remove('open');
            menu.classList.remove('open');
        }
    });
}

document.addEventListener('DOMContentLoaded', initFAB);
