/**
 * Sikkim Bible College - Dynamic Loader & Navigation
 * Handles: Component Loading, Sticky Header, Logo Swapping, and Animations
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. CONFIGURATION: Folder Path & Logo Names
    // Updated to match your path: /assets/img/
    const IMG_PATH = "assets/img/";
    const WHITE_LOGO = "logo-white.png";
    const COLOR_LOGO = "logo-color.png";

    // 2. COMPONENT LOADER
    const loadComponent = async (id, path) => {
        try {
            const response = await fetch(path);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const text = await response.text();
            document.getElementById(id).innerHTML = text;
            
            // Re-initialize logic after the Header is injected into the DOM
            if(id === 'header-container') initNavLogic();
        } catch (err) {
            console.error(`Error loading ${path}:`, err);
        }
    };

    // Load dynamic components
    loadComponent('header-container', 'components/header.html');
    loadComponent('footer-container', 'components/footer.html');

    // 3. NAVIGATION & LOGO LOGIC
    function initNavLogic() {
        const nav = document.getElementById('main-nav');
        const logo = document.getElementById('header-logo');
        const mobileBtn = document.getElementById('mobile-menu-btn');
        const closeBtn = document.getElementById('close-menu');
        const overlay = document.getElementById('mobile-overlay');

        const handleScroll = () => {
            if (window.scrollY > 50) {
                // --- STICKY STATE (White Background) ---
                nav.classList.add('bg-white', 'text-blue-900', 'shadow-2xl', 'py-5');
                nav.classList.remove('py-8', 'text-white');
                
                // Swap to Color Logo
                if (logo && !logo.src.includes(COLOR_LOGO)) {
                    logo.src = IMG_PATH + COLOR_LOGO;
                }
                
                // Shrink Logo height
                if (logo) {
                    logo.classList.replace('h-16', 'h-12');
                }
            } else {
                // --- DEFAULT STATE (Transparent / Top) ---
                nav.classList.remove('bg-white', 'text-blue-900', 'shadow-2xl', 'py-5');
                nav.classList.add('py-8', 'text-white');
                
                // Swap back to White Logo
                if (logo && !logo.src.includes(WHITE_LOGO)) {
                    logo.src = IMG_PATH + WHITE_LOGO;
                }
                
                // Return to Original Logo height
                if (logo) {
                    logo.classList.replace('h-12', 'h-16');
                }
            }
        };

        // Listen for scroll events
        window.addEventListener('scroll', handleScroll);
        // Initial check in case page is refreshed while scrolled
        handleScroll();

        // Mobile Menu Toggle
        if (mobileBtn && overlay) {
            mobileBtn.addEventListener('click', () => overlay.classList.remove('translate-x-full'));
        }
        if (closeBtn && overlay) {
            closeBtn.addEventListener('click', () => overlay.classList.add('translate-x-full'));
        }

        // Highlight Active Page in Nav
        const currentPath = window.location.pathname.split("/").pop() || 'index.html';
        document.querySelectorAll('.nav-link').forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPath) {
                link.classList.add('text-yellow-500', 'border-b-2', 'border-yellow-500');
            }
        });
    }

    // 4. ANIMATIONS (AOS)
    if (typeof AOS !== 'undefined') {
        AOS.init({ 
            duration: 1000, 
            once: true,
            easing: 'ease-in-out'
        });
    }

    // 5. STATS COUNTER (Intersection Observer)
    const statsSection = document.getElementById('stats-section');
    if (statsSection) {
        const counters = document.querySelectorAll('.stat-number');
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    let current = 0;
                    const update = () => {
                        current += increment;
                        if (current < target) {
                            counter.innerText = Math.ceil(current);
                            requestAnimationFrame(update);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    update();
                });
                observer.unobserve(statsSection);
            }
        }, { threshold: 0.5 });
        observer.observe(statsSection);
    }
});