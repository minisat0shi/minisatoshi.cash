document.addEventListener('DOMContentLoaded', function() {
    const particlesToggle = document.getElementById('particlesToggle');
    const particlesIcon = document.getElementById('particlesIcon');
    const particlesContainer = document.getElementById('particles-js');
    let particlesEnabled = true; // Tracks desired visibility state

    // Ensure particles.js is initialized by waiting for it to be ready
    if (!window.pJSDom || window.pJSDom.length === 0) {
        console.log('Waiting for particles.js to initialize...');
        const checkParticles = setInterval(() => {
            if (window.pJSDom && window.pJSDom.length > 0) {
                clearInterval(checkParticles);
                console.log('Particles.js confirmed initialized');
                initializeToggleState();
            }
        }, 100);
    } else {
        console.log('Particles.js already initialized');
        initializeToggleState();
    }

    function initializeToggleState() {
        // Sync initial state with localStorage
        const savedState = localStorage.getItem('particlesEnabled');
        if (savedState !== null) {
            particlesEnabled = savedState === 'true';
        } else {
            particlesEnabled = true; // Default to visible
            localStorage.setItem('particlesEnabled', 'true');
        }

        // Apply initial visibility state to HTML
        if (particlesEnabled) {
            particlesContainer.style.display = 'block';
            particlesIcon.classList.remove('bi-star');
            particlesIcon.classList.add('bi-stars');
        } else {
            particlesContainer.style.display = 'none';
            particlesIcon.classList.remove('bi-stars');
            particlesIcon.classList.add('bi-star');
        }
        console.log('Initial particles visibility state:', particlesEnabled);

        // Set up toggle button click handler
        particlesToggle.addEventListener('click', function() {
            particlesEnabled = !particlesEnabled;

            if (particlesEnabled) {
                particlesContainer.style.display = 'block';
                particlesIcon.classList.remove('bi-star');
                particlesIcon.classList.add('bi-stars');
                console.log('Particles shown');
            } else {
                particlesContainer.style.display = 'none';
                particlesIcon.classList.remove('bi-stars');
                particlesIcon.classList.add('bi-star');
                console.log('Particles hidden');
            }

            localStorage.setItem('particlesEnabled', particlesEnabled.toString());
            console.log('Particles visibility state saved:', particlesEnabled);
        });
    }
});