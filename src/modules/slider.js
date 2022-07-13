export const slider = () => {
    const sliderBlock = document.querySelector('.services-content')
    const slides = document.querySelectorAll('.service-block')
    const blockArrows = document.querySelector('.services-arrows')

    let arrowLeft = document.querySelectorAll('.dot')

    const timeInterval = 3000
    //currentSlide - счётчик сладов, interval - переменная для запуска и остановки autoSlide
    let currentSlide = 0
    let interval
    //countSlide - количество слайдов в зависимости от ширины стороны клиента 
    let countSlide
    //isMobile - для того, чтобы при переходе из ширины более 576px вновь
    //отображать два элемента слайдера
    let isMobile = false
    //получение количества слайдов на экране (мобильная и десктопная версии)
    const getCountSlide = () => {
        //получаем ширину экрана клиента
        let width = document.documentElement.clientWidth
        //если ширина экрана меньше либо равна 576px, то один элемент слайдера
        if (width <= '576') {
            countSlide = 1
            isMobile = true
            //иначе 2 элемента слайдера
        } else {
            countSlide = 2
        }
    }
    //функция перерисовки элементов слайдера, когда юзер переходит
    //из десктопной в мобильную версии и наоборот
    const renderShowSliders = () => {
        //перебираем элемементы слайдера
        slides.forEach((slide, index) => {
            //если элемент слайда один и это мобильная версия
            if (isMobile && countSlide === 1) {
                // и если индекс элемента больше либо равен количеству элемемнтов
                if (index >= countSlide) {
                    //то делаем невидимыми все элементы, кроме первого
                    slide.style.display = 'none'
                }
            }
            //если элементов слайда два и это десктопная версия
            if (!isMobile && countSlide === 2) {
                // и если индекс элемента больше либо равен количеству элементов
                if (index >= countSlide) {
                    //то делаем невидимыми все элементы, кроме первого и второго
                    slide.style.display = 'none'
                }
            }
            //если элементов слайда два и это мобильная версия
            //то есть был переход от мобильной версии к десктопной
            if (isMobile && countSlide === 2) {
                // и если индекс элемента больше либо равен количеству элементов
                if (index >= countSlide) {
                    //то делаем невидимыми все элементы, кроме первого и второго
                    slide.style.display = 'none'
                } else {
                    //а первый и второй элемент делаем видимыми
                    slide.style.display = 'block'
                }
            }
        })
    }
    //запускаем слайдер
    const startSlide = (timer) => {
        //перерисовываем элементы слайдера заново
        renderShowSliders()
        // записываем флаг interval, запускаем автослайдер в setInterval
        interval = setInterval(autoSlide, timer)
    }

    // функция проигрывания слайдов
    const autoSlide = () => {
        //функция установки предыдущих элементов в невидимый режим
        previousSlide(slides, currentSlide, 'none')
        if (countSlide === 1) {
            //для мобильной версии увеличиваем элемент на 1 штуку
            currentSlide++
        } else {
            //для мобильной версии увеличиваем элемент на 2 штуки
            currentSlide += 2
        }
        // обновление счётчика слайдов, если они закончились
        if (currentSlide >= slides.length) {
            currentSlide = 0
        }
        //функция установки следующих элементов в видимый режим
        nextSlide(slides, currentSlide, 'block')
    }

    //функция удаляющая класс с предыдущего слайда
    //установка невидимого режима
    const previousSlide = (elems, index, classRemove) => {
        //мобильная версия
        if (countSlide === 1) {
            elems[index].style.display = classRemove
        }
        //десктопная версия
        if (countSlide === 2) {
            elems[index].style.display = classRemove
            elems[index + 1].style.display = classRemove
        }
    }
    // функция, устанавливающая класс на новый слайд
    //установка видимого режима
    const nextSlide = (elems, index, classAdd) => {
        //мобильная версия
        if (countSlide === 1) {
            elems[index].style.display = classAdd
        }
        //десктопная версия
        if (countSlide === 2) {
            elems[index].style.display = classAdd
            elems[index + 1].style.display = classAdd
        }
    }

    // остановка проигрывания слайдов
    const stopSlide = () => {
        clearInterval(interval)
    }

    //слушатель click для прокручивания слайдов вручную по стрелкам и точкам
    sliderBlock.addEventListener('click', (e) => {
        e.preventDefault()
        //отключаем ненужные обработчики событий
        if (!e.target.closest('.services-arrows img')) {
            return
        }

        previousSlide(slides, currentSlide, 'none')
        // работа с конкретными html элементами (стрелки и точки)
        if (e.target.matches('.services__arrow--right img')) {
            if (countSlide === 1) {
                currentSlide++
            } else {
                currentSlide += 2
            }
        } else if (e.target.matches('.services__arrow--left img')) {
            if (countSlide === 1) {
                currentSlide--
            } else {
                currentSlide -= 2
            }
        }

        //обновление счётчика слайдов при превышении
        if (currentSlide >= slides.length) {
            currentSlide = 0
        }
        //обновление счётчика слайдов, чтобы проигрывались с конца
        if (currentSlide < 0) {
            if (countSlide === 1) {
                currentSlide = slides.length - 1
            } else {
                currentSlide = slides.length - 2
            }

        }

        nextSlide(slides, currentSlide, 'block')
    })
    //слушатель при наведении мыши на стрелку и точки, чтобы останавливать autoSlide
    sliderBlock.addEventListener(
        'mouseenter',
        (e) => {
            if (e.target.matches('.services__arrow--left img') || e.target.matches('.services__arrow--right img')) {
                stopSlide()
            }
        },
        true
    )
    //слушатель при отведении курсора мыши на стрелку и точки, чтобы запускать autoSlide
    sliderBlock.addEventListener(
        'mouseleave',
        (e) => {
            if (e.target.matches('.services__arrow--left img') || e.target.matches('.services__arrow--right img')) {
                startSlide(timeInterval)
            }
        },
        true
    )

    //находим версию режима: десктопный или мобильный
    getCountSlide()
    //запускаем слайдер
    startSlide(timeInterval)
    //вешаем событие resize на окно
    window.addEventListener('resize', () => {
        //если событие было, то
        //останавливаем слайдер
        stopSlide()
        //находим версию режима: десктопный или мобильный
        getCountSlide()
        //перерисовываем элементы слайдера
        renderShowSliders()
        //и запускаем слайдер опять
        startSlide(timeInterval)
    })

}