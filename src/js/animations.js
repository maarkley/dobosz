import $ from 'jquery';
import { TimelineMax, TweenMax, Circ, gsap, Power2, Power1, Elastic, Sine, Linear } from 'gsap'
import ScrollMagic from 'scrollmagic'
require('scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js')
require('scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js')
import anime from 'animejs'


export default class Animations {

    constructor() {

        this.init()

        this.parallaxController = new ScrollMagic.Controller()

    }

    init() {
        console.log('animations working')
        // this.setParallaxElements()
        this.setShuffleElements()
        this.setAboutUsReveal()
        this.setSectionTitleReveal()
        this.setHomeNewsReveal()
        this.setFooterAnimations()    
        this.setNavbarChecker()  
        this.setLogoChecker()  
        this.setAboutUsAnimations()

    }

    setShuffleElements() {

        let ctx = this

        let controller = new ScrollMagic.Controller({})

        

        $('[data-parallax-viewport]').each((k, i) => {
            let $i = $(i)
            // let timeline = new TimelineMax()        
            let tweenArray = []
            $i.find('[data-parallax-shuffle-in]').each((key, item) => {
                // tweenArray.push(item)
                  let offset = $(item).data('parallax-shuffle-in') * 18
                let timeline = new TimelineMax()        
                      console.log('item: ', item)
                    timeline.add(TweenMax.fromTo(item, 0.3, { 
                                                            y: 0,
                                                            opacity: 1,
                                                            ease: Sine.easeOut
                                                        }, { 
                                                            y: offset, 
                                                            scale: 1,
                                                            opacity: 1,
                                                            ease: Sine.easeOut 
                                                        }))

                    let scene = new ScrollMagic.Scene({
                        triggerElement: $i[0],
                        triggerHook: 1,
                        offset: 0,
                        duration: $i.height() + window.innerHeight
                    })
                    .setTween(timeline)
                    .addTo(controller)
                })  
               
                

            })

    }

    setAboutUsReveal() {

        let ctx = this
        let $aboutUs = $('.home-about-us')
        let controller = new ScrollMagic.Controller()

        let timeline = new TimelineMax()
                           .staggerFromTo($aboutUs.find('.item, .upper-title, .info-box .experience, .default-title'), 0.45, {
                               opacity: 0,
                               scale: 0.98
                           }, {
                               opacity: 1,
                               scale: 1
                           }, 0.1)

        let scene = new ScrollMagic.Scene({
            triggerElement: $aboutUs[0],
            offset: 150
        })
        .setTween(timeline)
        // .addIndicators({name: 'staggering'})
        .addTo(controller)

    }

    setHomeNewsReveal() {

        let ctx = this
        let $homeNews = $('.home-news')
        let controller = new ScrollMagic.Controller()

        let timeline = new TimelineMax()
                           .fromTo($homeNews.find('.articles'), 0.4, {
                                opacity: 1,
                                scale: 1
                           }, {
                               opacity: 1,
                               scale: 1,
                               ease: Power2.easeInOut
                           })
                           .staggerFromTo($homeNews.find('.thumb, .info-box, .title, .date, .primary-btn'), 0.5, {
                               opacity: 0,
                               scale: 1.05
                           }, {
                               opacity: 1,
                               scale: 1
                           }, 0.1)
                           .to($homeNews.find('.article'), 0.5, {
                            boxShadow: '0 0 50px #acacac'
                           })

        let scene = new ScrollMagic.Scene({
            triggerElement: $homeNews[0],
            offset: 300
        })
        .setTween(timeline)
        // .addIndicators({name: 'staggering'})
        .addTo(controller)

    }

    setSectionTitleReveal() {

        let $sectionTitle = $('.section-title')

        let controller = new ScrollMagic.Controller()

       

        $sectionTitle.each(function() {
            let $this = $(this)
            console.log('this: ', $this)
            let scene = new ScrollMagic.Scene({
                triggerElement: $this[0],
                offset: -30
            })


             let timeline = new TimelineMax()
                           .staggerFromTo($this, 0.75, {
                               opacity: 0,
                               y: 10
                           }, {
                               opacity: 1,
                               y: 0,
                               ease: Power2.easeInOut
                           }, 0.2)
                           
            scene.setTween(timeline)
                 .addTo(controller)

        })

        
    }

    setFooterAnimations() {

        let controller = new ScrollMagic.Controller()

        let $footer = $('footer')

        let timeline = new TimelineMax()
                           .staggerFromTo($footer.find('.left h4, .left p, .left .primary-btn'), 0.25, {
                               opacity: 0,
                               x: 20
                           }, {
                               opacity: 1,
                               x: 0,
                               ease: Power1.easeInOut
                           }, 0.1)
                           .staggerFromTo($footer.find('.right .form-title, .right .form-group, .right .primary-btn'), 0.25, {
                               opacity: 0,
                               x: -20
                           }, {
                               opacity: 1,
                               x: 0,
                               ease: Power1.easeInOut
                           }, 0.1)

        let scene = new ScrollMagic.Scene({
            triggerElement: $footer[0],
            triggerHook: 0.8
        })
        .setTween(timeline)
        // .addIndicators({name: 'staggering'})
        .addTo(controller)

    }

    setNavbarChecker() {

        let controller = new ScrollMagic.Controller()


        $('.show-menu-container').each((index, item) => {

            console.log('show menu containers: ', $(item).height())
            let scene = new ScrollMagic.Scene({
                triggerHook: 'onEnter',            
                triggerElement: item,
                offset: window.innerHeight,
                duration: $(item).height()
            })
            .setClassToggle('body', 'visible-nav')
            .addTo(controller)

        })

    }

    setLogoChecker() {

        let controller = new ScrollMagic.Controller()

             const mq = window.matchMedia("(max-width: 768px)");
             console.log('mobile media query: ', mq)
             if ( mq.matches ) {
             $('.logo a').css({height: '110px'})
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
             }

            let scene = new ScrollMagic.Scene({
                triggerHook: 'onEnter',            
                triggerElement: $('body')[0],
                offset: window.innerHeight + 50
            })
            .on('enter', () => {
                console.log('entering')
                $('.logo a').css({height: '110px'})
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
            })
            .on('leave', () => {
              if ( !mq.matches ) {

                $('.logo a').css({height: '235px'})
                
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
            .addTo(controller)


    }


    setAboutUsAnimations() {

        let controller = new ScrollMagic.Controller()

        let $aboutUsHeader = $('.about-us-header')

        let timeline1 = new TimelineMax()
                           .staggerFromTo($aboutUsHeader.find('.content, .experience, .circle-btn'), 0.55, {
                               opacity: 0,
                               y: 20
                           }, {
                               opacity: 1,
                               y: 0,
                               ease: Power1.easeInOut
                           }, 0.2)


        let scene1 = new ScrollMagic.Scene({
            triggerElement: $aboutUsHeader[0]
        })
        .setTween(timeline1)
        .addTo(controller)


        let $aboutUsTimeline = $('.about-us-timeline')

        let timeline2 = new TimelineMax()
                           .staggerFromTo($aboutUsTimeline.find('.item'), 0.55, {
                               opacity: 0,
                               y: 20
                           }, {
                               opacity: 1,
                               y: 0,
                               ease: Power1.easeInOut
                           }, 0.2)


        let scene2 = new ScrollMagic.Scene({
            triggerElement: $aboutUsTimeline[0]
        })
        .setTween(timeline2)
        .addTo(controller)


        let $aboutUsMap = $('.about-us-map')

        let timeline3 = new TimelineMax()
                           .staggerFromTo($aboutUsMap.find('.lead, p'), 0.55, {
                               opacity: 0,
                               y: 20
                           }, {
                               opacity: 1,
                               y: 0,
                               ease: Power1.easeInOut
                           }, 0.2)


        let scene3 = new ScrollMagic.Scene({
            triggerElement: $aboutUsMap[0]
        })
        .on('enter', () => {
            anime({
                targets: '#map .contours path',
                strokeDashoffset: [anime.setDashoffset, 0],
                easing: 'easeInOutSine',
                opacity: 1,
                duration: 2200,
                delay: function(el, i) { return i * 7 }
              })
              setTimeout(() => {
                anime({
                    targets: '#map .arrows path, #map .arrows polygon',
                    strokeDashoffset: [anime.setDashoffset, 0],
                    easing: 'easeInOutSine',
                    opacity: 1,
                    duration: 1200,
                    delay: function(el, i) { return i * 15 }
                  })
                  anime({
                    targets: '#map circle',
                    easing: 'easeInOutSine',
                    opacity: 1,
                    duration: 300,
                    delay: function(el, i) { return i * 15 }
                  })
              }, 1500)
             
        })
        .setTween(timeline3)
        .addTo(controller)

    }
}