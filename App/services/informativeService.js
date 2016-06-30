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
        return response.data.map((item) => {
          if (item.date) {
            item.date = new Date(item.date);
          }

          return item;
        });
      });
    };

    const get = (id) => {
      return $http.get(`${API}/informative/${id}`).then(res => {
        res.data.date = new Date(res.data.date);
        return res.data;
      });
    };

    const save = (model) => {
      return $http.post(`${API}/informative`, model).then((response) => {
        if (response.data.date) {
          response.data.date = new Date(response.data.date);
        }

        return response.data;
      });
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