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
      const currentUrl = new URL(window.location.href); // Fixed syntax here
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
    const images = {
      bchbull: theme === 'dark' ? 'images/Ecosystem/bchbull-dark.svg' : 'images/Ecosystem/bchbull-light.svg',
      tapswap: theme === 'dark' ? 'images/Ecosystem/tapswap-dark.png?v=0.01' : 'images/Ecosystem/tapswap-light.png?v=0.01',
      XOCash: theme === 'dark' ? 'images/Ecosystem/XO-cash-darkmode.svg?v=0.01' : 'images/Ecosystem/XO-cash-lightmode.svg?v=0.01',
      XOStack: theme === 'dark' ? 'images/Ecosystem/XO-stack-darkmode.svg?v=0.01' : 'images/Ecosystem/XO-stack-lightmode.svg?v=0.01',
      oraclesCash: theme === 'dark' ? 'images/Ecosystem/oracles-dark.svg?v=2' : 'images/Ecosystem/oracles-light.svg?v=2',
    };

    for (const [id, src] of Object.entries(images)) {
      const img = document.getElementById(id);
      if (img) img.src = src;
    }
  }

  swapImage(); // Initial call
  const observer = new MutationObserver(swapImage);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-bs-theme'],
  });
});