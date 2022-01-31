import $ from 'jquery'

export default class AboutUsPage {

    constructor() {

        let ctx = this

        ctx.setContentHeight()


        $('.about-us-guys .img-wrapper').on('click', function() {

            let $this = $(this)

            $this.toggleClass('active').siblings().toggleClass('active')

            let $target = $('[data-text=' + $this.data('text-index') + ']')

            $this.toggleClass('active')
                .siblings()
                 .toggleClass('active')

            $target.toggleClass('active')
                    .siblings()
                   .toggleClass('active')

        })

        $('.about-us-header .controls .item').on('click', function() {
            let $this = $(this)
            $this.addClass('active').siblings().removeClass('active')
            let index = $this.index()  
            console.log('index: ', index)
            
            let $contentTarget = $($('.about-us-header .content .item')[index])
            let $siblings = $('.about-us-header .content .item')
            $siblings.removeClass('active')
            $contentTarget.addClass('active')

            ctx.setContentHeight()

        })


    }

    setContentHeight() {

        let contentHeight = $('.about-us-header .content .item.active').height()
        $('.about-us-header .content').css('height', contentHeight)

    }

}
