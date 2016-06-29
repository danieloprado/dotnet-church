(function(angular) {
  'use strict';

  angular.module('icbApp')
    .directive('icbLogout', ['loginService', '$timeout', Logout]);

  function Logout(LoginService, $timeout) {

    return {
      restrict: 'A',
      scope: false,
      link: (scope, elem) => {
        angular.element(elem).on("click", function() {
          LoginService.logout();
        });
      }
    };

  }

})(angular);