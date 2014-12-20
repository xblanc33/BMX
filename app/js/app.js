var app=angular.module('appBMX',['ngRoute' , 'ngAnimate', 'waypoint-module'])

app.controller('scrollSpyCtrl', function ($scope, $anchorScroll) {
	$scope.test="ok"
})

app.config(['$routeProvider', function($rp){
	$rp.
		when('/club', {
			templateUrl: 'views/club.html',
			controller: 'clubController'
		}).
		when('/entrainement', {
			templateUrl: 'views/entrainement.html'
		}).
		when('/compet', {
			templateUrl: 'views/compet.html',
			controller: 'clubController'
		}).
		otherwise({
			templateUrl:'views/home.html'
		})
}])

app.controller('clubController', ['$scope', '$window', function($scope, $window){
	//prevent default for a of affix
	$('#navPills a').click(function(event) {event.preventDefault()})
	$('#navPills a').bind('click', function(event) {scrollInto($(this).attr('href').substring(1))})
	setSections()

	//click -> scrollTo

	function scrollInto(elementId) {
		console.log("scollInto:"+elementId)
		if(!elementId) $window.scrollTo(0, 0);
		//check if an element can be found with id attribute
        
        var el = document.getElementById(elementId);
        if(el) {
            console.log(el.offsetTop);
            $window.scrollTo(0,el.offsetTop-10);//scrollIntoView();
        }
    }

    function setSections() {
    	$('.scrolled-section').each(function() {
    		$(this).waypoint(function() {
    			var sectionId = $(this).attr("id");

                // Remove 'current' class from all items
                $('#navPills li').removeClass('active');

                // Add 'current' class to current item
                $('#navPills li a[href="#' + sectionId + '"]').parent().addClass("active");

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
                $('#navPills li').removeClass('active');
                // add current to the last element
                $('#navPills li').last().addClass("active");
            }
        });
    }
}])


