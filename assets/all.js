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

$(function() {
	var header_div = $('header'),
		content_div = $('.mdl-layout__content'),
		about_div = $('#about'),
		menu_items = $('nav:visible a[href^="#"]'),
		countdown_div = $('#countdown-timer'),
		countdownEndTime = $(window).width() > 1024 ? new Date("Nov 10, 2017 10:00:00").getTime() : -1,
		days_span = countdown_div.find('#days'),
		hours_span = countdown_div.find('#hours'),
		mins_span = countdown_div.find('#minutes'),
		secs_span = countdown_div.find('#seconds');

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

	// show countdown timer
	if(countdownEndTime > new Date().getTime())
		countdown_div.fadeIn(800);

	// hide or show based on window width on resize
	$(window).resize(function() {
		if($(this).width() > 1024) {
			if(countdown_div.is(':visible') === false)
				countdown_div.fadeIn(800);
		} else if (countdown_div.is(':visible') === true){
			countdown_div.fadeOut(400);
		}
	});

	var countdownTimer = setInterval(function() {
		var timeLeft = countdownEndTime - new Date().getTime();

		if(timeLeft < 0 && countdown_div.is(':visible') === true) {
			clearInterval(countdownTimer);
			countdown_div.fadeOut(400);
			return;
		}

		var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
		var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

		days_span.html(days);
		hours_span.html(hours);
		mins_span.html(minutes);
		secs_span.html(seconds);
	}, 1000);

	// schedule a spy on scroll events. Faster than adding scroll handlers.
	setInterval(function() {
		if(content_div.scrollTop() < about_div.height() && header_div.hasClass("transparent-bg") === false) {
			header_div.removeClass("primary-bg");
			header_div.addClass("transparent-bg");
			if($(window).width() > 1024) // check if desktop
				countdown_div.fadeIn(800); // display countdown
		} else if(content_div.scrollTop() > about_div.height() && header_div.hasClass("primary-bg") === false) {
			header_div.removeClass("transparent-bg");
			header_div.addClass("primary-bg");
			if(countdown_div.is(':visible') === true)
				countdown_div.fadeOut(800);
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

