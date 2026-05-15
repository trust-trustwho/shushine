function initServices() {
    console.log("Initializing Services Animations");
    
    gsap.from('.service-left', {
        scrollTrigger: {
            trigger: '.services',
            start: 'top 75%',
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('.service-right', {
        scrollTrigger: {
            trigger: '.services',
            start: 'top 75%',
        },
        x: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
}
