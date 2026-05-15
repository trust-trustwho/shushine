function initNavbar() {
    const navbar = document.getElementById('navbar');
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-nav-item, .mobile-nav-btn');
    const navItems = document.querySelectorAll('.nav-item');
    const logo = document.querySelector('.nav-logo');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Logo click to top
    if (logo) {
        logo.addEventListener('click', (e) => {
            e.preventDefault();
            if (typeof lenis !== 'undefined') {
                lenis.scrollTo(0, { duration: 1.6 });
            } else {
                window.scrollTo({top: 0, behavior: 'smooth'});
            }
        });
    }

    function setActiveLink(index) {
        navItems.forEach(link => {
            link.classList.remove('nav-active');
            link.style.color = ''; // Clear any inline GSAP colors
        });
        if (navItems[index]) navItems[index].classList.add('nav-active');
    }

    // Smooth page scroll and active states for desktop nav links
    navItems.forEach((link, index) => {
        const targetId = link.getAttribute('href');
        
        // Setup click scroll
        link.addEventListener('click', (e) => {
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                // Color flash animation
                gsap.to(link, { color: '#C8A96E', duration: 0.3, yoyo: true, repeat: 1, clearProps: 'color' });

                if (targetElement && typeof lenis !== 'undefined') {
                    lenis.scrollTo(targetElement, { 
                        offset: -80, 
                        duration: 1.4, 
                        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) 
                    });
                } else if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });

        // Setup active scroll trigger
        if (targetId && targetId.startsWith('#')) {
            ScrollTrigger.create({
                trigger: targetId,
                start: 'top 50%',
                end: 'bottom 50%',
                onEnter: () => setActiveLink(index),
                onEnterBack: () => setActiveLink(index)
            });
        }
    });

    // Make sure Beranda is active on load
    setActiveLink(0);

    // Mobile Menu Toggle
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            mobileNav.classList.toggle('active');
            
            if(mobileNav.classList.contains('active')) {
                gsap.fromTo(mobileLinks, 
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out', delay: 0.2 }
                );
            }
        });

        // Close on click link and smooth scroll
        mobileLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                menuBtn.classList.remove('active');
                mobileNav.classList.remove('active');

                const targetId = link.getAttribute('href');
                if (targetId && targetId.startsWith('#')) {
                    e.preventDefault();
                    const targetElement = document.querySelector(targetId);
                    if (targetElement && typeof lenis !== 'undefined') {
                        setTimeout(() => {
                            lenis.scrollTo(targetElement, { 
                                offset: -80, 
                                duration: 1.4, 
                                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) 
                            });
                        }, 300); // Wait for menu to close
                    } else if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    }

    // Navbar Entrance Animation
    gsap.from('.navbar-inner', {
        y: -80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.3
    });

    gsap.from('.nav-item', {
        y: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.5
    });
}
