((angular) => {
  'use strict';

  angular.module('appointment').controller("appointment.formCtrl", [
    '$filter',
    '$location',
    '$routeParams',
    'moment',
    'UI',
    'appointmentService',
    FormCtrl
  ]);

  function FormCtrl($filter, $location, $routeParams, moment, UI, service) {
    const model = this.model = {};
    this.editing = $routeParams.id;

    if ($routeParams.id) {
      service.find($routeParams.id).then(data => {
        angular.extend(model, data);

        model.beginTime = moment(data.beginDate).format('HH:mm');
        model.endTime = moment(data.endDate).format('HH:mm');
      });
    }

    const toDate = (date, hour) => {
      const parts = hour.split(":");

      date.setHours(parts[0]);
      date.setMinutes(parts[1]);

      return date;
    };

    this.submit = () => {
      var data = angular.copy(model);

      data.beginDate = toDate(data.beginDate, data.beginTime);
      data.endDate = toDate(data.endDate, data.endTime);

      UI.Loader(service.save(data)).then((event) => {
        UI.Toast("Salvo");
        $location.path('/agenda');
      }).catch(UI.Toast.httpHandler);
    };

  }

})(angular);