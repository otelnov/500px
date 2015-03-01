angular.module('500px.controllers')

  .controller('DashCtrl', function ($scope, TDCardDelegate, $ionicLoading, $ionicPlatform, $window) {

    var page = 0;
    $scope.cards = [];
    loadMore();

    $scope.like = function (img) {
      _500px.api('/photos/' + img.id + '/vote', 'post', {vote: 1}, function (response) {
        console.log(response);
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

      _500px.api('/photos', {feature: 'popular', page: page, image_size: 3}, function (response) {
        $ionicLoading.hide();
        $scope.cards = response.data.photos.concat($scope.cards);
      });
    }
  });
