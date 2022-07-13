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

const body = document.querySelector('body')

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