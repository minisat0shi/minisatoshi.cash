document.addEventListener('DOMContentLoaded', function () {
  // === Copy to Clipboard for Share Buttons ===
  const shareButtons = document.querySelectorAll('.share-button');

  shareButtons.forEach((button) => {
    const tooltip = new bootstrap.Tooltip(button, {
      title: 'Share', // Default tooltip text
    });

    button.addEventListener('click', async function (e) {
      try {
        const item = this.closest('.share-item');
        if (item && item.id) {
          const url = window.location.href.split('#')[0] + '#' + item.id;
          await navigator.clipboard.writeText(url);

          tooltip.setContent({ '.tooltip-inner': 'Copied!' });
          tooltip.show();

          setTimeout(() => {
            tooltip.hide();
            tooltip.setContent({ '.tooltip-inner': 'Share' });
          }, 1500);
        }
      } catch (error) {
        console.error('Failed to copy to clipboard:', error);
        tooltip.setContent({ '.tooltip-inner': 'Copy Failed!' });
        tooltip.show();
        setTimeout(() => {
          tooltip.hide();
          tooltip.setContent({ '.tooltip-inner': 'Share' });
        }, 2000);
      }
    });
  });

  // === Theme-Based Image Swap ===
  function swapImage() {
    const img = document.getElementById('bchSplitLogo');
    if (img) {
      const theme = document.documentElement.getAttribute('data-bs-theme');
      const srcAttribute = theme === 'dark' ? 'data-src-dark' : 'data-src-light';
      const src = img.getAttribute(srcAttribute);
      if (src) {
        img.src = src;
      }
    }
  }

  swapImage(); // Initial call
  const observer = new MutationObserver(swapImage);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-bs-theme'],
  });
});