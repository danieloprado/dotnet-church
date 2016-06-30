(function(angular) {
  'use strict';

  angular.module('icbInformative').config(Routes);

  function Routes($routeProvider) {
    $routeProvider
      .when('/informativos', {
        templateUrl: '/views/pages/informative/list/list.html',
        controller: 'icbInformative.listCtrl',
        controllerAs: "$ctrl"
      })
      .when('/informativos/novo', {
        templateUrl: '/views/pages/informative/form/form.html',
        controller: 'icbInformative.formCtrl',
        controllerAs: "$ctrl"
      })
      .when('/informativos/:id/editar', {
        templateUrl: '/views/pages/informative/form/form.html',
        controller: 'icbInformative.formCtrl',
        controllerAs: "$ctrl"
      });
  }
  Routes.$inject = ['$routeProvider'];

})(angular);