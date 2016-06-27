module Providers {

  export class ComponentPage {
    static $inject = ['$rootScope', '$q', 'ComponentTemplate'];

    constructor(
      private $rootScope: angular.IRootScopeService,
      private $q: angular.IQService,
      private ComponentTemplate: ComponentTemplate) {
    }

    show(component: string, resolve: Object = null): angular.IPromise<any> {
      const defer = this.$q.defer();
      const $scope: any = this.$rootScope.$new();
      const template = this.ComponentTemplate.resolve(component, resolve);

      angular.extend($scope, resolve);

      $scope.cancel = ($data) => {
        defer.reject($data);
        this.$rootScope.$broadcast("hide-component-page");
      };

      $scope.complete = ($data) => {
        defer.resolve($data);
        this.$rootScope.$broadcast("hide-component-page");
      };

      this.$rootScope.$broadcast("show-component-page", { template, $scope });
      return defer.promise;
    }
  }

  angular.module('app').service('componentPage', ComponentPage);


}