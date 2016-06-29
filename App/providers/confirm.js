(angular => {
  'use strict';

  angular.module('icbApp').factory('Confirm', Confirm);

  function Confirm($q, $mdDialog, $window) {

    return (title, message, $event) => {
      const confirm = $mdDialog.confirm()
        .htmlContent(`<h2 class="md-title md-dialog-title">${$window.marked(title)}</h2>${$window.marked(message)}`)
        .targetEvent($event)
        .ok('Sim')
        .cancel('Não');

      return $mdDialog.show(confirm).catch(_ => $q.reject({ isConfirm: true }));
    };

  }
  Confirm.$inject = ['$q', '$mdDialog', '$window'];


})(angular);

