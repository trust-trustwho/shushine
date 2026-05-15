function initHero() {
    console.log("Initializing Hero Animations");
    const tl = gsap.timeline();

    tl.from('.hero-word', {
        y: '100%',
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power4.out',
        delay: 0.5
    })
    .from('.hero-subtext', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
    }, "-=0.8")
    .from('.hero-cta > *', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
    }, "-=0.6")
    .from('.hero-bottom', {
        opacity: 0,
        duration: 1
    }, "-=0.4");

    // Parallax effect on scroll
    gsap.to('.hero-content', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        y: 100,
        scale: 0.95,
        opacity: 0
    });
}
