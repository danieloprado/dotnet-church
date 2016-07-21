(function (angular) {
  'use strict';

  angular.module('appointment').controller("appointment.listCtrl", [
    'UI',
    'appointmentService',
    ListCtrl
  ]);

  function ListCtrl(UI, service) {
    this.query = { order: "name" };

    this.dataPromise = service.list().then(data => {
      this.events = data;
    });

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