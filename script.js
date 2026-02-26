/**
 * Sikkim Bible College - Dynamic Loader & Navigation
 * Updated for Red (#e1302e), Black, and White Theme
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. CONFIGURATION
    const IMG_PATH = "assets/img/";
    const WHITE_LOGO = "logo-white.png";
    const COLOR_LOGO = "logo-color.png"; // Assuming this is your Red version

    // 2. COMPONENT LOADER
    const loadComponent = async (id, path) => {
        try {
            const response = await fetch(path);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const text = await response.text();
            document.getElementById(id).innerHTML = text;
            
            if(id === 'header-container') initNavLogic();
        } catch (err) {
            console.error(`Error loading ${path}:`, err);
        }
    };

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
                // --- STICKY STATE ---
                // Swapped blue-900 for black and text-white for clarity
                nav.classList.add('bg-black', 'shadow-2xl', 'py-4');
                nav.classList.remove('py-8', 'bg-transparent');
                
                // Swap to Red/Color Logo if necessary
                if (logo && !logo.src.includes(COLOR_LOGO)) {
                    logo.src = IMG_PATH + COLOR_LOGO;
                }
            } else {
                // --- DEFAULT STATE (Transparent Top) ---
                nav.classList.remove('bg-black', 'shadow-2xl', 'py-4');
                nav.classList.add('py-8');
                
                if (logo && !logo.src.includes(WHITE_LOGO)) {
                    logo.src = IMG_PATH + WHITE_LOGO;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        // Mobile Menu Toggle
        if (mobileBtn && overlay) {
            mobileBtn.addEventListener('click', () => overlay.classList.remove('translate-x-full'));
        }
        if (closeBtn && overlay) {
            closeBtn.addEventListener('click', () => overlay.classList.add('translate-x-full'));
        }

        // --- ACTIVE LINK HIGHLIGHTING ---
        const currentPath = window.location.pathname.split("/").pop() || 'index.html';
        document.querySelectorAll('.nav-link').forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPath) {
                // Updated: Replace yellow-500 with brand red #e1302e
                link.classList.add('text-[#e1302e]', 'border-b-2', 'border-[#e1302e]');
                link.classList.remove('text-white');
            }
        });
    }

    // 4. ANIMATIONS (AOS)
    if (typeof AOS !== 'undefined') {
        AOS.init({ 
            duration: 800, 
            once: true,
            easing: 'ease-out'
        });
    }

    // 5. STATS COUNTER
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