//импорт библиотеки swiper
import Swiper, {
    Autoplay,
    //навигация стрелками
    Navigation
} from 'swiper';

export const swiper = () => {
    //создаём объект swiper c классом .swiper
    const swiper = new Swiper('.swiper', {
        //Отцентровка элементов слайдера
        centeredSlides: true,

        modules: [Autoplay, Navigation],

        autoplay: {
            delay: 2000,
            //для постоянного прокручивания
            disableOnInteraction: false,
            //остановка слайдера при нажатии мыши
            pauseOnMouseEnter: true,
        },

        navigation: {
            //правая стрелка
            nextEl: '.swiper-button-next',
            //левая стрелка слайдера
            prevEl: '.swiper-button-prev',
        },

        breakpoints: {
            //отрисовка слайдера, если это PC или планшет
            576: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            //отрисовка слайдера, если это мобильный телефон
            200: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
        },
    })
}