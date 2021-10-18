import { preloader } from '../main.js';


function imageLoader() {
	let imageCounter = 0;
	let images = Array.from(document.images);
	let imagesTotal = images.length;
	for (let i = 0; i < images.length; i++) {
		let image = new Image();
		image.src = images[i].src;
		image.addEventListener('load', imageCount);
		image.addEventListener('error', imageCount);
	}

	function imageCount() {
		imageCounter++;
		if (imageCounter >= images.length) {
			preloader.style.display = 'none';
			document.body.style.overflow = "auto";
		}
	}
}


export { imageLoader }