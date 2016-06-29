(function (angular) {
  'use strict';

  angular.module('icbApp')
    .config(['$routeProvider', '$locationProvider', configRoutes]);

  function configRoutes($routeProvider, $locationProvider) {

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

    $routeProvider
      .when('/', {
        templateUrl: '/views/pages/dashboard/home/home.html',
        controller: 'icbApp.homeCtrl'
      })
      .otherwise({
        redirectTo: "/"
      });

  }

})(angular);