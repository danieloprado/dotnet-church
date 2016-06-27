module Providers {

    export class Toast {
        static $inject = ['$mdToast'];

        private toast: angular.material.IToastPreset<any>;
        private promise: angular.IPromise<any>;

        constructor(
            private $mdToast: angular.material.IToastService
        ) { }

        genericError(err = null): angular.IPromise<any> {
            if (err) console.log(err);
            return this.show("Aconteceu um erro inesperado...");
        }

        userChanged(): angular.IPromise<any> {
            return this.show("O usuário foi alterado, seu trabalho não foi salvo.");
        }

        notFound(): angular.IPromise<any> {
            return this.show("Não encontrado");
        }

        httpHandler(res): angular.IPromise<any> {
            switch (res.status) {
                case 401:
                    return this.userChanged();
                case 404:
                    return this.notFound();
                default:
                    return this.genericError();
            }
        }

        show(message, undo = false): angular.IPromise<any> {

            if (this.toast) {
                return;
            }

            this.toast = this.$mdToast.simple().textContent(message).position("top right");

            if (undo) {
                this.toast.action("Desfazer");
            }

            this.promise = this.$mdToast.show(this.toast).then(res => res == "ok" ? "undo" : res);
            this.promise.finally(() => {
                this.toast = null;
            });

            return this.promise;
        }

    }

    angular.module('app').service('Toast', Toast);
}

