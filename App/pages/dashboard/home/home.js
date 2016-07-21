(function(angular) {
  'use strict';

  angular.module('app')
    .controller("app.homeCtrl", [
      '$scope',
      HomeCtrl
    ]);

  function HomeCtrl($scope) {
    $scope.$emit("change-page-title", "Dashboard");
  }

})(angular);