// Terms and conditions page content — renders T&C for Laptop Point.
// Usage: renderTerms(containerId)

function renderTerms(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const sections = [
        { title: '1. Acceptance of Terms', body: 'By accessing and using the Laptop Point website and services, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.' },
        { title: '2. Products and Pricing', body: 'All products are subject to availability. We reserve the right to modify prices without prior notice. Prices are listed in Pakistani Rupees (PKR) and include applicable taxes unless stated otherwise.' },
        { title: '3. Orders and Payment', body: 'Orders are subject to acceptance and availability. We accept cash on delivery, bank transfers, and online payments. An order confirmation email does not constitute acceptance — acceptance occurs upon dispatch.' },
        { title: '4. Delivery', body: 'We aim to deliver within the estimated timeframes shown at checkout. Delivery times may vary by location. Free delivery is available on orders over Rs. 50,000 within major cities.' },
        { title: '5. Returns and Refunds', body: 'Products may be returned within 7 days of delivery if unused and in original packaging. Refunds are processed within 5-7 business days of receiving the returned item. Shipping costs are non-refundable.' },
        { title: '6. Warranty', body: 'All laptops come with the manufacturer warranty. Extended warranty options are available at checkout. Warranty claims must be made through Laptop Point customer support.' },
        { title: '7. Privacy', body: 'Your personal information is handled in accordance with our Privacy Policy. We do not sell or share your data with third parties for marketing purposes.' },
        { title: '8. Limitation of Liability', body: 'Laptop Point shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or services.' },
        { title: '9. Changes to Terms', body: 'We reserve the right to update these terms at any time. Continued use of our services after changes constitutes acceptance of the modified terms.' },
        { title: '10. Contact', body: 'For questions about these Terms, contact us at support@laptoppoint.dev or via WhatsApp.' }
    ];
    container.innerHTML = `<div class="space-y-6">${sections.map(s => `
        <div>
            <h3 class="text-base font-semibold mb-2">${s.title}</h3>
            <p class="text-sm text-white/60 leading-relaxed">${s.body}</p>
        </div>`).join('')}</div>`;
}
