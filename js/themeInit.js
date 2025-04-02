console.log("theme-init.js loaded successfully");

// Set initial theme and blackout state
const savedTheme = localStorage.getItem('bs-theme');
const savedBlackout = localStorage.getItem('bs-blackout');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
const blackout = savedTheme ? (savedBlackout === 'true' && theme === 'dark') : (systemPrefersDark && theme === 'dark');
document.documentElement.setAttribute('data-bs-theme', theme);
if (blackout) {
    document.documentElement.setAttribute('data-blackout', 'true');
} else {
    document.documentElement.removeAttribute('data-blackout');
}
console.log("Initial theme set:", theme, "Blackout:", blackout);