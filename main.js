let { log } = console;

import { makeTitle } from './scripts/makeTitle.js';
import { scrolling } from './scripts/scroll-top.js'
import { makeDaysDifference, getviews } from './scripts/makeDifferenceOfDays.js';
import { categoreSelection, burger, trendButton } from './scripts/buttons.js';
import { imageLoader } from './scripts/imageLoader.js';
import { moreAbout, searchForSimilar, clickToSearch } from './scripts/moreAbout.js';
import { makeDescription } from './scripts/makeDescription.js';
import { deleteInput } from './scripts/crossDalete.js';
import Post from './scripts/makePost.js';



let noExact = document.querySelector('.no-exact');
let searchButton = document.querySelector('.input-button');
let mainDisplay = document.querySelector('.main-section__main-news-display');
let newsList = document.querySelector('.main-section__news-list');
let secondPage = document.querySelector('.second-page');
let preloader = document.querySelector('.preloader');
let inputList = document.querySelector('.input-list');
let mainPages = Array.from(document.querySelectorAll('.list-of-pages__item'));
let scrollToTop = document.querySelector('.button-top');
let input = document.querySelector('.header__search');
let crossDelete = document.querySelector('.cross-delete');
let postsMap = new Map();





function searchNews(category) {
	scrollToTop.style.display = 'flex';
	mainPages[1].classList.remove('list-of-pages__item_active');
	mainPages[0].classList.add('list-of-pages__item_active')

	mainDisplay.innerHTML = '';
	newsList.innerHTML = '';

	preloader.style.display = 'block';
	document.body.style.overflow = "hidden";


	fetch(`https://content.guardianapis.com/search?q=${category}&show-tags=all&page-size=21&show-fields=all&order-by=newest&api-key=0cc1c5bc-7fe4-47bc-80cc-f17c13be193c`)
		.then((response) => response.json())
		.then((result) => {
			let newsArr = result.response.results;
			postsMap.clear();

			for (let i = 0; i < newsArr.length; i++) {

				let title = makeTitle(newsArr[i].webTitle);
				let differenceOfDays = makeDaysDifference(newsArr[i].webPublicationDate);
				let description = makeDescription(newsArr[i].fields.bodyText);
				let views = getviews(newsArr[i].id);

				let postInformation = new Post(title, differenceOfDays, newsArr[i].fields.thumbnail, newsArr[i].fields.byline, newsArr[i].fields.bodyText)
				postsMap.set(`${newsArr[i].id}`, postInformation);

				if (i < 1) {
					mainDisplay.insertAdjacentHTML('afterbegin',
						`<div class="main-news-display__description"><h2 class="main-news-title"><a href="${newsArr[i].id}">${title}</a></h2><p class="main-news__content">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum ea eumvero dolor obcaecati excepturi</p><div class="news-info"><span class="news-date">${differenceOfDays}</span><a href="${newsArr[i].id}" class="news-read-more">Read more</a></div></div><div class="main-news-display__img-holder"><a href="${newsArr[i].id}"><img src="${newsArr[i].fields.thumbnail}" alt="" class="main-news-display__img"></a></div>`
					)
				} else {
					newsList.insertAdjacentHTML('beforeend', `<li class="news-list__post" > <div class="news-post__img-holder"><a href="${newsArr[i].id}" class="news-post__link"><img src="${newsArr[i].fields.thumbnail}" class="news-post__img" alt=""></a></div><div class="news-post__info"><h3 class="news-post__title"><a href="${newsArr[i].id}" class="news-post__link">${title}</a></h3><p class="news-post__desc">${description}...</p><div class="news-post__history"><div class="post-history__date-block"><span class="date-block__date">${differenceOfDays}</span><span class="date-block__viewing">${views}</span></div><a href="${newsArr[i].id}" class="news-read-more">Read more</a></div></div></li>`
					)
				}
			}
			newsList.insertAdjacentHTML("beforeend", '<li class="fake-item"></li>')

		}).then(() => {
			imageLoader();

		})
		.catch(() => {
			preloader.insertAdjacentHTML('beforeend', '<div class ="error-card"><h1>error while fetching data</h1></div>')
			console.log('some error')
		});
}

// ***********burger

burger();

// ********select trending page

searchNews('trending');

// ***********TrendingNews

trendButton()


// ***********Categories selection

categoreSelection();


// ***********more about page
mainDisplay.addEventListener('click', moreAbout);
newsList.addEventListener('click', moreAbout);


// ********** scrollingTop
scrollToTop.addEventListener('click', scrolling);

// ***************searchPostsNews
searchForSimilar()
searchButton.addEventListener('click', clickToSearch)



// deleteInput()
crossDelete.addEventListener('click', deleteInput)


window.addEventListener('keyup', (e) => {
	if (e.key == 'Enter' && input.value) {
		log(input.value)
		searchButton.click()
	}
})


export { searchNews, mainDisplay, newsList, postsMap, preloader, mainPages, secondPage, scrollToTop, input, inputList, searchButton, crossDelete, noExact }