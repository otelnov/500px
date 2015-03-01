angular.module('500px.controllers', [])

  .controller('DashCtrl', function ($scope, TDCardDelegate, $ionicLoading) {



    //_500px.getAuthorizationStatus(function (status) {
    //  if (status == 'not_logged_in' || status == 'not_authorized') {
    //    _500px.login();
    //  }
    //  console.log(status);
    //});
    //
    //
    //_500px.on('authorization_obtained', function () {
    //  _500px.api('/users', function (response) {
    //    console.log(response);
    //  });
    //});


    //var cardTypes = [];

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


  })

  .controller('FavouritesCtrl', function ($scope) {

    $scope.images = [];
    _500px.on('authorization_obtained', function () {
      _500px.api('/users', function (response) {
        //console.log(response);
        var me = response.data.user;
        // Get my favorites
        _500px.api('/photos', {feature: 'user_favorites', user_id: me.id}, function (response) {
          $scope.images = response.data.photos;
          $scope.$apply();
        });
      });
    });
    _500px.getAuthorizationStatus();
  });
