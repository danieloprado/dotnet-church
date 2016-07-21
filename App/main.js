(function (angular) {
  'use strict';

  angular.module('app', [
    'ngSanitize',
    'ngMaterial',
    'ngMessages',
    'ngAnimate',
    'ngRoute',
    'angular-jwt',
    'md.data.table',
    'mdFormValidator',
    'uiGmapgoogle-maps',
    'ui.utils.masks',
    'mdPickers',
    'validatorAsync',

    //'appChurch',
    //'appEvent',
    'appointment',
    'appInformative'
  ]).constant('API', '/api');

})(angular);