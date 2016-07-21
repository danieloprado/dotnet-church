(angular => {
  'use strict';

  angular.module('app').factory('Confirm', Confirm);

  function Confirm($q, $mdDialog, $window) {

    return (message, $event) => {
      const confirm = $mdDialog.confirm()
        .title("Confirmar")
        .htmlContent(`${$window.marked(message)}`)
        .targetEvent($event)
        .ok('Sim')
        .cancel('Não');

      return $mdDialog.show(confirm).catch(_ => $q.reject({ isConfirm: true }));
    };

  }
  Confirm.$inject = ['$q', '$mdDialog', '$window'];


})(angular);

