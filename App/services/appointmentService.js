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

    const form = ($event, event) =>
      $mdDialog.show({
        templateUrl: 'views/event/form.html',
        controller: 'icbEvent.formCtrl',
        clickOutsideToClose: true,
        escapeToClose: true,
        targetEvent: $event,
        locals: {
          event: angular.copy(event || {})
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