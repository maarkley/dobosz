import $ from 'jquery'
import slick from 'slick-carousel'


export default class Sliders {

    constructor() {

        this.$homeSlider = $('.js-home-slider')
        this.$productSlider = $('.js-product-slider')
        this.$homeProductsSlider = $('.js-home-products-slider')

        this.init()

    }

    init() {
        let ctx = this
        if ( this.$homeSlider.length > 0 ) {


            this.$homeSlider.on('init', function() {
                console.log('home slider init: ', ctx.$homeSlider.find('.slick-active .item'))
                if ( ctx.$homeSlider.find('.slick-active .item').hasClass('cover') ) {
                    console.log('window offset: ', window.pageYOffset)
                    console.log('slider height: ', ctx.$homeSlider.height())

                    if ( window.pageYOffset < ctx.$homeSlider.height() ) {
                        setTimeout(()=> {
                            $('body').removeClass('visible-nav')
                        }, 300)
                        console.log('should remove class')
                    }
                } else {
                    if ( window.pageYOffset < ctx.$homeSlider.height() ) {
                        $('body').addClass('visible-nav')
                        console.log('should add class')

                    }
                }
            })            

            this.$homeSlider.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false,
                autoplay: true,
                infinite: false,
                autoPlaySpeed: 13000,
                speed: 2000,
                fade: true, 
                arrows: true,
                pauseOnHover: false,
                pauseOnFocus: false,
                cssEase: 'cubic-bezier(1,.08,.33,.95)',
                prevArrow: '<div class="arrow prev"> \
                            </div>',
                nextArrow: '<div class="arrow next"> \
                            </div>'
            })

            this.$homeSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
                let $nextSlide = $('[data-slick-index='+nextSlide+']').find('.item')
                if ( $nextSlide.hasClass('cover') ) {
                    console.log('window offset: ', window.pageYOffset)
                    console.log('slider height: ', ctx.$homeSlider.height())

                    if ( window.pageYOffset < ctx.$homeSlider.height() ) {
                        $('body').removeClass('visible-nav')
                        console.log('should remove class')
                    }
                } else {
                    if ( window.pageYOffset < ctx.$homeSlider.height() ) {
                        $('body').addClass('visible-nav')
                        console.log('should add class')

                    }
                }
            })
        }

        if ( this.$productSlider.length > 0 ) {
            let count = $('.packaging .cubes .item').length
            console.log(count)
            this.$productSlider.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                // dots: true,
                autoplay: true,
                autoPlaySpeed: 5000,
                speed: 1000,
                fade: true, 
                centerMode: true,
                // arrows: true,
                pauseOnHover: false,
                pauseOnFocus: false,
                waitForAnimate: true,
                asNavFor: '.packaging .cubes'
            })
            $('.packaging .cubes').slick({
                slidesToShow: count,
                autoplay: true,
                centerMode: true,
                asNavFor: '.js-product-slider',
                focusOnSelect: true
            })
        }

        if ( this.$homeProductsSlider.length > 0 ) {
            this.$homeProductsSlider.slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                autoplay: false,
                autoPlaySpeed: 5000,
                speed: 1000,
                centerMode: true,
                arrows: true,
                pauseOnHover: false,
                pauseOnFocus: false,
                variableWidth: true,
                prevArrow: '<div class="arrow prev"> \
                            </div>',
                nextArrow: '<div class="arrow next"> \
                            </div>',
                            responsive: [
                                
                                {
                                  breakpoint: 600,
                                  settings: {
                                    slidesToShow: 1,
                                    slidesToScroll: 1
                                  }
                                }
                              ],
                
            })
        }
       

        

    }

}