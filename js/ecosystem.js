document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const searchInput = document.getElementById('searchInput');
  const filterButtons = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('.card');
  const cardContainer = document.getElementById('cardContainer');
  const copyButton = document.querySelector('.input-group .btn-outline-secondary');

  let msnry; // Masonry instance

  // Utility Functions
  function isInHeaders(headers, filter) {
    return headers
      .split(',')
      .map((h) => h.trim().toLowerCase())
      .includes(filter.toLowerCase());
  }

  function updateLayout() {
    if (!msnry && window.Masonry) {
      msnry = new Masonry(cardContainer, {
        itemSelector: '.col',
        percentPosition: true,
      });
    }
    if (msnry) {
      cardContainer.offsetHeight; // Force repaint
      msnry.layout();
    }
  }

  // Card Filtering
  function filterCards(filter) {
    cards.forEach((card) => {
      const cardHeaders = card.getAttribute('data-header') || '';
      card.parentElement.style.display =
        filter === 'all' || isInHeaders(cardHeaders, filter) ? 'block' : 'none';
    });
    updateLayout();
  }

  // Search Functionality
  function performSearch(query) {
    query = query.toLowerCase();
    cards.forEach((card) => {
      const cardText = card.textContent.toLowerCase();
      const cardHeaders = card.getAttribute('data-header')?.toLowerCase() || '';
      card.parentElement.style.display =
        cardText.includes(query) || cardHeaders.includes(query) ? 'block' : 'none';
    });
    updateLayout();
  }

  // Event Listeners
  searchInput.addEventListener('keyup', function () {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    performSearch(this.value);
  });

  filterButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const filter = this.getAttribute('data-filter');
      filterCards(filter);
      searchInput.value = '';
      filterButtons.forEach((btn) => btn.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // URL Search/Filter on Load
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('query');
  const filter = urlParams.get('filter');
  if (query) {
    searchInput.value = query;
    performSearch(query);
  } else if (filter) {
    filterCards(filter);
  } else {
    filterCards('all');
  }

  // Copy URL Functionality
  if (copyButton) {
    const tooltip = new bootstrap.Tooltip(copyButton, {
      title: 'Share query',
      trigger: 'manual',
    });

    copyButton.addEventListener('click', function () {
      const query = searchInput.value.trim();
      const currentUrl = new URL(window.location.href);
      currentUrl.search = '';
      currentUrl.searchParams.set('query', encodeURIComponent(query));
      const url = currentUrl.href;

      const tempInput = document.createElement('input');
      tempInput.value = url;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);

      tooltip.setContent({ '.tooltip-inner': 'URL Copied!' });
      tooltip.show();
      setTimeout(() => {
        tooltip.setContent({ '.tooltip-inner': 'Share query' });
        tooltip.hide();
      }, 1500);
    });
  }

  // Theme-Based Image Swap
  function swapImage() {
    const theme = document.documentElement.getAttribute('data-bs-theme');
    const imageIds = ['bchbull', 'tapswap', 'XOCash', 'XOStack', 'oraclesCash'];

    imageIds.forEach(id => {
      const img = document.getElementById(id);
      if (img) {
        const srcAttribute = theme === 'dark' ? 'data-src-dark' : 'data-src-light';
        const src = img.getAttribute(srcAttribute);
        if (src) {
          img.src = src;
        }
      }
    });
  }

  // Initial call
  swapImage();

  // Observer for theme changes
  const observer = new MutationObserver(swapImage);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-bs-theme'],
  });

  // Ensure layout is updated after all resources are loaded
  window.addEventListener('load', updateLayout);
});