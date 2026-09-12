// Simple localStorage-based cart — no backend needed. Good enough for a real
// order flow (COD) today; can migrate to a database-backed cart later if you
// want cart persistence across devices/logins.

const CART_KEY = 'laptop_point_cart';

function getCart() {
    try {
        return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch (e) {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(product, quantity) {
    const cart = getCart();
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.discount_price || product.price,
            image: (product.images && product.images[0]) || '',
            quantity: quantity,
        });
    }
    saveCart(cart);
}

function removeFromCart(productId) {
    saveCart(getCart().filter(item => item.id !== productId));
}

function updateCartQuantity(productId, quantity) {
    const cart = getCart();
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity = Math.max(1, quantity);
        saveCart(cart);
    }
}

function cartTotal() {
    return getCart().reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function cartItemCount() {
    return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

function clearCart() {
    localStorage.removeItem(CART_KEY);
}

function updateCartCount() {
    const el = document.getElementById('cart-count');
    if (!el) return;
    const count = cartItemCount();
    if (count > 0) {
        el.textContent = count;
        el.classList.remove('hidden');
    } else {
        el.classList.add('hidden');
    }
}
