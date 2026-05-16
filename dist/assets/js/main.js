window.addEventListener('DOMContentLoaded', () => {
  console.log('Shushine loaded');
  if (typeof initNavbar === 'function') initNavbar();
  if (typeof initHero === 'function') initHero();
  if (typeof initSneaker3D === 'function') initSneaker3D();
  if (typeof initAbout === 'function') initAbout();
  if (typeof initServices === 'function') initServices();
  if (typeof initProcess === 'function') initProcess();
  if (typeof initTestimonials === 'function') initTestimonials();
  if (typeof initCTA === 'function') initCTA();
  if (typeof initAnimations === 'function') initAnimations();
  if (typeof initCounters === 'function') initCounters();
  if (typeof initAboutCounters === 'function') initAboutCounters();
  if (typeof initLenis === 'function') initLenis();
});
