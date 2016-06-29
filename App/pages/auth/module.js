(function(angular) {
  'use strict';

  angular.module('icbAuth', ['ngRoute'])
    .config(['$httpProvider', configInterceptor])
    .run(['$rootScope', '$location', 'Auth', 'LoginService', loginCheck]);


  function configInterceptor($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  }

  function loginCheck($rootScope, $location, Auth, LoginService) {
    $rootScope.$on("$routeChangeStart", ($event, next) => {
      if (!next.$$route || next.$$route.allowAnonymous || Auth.hasToken()) {
        return true;
      }

      next.$$route.resolve = next.$$route.resolve || {};
      next.$$route.resolve.login = () => LoginService.openLogin();
    });

    $rootScope.$on("$routeChangeSuccess", ($event, current) => {
      if (current.$$route.resolve && current.$$route.resolve.login) {
        delete current.$$route.resolve.login;
      }
    });

    $rootScope.$on("$routeChangeError", LoginService.logout);
  }

})(angular);