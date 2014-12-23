AngularApp.controller('LogoutCtrl', function($location, $scope, $rootScope, Session) {
  return Session.logout().then(function(user) {
    return $location.path('/');
  });
});
