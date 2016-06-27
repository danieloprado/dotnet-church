module Directives {

    interface IScope extends angular.IScope {
        ngModel: any;
        showPicker(targetEvent: any): void;
    }

    class DatePicker {
        static $inject = ['$compile', '$mdpDatePicker'];

        restrict = "A";
        scope = {
            ngModel: "="
        };

        constructor(
            private $compile: angular.ICompileService,
            private $mdpDatePicker: any) {
        }

        link = ($scope: IScope, elem, attrs) => {
            const icon = angular.element('<md-icon md-svg-icon="calendar" ng-click="showPicker($event)"></md-icon>');
            elem.before(this.$compile(icon)($scope));

            $scope.showPicker = (targetEvent: any) => {
                if (elem.attr('disabled')) return;

                this.$mdpDatePicker($scope.ngModel, { targetEvent }).then((selectedDate) => {
                    $scope.ngModel = selectedDate;
                });
            };
        };
    }

    angular.module("app").directive("datepicker", Helpers.directiveFacotry(DatePicker));

}