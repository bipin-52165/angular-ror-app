AngularApp.controller('HomeCtrl', [
  '$location', '$rootScope', '$scope', 'Session', function($location, $rootScope, $scope, Session) {
    $rootScope.location = $location;
    $scope.user = null;
    return Session.getCurrentUser(false).then(function(user) {
      return $scope.user = user;
    });
  }
]);
