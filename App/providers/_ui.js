(angular => {
  'use strict';

  angular.module("icbApp").factory("UI", UI);

  function UI(Loader, Toast, Confirm) {
    return { Loader, Toast, Confirm };
  }
  UI.$inject = ['appLoader', 'appToast', 'appConfirm'];

})(angular);