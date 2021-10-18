import { postsMap, mainPages, secondPage, scrollToTop, input, inputList, searchButton, crossDelete, noExact, } from '../main.js';



function moreAbout(e) {

	e.preventDefault();
	secondPage.innerHTML = '';

	let target = e.target;
	let valuesObject = postsMap.get(`${target.closest('a').getAttribute('href')}`);
	localStorage.setItem(target.closest('a').getAttribute('href'), new Date().getTime());

	mainPages[0].classList.remove('list-of-pages__item_active');
	mainPages[1].classList.add('list-of-pages__item_active')


	secondPage.insertAdjacentHTML('beforeend', `<div class="post-content__img-holder"><img class="post-content__img" src="${valuesObject.image}" alt="post-image"></div><div class="main-content-conrainer"><h1 class="post-content__title">${valuesObject.title}</h1><div class="post-content__info"><span class="post-content__author">${valuesObject.author}</span><span class="post-content__date">${valuesObject.date}</span></div><div class="post-content__text">${valuesObject.text}</div></div>`)
	scrollToTop.style.display = 'none';
	window.scrollTo(0, 0);
	input.value = '';
	searchButton.removeAttribute('href')
	// })

}

function searchForSimilar() {

	input.addEventListener('input', (e) => {
		inputList.innerHTML = '';
		if (input.value) { crossDelete.style.display = "block" }
		else { crossDelete.style.display = "none" }

		if (noExact.classList.contains('no-exact__active')) noExact.classList.remove('no-exact__active')
		let value = input.value;
		if (value.length > 1) {
			for (let item of postsMap.values()) {
				let itemLowercase = item.title.toLowerCase();
				if (itemLowercase.includes(value)) {
					inputList.insertAdjacentHTML('beforeend', `<li class="input-list__item">${item.title}</li>`);

				}

				else { continue }
			}
		}
	})
	inputList.addEventListener('click', (e) => {
		input.value = e.target.innerHTML;
		for (let [key, value] of postsMap.entries()) {
			if (value.title == input.value) {
				searchButton.setAttribute('href', key)
			}
		}
	})

	document.addEventListener('click', (e) => {
		if (e.target.tagName != 'LI' && inputList.innerHTML) {
			inputList.innerHTML = '';


		}
	})


}




function clickToSearch(e) {
	e.preventDefault();

	let flag = false;
	if (!searchButton.hasAttribute('href') || input.value == '') return;


	for (let item of postsMap.values()) {
		if (item.title == input.value) flag = true
	}
	if (flag) {
		moreAbout(e)
	}
	else if (!flag) {
		noExact.classList.add('no-exact__active')
	}


}



export { moreAbout, searchForSimilar, clickToSearch }