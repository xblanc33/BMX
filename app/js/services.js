'use strict';

/* Services */

var services = angular.module('servicesBMX', ['ngResource']);

services.factory('CompetitionsService', ['$resource',
    function($resource) {

        function transformResponseDate(data, headersGetter) {
            var key, value;
            //console.log("transformResponsDate:"+JSON.stringify(data))
            //console.log("length:"+data.length)
            var angData = angular.fromJson(data)
            for (var i = angData.length - 1; i >= 0; i--) {
                angData[i]["date"] = new Date(angData[i]["date"])
                angData[i]["date_inscription"] = new Date(angData[i]["date_inscription"])
            };
            return angData;
        }

        return $resource('./competitions/:id', {}, {
            query: {
                method: 'GET',
                transformResponse: transformResponseDate,
                isArray: true,
                cache: false
            },
            get: {
                method: 'GET',
                isArray: true,
                cache: false
            },
            save: {
                method: 'POST',
                isArray: false,
                cache: false
            }
        });
    }
]);


services.factory('InscriptionsService', ['$resource',
    function($resource) {
        //return $resource('./../api/recipes/:id');

        return $resource('./inscriptions/:id', {}, {
            query: {
                method: 'GET',
                isArray: true,
                cache: false
            },
            get: {
                method: 'GET',
                isArray: true,
                cache: false
            }
            //save: {method:'POST', isArray:true}
        });
    }
]);
