var swiper = new Swiper(".mySwiper", {
    slidesPerView: 2,
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        651: {
            slidesPerView: 2,
        }
    },
    spaceBetween: 15,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    autoplay: {
        delay: 2600,
        disableOnInteraction: true,
    },
    loop: true
});


