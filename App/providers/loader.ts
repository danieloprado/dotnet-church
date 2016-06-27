module Providers {

    export class Loader {
        static $inject = ['$q', '$rootScope'];

        private promises = [];
        private messages = [];
        private disabled = 0;

        constructor(
            private $q: angular.IQService,
            private $rootScope: angular.IRootScopeService) {
        }

        private emitChange() {
            const qtd = this.promises.length - this.disabled;
            this.$rootScope.$broadcast(qtd <= 0 ? 'loading-finished' : 'loading-started');
        }

        show<T>(target: angular.IPromise<T> | Array<angular.IPromise<any>>): angular.IPromise<T> {
            if (angular.isArray(target)) {
                target = <angular.IPromise<any>>this.$q.all(<any>target);
            }

            const promise = <angular.IPromise<any>>target;
            this.promises.push(promise);

            promise.finally(() => {
                const index = this.promises.indexOf(promise);
                this.promises.splice(index, 1);

                this.emitChange();
            });

            this.emitChange();
            return promise;
        }

        enable() {
            if (this.disabled === 0) return;

            this.disabled--;
            this.emitChange();
        }

        disable() {
            if (this.promises.length === 0) return;

            this.disabled++;
            this.emitChange();
        }
    }

    angular.module('app').service('Loader', Loader);

}

