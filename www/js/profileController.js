(function () {
  "use strict";

  function ProfileController($scope, $state, UserFactory) {
    init();

    $scope.logout = logout;

    function init() {
      UserFactory.getUser().then(function(user) {
        $scope.user = user;
        $scope.user.avatarUrl = UserFactory.getAvatar();
      });
    }

    function logout() {
      UserFactory.logout();
      $state.go("login");
    }
  }
  ProfileController.$inject = ["$scope", "$state", "UserFactory"];

  function SettingsController() {

  }
  SettingsController.$inject = ["$scope"];

  angular.module("500px.controllers")
    .controller("ProfileCtrl", ProfileController)
    .controller("SettingsCtrl", SettingsController);
})();
