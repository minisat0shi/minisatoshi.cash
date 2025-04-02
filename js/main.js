console.log("main.js loaded successfully");

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach(tooltipTriggerEl => {
        new bootstrap.Tooltip(tooltipTriggerEl);
    });
    console.log("Tooltips initialized:", tooltipTriggerList.length);

    // Clipboard Copy Functionality
    const button = document.getElementById('copyButton');
    const copyToClipboard = async () => {
        const tooltip = bootstrap.Tooltip.getInstance(button); // Get existing tooltip instance
        try {
            const element = document.querySelector(".user-select-all");
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

    // Theme Switching
    function updateThemeColor() {
        const metaTag = document.getElementById('themeColorMeta');
        if (metaTag) {
            const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--bs-body-bg').trim();
            metaTag.setAttribute('content', bgColor);
        }
    }

    const currentTheme = document.documentElement.getAttribute('data-bs-theme');
    const isBlackout = document.documentElement.getAttribute('data-blackout') === 'true';
    const icon = document.getElementById('themeIcon');
    
    icon.className = `bi ${
        currentTheme === 'light' ? 'bi-brightness-high-fill' :
        currentTheme === 'dark' && isBlackout ? 'bi-moon-stars-fill' :
        'bi-moon-fill'
    }`;

    document.querySelectorAll('.theme-switcher .dropdown-item').forEach(item => {
        const itemTheme = item.getAttribute('data-theme');
        const itemBlackout = item.getAttribute('data-blackout') === 'true';
        item.classList.toggle('active', itemTheme === currentTheme && itemBlackout === isBlackout);
    });
    
    updateThemeColor();

    document.querySelectorAll('.theme-switcher .dropdown-item').forEach(item => {
        item.addEventListener('click', function(e) {
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
});