function initTestimonials() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.t-dot');
  const prevBtn = document.getElementById('t-prev');
  const nextBtn = document.getElementById('t-next');

  let current = 0;
  let isAnimating = false;

  function goTo(index, direction = 'next') {
    if (isAnimating || index === current) return;
    isAnimating = true;

    const currentSlide = slides[current];
    const nextSlide = slides[index];

    // Exit current
    currentSlide.classList.remove('active');
    currentSlide.classList.add(direction === 'next' ? 'exit-left' : 'exit-right');

    // Prepare next
    nextSlide.style.transform = direction === 'next' ? 'translateX(40px)' : 'translateX(-40px)';
    nextSlide.style.opacity = '0';
    nextSlide.style.position = 'absolute';

    requestAnimationFrame(() => {
      nextSlide.classList.add('active');
      nextSlide.style.transform = '';
      nextSlide.style.opacity = '';
      nextSlide.style.position = '';
    });

    setTimeout(() => {
      currentSlide.classList.remove('exit-left', 'exit-right');
      currentSlide.style.position = 'absolute';
      isAnimating = false;
    }, 520);

    // Update dots
    dots[current].classList.remove('active');
    dots[index].classList.add('active');
    current = index;
  }

  nextBtn.addEventListener('click', () => {
    goTo((current + 1) % slides.length, 'next');
  });

  prevBtn.addEventListener('click', () => {
    goTo((current - 1 + slides.length) % slides.length, 'prev');
  });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.dataset.index);
      goTo(index, index > current ? 'next' : 'prev');
    });
  });

  // Touch/swipe support
  let touchStartX = 0;
  const track = document.getElementById('testimonials-track');

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goTo((current + 1) % slides.length, 'next');
      else goTo((current - 1 + slides.length) % slides.length, 'prev');
    }
  }, { passive: true });

  // Auto-advance every 5 seconds
  setInterval(() => {
    goTo((current + 1) % slides.length, 'next');
  }, 5000);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTestimonials);
} else {
  initTestimonials();
}
