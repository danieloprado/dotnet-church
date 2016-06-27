module Providers {

    export class UI {
        static $inject = ['Loader', 'Toast', 'Confirm'];

        constructor(public Loader: Loader, public Toast: Toast, public Confirm: Confirm) {

        }
    }

    angular.module("app").service("UI", UI);

}