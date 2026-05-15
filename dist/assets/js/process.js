function initProcess() {
  // Set initial state — cards start tilted back and small
  gsap.set('.process-row.left .process-card', {
    opacity: 0,
    rotateY: -25,
    rotateX: 8,
    scale: 0.88,
    transformOrigin: 'right center',
    filter: 'blur(6px)',
    z: -80
  });

  gsap.set('.process-row.right .process-card', {
    opacity: 0,
    rotateY: 25,
    rotateX: 8,
    scale: 0.88,
    transformOrigin: 'left center',
    filter: 'blur(6px)',
    z: -80
  });

  // Animate in on scroll
  document.querySelectorAll('.process-row.left .process-card').forEach((card) => {
    gsap.to(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      opacity: 1,
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      z: 0,
      filter: 'blur(0px)',
      duration: 1.1,
      ease: 'power4.out'
    });
  });

  document.querySelectorAll('.process-row.right .process-card').forEach((card) => {
    gsap.to(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      opacity: 1,
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      z: 0,
      filter: 'blur(0px)',
      duration: 1.1,
      ease: 'power4.out'
    });
  });

  document.querySelectorAll('.t-diamond').forEach((diamond, i) => {
    // Get the corresponding card in the same row
    const row = diamond.closest('.process-row');
    const card = row ? row.querySelector('.process-card') : diamond;

    // Pop-in from scale 0
    gsap.from(diamond, {
      scrollTrigger: {
        trigger: diamond,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      scale: 0,
      duration: 0.5,
      ease: 'back.out(2.5)'
    });

    // Activate gold when card reaches viewport
    ScrollTrigger.create({
      trigger: card,
      start: 'top 75%',
      onEnter: () => {
        diamond.classList.add('active');
      },
      onLeaveBack: () => {
        diamond.classList.remove('active');
      }
    });
  });
  // Progressive timeline fill
  const timelineEl = document.querySelector('.process-timeline');
  const progressEl = document.getElementById('timeline-progress');
  if (timelineEl && progressEl) {
    gsap.to(progressEl, {
      scrollTrigger: {
        trigger: timelineEl,
        start: 'top 70%',
        end: 'bottom 70%',
        scrub: 1
      },
      height: '100%',
      ease: 'none'
    });
  }


}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProcess);
} else {
  initProcess();
}
