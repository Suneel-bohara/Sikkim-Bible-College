/**
 * Ministry Page - Specific Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Add a simple interaction for the district map points
    const districts = [
        { name: 'North Sikkim', detail: 'High Altitude Outreach' },
        { name: 'West Sikkim', detail: 'Church Planting Support' },
        { name: 'South Sikkim', detail: 'Community Development' }
    ];

    console.log("Ministry Map Initialized for 2026 Season.");
    
    // Logic for staggered reveals if you add more list items
    const listItems = document.querySelectorAll('.space-y-4 > div');
    listItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 100}ms`;
    });
});