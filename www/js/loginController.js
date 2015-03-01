angular.module('500px.controllers')

  .controller('LoginCtrl', function ($scope, $state, $ionicPlatform) {
    $scope.login = function () {
      $ionicPlatform.ready(function () {
        _500px.loginCordova(function (status) {
          if (status === 'authorized') {
            $state.go('tab.dash');
          }
        });
      });
    }
  });
