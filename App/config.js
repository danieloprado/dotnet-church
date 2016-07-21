(function(angular) {
  'use strict';

  angular.module('app')
    .config(['$httpProvider', configAuth])
    .config(['uiGmapGoogleMapApiProvider', configMaps])
    .config(['$mdIconProvider', configIcons])
    .config(['mdFormValidatorProvider', configErrorMessages])
    .config(['$mdThemingProvider', configTheme]);

  function configAuth($httpProvider) {
      $httpProvider.interceptors.push('authInterceptor');
  }

  function configMaps(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyB-wemve6T0HOeNB4ROetIEneUZJZIl3PU',
      libraries: 'places,geocoder',
      language: 'pt-BR'
    });
  }

  function configIcons($mdIconProvider) {
    $mdIconProvider.defaultIconSet('/svgs/mdi.svg');
  }

  function configErrorMessages(mdFormValidatorProvider) {
      mdFormValidatorProvider.setMessage("required", "Obrigatório");
      mdFormValidatorProvider.setMessage("date", "Data inválida");
      mdFormValidatorProvider.setMessage("email", "Email inválido");
      mdFormValidatorProvider.setMessage("min", "Deve ter ser no minimo {min}");
      mdFormValidatorProvider.setMessage("max", "Deve ter ser no máximo {max}");
      mdFormValidatorProvider.setMessage("md-maxlength", "Deve ter no máximo {md-maxlength} caracteres");
  }

  function configTheme($mdThemingProvider, $translateProvider) {

    $mdThemingProvider.definePalette('customPrimary', {
      '50': '#6c8a99',
      '100': '#617d8b',
      '200': '#56707c',
      '300': '#4c626d',
      '400': '#41545e',
      '500': '#37474F',
      '600': '#2d3940',
      '700': '#222c31',
      '800': '#181e22',
      '900': '#0d1113',
      'A100': '#7c96a3',
      'A200': '#8ba2ae',
      'A400': '#9aaeb8',
      'A700': '#030304',
      'contrastDefaultColor': 'light'
    });

    $mdThemingProvider.definePalette('customAccent', {
      '50': '#65ab72',
      '100': '#579f65',
      '200': '#4e8e5a',
      '300': '#457e50',
      '400': '#3c6d45',
      '500': '#335D3B',
      '600': '#2a4d31',
      '700': '#213c26',
      '800': '#182c1c',
      '900': '#0f1b11',
      'A100': '#75b481',
      'A200': '#86bd90',
      'A400': '#96c69f',
      'A700': '#060b07',
      'contrastDefaultColor': 'light'
    });

    $mdThemingProvider.theme('default')
      .primaryPalette('customPrimary')
      .accentPalette('customAccent');
  }

})(angular);