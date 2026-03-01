/**
 * Sikkim Bible College - Literature Page Logic
 * Handles: Component Loading, Dynamic Nav, and Unique PDF Passwords
 * Theme: Blue (#1E3A8A) and White
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. CONFIGURATION
    const IMG_PATH = "assets/img/";
    const WHITE_LOGO = "logo-white.png";

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

    // 3. NAVIGATION LOGIC
    function initNavLogic() {
        const nav = document.getElementById('main-nav');
        const mobileBtn = document.getElementById('mobile-menu-btn');
        const closeBtn = document.getElementById('close-menu');
        const overlay = document.getElementById('mobile-overlay');

        const handleScroll = () => {
            if (window.scrollY > 50) {
                // FIXED: Use Brand Blue instead of Black
                nav.classList.add('bg-[#1E3A8A]', 'shadow-2xl');
                nav.classList.remove('bg-[#1E3A8A]/90', 'h-24');
                nav.classList.add('h-20');
            } else {
                nav.classList.remove('bg-[#1E3A8A]', 'shadow-2xl', 'h-20');
                nav.classList.add('bg-[#1E3A8A]/90', 'h-24');
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        if (mobileBtn && overlay) {
            mobileBtn.addEventListener('click', () => overlay.classList.remove('translate-x-full'));
        }
        if (closeBtn && overlay) {
            closeBtn.addEventListener('click', () => overlay.classList.add('translate-x-full'));
        }

        // --- FIXED: ACTIVE LINK HIGHLIGHT (WHITE) ---
        const currentPath = window.location.pathname.split("/").pop() || 'index.html';
        document.querySelectorAll('.nav-link, .nav-link-mobile').forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                // Removed Red logic, added White logic
                link.classList.add('text-white', 'border-b-2', 'border-white');
                link.classList.remove('text-[#e1302e]'); 
            }
        });

        // --- FIXED: FORCE APPLY BUTTON WHITE ---
        const applyBtn = document.querySelector('a[href="apply.html"]');
        if (applyBtn) {
            applyBtn.classList.add('!bg-white', '!text-[#1E3A8A]');
            applyBtn.classList.remove('bg-black', 'text-white');
        }
    }

    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000, once: true });
    }
});

// --- PASSWORD SYSTEM ---
let currentFileRequest = "";

const PDF_PASSWORDS = {
    "STJ_Vol_1.pdf": "SIKKIM",
    "STJ_Vol_2.pdf": "BIBLE",
    "In_The_Shadow_of_Grace.pdf": "JOURNAL",
    "default": "SIKKIM"
};

function checkAccess(pdfPath) {
    currentFileRequest = pdfPath.split('/').pop();
    const modal = document.getElementById('password-modal');
    modal.classList.remove('hidden');
    document.getElementById('modal-password-input').focus();
}

function submitPassword() {
    const userInput = document.getElementById('modal-password-input').value;
    const requiredPassword = PDF_PASSWORDS[currentFileRequest] || PDF_PASSWORDS["default"];

    if (userInput === requiredPassword) {
        // Ensure path matches your actual folder structure
        window.open('assets/pdf/' + currentFileRequest, '_blank');
        closeModal();
    } else {
        const inputField = document.getElementById('modal-password-input');
        inputField.classList.add('animate-shake', 'border-red-500');
        setTimeout(() => {
            inputField.classList.remove('animate-shake', 'border-red-500');
        }, 500);
    }
}

function closeModal() {
    document.getElementById('password-modal').classList.add('hidden');
    document.getElementById('modal-password-input').value = "";
}

document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('password-modal');
    if (!modal || modal.classList.contains('hidden')) return;

    if (e.key === "Enter") submitPassword();
    if (e.key === "Escape") closeModal();
});