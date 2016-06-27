module Components {

    export class Page {
        static componentName = "appComponentPage";

        hide: boolean;

        static $inject = ['$scope', '$compile'];

        constructor(
            $scope: angular.IScope,
            $compile: any) {

            this.hide = true;
            const elem = angular.element('#app-component-page');

            $scope.$on("show-component-page", (info, data) => {
                elem.addClass("fadeInUp");
                elem.removeClass("fadeOutDown");

                this.hide = false;
                elem.html($compile(data.template)(data.$scope));
            });

            $scope.$on("hide-component-page", (info, data) => {
                elem.addClass("fadeOutDown");
                elem.removeClass("fadeInUp");

                this.hide = true;
            });
        }

    }

    angular.module('app').component(Page.componentName, {
        template: `
    <div class="content-page-component animated fadeInUp" ng-show="!$ctrl.hide" id="app-component-page">
    </div>
  `,
        controller: Page
    });

}

