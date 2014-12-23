window.AngularAppService = angular.module('AngularAppService', []);
window.AngularAppDirectives = angular.module('AngularAppDirectives', []);
window.AngularApp = angular.module('AngularApp', ['AngularAppService', 'AngularAppDirectives', 'ngRoute', 'angular-blocks']);
