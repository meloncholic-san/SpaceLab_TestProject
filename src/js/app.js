import { initTokenPage } from '../pages/token/token.js'
import { initMainPage } from '../pages/main-page/main_page.js'
import { initFundPage } from '../pages/fund/fund.js'


document.addEventListener("DOMContentLoaded", () => {
  const app = document.querySelector("#app");
  let currentCleanup = null;


  function loadPage(page) {
      if (currentCleanup) {
    currentCleanup();
    currentCleanup = null;
  }
    page = page.endsWith(".html") ? page : page + ".html";
    fetch(page)
      .then(res => res.ok ? res.text() : Promise.reject())
      .then(html => {
      app.innerHTML = html
      switch (page.replace('.html', '')) {
        case 'main_page':
          currentCleanup = initMainPage();
          break;
        case 'token':
          currentCleanup = initTokenPage();
          break;
        case 'fund':
          currentCleanup = initFundPage();
          break;
      }
      })
      .catch(() => app.innerHTML = "<h1>404 - Not found</h1>");
  }


  const initialPath = location.pathname.slice(1) || "main_page";

  if (initialPath === "main_page") {
    history.replaceState({}, "", "/main_page");
    loadPage("main_page");
  } else {
    loadPage(initialPath);
  }

  window.addEventListener("popstate", () => {
    const path = location.pathname.slice(1) || "main_page";
    loadPage(path);
  });

  document.querySelector("nav").addEventListener("click", e => {
    const link = e.target.closest("[data-link]");
    if (!link) return;
    e.preventDefault();
    const href = link.getAttribute("href");
    history.pushState({}, "", "/" + href);
    loadPage(href);
  });
});
