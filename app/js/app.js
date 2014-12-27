var app=angular.module('appBMX',['ngRoute' , 'ngAnimate'])//, 'waypoint-module'])

/*app.controller('scrollSpyCtrl', function ($scope, $anchorScroll) {
	$scope.test="ok"
})*/

app.config(['$routeProvider', function($rp){
	$rp.
		when('/club', {
			templateUrl: 'views/club.html',
			controller: 'clubController'
		}).
		when('/animation', {
			templateUrl: 'views/animation.html'
		}).
		when('/compet', {
			templateUrl: 'views/compet.html'
		}).
		otherwise({
			templateUrl:'views/home.html',
            controller: 'homeController'
		})
}])

app.controller('clubController', ['$scope', '$window', function($scope, $window){
    $('body').scrollspy({ target: '#affix-nav', offset:70})

    $scope.scrollInto = function (elementId) {
		console.log("scollInto:"+elementId)
		if(!elementId) $window.scrollTo(0, 0);
		//check if an element can be found with id attribute
        
        var el = document.getElementById(elementId);
        if(el) {
            console.log(el.offsetTop);
            //$window.scrollTo(0,el.offsetTop-60);//scrollIntoView();
            //$(el).parent().addClass("active");
            //$(el).parent().removeClass("hover");
            $($window).scrollTo($(el),800);//scrollIntoView();
        }
    }
}])


app.controller('homeController', ['$scope' , '$window', function($scope, $window) {
    $(function(){
        $('.carousel').carousel({
            interval: 2000
        });
    });
}])

