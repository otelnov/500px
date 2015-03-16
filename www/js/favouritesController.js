angular.module('500px.controllers')

  .controller('FavouritesCtrl', function ($scope, $ionicLoading, UserService,
                                          $state, ImageService) {
    UserService.current().then(function (user) {
      $scope.rows = [];
      //$scope.rows = ImageService.favRows;//ImageService.getRows();
      var page = 0;
      $scope.hasMoreData = true;
      //
      //console.log('start');
      $scope.loadMore = function () {
        page++;
        _500px.api('/photos', {
          feature: 'user_favorites',
          //feature: 'popular',
          user_id: user.id,
          page: page,
          image_size: 2,
          rpp: 21
          //    sort: 'created_at'
        }, function (response) {
          //console.log(response.data.photos);
          if (response.data.photos.length === 0) {
            $scope.hasMoreData = false;
            $scope.$broadcast('scroll.infiniteScrollComplete');
            return;
          }
          ImageService.genFavRows(response.data.photos).then(function (rows) {
            //$scope.rows = rows;
            $scope.$broadcast('scroll.infiniteScrollComplete');
          });
          //console.log('done');
          //    ImageService.setFav(response.data.photos).then(function (res) {
          //      if (res.stop) {
          //        $scope.hasMoreData = false;
          //      }
          //      //else{
          //      //  $scope.rows = $scope.rows.length > 0
          //      //    ? $scope.rows.concat(res.rows)
          //      //    : res.rows;
          //      //
          //      //}
          //      $ionicLoading.hide();
          //      $scope.$broadcast('scroll.infiniteScrollComplete');
          //    });
        });
      };
    });
  });
