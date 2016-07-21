(function(angular) {
  'use strict';

  angular.module("app").factory("lodash", ["$window", ($window) => $window._]);
  angular.module("app").factory("SimpleMDE", ["$window", ($window) => $window.SimpleMDE]);

})(angular);
