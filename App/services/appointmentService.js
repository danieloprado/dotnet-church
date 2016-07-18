((angular) => {
  'use strict';

  angular.module('icbApp')
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

    const form = ($event, appointment) =>
      $mdDialog.show({
        templateUrl: '/views/pages/appointment/form/form.html',
        controller: 'icbAppointment.formCtrl',
        controllerAs: "$ctrl",
        clickOutsideToClose: true,
        escapeToClose: true,
        targetEvent: $event,
        locals: {
          appointment: angular.copy(appointment || {})
        }
      });

    const save = (model) => {
      return $http.post(`${API}/appointment`, model).then((response) => {
        const event = response.data;

        event.dates.forEach(date => {
          date.beginDate = new Date(date.beginDate);
          date.endDate = new Date(date.endDate);
        });

        return event;
      });
    };

    const remove = (id) => {
      return $http.post(endpoints.remove, {
        id
      });
    };

    return {
      list: list,
      form: form,
      save: save,
      remove: remove
    };
  }

})(angular);