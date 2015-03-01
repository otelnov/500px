angular.module('500px.controllers')

  .controller('FavouritesCtrl', function ($scope, $ionicLoading, UserService, $state) {
    UserService.current(function (err, user) {
      if (err || !user) {
        return $state.go('login');
      }
      var photos = [];
      $scope.rows = [];
      var storage = [];
      var page = 0;

      function genRows(array, columns) {
        var rows = [];
        var i, n, tempArray;
        for (i = 0, n = array.length; i < n; i += columns) {
          tempArray = array.slice(i, i + columns);
          rows.push(tempArray);
        }
        return rows;
      }

      $scope.loadMore = function () {
        page++;
        _500px.api('/photos', {
          feature: 'user_favorites',
          user_id: user.id,
          page: page,
          image_size: 2,
          sort: 'created_at'
        }, function (response) {
          $ionicLoading.hide();
          photos = response.data.photos.concat(storage);
          storage.length = 0;
          var k = photos.length % 3;
          for (var i = 0; i < k; i++) {
            storage.push(photos[i]);
            photos.splice(i, 1);
          }
          var rows = genRows(photos, 3);
          $scope.rows = $scope.rows.concat(rows);
          $scope.$broadcast('scroll.infiniteScrollComplete');
        });
      };
    });
  });
