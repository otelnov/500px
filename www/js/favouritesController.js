angular.module('500px.controllers')

  .controller('FavouritesCtrl', function ($scope, $ionicLoading, UserService,
                                          $state, ImageService) {
    UserService.current().then(function (user) {
      if (!user) {
        return $state.go('login');
      }
      //$scope.rows = [];
      $scope.rows = ImageService.getRows();
      var page = 0;
      $scope.hasMoreData = true;

      $scope.loadMore = function () {
        page++;
        _500px.api('/photos', {
          feature: 'user_favorites',
          user_id: user.id,
          page: page,
          image_size: 2,
          sort: 'created_at'
        }, function (response) {
          ImageService.setFav(response.data.photos).then(function (res) {
            if (res.stop) {
              $scope.hasMoreData = false;
            }
            //else{
            //  $scope.rows = $scope.rows.length > 0
            //    ? $scope.rows.concat(res.rows)
            //    : res.rows;
            //
            //}
            $ionicLoading.hide();
            $scope.$broadcast('scroll.infiniteScrollComplete');
          });
        });
      };
    });
  });
