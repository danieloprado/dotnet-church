(function (angular) {
  'use strict';

  angular.module('app')
    .service('authService', ['$window', 'jwtHelper', AuthService]);

  function AuthService($window, jwtHelper) {
    var isValidToken = token => {
      try {
        return token && !jwtHelper.isTokenExpired(token);
      } catch (err) {
        return false;
      }
    };

    this.getToken = () => {
      return $window.localStorage.getItem("token");
    };

    this.setToken = (token) => {
      if (!isValidToken(token)) return false;
      $window.localStorage.setItem("token", token);
    };

    this.removeToken = () => {
      return $window.localStorage.removeItem("token");
    };

    this.hasToken = () => {
      return isValidToken($window.localStorage.getItem('token'));
    };

    this.getUser = () => {
      if (!this.hasToken()) return null;
      return jwtHelper.decodeToken(this.getToken());
    };
  }

})(angular);