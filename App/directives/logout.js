(function(angular) {
  'use strict';

  angular.module('app')
    .directive('appLogout', ['loginService', '$timeout', Logout]);

  function Logout(service, $timeout) {

    return {
      restrict: 'A',
      scope: false,
      link: (scope, elem) => {
        angular.element(elem).on("click", function() {
          service.logout().then(_ => service.openLogin());
        });
      }
    };

  }

})(angular);