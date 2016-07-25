((angular) => {
  'use strict';

  angular.module('app')
    .factory('appointmentService', [
      'API',
      '$http',
      '$mdDialog',
      'parseDates',
      AppointmentService
    ]);

  function AppointmentService(API, $http, $mdDialog, parseDates) {
    const list = () => {
      return $http.get(`${API}/appointment`).then(response => response.data.map(item => parseDates(item)));
    };

    const find = (id) => {
      return $http.get(`${API}/appointment/${id}`).then(response => parseDates(response.data));
    };

    const save = (model) => {
      return $http.post(`${API}/appointment`, model).then(response => parseDates(response.data));
    };

    const remove = (id) => {
      return $http.post(endpoints.remove, { id });
    };

    return { list, find, save, remove };
  }

})(angular);