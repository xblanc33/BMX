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

ctrls.controller('competController', ['$scope', '$window', 'EventsService', 'InscriptionsService' , function($scope, $window, $EventsService, $InscriptionsService){
    $('body').scrollspy({ target: '#affix-nav', offset:70})

    $scope.inscriptions_ouvertes= $EventsService.query({'inscription':true})

    $scope.new_inscription={}


    //Calendar
    $scope.calendar = $("#calendar").calendar(
        {
            tmpl_path: "components/bootstrap-calendar/tmpls/",
            language: 'fr-FR',
            events_source: './events'
            //events_source: './events-calendar'
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

    //modal inscription
    $scope.showModal = function () {
        $('#inscription-modal').modal('show')
    }

    $scope.hideModal = function () {
        $('#inscription-modal').modal('hide')
    }

    $scope.saveNewInscription = function() {
        $InscriptionsService.save($scope.new_inscription)

        $scope.new_inscription={}

        $scope.hideModal()
    }
}])


ctrls.controller('homeController', ['$scope' , function($scope) {
    $(function(){
        $('.carousel').carousel({
            interval: 3000
        });
    });
}])


ctrls.controller('adminController', ['$scope' , 'EventsService', 'InscriptionsService' , function($scope , $EventsService, $InscriptionsService) {
    $scope.events=[]
    $scope.events = $EventsService.query();

    $scope.new_event= {}

    //bootstrap pop
    $(function () {
        $('[data-toggle="popover"]').popover()
    })

    $scope.showModal = function () {
        $('#new-event-modal').modal('show')
    }

    $scope.hideModal = function () {
        $('#new-event-modal').modal('hide')
    }

    $scope.saveNewEvent = function() {
        $scope.new_event["start"] = $scope.new_event["start"].getTime()
        $scope.new_event["end"] = $scope.new_event["end"].getTime()
        $scope.new_event.class= "event-important"
        //$scope.new_event.id= $scope.events.length
        $EventsService.save($scope.new_event)
        $scope.events.push($scope.new_event)

        $scope.new_event={}

        $scope.hideModal()
    }

    $scope.remove = function (event) {
        $EventsService.remove(event)
        $scope.events= $EventsService.query()
    }

    $scope.show = function (event) {
        $scope.show_event= event;

        $scope.show_event.inscriptions= $InscriptionsService.query({'event_id': event._id} , function(inscriptions) {
            setCSVLink(inscriptions)
        })

        

        $('#existing-event-modal').modal('show')

    }

    function inscription2CSV(inscriptions) {
        var result="nom,prenom,licence\n"
        for (var i = inscriptions.length - 1; i >= 0; i--) {
            result+=inscriptions[i].nom+","+inscriptions[i].prenom+","+inscriptions[i].licence+"\n"
        };
        console.log(result)
        return result
    }

    function setCSVLink(inscriptions) {
        var link = document.getElementById("csv_download");
        link.removeAttribute("href")
        link.removeAttribute("download")

        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var blob = new Blob([inscription2CSV(inscriptions)], { type: 'text/csv;charset=utf-8;' });
            var url = URL.createObjectURL(blob);            
            link.setAttribute("href", url);
            link.setAttribute("download", "inscriptions.csv");
            //link.style = "visibility:hidden";
        }

        if (navigator.msSaveBlob) { // IE 10+
           link.addEventListener("click", function (event) {
             var blob = new Blob([inscription2CSV(inscriptions)], {
               "type": "text/csv;charset=utf-8;"
             });
           navigator.msSaveBlob(blob, "inscriptions.csv");
          }, false);
        }

        //document.body.appendChild(link);
    }
}])