angular.module('500px.controllers')

  .controller('DashCtrl', function ($scope, $ionicLoading, $window,
                                    ImageService) {

    var mt = ($window.innerHeight - $window.innerWidth - 100) / 2;

    $scope.imgStyles = {
      'margin-top': mt + 'px'
    };

    //todo: get gesture action from user settings
    $scope.left = next;
    $scope.right = like;
    $scope.down = next;
    $scope.up = next;

    var page = 0;
    var cards = [];
    $scope.activeImage = null;

    $ionicLoading.show({template: 'Loading...'});
    loadMore();

    function loadMore() {
      page++;
      _500px.api('/photos', {
        feature: 'popular',
        page: page,
        image_size: 440,
        include_states: 1
      }, function (response) {
        $ionicLoading.hide();
        cards = cards.concat(response.data.photos);

        if (!$scope.activeImage) {
          $scope.activeImage = cards[0];
        }
      });
    }

    function setActive() {
      if (cards.length === 6) {
        loadMore();
      }

      if (cards.length === 2) {
        $ionicLoading.show({template: 'Loading...'});
      }
      cards.splice(0, 1);
      $scope.activeImage = cards[0];
    }

    function next() {
      setActive();
    }

    function like() {
      var img = $scope.activeImage;
      setActive();
      _500px.api('/photos/' + img.id + '/favorite', 'post', function (response) {
        //  if (!response.error && response.data.photo) {
        //ImageService.setFav([response.data.photo], true);
        //ImageService.buildRows();
        //}
      });
    }

  });
