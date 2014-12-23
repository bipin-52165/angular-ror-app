AngularApp.controller('HomeBaseCtrl', [
  '$location', '$scope', '$timeout', '$routeParams', 'Session', 'Confirmation', 'User', function($location, $scope, $timeout, $routeParams, Session, Confirmation, User) {
    $scope.signUpError = {};
    $scope.user = null;
    $scope.token = $routeParams.token;
    Session.getCurrentUser(false).then(function(user) {
      return $scope.user = user;
    });
    $scope.login = function() {
      var u;
      u = $scope.loginModel;
      return Session.login(u.email, u.password).then(function(user) {
        return $location.path('/profile/');
      }, function(error) {
        $scope.loading = false;
        return $scope.loginError = error;
      });
    };
    $scope.signup = function() {
      var u;
      $scope.loading = true;
      u = $scope.signupModel;
      return Session.register(u.firstName, u.lastName, u.email, u.password, u.confirmPassword).then(function(user) {
        $scope.loading = false;
        return $location.path('/profile/');
      }, function(error) {
        $scope.loading = false;
        return $scope.signUpError = error;
      });
    };
    $scope.logout = function() {
      $scope.user = null;
      return Session.logout().then(function() {
        return $scope.user = null;
      });
    };
    $scope.verify = function() {
      return Confirmation.verify($scope.token).then(function() {
        $scope.flash_message = "Thank you! Your email has been verified.";
        return $timeout((function() {
          $scope.flash_message = null;
          return $location.path('/profile/');
        }), 200);
      }, function(error) {
        if ($scope.user !== null) {
          $scope.flash_message = "Your email is already verified.";
          $timeout((function() {
            $scope.flash_message = null;
            return $location.path('/profile/');
          }), 500);
          return;
        }
        $scope.flash_message = error[0];
        return $timeout(function() {
          return $scope.flash_message = null;
        }, 5000);
      });
    };
    if ($routeParams.token !== void 0 && $routeParams.token !== null) {
      return $scope.verify();
    }
  }
]);
