(function(angular) {
  'use strict';

  angular.module('icbAppointment')
    .config([
      '$routeProvider',
      Routes
    ]);

  function Routes($routeProvider) {
    $routeProvider
      .when('/agenda', {
        templateUrl: '/views/pages/appointment/list/list.html',
        controller: 'icbAppointment.listCtrl',
        controllerAs: "$ctrl"
      });
  }

})(angular);