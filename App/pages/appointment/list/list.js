(function (angular) {
  'use strict';

  angular.module('icbAppointment').controller("icbAppointment.listCtrl", [
    'UI',
    'appointmentService',
    ListCtrl
  ]);

  function ListCtrl(UI, service) {
    this.query = { order: "name" };

    this.dataPromise = service.list().then((data) => {
      this.events = data;
    });


    this.create = ($event) => {
      service.form($event).then((event) => {
        this.events.push(event);
      });
    };
    this.create();


    this.edit = ($event, event) => {
      service.form($event, event).then((newevent) => {
        angular.extend(event, newevent);
      });
    };

    this.delete = ($event, event, index) => {
      UI.Confirm(`Deseja apagar o evento **${event.name}**`, $event)
        .then(() => {
          this.events.splice(index, 1);
          service.remove(event.id).catch(() => {
            Toast(`Não foi possível apagar o evento **${event.name}**`);
            this.events.push(event);
          });
        });
    };
  }

})(angular);