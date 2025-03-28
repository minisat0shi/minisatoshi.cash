//Copy to Clipboard Script for donation address
document.addEventListener('DOMContentLoaded', function() {
	const button = document.getElementById('copyButton');
	const tooltip = new bootstrap.Tooltip(button);
	const copyToClipboard = async () => {
		try {
			const element = document.querySelector(".user-select-all");
			await navigator.clipboard.writeText(element.textContent);
			// Optional: Provide feedback or perform additional actions upon successful copy
			// Update tooltip text
			tooltip.setContent({ '.tooltip-inner': 'Copied!' });
			// Show tooltip
			tooltip.show();

			// Hide tooltip after a short delay
			setTimeout(() => {
			tooltip.hide();
			// Reset tooltip text for next use
			tooltip.setContent({ '.tooltip-inner': 'Copy to Clipboard' });
			}, 1500); // Adjust delay as needed
		} catch (error) {
			console.error("Failed to copy to clipboard:", error);
			// Optional: Handle and display the error to the user
			tooltip.setContent({ '.tooltip-inner': 'Copy Failed!' });
			tooltip.show();
			setTimeout(() => {
			tooltip.hide();
			tooltip.setContent({ '.tooltip-inner': 'Copy to Clipboard' });
			}, 2000); // Adjust delay for error message
		}
	};
	// Attach the function to the button's onclick event again or maintain existing setup
	button.addEventListener('click', copyToClipboard);
});

//Theme Switching
document.addEventListener('DOMContentLoaded', function() {
    // Update button styles based on current theme
    function updateButtonStyles() {
        document.querySelectorAll('.btn-outline-secondary, .btn-secondary').forEach(button => {
            const currentTheme = document.documentElement.getAttribute('data-bs-theme');
            if (currentTheme === 'light') {
                button.classList.remove('btn-outline-secondary');
                button.classList.add('btn-secondary');
            } else {
                button.classList.remove('btn-secondary');
                button.classList.add('btn-outline-secondary');
            }
        });
    }

    // Update browser chrome color to match --bs-body-bg
    function updateThemeColor() {
        const metaTag = document.getElementById('themeColorMeta');
        if (metaTag) {
            // Get the computed background color from CSS variable
            const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--bs-body-bg').trim();
            metaTag.setAttribute('content', bgColor);
        }
    }

    // Initialize UI based on current theme and blackout state
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
    
    // Apply initial styles and theme color
    updateButtonStyles();
    updateThemeColor();

    // Handle theme toggle clicks
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
            
            // Update styles and theme color after toggle
            updateButtonStyles();
            updateThemeColor();
        });
    });
});