//= require jquery.min
//= require twitter/bootstrap
//= require angular
//= require angular-route
//= require angular-resource
//= require angular-blocks
//= require setup
//= require_directory ./controllers
//= require_directory ./services
//= require_directory ./filters
//= require directives/bootstrapDirectives
//= require directives/formDirectives
//= require directives/jQueryDirectives

AngularApp.config([
  "$httpProvider", function($httpProvider) {
    var interceptor;
    $httpProvider.defaults.headers.common["X-CSRF-Token"] = $("meta[name=csrf-token]").attr("content");
    interceptor = [
      "$location", "$rootScope", "$q", function($location, $rootScope, $q) {
        var error, success;
        success = function(response) {
          return response;
        };
        error = function(response) {
          if (response.status === 401) {
            $rootScope.$broadcast("event:unauthorized");
            return $q.reject(response);
          }
        };
        return function(promise) {
          return promise.then(success, error);
        };
      }
    ];
    return $httpProvider.responseInterceptors.push(interceptor);
  }
]);

AngularApp.config([
  "$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
    return $routeProvider.when("/", {
      templateUrl: "/home/index.html",
      controller: 'HomeCtrl'
    }).when("/profile/", {
      templateUrl: "/profile/index.html",
      controller: 'ProfileCtrl'
    }).when("/login", {
      templateUrl: "/home/login.html",
      controller: 'HomeBaseCtrl'
    }).when("/signup", {
      templateUrl: "/home/signup.html",
      controller: 'HomeBaseCtrl'
    }).when("/logout", {
      templateUrl: "/home/logout.html",
      controller: 'LogoutCtrl'
    }).when("/verify", {
      templateUrl: "/home/verify.html",
      controller: 'HomeBaseCtrl'
    }).when("/verify/:token", {
      templateUrl: "/home/verify.html",
      controller: 'HomeBaseCtrl'
    }).when("/changepassword", {
      templateUrl: "/profile/changepassword.html",
      controller: 'ProfileCtrl'
    }).when("/resetpassword", {
      templateUrl: "/profile/resetpassword.html",
      controller: 'ProfileCtrl'
    }).when("/resetpassword/:token", {
      templateUrl: "/profile/updatepassword.html",
      controller: 'ProfileCtrl'
    });
  }
]);


