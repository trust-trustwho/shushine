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

  initProcessDots();
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

function initProcessDots() {
  const dots = document.querySelectorAll('.t-diamond');
  
  if (dots.length === 0) return;

  dots.forEach((dot) => {
    // Set initial state
    dot.style.background = '#F5F0E8';
    dot.style.borderColor = '#F5F0E8';
    dot.style.opacity = '0.25';
    dot.style.transform = 'rotate(45deg) scale(1)';

    const row = dot.closest('.process-row');
    const card = row ? row.querySelector('.process-card') : dot;
    const trigger = card || dot;

    // Pop-in
    gsap.from(dot, {
      scrollTrigger: {
        trigger: trigger,
        start: 'top 88%',
        toggleActions: 'play none none none'
      },
      scale: 0,
      duration: 0.6,
      ease: 'back.out(2)'
    });

    // Color activation using IntersectionObserver as fallback
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          dot.style.transition = 'background 0.8s cubic-bezier(0.25,0.46,0.45,0.94), border-color 0.8s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.8s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.8s ease, transform 0.8s cubic-bezier(0.34,1.56,0.64,1)';
          dot.style.background = '#C8A96E';
          dot.style.borderColor = '#C8A96E';
          dot.style.opacity = '1';
          dot.style.transform = 'rotate(45deg) scale(1.4)';
          dot.style.boxShadow = '0 0 20px rgba(200,169,110,0.55), 0 0 40px rgba(200,169,110,0.2)';
        } else {
          dot.style.background = '#F5F0E8';
          dot.style.borderColor = '#F5F0E8';
          dot.style.opacity = '0.25';
          dot.style.transform = 'rotate(45deg) scale(1)';
          dot.style.boxShadow = 'none';
        }
      });
    }, { threshold: 0.3, rootMargin: '0px 0px -20% 0px' });

    observer.observe(trigger);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProcess);
} else {
  initProcess();
}
