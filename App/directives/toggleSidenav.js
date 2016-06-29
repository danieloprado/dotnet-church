((angular) => {
  'use strict';

  angular.module('icbApp')
    .directive('toggleSidenav', ['$mdSidenav', Directive]);

  function Directive($mdSidenav) {

    return {
      restrict: 'A',
      scope: false,
      link: ($scope, elem) => {
        elem.click(_ => $mdSidenav('left').toggle());
      }
    };

  }

})(angular);