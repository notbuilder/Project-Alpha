document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Reveal animations on scroll
    const animatedElements = document.querySelectorAll('.card, .result-item, .advantage-list li');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `loadFade 0.8s ease-out forwards`;
                // Add a slight delay based on order for staggered effect
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';

        // Stagger list items slightly
        if (el.tagName === 'LI') {
            el.style.animationDelay = `${(index % 5) * 0.15}s`;
        }

        observer.observe(el);
    });
});
