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

//Detecting and changing page theme
document.addEventListener('DOMContentLoaded', function() {
  // Sets the theme and source attributes, updates UI, and saves to localStorage
  function setTheme(theme, source = 'user') {
    document.documentElement.setAttribute('data-bs-theme', theme);
    document.documentElement.setAttribute('data-theme-source', source);
    localStorage.setItem('bs-theme', theme);
    localStorage.setItem('bs-theme-source', source);
    updateThemeIcon(theme);
    updateActiveDropdownItem(theme);
    updateButtonStyles();
  }

  // Determines the current theme: user-saved if toggled, otherwise system preference
  function getCurrentTheme() {
    const savedTheme = localStorage.getItem('bs-theme');
    const savedSource = localStorage.getItem('bs-theme-source');
    if (savedTheme && savedSource === 'user') {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // Updates the theme toggle icon based on the current theme
  function updateThemeIcon(theme) {
    const icon = document.getElementById('themeIcon');
    icon.className = `bi ${theme === 'light' ? 'bi-brightness-high-fill' : 'bi-moon-stars-fill'}`;
  }

  // Highlights the active theme in the dropdown menu
  function updateActiveDropdownItem(theme) {
    document.querySelectorAll('.theme-switcher .dropdown-item').forEach(item => {
      item.classList.toggle('active', item.getAttribute('data-theme') === theme);
    });
  }

  // Adjusts button classes based on the current theme
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

  // Initialize theme on page load
  const initialTheme = getCurrentTheme();
  const initialSource = localStorage.getItem('bs-theme-source') === 'user' ? 'user' : 'system';
  setTheme(initialTheme, initialSource);

  // Add click listeners to theme toggle dropdown items
  document.querySelectorAll('.theme-switcher .dropdown-item').forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const theme = this.getAttribute('data-theme');
      setTheme(theme, 'user');
    });
  });

  // Listen for system theme changes and update if no user override
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const savedSource = localStorage.getItem('bs-theme-source');
    if (savedSource !== 'user') {
      const newTheme = e.matches ? 'dark' : 'light';
      setTheme(newTheme, 'system');
    }
  });
});