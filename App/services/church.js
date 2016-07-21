(function(angular) {
  'use strict';

  angular.module('app').service('AuthChurchService', [
    'API',
    '$http',
    '$mdDialog',
    'authService',
    AuthChurchService
  ]);

  function AuthChurchService(API, $http, $mdDialog, Auth) {
    let endpoints = {
      list: API + '/church/',
      selectChurch: API + '/auth/select-church'
    };

    this.list = () => $http.get(endpoints.list)
      .then(function(response) {
        return response.data;
      });

    this.openSelection = () =>
      $mdDialog.show({
        templateUrl: 'views/auth/selectChurch.html',
        controller: 'appAuth.churchCtrl',
        clickOutsideToClose: false,
        escapeToClose: false,
      });

    this.select = (churchId) => $http.post(endpoints.selectChurch, {
      churchId
    });
  }

})(angular);