(function () {
  const initGallery = (root) => {
    if (root.dataset.swiperReady || typeof Swiper === 'undefined') return;
    root.dataset.swiperReady = 'true';

    const thumbsEl = root.querySelector('.pdp-gallery__thumbs');
    const mainEl = root.querySelector('.pdp-gallery__main');
    if (!mainEl) return;

    let thumbsSwiper = null;
    const thumbSlides = thumbsEl?.querySelectorAll('.swiper-slide');

    if (thumbsEl && thumbSlides.length > 1) {
      thumbsSwiper = new Swiper(thumbsEl, {
        slidesPerView: 'auto',
        spaceBetween: 8,
        watchSlidesProgress: true,
        breakpoints: {
          990: {
            direction: 'vertical',
            slidesPerView: 4,
            spaceBetween: 8,
          },
        },
      });
    }

    const mainSwiper = new Swiper(mainEl, {
      slidesPerView: 1,
      spaceBetween: 4,
      breakpoints: {
        990: { spaceBetween: 8 },
      },
      navigation: {
        prevEl: root.querySelector('.pdp-gallery__nav-prev'),
        nextEl: root.querySelector('.pdp-gallery__nav-next'),
      },
      thumbs: thumbsSwiper ? { swiper: thumbsSwiper } : undefined,
    });

    if (typeof GLightbox !== 'undefined') {
      const lightbox = GLightbox({
        selector: '.glightbox',
        loop: true,
      });

      lightbox.on('slide_after_load', ({ index }) => {
        mainSwiper.slideTo(index, 0);
      });
    }

    thumbSlides?.forEach((slide, index) => {
      slide.addEventListener('click', () => mainSwiper.slideTo(index));
    });
  };

  const initAll = () => {
    document.querySelectorAll('[data-pdp-gallery]').forEach(initGallery);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

  document.addEventListener('shopify:section:load', initAll);
})();
