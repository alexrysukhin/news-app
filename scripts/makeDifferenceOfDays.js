

function makeDaysDifference(date) {

	let dateStr = Array.from(date).splice(0, 10).join('');
	let differenceOfDays = Math.round((`${new Date().getTime()}` - `${new Date(dateStr).getTime()}`) / 1000 / 60 / 60 / 24);

	(differenceOfDays <= 1) ? differenceOfDays = 'today' : differenceOfDays = `${differenceOfDays} days ago`;

	return differenceOfDays;
}

function getviews(id) {
	if (!localStorage.getItem(id)) {
		return 'not viewed'
	}
	else {
		let timeDifference = new Date().getTime() - (+localStorage.getItem(id));
		if (timeDifference < 3600000) {
			//let minutes = Math.round(60 * (timeDifference / 1000 / 60 / 60));
			let minutes = Math.round(timeDifference / 1000 / 60);
			if (minutes <= 1) {
				return `viewed 1 minute ago`
			}
			return `viewed ${minutes} minutes ago`
		}
		else if (timeDifference < 86400000) {
			let hours = Math.round(timeDifference / 1000 / 60 / 60);
			if (hours <= 1) {
				return `viewed 1 hour ago`
			}
			return `viewed ${hours} hours ago`
		} else {
			let days = Math.round(timeDifference / 1000 / 60 / 60 / 24);
			if (days <= 1) {
				return `viewed 1 day ago`
			}
			return `viewed ${days} days ago`
		}

	}
}

export { makeDaysDifference, getviews }