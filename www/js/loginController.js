(function() {
  "use strict";

  function LoginController($scope, $rootScope, $state, $log, UserFactory) {
    $scope.login = function () {
      UserFactory.login()
        .then(function loginSuccess(api) {
          $rootScope.api = api;
          $state.go("tab.dash");
        }, function loginFailure(reason) {
          $log.error("Failed to login to 500px", reason);
          $state.go("login");
        });
    };
  }
  LoginController.$inject = ["$scope", "$rootScope", "$state", "$log", "UserFactory"];

  angular.module("500px.controllers")
    .controller("LoginCtrl", LoginController);
}());
