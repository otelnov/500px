angular.module('500px.controllers')
  .controller('LoginCtrl', function ($scope, $state, $ionicPlatform, UserService) {
    $scope.login = function () {
      UserService.current()
        .then(function(user) {
          console.log(user);
          $state.go('tab.dash');
        }, function(reason) {

        });
    };
  });
