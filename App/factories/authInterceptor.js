(function (angular) {
  'use strict';

  angular.module("icbApp").factory("authInterceptor", [
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
      return loginService.openLogin().then(() => {
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
        var token = response.headers('X-Token');
        if (token && token !== authService.getToken()) {
          authService.setToken(token);
          $rootScope.$broadcast("user-token-changed");
        }

        return response;
      },
      responseError: function (response) {
        const deferred = $q.defer();
        const toast = $injector.get("Toast");
        const componentPage = $injector.get("componentPage");

        switch (response.status) {
          case 400:
            toast("Dados inválidos");
            deferred.reject(response);
            break;
          case 401:
            resolveLogin(response, deferred);
            break;
          case 403:
            toast("Você não tem permissão de acesso");
            deferred.reject(response);
            break;
          case 404:
            toast("Não foi possivel encontrar...");
            deferred.reject(response);
            break;
          case 500:
            componentPage("appErrorPage", { html: response.data });
            toast.genericError(response);
            deferred.reject(response);
            break;
          default:
            deferred.reject(response);
        }

        return deferred.promise;
      }
    };
  }
})(angular);