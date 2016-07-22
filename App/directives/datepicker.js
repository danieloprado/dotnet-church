(function (angular) {
  'use strict';

  angular.module("app").directive("datepicker", DatePicker);

  function DatePicker($compile, $mdpDatePicker) {

    return {
      restric: 'A',
      scope: {
        ngModel: "="
      },
      priority: 1,
      replace: false,
      terminal: true,
      compile: (tElement, tAttrs) => {
        console.log(tAttrs);
        tElement.removeAttr('datepicker');
        tElement.before('<md-icon md-svg-icon="calendar" ng-click="showPicker($event)"></md-icon>');
        tAttrs.$set('ui-date-mask', '');

        return {
          pre: ($scope, iElement) => {
            $scope.showPicker = (targetEvent) => {
              if (iElement.attr('disabled')) return;

              $mdpDatePicker($scope.ngModel, { targetEvent })
                .then(selectedDate => $scope.ngModel = selectedDate);
            };

            $compile(iElement)($scope);
          }
        };
      }
    };

  }
  DatePicker.$inject = ['$compile', '$mdpDatePicker'];


})(angular);

