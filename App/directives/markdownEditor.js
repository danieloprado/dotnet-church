(function (angular) {
  'use strict';

  angular.module("icbApp").directive("markdownEditor", DatePicker);

  function DatePicker($timeout, SimpleMDE) {

    return {
      restrict: "E",
      scope: {
        ngModel: "="
      },
      template: `<textarea />`,
      link: ($scope, elem, attrs) => {
        elem.css({ display: "block" });

        let changedByEditor = false;
        const simplemde = new SimpleMDE({
          element: elem.find('textarea')[0],
          spellChecker: false,
          status: false,
          placeholder: attrs.placeholder
        });

        $scope.$watch("ngModel", () => {
          if (changedByEditor) {
            changedByEditor = false;
            return;
          }

          simplemde.value($scope.ngModel);
        });

        simplemde.codemirror.on("change", () => {
          $timeout(() => {
            changedByEditor = true;
            $scope.ngModel = simplemde.value();
          });
        });
      }
    };

  }
  DatePicker.$inject = ['$timeout', 'SimpleMDE'];


})(angular);

