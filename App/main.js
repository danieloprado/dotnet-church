(function (angular) {
  'use strict';

  angular.module('icbApp', [
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

    //'icbChurch',
    //'icbEvent',
    'icbAppointment',
    'icbInformative'
  ]).constant('API', '/api');

})(angular);