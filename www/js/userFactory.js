(function() {
  "use strict";

  function UserFactory($http, $q, AuthTokenFactory) {
    var user;

    if(AuthTokenFactory.getToken()) {
      _500px.setToken(AuthTokenFactory.getToken());
    }

    return {
      login: login,
      logout: logout,
      getUser: getUser
    };

    function login() {
      var deferred = $q.defer();

      var token = AuthTokenFactory.getToken();

      if(token) {
        _500px.setToken(token);
        deferred.resolve(_500px);
      } else {
        _500px.loginCordova(function (status, token) {
          if (status === "authorized") {
            AuthTokenFactory.setToken(token);
            deferred.resolve(_500px.api.bind(_500px));
          } else {
            deferred.reject("unauthorized");
          }
        });
      }

      return deferred.promise;
    }

    function logout() {
      var deferred = $q.defer();

      _500px.logout(function(status) {
        if(status === "logged_out") {
          AuthTokenFactory.setToken();
          deferred.resolve();
        } else {
          deferred.reject(status);
        }
      });

      return deferred.promise;
    }

    function getUser() {
      var deferred = $q.defer();

      if(user) {
        deferred.resolve(user);
      } else {
        var token = AuthTokenFactory.getToken();

        if(token) {
          _500px.api("/users", function (response) {
            user = response.data.user;
            deferred.resolve(user);
          });
        } else {
          deferred.reject("unauthorized");
        }
      }

      return deferred.promise;
    }
  }
  UserFactory.$inject = ["$http", "$q", "AuthTokenFactory"];

  angular.module("500px.services")
    .factory("UserFactory", UserFactory);
}());
