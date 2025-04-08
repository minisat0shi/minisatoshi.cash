console.log("theme-init.js loaded successfully");

// Theme and blackout state setup
const savedTheme = localStorage.getItem('bs-theme'); // Get saved theme from localStorage
const savedBlackout = localStorage.getItem('bs-blackout'); // Get saved blackout state
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches; // Check system dark mode preference

// Determine initial theme and blackout
const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light'); // Use saved theme or system preference
const blackout = savedTheme ? (savedBlackout === 'true' && theme === 'dark') : (systemPrefersDark && theme === 'dark'); // Set blackout based on saved state or system

// Apply theme and blackout to document
document.documentElement.setAttribute('data-bs-theme', theme); // Set the theme attribute
console.log("Blackout calc:", blackout, savedBlackout, systemPrefersDark); // Checking Blackout calc
if (blackout) {
    document.documentElement.setAttribute('data-blackout', 'true'); // Enable blackout if true
} else {
    document.documentElement.removeAttribute('data-blackout'); // Remove blackout if false
}

// Log the result for debugging
console.log("Initial theme set:", theme, "Blackout:", blackout);