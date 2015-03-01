angular.module('500px.controllers', [])

  .controller('DashCtrl', function ($scope, TDCardDelegate, $ionicLoading, $ionicPlatform, $window) {

    //var authUrl = 'https://api.500px.com/api/js-sdk/authorize?sdk_key=b4512a8c50b7f1cbea9765e16d0552095847d76d&redirectUrl=http://localhost/callback';
    //
    //$window.document.addEventListener("deviceready", function() {
    //  var browserRef = window.open("", "_blank");
    //
    //  browserRef.addEventListener("loadstart", function(event) {
    //      if((event.url).indexOf('localhost/callback') === 0) {
    //          var requestToken = (event.url).split("code=")[1];
    //          console.log(event.url);
    //
    //          browserRef.close();
    //      }
    //  }, true);
    //
    //  browserRef.addEventListener('exit', function(event) {
    //      console.error("The sign in flow was canceled");
    //  }, true);
    //
    //  browserRef.addEventListener('message', function(e) {
    //    console.log(e);
    //  }, true);
    //
    //  browserRef.location.assign(authUrl);
    //});

    //$ionicLoading.show({
    //  template: 'Loading...'
    //});

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
