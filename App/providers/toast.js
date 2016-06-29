(angular => {
  'use strict';

  angular.module('app').factory('Toast', ['$mdToast', Toast]);

  function Toast($mdToast) {
    let toast, promise;

    const obj = (message, undo) => {
      if (toast) return;

      toast = $mdToast.simple().textContent(message).position("top right");
      if (undo) toast.action("Desfazer");

      promise = $mdToast.show(toast).then(res => res == "ok" ? "undo" : res);
      promise.finally(() => toast = null);

      return promise;
    };

    obj.genericError = (err) => {
      if (err) console.log(err);
      return show("Aconteceu um erro inesperado...");
    };

    obj.userChanged = () => {
      return show("O usuário foi alterado, seu trabalho não foi salvo.");
    };

    obj.notFound = () => {
      return show("Não encontrado");
    };

    obj.httpHandler = (res) => {
      switch (res.status) {
        case 401:
          return userChanged();
        case 404:
          return notFound();
        default:
          return genericError();
      }
    };

    return obj;

  }


})(angular);

