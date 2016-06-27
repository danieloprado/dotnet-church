/// <reference path="../components/login/component.ts" />

module Services {

    export class Login {
        static $inject = ['API', '$rootScope', '$location', '$http', '$q', 'componentPage', 'AuthService'];

        private loginPromise: angular.IPromise<any>;

        constructor(
            private API: string,
            private $rootScope: angular.IRootScopeService,
            private $location: any,
            private $http: angular.IHttpService,
            private $q: angular.IQService,
            private componentPage: Providers.ComponentPage,
            private AuthService: Services.Auth) {

        }

        openLogin(): angular.IPromise<any> {
            return this.componentPage.show(Components.Login.componentName);
        }

        login(credentials): angular.IPromise<any> {
            return this.$http({
                method: 'POST',
                url: `${this.API}/token`,
                data: $.param({
                    grant_type: "password",
                    username: credentials.email,
                    password: credentials.password
                }),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then((res: angular.IHttpPromiseCallbackArg<any>) => {
                let { name, email, roles } = res.data;
                roles = roles.split(",");

                this.AuthService.setUserToken(res.data.access_token, { name, email, roles });
                this.$rootScope.$emit("user-changed");

                return res.data;
            });
        }

        logout(): angular.IPromise<any> {
            this.AuthService.clear();
            this.$rootScope.$emit("user-changed");

            this.$location.path("/");
            return this.$q.resolve();
        }
    }

    angular.module('app').service('LoginService', Login);

}