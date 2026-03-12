/**
 * Sikkim Bible College - Purchase Logic
 * Handles dynamic pricing, image conversion, and data submission
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. DATA CONFIGURATION
    const PRODUCTS = {
        "STJ-V01": {
            price: 100,
            desc: "Sikkim Theological Journal Vol 1: Historical perspectives on Himalayan missions.",
            qr: "assets/img/Other/QR.jpg"
        },
        "STJ-V02": {
            price: 100,
            desc: "Sikkim Theological Journal Vol 2: Core Biblical doctrines for regional leadership.",
            qr: "assets/img/Other/QR.jpg"
        },
        "Shadow-Grace": {
            price: 100,
            desc: "The Shadow of Grace (2025): Advanced scholarly research and theological debates.",
            qr: "assets/img/Other/QR.jpg"
        }
    };

    const GOOGLE_SCRIPT_URL = 'YOUR_DEPLOYED_WEB_APP_URL';

    // 2. UI ELEMENTS
    const itemSelect = document.getElementById('itemSelect');
    const priceInput = document.getElementById('itemPrice');
    const descBox = document.getElementById('productDescription');
    const qrDisplay = document.getElementById('qrCodeDisplay');
    const screenshotInput = document.getElementById('screenshot');
    const base64Input = document.getElementById('screenshotBase64');
    const purchaseForm = document.getElementById('purchaseForm');

    // 3. COMPONENT LOADER (Global Header/Footer)
    const loadComponents = async () => {
        const headerRes = await fetch('components/header.html');
        document.getElementById('header-container').innerHTML = await headerRes.text();
        const footerRes = await fetch('components/footer.html');
        document.getElementById('footer-container').innerHTML = await footerRes.text();
        
        // Init Nav Scroll Logic (Synchronized with index.html)
        const nav = document.getElementById('main-nav');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('bg-[#1E3A8A]', 'shadow-2xl', 'h-20');
                nav.classList.remove('bg-[#1E3A8A]/90', 'h-24');
            } else {
                nav.classList.remove('bg-[#1E3A8A]', 'shadow-2xl', 'h-20');
                nav.classList.add('bg-[#1E3A8A]/90', 'h-24');
            }
        });
    };

    // 4. DYNAMIC UPDATES
    const updateUI = () => {
        const selected = itemSelect.value;
        const data = PRODUCTS[selected];
        
        if (data) {
            priceInput.value = `₹${data.price}`;
            descBox.innerText = data.desc;
            qrDisplay.src = data.qr;
        }
    };

    // 5. IMAGE TO BASE64
    screenshotInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            document.getElementById('file-status').innerText = "✓ Uploaded";
            const reader = new FileReader();
            reader.onload = (e) => base64Input.value = e.target.result.split(',')[1];
            reader.readAsDataURL(this.files[0]);
        }
    });

    // 6. FORM SUBMISSION
    purchaseForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('submitBtn');
        btn.disabled = true;
        btn.innerText = "Submitting Order...";

        const formData = new FormData(purchaseForm);
        
        try {
            // Using fetch with no-cors or standard POST depending on script setup
            await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', body: formData });
            
            document.getElementById('form-container').classList.add('hidden');
            document.getElementById('successBox').classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            alert("Submission error. Please check your connection.");
            btn.disabled = false;
            btn.innerText = "Confirm & Access Digital Copy";
        }
    });

    // INITIALIZE
    loadComponents();
    
    // Check for URL parameters from Literature Page
    const params = new URLSearchParams(window.location.search);
    if (params.has('item')) itemSelect.value = params.get('item');
    
    updateUI();
    itemSelect.addEventListener('change', updateUI);
    if (typeof AOS !== 'undefined') AOS.init();
});