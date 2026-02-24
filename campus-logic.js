/**
 * Campus Life Page - Specific Animations
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Testimonial Slider Logic
    const slides = document.querySelectorAll('.testimonial-slide');
    let currentSlide = 0;

    const nextSlide = () => {
        // Fade out current slide
        slides[currentSlide].style.opacity = 0;
        
        // Move to next index
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Fade in next slide
        slides[currentSlide].style.opacity = 1;
    };

    // Change slide every 5 seconds
    if (slides.length > 0) {
        setInterval(nextSlide, 5000);
    }

    // Lightbox / Zoom Simulation
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const label = item.querySelector('span').innerText;
            console.log("Viewing: " + label);
            // Here you could integrate a real Lightbox library like GLightbox
            // For now, it provides a click-interactive feel.
        });
    });

    // FAQ Accordion Logic
    const faqBtns = document.querySelectorAll('.faq-btn');

    faqBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            const icon = btn.querySelector('svg');
            
            // Toggle Content
            content.classList.toggle('hidden');
            
            // Rotate Icon
            if (content.classList.contains('hidden')) {
                icon.style.transform = 'rotate(0deg)';
                btn.classList.remove('bg-blue-50');
            } else {
                icon.style.transform = 'rotate(180deg)';
                btn.classList.add('bg-blue-50');
            }
        });
    });
});