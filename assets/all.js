/*
	Copyright 2017 Ashutosh Gangwar

	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

		http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.
*/

var countdown = {
	init:					function() {
									this.div = $("#countdown-timer");
									this.days = this.div.find("#days");
									this.hours = this.div.find("#hours");
									this.minutes = this.div.find("#minutes");
									this.seconds = this.div.find("#seconds");
								},
	getEnd:				function() {
									return new Date("March 17, 2018 10:00:00").getTime();
								},
	getRemaining: function() {
									return this.getEnd() - new Date().getTime();
								},
	show:					function() {
									if(this.div.is(":visible") === true || this.getRemaining() < 0 || $(window).width() < 1024)
										return;

									this.timer = setInterval(this.update, 1000);
									this.div.fadeIn(800);
									this.update();
								},
	update:				function() {
									var remaining = countdown.getRemaining();
									if(remaining < 0) { // hide countdown timer
										countdown.hide();
										return;
									}
									countdown.days.html(Math.floor(remaining / (1000 * 60 * 60 * 24)));
									countdown.hours.html(Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
									countdown.minutes.html(Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60)));
									countdown.seconds.html(Math.floor((remaining % (1000 * 60)) / 1000));
								},
	hide:					function() {
									clearInterval(this.timer);
									this.div.fadeOut(400);
								}
};

$(function() {
	var header_div = $('header'),
		content_div = $('.mdl-layout__content'),
		about_div = $('#about'),
		menu_items = $('nav:visible a[href^="#"]');

	// init countdown timer
	countdown.init();
	countdown.show(); // show timer
	$(window).resize(function() {
		if($(window).width() < 1024) // hide countdown timer.
			countdown.hide();
		else
			countdown.show();
	});

	menu_items.addClass("animate"); // make menu items animatable
	$('a[href^="#"]').click(function(e) {
		e.preventDefault();
		var top = $(this.hash).get(0).offsetTop; // $(#).offset().top not working. NO IDEA WHY?!!
		content_div.animate({
			scrollTop: top + 5
		}, 800, "swing");
		if($('.mdl-layout__drawer').hasClass("is-visible"))
			$('.mdl-layout__drawer-button').click();
	});

	// schedule a spy on scroll events. Faster than adding scroll handlers.
	setInterval(function() {
		if(content_div.scrollTop() < about_div.height() - 100 && header_div.hasClass("transparent-bg") === false) {
			header_div.addClass("transparent-bg").removeClass("primary-bg");
			countdown.show();
		} else if(content_div.scrollTop() > about_div.height() - 100 && header_div.hasClass("primary-bg") === false) {
			header_div.addClass("primary-bg").removeClass("transparent-bg");
			countdown.hide();
		}

		$(menu_items).each(function () {
			var $this = $(this);
			var menu_target = $($this.attr('href'));
			if (menu_target.get(0).offsetTop < content_div.scrollTop()
					&& menu_target.get(0).offsetTop + menu_target.outerHeight() > content_div.scrollTop())
				$this.addClass("active");
			else if ($this.hasClass("active"))
				$this.removeClass("active");
		});
	}, 500);

	// Handle faq container clicks!
	$('.answer.is-visible').toggleClass("is-visible");
	$('.faq-container').click(function(e) {
		e.preventDefault();
		if($(this).find('.answer').hasClass("is-visible") === false)
			$('.faq-container > .answer').removeClass("is-visible");
		$(this).find('.answer').toggleClass("is-visible");
	});
});
