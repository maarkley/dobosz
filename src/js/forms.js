import $ from 'jquery'

export default class Forms {

    constructor() {

        this.$footerForm = $('footer form')
        this.$contactForm = $('#form form')
        this.init()

    }

    init() {

            if ( this.$footerForm.length > 0 ) {
                this.initFooterForm()
            }

            if ( this.$contactForm.length > 0 ) {
                this.initContactForm()
            }

    }

    initContactForm() {
		let ctx = this
			this.$contactForm.find('button').on('click', function () {
				console.log('sending form')
				var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
				var subject = $('#form [name=subject]').val();
				var company = $('#form [name=company]').val();
				var name = $('#form [name=name]').val();
				var email = $('#form [name=email]').val();
				var phone = $('#form [name=phone]').val();

				var message = $('#form [name=message]').val();
				$.ajax({
					type:'post',
					url: ctx.$contactForm.attr('action'),
					data: {_token: CSRF_TOKEN, name: name, email: email, message: message, phone: phone, company: company, subject: subject},
					dataType: 'JSON',
					success:function(data){
						console.log('data: ', data)
						ctx.$contactForm.find('.form-group').removeClass('show-validation error success')
						
							if ( Object.keys(data.validation).length > 0 ) {
								Object.keys(data.validation).map((item, key) => {
									let $target = $('#form [name='+item+']')
									let $validationBox = $target.parent().find('.validation-box')
								
											$target.parent()
													.addClass('error show-validation')
													$validationBox.text(data.validation[item][0])
										
								})
							} else {
								console.log('form sent: ', data)
								$('.right .form-message').text(data.message).addClass('show success')
								
							}

							setTimeout(function() {
								ctx.$contactForm.find('.form-group').removeClass('show-validation')
								$('#form .form-message').removeClass('show')

							}, 3000)

						
						

					},
					error: function(XMLHttpRequest, textStatus, errorThrown, request) {
	
					}
				})
			})
	}			

    initFooterForm() {
		let ctx = this
			this.$footerForm.find('button').on('click', function () {
				var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
				var name = $('.form_name').val();
				var email = $('.form_email').val();
				var message = $('.form_message').val();
				$.ajax({
					type:'post',
					url: ctx.$footerForm.attr('action'),
					data: {_token: CSRF_TOKEN, name: name, email: email, message: message},
					dataType: 'JSON',
					success:function(data){
						console.log('data: ', data)
						ctx.$footerForm.find('.form-group').removeClass('show-validation error success')
						
							if ( Object.keys(data.validation).length > 0 ) {
								Object.keys(data.validation).map((item, key) => {
									let $target = $('[name='+item+']')
									let $validationBox = $target.parent().find('.validation-box')
								
											$target.parent()
													.addClass('error show-validation')
													$validationBox.text(data.validation[item][0])
										
								})
							} else {
								ctx.$footerForm.find('.form-message').text(data.message).addClass('show success')
								ctx.$footerForm.find('.form-group').map((item, key) => {
								$(item).removeClass('error show-validation')
								})
							}

						
						

					},
					error: function(XMLHttpRequest, textStatus, errorThrown, request) {
	
					}
				})
			})
			
    }

}