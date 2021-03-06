'use strict';

var ctrls = angular.module('controllersBMX', ['servicesBMX' ]) //, 'waypoint-module'])


ctrls.controller('clubController', ['$scope', '$window', function($scope, $window) {
    $('body').scrollspy({
        target: '#affix-nav',
        offset: 70
    })

    $scope.scrollInto = function(elementId) {
        if (!elementId) $window.scrollTo(0, 0);
        //check if an element can be found with id attribute

        var el = document.getElementById(elementId);
        if (el) {
            //$window.scrollTo(0,el.offsetTop-60);//scrollIntoView();
            //$(el).parent().addClass("active");
            //$(el).parent().removeClass("hover");
            $($window).scrollTo($(el), 1000, {
                offset: -60
            }); //scrollIntoView();
        }
    }

    $window.twttr.widgets.load()
}])

ctrls.controller('animationController', ['$scope', '$window', function($scope, $window) {
    $('body').scrollspy({
        target: '#affix-nav',
        offset: 70
    })

    $scope.scrollInto = function(elementId) {
        if (!elementId) $window.scrollTo(0, 0);
        //check if an element can be found with id attribute

        var el = document.getElementById(elementId);
        if (el) {
            //$window.scrollTo(0,el.offsetTop-60);//scrollIntoView();
            //$(el).parent().addClass("active");
            //$(el).parent().removeClass("hover");
            $($window).scrollTo($(el), 1000, {
                offset: -60
            }); //scrollIntoView();
        }
    }
    $window.twttr.widgets.load()
}])

ctrls.controller('competController', ['$scope', '$window', 'CompetitionsService', 'InscriptionsService', function($scope, $window, $CompetitionsService, $InscriptionsService) {
    $('body').scrollspy({
        target: '#affix-nav',
        offset: 70
    })

    $scope.inscriptions_ouvertes = $CompetitionsService.query({
        'inscription': true
    })

    $scope.new_inscription = {}


    //Calendar
    $scope.calendar = $("#calendar").calendar({
        tmpl_path: "components/bootstrap-calendar/tmpls/",
        language: 'fr-FR',
        events_source: './competitions'
            //events_source: './events-calendar'
    });

    $scope.calendar.view('year');

    //Scrolling
    $scope.scrollInto = function(elementId) {
        if (!elementId) $window.scrollTo(0, 0);
        //check if an element can be found with id attribute

        var el = document.getElementById(elementId);
        if (el) {
            //$window.scrollTo(0,el.offsetTop-60);//scrollIntoView();
            //$(el).parent().addClass("active");
            //$(el).parent().removeClass("hover");
            $($window).scrollTo($(el), 1000, {
                offset: -60
            }); //scrollIntoView();
        }
    }

    //twitter
    $window.twttr.widgets.load()


    //modal inscription
    $scope.showModal = function() {
        $scope.new_inscription = {}
        $scope.new_inscription.success = false
        $scope.new_inscription.naissance = 1995

        $scope.new_inscription.categorie = function(nCat) {
            var _naissance = parseInt($scope.new_inscription.naissance)
            var _categorie = "inconnue"
            if (isNaN(_naissance)) return "Naissance mal saisie"
            else {
                if (_naissance <= 1985) _categorie =  "30+"
                else if (_naissance <= 1990) _categorie =  "25/29"
                else if (_naissance <= 1996) _categorie =  "19/24"
                else if (_naissance === 1997) _categorie =  "juniors 2"
                else if (_naissance === 1998) _categorie =  "juniors 1"
                else if (_naissance === 1999) _categorie =  "cadets 2"
                else if (_naissance === 2000) _categorie =  "cadets 1"
                else if (_naissance === 2001) _categorie =  "minimes 2"
                else if (_naissance === 2002) _categorie =  "minimes 1"
                else if (_naissance === 2003) _categorie =  "benjamin 2"
                else if (_naissance === 2004) _categorie =  "benjamin 1"
                else if (_naissance === 2005) _categorie =  "pupilles 2"
                else if (_naissance === 2006) _categorie =  "pupilles 1"
                else if (_naissance >= 2007) _categorie =  "8 ans et moins"
                else _categorie =  "Naissance mal saisie"
            }
        $scope.new_inscription._categorie = _categorie
            return _categorie
        }

        $scope.new_inscription.already = false

        $('#inscription-modal').modal('show')
    }

    $scope.hideModal = function() {
        $('#inscription-modal').modal('hide')
    }

    $scope.saveNewInscription = function() {
        if (!$scope.form_inscription.$valid) {
            $scope.form_inscription.$saved = false
        } else {
            //var copy_inscription = angular.copy($scope.new_inscription)
            $InscriptionsService.save($scope.new_inscription, function(response) {
                $scope.form_inscription.$saved = true
                if (response.result === 1) $scope.new_inscription.success = true
                else if (response.result === 2) $scope.new_inscription.already = true
            })
        }
        //$scope.hideModal()
    }

    $scope.showInscrits = function(event) {
        $scope.show_inscrits = []
        $InscriptionsService.query({
            event_id: event._id
        }, function(inscriptions) {
            $scope.show_inscrits = inscriptions
        })
        $('#liste-inscrits').modal('show')
    }
}])


ctrls.controller('homeController', ['$scope', function($scope) {
    $(function() {
        $('.carousel').carousel({
            interval: 3000
        });
    });
}])


ctrls.controller('adminController', ['$scope', 'CompetitionsService', 'InscriptionsService', function($scope, $CompetitionsService, $InscriptionsService) {
    $scope.competitions = []
    $scope.competition_modal = {}

    $CompetitionsService.query(function(query_competitions) {
        $scope.competitions = query_competitions
    });


    $scope.showNewCompetition = function() {
        $scope.competition_modal = {}
        $('#competition-modal').modal('show')

    }

    $scope.showCompetition = function(competition) {
        $scope.competition_modal = angular.copy(competition);


        $InscriptionsService.query({
            'event_id': $scope.competition_modal._id
        }, function(query_inscriptions) {
            $scope.competition_modal.inscriptions = query_inscriptions
            setCSVLink($scope.competition_modal.inscriptions)

        })

        $('#competition-modal').modal('show')
    }

    $scope.saveCompetition = function() {
        var copy_competition = angular.copy($scope.competition_modal)
        console.log("save called")
        copy_competition.class = "event-important"
        $CompetitionsService.save(copy_competition, function(save) {
            $scope.competition_modal.success = true
            console.log("save ok")
        })
    }

    $scope.removeCompetition = function(competition) {
        $CompetitionsService.remove(competition)
        $CompetitionsService.query(function(query_competitions) {
            $scope.competitions = query_competitions
        })
    }



    function inscription2CSV(inscriptions) {
        var result = "nom,prenom,licence\n"
        for (var i = inscriptions.length - 1; i >= 0; i--) {
            result += inscriptions[i].nom + "," + inscriptions[i].prenom + "," + inscriptions[i].email + "," + inscriptions[i].naissance + "\n"
        };
        return result
    }

    function setCSVLink(inscriptions) {
        var link = document.getElementById("csv_download");
        link.removeAttribute("href")
        link.removeAttribute("download")

        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var blob = new Blob([inscription2CSV(inscriptions)], {
                type: 'text/csv;charset=utf-8;'
            });
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", "inscriptions.csv");
            //link.style = "visibility:hidden";
        }

        if (navigator.msSaveBlob) { // IE 10+
            link.addEventListener("click", function(event) {
                var blob = new Blob([inscription2CSV(inscriptions)], {
                    "type": "text/csv;charset=utf-8;"
                });
                navigator.msSaveBlob(blob, "inscriptions.csv");
            }, false);
        }

        //document.body.appendChild(link);
    }
}])
