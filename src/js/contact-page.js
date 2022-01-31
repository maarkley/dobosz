import $ from 'jquery'

export default class ContactPage {

	constructor() {

		console.log('working')

		this.init()
	}

	init() {

		$('.contact-page-wrapper').on('mousemove', function(e) {
			let $this = $(this)

			let centerX = window.innerWidth / 2
			let centerY = window.innerHeight / 2

			let offsetX = ( (centerX - e.clientX ) / centerX ) * 18
			let offsetY = ( (centerY - e.clientY ) / centerX ) * 12


			console.log('offsetX: ', offsetX)

			TweenMax.to('.contact-page-wrapper .bg-front', 6, {
				rotationY: (offsetX * (-1)) / 12, 
				rotationX: (offsetY * (-1)) / 12,
				ease: Power2.easeOut
			})

			TweenMax.to('.contact-page-wrapper .bg-back', 6, {
				rotationY: offsetX / 12,
				rotationX: offsetY / 12,
				ease: Power2.easeOut
			})
			

		})

	}

}