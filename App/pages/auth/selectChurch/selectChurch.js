((angular) => {
  'use strict';

  angular.module('appInformative').controller("appAuth.churchCtrl", [
    '$scope',
    '$mdDialog',
    'Loader',
    'Toast',
    'AuthChurchService',
    FormCtrl
  ]);

  function FormCtrl($scope, $mdDialog, Loader, Toast, service) {

    Loader(service.list()).then(function(churches) {
      $scope.churches = churches;

      if (churches.length == 1) {
        $scope.select(churches[0]);
      }
    });

    $scope.select = (church) => {
      Loader(service.select(church.id)).then((response) => {
        $mdDialog.hide();
      });
    };

  }

})(angular);