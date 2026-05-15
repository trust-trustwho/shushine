// Sections loaded inline — no fetch needed
console.log('Shushine loaded');

function initApp() {
    // Preloader Animation
    const preloader = document.getElementById('preloader');
    const logo = preloader.querySelector('.logo');
    const app = document.getElementById('app');

    gsap.to(logo, { opacity: 1, duration: 1, ease: 'power2.inOut' });

    // Fade out preloader and reveal app
    gsap.to(preloader, {
        y: '-100%',
        duration: 1,
        delay: 1.5,
        ease: 'power4.inOut',
        onComplete: () => {
            preloader.style.display = 'none';
        }
    });

    gsap.to(app, {
        opacity: 1,
        autoAlpha: 1,
        duration: 0.5,
        delay: 1.5,
        onComplete: () => {
            // Initialize module scripts for inline sections
            if (typeof initNavbar === 'function') initNavbar();
            if (typeof initHero === 'function') initHero();
            if (typeof initSneaker3D === 'function') initSneaker3D();
            if (typeof initServices === 'function') initServices();
            if (typeof initProcess === 'function') initProcess();
            if (typeof initCTA === 'function') initCTA();
            if (typeof initTestimonials === 'function') initTestimonials();
            if (typeof initGlobalAnimations === 'function') initGlobalAnimations();
            
            ScrollTrigger.refresh();
        }
    });
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
