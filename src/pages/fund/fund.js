import Swiper from 'swiper';
import 'swiper/css';

export function initFundPage() {
  const swiperTokenFeatures = new Swiper('.fund-features-swiper', {
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


const faqButtons = document.querySelectorAll('.main-faq-question');
  const clickHandlers = [];

  faqButtons.forEach(button => {
    const handler = () => {
      const item = button.parentElement;
      item.classList.toggle('active');
    };
    button.addEventListener('click', handler);
    clickHandlers.push({ button, handler });
  });


  return () => {
    if (swiperTokenFeatures && typeof swiperTokenFeatures.destroy === 'function') {
      swiperTokenFeatures.destroy(true, true);
      console.log('SwiperFund destroyed');
    }

    clickHandlers.forEach(({ button, handler }) => {
      button.removeEventListener('click', handler);
    });
  };    
}