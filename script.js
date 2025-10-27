
// Intersection Observer for scroll animations and navbar updates
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section[id]');
    const navbar = document.querySelector('custom-navbar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
                
                // Update navbar when section comes into view
                if (navbar) {
                    const hash = `#${entry.target.id}`;
                    history.replaceState(null, null, hash);
                    navbar.updateActiveLink();
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '-50px 0px -50px 0px' // Adjust viewport detection area
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Initialize navbar state
    if (navbar && !window.location.hash) {
        navbar.updateActiveLink();
    }
});
