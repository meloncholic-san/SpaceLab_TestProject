import Swiper from 'swiper';
import 'swiper/css';

export function initMainPage () {
  const swiperFeatures = new Swiper('.main-features-swiper', {
    loop: false,
    spaceBetween: 40,
    grabCursor: true,
    slidesPerView: 1,
    slidesPerGroup: 1,
    breakpoints: {
      0: { slidesPerView: 1 },
      1024: { slidesPerView: 4 },
    },
  });

  console.log('Swiper loaded:', swiperFeatures);
  console.log('Slides:', swiperFeatures.slides.length);

  let swiperTeam = null;

  function initSwiperTeam() {
    const isMobile = window.matchMedia('(max-width: 1023px)').matches;
    console.log(isMobile)
    if (isMobile && !swiperTeam) {
      swiperTeam = new Swiper('.team-swiper', {
        loop: false,
        loopedSlides: 8,
        initialSlide: 0,
        centeredSlides: false,
        watchOverflow: false,
        breakpoints: {
          0: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
        }
      });

      console.log(document.querySelector('.team-swiper-next'));
      console.log(document.querySelector('.team-swiper-prev'));
    } else if (!isMobile && swiperTeam) {
      swiperTeam.destroy(true, true);
      swiperTeam = null;
    }
  }

  window.addEventListener('load', () => {
    initSwiperTeam();     
    movePartnersOnMobile();
  });

  window.addEventListener('resize', () => {
    initSwiperTeam();    
     movePartnersOnMobile();
  });


  function movePartnersOnMobile() {
    const isMobile = window.matchMedia('(max-width: 1023px)').matches;
    const partners = document.querySelector('.partners');
    const hero = document.querySelector('.main-hero');
    const teamSection = document.querySelector('.main-team-section');

    if (isMobile && partners && hero && hero.nextElementSibling !== partners) {
      hero.insertAdjacentElement('afterend', partners);
    }

    if (!isMobile && partners && teamSection && teamSection.nextElementSibling !== partners) {
      teamSection.insertAdjacentElement('afterend', partners);
    }
  }



  const nextBtn = document.querySelector('.team-swiper-next');
  const prevBtn = document.querySelector('.team-swiper-prev');


  function onNextClick() {
    if (!swiperTeam) return;
    if (swiperTeam.activeIndex === swiperTeam.slides.length - swiperTeam.params.slidesPerView) {
      swiperTeam.slideTo(0);
    } else {
      swiperTeam.slideNext();
    }
  }

  function onPrevClick() {
    if (!swiperTeam) return;
    if (swiperTeam.activeIndex === 0) {
      swiperTeam.slideTo(swiperTeam.slides.length - swiperTeam.params.slidesPerView);
    } else {
      swiperTeam.slidePrev();
    }
  }

  nextBtn.addEventListener('click', onNextClick);
  prevBtn.addEventListener('click', onPrevClick);


  const faqButtons = document.querySelectorAll('.main-faq-question');

  function onFaqClick(event) {
    const item = event.currentTarget.parentElement;
    item.classList.toggle('active');
  }

  faqButtons.forEach(button => button.addEventListener('click', onFaqClick));

  return function cleanup() {
    nextBtn.removeEventListener('click', onNextClick);
    prevBtn.removeEventListener('click', onPrevClick);
    faqButtons.forEach(button => button.removeEventListener('click', onFaqClick));

    window.removeEventListener('load', initSwiperTeam);
    window.removeEventListener('resize', initSwiperTeam);
  };
}






















// import Swiper from 'swiper';
// import 'swiper/css';

// export function initMainPage () {
//     const swiperFeatures = new Swiper('.main-features-swiper', {
//       loop: false,
//       spaceBetween: 20,
//       grabCursor: true,
//       slidesPerView: 'auto',

//       breakpoints: {
//         0: {
//           slidesPerView: 1,
//         },
//         1024: {
//           slidesPerView: 4,
//         },
//       },
//     });

//     console.log('Swiper loaded:', swiperFeatures);
//     console.log('Slides:', swiperFeatures.slides.length);



//     let swiperTeam = null;

//     function initSwiperTeam() {
//       const isMobile = window.matchMedia('(max-width: 1023px)').matches;
//       console.log(isMobile)
//       if (isMobile && !swiperTeam) {
//         swiperTeam = new Swiper('.team-swiper', {
//           loop: false,
//           loopedSlides: 8,
//           initialSlide: 0,
//           centeredSlides: false,
//           breakpoints: {
//             0: {
//               slidesPerView: 2,
//               spaceBetween: 10,
//             },
//           },
//         on: {
//         init: function() {
//           this.slideToLoop(0, 0); 
//         }
//       }
//         });
        
//         console.log(document.querySelector('.team-swiper-next'));
//         console.log(document.querySelector('.team-swiper-prev'));
//       } else if (!isMobile && swiperTeam) {
//         swiperTeam.destroy(true, true);
//         swiperTeam = null;
//       }
//     }

//     window.addEventListener('load', () => {
//       initSwiperTeam();
//     });

//     window.addEventListener('resize', () => {
//       initSwiperTeam();
//     });



// const nextBtn = document.querySelector('.team-swiper-next');
// const prevBtn = document.querySelector('.team-swiper-prev');

// nextBtn.addEventListener('click', () => {
//   if (swiperTeam.activeIndex === swiperTeam.slides.length - swiperTeam.params.slidesPerView) {
//     swiperTeam.slideTo(0);
//   } else {
//     swiperTeam.slideNext();
//   }
// });

// prevBtn.addEventListener('click', () => {
//   if (swiperTeam.activeIndex === 0) {
//     swiperTeam.slideTo(swiperTeam.slides.length - swiperTeam.params.slidesPerView);
//   } else {
//     swiperTeam.slidePrev();
//   }
// });




// document.querySelectorAll('.main-faq-question').forEach(button => {
//   button.addEventListener('click', () => {
//     const item = button.parentElement;
//     item.classList.toggle('active');
//   });
// });

  
// }














// window.addEventListener('load', () => {
//   setTimeout(() => {
//     const swiperFeatures = new Swiper('.main-features-swiper', {
//       loop: false,
//       spaceBetween: 20,
//       grabCursor: true,
//       slidesPerView: 'auto',

//       breakpoints: {
//         0: {
//           slidesPerView: 1,
//         },
//         1024: {
//           slidesPerView: 4,
//         },
//       },
//     });

//     console.log('Swiper loaded:', swiperFeatures);
//     console.log('Slides:', swiperFeatures.slides.length);



//     let swiperTeam = null;

//     function initSwiperTeam() {
//       const isMobile = window.matchMedia('(max-width: 1023px)').matches;
//       console.log(isMobile)
//       if (isMobile && !swiperTeam) {
//         swiperTeam = new Swiper('.team-swiper', {
//           loop: false,
//           loopedSlides: 8,
//           initialSlide: 0,
//           centeredSlides: false,
//           breakpoints: {
//             0: {
//               slidesPerView: 2,
//               spaceBetween: 10,
//             },
//           },
//         on: {
//         init: function() {
//           this.slideToLoop(0, 0); 
//         }
//       }
//         });
        
//         console.log(document.querySelector('.team-swiper-next'));
//         console.log(document.querySelector('.team-swiper-prev'));
//       } else if (!isMobile && swiperTeam) {
//         swiperTeam.destroy(true, true);
//         swiperTeam = null;
//       }
//     }

//     window.addEventListener('load', () => {
//       initSwiperTeam();
//     });

//     window.addEventListener('resize', () => {
//       initSwiperTeam();
//     });



// const nextBtn = document.querySelector('.team-swiper-next');
// const prevBtn = document.querySelector('.team-swiper-prev');

// nextBtn.addEventListener('click', () => {
//   if (swiperTeam.activeIndex === swiperTeam.slides.length - swiperTeam.params.slidesPerView) {
//     swiperTeam.slideTo(0);
//   } else {
//     swiperTeam.slideNext();
//   }
// });

// prevBtn.addEventListener('click', () => {
//   if (swiperTeam.activeIndex === 0) {
//     swiperTeam.slideTo(swiperTeam.slides.length - swiperTeam.params.slidesPerView);
//   } else {
//     swiperTeam.slidePrev();
//   }
// });




// document.querySelectorAll('.main-faq-question').forEach(button => {
//   button.addEventListener('click', () => {
//     const item = button.parentElement;
//     item.classList.toggle('active');
//   });
// });


//   }, 100);
// });

