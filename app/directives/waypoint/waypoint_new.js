angular.module('waypoint-module',[]).directive('waypoint', function(){
	

	
	// Runs during compile
	return {
		name: 'waypoint',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		//controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		templateUrl: 'directives/waypoint/waypoint-template.html',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {

			$scope.scrolled= $(e).find('.scrolled-section').attrs("id")
			//class active on the first
			//$(iElm).find('li:first-child').addClass('active') 
			//link affix to window-scroll
			//setSections(iElm)


			$scope.scollInto = function (elementId) {
				console.log("scollInto:"+elementId)
				if(!elementId) window.scrollTo(0, 0);
				//check if an element can be found with id attribute
		        
		        var el = document.getElementById(elementId);
		        if(el) {
		            console.log(el.offsetTop);
		            window.scrollTo(0,el.offsetTop-10);//scrollIntoView();
		        }
		    }

			function setSections(e) {
				var nav= $(e).find('ul:first-child')
		    	$(e).find('.scrolled-section').each(function() {
		    		$(this).waypoint(function() {
		    			var sectionId = $(this).attr("id");

		                // Remove 'current' class from all items
		                $(nav).find('li').removeClass('active');

		                // Add 'current' class to current item
		                $(nav).find(' li a[href="#' + sectionId + '"]').parent().addClass("active");

		            }, {
		                    offset: 130
		            });
		        });

		        $(window).on('scroll', function() {
		        	var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
		            var windowHeight = $(window).height(); // get the height of the window
		            var docHeight = $(document).height();
		            // If we have reach the bottom of the page
		            if (windowPos + windowHeight === docHeight) {
		                // Remove 'current' class from all items
		                $(nav).find('li').removeClass('active');
		                // add current to the last element
		                $(nav).find('li').last().addClass("active");
		            }
		        });
		    }
		}
	};
});