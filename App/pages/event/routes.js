(function(angular) {
  'use strict';

  angular.module('icbEvent')
    .config([
      '$routeProvider',
      Routes
    ]);

  function Routes($routeProvider) {
    $routeProvider
      .when('/event', {
        templateUrl: '/views/pages/event/list/list.html',
        controller: 'icbEvent.listCtrl',
      });
  }

})(angular);