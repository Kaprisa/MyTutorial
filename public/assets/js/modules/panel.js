import { $ } from './bling'
let control = -1

$('.panel__control').on('click', function() {
	control = control === -1 ? 0 : -1
	$('.panel').style.transform = `translateX(${control * 100}%)`
})