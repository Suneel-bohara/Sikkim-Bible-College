/**
 * Sikkim Bible College - Literature Page Logic
 * Handles: Component Loading, Dynamic Nav, and Unique PDF Passwords
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

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('bg-black', 'shadow-2xl', 'py-4');
                nav.classList.remove('py-8');
            } else {
                nav.classList.remove('bg-black', 'shadow-2xl', 'py-4');
                nav.classList.add('py-8');
            }
        });

        if (mobileBtn && overlay) {
            mobileBtn.addEventListener('click', () => overlay.classList.remove('translate-x-full'));
        }
        if (closeBtn && overlay) {
            closeBtn.addEventListener('click', () => overlay.classList.add('translate-x-full'));
        }

        const currentPath = window.location.pathname.split("/").pop() || 'index.html';
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('text-[#e1302e]', 'border-b-2', 'border-[#e1302e]');
            }
        });
    }

    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000, once: true });
    }
});

// --- PASSWORD SYSTEM ---

let currentFileRequest = "";

// Mapping unique passwords to filenames
const PDF_PASSWORDS = {
    "STJ_Vol_1.pdf": "SIKKIM",        // Password for 'The Gospel in Himalayas'
    "STJ_Vol_2.pdf": "BIBLE",    // Password for 'Biblical Foundations'
    "In_The_Shadow_of_Grace.pdf": "JOURNAL",     // Password for 'SBC Theological Journal'
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
        window.open('/assets/pdf/' + currentFileRequest, '_blank');
        closeModal();
    } else {
        const inputField = document.getElementById('modal-password-input');
        inputField.classList.add('animate-shake', 'border-red-500');
        setTimeout(() => {
            inputField.classList.remove('animate-shake', 'border-red-500');
        }, 500);
        alert("Incorrect Access Key for this document.");
    }
}

function closeModal() {
    document.getElementById('password-modal').classList.add('hidden');
    document.getElementById('modal-password-input').value = "";
}

// Allow pressing "Enter" to submit
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('password-modal');
    if (e.key === "Enter" && !modal.classList.contains('hidden')) {
        submitPassword();
    }
    if (e.key === "Escape" && !modal.classList.contains('hidden')) {
        closeModal();
    }
});