


;(function () {
	
	'use strict';

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
	    var container = $("#qbootstrap-offcanvas, .js-qbootstrap-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {

	    	if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-qbootstrap-nav-toggle').removeClass('active');
				
	    	}
	    
	    	
	    }
		});

	};


	var offcanvasMenu = function() {

		$('.offcanvas-has-dropdown').mouseenter(function(){
			var $this = $(this);

			$this
				.addClass('active')
				.find('ul')
				.slideDown(500, 'easeOutExpo');				
		}).mouseleave(function(){

			var $this = $(this);
			$this
				.removeClass('active')
				.find('ul')
				.slideUp(500, 'easeOutExpo');				
		});

	};


	var burgerMenu = function() {

		$('body').on('click', '.js-qbootstrap-nav-toggle', function(event){
			var $this = $(this);


			if ( $('body').hasClass('overflow offcanvas') ) {
				$('body').removeClass('overflow offcanvas');
			} else {
				$('body').addClass('overflow offcanvas');
			}
			$this.toggleClass('active');
			event.preventDefault();

		});
	};



	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};


	var dropdown = function() {

		$('.has-dropdown').mouseenter(function(){

			var $this = $(this);
			$this
				.find('.dropdown')
				.css('display', 'block')
				.addClass('animated-fast fadeInUpMenu');

		}).mouseleave(function(){
			var $this = $(this);

			$this
				.find('.dropdown')
				.css('display', 'none')
				.removeClass('animated-fast fadeInUpMenu');
		});

	};


	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});
		
		$(window).scroll(function(){
			var $win = $(window);
			if($win.scrollTop() > 400){
				$('.js-top').addClass('active');
				$('.navbar-static-top').addClass('index-fix-nav')
					.css({'box-shadow':'0 3px 3px rgba(0,0,0,.3)','background-color':'#fff'});
					$('.index-nav .navbar-nav > li > a').css({'color':'#333'});
					$('.index-nav .head-inf').css({'color':'#333'});					
					$('.index-nav .navbar-brand').attr('background','url(../images/logo.png) no-repeat');					
				$('.index-nav').on('mouseenter mouseleave',function(){
					$('.index-nav').css({'background-color':'#fff'});
					$('.index-nav .navbar-nav > li > a').css({'color':'#333'});
					$('.index-nav .head-inf').css({'color':'#333'});
					$('.index-nav .navbar-brand').attr('background','url(../images/logo.png) no-repeat');
				})
			}
			else{
				$('.js-top').removeClass('active');
				$('.navbar-static-top.page-nav').removeClass('index-fix-nav').css({'box-shadow':'unset'});				
				$('.index-nav').removeClass('index-fix-nav')
					.css({'box-shadow':'unset','background-color':'unset'});
					$('.index-nav .navbar-nav > li > a').css({'color':'#fff'});
					$('.index-nav .head-inf').css({'color':'#fff'});
					$('.index-nav .navbar-brand').attr('background','url(../images/logo-white.png) no-repeat');						
				$('.index-nav').on('mouseenter',function(){
					$('.index-nav').css({'background-color':'#fff'});
					$('.index-nav .navbar-nav > li > a').css({'color':'#333'});
//					$('.index-nav .navbar-nav > li > a').css({'color':'#234093'});
					$('.index-nav .head-inf').css({'color':'#333'});
					$('.index-nav .navbar-brand').attr('background','url(../images/logo.png) no-repeat');
				}).on('mouseleave',function(){
					$('.index-nav').css({'background-color':'unset'})
						$('.index-nav .navbar-nav > li > a').css({'color':'#fff'});
						$('.index-nav .navbar-nav > li > .dropdown-toggle').css({'color':'#fff'});
						$('.index-nav .head-inf').css({'color':'#fff'});
						$('.index-nav .navbar-brand').attr('background','url(../images/logo-white.png) no-repeat');
				});
//				$('.navbar-default.navbar-static-top > .nav.navbar-nav li').on('mouseenter',function(){
//					$(this).css({'color':'#234093'});
//				}).on('mouseleave',function(){
//					$(this).css({'color':'#333'});
//				})
			}
		});
	
	};


	var loaderPage = function() {
		$(".qbootstrap-loader").fadeOut("slow");
	};

	var counter = function() {
		$('.js-counter').countTo({
			 formatter: function (value, options) {
	      return value.toFixed(options.decimals);
	    },
		});
	};


	var counterWayPoint = function() {
		if ($('#qbootstrap-counter').length > 0 ) {
			$('#qbootstrap-counter').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( counter , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}
	};

	var sliderMain = function() {
		
	  	$('#qbootstrap-hero .flexslider').flexslider({
			animation: "fade",
			slideshowSpeed: 5000,
			directionNav: true,
			start: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			},
			before: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			}

	  	});


	};

	var parallax = function() {

		if ( !isMobile.any() ) {
			$(window).stellar({
				horizontalScrolling: false,
				hideDistantElements: false, 
				responsive: true

			});
		}
	};


	var stickyFunction = function() {

		var h = $('.image-content').outerHeight();

		if ($(window).width() <= 992 ) {
			$("#sticky_item").trigger("sticky_kit:detach");
		} else {
			$('.sticky-parent').removeClass('stick-detach');
			$("#sticky_item").trigger("sticky_kit:detach");
			$("#sticky_item").trigger("sticky_kit:unstick");
		}

		$(window).resize(function(){
			var h = $('.image-content').outerHeight();
			$('.sticky-parent').css('height', h);


			if ($(window).width() <= 992 ) {
				$("#sticky_item").trigger("sticky_kit:detach");
			} else {
				$('.sticky-parent').removeClass('stick-detach');
				$("#sticky_item").trigger("sticky_kit:detach");
				$("#sticky_item").trigger("sticky_kit:unstick");

				$("#sticky_item").stick_in_parent();
			}
			

			

		});

		$('.sticky-parent').css('height', h);

		$("#sticky_item").stick_in_parent();

	};


		var countDownDate = new Date("Dec 30, 2018 15:37:25").getTime();

		var x = setInterval(function() {


		var now = new Date().getTime();


		var distance = countDownDate - now;

		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);


		document.getElementById("days").innerHTML = days +" <small>days</small>";
		document.getElementById("hours").innerHTML = hours + " <small>hours</small> ";
		document.getElementById("minutes").innerHTML = minutes + " <small>minutes</small> ";
		document.getElementById("seconds").innerHTML = seconds + " <small>seconds</small> ";

		if (distance < 0) {
		 clearInterval(x);
		 document.getElementById("demo").innerHTML = "The Wedding Ceremony is Over";
		}
		}, 1000);


	$(function(){
		mobileMenuOutsideClick();
		offcanvasMenu();
		burgerMenu();
		contentWayPoint();
		dropdown();
		goToTop();
		loaderPage();
		counterWayPoint();
		counter();
		parallax();
		sliderMain();
//		testimonialCarousel();
		stickyFunction();
		
		
		//导航
		$(".navbar-static-top .dropdown").mouseover(function () {
			$(this).addClass("open");
		}).mouseleave(function(){
			$(this).removeClass("open");
		});
	    //轮播
		$('#myCarousel').carousel({interval:4500});
		//搜索
		$('.head-inf').on('click',function(e){
			e.stopPropagation();
		});
		//导航冲突
		$('#qbootstrap-hero,#qbootstrap-intro,#qbootstrap-num,#qbootstrap-services,#qbootstrap-testimonial,#qbootstrap-counter,#qbootstrap-choose,#qbootstrap-doctor,#qbootstrap-footer,#qbootstrap-blog,#qbootstrap-footer').on('click',function(e){
			e.stopPropagation()
		});
		
		$('.publick-title .hk').on('click',function(){
			$(this).parent().siblings('.slide-box').slideToggle();
		})
		
		
		
	});


}());





//			
//$(function () { 
//	
//
//	
//	
//  
//});


