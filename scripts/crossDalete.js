import { crossDelete, input } from './../main.js'

function deleteInput(e) {
	input.value = '';
	e.target.closest('DIV').style.display = "none"
}

export { deleteInput }