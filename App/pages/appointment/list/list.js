(function (angular) {
  'use strict';

  angular.module('icbAppointment').controller("icbAppointment.listCtrl", [
    '$scope',
    'UI',
    'appointmentService',
    ListCtrl
  ]);

  function ListCtrl($scope, UI, service) {
    $scope.query = { order: "name" };

    $scope.dataPromise = service.list().then((data) => {
      $scope.events = data;
    });

    $scope.create = ($event) => {
      service.form($event).then((event) => {
        $scope.events.push(event);
      });
    };

    $scope.edit = ($event, event) => {
      service.form($event, event).then((newevent) => {
        angular.extend(event, newevent);
      });
    };

    $scope.delete = ($event, event, index) => {
      UI.Confirm(`Deseja apagar o evento **${event.name}**`, $event)
        .then(() => {
          $scope.events.splice(index, 1);
          service.remove(event.id).catch(() => {
            Toast(`Não foi possível apagar o evento **${event.name}**`);
            $scope.events.push(event);
          });
        });
    };
  }

})(angular);