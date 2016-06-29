(angular => {
  'use strict';

  angular.module('icbApp').component("appLoginComponent", {
    templateUrl: "/views/components/login/login.html",
    controller: Login,
    bindings: {
      cancel: "&",
      complete: "&"
    }
  });

  function Login(UI, authService, loginService) {
    this.model = {};
    this.lockUser = false;

    if (authService.hasToken()) {
      this.model.email = authService.getUser().email;
      this.lockUser = true;
    }

    this.changeUser = () => {
      UI.Confirm("Trocar de usuário?", "Ao trocar de usuário todas as informações não salvas serão perdidas")
        .then(_ => {
          this.cancel();
          loginService.logout();
        });
    };

    this.submit = () => {
      UI.Loader(loginService.login(this.model))
        .then(() => this.complete());
    };

  }
  Login.$inject = ['UI', 'authService', 'loginService'];

})(angular);


