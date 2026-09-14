// Contact form handler — validates and stores contact form submissions in localStorage.
// Usage: initContactForm(formId)

function initContactForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    const submissions = JSON.parse(localStorage.getItem('lp_contact_submissions') || '[]');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        if (!data.name?.trim() || !data.email?.trim() || !data.message?.trim()) {
            if (typeof Toast !== 'undefined') Toast.error('Please fill in all required fields.');
            return;
        }
        submissions.push({ ...data, submittedAt: Date.now() });
        localStorage.setItem('lp_contact_submissions', JSON.stringify(submissions));
        form.reset();
        const msg = document.getElementById('contact-success-msg');
        if (msg) msg.classList.remove('hidden');
        if (typeof Toast !== 'undefined') Toast.success('Message sent! We\'ll get back to you soon.');
    });
}
