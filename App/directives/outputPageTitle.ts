((angular) => {
  'use strict';

  angular.module('app').directive('outputPageTitle', ['$compile', Directive]);

  function Directive($compile) {

    return {
      scope: false,
      link: ($scope, elem) => {
        $scope.$on("change-page-title", (info, data) => {
          elem.html(data);
        });
      }
    };

  }

})(angular);