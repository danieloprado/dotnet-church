(function(angular) {
  'use strict';

  angular.module('appointment')
    .config([
      '$routeProvider',
      Routes
    ]);

  function Routes($routeProvider) {
    $routeProvider
      .when('/agenda', {
        templateUrl: '/views/pages/appointment/list/list.html',
        controller: 'appointment.listCtrl',
        controllerAs: "$ctrl"
      }).when('/agenda/criar', {
        templateUrl: '/views/pages/appointment/form/form.html',
        controller: 'appointment.formCtrl',
        controllerAs: "$ctrl"
      });
  }

})(angular);