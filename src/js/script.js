import $ from 'jquery'
import Sliders from './sliders'
import Menu from './menu'
import Gallery from './gallery'
import AboutUsPage from './aboutUsPage'
import Animations from './animations'
import Forms from './forms'
import GoogleMapsLoader from 'google-maps'
import tilt from 'vanilla-tilt'
import ContactPage from './contact-page'

window.onload = () => { 

    console.log('vanilla tilt: ', tilt)

    tilt.init(document.querySelector('[data-custom-tilt]'), {
        max: 2,
        maxTilt: 3,
        speed: 500
    })

    new ContactPage()
    new Sliders()
    new Menu()
    new Gallery()
    new AboutUsPage()
    new Animations()
    new Forms()

    $('.loader-layer').addClass('entered-page')

    $('.langs').on('click', function() {
        $(this).toggleClass('show-on-mobile')
    })
    $('.langs .main-link').on('click', function(e)  {
        e.preventDefault()
    })

    let $homeHeader = $('.home-header')

    // $('a').on('click', function(e) {

    //     e.preventDefault()
    //     let $this = $(this)
    //     console.log('clicked lijk')
    //     $('.loader-layer').removeClass('entered-page').addClass('leaving-page')
    //     setTimeout(function() {
    //         window.location = $this.attr('href')
    //     }, 800)

    // })

    $('.contact-grid .column .switch').on('click', function() {

        let $this = $(this)
        let $parent = $this.parent()
        $parent.toggleClass('active')
        $parent.find('.content').slideToggle(350)

    })


    let $googleMap = $('.js-google-map')



    if ( $googleMap.length > 0  ) {

        GoogleMapsLoader.KEY = '';
        GoogleMapsLoader.load(function(google) {
            let map =new google.maps.Map($googleMap[0], {
                  center: {lat: 53.655403, lng: 14.524644},
                  zoom: 13,
                  styles: [
    {
        "featureType": "all",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "weight": "2.00"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#9c9c9c"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#eeeeee"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#7b7b7b"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#46bcec"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#c8d7d4"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#070707"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    }
]
            })
             let marker = new google.maps.Marker({
                  position: {lat: 53.655403, lng: 14.524644},
                  map: map,
                  title: 'Dobosz',
                  icon: window.location.origin + '/dist/img/kontakt/znacznik.png'
                })


        })
    }

    $('.about-us-timeline .grid .item').on('click', function() {

        let $this = $(this)
        $this.addClass('active')
             .siblings()
             .removeClass('active')

    })

    $('[data-scroll-to]').on('click', function() {

        $('body, html').animate({
            scrollTop: $('[data-scroll-section='+$(this).data('scroll-to')+']').offset().top
        }, 700)

    })

}

