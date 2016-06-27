((angular) => {
  'use strict';

  angular.module('app').directive('pageTitle', ['$compile', Directive]);

  function Directive($compile) {

    return {
      restrict: 'E',
      scope: false,
      link: ($scope, elem) => {
        $scope.$emit("change-page-title", $compile(`<span>${elem.html()}</span>`)($scope));
        elem.remove();
      }
    };

  }

})(angular);