import { searchNews, postsMap } from '../main.js';

function categoreSelection() {
	let dropDown = document.querySelector('.drop-down-list');
	dropDown.addEventListener('click', (e) => {
		if (e.target.tagName != 'LI') return;
		searchNews(e.target.getAttribute('category'))
		postsMap.clear();
	})

}

function burger() {
	let burger = document.querySelector('.header__burger');
	let burgerDropDown = document.querySelector('.drop-down-nav');

	burger.addEventListener('click', (e) => {
		burger.classList.toggle('header__burger_active');
		burgerDropDown.classList.toggle('drop-down-nav_active');
	}
	)
}

function trendButton() {
	let trendButton = document.querySelector('.drop-down-nav__trending');

	trendButton.addEventListener('click', (e) => {
		searchNews('trending')
	})

}








export { categoreSelection, burger, trendButton };