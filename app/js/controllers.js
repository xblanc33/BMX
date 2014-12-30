'use strict';

var ctrls=angular.module('controllersBMX',['servicesBMX'])//, 'waypoint-module'])


ctrls.controller('clubController', ['$scope', '$window', function($scope, $window){
    $('body').scrollspy({ target: '#affix-nav', offset:70})

    $scope.scrollInto = function (elementId) {
		if(!elementId) $window.scrollTo(0, 0);
		//check if an element can be found with id attribute
        
        var el = document.getElementById(elementId);
        if(el) {
            //$window.scrollTo(0,el.offsetTop-60);//scrollIntoView();
            //$(el).parent().addClass("active");
            //$(el).parent().removeClass("hover");
            $($window).scrollTo($(el),1000,  {offset:-60} );//scrollIntoView();
        }
    }
}])

ctrls.controller('animationController', ['$scope', '$window', function($scope, $window){
    $('body').scrollspy({ target: '#affix-nav', offset:70})

    $scope.scrollInto = function (elementId) {
		console.log("scollInto:"+elementId)
		if(!elementId) $window.scrollTo(0, 0);
		//check if an element can be found with id attribute
        
        var el = document.getElementById(elementId);
        if(el) {
            //$window.scrollTo(0,el.offsetTop-60);//scrollIntoView();
            //$(el).parent().addClass("active");
            //$(el).parent().removeClass("hover");
            $($window).scrollTo($(el),1000,  {offset:-60} );//scrollIntoView();
        }
    }
}])

ctrls.controller('competController', ['$scope', '$window', 'EventsService' , function($scope, $window, $EventsService){
    $('body').scrollspy({ target: '#affix-nav', offset:70})


    //Calendar
    $scope.calendar = $("#calendar").calendar(
        {
            tmpl_path: "components/bootstrap-calendar/tmpls/",
            language: 'fr-FR',
            events_source: './events-calendar'
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


ctrls.controller('homeController', ['$scope' , function($scope) {
    $(function(){
        $('.carousel').carousel({
            interval: 3000
        });
    });
}])


ctrls.controller('adminController', ['$scope' , 'EventsService', function($scope , $EventsService) {
    $scope.events=[]
    $scope.events = $EventsService.query();

    $scope.new_event= {}

    $scope.showModal = function () {
        $('#test-modal').modal('show')
    }

    $scope.hideModal = function () {
        $('#test-modal').modal('hide')
    }

    $scope.saveNewEvent = function() {
        $scope.new_event["start"] = $scope.new_event["start"].getTime()
        $scope.new_event["end"] = $scope.new_event["end"].getTime()
        $scope.new_event.class= "event-important"
        $scope.new_event.id= $scope.events.length
        $EventsService.save($scope.new_event)
        $scope.events.push($scope.new_event)

        $scope.new_event={}

        $scope.hideModal()
    }

    $scope.remove = function (event) {
        $EventsService.remove(event)
        $scope.events= $EventsService.query()
    }
}])