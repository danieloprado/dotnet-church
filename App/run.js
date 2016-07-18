(function (angular) {
  'use strict';

  angular.module('icbApp')
    .run(['$rootScope', 'authService', userInfo])
    .run(['$rootScope', 'authService', 'loginService', RunLoginCheck]);


  function userInfo($rootScope, authService) {
    $rootScope.user = authService.getUser() || {};
    $rootScope.$on("user-token-changed", () => {
      $rootScope.user = authService.getUser() || {};
      console.log($rootScope.user);
    });
  }

  function RunLoginCheck($rootScope, authService, loginService) {
    $rootScope.$on("$routeChangeStart", ($event, next) => {
      if (!next.$$route || next.$$route.allowAnonymous || authService.hasToken()) {
        return true;
      }

      next.$$route.resolve = next.$$route.resolve || {};
      next.$$route.resolve.login = () => loginService.openLogin();
    });

    $rootScope.$on("$routeChangeSuccess", ($event, current) => {
      if (current.$$route && current.$$route.resolve && current.$$route.resolve.login) {
        delete current.$$route.resolve.login;
      }
    });

    $rootScope.$on("$routeChangeError", loginService.logout);
  }

})(angular);