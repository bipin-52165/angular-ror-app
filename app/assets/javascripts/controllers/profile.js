AngularApp.controller('ProfileCtrl', [
  '$http', '$location', '$scope', '$rootScope', '$timeout', '$routeParams', '$filter', '$q', 'Session', 'User', function($http, $location, $scope, $rootScope, $timeout, $routeParams, $filter, $q, Session, User) {
    $rootScope.location = $location;
    $scope.user = null;
    $scope.resetModel = {
      token: null
    };
    $scope.changePasswordModel = {};
    $scope.refresh = function(forceUpdate) {
      return Session.getCurrentUser(forceUpdate).then(function(user) {
        return $scope.user = user;
      });
    };
    $scope.refresh(false);
    $scope.password_reset = function() {
      $scope.loading = true;
      return User.password_reset($scope.forgotModel).then(function(data) {
        $scope.loading = false;
        $scope.flash_message = 'Email sent with password reset instructions.';
        return window.setTimeout(function() {
          $scope.flash_message = null;
          return $scope.$digest();
        }, 5000);
      }, function(data) {
        $scope.loading = false;
        return $scope.resetpasswordFormError = data;
      });
    };
    $scope.changePassword = function() {
      $scope.loading = true;
      return User.changePassword($scope.resetModel).then(function(data) {
        $scope.loading = false;
        $scope.flash_message = 'Your password has been changed.';
        return $timeout((function() {
          $scope.flash_message = null;
          return $location.path('/profile/');
        }), 1500);
      }, function(data) {
        $scope.loading = false;
        return $scope.resetpasswordFormError = data;
      });
    };
    if ($routeParams.token !== null) {
      $scope.resetModel.reset_password_token = $routeParams.token;
    }
    $scope.resendconfirmation = function() {
      $scope.loading = true;
      return User.sendconfirmation().then(function(data) {
        $scope.loading = false;
        $scope.flash_message = 'Re-send confirmation link successfully.';
        return $timeout((function() {
          $scope.flash_message = null;
          return $scope.$digest();
        }), 5000);
      }, function(data) {
        $scope.loading = false;
        $scope.flash_message = data.error;
        return $timeout((function() {
          $scope.flash_message = null;
          return $scope.$digest();
        }), 5000);
      });
    };
    $scope.updateUser = function() {
      $scope.loading = true;
      return User.updateUser($scope.user).then(function(data) {
        $scope.flash_message = 'Your profile has been updated.';
        $scope.refresh(false);
        $timeout((function() {
          $scope.flash_message = null;
          return $scope.$digest();
        }), 5000);
        return $scope.loading = false;
      }, function(data) {
        $scope.loading = false;
        return $scope.memberFormError = data.errors;
      });
    };
    $scope.updatePassword = function() {
      $scope.loading = true;
      return User.updatePassword($scope.changePasswordModel).then(function(data) {
        $scope.loading = false;
        $scope.flash_message = 'Your Password has been updated!';
        $scope.changePasswordModel = null;
        return $timeout((function() {
          $scope.flash_message = null;
          return $scope.$digest();
        }), 5000);
      }, function(data) {
        $scope.loading = false;
        return $scope.changepasswordFormError = data.errors;
      });
    };
    return $scope.password_reset = function() {
      $scope.loading = true;
      return User.password_reset($scope.forgotModel).then(function(data) {
        $scope.loading = false;
        $scope.flash_message = 'Email sent with password reset instructions.';
        return window.setTimeout(function() {
          $scope.flash_message = null;
          return $scope.$digest();
        }, 5000);
      }, function(data) {
        $scope.loading = false;
        return $scope.resetpasswordFormError = data;
      });
    };
  }
]);
