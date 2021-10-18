function makeTitle(fullTitle) {
	let title = fullTitle.split(' ').splice(0, 6).join(' ');

	return title;
}


export { makeTitle };