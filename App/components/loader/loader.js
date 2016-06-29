((angular) => {
  'use strict';

  angular.module('icbApp').component('appLoader', {
    template: `
      <div ng-if="!$ctrl.hide">
        <md-progress-circular
              class="md-accent"
              md-diameter="120"
              md-mode="indeterminate" />
        </md-progress-circular>
      </div>`,
    controller: Loader
  });

  function Loader($scope) {
    this.hide = true;

    $scope.$on('loading-started', () => this.hide = false);
    $scope.$on('loading-finished', () => this.hide = true);
  }
  Loader.$inject = ["$scope"];

})(angular);