(angular => {
  'use strict';

  angular.module('app').directive('appLogout', ['LoginService', Directive]);

  function Directive(LoginService) {
    return {
      restrict: 'A',
      scope: false,
      link: (scope, elem) => {
        elem.on("click", () => {
          LoginService.logout().then(_ => {
            LoginService.openLogin();
          });
        });
      }
    };
  }

})(angular);