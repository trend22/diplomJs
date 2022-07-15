import {
    slider
} from './modules/slider'
import {
    timer
} from './modules/timer'
import {
    swiper
} from './modules/swiper'
import {
    modal
} from './modules/modal'
import {
    sendForm
}
from './modules/sendForm'
import {
    validInputForm
} from './modules/validInputForm'
import {
    calc
} from './modules/calc'
import {
    scroll
}
from './modules/scroll'
import {
    sertificates
}
from './modules/sertificates'
import {
    comments
} from './modules/comments'


const body = document.querySelector('body')
//находим строку комментариев для вывода Loader
const reviewsContainer = document.querySelector('#reviews .comments-container')

slider()
timer('18 july 2022')
swiper()
modal()
//модуль отправки всех форм на странице
//на каждой странице по 6 форм
for (let i = 1; i < 7; i++) {
    sendForm({
        formId: `form${i}`
    })
}
//модуль валидации инпутов
validInputForm()
//запускаем модуль калькулятора только если это страница балконов
if (body.className === 'balkony') {
    calc()
}
scroll()
sertificates()
comments()
//после загрузки вешаем событие на блок с выводом комментариев
//loader грущится пока данные не придут с сервера
window.addEventListener('DOMContentLoaded', () => {
    const loader = document.createElement('img')

    loader.src = 'images/review-loader.gif'
    if (document.documentElement.clientWidth < 576) {
        loader.style.marginLeft = '33%'
    } else {
        loader.style.marginLeft = '33%'
    }

    reviewsContainer.append(loader)
})