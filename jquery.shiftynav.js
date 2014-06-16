/*
 * ShiftyNav v1.0
 * http://shiftynav.rjansen.name/
 * 
 * Copyright (c) 2013 Ruud Jansen
 * Released under the MIT license.
 * http://shiftynav.rjansen.name/license
 */
(function($, window, undefined) {
	$.fn.shiftynav = function(options) {
		var defaults = {
			'active': 0,
			'duration': 400,
			'scaling': 75
		}

		var settings = $.extend(defaults, options || {});

		function resetActive(list_items) {
			list_items.each(function(idx, el) {
				$(this).parent().removeClass('shiftynav-active');
			});
		}

		function shiftOut(el) {
			var width = el.css('width');
			el
				.css('width', width) // Make width static
				.animate({'left': '-' + width}, settings.duration, function() {
					el.hide();
				});
		}

		function shiftIn(el) {
			var width = el.css('width');
			el
				.css('width', width)
				.css('left', '-' + width)
				.show()
				.animate({'left': '0px'}, settings.duration);
		}

		function fadeOut(el) {
			el
				// border-spacing trick because we can't animate scale() property directly
				.css('border-spacing', '1px')
				.css('-webkit-transform', 'scale(1, 1)')
				.css('-ms-transform', 'scale(1, 1)')
				.css('transform', 'scale(1, 1)')
				.animate({'opacity': 0,
					'border-spacing': settings.scaling / 100 + 'px'
				},
				{
					duration: settings.duration,
					step: function(now, fx) {
						if (fx.prop == 'borderSpacing') {
							$(this)
								.css('-webkit-transform', 'scale(' + now + ',' + now + ')')
								.css('-ms-transform', 'scale(' + now + ',' + now + ')')
								.css('transform', 'scale(' + now + ',' + now + ')');
						}
					},
					complete: function() {
						el
							.hide()
							.css('-webkit-transform', 'scale(1,1)')
							.css('-ms-transform', 'scale(1,1)')
							.css('transform', 'scale(1,1)')
							.css('opacity', 1);
					}
				});
		}

		function fadeIn(el) {
			el
				.css('opacity', '0')
				.css('left', '0')
				.css('-webkit-transform', 'scale(' + settings.scaling / 100 + ',' + settings.scaling / 100 + ')')
				.css('-ms-transform', 'scale(' + settings.scaling / 100 + ',' + settings.scaling / 100 + ')')
				.css('transform', 'scale(' + settings.scaling / 100 + ',' + settings.scaling / 100 + ')')
				.css('border-spacing', settings.scaling + 'px')
				.show()
				.animate({
					'opacity': 1,
					'border-spacing': '100px'
				},
				{
					duration: settings.duration,
					step: function(now, fx) {
						if (fx.prop == 'borderSpacing') {
							now /= 100;
							$(this).css('-webkit-transform', 'scale(' + now + ',' + now + ')');
							$(this).css('-ms-transform', 'scale(' + now + ',' + now + ')');
							$(this).css('transform', 'scale(' + now + ',' + now + ')');
						}
					}
				});
		}

		return this.each(function() {
			var menu_items = new Array();
			var active = settings.active;

			// Outer div must be positioned
			var outer_div = $(this).find('div');
			if (outer_div.css('position') == 'static') {
				outer_div.css('position', 'relative');
			}

			// Collect items
			var list_items = $(this).find('li a');
			list_items.each(function(idx, el) {
				// Put into array
				var id = $(el).attr('href');
				menu_items.push(id);

				// Position absolute
				$('div' + id).css('position', 'absolute');

				// Add index
				$(el).data('shiftynav-idx', idx);

				// Add click event
				$(el).click(function(e) {
					// No scrolling please
					e.preventDefault();

					// Which one is clicked?
					var index = $(this).data('shiftynav-idx');

					// No action is clicked is already active
					if (index == active) {
						return;
					}

					// Move left or right?
					if (index < active) {
						fadeOut($('div' + menu_items[active]));
						shiftIn($('div' + menu_items[index]));
					} else {
						shiftOut($('div' + menu_items[active]));
						fadeIn($('div' + menu_items[index]));
					}

					// Set new active id
					active = index;

					// Set active class to li
					resetActive(list_items);
					$(this).parent().addClass('shiftynav-active');
				});
			});

			// Hide everything except active one
			for (key in menu_items) {
				if (key != active) {
					$('div' + menu_items[key]).hide();
				}
			}
		});
	};
})(jQuery, window);

