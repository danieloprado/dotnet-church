(function (angular) {
  'use strict';

  angular.module('icbApp').factory('loginService', [
    'API',
    '$http',
    '$q',
    'componentPage',
    'authService',
    LoginService
  ]);

  function LoginService(API, $http, $q, componentPage, Auth) {
    let loginPromise = null;

    const openLogin = function () {
      if (!loginPromise) {
        loginPromise = componentPage("appLoginComponent");
        loginPromise.finally(_ => loginPromise = null);
      }

      return loginPromise;
    };

    const login = (credentials) => {
      return $http.post(`${API}/auth/login`, credentials);
    };

    const logout = () => {
      Auth.removeToken();
      return $q.resolve();
    };

    return { openLogin, login, logout };
  }

})(angular);