(angular => {
  'use strict';

  angular.module('app').factory('Toast', [
    '$mdToast',
    'marked',
    Toast
  ]);

  function Toast($mdToast, marked) {
    let toast, promise;

    const obj = (message, undo) => {
      toast = $mdToast.simple()
        .htmlContent(marked(message))
        .hideDelay(10000)
        .position("top right");

      if (undo) {
        toast.action("Desfazer");
      } else {
        toast.action("OK");
      }

      promise = $mdToast.show(toast).then(res => res == "ok" && undo ? "undo" : res);
      promise.finally(() => {
        toast = null;
      });

      return promise;
    };

    obj.genericError = (err) => {
      if (err) console.log(err);
      return obj("Aconteceu um erro inesperado...");
    };

    obj.userChanged = () => {
      return obj("O usuário foi alterado, seu trabalho não foi salvo.");
    };

    obj.notFound = () => {
      return obj("Não encontrado");
    };

    obj.httpHandler = (res) => {
      switch (res.status) {
        case 400:
          return obj("Dados inválidos");
        case 401:
          return obj.userChanged();
        case 403:
          return obj("Você não tem permissão de acesso");
        case 404:
          return obj.notFound();
        default:
          return obj.genericError();
      }
    };

    return obj;

  }


})(angular);

