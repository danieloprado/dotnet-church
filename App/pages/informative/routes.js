(function(angular) {
  'use strict';

  angular.module('icbInformative')
    .config([
      '$routeProvider',
      Routes
    ]);

  function Routes($routeProvider) {
    $routeProvider
      .when('/informative', {
        templateUrl: '/views/pages/informative/list/list.html',
        controller: 'icbInformative.listCtrl',
      })
      .when('/informative/create', {
        templateUrl: '/views/pages/informative/form/form.html',
        controller: 'icbInformative.formCtrl',
      })
      .when('/informative/:id', {
        templateUrl: '/views/pages/informative/form/form.html',
        controller: 'icbInformative.formCtrl',
      });
  }

})(angular);