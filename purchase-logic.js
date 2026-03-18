document.addEventListener('DOMContentLoaded', () => {
    
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyG3txcCyNCDZWelCcSiSyN0NmrRQUx_YApxvlVPZqf-TrsrBydF_xVnOZ_7Hb5MDAHrA/exec';
    let PRODUCTS_DB = {};

    const itemSelect = document.getElementById('itemSelect');
    const priceInput = document.getElementById('itemPrice');
    const descBox = document.getElementById('productDescription');
    const qrDisplay = document.getElementById('qrCodeDisplay');
    const screenshotInput = document.getElementById('screenshot');
    const base64Input = document.getElementById('screenshotBase64');
    const purchaseForm = document.getElementById('purchaseForm');

    // 1. Fetch Products from Sheet
    const fetchProducts = async () => {
        try {
            const res = await fetch(GOOGLE_SCRIPT_URL);
            PRODUCTS_DB = await res.json();
            
            if (PRODUCTS_DB && Object.keys(PRODUCTS_DB).length > 0) {
                itemSelect.innerHTML = ""; // Clear loader
                Object.keys(PRODUCTS_DB).forEach(key => {
                    const opt = document.createElement('option');
                    opt.value = key;
                    opt.text = key;
                    itemSelect.appendChild(opt);
                });

                // Auto-select from URL
                const params = new URLSearchParams(window.location.search);
                if (params.has('item')) itemSelect.value = params.get('item');
                
                updateUI();
            }
        } catch (e) {
            itemSelect.innerHTML = "<option>Offline Mode</option>";
        }
    };

    const updateUI = () => {
        const data = PRODUCTS_DB[itemSelect.value];
        if (data) {
            priceInput.value = `₹${data.price}`;
            descBox.innerText = data.desc;
            qrDisplay.src = data.qr || "/assets/img/Other/QR.jpg";
        }
    };

    // 2. Image Processing
    screenshotInput.addEventListener('change', function() {
        if (this.files[0]) {
            document.getElementById('file-status').innerText = "✓ Ready";
            const reader = new FileReader();
            reader.onload = (e) => base64Input.value = e.target.result.split(',')[1];
            reader.readAsDataURL(this.files[0]);
        }
    });

    // 3. Form Submission
    purchaseForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('submitBtn');
        btn.disabled = true;
        btn.innerText = "Saving Order...";

        const formData = new FormData(purchaseForm);
        const data = {};
        formData.forEach((v, k) => data[k] = v);

        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify(data)
            });
            document.getElementById('form-container').classList.add('hidden');
            document.getElementById('successBox').classList.remove('hidden');
            window.scrollTo(0,0);
        } catch (err) {
            alert("Error saving order. Check your internet.");
            btn.disabled = false;
        }
    });

    // Component Loader
    const loadGlobal = async () => {
        const h = await fetch('components/header.html');
        document.getElementById('header-container').innerHTML = await h.text();
        const f = await fetch('components/footer.html');
        document.getElementById('footer-container').innerHTML = await f.text();
    };

    loadGlobal();
    fetchProducts();
    itemSelect.addEventListener('change', updateUI);
    if (window.AOS) AOS.init();
});