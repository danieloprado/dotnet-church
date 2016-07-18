((angular) => {
  'use strict';

  angular.module('icbAppointment').controller("icbAppointment.formCtrl", [
    '$filter',
    '$mdDialog',
    'lodash',
    'UI',
    'appointment',
    'appointmentService',
    FormCtrl
  ]);

  function FormCtrl($filter, $mdDialog, lodash, UI, appointment, service) {
    console.log('here');

    const model = this.model = appointment || {};
    model.dates = model.dates || [{}];
    this.editing = !lodash.isEmpty(this.model);

    model.dates.forEach(item => {
      if (lodash.isEmpty(item)) return;

      item.begin = $filter('date')(item.beginDate, 'HH:mm');
      item.end = $filter('date')(item.endDate, 'HH:mm');

      item.beginDate.setHours(0);
      item.beginDate.setMinutes(0);
      item.date = item.beginDate;
    });

    this.addDate = () => {
      model.dates.push({});
    };

    this.removeDate = (date) => {
      if (model.dates.length == 1) return;
      lodash.remove(model.dates, x => x == date);
    };

    this.submit = () => {
      var data = angular.copy(model);

      data.dates = model.dates.map(dateInfo => {
        const toDate = (hour) => {
          let date = angular.copy(dateInfo.date);
          const parts = hour.split(":");

          date.setHours(parts[0]);
          date.setMinutes(parts[1]);

          return date;
        };

        return {
          beginDate: toDate(dateInfo.begin),
          endDate: toDate(dateInfo.end)
        };
      });

      UI.Loader(service.save(data)).then((event) => {
        UI.Toast("Salvo");
        $mdDialog.hide(event);
        this.model = {};
      }).catch((res) => Toast.httpHandler(res));
    };

  }

})(angular);