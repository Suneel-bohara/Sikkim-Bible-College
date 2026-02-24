/**
 * Photo Gallery Filter Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 1. Remove active class from all buttons and add to clicked one
            filterButtons.forEach(btn => btn.classList.remove('active', 'bg-blue-900', 'text-white'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            // 2. Filter images
            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === itemCategory) {
                    item.classList.remove('hidden');
                    // Trigger reflow for animation
                    item.style.animation = 'none';
                    item.offsetHeight; 
                    item.style.animation = null;
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
});