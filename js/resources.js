document.addEventListener('DOMContentLoaded', function () {
  const galleries = {
    Branding: document.getElementById('branding-gallery'),
    Stickers: document.getElementById('stickers-gallery'),
    'Informational Graphics': document.getElementById('informational-gallery'),
    'Fun Graphics': document.getElementById('fun-gallery'),
    Memes: document.getElementById('memes-gallery'),
  };
  const masonryInstances = {};
  let allImages = {};

  // Fetch and populate galleries
  fetch('/api/resources.php')
    .then((response) => response.json())
    .then((data) => {
      allImages = data;
      Object.keys(galleries).forEach((section) => {
        const gallery = galleries[section];
        gallery.innerHTML = '';

        const images = data[section] || [];
        images.forEach((image, index) => {
          const item = document.createElement('div');
          item.className = 'grid-item';

          const img = document.createElement('img');
          img.src = image.url;
          img.alt = image.name;

          item.addEventListener('click', () => openCarousel(section, index));

          item.appendChild(img);
          gallery.appendChild(item);
        });

        imagesLoaded(gallery, function () {
          masonryInstances[section] = new Masonry(gallery, {
            itemSelector: '.grid-item',
            percentPosition: true,
            gutter: 0,
            horizontalOrder: false,
          });
          masonryInstances[section].layout();
        });
      });

      // Handle window resize
      let resizeTimer;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          Object.values(masonryInstances).forEach((msnry) => msnry.layout());
        }, 100);
      });
    })
    .catch((error) => {
      console.error('Error loading images:', error);
      Object.values(galleries).forEach((gallery) => {
        gallery.innerHTML = '<p class="text-danger">Error loading images</p>';
      });
    });

  // Carousel functionality
  function openCarousel(section, startIndex) {
    const images = allImages[section] || [];
    const carouselInner = document.getElementById('carouselInner');
    const carouselIndicators = document.getElementById('carouselIndicators');
    const downloadButton = document.getElementById('downloadButton');

    carouselInner.innerHTML = '';
    carouselIndicators.innerHTML = '';

    images.forEach((image, index) => {
      const item = document.createElement('div');
      item.className = `carousel-item ${index === startIndex ? 'active' : ''}`;

      const img = document.createElement('img');
      img.src = image.url;
      img.alt = image.name;
      img.className = 'd-block';

      item.appendChild(img);
      carouselInner.appendChild(item);

      const indicator = document.createElement('button');
      indicator.type = 'button';
      indicator.dataset.bsTarget = '#imageCarousel';
      indicator.dataset.bsSlideTo = index;
      if (index === startIndex) {
        indicator.className = 'active';
        indicator.setAttribute('aria-current', 'true');
      }
      indicator.setAttribute('aria-label', `Slide ${index + 1}`);
      carouselIndicators.appendChild(indicator);
    });

    // Set initial download link
    downloadButton.href = images[startIndex].url;
    downloadButton.download = images[startIndex].name;

    // Update download link on slide change
    const carousel = document.getElementById('imageCarousel');
    carousel.addEventListener('slide.bs.carousel', function (event) {
      const newIndex = event.to;
      downloadButton.href = images[newIndex].url;
      downloadButton.download = images[newIndex].name;
    });

    const modal = new bootstrap.Modal(document.getElementById('imageCarouselModal'));
    modal.show();
  }
});