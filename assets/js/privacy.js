// Privacy policy page content — renders privacy policy for Laptop Point.
// Usage: renderPrivacy(containerId)

function renderPrivacy(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const sections = [
        { title: 'Information We Collect', body: 'We collect your name, email, phone number, shipping address, and payment information when you place an order. We also collect browsing data through cookies to improve your experience.' },
        { title: 'How We Use Your Information', body: 'Your information is used to process orders, deliver products, send order updates, and improve our services. We may send promotional emails only with your consent.' },
        { title: 'Data Sharing', body: 'We do not sell your personal data. We share information only with delivery partners (for shipping), payment processors (for transactions), and as required by law.' },
        { title: 'Data Security', body: 'We implement industry-standard security measures including SSL encryption, secure payment gateways, and regular security audits to protect your personal information.' },
        { title: 'Cookies', body: 'We use essential cookies for site functionality and analytics cookies to understand usage patterns. You can manage cookie preferences in your browser settings.' },
        { title: 'Your Rights', body: 'You have the right to access, update, or delete your personal information. Contact our support team to exercise these rights.' },
        { title: 'Data Retention', body: 'We retain your order information for 5 years for legal and accounting purposes. Browsing data is anonymized after 12 months.' },
        { title: 'Children\'s Privacy', body: 'Our services are not directed to individuals under 18. We do not knowingly collect personal information from children.' },
        { title: 'Changes to This Policy', body: 'We may update this policy periodically. Significant changes will be notified via email or website announcement.' },
        { title: 'Contact Us', body: 'For privacy-related inquiries, email privacy@laptoppoint.dev or contact our support team.' }
    ];
    container.innerHTML = `<div class="space-y-6">${sections.map(s => `
        <div>
            <h3 class="text-base font-semibold mb-2">${s.title}</h3>
            <p class="text-sm text-white/60 leading-relaxed">${s.body}</p>
        </div>`).join('')}</div>`;
}
