export const validInputForm = () => {
    //достаём инпуты калькулятора
    const calcInput = document.querySelector('#calc-input')
    //достаём forms с атрибутом [type=text]
    const textInputs = document.querySelectorAll('form [type=text]')
    //достаём forms с атрибутом [type=tel]
    const phoneInputs = document.querySelectorAll('form [type=tel]')

    //функция проверки двойных и более пробелов в строчке и исправление на один пробел
    const validSpace = (str) => {
        // console.log(event.target.value.match(/(\s\s)+/gi))
        if (/\s\s/gi.test(str)) {
            do {
                str = str.replace(/(\s\s)/gi, (str) => {
                    return " ";
                })
            }
            while (/\s\s/gi.test(str))
            //Дополнительно удалим пробел в начале и в конце строки
            str = str.replace(/^\s/i, "")
            str = str.replace(/\s$/gi, "")
        }
        return str
    }
    //функция проверки двойных и более пробелов в строчке и исправление на один пробел
    const validHyphen = (str) => {
        if (/\-\-/gi.test(str)) {
            do {
                str = str.replace(/\-\-/gi, (str) => {
                    return "-";
                })
            }
            while (/\-\-/gi.test(str))
            //Дополнительно удалим пробел в начале и в конце строки
            str = str.replace(/^\-/i, "")
            str = str.replace(/\-$/gi, "")
        }
        return str
    }
    //функция перевода в верхний регистр первой буквы, а остальные в нижний регистр
    const validSimbols = (str) => {
        //исправляем первый символ
        str = str.replace(/\S+/gi, (word) => {

            word = word.split('')
            for (let i = 0; i < word.length; i++) {
                if (i === 0) {
                    word[i].toUpperCase()
                    word[i] = word[i].toUpperCase()
                } else {
                    word[i] = word[i].toLowerCase()
                }
            }
            word = word.join('')
            return word
        })


        return str
    }

    const validViewNumber = (str) => {
        if (str.length > 15) {
            alert('Номер телефона слишком длинный')
            return 'ваш телефон'
        }
        //убираем все плюсы перед номером
        str = str.replace(/\+/gi, "")

        return '+' + str
    }

    //функция вешает на инпуты форм события и проверяет правильность ввода
    textInputs.forEach((textInput) => {
        textInput.addEventListener('input', (event) => {
            // регулярное выражение допускает ввод только кириллицы, - и пробела
            event.target.value = event.target.value.replace(/[^а-яА-Яa-zA-Z\-\ ]/, "")

        })
    })
    //функция вешает на инпуты форм события blur и проверяет правильность ввода [type=text]
    textInputs.forEach((textInput) => {
        textInput.addEventListener('blur', (event) => {
            //если в тексте встречаются двойные и более пробелы,то менять на один пробел
            event.target.value = validSpace(event.target.value)
            //если в тексте встречаются двойные и более дефисы,то менять на один дефис
            event.target.value = validHyphen(event.target.value)
            //перевод первого символа в верхнйи регистр, а остальных в нижний
            event.target.value = validSimbols(event.target.value)
        })
    })

    //функция вешает на инпуты с атрибутом [type=tel] события и не даёт ввод букв 
    phoneInputs.forEach((phoneInput) => {
        phoneInput.addEventListener('input', (event) => {
            // регулярное выражение допускает ввод только латиницы и набора спецсимволов
            event.target.value = event.target.value.replace(/[^\d\+()-]/, "")
        })
    })
    //функция вешает на инпуты форм события blur и проверяет правильность ввода [type=tel]
    phoneInputs.forEach((phoneInput) => {
        phoneInput.addEventListener('blur', (event) => {
            //если в тексте встречаются двойные и более пробелы,то менять на один пробел
            event.target.value = validSpace(event.target.value)
            //если в тексте встречаются двойные и более дефисы,то менять на один дефис
            event.target.value = validHyphen(event.target.value)
            //если в тексте встречаются двойные и более дефисы,то менять на один дефис
            event.target.value = validViewNumber(event.target.value)
        })
    })
}
//функция для ввода только цифр в площадь калькулятора
export const validCalcInput = (eventCalcInput) => {
    // функция вешает на инпуты с атрибутом [type=text] события и не даёт ввод букв 
    return eventCalcInput.value.replace(/\D+/, "")
}