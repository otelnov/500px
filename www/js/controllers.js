angular.module('500px.controllers', [])

  .controller('DashCtrl', function ($scope, TDCardDelegate, $ionicLoading, $ionicPlatform) {

    $ionicPlatform.ready(function() {
      var browserRef = window.open(
        'https://api.500px.com/api/js-sdk/authorize?sdk_key=b4512a8c50b7f1cbea9765e16d0552095847d76d&callback=_500pxCallback');

      browserRef.addEventListener("loadstart", function(event) {
          if((event.url).indexOf('localhost/callback') === 0) {
              var requestToken = (event.url).split("code=")[1];
              console.log(event.url);

              browserRef.close();
          }
      });

      browserRef.addEventListener('exit', function(event) {
          console.error("The sign in flow was canceled");
      });

      browserRef.addEventListener('message', function(e) {
        console.log(e);
      }, true);
    });



    $ionicLoading.show({
      template: 'Loading...'
    });

    var page = 1;

    _500px.api('/photos', {feature: 'popular', page: 1, image_size: 3}, function (response) {
      //console.log('loaded',response.data);
      $ionicLoading.hide();
      //cardTypes = response.data.photos;

      $scope.cards = response.data.photos;
      $scope.current = $scope.cards[$scope.cards.length - 1];
      //$scope.$apply();
      //$scope.addCard = function () {
      //  var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
      //  newCard.id = Math.random();
      //  $scope.cards.unshift(angular.extend({}, newCard));
      //};
      //
      //for (var i = 0; i < 3; i++) {
      //  $scope.addCard();
      //}
      //
      $scope.cardDestroyed = function (index) {
        //todo: block screen and wait other if it is last item
        $scope.cards.splice(index, 1);
        $scope.current = $scope.cards[index - 1];
        if(index===3){
          page++;
          loadMore(page);
        }
      };


      //$scope.cardSwipedLeft = function (index) {
      //$scope.addCard();

      //};
      //$scope.cardSwipedRight = function (index) {
      //  $scope.addCard();
      //};


    });

    function loadMore(page){
      _500px.api('/photos', {feature: 'popular', page: page, image_size: 3}, function (response) {
        $scope.cards = response.data.photos.concat($scope.cards);
      });
    }


  });
