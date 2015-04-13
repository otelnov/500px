angular.module('500px.controllers', []);
angular.module('500px.services', []);

angular.module('500px', [
  'ionic',
  '500px.controllers',
  '500px.services',
  'ngCordova'
]).run(function ($ionicPlatform, $cordovaStatusbar) {
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      //StatusBar.styleDefault();
    }

    $cordovaStatusbar.overlaysWebView(true);
    $cordovaStatusbar.style(1);
  });
}).config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/login');

  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl',
      resolve: {
        user: ["$q", "$state", "UserFactory", function($q, $state, UserFactory) {
          var deferred = $q.defer();
          UserFactory.getUser().then(function(user) {
            $state.go("tab.dash");
          }, function() {
            deferred.resolve();
          });

          return deferred.promise;
        }]
      }
    })
    .state('tab', {
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })
    .state('tab.dash', {
      url: '/dash',
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-dash.html',
          controller: 'DashCtrl'
        }
      }
    })
    .state('tab.favourites', {
      url: '/favourites',
      views: {
        'tab-favourites': {
          templateUrl: 'templates/tab-favourites.html',
          controller: 'FavouritesCtrl'
        }
      }
    })
    //.state('tab.favourites_view', {
    //  url: '/favourites/:id',
    //  views: {
    //    'tab-favourites': {
    //      templateUrl: 'templates/favourites-view.html',
    //      controller: 'FavouritesViewCtrl'
    //    }
    //  }
    //})
    .state('tab.settings', {
      url: '/settings',
      views: {
        'tab-profile': {
          templateUrl: 'templates/tab-settings.html',
          controller: 'SettingsCtrl'
        }
      }
    })
    .state('tab.profile', {
      url: '/profile',
      views: {
        'tab-profile': {
          templateUrl: 'templates/tab-profile.html',
          controller: 'ProfileCtrl'
        }
      }
    });
})
.run(function() {
  _500px.init({
    sdk_key: "b4512a8c50b7f1cbea9765e16d0552095847d76d"
  });
});
