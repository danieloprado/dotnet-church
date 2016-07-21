(function(angular) {
  'use strict';

  angular.module('appChurch')
    .config([
      '$routeProvider',
      Routes
    ]);

  function Routes($routeProvider) {
    $routeProvider
      .when('/church', {
        templateUrl: 'views/church/edit.html',
        controller: 'church.editCtrl',
      });
  }

})(angular);