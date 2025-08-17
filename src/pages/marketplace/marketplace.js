export function initMarketplace() {
    if (location.pathname.includes('marketplace')) {
    document.querySelector('footer')?.remove();
    }
}

