(function () {
  function _ImageService($q) {

    //var storage = [];
    var photos = [];
    //var rows = [];
    var favouriteRows = [];
    //var favourites = [];
    //
    //function setFavourites(images, addOnly) {
    //
    //  favourites = favourites.length > 0 ? favourites.concat(images) : images;
    //
    //  if(addOnly){
    //    return;
    //  }
    //
    //  var photos = storage.length > 0 ? storage.concat(images) : images;
    //  storage.length = 0;
    //
    //  if (photos.length > 3 && images.length > 0) {
    //    var k = photos.length % 3;
    //    for (var i = 0; i < k; i++) {
    //      storage.push(photos[i]);
    //      photos.splice(i, 1);
    //    }
    //  }
    //
    //  return buildRows(photos, images.length === 0);
    //}
    //
    //function buildRows(photos, stop) {
    //
    //  if(typeof photos === 'undefined'){
    //    photos = favourites;
    //    rows.length = 0;
    //  }
    //
    //  var i, n, tempArray;
    //  for (i = 0, n = photos.length; i < n; i += 3) {
    //    tempArray = photos.slice(i, i + 3);
    //    rows.push(tempArray);
    //  }
    //  var deferred = $q.defer();
    //  deferred.resolve({
    //    stop: stop
    //  });
    //
    //  return deferred.promise;
    //}
    //
    //function getRows() {
    //  return rows;
    //}

    function genFavRows(images) {
      var deferred = $q.defer();
      //photos = photos.concat(images);
      photos = images;

      var i, n, tempArray;
      for (i = 0, n = photos.length; i < n; i += 3) {
        tempArray = photos.slice(i, i + 3);
        favouriteRows.push(tempArray);
      }

      deferred.resolve(favouriteRows);
      return deferred.promise;
    }

    return {
      //setFav: setFavourites,
      //getRows: getRows,
      genFavRows: genFavRows,
      favRows: favouriteRows
      //buildRows: buildRows
    };
  }

  _ImageService.$inject = ["$q"];

  angular.module("500px.services")
    .service("ImageService", _ImageService);
})();
