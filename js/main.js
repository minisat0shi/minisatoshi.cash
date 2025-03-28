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


// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function() {
    // Function to update button styles based on the current theme
    // This toggles between solid (btn-secondary) and outline (btn-outline-secondary) buttons
    function updateButtonStyles() {
        // Select all buttons with either class
        document.querySelectorAll('.btn-outline-secondary, .btn-secondary').forEach(button => {
            // Get the current theme from the html element
            const currentTheme = document.documentElement.getAttribute('data-bs-theme');
            if (currentTheme === 'light') {
                // Light mode: use solid buttons
                button.classList.remove('btn-outline-secondary');
                button.classList.add('btn-secondary');
            } else {
                // Dark or blackout mode: use outline buttons
                button.classList.remove('btn-secondary');
                button.classList.add('btn-outline-secondary');
            }
        });
    }

    // Initialize UI based on current theme and blackout state (set by inline script)
    // Get the current theme from the html element
    const currentTheme = document.documentElement.getAttribute('data-bs-theme');
    // Check if blackout mode is active (data-blackout attribute is set to "true")
    const isBlackout = document.documentElement.getAttribute('data-blackout') === 'true';
    // Get the theme icon element to update its class
    const icon = document.getElementById('themeIcon');
    
    // Set the icon based on the current theme and blackout state
    icon.className = `bi ${
        currentTheme === 'light' ? 'bi-brightness-high-fill' :    // Light mode: sun icon
        currentTheme === 'dark' && isBlackout ? 'bi-moon-stars-fill' : // Blackout mode: moon with stars
        'bi-moon-fill'                                            // Dark mode: plain moon
    }`;

    // Set the active state in the dropdown menu
    document.querySelectorAll('.theme-switcher .dropdown-item').forEach(item => {
        // Get the theme and blackout values from the dropdown item’s data attributes
        const itemTheme = item.getAttribute('data-theme');
        const itemBlackout = item.getAttribute('data-blackout') === 'true';
        // Toggle the 'active' class if the item matches the current state
        item.classList.toggle('active', itemTheme === currentTheme && itemBlackout === isBlackout);
    });

    // Apply initial button styles based on the theme
    updateButtonStyles();

    // Handle clicks on the theme switcher dropdown items
    document.querySelectorAll('.theme-switcher .dropdown-item').forEach(item => {
        item.addEventListener('click', function(e) {
            // Prevent the default link behavior
            e.preventDefault();
            // Get the selected theme and blackout state from the clicked item
            const theme = this.getAttribute('data-theme');
            const blackout = this.getAttribute('data-blackout') === 'true';

            // Set the theme on the html element
            document.documentElement.setAttribute('data-bs-theme', theme);
            // Save the theme choice to localStorage
            localStorage.setItem('bs-theme', theme);
            
            // Handle blackout mode: set or remove data-blackout attribute and save to localStorage
            if (theme === 'dark' && blackout) {
                document.documentElement.setAttribute('data-blackout', 'true');
                localStorage.setItem('bs-blackout', 'true');
            } else {
                document.documentElement.removeAttribute('data-blackout');
                localStorage.setItem('bs-blackout', 'false');
            }

            // Update the icon based on the new theme and blackout state
            icon.className = `bi ${
                theme === 'light' ? 'bi-brightness-high-fill' :      // Light mode: sun icon
                theme === 'dark' && blackout ? 'bi-moon-stars-fill' : // Blackout mode: moon with stars
                'bi-moon-fill'                                       // Dark mode: plain moon
            }`;

            // Update the active state in the dropdown menu
            document.querySelectorAll('.theme-switcher .dropdown-item').forEach(i => {
                const iTheme = i.getAttribute('data-theme');
                const iBlackout = i.getAttribute('data-blackout') === 'true';
                i.classList.toggle('active', iTheme === theme && iBlackout === blackout);
            });

            // Update button styles after the theme change
            updateButtonStyles();
        });
    });
});