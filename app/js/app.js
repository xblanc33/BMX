'use strict';

var app=angular.module('appBMX',['ngRoute' , 'ngAnimate' , 'servicesBMX' , 'controllersBMX'])//, 'waypoint-module'])


app.config(['$routeProvider', function($rp){
	$rp.
		when('/club', {
			templateUrl: 'views/club.html',
			controller: 'clubController'
		}).
		when('/animation', {
			templateUrl: 'views/animation.html',
			controller: 'animationController'
		}).
		when('/compet', {
			templateUrl: 'views/compet.html',
			controller: 'competController'
		}).
		when('/admin', {
			templateUrl: 'views/admin.html',
			controller: 'adminController'
		}).
		otherwise({
			templateUrl:'views/home.html',
            controller: 'homeController'
		})
}])



