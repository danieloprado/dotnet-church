((angular) => {
  'use strict';

  angular.module('appInformative').controller("appInformative.formCtrl", [
    '$routeParams',
    '$location',
    'UI',
    'informativeService',
    FormCtrl
  ]);

  function FormCtrl($routeParams, $location, UI, informativeService) {
    this.model = {};
    this.editing = false;

    if ($routeParams.id) {
      UI.Loader(informativeService.get($routeParams.id)).then(informative => {
        this.model = informative;
        this.editing = true;
      });
    }

    this.getFullMarkdown = () => {
      let title = this.model.title ? "# " + this.model.title : "";
      return `${title}\n\n\n${this.model.message || ""}`;
    };

    this.submit = () => {
      UI.Loader(informativeService.save(this.model)).then((informative) => {
        UI.Toast("Salvo");
        $location.path('/informativos');
      });
    };

  }

})(angular);