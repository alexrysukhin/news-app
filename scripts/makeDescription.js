function makeDescription(fullText) {
	let description = fullText.split(' ').splice(0, 25).join(' ');
	return description;
}

export { makeDescription }