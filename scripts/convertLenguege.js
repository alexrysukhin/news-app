import { postsMap } from './../main.js';
import { letterMap } from './letterMap.js';




function convertLenguege(word) {
	if (word == '' || word == undefined) return '';

	let wordArr = Array.from(word);

	let translateArr = wordArr.map(item => {
		if (letterMap.has(item)) {
			return letterMap.get(item)
		} else {
			return item
		}
	})
	let convert = translateArr.join('');

	return convert;

	// let newWord;
	// for (let item of postsMap.values()) {

	// 	let itemLowercase = item.title.toLowerCase();

	// 	if (convert.length > 3 && itemLowercase.includes(convert)) {
	// 		console.log(itemLowercase)

	// 	}
	// 	else { return word }
	// 	console.log(newWord)
}

// }

export { convertLenguege }

