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
      getUser: getUser,
      getAvatar: getAvatar
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
      user = null;
      AuthTokenFactory.setToken();
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

    function getAvatar(size) {
      if(!user) {
        return;
      }

      size = size || 512;
      var avatarUrl = user.userpic_https_url;

      if(avatarUrl.indexOf("facebook") !== -1) {
        avatarUrl = avatarUrl
          .replace(/width=\d+/g, "width=" + size)
          .replace(/height=\d+/g, "height=" + size);
      }

      return avatarUrl;
    }
  }
  UserFactory.$inject = ["$http", "$q", "AuthTokenFactory"];

  angular.module("500px.services")
    .factory("UserFactory", UserFactory);
}());
