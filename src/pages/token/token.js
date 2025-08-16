import Swiper from 'swiper';
import 'swiper/css';

export function initTokenPage() {
  const swiperTokenFeatures = new Swiper('.token-features-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    breakpoints: {
      1024: {
        slidesPerView: 3,
        spaceBetween: 40,
      }
    }
  });


      console.log('Swiper loaded:', swiperTokenFeatures);
    console.log('Slides:', swiperTokenFeatures.slides.length);

  return () => {
    if (swiperTokenFeatures && typeof swiperTokenFeatures.destroy === 'function') {
      swiperTokenFeatures.destroy(true, true);
      console.log('SwiperToken destroyed');
    }
  }
}