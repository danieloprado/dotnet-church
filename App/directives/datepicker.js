(function (angular) {
  'use strict';

  angular.module("app").directive("datepicker", DatePicker);

  function DatePicker($compile, $mdpDatePicker) {

    return {
      restrict: "A",
      scope: {
        ngModel: "="
      },
      link: ($scope, elem, attrs) => {
        const icon = angular.element('<md-icon md-svg-icon="calendar" ng-click="showPicker($event)"></md-icon>');
        elem.before($compile(icon)($scope));

        $scope.showPicker = (targetEvent) => {
          if (elem.attr('disabled')) return;

          $mdpDatePicker($scope.ngModel, { targetEvent })
            .then((selectedDate) => $scope.ngModel = selectedDate);
        };

      }
    };

  }
  DatePicker.$inject = ['$compile', '$mdpDatePicker'];


})(angular);

