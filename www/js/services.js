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

  function _ImageService($q) {

    var storage = [];
    //var photos = [];
    var rows = [];
    var favourites = [];

    function setFavourites(images, addOnly) {

      favourites = favourites.length > 0 ? favourites.concat(images) : images;

      if(addOnly){
        return;
      }

      var photos = storage.length > 0 ? storage.concat(images) : images;
      storage.length = 0;

      if (photos.length > 3 && images.length > 0) {
        var k = photos.length % 3;
        for (var i = 0; i < k; i++) {
          storage.push(photos[i]);
          photos.splice(i, 1);
        }
      }

      return buildRows(photos, images.length === 0);
    }

    function buildRows(photos, stop) {

      if(typeof photos === 'undefined'){
        photos = favourites;
        rows.length = 0;
      }

      var i, n, tempArray;
      for (i = 0, n = photos.length; i < n; i += 3) {
        tempArray = photos.slice(i, i + 3);
        rows.push(tempArray);
      }
      var deferred = $q.defer();
      deferred.resolve({
        stop: stop
      });

      return deferred.promise;
    }

    function getRows(){
      return rows;
    }

    return {
      setFav: setFavourites,
      getRows: getRows,
      buildRows: buildRows
    };
  }

  _ImageService.$inject = ["$q"];

  angular.module("500px.services")
    .service("500px", _500pxService)
    .service("UserService", _UserService)
    .service("ImageService", _ImageService);
})();
