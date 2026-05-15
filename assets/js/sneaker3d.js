function initSneaker3D() {
    console.log("Initializing Sneaker 3D Animation");

    const container = document.querySelector('.sneaker3d-sticky-container');
    const canvas = document.getElementById('sneaker3d-canvas');
    if (!container || !canvas) return;

    // 1. Setup Three.js Scene
    const scene = new THREE.Scene();
    
    // Transparent background
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.powerPreference = 'high-performance';
    renderer.antialias = window.devicePixelRatio < 2;

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 2.2; // Moved camera closer

    // 2. Lighting Setup
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xfff5e6, 0.4);
    scene.add(ambientLight);

    // Directional light
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(2, 2, 1);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // Dirty Phase Lights
    const muddyLight = new THREE.PointLight(0x2A1A0A, 4.0, 10);
    muddyLight.position.set(0, 2, 1);
    scene.add(muddyLight);

    const darkLight = new THREE.PointLight(0x1A1A1A, 3.0, 10);
    darkLight.position.set(-1, -1, 0);
    scene.add(darkLight);

    // Clean Phase Lights
    const cleanRimLight = new THREE.PointLight(0xffffff, 0, 10);
    cleanRimLight.position.set(0, -1, -1);
    scene.add(cleanRimLight);

    const cleanSpotLight = new THREE.SpotLight(0xFFFFFF, 0);
    cleanSpotLight.position.set(0, 3, 0);
    cleanSpotLight.angle = 0.3;
    cleanSpotLight.penumbra = 0.5;
    scene.add(cleanSpotLight);

    const goldAccentLight = new THREE.PointLight(0xC8A96E, 0, 10);
    goldAccentLight.position.set(1, 0, 1);
    scene.add(goldAccentLight);

    let sneakerModel = null;
    let isModelLoaded = false;

    // Mouse Interaction Variables
    let targetRotationX = 0;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;
    const maxTilt = 10 * (Math.PI / 180);

    // 3. Load Model
    const loader = new THREE.GLTFLoader();
    loader.load('assets/3d/sneaker.glb', (gltf) => {
        sneakerModel = gltf.scene;
        
        // Scale the model up
        sneakerModel.scale.set(2.5, 2.5, 2.5);

        // Center the model after scaling
        const box = new THREE.Box3().setFromObject(sneakerModel);
        const center = box.getCenter(new THREE.Vector3());
        sneakerModel.position.sub(center);
        
        // Group to handle mouse rotation independently from scroll rotation
        const sneakerGroup = new THREE.Group();
        sneakerGroup.add(sneakerModel);
        
        function updateModelScale() {
            if (!sneakerModel) return;
            if (window.innerWidth <= 768) {
                sneakerModel.scale.set(1.4, 1.4, 1.4);
                camera.position.z = 3.2;
            } else {
                sneakerModel.scale.set(2.5, 2.5, 2.5);
                camera.position.z = 2.2;
            }
        }
        updateModelScale();
        window.addEventListener('resize', updateModelScale);
        
        // Initial rotation slightly angled to look good
        sneakerGroup.rotation.x = Math.PI / 12;
        sneakerGroup.rotation.y = -Math.PI / 6;

        scene.add(sneakerGroup);
        isModelLoaded = true;

        setupScrollAnimation(sneakerGroup);
    }, undefined, (error) => {
        console.error('Error loading sneaker model:', error);
    });

    // 4. Resize Handler
    window.addEventListener('resize', () => {
        if (!container || !camera || !renderer) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    // 5. Mouse Interaction
    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        
        targetRotationY = mouseX * maxTilt;
        targetRotationX = mouseY * maxTilt;
    });

    // 6. Animation Loop
    function animate() {
        if (isModelLoaded && sneakerModel) {
            sneakerModel.rotation.x += (targetRotationX - sneakerModel.rotation.x) * 0.05;
            sneakerModel.rotation.y += (targetRotationY - sneakerModel.rotation.y) * 0.05;
        }

        renderer.render(scene, camera);
    }
    
    // Pause render loop when section not visible
    const sneakerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          renderer.setAnimationLoop(animate);
        } else {
          renderer.setAnimationLoop(null);
        }
      });
    }, { threshold: 0.1 });

    const sneakerSection = document.getElementById('sneaker3d-container');
    if (sneakerSection) sneakerObserver.observe(sneakerSection);

    // 7. GSAP ScrollTrigger Setup
    function setupScrollAnimation(modelGroup) {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.sneaker3d-section',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1 
            }
        });

        const filterObj = {
            saturate: 0.2,
            brightness: 0.55,
            sepia: 0.4,
            contrast: 1.5,
            glowOpacity: 0
        };

        const updateFilter = () => {
            let filterString = `saturate(${filterObj.saturate}) brightness(${filterObj.brightness}) sepia(${filterObj.sepia}) contrast(${filterObj.contrast})`;
            if (filterObj.glowOpacity > 0) {
                filterString += ` drop-shadow(0 0 30px rgba(200, 169, 110, ${filterObj.glowOpacity}))`;
            }
            canvas.style.filter = filterString;
        };

        // Initialize display states
        gsap.set('#panel-dirty', { opacity: 1 });
        gsap.set('.dirt-particle', { opacity: 1 });
        gsap.set('#panel-clean', { opacity: 0 });

        // Stagger left panel items on entry
        gsap.from('#panel-dirty .list-item', {
            scrollTrigger: {
                trigger: '.sneaker3d-section',
                start: 'top 80%',
            },
            y: 10,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
        });

        // PHASE 1: 0% -> 50% (mapped to timeline time 0 -> 1)
        
        tl.to(modelGroup.rotation, {
            y: modelGroup.rotation.y + Math.PI * 2,
            ease: "none",
            duration: 1
        }, 0);

        tl.to(muddyLight, { intensity: 0, ease: "none", duration: 1 }, 0);
        tl.to(darkLight, { intensity: 0, ease: "none", duration: 1 }, 0);

        tl.to(filterObj, {
            saturate: 1,
            brightness: 1,
            sepia: 0,
            contrast: 1,
            onUpdate: updateFilter,
            ease: "none",
            duration: 1
        }, 0);

        // Fade out particles early in phase 1 (0 to 0.8, which is 40% of total scroll)
        tl.to('.dirt-particle', { opacity: 0, duration: 0.8, ease: "none" }, 0);

        // Fade out left panel from 0 to 45% of total scroll (time 0 to 0.9)
        tl.to('#panel-dirty', { opacity: 0, duration: 0.9, ease: "none" }, 0);

        // PHASE 2: 50% -> 100% (mapped to timeline time 1 -> 2)
        
        tl.to(modelGroup.rotation, {
            y: modelGroup.rotation.y + Math.PI * 4,
            ease: "none",
            duration: 1
        }, 1);

        tl.to(cleanRimLight, { intensity: 2.5, ease: "none", duration: 1 }, 1);
        tl.to(cleanSpotLight, { intensity: 1.5, ease: "none", duration: 1 }, 1);
        tl.to(goldAccentLight, { intensity: 1.0, ease: "none", duration: 1 }, 1);

        tl.to(filterObj, {
            glowOpacity: 0.35,
            onUpdate: updateFilter,
            ease: "none",
            duration: 1
        }, 1);

        // Fade in right panel from 55% to 100% of total scroll (time 1.1 to 2.0)
        tl.fromTo('#panel-clean', { opacity: 0 }, { opacity: 1, duration: 0.9, ease: "none" }, 1.1);

        // Stagger right panel items as they fade in
        tl.fromTo('#panel-clean .list-item', 
            { y: 10, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power2.out" }, 
        1.1);
    }
}
