const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  gsap.globalTimeline.timeScale(0);
}

gsap.registerPlugin(ScrollTrigger);

function initGlobalAnimations(parent = document) {
    const container = parent instanceof Document ? document : parent;

    // Reveal lines of text
    const revealLines = container.querySelectorAll('.line-reveal > *');
    if(revealLines.length > 0) {
        gsap.from(revealLines, {
            scrollTrigger: {
                trigger: '.line-reveal',
                start: 'top 85%',
            },
            y: '100%',
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
            onStart: () => revealLines.forEach(el => el.classList.add('animating')),
            onComplete: () => revealLines.forEach(el => el.classList.remove('animating'))
        });
    }



    // CTA Text Reveal
    const ctaText = container.querySelector('#cta-heading-text');
    if(ctaText && !ctaText.dataset.animated) {
        ctaText.dataset.animated = 'true';
        const text = ctaText.innerText;
        ctaText.innerHTML = '';
        text.split('').forEach(char => {
            if(char === ' ') {
                ctaText.innerHTML += '&nbsp;';
            } else {
                ctaText.innerHTML += `<span class="char">${char}</span>`;
            }
        });
        
        gsap.from('#cta-heading-text .char', {
            scrollTrigger: {
                trigger: '#cta-heading-text',
                start: 'top 80%',
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: 'back.out(1.7)'
        });
    }

    // Magnetic Footer Links
    const magneticLinks = container.querySelectorAll('.footer-link, .social-link');
    magneticLinks.forEach(link => {
        if (link.dataset.magnetic) return;
        link.dataset.magnetic = 'true';
        link.addEventListener('mousemove', (e) => {
            const rect = link.getBoundingClientRect();
            const x = (e.clientX - rect.left) - rect.width / 2;
            const y = (e.clientY - rect.top) - rect.height / 2;
            
            gsap.to(link, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out',
                onStart: () => link.classList.add('animating'),
                onComplete: () => link.classList.remove('animating')
            });
        });
        
        link.addEventListener('mouseleave', () => {
            gsap.to(link, {
                x: 0,
                y: 0,
                duration: 0.3,
                ease: 'power2.out',
                onStart: () => link.classList.add('animating'),
                onComplete: () => link.classList.remove('animating')
            });
        });
    });

    // About Section Slide In Animation
    const aboutImageCard = container.querySelector('.about-image-card');
    if (aboutImageCard && !aboutImageCard.dataset.animated) {
        aboutImageCard.dataset.animated = 'true';
        gsap.from(aboutImageCard, {
            scrollTrigger: {
                trigger: '#about-container',
                start: 'top 75%',
            },
            x: -60,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            onStart: () => aboutImageCard.classList.add('animating'),
            onComplete: () => aboutImageCard.classList.remove('animating')
        });
    }

    const aboutContent = container.querySelector('.about-content');
    if (aboutContent && !aboutContent.dataset.animated) {
        aboutContent.dataset.animated = 'true';
        gsap.from(aboutContent, {
            scrollTrigger: {
                trigger: '#about-container',
                start: 'top 75%',
            },
            x: 60,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            onStart: () => aboutContent.classList.add('animating'),
            onComplete: () => aboutContent.classList.remove('animating')
        });
    }
}

function initCounters() {
  const counters = [
    { selector: '[data-count="500"]', target: 500, suffix: '+' },
    { selector: '[data-count="98"]', target: 98, suffix: '%' },
    { selector: '[data-count="2"]', target: 2, suffix: '' }
  ];

  // Also try to find counter elements by looking for the labels
  const allCounterEls = document.querySelectorAll('.counter-number, .stat-number, [class*="counter"], [class*="stat-num"]');

  allCounterEls.forEach((el) => {
    const target = parseInt(el.dataset.count || el.dataset.target || el.textContent) || 0;
    if (!target) return;

    const suffix = el.dataset.suffix || (el.textContent.includes('+') ? '+' : el.textContent.includes('%') ? '%' : '');

    gsap.fromTo({ val: 0 }, { val: target }, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      duration: 2,
      ease: 'power2.out',
      onUpdate: function() {
        el.textContent = Math.round(this.targets()[0].val) + suffix;
      }
    });
  });
}

// Also hardcode the three specific about counters by searching text content
function initAboutCounters() {
  const statNumbers = document.querySelectorAll('.about-stat-number, .stat-value, [class*="about"] [class*="number"], [class*="counter"]');

  if (statNumbers.length === 0) {
    // Fallback: find by parent label text
    const allStats = document.querySelectorAll('[class*="stat"], [class*="counter-wrap"], [class*="about-stat"]');
    allStats.forEach(stat => {
      const numEl = stat.querySelector('h3, h4, .number, span:first-child, div:first-child');
      if (!numEl) return;
      const text = numEl.textContent.trim();
      const num = parseInt(text);
      if (!num || isNaN(num)) return;
      const suffix = text.replace(num.toString(), '').trim();

      gsap.fromTo({ val: 0 }, { val: num }, {
        scrollTrigger: {
          trigger: numEl,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        duration: 2,
        ease: 'power2.out',
        onUpdate: function() {
          numEl.textContent = Math.round(this.targets()[0].val) + suffix;
        }
      });
    });
    return;
  }

  const targets = [500, 98, 2];
  const suffixes = ['+', '%', ''];

  statNumbers.forEach((el, i) => {
    if (targets[i] === undefined) return;
    gsap.fromTo({ val: 0 }, { val: targets[i] }, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      duration: 2,
      ease: 'power2.out',
      onUpdate: function() {
        el.textContent = Math.round(this.targets()[0].val) + suffixes[i];
      }
    });
  });
}
