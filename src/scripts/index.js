document.addEventListener('DOMContentLoaded', () => {
    // Select all collapse buttons
    const collapsibleSections = document.querySelectorAll('.collapse-btn');

    collapsibleSections.forEach(button => {
        // Get the content section
        const section = button.closest('.side');
        const sectionContent = section.querySelector('.item, .color-items, .min-max');

        // Set initial max-height
        if (sectionContent) {
            sectionContent.style.maxHeight = sectionContent.scrollHeight + "px";
            // Store the full height for later use
            sectionContent.setAttribute('data-full-height', sectionContent.scrollHeight + "px");
        }

        button.addEventListener('click', () => {
            // Toggle the expanded state
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            button.setAttribute('aria-expanded', !isExpanded);

            // Handle animation and visibility
            if (sectionContent) {
                if (isExpanded) {
                    // Closing animation
                    sectionContent.style.maxHeight = '0px';

                    // For color-items, handle grid layout after animation
                    if (sectionContent.classList.contains('color-items')) {
                        sectionContent.setAttribute('data-visible', 'false');
                        // Wait for animation to complete before hiding
                        setTimeout(() => {
                            if (button.getAttribute('aria-expanded') === 'false') {
                                sectionContent.style.display = 'none';
                            }
                        }, 300); // Match this with your CSS transition duration
                    }
                } else {
                    // Opening animation
                    if (sectionContent.classList.contains('color-items')) {
                        sectionContent.style.display = 'grid';
                        sectionContent.setAttribute('data-visible', 'true');
                        // Brief timeout to ensure display: grid is applied before animation
                        setTimeout(() => {
                            sectionContent.style.maxHeight = sectionContent.getAttribute('data-full-height');
                        }, 10);
                    } else {
                        sectionContent.style.maxHeight = sectionContent.getAttribute('data-full-height');
                    }
                }
            }

            // Rotate the angle icon with animation
            const angleIcon = button.querySelector('.fa-angle-up');
            angleIcon.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
            angleIcon.style.transition = 'transform 0.3s ease';
        });
    });

    // Handle window resize to update max-heights
    window.addEventListener('resize', debounce(() => {
        collapsibleSections.forEach(button => {
            const section = button.closest('.side');
            const sectionContent = section.querySelector('.item, .color-items, .min-max');

            if (sectionContent && button.getAttribute('aria-expanded') === 'true') {
                sectionContent.style.maxHeight = 'none';
                const newHeight = sectionContent.scrollHeight + "px";
                sectionContent.setAttribute('data-full-height', newHeight);
                sectionContent.style.maxHeight = newHeight;
            }
        });
    }, 250));
});

// Debounce function to prevent excessive resize calculations
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}