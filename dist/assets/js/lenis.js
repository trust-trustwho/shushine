const lenis = new Lenis({
  lerp: 0.08,
  smoothWheel: true,
  syncTouch: false,
  touchMultiplier: 1.5,
  infinite: false
});

// Use RAF loop instead of manual tick
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

lenis.on('scroll', ScrollTrigger.update);
