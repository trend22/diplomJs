//валидация инпута в случае ввода только цифр
import {
    validCalcInput
} from './validInputForm'

export const calc = () => {
    //находим весь калькулятор
    const calcContainer = document.getElementById('calc')
    //селекты калькулятора
    const selectType = calcContainer.querySelector('#calc-type')
    const selectMaterial = calcContainer.querySelector('#calc-type-material')
    //инпуты калькулятора
    const inputCalc = calcContainer.querySelector('#calc-input')
    const inputTotalCalc = calcContainer.querySelector('#calc-total')
    //переменные для определения типов и материалов балконов
    let indexSelectType = selectType.selectedIndex
    let indexSelectMaterial = selectMaterial.selectedIndex
    //переменные для рассчёта стоимости
    let valueSelectType = 0
    let valueSelectMaterial = 0
    let square = 0
    //вешаем событие input на весь калькулятор
    calcContainer.addEventListener('input', (e) => {
        //если выбрали селект с типом балкона
        if (e.target.closest('#calc-type')) {
            //записываем индекс и тип коэфф. типа балкона 
            indexSelectType = e.target.selectedIndex
            valueSelectType = e.target.value
            //если выбран нулевой индекс
            if (indexSelectType === 0) {
                //очищаем вводной и рассчётный инпуты
                inputCalc.value = ''
                inputTotalCalc.value = ''
                inputTotalCalc.ariaPlaceholder = 'Итого'
            }
        }
        //если выбрали селект с материалом балкона
        if (e.target.closest('#calc-type-material')) {
            //записываем индекс и тип коэфф. типа балкона 
            indexSelectMaterial = e.target.selectedIndex
            valueSelectMaterial = e.target.value
            //если выбран нулевой индекс
            if (indexSelectMaterial === 0) {
                //очищаем вводной и рассчётный инпуты
                inputCalc.value = ''
                inputTotalCalc.value = ''
                inputTotalCalc.ariaPlaceholder = 'Итого'
            }
        }
        //если вводим площадь балкона
        if (e.target.closest('#calc-input')) {
            //если не выбран тип или материал блакона
            if (indexSelectType === 0 || indexSelectMaterial === 0) {
                //обнуляем введённое значение площади
                inputCalc.value = ''
                //выводим ошибку пользователю о необходимости ввода всех значений
                return alert('Не выбран тип и/или материал балкона')
            } else {
                //валидация на цифры площади калькулятора
                e.target.value = validCalcInput(e.target)
                //Запись полученного значения площади в переменную
                square = +e.target.value
            }
        }
        //вывод результата
        //если введены тип балкона и материал и площадь балкона 
        if (valueSelectType !== '--' && valueSelectMaterial !== '--' && inputCalc.value !== '') {
            //то идёт итоговый рассчёт и вывод информации
            inputTotalCalc.value = square * valueSelectType * valueSelectMaterial
        } else {
            //иначе итоговое значение обнуляется
            inputTotalCalc.value = ''
            inputTotalCalc.ariaPlaceholder = 'Итого'
        }
    })
}