((angular) => {
  'use strict';

  angular.module('icbApp')
    .factory('informativeService', [
      'API',
      '$http',
      '$mdDialog',
      'parseDates',
      InformativeService
    ]);

  function InformativeService(API, $http, $mdDialog, parseDates) {

    const list = () => {
      return $http.get(`${API}/informative`).then((response) => {
        return response.data.map((item) => parseDates(item));
      });
    };

    const get = (id) => {
      return $http.get(`${API}/informative/${id}`).then(res => parseDates(res.data));
    };

    const save = (model) => {
      return $http.post(`${API}/informative`, model).then((response) => parseDates(response.data));
    };

    const remove = (id) => {
      return $http.delete(`${API}/informative/${id}`);
    };

    return {
      list,
      get,
      save,
      remove
    };
  }

})(angular);