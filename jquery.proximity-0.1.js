/*

 
 */
//Requires jQuery 1.4+
 (function($){
	
 	var defaults = {
		demo: false,
		color: "red",
		vOffsetPerc: .5,
		tarTopOffset: 200,
		tarBottomOffset: 200,
		callback: function(e){
			log('add a callback function to add some power to this plugin');
		}
	};
	var $elements = [];
	var $flag = false;
	var $i; //counter
	var $tar;//reusable slave
 	var methods = {
		init: function(){
			//bind the scroll bit
			if (!$flag) {
				$flag = true;
				$(window).scroll(function (e){
					$this = $(this);
					//look at things in elems and decide what to do.
					for ($i in $elements) {
						var tar = $elements[$i].id;
						
						//no callback will be called until scrollTop() + (window.height * vOffsetPerc)
						//is between ((element.top + (element.height * .5)) - tarTopOffset) and ((element.top + (element.height * .5)) + tarBottomOffset) 
						
						var testPoint = $this.scrollTop() + ($this.height() * $elements[$i].vOffsetPerc);
						var topBound = ((tar.offset().top + (tar.height() * .5)) - $elements[$i].tarTopOffset);
						var bottomBound =  ((tar.offset().top + (tar.height() * .5)) + $elements[$i].tarBottomOffset) ;
						
						//height of active area is
						var dist = bottomBound - topBound;
						
						// THIS WORKS BUT COULD BE CLEANED UP A WHOLE LOT
						var val;
						if (testPoint > topBound && testPoint < bottomBound) {
							if (testPoint < topBound + (dist * .5)) {
								val = ((topBound + (dist * .5)) - testPoint) / (dist * .5);
							}else {
								val = -((testPoint - (bottomBound - (dist * .5))) / (dist*.5));
							}
							$elements[$i].callback(tar, {"perc": val});
						}else{
							//check to see if its above, or below
							if(testPoint < topBound){
								val = 1;
							}else if(testPoint > bottomBound){
								val = -1;
							}
							$elements[$i].callback(tar, {"perc": val});
							
						}
					}
				});
				$(window).resize(function(e){
					for ($i in $elements) {
						if ($elements[$i].demo) {
							$tar = $elements[$i].id;
							$($i + '-hr').offset({top:$(window).height() * $elements[$i].vOffsetPerc});
						}	
					}
					//console.log("resize");
				});
				
			}
		},
		add: function( options ){
			
			
			return this.each(function(){
				$.extend(defaults, options);
				
				//add id to options;
				options.id = $(this);
				options.index = $elements.length;
				$elements.push(options);
				
				console.log("options.demo = " + options.demo);
				//add a div to use as temporary hr
				if (options.demo) {
					console.log("this is a demo");
					
					
					$tar = $('<div id="'+ (options.index) +'-hr">vOffsetPerc</div>');
					$("body").append($tar);
					$tar.css({
						"position": "fixed",
						"width": "100%",
						"border-top-style": "solid",
						"border-top-width": "1px",
						"border-top-color": options.color
					});
					$tar.offset({top:$(window).height() * options.vOffsetPerc});
				}
				
				
			});
		}
		
	};
	$.fn.proximity = function(method){
		//Jquery recommended implementation for plugin development.
		if (methods[method]) {
			//if the method you wanted isn't null
			//.apply() works to run a method in the scope of another object
			return methods[method].apply(this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			//if there is no method, jquery see's "method" as the jQuery object
			//defined by the selector used. and attempts to run the init method
			return methods.init.apply( this, arguments );
		} else {
			//if neither of these conditions are met, the method does not work, and a log
			//is dispatched through the $.error method with a short message.
			$.error( 'Method ' +  method + ' does not exist on jQuery.proximity' );
		} 
	}
 })(jQuery);
