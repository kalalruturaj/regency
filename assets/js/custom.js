(function($){
 "use strict";

	var win = $(window);
	/* ---------------------------------------------- /*
	 * Preloader
	/* ---------------------------------------------- */

	win.on('load',function() {
		$('#status').fadeOut();
		$('#preloader').delay(350).fadeOut('slow');
	});

	var doc = $(document);
	doc.ready(function() {

		/* ---------------------------------------------- /*
		 * Initialization General Scripts for all pages
		/* ---------------------------------------------- */

		HeroHeight();
		NavbarSubmenu();

		win.on('resize',function() {
			NavbarSubmenu();
			HeroHeight();
		});

		/* ---------------------------------------------- /*
		 * One page navigation
		/* ---------------------------------------------- */

		$('body').scrollspy({
			target: '.navbar-custom',
			offset: 80
		})

		/* ---------------------------------------------- /*
		 * Transparent navbar animation
		/* ---------------------------------------------- */

		var navtransp = $('.navbar-transparent');
		var hero = $('.intro-module');
		var navHeight = navtransp.height();

		if (navtransp.length > 0 && hero.length > 0) {
			win.on('scroll',function() {
				if($(this).scrollTop() >= navHeight) {
					navtransp.removeClass('navbar-transparent');
				} else {
					navtransp.addClass('navbar-transparent');
				}
			});
		} else {
			navtransp.removeClass('navbar-transparent');
		}

		/* ---------------------------------------------- /*
		 * Navbar submenu
		/* ---------------------------------------------- */

		function NavbarSubmenu() {
			var width = Math.max(win.width(), window.innerWidth);
			if (width > 767) {
				$('.dropdown').on('shown.bs.dropdown', function () {
					if ($('.dropdown-submenu', $(this)).length) {
						var MenuLeftOffset = $('.dropdown-menu', $(this)).offset().left;
						var Menu1Level     = $(this).children('.dropdown-menu').width();
						var Menu2Level     = $(this).find('.dropdown-menu .dropdown-menu').width();
						if(width - MenuLeftOffset - Menu1Level < Menu2Level) {
							$(this).children('.dropdown-menu').addClass('left-side');
						} else {
							$(this).children('.dropdown-menu').removeClass('left-side');
						}
					}
				});
			} else {
				$('.dropdown-toggle').not('.binded').addClass('binded').on('click', function () {
					$(this).toggleClass('angle-up');
				});
				$('.dropdown-submenu > a').not('.binded').addClass('binded').on('click', function () {
					$(this).toggleClass('angle-up');
					var Menu2Level = $(this).next('.dropdown-menu');
					Menu2Level.toggleClass('dropdown-open');
					return false;
				});
			}
		}

		/* ---------------------------------------------- /*
		 * Navbar collapse on click
		/* ---------------------------------------------- */

		doc.on('click','.navbar-collapse.in',function(e) {
			if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
				$(this).collapse('hide');
			}
		});

		/* ---------------------------------------------- /*
		 * Hero height
		/* ---------------------------------------------- */

		function HeroHeight() {
			$('.heightfull').height(win.height());
		}

		/* ---------------------------------------------- /*
		 * Parallax images on mobile
		/* ---------------------------------------------- */

		if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			$('.parallax').each(function(){
				$(this).css({'background-attachment': 'scroll'});
			});
		}

		/* ---------------------------------------------- /*
		 * Slideshow background
		/* ---------------------------------------------- */

		$('.slideshow').backstretch([
			'assets/images/home-1.jpg',
			'assets/images/home-2.jpg',
			'assets/images/home-3.jpg'
		], {duration: 3000, fade: 600});

		/* ---------------------------------------------- /*
		 * Intro, testimonials slider
		/* ---------------------------------------------- */

		$('.intro-slider').owlCarousel({
			paginationSpeed: 600,
			pagination: false,
			navigation: false,
			singleItem: true,
			slideSpeed: 600,
			autoPlay: 3000
		});

		$('.testimonials-slider').owlCarousel({
			paginationSpeed: 600,
			pagination: false,
			navigation: false,
			singleItem: true,
			slideSpeed: 300,
			autoPlay: 5000
		});

		/* ---------------------------------------------- /*
		 * Equal height columns
		/* ---------------------------------------------- */

		$('.equal-height').matchHeight();

		/* ---------------------------------------------- /*
		 * Service hover effect
		/* ---------------------------------------------- */

		var service_item = $('.iconbox');

		service_item.mouseenter(function(){
			if (!(service_item.hasClass('service-opened'))) {
				$(this).addClass('js-hovered');
				service_item.filter(':not(.js-hovered)').addClass('js-fade');
			}
		});

		service_item.mouseleave(function(){
			if (!(service_item.hasClass('service-opened'))) {
				$(this).removeClass('js-hovered');
				service_item.removeClass('js-fade');
			}
		});


		/* ---------------------------------------------- /*
		 * Popup images
		/* ---------------------------------------------- */

		$('a.popup-image').magnificPopup({
			type: 'image',
			image: {
				titleSrc: 'title',
				tError: 'The image could not be loaded.',
			}
		});

		$('a.gallery').magnificPopup({
			type: 'image',
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0,1]
			},
			image: {
				titleSrc: 'title',
				tError: 'The image could not be loaded.',
			}
		});

		

		/* ---------------------------------------------- /*
		 * A jQuery plugin for fluid width video embeds
		/* ---------------------------------------------- */

		$('body').fitVids();

		/* ---------------------------------------------- /*
		 * Date and time picker
		/* ---------------------------------------------- */

		$('#bdate').datepicker();

		/* ---------------------------------------------- /*
		 * Animated scrolling / Scroll Up
		/* ---------------------------------------------- */

		$('.page-scroll a').on('click', function(e){
			var anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $(anchor.attr('href')).offset().top
			}, 1000);
			e.preventDefault();
		});

		win.on('scroll',function() {
			if ($(this).scrollTop() > 100) {
				$('.scroll-up').fadeIn();
			} else {
				$('.scroll-up').fadeOut();
			}
		});

		$('a[href="#totop"]').on('click',function() {
			$('html, body').animate({ scrollTop: 0 }, 'slow');
			return false;
		});

	});

})(jQuery);