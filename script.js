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

    // QRPh Modal Logic
    const qrModal = document.getElementById('qrph-modal');
    const qrLink = document.getElementById('qrph-link');
    const closeBtn = document.querySelector('.close-modal');

    if (qrModal && qrLink && closeBtn) {
        // Open modal
        qrLink.addEventListener('click', (e) => {
            e.preventDefault();
            qrModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });

        // Close modal with button
        closeBtn.addEventListener('click', () => {
            qrModal.classList.add('hidden');
            document.body.style.overflow = '';
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === qrModal) {
                qrModal.classList.add('hidden');
                document.body.style.overflow = '';
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !qrModal.classList.contains('hidden')) {
                qrModal.classList.add('hidden');
                document.body.style.overflow = '';
            }
        });
    }
});
