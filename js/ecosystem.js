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
      console.log('Masonry initialized');
    }
    if (msnry) {
      cardContainer.offsetHeight; // Force repaint
      msnry.layout();
      console.log('Masonry layout updated');
    }
  }

  // Lazy Load Images with Intersection Observer
  function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    console.log('Found', images.length, 'images to lazy load');
    
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const wrapper = img.closest('.image-wrapper');
            const spinner = wrapper ? wrapper.querySelector('.spinner-border') : null;
            const src = img.getAttribute('data-src');

            console.log('Loading image:', src);

            img.src = src;
            img.removeAttribute('data-src');

            img.addEventListener(
              'load',
              () => {
                console.log('Image loaded successfully:', src);
                img.classList.add('loaded');
                if (spinner) {
                  spinner.remove();
                  console.log('Spinner removed for:', src);
                }
                if (msnry) msnry.layout();
              },
              { once: true }
            );

            img.addEventListener(
              'error',
              () => {
                console.error('Failed to load image:', src);
                if (spinner) spinner.remove();
                img.style.display = 'none';
                if (msnry) msnry.layout();
              },
              { once: true }
            );

            observer.unobserve(img);
          }
        });
      },
      { rootMargin: '0px 0px 200px 0px' }
    );

    images.forEach((img) => {
      observer.observe(img);
      console.log('Observing image:', img.getAttribute('data-src'));
    });
  }

  // Card Filtering
  function filterCards(filter) {
    cards.forEach((card) => {
      const cardHeaders = card.getAttribute('data-header') || '';
      card.parentElement.style.display =
        filter === 'all' || isInHeaders(cardHeaders, filter) ? 'block' : 'none';
    });
    updateLayout();
    setupLazyLoading(); // Re-observe visible images
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
    setupLazyLoading(); // Re-observe visible images
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

    imageIds.forEach((id) => {
      const img = document.getElementById(id);
      if (img) {
        const srcAttribute = theme === 'dark' ? 'data-src-dark' : 'data-src-light';
        const src = img.getAttribute(srcAttribute);
        if (src) {
          img.src = src;
          img.classList.add('loaded');
          if (msnry) msnry.layout();
          console.log('Theme-swapped image:', src);
        }
      }
    });
  }

  // Initial Setup
  setupLazyLoading();
  swapImage();

  // Observer for theme changes
  const observer = new MutationObserver(() => {
    swapImage();
    setupLazyLoading();
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-bs-theme'],
  });

  // Ensure layout is updated after all resources are loaded
  window.addEventListener('load', () => {
    updateLayout();
    setupLazyLoading();
  });
});