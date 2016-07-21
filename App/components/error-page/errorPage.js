((angular) => {
  'use strict';

  angular.module('app').component('appErrorPage', {
    template: `
    <div class="error-page">
      <md-button class="md-fab md-fab-top-right" ng-click="$ctrl.complete()"><md-icon md-svg-icon="close" /></md-button>
      <iframe id="error-iframe">nothing</iframe>
    </div>`,
    controller: ErrorPage,
    bindings: {
      complete: "&",
      html: "<"
    }
  });

  function ErrorPage($timeout) {
    $timeout(_ => {
      const iframe = document.querySelector('#error-iframe');
      iframe.contentDocument.write(this.html);
    });

    console.log(this);
  }
  ErrorPage.$inject = ["$timeout"];

})(angular);