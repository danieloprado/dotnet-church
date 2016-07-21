(function (angular) {
  'use strict';

  angular.module('appInformative')
    .controller("appInformative.listCtrl", [
      '$scope',
      'UI',
      'informativeService',
      ListCtrl
    ]);

  function ListCtrl($scope, UI, informativeService) {
    this.selected = [];
    this.query = { order: "-date" };

    this.dataPromise = informativeService.list().then((data) => {
      this.informatives = data;
    });

    this.delete = ($event, informative, index) => {
      UI.Confirm(`Deseja apagar o informativo **${informative.title}**`, $event).then(() => {
        this.informatives.splice(index, 1);
        informativeService.remove(informative.id).catch(() => {
          UI.Toast(`Não foi possível apagar o informativo **${informative.title}**`);
          this.informatives.push(informative);
        });
      });
    };
  }

})(angular);