(function (angular) {
  'use strict';

  angular.module("app").factory("parseDates", ParseDates);

  function ParseDates(obj, fields) {
    if (!fields) {
      fields = Object.keys(obj).filter(x => x.toLowerCase().indexOf("date") > -1);
    }

    fields.forEach(key => {
      if (!obj[key]) return;
      obj[key] = new Date(obj[key]);
    });

    return obj;
  }

})(angular);