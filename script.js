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

    // Modal Logic (QRPh and License)
    const setupModal = (modalId, linkId, closeClass) => {
        const modal = document.getElementById(modalId);
        const link = document.getElementById(linkId);
        const closeBtn = modal ? modal.querySelector(closeClass) : null;

        if (modal && link && closeBtn) {
            // Open modal
            link.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            });

            // Close modal with button
            closeBtn.addEventListener('click', () => {
                modal.classList.add('hidden');
                document.body.style.overflow = '';
            });

            // Close modal when clicking outside
            window.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.add('hidden');
                    document.body.style.overflow = '';
                }
            });

            // Close modal with Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                    modal.classList.add('hidden');
                    document.body.style.overflow = '';
                }
            });
        }
    };

    setupModal('qrph-modal', 'qrph-link', '.close-modal');
    setupModal('about-modal', 'about-link', '.close-modal');
    setupModal('website-modal', 'website-link', '.close-modal');
});
