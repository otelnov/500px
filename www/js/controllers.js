angular.module('500px.controllers', [])

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


    $scope.login = function () {
      $ionicPlatform.ready(function () {
        var browserRef = $window.open('https://api.500px.com/api/js-sdk/authorize?sdk_key=b4512a8c50b7f1cbea9765e16d0552095847d76d', '_blank');
        browserRef.addEventListener('loadstart', function (event) {
          if ((event.url).indexOf("http://example.com") === 0) {
            console.log(event.url);

            //var hash_string = window.location.hash.substring(1),
            var hash_string = event.url,
              parts = hash_string.split(','),
              part,
              result = {};
            while (part = parts.shift()) {
              part = part.split(':');
              result[part[0]] = part[1] == undefined ? true : part[1];
            }
            console.log(result);

            browserRef.close();
          }
        });
        browserRef.addEventListener('exit', function (event) {
          //deferred.reject("The sign in flow was canceled");
        });

      });
    }

  });
