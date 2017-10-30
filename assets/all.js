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
	var header_div = $('header');
	var content_div = $('.mdl-layout__content');
	var about_div = $('#about');
	var menu_items = $('.mdl-navigation:visible a[href^="#"]');

	$('a[href^="#"]').click(function(e) {
		e.preventDefault();
		var top = $(this.hash).get(0).offsetTop; // $(#).offset().top returns incorrect value. No idea why!!
		content_div.animate({
			scrollTop: top + 5
		}, 800, "swing");
		if($('.mdl-layout__drawer').hasClass("is-visible"))
			$('.mdl-layout__drawer-button').click();
	});

	var scrollSpy = function() {
		if(content_div.scrollTop() < about_div.height() - 100 && header_div.hasClass("transparent-bg") === false) {
			header_div.removeClass("primary-bg");
			header_div.addClass("transparent-bg");
		} else if(content_div.scrollTop() > about_div.height() - 100 && header_div.hasClass("primary-bg") === false) {
			header_div.removeClass("transparent-bg");
			header_div.addClass("primary-bg");
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

		setTimeout(scrollSpy, 500);
	};

	scrollSpy();

	$('.faq-container').click(function(e) {
		e.preventDefault();
		if($(this).find('.answer').hasClass("is-visible") === false)
			$('.faq-container > .answer').removeClass("is-visible");
		$(this).find('.answer').toggleClass("is-visible");
	})
});

