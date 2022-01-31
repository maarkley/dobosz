import $ from 'jquery'
import lightbox from 'lightbox2'
require('malihu-custom-scrollbar-plugin')($)

export default class Gallery {

    constructor() {
        console.log('lightbox: ', lightbox)
        this.$galleryGrid = $('.js-gallery-grid')

        if ( this.$galleryGrid.length > 0 ) {
            this.init()
        }

    }

    init() {

        this.$galleryGrid.mCustomScrollbar({
            axis: 'x'
        })
        console.log('gallery running')

    }

}
