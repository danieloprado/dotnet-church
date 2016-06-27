module Providers {
    'use strict';

    export class Confirm {
        static $inject = ['$q', '$mdDialog', '$window'];

        constructor(
            private $q: angular.IQService,
            private $mdDialog: angular.material.IDialogService,
            private $window: any) {

        }

        show(title: string, message: string, $event: any = null): angular.IPromise<any> {

            const confirm = this.$mdDialog.confirm()
                .htmlContent(`
            <h2 class="md-title md-dialog-title">${this.$window.marked(title)}</h2>
            ${this.$window.marked(message)}
        `)
                .targetEvent($event)
                .ok('Sim')
                .cancel('Não');


            return this.$mdDialog.show(confirm).catch(_ => this.$q.reject({ isConfirm: true }));
        };
    }

    angular.module('app').service('Confirm', Confirm);

}