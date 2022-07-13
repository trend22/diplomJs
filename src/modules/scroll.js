export const scroll = () => {
    //находим scroll и header
    const scrollBar = document.querySelector('.smooth-scroll')
    const header = document.querySelector('#header')
    //скрываем scroll изначально
    scrollBar.style.display = 'none'
    //плавный scroll на начало страницы
    scrollBar.addEventListener('click', (event) => {
        event.preventDefault()

        window.scrollTo({
            top: header.offsetTop,
            behavior: 'smooth',
        })
    })
    // скрываем и показываем scroll
    window.addEventListener('scroll', (e) => {
        //scroll появляется когда scrollTop равен карусели
        if (document.documentElement.scrollTop >= 814) {
            //показываем скролл
            scrollBar.style.display = 'block'
        } else {
            //скрываем
            scrollBar.style.display = 'none'
        }
    })
}