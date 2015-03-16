(function () {
  function _UserService($500px, $q) {
    var user;

    function getCurrent() {
      var deferred = $q.defer();

      if (user) {
        deferred.resolve(user);
        return deferred.promise;
      }

      $500px.authorize()
        .then(function (api) {
          api("/users", function (response) {
            user = response.data.user;
            deferred.resolve(user);
          });
        }, function (reason) {
          deferred.reject(reason);
        });

      return deferred.promise;
    }

    function login() {

    }

    function logout() {

    }

    return {
      current: getCurrent,
      login: login,
      logout: logout
    };
  }

  _UserService.$inject = ["500px", "$q"];

  function _500pxService($q) {
    _500px.init({
      sdk_key: 'b4512a8c50b7f1cbea9765e16d0552095847d76d'
    });

    function authorize() {
      var deferred = $q.defer();

      _500px.loginCordova(function (status) {
        if (status === "authorized") {
          deferred.resolve(_500px.api.bind(_500px));
        } else {
          deferred.reject("unauthorized");
        }
      });

      return deferred.promise;
    }

    function logout() {

    }

    return {
      authorize: authorize,
      logout: logout
    };
  }

  _500pxService.$inject = ["$q"];

  angular.module("500px.services")
    .service("500px", _500pxService)
    .service("UserService", _UserService);
})();
