module Components {

    export class Login {
        static componentName = "appLoginComponent";
        static $inject = ['$q', 'UI', 'AuthService', 'LoginService'];

        model: any = {};
        lockUser: boolean;
        cancel: Function;
        complete: Function;


        constructor(
            private $q: angular.IQService,
            private UI: Providers.UI,
            private AuthService: Services.Auth,
            private LoginService: Services.Login) {

            if (!AuthService.hasToken()) {
                return;
            }

            this.model.email = AuthService.getUser().email;
            this.lockUser = true;
        }

        changeUser() {
            this.UI.Confirm.show("Trocar de usuário?", "Ao trocar de usuário todas as informações não salvas serão perdidas").then(_ => {
                this.cancel();
                this.LoginService.logout();
            });
        }

        submit() {
            this.UI.Loader.show(this.LoginService.login(this.model))
                .then(() => this.complete());
        }

    }

    angular.module('app').component(Login.componentName, {
        templateUrl: "/views/components/login/view.html",
        controller: Login,
        bindings: {
            cancel: "&",
            complete: "&"
        }
    });
}