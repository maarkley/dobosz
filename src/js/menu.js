import $ from 'jquery'
import anime from 'animejs'

export default class Menu {

    constructor() {

        this.$burger = $('.burger')
        this.$menuLayer = $('.menu-layer')
        this.$closeLayer = $('.close-layer')
        this.init()

    }

    init() {

        let ctx = this

        ctx.$closeLayer.on('click', () => {
            ctx.$menuLayer.removeClass('active')
            ctx.$burger.removeClass('active')
        })

        ctx.$burger.on('click', () => {
            console.log('yes')
            ctx.$menuLayer.toggleClass('active')
            ctx.$burger.toggleClass('active')
            $('html').toggleClass('disable-scroll')
            if ( ctx.$menuLayer.hasClass('active') ) {
                $('.logo a').css({height: '130px'})
                anime({
                    targets: $('#logo .drummer').toArray(),
                    easing: 'easeInOutSine',
                    opacity: 0,
                    translateY: '-60px',
                    duration: 300
                  })

                  anime({
                    targets: $('#logo .writing').toArray(),
                    easing: 'easeInOutSine',
                    opacity: 0,
                    translateY: '-60px',                    
                    duration: 300
                  })

                  anime({
                    targets: $('#logo .initial-logo').toArray(),
                    easing: 'easeInOutSine',
                    translateY: '-115px',
                    duration: 700
                  })

                anime({
                    targets: '#logo .background',
                    easing: 'easeInOutSine',
                    d: 'M275.4,145.3c0,0-68.9-15.9-141.7-15.9C58.8,129.4,0,145.3,0,145.3V0h275.4V145.3z' ,
                    duration: 700
                  })
            } else {
                  $('.logo a').css({height: 'auto'})
                
                anime({
                    targets: $('#logo .drummer').toArray(),
                    easing: 'easeInOutSine',
                    opacity: 1,
                    translateY: '0',                    
                    duration: 300,
                    delay: 300
                    
                  })

                  anime({
                    targets: $('#logo .writing').toArray(),
                    easing: 'easeInOutSine',
                    opacity: 1,
                    translateY: '0',                    
                    duration: 300,
                    delay: 300
                  })

                  anime({
                    targets: $('#logo .initial-logo').toArray(),
                    easing: 'easeInOutSine',
                    translateY: 0,
                    duration: 700
                  })
                

                anime({
                    targets: '#logo .background',
                    easing: 'easeInOutSine',
                    d: 'M275.4,309.3c0,0-68.9-15.9-141.7-15.9C58.8,293.4,0,309.3,0,309.3V0h275.4V309.3z' ,
                    duration: 700
                  })
            }


        })

    }
}
