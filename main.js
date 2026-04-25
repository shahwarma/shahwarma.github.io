document.addEventListener('DOMContentLoaded', () => {
    const navBtns = document.querySelectorAll('.nav-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    // Handle Tab Switching
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Get the target tab from data attribute
            const targetTab = btn.getAttribute('data-tab');

            // Remove active class from all buttons and panels
            navBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            // Add active class to clicked button and corresponding panel
            btn.classList.add('active');
            const activePanel = document.getElementById(`tab-${targetTab}`);
            activePanel.classList.add('active');

            // Optional: Add a subtle glitch effect when changing tabs
            triggerGlitchEffect();

            // Trigger typewriter for any elements in the active tab
            const typewriters = activePanel.querySelectorAll('.typewriter');
            typewriters.forEach(tw => startTypewriter(tw));
        });
    });

    function triggerGlitchEffect() {
        const body = document.body;
        body.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
        body.style.filter = 'contrast(1.2) brightness(1.2)';

        setTimeout(() => {
            body.style.transform = 'translate(0, 0)';
            body.style.filter = 'none';
        }, 50);
    }

    // Typewriter effect logic
    function startTypewriter(element) {
        // Check if already typed so we don't retype endlessly
        if (element.dataset.typed === "true") return;

        // Store original text if not stored
        if (!element.dataset.originalText) {
            // clean whitespace to avoid weird spaces
            element.dataset.originalText = element.textContent.trim().replace(/\s+/g, ' ');
        }

        const text = element.dataset.originalText;
        element.innerHTML = '';

        const speed = parseInt(element.dataset.speed) || 30;

        // Create cursor
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';

        let i = 0;

        // Prevent multiple intervals on same element
        if (element.typeInterval) clearInterval(element.typeInterval);

        element.appendChild(cursor);

        element.typeInterval = setInterval(() => {
            if (i < text.length) {
                // Create letter span for glow effect
                const charSpan = document.createElement('span');
                charSpan.className = 'typewriter-letter glow';
                charSpan.textContent = text.charAt(i);

                // Insert before cursor
                element.insertBefore(charSpan, cursor);

                // Remove glow class after animation
                setTimeout(() => {
                    charSpan.classList.remove('glow');
                }, 300);

                i++;
            } else {
                clearInterval(element.typeInterval);
                element.dataset.typed = "true";
            }
        }, speed);
    }

    // Initial typewriter trigger for active tab
    const activeTabTypewriters = document.querySelectorAll('.tab-panel.active .typewriter');
    activeTabTypewriters.forEach(tw => startTypewriter(tw));
});
