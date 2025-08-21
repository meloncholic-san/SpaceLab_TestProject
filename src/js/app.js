import { initTokenPage } from '../pages/token/token.js';
import { initMainPage } from '../pages/main-page/main_page.js';
import { initFundPage } from '../pages/fund/fund.js';
import { initMarketplace } from '../pages/marketplace/marketplace.js';
import { initHeader } from '../components/header/header.js';

document.addEventListener("DOMContentLoaded", () => {
  const app = document.querySelector("#app");
  let currentCleanup = null;

  initHeader();

  function loadPage(page) {
    if (currentCleanup) {
      currentCleanup();
      currentCleanup = null;
    }

    const file = `${page}.html`;

    fetch(file)
      .then(res => res.ok ? res.text() : Promise.reject())
      .then(html => {
        app.innerHTML = html;

        switch (page) {
          case 'main_page':
            currentCleanup = initMainPage();
            break;
          case 'token':
            currentCleanup = initTokenPage();
            break;
          case 'fund':
            currentCleanup = initFundPage();
            break;
          case 'marketplace':
            currentCleanup = initMarketplace();
            break;
          default:
            app.innerHTML = "<h1>404 - Page not found</h1>";
        }
      })
      .catch(() => {
        app.innerHTML = "<h1>404 - Not found</h1>";
      });
  }


  const initialPath = location.hash.slice(1) || "main_page";
  loadPage(initialPath);


  window.addEventListener("hashchange", () => {
    const path = location.hash.slice(1) || "main_page";
    loadPage(path);
  });


  const navContainers = document.querySelectorAll('.header-navigation, .footer-navigation');

  navContainers.forEach(nav => {
  nav.addEventListener('click', e => {
    const link = e.target.closest('a[data-link]');
    if (!link) return;
    e.preventDefault();
    const href = link.getAttribute('href');
    location.hash = href;
  });
  });
});
