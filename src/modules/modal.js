export const modal = () => {
    //элементы модального окна замерщика, крестика окна и подкладки
    const modalMeasure = document.querySelector('.services-modal')
    //элементы модального окна обатного зваонка, крестика окна и подкладки
    const modalCallback = document.querySelector('.header-modal')
    //крестик закрытия модалки замерщика
    const closeBtnMeasure = document.querySelector('.services-modal__close')
    //крестик закрытия модалки обратного зваонкаа
    const closeBtnCallback = document.querySelector('.header-modal__close')
    const overlay = document.querySelector('.overlay')
    //элемент контакта слайдера сервиса для делегирования
    const serviceContent = document.querySelector('.services-content')
    //элемент-кнопка звонка обратной связи
    const header = document.querySelector('#header')

    //функция передающая block И none значения в модалки сервисов
    const switchModalMeasure = (str) => {
        modalMeasure.style.display = str
        overlay.style.display = str
    }
    //функция передающая block И none значения в модалки звонков
    const switchModalCallback = (str) => {
        modalCallback.style.display = str
        overlay.style.display = str
    }
    //слушатель события на всём слайдере сервиса 
    serviceContent.addEventListener('click', (e) => {
        //если был клик на вызове замерщика
        if (e.target.closest('.btn-sm')) {
            //отключаем предустановенные события на <a>
            e.preventDefault()
            //открываем модалку и overlay
            switchModalMeasure('block')
        }
    })
    // нажатие на крестик модалки замерщика закрывает её и overlay
    closeBtnMeasure.addEventListener('click', (e) => {
        switchModalMeasure('none')
    })
    //слушатель события на всём header 
    header.addEventListener('click', (e) => {
        //если был клик на заказе обратного звонка
        if (e.target.closest('a')) {
            //отключаем предустановенные события на <a>
            e.preventDefault()
            //открываем модалку и overlay
            switchModalCallback('block')
        }
    })
    // нажатие на крестик модалки закрывает её и overlay
    closeBtnCallback.addEventListener('click', (e) => {
        switchModalCallback('none')
    })
}