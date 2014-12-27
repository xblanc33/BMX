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
    $('body').scrollspy({ target: '#affix-nav'})
}])


app.controller('homeController', ['$scope' , '$window', function($scope, $window) {
    $(function(){
        $('.carousel').carousel({
            interval: 2000
        });
    });
}])

