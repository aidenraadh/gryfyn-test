gsap.registerPlugin(ScrollTrigger)

let container = document.getElementById("container");

gsap.to(container, {
  x: () => -(container.scrollWidth - document.documentElement.clientWidth - 100) + "px",
  ease: "none",
  scrollTrigger: {
    trigger: container,
    invalidateOnRefresh: true,
    pin: true,
    scrub: 1,
    end: () => "+=" + container.offsetWidth
  }
})

// --- bar inside Purple panel ---
gsap.from(".bar", {
    scrollTrigger: {
      trigger: "#section-3",
      scrub: true,
      pin: true,
      pinSpacing: true,
      start: "center left",
      end: "+=100%",
    //   onEnter: () => setActive(links[1]),
    //   onEnterBack: () => setActive(links[1]),
    },
    scaleX: 0, 
    transformOrigin: "left center", 
    ease: "none"
  });