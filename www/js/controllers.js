angular.module('500px.controllers', [])

	.controller('DashCtrl', function ($scope, TDCardDelegate) {
    var cardTypes = [
      { image: '../img/cat.jpg' },
      { image: '../img/cat2.jpg' },
      { image: '../img/cat3.jpg' },
    ];

    $scope.cardDestroyed = function(index) {
      $scope.cards.splice(index, 1);
    };

    $scope.addCard = function() {
      var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
      newCard.id = Math.random();
      $scope.cards.unshift(angular.extend({}, newCard));
    };

    $scope.cards = [];
    for(var i = 0; i < 3; i++) $scope.addCard();

    $scope.cardSwipedLeft = function(index) {
      console.log('LEFT SWIPE');
      $scope.addCard();
    };
    $scope.cardSwipedRight = function(index) {
      console.log('RIGHT SWIPE');
      $scope.addCard();
    };
	})

	.controller('FavouritesCtrl', function ($scope) {

	});
