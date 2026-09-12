// Shared across every customer-facing page with a #account-link element in
// its header. Swaps "Login" for the customer's name (or "My Account") once
// they're signed in — same Supabase Auth session used by admin/login.html,
// just checked here for a *customer*, not gated behind any role.
async function updateAccountLink() {
    const link = document.getElementById('account-link');
    const label = document.getElementById('account-label');
    if (!link || !label) return;

    const { data } = await supabaseClient.auth.getSession();
    if (data.session) {
        label.textContent = 'My Account';
        link.href = 'account.html';
    } else {
        label.textContent = 'Login';
        link.href = 'account.html';
    }
}
