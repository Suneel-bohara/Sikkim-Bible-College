/**
 * About Page - Core Values Accordion Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    const valueBtns = document.querySelectorAll('.value-btn');

    valueBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            const icon = btn.querySelector('svg');
            
            // Close other open accordions
            document.querySelectorAll('.value-content').forEach(otherContent => {
                if (otherContent !== content && !otherContent.classList.contains('hidden')) {
                    otherContent.classList.add('hidden');
                    otherContent.previousElementSibling.querySelector('svg').style.transform = 'rotate(0deg)';
                    otherContent.parentElement.classList.remove('bg-white', 'shadow-lg');
                }
            });

            // Toggle Current Content
            content.classList.toggle('hidden');
            
            // UI Feedback
            if (content.classList.contains('hidden')) {
                icon.style.transform = 'rotate(0deg)';
                btn.parentElement.classList.remove('bg-white', 'shadow-lg');
            } else {
                icon.style.transform = 'rotate(180deg)';
                btn.parentElement.classList.add('bg-white', 'shadow-lg');
            }
        });
    });
});