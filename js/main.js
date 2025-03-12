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
  function setTheme(theme, source = 'user') {
    document.documentElement.setAttribute('data-bs-theme', theme);
    document.documentElement.setAttribute('data-theme-source', source);
    localStorage.setItem('bs-theme', theme);
    localStorage.setItem('bs-theme-source', source);
    updateThemeIcon(theme);
    updateActiveDropdownItem(theme);
    updateButtonStyles();
  }

  function getCurrentTheme() {
    const savedTheme = localStorage.getItem('bs-theme');
    const savedSource = localStorage.getItem('bs-theme-source');
    if (savedTheme && savedSource) {
      document.documentElement.setAttribute('data-theme-source', savedSource);
      return savedTheme; // Use saved preference
    }
    // Default to system preference
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return isDark ? 'dark' : 'light';
  }

  function updateThemeIcon(theme) {
    const icon = document.getElementById('themeIcon');
    icon.className = `bi ${theme === 'light' ? 'bi-brightness-high-fill' : 'bi-moon-stars-fill'}`;
  }

  function updateActiveDropdownItem(theme) {
    document.querySelectorAll('.theme-switcher .dropdown-item').forEach(item => {
      item.classList.toggle('active', item.getAttribute('data-theme') === theme);
    });
  }

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

  // Apply initial theme based on system preference
  const initialTheme = getCurrentTheme();
  const initialSource = localStorage.getItem('bs-theme') ? 'user' : 'system';
  setTheme(initialTheme, initialSource);

  // Handle manual theme switching
  document.querySelectorAll('.theme-switcher .dropdown-item').forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const theme = this.getAttribute('data-theme');
      setTheme(theme, 'user');
    });
  });
});