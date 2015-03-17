(function () {
  function _ImageService($q) {

    var favouriteRows = [];
    var favourites = [];

    function genFavRows(images) {
      favourites = favourites.concat(images);
      var deferred = $q.defer();

      var i, n, tempArray;
      for (i = 0, n = images.length; i < n; i += 3) {
        tempArray = images.slice(i, i + 3);
        favouriteRows.push(tempArray);
      }

      deferred.resolve(favouriteRows);
      return deferred.promise;
    }

    function updateFavRows(image) {
      if (favourites.length > 0) {
        favourites.unshift(image);
        var images = favourites;
        favouriteRows.length = 0;

        var i, n, tempArray;
        for (i = 0, n = images.length; i < n; i += 3) {
          tempArray = images.slice(i, i + 3);
          favouriteRows.push(tempArray);
        }
      }
    }

    return {
      genFavRows: genFavRows,
      favRows: favouriteRows,
      updateFavRows: updateFavRows
    };
  }
  _ImageService.$inject = ["$q"];

  angular.module("500px.services")
    .service("ImageService", _ImageService);
})();
