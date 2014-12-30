'use strict';

/* Services */

var services = angular.module('servicesBMX', ['ngResource']);

services.factory('EventsService', ['$resource',
  function($resource){
    //return $resource('./../api/recipes/:id');

    return $resource('./events/:id', {}, {
      query: {method:'GET', isArray:true},
      get: {method:'GET', isArray:true},
      save: {method:'POST', isArray:true}
    });
  }
]);


services.factory('InscriptionsService', ['$resource',
  function($resource){
    //return $resource('./../api/recipes/:id');

    return $resource('./inscriptions/:id', {}, {
      query: {method:'GET', isArray:true},
      get: {method:'GET', isArray:true}
    });
  }
]);


