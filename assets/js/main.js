const sectionOrder = ['navbar','hero','sneaker3d','about','services','process','testimonials','cta','footer'];

async function loadSection(name) {
  const container = document.getElementById(`${name}-container`);
  if (!container || container.dataset.loaded) return;
  try {
      const res = await fetch(`sections/${name}.html`);
      const html = await res.text();
      container.innerHTML = html;
      container.dataset.loaded = 'true';
      
      // Initialize module scripts for this specific section
      if (name === 'navbar' && typeof initNavbar === 'function') initNavbar();
      if (name === 'hero' && typeof initHero === 'function') initHero();
      if (name === 'sneaker3d' && typeof initSneaker3D === 'function') initSneaker3D();
      if (name === 'services' && typeof initServices === 'function') initServices();
      if (name === 'process' && typeof initProcess === 'function') initProcess();
      if (name === 'cta' && typeof initCTA === 'function') initCTA();
      if (name === 'testimonials' && typeof initTestimonials === 'function') initTestimonials();
      
      if (typeof initGlobalAnimations === 'function') initGlobalAnimations(container);
      
      ScrollTrigger.refresh();
  } catch (error) {
      console.error("Error loading section:", error);
  }
}

async function initApp() {
    // Preloader Animation
    const preloader = document.getElementById('preloader');
    const logo = preloader.querySelector('.logo');
    const app = document.getElementById('app');

    gsap.to(logo, { opacity: 1, duration: 1, ease: 'power2.inOut' });
    
    // Load critical sections immediately
    await Promise.all(['navbar','hero'].map(loadSection));

    // Load rest when near viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const name = entry.target.id.replace('-container','');
          loadSection(name);
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '200px' });

    ['sneaker3d','about','services','process','testimonials','cta','footer'].forEach(name => {
      const el = document.getElementById(`${name}-container`);
      if (el) observer.observe(el);
    });

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
        delay: 1.5
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
