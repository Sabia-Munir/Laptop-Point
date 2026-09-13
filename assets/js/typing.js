// Typing animation for hero text elements
// Call TypeWriter(element, strings, options) to start.

class TypeWriter {
    constructor(el, strings, opts = {}) {
        this.el = el;
        this.strings = strings;
        this.speed = opts.speed || 80;
        this.deleteSpeed = opts.deleteSpeed || 40;
        this.pause = opts.pause || 2000;
        this.loop = opts.loop !== false;
        this.currentString = 0;
        this.currentChar = 0;
        this.isDeleting = false;
        this.el.textContent = '';
        this.tick();
    }

    tick() {
        const fullText = this.strings[this.currentString];
        
        if (this.isDeleting) {
            this.currentChar--;
        } else {
            this.currentChar++;
        }

        this.el.textContent = fullText.substring(0, this.currentChar);

        let delay = this.isDeleting ? this.deleteSpeed : this.speed;

        if (!this.isDeleting && this.currentChar === fullText.length) {
            delay = this.pause;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentChar === 0) {
            this.isDeleting = false;
            this.currentString = (this.currentString + 1) % this.strings.length;
            delay = 500;
        }

        setTimeout(() => this.tick(), delay);
    }
}

function initTypingAnimations() {
    document.querySelectorAll('[data-type]').forEach(el => {
        const strings = el.dataset.type.split('|');
        new TypeWriter(el, strings, {
            speed: parseInt(el.dataset.typeSpeed) || 80,
            pause: parseInt(el.dataset.typePause) || 2000
        });
    });
}

document.addEventListener('DOMContentLoaded', initTypingAnimations);
