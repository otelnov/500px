(function () {
  function ProfileController() {

  }

  ProfileController.$inject = ["$scope"];

  function SettingsController() {

  }

  angular.module("500px.controllers")
    .controller("ProfileCtrl", ProfileController)
    .controller("SettingsCtrl", SettingsController);
})();
