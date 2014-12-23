AngularAppService.factory('User', [
  '$location', '$http', '$q', function($location, $http, $q) {
    return {
      getUser: function(user_id) {
        var deferred;
        deferred = $q.defer();
        $http.get('/api/users').success(function(data) {
          return deferred.resolve(data.user);
        }).error(function(data) {
          return deferred.reject(data);
        });
        return deferred.promise;
      },
      updateUser: function(user) {
        var deferred;
        deferred = $q.defer();
        $http.put('/api/users', {
          user: {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: user.password,
            password_confirmation: user.password_confirmation
          }
        }).success(function(data) {
          return deferred.resolve(data);
        }).error(function(data) {
          return deferred.reject(data);
        });
        return deferred.promise;
      },
      password_reset: function(user) {
        var deferred;
        deferred = $q.defer();
        $http.post('/api/passwords', {
          user: {
            email: user.email
          }
        }).success(function(data) {
          return deferred.resolve(data);
        }).error(function(data) {
          return deferred.reject(data.error);
        });
        return deferred.promise;
      },
      changePassword: function(user) {
        var deferred;
        deferred = $q.defer();
        $http.put('/api/passwords', {
          user: {
            reset_password_token: user.reset_password_token,
            password: user.password,
            password_confirmation: user.confirmPassword
          }
        }).success(function(data) {
          return deferred.resolve(data);
        }).error(function(data) {
          return deferred.reject(data.error);
        });
        return deferred.promise;
      },
      sendconfirmation: function() {
        var deferred;
        deferred = $q.defer();
        $http.post('/api/confirmations').success(function(data) {
          if (data) {
            return deferred.resolve(data);
          } else {
            return deferred.reject(data);
          }
        }).error(function(data) {
          return deferred.reject(data);
        });
        return deferred.promise;
      },
      updatePassword: function(user) {
        var deferred;
        deferred = $q.defer();
        $http.put('/api/update_password', {
          user: {
            current_password: user.current_password,
            password: user.password,
            password_confirmation: user.confirmPassword
          }
        }).success(function(data) {
          return deferred.resolve(data);
        }).error(function(data) {
          return deferred.reject(data);
        });
        return deferred.promise;
      }
    };
  }
]);
