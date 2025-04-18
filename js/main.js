console.log("main.js loaded successfully");
console.log("Bootstrap:", typeof bootstrap);

// Main initialization function
function initializePage() {
    console.log("Initializing page functionality");

    // Initialize Bootstrap tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach(tooltipTriggerEl => {
        new bootstrap.Tooltip(tooltipTriggerEl);
    });
    console.log("Tooltips initialized:", tooltipTriggerList.length);

    // Copy to clipboard functionality
    const button = document.getElementById('copyButton');
    console.log("copyButton:", button);
    const copyToClipboard = async () => {
        console.log("Clipboard clicked");
        const tooltip = bootstrap.Tooltip.getInstance(button);
        try {
            const element = document.querySelector(".user-select-all");
            console.log("Copying text:", element.textContent);
            await navigator.clipboard.writeText(element.textContent);
            tooltip.setContent({ '.tooltip-inner': 'Copied!' });
            tooltip.show();
            setTimeout(() => {
                tooltip.hide();
                tooltip.setContent({ '.tooltip-inner': 'Copy to Clipboard' });
            }, 1500);
        } catch (error) {
            console.error("Failed to copy to clipboard:", error);
            tooltip.setContent({ '.tooltip-inner': 'Copy Failed!' });
            tooltip.show();
            setTimeout(() => {
                tooltip.hide();
                tooltip.setContent({ '.tooltip-inner': 'Copy to Clipboard' });
            }, 2000);
        }
    };
    button.addEventListener('click', copyToClipboard);

    // Update theme color meta tag
    function updateThemeColor() {
        const metaTag = document.getElementById('themeColorMeta');
        if (metaTag) {
            const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--bs-body-bg').trim();
            metaTag.setAttribute('content', bgColor);
        }
    }

    // Set up initial theme state and icon
    const currentTheme = document.documentElement.getAttribute('data-bs-theme');
    const isBlackout = document.documentElement.getAttribute('data-blackout') === 'true';
    const icon = document.getElementById('themeIcon');
    icon.className = `bi ${
        currentTheme === 'light' ? 'bi-brightness-high-fill' :
        currentTheme === 'dark' && isBlackout ? 'bi-moon-stars-fill' :
        'bi-moon-fill'
    }`;

    // Highlight active theme in dropdown
    document.querySelectorAll('.theme-switcher .dropdown-item').forEach(item => {
        const itemTheme = item.getAttribute('data-theme');
        const itemBlackout = item.getAttribute('data-blackout') === 'true';
        item.classList.toggle('active', itemTheme === currentTheme && itemBlackout === isBlackout);
    });
    
    updateThemeColor();

    // Handle theme switching
    document.querySelectorAll('.theme-switcher .dropdown-item').forEach(item => {
        item.addEventListener('click', function(e) {
            console.log("Theme clicked");
            e.preventDefault();
            const theme = this.getAttribute('data-theme');
            const blackout = this.getAttribute('data-blackout') === 'true';

            document.documentElement.setAttribute('data-bs-theme', theme);
            localStorage.setItem('bs-theme', theme);
            if (theme === 'dark' && blackout) {
                document.documentElement.setAttribute('data-blackout', 'true');
                localStorage.setItem('bs-blackout', 'true');
            } else {
                document.documentElement.removeAttribute('data-blackout');
                localStorage.setItem('bs-blackout', 'false');
            }

            icon.className = `bi ${
                theme === 'light' ? 'bi-brightness-high-fill' :
                theme === 'dark' && blackout ? 'bi-moon-stars-fill' :
                'bi-moon-fill'
            }`;

            document.querySelectorAll('.theme-switcher .dropdown-item').forEach(i => {
                const iTheme = i.getAttribute('data-theme');
                const iBlackout = i.getAttribute('data-blackout') === 'true';
                i.classList.toggle('active', iTheme === theme && iBlackout === blackout);
            });
            
            updateThemeColor();
        });
    });
}

// Ensure DOM is ready before initializing
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    console.log("DOM already loaded, initializing immediately");
    initializePage();
} else {
    console.log("Waiting for DOMContentLoaded");
    document.addEventListener('DOMContentLoaded', initializePage);
}