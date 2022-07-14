//импорт функции для задержки сообщения пользователю после отправки формы
import {
    delayMessage
} from './helpers'

//передаём аргумент - id конкретной form
export const sendForm = ({
    formId
}) => {
    //элемент body для определения запуска страницы с балконами
    const body = document.querySelector('body')
    //находим определённую форму с определённым id
    const form = document.getElementById(formId)
    //статус блок для добавления статусов отправки формы
    const statusBlock = document.createElement('div')
    //статусы отправки
    const loadText = 'Загрузка...'
    const errorText = 'Ошибка...'
    const successText = 'Спасибо! Наш менеджер с Вами свяжется.'
    // переменные для определения контейнера калькулятора и итогового значения
    let calcContainer
    let inputTotalCalc
    //если страница с балконами, то находим калькулятор и его итоговое значение
    if (body.className === 'balkony') {
        calcContainer = document.getElementById('calc')
        inputTotalCalc = calcContainer.querySelector('#calc-total')
    }

    // //для автоматического закрытия модального окна и overlay
    // const modal = document.querySelector('.services-modal')
    // const overlay = document.querySelector('.overlay')

    //функция валидации формы
    //вводимые символы проверяются в модуле
    const validate = (listInputs) => {
        let success = true
        //перебираем инпуты в форме
        const formElements = form.querySelectorAll('input')
        formElements.forEach((input, index) => {
            //правка валидации, длина имени более или равно 2-м символам
            if (index === 0) {
                if (input.value.length < 2) {
                    success = false
                }
            }
            //если инпут пустой, то 
            if (input.value === '') {
                //то передаётся false, для последующей обработки ошибки
                success = false
            }
        })
        //валидация инпутов реализована в модуле validForm с помощью регулярных выражений
        return success
    }

    // функция отправки данных
    const sendData = (data) => {
        return fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json())
    }

    const submitForm = () => {
        //находим все элементы-инпуты в форме
        const formElements = form.querySelectorAll('input')
        //создаём объект класса FormData со всеми элементами формы
        let formData = new FormData(form)
        //переменная объект для данных 
        let formBody = {}
        //записываем текст Загрузка в созданный блок для визуализации процесса
        statusBlock.textContent = loadText

        form.append(statusBlock)
        //записываем все значения содержащиеся в инпутах в formBody
        formData.forEach((val, key) => {
            formBody[key] = val
        })
        //если это страница с калькулятором, то достаём рассчитыанную стоимость
        if (body.className === 'balkony') {
            if (inputTotalCalc.value !== '') {
                //добавляем стоимость в formBody
                formBody.price = +inputTotalCalc.value
            }
        }
        //если функция валидации отработала true
        if (validate(formElements)) {
            //высылаем данные на сервер
            sendData(formBody).then(data => {
                //когда ответ вернулся - передаём в статус блок успешное сообщение
                statusBlock.textContent = successText
                //выводим в консоль ответ от сервера
                console.log(data)
                //очищаем инпуты с именем и телефоном
                formElements.forEach((input, index) => {
                    if (index <= 1) {
                        input.value = ''
                    }
                })
                // иначе передаём ошибку
            }).catch(error => {
                statusBlock.textContent = errorText
            })
            //станавливается время в функцию delayMessage
            //затем стирается блок div с сообщением
            //модальное окно автоматически закрывать не стал
            delayMessage(4000).then(() => {
                statusBlock.remove()
                // modal.style.display = 'none'
            })

        } else {
            //в случае валидации false - передаём ошибку
            alert('Заполните форму полностью! Длинна имени должна быть более двух символов.')
            statusBlock.remove()
        }
    }
    // запуск работы с передачей формы
    try {
        if (!form) {
            throw new Error('Форма была повреждена, пожалуйста исправьте!')
        }

        form.addEventListener('submit', (e) => {
            //останавливаем работу по умолчанию submit
            e.preventDefault()
            submitForm()
        })
    } catch (error) {
        console.log(error.message)
    }
}