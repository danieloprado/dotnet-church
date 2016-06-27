module Services {

    export class Auth {
        static $inject = ['$window'];

        setUserToken(token, user) {
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
        }

        hasToken(): boolean {
            return !!localStorage.getItem('token');
        }

        getToken(): string {
            return localStorage.getItem("token");
        }

        getUser(): Interfaces.IUser {
            if (!this.hasToken()) return null;
            return JSON.parse(localStorage.getItem("user"));
        }

        clear() {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
    }

    angular.module('app').service('AuthService', Auth);

}