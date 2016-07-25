(function (angular) {
  'use strict';

  angular.module("app").factory("authInterceptor", [
    "$q",
    "$injector",
    "$rootScope",
    "authService",
    AuthInterceptor
  ]);

  function AuthInterceptor($q, $injector, $rootScope, authService) {

    const resolveLogin = (response) => {
      const loginService = $injector.get("loginService");
      const Loader = $injector.get("Loader");

      Loader.disable();
      return loginService.openLogin().then(_ => {
        Loader.enable();
        return $injector.get("$http")(response.config);
      }).catch(err => {
        throw err || { status: 401 };
      });
    };

    return {
      request: function (config) {
        if (authService.hasToken()) {
          config.headers.Authorization = 'Bearer ' + authService.getToken();
        }

        return config;
      },

      response: function (response) {
        const token = response.headers('X-Token');
        if (token && token !== authService.getToken()) {
          authService.setToken(token);
          $rootScope.$broadcast("user-token-changed");
        }

        return response;
      },

      responseError: function (response) {
        if (response.status == 401) {
          const deferred = $q.defer();
          resolveLogin(response, deferred);
          return deferred.promise;
        }

        return $q.reject(response);
      }

    };
  }
})(angular);