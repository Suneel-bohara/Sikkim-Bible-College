/**
 * Sikkim Bible College - Dynamic Loader & Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Function to load HTML components
    const loadComponent = async (id, path) => {
        try {
            const response = await fetch(path);
            const text = await response.text();
            document.getElementById(id).innerHTML = text;
            
            // Re-initialize nav logic after header loads
            if(id === 'header-container') initNavLogic();
        } catch (err) {
            console.error(`Error loading ${path}:`, err);
        }
    };

    // Load Header and Footer
    loadComponent('header-container', 'components/header.html');
    loadComponent('footer-container', 'components/footer.html');

    // 2. Navigation Logic (Sticky & Mobile)
    function initNavLogic() {
        const nav = document.getElementById('main-nav');
        const mobileBtn = document.getElementById('mobile-menu-btn');
        const closeBtn = document.getElementById('close-menu');
        const overlay = document.getElementById('mobile-overlay');

        // Sticky Header with Substantial Padding
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                // Scrolled State: Still has nice 20px (py-5) padding
                nav.classList.add('bg-white', 'text-blue-900', 'shadow-xl', 'py-5');
                nav.classList.remove('py-8', 'text-white');
            } else {
                // Initial State: Very spacious 32px (py-8) padding
                nav.classList.remove('bg-white', 'text-blue-900', 'shadow-xl', 'py-5');
                nav.classList.add('py-8', 'text-white');
            }
        });

        // Mobile Toggle
        if (mobileBtn) {
            mobileBtn.addEventListener('click', () => overlay.classList.remove('translate-x-full'));
        }
        if (closeBtn) {
            closeBtn.addEventListener('click', () => overlay.classList.add('translate-x-full'));
        }

        // Highlight Active Page
        const currentPath = window.location.pathname.split("/").pop() || 'index.html';
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('text-yellow-500', 'border-b-2', 'border-yellow-500');
            }
        });
    }

    // 3. Initialize Animations (AOS)
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000, once: true });
    }
});