(function(angular) {
  'use strict';

  angular.module('appInformative').config(Routes);

  function Routes($routeProvider) {
    $routeProvider
      .when('/informativos', {
        templateUrl: '/views/pages/informative/list/list.html',
        controller: 'appInformative.listCtrl',
        controllerAs: "$ctrl"
      })
      .when('/informativos/novo', {
        templateUrl: '/views/pages/informative/form/form.html',
        controller: 'appInformative.formCtrl',
        controllerAs: "$ctrl"
      })
      .when('/informativos/:id/editar', {
        templateUrl: '/views/pages/informative/form/form.html',
        controller: 'appInformative.formCtrl',
        controllerAs: "$ctrl"
      });
  }
  Routes.$inject = ['$routeProvider'];

})(angular);