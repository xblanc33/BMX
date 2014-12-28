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
			templateUrl: 'views/animation.html',
			controller: 'animationController'
		}).
		when('/compet', {
			templateUrl: 'views/compet.html',
			controller: 'competController'
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
            $($window).scrollTo($(el),1000,  {offset:-60} );//scrollIntoView();
        }
    }
}])

app.controller('animationController', ['$scope', '$window', function($scope, $window){
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
            $($window).scrollTo($(el),1000,  {offset:-60} );//scrollIntoView();
        }
    }
}])

app.controller('competController', ['$scope', '$window', function($scope, $window){
    $('body').scrollspy({ target: '#affix-nav', offset:70})


    //Calendar
    $scope.calendar = $("#calendar").calendar(
        {
            tmpl_path: "components/bootstrap-calendar/tmpls/",
            language: 'fr-FR',
            events_source: function () { return [
            	{
		           "id": 1,
		           "title": "Noel",
		           "url": "http://fr.wikipedia.org/wiki/No%C3%ABl",
		           "class": "event-important",
		           "start": 1419461700000, // Milliseconds
		           "end": 1419461940000 // Milliseconds
		       },
		       {
		           "id": 2,
		           "title": "Jours de l'an",
		           "url": "http://fr.wikipedia.org/wiki/Jour_de_l%27an",
		           "class": "event-important",
		           "start": 1420066801000, // Milliseconds
		           "end": 1420066801001 // Milliseconds
		       }
		    ]; }
        }
    ); 

    //Scrolling
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
            $($window).scrollTo($(el),1000,  {offset:-60} );//scrollIntoView();
        }
    }
}])


app.controller('homeController', ['$scope' , '$window', function($scope, $window) {
    $(function(){
        $('.carousel').carousel({
            interval: 3000
        });
    });
}])

