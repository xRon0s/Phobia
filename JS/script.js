window.addEventListener("load", function () {
    const loaderBg = document.querySelector(".js-loader-bg");
    const loaderDotWrap = document.querySelector(".js-loader-dot-wrap");
    const header = document.querySelector(".js-header");
    const mv = document.querySelector(".js-mv");
    const mvTitleItems = document.querySelectorAll(".js-mv_title-item");
    const mvTitleLead = document.querySelector(".js-mv_title-lead");

    // Loader Animation
    const tlLoader = gsap.timeline();
    tlLoader.to(loaderDotWrap, {
        duration: 0.5,
        scale: 1.2,
        repeat: -1,
        yoyo: true,
    })
    .to(loaderBg, {
        duration: 1,
        opacity: 0,
        onComplete: () => {
            loaderBg.style.display = "none";
        }
    });

    // Header Animation
    gsap.from(header, {
        duration: 1,
        y: -100,
        opacity: 0,
        delay: 0.5,
    });

    // MV Animation
    const tlMv = gsap.timeline({ delay: 1 });
    tlMv.from(mvTitleItems, {
        duration: 0.5,
        y: 100,
        opacity: 0,
        stagger: 0.2,
    })
    .from(mvTitleLead, {
        duration: 0.5,
        y: 100,
        opacity: 0,
        delay: 0.2,
    }, "-=0.5");
});