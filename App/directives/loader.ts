(angular => {
  "use strict";

  angular.module("app").directive("appLoader", [Directive]);

  function Directive() {

    return {
      restrict: "E",
      scope: true,
      template: `
        <div ng-if="!hide">
          <md-progress-circular
              class="md-accent"
              md-diameter="60"
              md-mode="indeterminate" />
        </div>`,
      link: (scope) => {
        scope.hide = true;

        scope.$on("loading-started", () => {
          scope.hide = false;
        });

        scope.$on("loading-finished", () => {
          scope.hide = true;
        });

      }
    };

  }

})(angular);