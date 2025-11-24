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

    // Announcement Box Expansion Logic
    const ENABLE_EXPANSION = true; // Set to true to enable expansion, false to disable
    const announcementBox = document.getElementById('announcement-box');
    const closeExpandedBtn = document.getElementById('close-announcement-expanded');
    const expandedContent = announcementBox ? announcementBox.querySelector('.announcement-expanded-content') : null;
    let placeholder = null;

    if (announcementBox && closeExpandedBtn && expandedContent) {
        if (!ENABLE_EXPANSION) {
            announcementBox.style.cursor = 'default';
        } else {
            announcementBox.addEventListener('click', (e) => {
                // Prevent expansion if clicking close button or if already expanded
                if (e.target === closeExpandedBtn || announcementBox.classList.contains('expanded')) return;

                // 1. Get initial position
                const rect = announcementBox.getBoundingClientRect();

                // 2. Create placeholder to prevent layout shift
                placeholder = document.createElement('div');
                placeholder.className = announcementBox.className;
                placeholder.style.visibility = 'hidden';
                placeholder.style.height = `${rect.height}px`; // Ensure height is preserved
                // Copy grid column span if needed, though className should handle it if styles are class-based
                // Insert placeholder before announcementBox
                announcementBox.parentNode.insertBefore(placeholder, announcementBox);

                // 3. Set explicit styles to match current position (FLIP Start)
                announcementBox.style.top = `${rect.top}px`;
                announcementBox.style.left = `${rect.left}px`;
                announcementBox.style.width = `${rect.width}px`;
                announcementBox.style.height = `${rect.height}px`;
                announcementBox.style.position = 'fixed';
                announcementBox.style.zIndex = '9999';
                announcementBox.style.margin = '0'; // Reset margin to avoid offsets

                // 4. Force reflow
                void announcementBox.offsetWidth;

                // 5. Add expanded class (FLIP End)
                announcementBox.classList.add('expanded');
                expandedContent.classList.remove('hidden');
                document.body.style.overflow = 'hidden';

                // 6. Clear inline styles after transition to allow CSS to control full screen
                // We keep position: fixed via the class, but we want to remove specific top/left/w/h
                // so that if window resizes, it stays full screen.
                setTimeout(() => {
                    announcementBox.style.top = '';
                    announcementBox.style.left = '';
                    announcementBox.style.width = '';
                    announcementBox.style.height = '';
                }, 500);
            });

            closeExpandedBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent triggering the box click

                if (!placeholder) {
                    // Fallback if placeholder is missing
                    announcementBox.classList.remove('expanded');
                    expandedContent.classList.add('hidden');
                    document.body.style.overflow = '';
                    return;
                }

                // 1. Get placeholder position (where we want to go back to)
                const rect = placeholder.getBoundingClientRect();

                // 2. Set styles to current full screen state (FLIP Start for close)
                // This is needed because we removed them in the timeout above.
                // Actually, we can just set them to the target immediately because we are removing the class.

                // First, re-apply fixed positioning explicitly to ensure smooth transition from "CSS class fixed" to "inline style fixed"
                // (Browser might handle this automatically since class has fixed, but let's be safe)
                announcementBox.style.position = 'fixed';
                announcementBox.style.zIndex = '9999';
                announcementBox.style.top = '0px';
                announcementBox.style.left = '0px';
                announcementBox.style.width = '100%';
                announcementBox.style.height = '100%';

                // Force reflow
                void announcementBox.offsetWidth;

                // 3. Remove expanded class (so we can animate to the target)
                announcementBox.classList.remove('expanded');
                expandedContent.classList.add('hidden');
                document.body.style.overflow = '';

                // 4. Animate to placeholder position (FLIP End for close)
                announcementBox.style.top = `${rect.top}px`;
                announcementBox.style.left = `${rect.left}px`;
                announcementBox.style.width = `${rect.width}px`;
                announcementBox.style.height = `${rect.height}px`;

                // 5. Cleanup after transition
                setTimeout(() => {
                    announcementBox.style.position = '';
                    announcementBox.style.top = '';
                    announcementBox.style.left = '';
                    announcementBox.style.width = '';
                    announcementBox.style.height = '';
                    announcementBox.style.zIndex = '';
                    announcementBox.style.margin = '';

                    if (placeholder && placeholder.parentNode) {
                        placeholder.parentNode.removeChild(placeholder);
                        placeholder = null;
                    }
                }, 500);
            });
        }
    }
});
