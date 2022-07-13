export const timer = (deadline) => {
    //находим элементы html
    const timerDays = document.querySelectorAll('.count_1 span')
    const timerHours = document.querySelectorAll('.count_2 span')
    const timerMinutes = document.querySelectorAll('.count_3 span')
    const timerSeconds = document.querySelectorAll('.count_4 span')
    //переменная для работы с setInterval
    let idInterval
    //функция нахождения времени обратного отсчёта
    const getTimeRemaining = () => {
        //находим время, соответствующее переменной deadline (задяётся в index.js)
        let dateStop = new Date(deadline).getTime()
        //время сейчас
        let dateNow = new Date().getTime()
        //разница во времени
        let timeRemaining = (dateStop - dateNow) / 1000
        //дни, часы, минуты, секунды 
        let days = Math.floor(timeRemaining / 60 / 60 / 24)
        let hours = Math.floor((timeRemaining / 3600) % 24)
        // let hours = Math.floor((timeRemaining / 3600))
        let minutes = Math.floor((timeRemaining / 60) % 60)
        let seconds = Math.floor(timeRemaining % 60)
        //добавляем нули перед числом для визуализации
        if (days.toString().length === 1) {
            days = '0' + days
        }
        if (hours.toString().length === 1) {
            hours = '0' + hours
        }
        if (minutes.toString().length === 1) {
            minutes = '0' + minutes
        }
        if (seconds.toString().length === 1) {
            seconds = '0' + seconds
        }

        return {
            timeRemaining,
            days,
            hours,
            minutes,
            seconds
        }
    }
    //функция принимающая время обратного отсчёта
    const updateClock = () => {
        let getTime = getTimeRemaining()
        //вывод времени на страницу
        if (getTime.timeRemaining >= 0) {
            timerDays.forEach(timerDay => timerDay.textContent = getTime.days)
            timerHours.forEach(timerHour => timerHour.textContent = getTime.hours)
            timerMinutes.forEach(timerMinute => timerMinute.textContent = getTime.minutes)
            timerSeconds.forEach(timerSecond => timerSecond.textContent = getTime.seconds)
            //если обратный отсчёт отрицательный, то 
        } else {
            //отключаем обратный отсчёт
            clearInterval(idInterval)
        }

    }
    // запуск setInterval c промежутком 1 с, запись флага idInterval
    idInterval = setInterval(updateClock, 1000)
}