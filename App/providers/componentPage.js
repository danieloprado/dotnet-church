(angular => {
  'use strict';

  angular.module('icbApp').factory('componentPage', ComponentPage);

  function ComponentPage($rootScope, $q, ComponentTemplate) {

    return (component, resolve) => {
            console.log(resolve);

      const defer = $q.defer();
      const $scope = $rootScope.$new();
      const template = ComponentTemplate(component, resolve);

      angular.extend($scope, resolve);

      $scope.cancel = ($data) => {
        defer.reject($data);
        $rootScope.$broadcast("hide-component-page");
      };

      $scope.complete = ($data) => {
        defer.resolve($data);
        $rootScope.$broadcast("hide-component-page");
      };

      $rootScope.$broadcast("show-component-page", { template, $scope });
      return defer.promise;
    };

  }
  ComponentPage.$inject = ['$rootScope', '$q', 'ComponentTemplate'];


})(angular);