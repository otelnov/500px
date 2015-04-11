angular.module('500px.controllers')

  .controller('FavouritesCtrl', function ($scope, $ionicLoading, UserFactory,
                                          $state, ImageService) {
    UserFactory.getUser().then(function (user) {
      var page = 0;
      $scope.hasMoreData = true;
      var count = 21;

      $scope.loadMore = function () {
        page++;
        _500px.api('/photos', {
          feature: 'user_favorites',
          user_id: user.id,
          page: page,
          image_size: 2,
          rpp: count,
          sort: 'created_at'
        }, function (response) {
          if (response.data.photos.length < count) {
            $scope.hasMoreData = false;
            //$scope.$broadcast('scroll.infiniteScrollComplete');
            //$ionicLoading.hide();
          }

          if (response.data.photos.length === 0) {
            return;
          }

          ImageService.genFavRows(response.data.photos).then(function (rows) {
            $scope.rows = rows;
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $ionicLoading.hide();
          });
        });
      };
    });
  });
