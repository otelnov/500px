(function () {
  function _ImageService($q, UserFactory) {

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

    var page = 0;
    var count = 21;

    function loadMoreFavs(cb) {
      var data = {hasMoreData: true};
      page++;
      UserFactory.getUser().then(function (user) {
        _500px.api('/photos', {
          feature: 'user_favorites',
          user_id: user.id,
          page: page,
          image_size: [2, 4],
          rpp: count,
          sort: 'created_at'
        }, function (response) {
          data.favs = favourites;

          if (response.data.photos.length < count) {
            data.hasMoreData = false;
          }

          if (response.data.photos.length === 0) {
            return cb(data);
          }

          genFavRows(response.data.photos).then(function (rows) {
            data.rows = rows;
            cb(data);
          });
        });
      });
    }

    return {
      genFavRows: genFavRows,
      favRows: favouriteRows,
      updateFavRows: updateFavRows,
      loadMoreFavs: loadMoreFavs
    };
  }

  _ImageService.$inject = ['$q', 'UserFactory'];

  angular.module('500px.services')
    .service("ImageService", _ImageService);
})();
