gsap.registerPlugin(ScrollTrigger)

let container = document.getElementById("container");

gsap.to(container, {
    x: () => -(container.scrollWidth - document.documentElement.clientWidth) + "px",
    ease: "none",
    scrollTrigger: {
        trigger: container,
        invalidateOnRefresh: true,
        pin: true,
        scrub: 1,
        end: () => "+=" + container.offsetWidth
    }
})

let sections = gsap.utils.toArray(".panel");

let scrollTween = gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none", // <-- IMPORTANT!
    scrollTrigger: {
        trigger: ".bar",
        pin: true,
        scrub: 0.1,
        //snap: directionalSnap(1 / (sections.length - 1)),
        end: "+=3000"
    }
});

// --- bar inside Purple panel ---
gsap.from(".bar", {
    scrollTrigger: {
        markers: true,
        trigger: ".bar",
        containerAnimation: scrollTween,
        scrub: true,
        // pin: '#section-3',
        start: "left 80%",
        end: "center 20%",
    },
    scaleX: 5, 
    transformOrigin: "left center", 
    ease: "none"
});
