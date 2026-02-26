/**
 * Faculty Page - Interaction Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Add a simple "Expertise" highlight effect
    const facultyCards = document.querySelectorAll('.faculty-card');
    
    facultyCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const expertiseTag = card.querySelector('div[class*="Expertise"]');
            if (expertiseTag) {
                expertiseTag.classList.add('text-[#e1302e]', 'scale-105');
                expertiseTag.style.transition = 'all 0.3s ease';
            }
        });

        card.addEventListener('mouseleave', () => {
            const expertiseTag = card.querySelector('div[class*="Expertise"]');
            if (expertiseTag) {
                expertiseTag.classList.remove('text-[#e1302e]', 'scale-105');
            }
        });
    });
});