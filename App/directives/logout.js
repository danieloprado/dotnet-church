(function(angular) {
  'use strict';

  angular.module('icbApp')
    .directive('icbLogout', ['loginService', '$timeout', Logout]);

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