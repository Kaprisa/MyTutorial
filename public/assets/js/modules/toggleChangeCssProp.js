import { $, $$ } from './bling'
let control = 1

export default (control, elem, prop) => {
	control = control === 1 ? 0 : 1
	elem.style.cssText += `${prop}(-${control * 100}%)`
}