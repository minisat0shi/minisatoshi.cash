//Back to Top Button
//Get the button
let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


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

//Updating button styles on theme change
document.addEventListener('DOMContentLoaded', function() {
  function setTheme(theme) {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('bs-theme', theme);
    updateThemeIcon(theme);
    updateActiveDropdownItem(theme);
    updateButtonStyles(); // Call this function to update button styles on theme change
  }

  function getCurrentTheme() {
    return localStorage.getItem('bs-theme') || 'dark';
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

  setTheme(getCurrentTheme());
  updateButtonStyles(); // Initial call to ensure buttons are styled correctly on load

  document.querySelectorAll('.theme-switcher .dropdown-item').forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const theme = this.getAttribute('data-theme');
      setTheme(theme);
    });
  });
});