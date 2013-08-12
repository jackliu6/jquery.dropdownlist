;
(function($){

	var Dropdownlist = function(elem, options){

			this.elem = elem;

			this.options = options;

			this.init();

		},
		fn = Dropdownlist.prototype = {
			init : function(){

				var self = this,
					$elem = $(this.elem),
					$container = $("<div>"),
					$text = $("<span>"),
					$ico = $("<i>"),
					$view = $("<div>"),
					$list = $("<div>"),
					maxHeight = this.options.maxHeight || 150;
					ow = $elem.width() || $elem.get(0).offsetWidth;

				ow = ow < 150 ? 150 : ow;

				$view
					.append($text)
					.append($ico)
					.attr({
						'class' : 'dl-view'
					})
					.css({
						width : ow
					})
					.on('click', function(){
						$('.dl-list').addClass('hide');
						$(this).parent().find('.dl-list').toggleClass('hide');
						
						$(this).parent().find('.dl-list').get(0).offsetHeight > maxHeight && !$(this).hasClass('hide') && (function(){
							if($(this).next().hasClass('sp-container')) return;
							//join the scrollpane
							if($([]).scrollpane){ 
								$list.scrollpane();
							}
						})();
						return false;
					})
					;

				$list
					.attr({
						'class' : 'dl-list hide'
					})
					.css({
						width : ow,
						overflow : 'hidden',
						'overflow-y' : 'auto'
					})
					.on('click', 'a', function(){
						var c = $(this).parents('.dl-container');
							c.find('select').val($(this).attr('data-value'));
							c.find('.dl-view').find('span').text($(this).text());
					})
					;

				$container
					.attr({
						'class' : 'dl-container'
					})
					.css({
						width : ow
					})
					.append($view)
					.append($list)
					;

				$elem
					.css({
						display : 'none'
					})
					.after($container)
					;

				$container.prepend($elem);

				self.dataset();				

				$(document).on('click.dropdownlist.api', function(){
					$('.dl-list').addClass('hide');
				})
			},
			dataset : function(){
				var self = this,
					$elem = $(this.elem),
					$text = $elem.parent().find('.dl-view').find('span'),
					$list = $elem.parent().find('.dl-list'),					
					maxHeight = this.options.maxHeight || 150;

				$text 
					.text($elem.find('option:selected').text())
					;

				for(var i = 0, len = $elem.find('option').length; i < len; i++){
					var $a = $("<a>");

						$a
							.attr({
								href : "javascript:;",
								'data-value' : $elem.find('option').eq(i).val()
							})
							.html($elem.find('option').eq(i).text())
							;

					$list.append($a);
				}

				(maxHeight < ($list.get(0).offsetHeight || $list.height())) && $list.css({height : maxHeight});
			}
		};

	$.fn.dropdownlist = function(option){
		return this.each(function(){
			var $this = $(this),
				data = $this.data('dropdownlist'),
				options = $.extend({}, $.fn.dropdownlist.defaults, typeof option === 'object' && option);

			if(!data){
				$this.data('dropdownlist', (data = new Dropdownlist(this, options)));
			}

			if(typeof option === 'string'){
				typeof data[option] === 'function' && data[option]();
			}
		});
	}

	$.fn.dropdownlist.defaults = {
		maxHeight : 150
	};

})(window.jQuery);