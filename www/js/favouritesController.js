angular.module('500px.controllers')

  .controller('FavouritesCtrl', function ($scope, $ionicLoading, UserService,
                                          $state, ImageService, $timeout) {
    UserService.current().then(function (user) {
      var page = 0;
      $scope.hasMoreData = true;

      $scope.loadMore = function () {
        page++;
        _500px.api('/photos', {
          feature: 'user_favorites',
          user_id: user.id,
          page: page,
          image_size: 2,
          rpp: 21,
          sort: 'created_at'
        }, function (response) {
          if (response.data.photos.length === 0) {
            $scope.hasMoreData = false;
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $ionicLoading.hide();
            return;
          }

          ImageService.genFavRows(response.data.photos).then(function (rows) {
            $scope.rows = rows;
            $scope.$broadcast('scroll.infiniteScrollComplete');
          });
        });
      };
    });
  });
