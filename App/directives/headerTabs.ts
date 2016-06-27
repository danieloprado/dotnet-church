module Directives {

    class HeaderTabs {
        static $inject = ["$compile", "$rootScope"];

        constructor(
            private $compile: angular.ICompileService,
            private $rootScope: angular.IRootScopeService) {

            $rootScope.headerTabs = {
                current: 0,
                tabs: []
            };

            $rootScope.$on("$routeChangeStart", ($event, next) => {
                $rootScope.headerTabs.current = 0;
                $rootScope.headerTabs.tabs = [];
            });
        }

        restrict = 'A';
        scope = false;
        priority = 1;
        replace = false;
        terminal = true;

        compile = (tElement: any, tAttrs: angular.IAttributes) => {
            tElement.removeAttr('header-tabs');
            angular.element(tElement).addClass('header-tabs-content');
            tAttrs.$set("md-selected", "headerTabs.current");

            return {
                pre: (scope: angular.IScope, iElement: JQuery) => {
                    iElement.find('md-tab').each((key: number, elem: Element) => {
                        this.$rootScope.headerTabs.tabs.push(angular.element(elem).attr('label'))
                    });

                    this.$compile(iElement)(scope);
                }
            };
        }
    }


    angular.module('app').directive('headerTabs', Helpers.directiveFacotry(HeaderTabs));
}