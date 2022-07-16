export const sertificates = () => {
    //находим блок документов
    const sertificatesBlock = document.querySelector('#documents')
    //находим вссе подложки на документах и на странице
    const documentsOverlay = document.querySelectorAll('.document-overlay')
    const overlay = document.querySelector('.overlay')

    //элементы модального окна документов, крестика окна и картинки
    const modalDocuments = document.querySelector('.documents-modal')
    const imgDocument = modalDocuments.querySelector('img')
    //крестик закрытия модалки замерщика
    const closeBtnDocument = document.querySelector('.documents-modal__close')

    let scrollToDocuments
    //закрываем все подложки документов, чтобы кликать на img
    documentsOverlay.forEach((docOver) => docOver.style.display = 'none')

    //открываем документ
    sertificatesBlock.addEventListener('click', (e) => {
        e.preventDefault()

        if (e.target.closest('img')) {
            //достаём путь из уменьшенной картинки
            let arr = []
            //записываем значение скролла по Y, чтобы потом вернуться к нему при закрытии
            scrollToDocuments = window.scrollY
            //сразу же устанавливаем скроллу обратное значение по Y
            document.body.style.top = `-${scrollToDocuments}px`;
            //фиксируем документ
            document.body.style.position = 'fixed';

            arr = e.target.src.match(/[a-z0-9]+/gi)
            //название файла будет предпоследним в массиве
            //файлы должны называться латинскими буками и цифрами по порядку
            arr[arr.length - 2]
            //кладём название файла в путь к оригиналу картинки
            imgDocument.src = `images/documents/original/${arr[arr.length - 2]}.jpg`
            //показываем модальное окно и подложку 
            modalDocuments.style.display = 'block'
            imgDocument.style.width = '80%'
            imgDocument.style.height = '80%'

            // modalDocuments.style.width = '30%'
            overlay.style.display = 'block'
            //анимируем появление модального окна библиотекой animate.style
            modalDocuments.classList.add('animate__animated', 'animate__fadeIn');
        }
    })
    //закрываем документ
    closeBtnDocument.addEventListener('click', () => {
        //удаляем класс анимации
        modalDocuments.classList.remove('animate__animated', 'animate__fadeIn');
        //закрываем модалку и подложку
        overlay.style.display = 'none'
        modalDocuments.style.display = 'none'
        //возвращаем скролл на то место, откуда открывался сертификат
        document.body.style.position = '';
        document.body.style.top = ''
        window.scrollTo(-scrollToDocuments, parseInt(-scrollToDocuments || '0') * -1);
    })
}