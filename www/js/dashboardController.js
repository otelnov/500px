angular.module('500px.controllers')

  .controller('DashCtrl', function ($scope, TDCardDelegate, $ionicLoading, $window,
                                    ImageService) {

    $scope.cardsMT = ($window.innerHeight - 100 - 300) / 2;

    var page = 0;
    $scope.cards = [];
    loadMore();

    $scope.like = function (img) {
      _500px.api('/photos/' + img.id + '/favorite', 'post', function (response) {
        if(!response.error && response.data.photo){
          ImageService.setFav([response.data.photo], true);
          ImageService.buildRows();
        }
      });
    };

    $scope.cardDestroyed = function (index) {
      $scope.cards.splice(index, 1);
      if (index === 1) {
        console.log('loadnew');
        loadMore();
      }
    };

    function loadMore() {
      $ionicLoading.show({
        template: 'Loading...'
      });
      page++;

      _500px.api('/photos', {
        feature: 'popular',
        page: page,
        image_size: 3
      }, function (response) {
        $ionicLoading.hide();
        $scope.cards = response.data.photos.concat($scope.cards);
      });
    }
  });
