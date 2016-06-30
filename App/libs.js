(function(angular) {
  'use strict';

  angular.module("icbApp").factory("lodash", ["$window", ($window) => $window._]);
  angular.module("icbApp").factory("SimpleMDE", ["$window", ($window) => $window.SimpleMDE]);

})(angular);
