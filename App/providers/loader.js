(angular => {
  'use strict';

  angular.module('app').factory('Loader', Loader);

  function Loader($q, $rootScope) {

    const promises = [];
    const messages = [];
    let disabled = 0;

    const emitChange = () => {
      const qtd = promises.length - disabled;
      $rootScope.$broadcast(qtd <= 0 ? 'loading-finished' : 'loading-started');
    };

    const obj = (promise) => {
      if (angular.isArray(promise)) {
        promise = $q.all(promise);
      }

      promises.push(promise);

      promise.finally(() => {
        const index = promises.indexOf(promise);
        promises.splice(index, 1);

        emitChange();
      });

      emitChange();
      return promise;
    };

    obj.enable = () => {
      if (disabled === 0) return;

      disabled--;
      emitChange();
    };

    obj.disable = () => {
      if (promises.length === 0) return;

      disabled++;
      emitChange();
    };

    return obj;


  }
  Loader.$inject = ['$q', '$rootScope'];

})(angular);