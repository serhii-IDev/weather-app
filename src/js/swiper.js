export let swiper = new Swiper('.swiper', {
        slidesPerView: 1,
        spaceBetween: 54,
        speed: 500,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            0: {
                slidesPerView: 3,
                spaceBetween: 5,
            },
            320: {
                slidesPerView: 3,
                spaceBetween: 17,
            },
            400: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            430: {
                slidesPerView: 3,
                spaceBetween: 44,
            },
            525: {
                slidesPerView: 4,
                spaceBetween: 34,
            },
            720: {
                slidesPerView: 5,
                spaceBetween: 34,
            },
            996: {
                slidesPerView: 3,
                spaceBetween: 34,
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 34,
            },
            1400: {
                slidesPerView: 4,
                spaceBetween: 54,
            }

        },
    });

