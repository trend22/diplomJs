export const comments = () => {
	//находим строку комментариев для стирания Loader
	const reviewsContainer = document.querySelector('#reviews .comments-container')
	//переменная-индекс конкретного комментария
	let countComments = 0
	//массив для хранения комментариев, скачанных с сервера
	let arrComments = []

	//получаем аватарку или заглушку аватарки пользователя
	const getImage = (strImage) => {
		let image
		if (strImage !== '') {
			image = strImage
		} else {
			//если нет аватарки, то фото привидения
			image = "no-photo-user.png"
		}
		return image
	}
	//вывод чётного комментария
	const getEvenComment = (comment, index) => {
		//создание блока html комментария
		const reviewItem = document.createElement('div')
		reviewItem.innerHTML = `<div class="review-margin-bottom row comment-item" id="comment${countComments}">
						<div class="col-xs-3 col-sm-2">
							<div class="review-user">
								<img src="images/users/${getImage(comment.image)}" alt="" class="img-responsive avatar">
							</div>
						</div>
						<div class="col-xs-9 col-sm-9">
							<div class="review-inner review-green review-arrow review-arrow-left">
								<p class="text-normal">${comment.author}</p>
								<p>${comment.comment}</p>
							</div>
						</div>
					</div>`

		reviewsContainer.append(reviewItem)
	}

	//вывод нечётного комментария
	const getOddComment = (comment, index) => {
		const reviewItem = document.createElement('div')
		reviewItem.innerHTML = `<div class="review-margin-bottom row comment-item" id="comment${countComments}">
						<div class="col-xs-9 col-sm-9">
							<div class="review-inner review-gray review-arrow review-arrow-right">
								<p class="text-normal">${comment.author}</p>
								<p>${comment.comment}</p>
							</div>
						</div>
						<div class="col-xs-3 col-sm-2">
							<div class="review-user">
								<img src="images/users/${getImage(comment.image)}" alt = "" class="img-responsive avatar">
							</div>
						</div>
					</div>`

		reviewsContainer.append(reviewItem)
	}
	//отрисовка первых трёх комментов и создание массива комментариев
	const startloadComments = (data) => {
		//вывод в консоль коментариев
		data.comments.forEach((comment, index) => {
			//массив комментариев с сервера
			arrComments.push(comment)
			//получаем чётные комменты
			if (index % 2 === 0 && countComments < 3) {
				getEvenComment(comment, index)
			}

			//получаем нечётные комменты
			if (index % 2 !== 0 && countComments < 3) {
				getOddComment(comment, index)
			}
			countComments++
		})
		//после того как приняли весь массив комментариев и отривали первые 3
		//устанавливаем счётчик комментариев на 3
		countComments = 3
	}
	//блок непосредственного изменения комментариев на странице
	//arrLenght = 0 - для отработки первого блока рендеринга в функции renderComments
	// во втором блоке это значение уже задаётся
	const reWriteComments = (comment, index, arrLenght = 0) => {
		//находим верхний коммент по Id
		const prevComment = document.querySelector(`#comment${index - 3 + arrLenght}`)
		//удаляем коммент
		prevComment.remove()
		//рисуем чётный коммент
		if (index % 2 === 0) {
			getEvenComment(comment, index)
		}
		//рисуем нечётный коммент
		if (index % 2 !== 0) {
			getOddComment(comment, index)
		}
	}

	//циклическая отрисовка комментариев, первые 3 уже отрисованыы
	const renderComments = () => {
		//бесконечный цикл с таймером 20 секунд
		setInterval(() => {

			//отрисовка комментариев с 3-его по 5-ый. Первый блок отрисовки
			if (countComments >= 3 && countComments < arrComments.length) {
				//блок непосдественной отрисовки комментов
				reWriteComments(arrComments[countComments], countComments)

				countComments++
				//если долистали до конца комментов, то
				if (countComments === arrComments.length) {
					//начинаем заново и переходим во второй блок отрисовки
					return
				}
			}
			//второй блок отрисовки
			//сюда попадаем, когда отрисовали до конца комменты
			//блок используется для элементов 0, 1 и 2 в массиве
			if (countComments >= arrComments.length || countComments < 3) {
				//обнуляем счётчик комментариев, когда дошли до конца массива
				if (countComments >= arrComments.length) {
					countComments = 0
				}
				////блок непосдественной отрисовки комментов, с передачей длины массива
				reWriteComments(arrComments[countComments], countComments, arrComments.length)
				countComments++
			}

		}, 20000)
	}
	//получаем данные с сервера
	fetch('../comments.json').then(res => res.json()).then(data => {
		//убираем Loader
		reviewsContainer.innerHTML = ''

		//функция вывода комментариев на страницу
		startloadComments(data)
		//рендеринг комментариев
		renderComments()
	}).catch(error => console.log(error))
}