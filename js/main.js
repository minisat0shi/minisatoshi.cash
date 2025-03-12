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

  // Initialize UI based on current theme
  const currentTheme = document.documentElement.getAttribute('data-bs-theme');
  const icon = document.getElementById('themeIcon');
  icon.className = `bi ${currentTheme === 'light' ? 'bi-brightness-high-fill' : 'bi-moon-stars-fill'}`;
  document.querySelectorAll('.theme-switcher .dropdown-item').forEach(item => {
    item.classList.toggle('active', item.getAttribute('data-theme') === currentTheme);
  });
  updateButtonStyles(); // Apply initial button styles

  // Handle theme toggle clicks
  document.querySelectorAll('.theme-switcher .dropdown-item').forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const theme = this.getAttribute('data-theme');
      document.documentElement.setAttribute('data-bs-theme', theme);
      localStorage.setItem('bs-theme', theme);
      icon.className = `bi ${theme === 'light' ? 'bi-brightness-high-fill' : 'bi-moon-stars-fill'}`;
      document.querySelectorAll('.theme-switcher .dropdown-item').forEach(i => {
        i.classList.toggle('active', i.getAttribute('data-theme') === theme);
      });
      updateButtonStyles(); // Update buttons on toggle
    });
  });
});