(function(angular) {
  'use strict';

  angular.module("app").factory("lodash", ["$window", ($window) => $window._]);
  angular.module("app").factory("moment", ["$window", ($window) => $window.moment]);
  angular.module("app").factory("marked", ["$window", ($window) => $window.marked]);
  angular.module("app").factory("SimpleMDE", ["$window", ($window) => $window.SimpleMDE]);

})(angular);
