/**
 * Sikkim Bible College - Literature Dynamic Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // REPLACE WITH YOUR WEB APP URL
    const GOOGLE_DB_URL = 'https://script.google.com/macros/s/AKfycbyG3txcCyNCDZWelCcSiSyN0NmrRQUx_YApxvlVPZqf-TrsrBydF_xVnOZ_7Hb5MDAHrA/exec'; 
    
    let PRODUCTS_DB = {};
    let currentItemCode = "";

    // 2. FETCH DATABASE
    const fetchDatabase = async () => {
        console.log("Fetching from Google Sheets...");
        try {
            const res = await fetch(GOOGLE_DB_URL);
            const data = await res.json();
            
            if (data && !data.error) {
                PRODUCTS_DB = data;
                console.log("Database synced successfully:", PRODUCTS_DB);
            } else {
                console.warn("Database returned an error:", data.error);
            }
        } catch (err) {
            console.error("Connection to Google Script failed:", err);
        }
    };

    // 3. COMPONENT LOADER (Header/Footer)
    const loadComponents = async () => {
        console.log("Loading Header/Footer...");
        try {
            const headerRes = await fetch('components/header.html');
            if(headerRes.ok) document.getElementById('header-container').innerHTML = await headerRes.text();
            
            const footerRes = await fetch('components/footer.html');
            if(footerRes.ok) document.getElementById('footer-container').innerHTML = await footerRes.text();
        } catch (e) {
            console.error("Component loading failed. Check if /components/ folder exists.");
        }
    };

    // 4. MODAL & PASSWORD LOGIC
    window.checkAccess = (itemCode) => {
        console.log("Checking access for:", itemCode);
        currentItemCode = itemCode;
        const modal = document.getElementById('password-modal');
        if (modal) {
            modal.classList.remove('hidden');
            document.getElementById('modal-password-input').focus();
        }
    };

    window.submitPassword = () => {
        const userInput = document.getElementById('modal-password-input').value.toString().trim();
        const productData = PRODUCTS_DB[currentItemCode];

        if (productData && productData.password && userInput === productData.password.toString().trim()) {
            console.log("Password matched. Opening:", productData.fileName);
            const path = '/assets/pdf/' + productData.fileName;
            window.open(path, '_blank');
            closeModal();
        } else {
            alert("Incorrect access key.");
            const input = document.getElementById('modal-password-input');
            input.classList.add('animate-shake');
            setTimeout(() => input.classList.remove('animate-shake'), 500);
        }
    };

    window.closeModal = () => {
        document.getElementById('password-modal').classList.add('hidden');
        document.getElementById('modal-password-input').value = "";
    };

    // RUN EVERYTHING
    loadComponents();
    fetchDatabase();
    
    if (typeof AOS !== 'undefined') {
        AOS.init();
    }
});