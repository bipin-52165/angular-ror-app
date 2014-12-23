AngularAppService.factory('Confirmation', [
  '$location', '$http', '$q', function($location, $http, $q) {
    return {
      verify: function(token) {
        var deferred;
        deferred = $q.defer();
        $http.get("/api/confirmations?confirmation_token=" + token).then(function(response) {
          return deferred.resolve();
        }, function(response) {
          return deferred.reject(response.data.error);
        });
        return deferred.promise;
      }
    };
  }
]);
