document.addEventListener('DOMContentLoaded', () => {
    // Maintenance Mode Toggle
    const MAINTENANCE_MODE = false; // Set to true to enable maintenance banner

    if (MAINTENANCE_MODE) {
        const banner = document.getElementById('maintenance-banner');
        if (banner) {
            banner.classList.remove('hidden');
            document.body.classList.add('maintenance-active');
        }
    }

    // Announcement Mode Toggle
    const ANNOUNCEMENT_MODE = true; // Set to true to enable announcement box
    const SHOW_ANNOUNCEMENT_BUTTON = false; // Set to true to show the "Learn More" button

    if (ANNOUNCEMENT_MODE) {
        const announcementBox = document.getElementById('announcement-box');
        if (announcementBox) {
            announcementBox.classList.remove('hidden');

            // Handle button visibility
            if (!SHOW_ANNOUNCEMENT_BUTTON) {
                const button = announcementBox.querySelector('.announcement-button');
                if (button) {
                    button.style.display = 'none';
                }
            }
        }
    }

    // Set current year in footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
