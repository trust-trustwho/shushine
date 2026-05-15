// Force show app immediately
document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  if (app) {
    app.style.opacity = '1';
    app.style.visibility = 'visible';
  }
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.display = 'none';
  }
});

// Guaranteed timeout fallback
setTimeout(() => {
  const app = document.getElementById('app');
  if (app) {
    app.style.opacity = '1';
    app.style.visibility = 'visible';
  }
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.opacity = '0';
    preloader.style.display = 'none';
  }
}, 100);

// Sections loaded inline — no fetch needed
console.log('Shushine loaded');

function initApp() {
    // We already showed the app, just initialize scripts
    if (typeof initNavbar === 'function') initNavbar();
    if (typeof initHero === 'function') initHero();
    if (typeof initSneaker3D === 'function') initSneaker3D();
    if (typeof initServices === 'function') initServices();
    if (typeof initProcess === 'function') initProcess();
    if (typeof initCTA === 'function') initCTA();
    if (typeof initTestimonials === 'function') initTestimonials();
    if (typeof initGlobalAnimations === 'function') initGlobalAnimations();
    
    // Slight delay to ensure DOM layout is settled before refresh
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 200);
}

document.addEventListener("DOMContentLoaded", () => {
    initApp();
});

// Debounce scroll events
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 250);
});
