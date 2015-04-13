angular.module('500px.controllers')

  .controller('FavouritesCtrl', function ($scope, $ionicLoading, $state, ImageService) {
    $scope.hasMoreData = true;

    $scope.loadMore = function () {
      ImageService.loadMoreFavs(function (data) {
        $scope.hasMoreData = data.hasMoreData;
        if (data.rows) {
          $scope.rows = data.rows;
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
        $ionicLoading.hide();
      });
    };
  })
  .controller('FavouritesViewCtrl', function ($scope, $ionicLoading, ImageService, $state, $ionicSlideBoxDelegate) {
    var id = $state.params.id;
    var favs = ImageService.getFavourites();
    favs.forEach(function (img, index) {
      if (img.id.toString() === id.toString()) {
        $scope.activeImage = index;
        $scope.title = img.name;
      }
    });
    $scope.favourites = favs;

    $scope.slide = function (i) {
      if (favs.length <= i + 5) {
        ImageService.loadMoreFavs(function (data) {
          favs = ImageService.getFavourites();
          $scope.favourites = favs;
          $ionicSlideBoxDelegate.update();
        });
      }
    };


  });
