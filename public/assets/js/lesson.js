import '../sass/pages/lesson.sass'
import './modules/panel'
import { $, $$ } from './modules/bling'
let control = -1

$$('.examples__btn').on('click', function() {
	control = control === -1 ? 0 : -1
 	$('.examples').style.top = `${control * 100}%`
})