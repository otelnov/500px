(function() {
  function _UserService($500px, $q) {
    var user;

    function getCurrent() {
      var deferred = $q.defer();

      if(user) {
        return deferred.resolve(user);
      }

      $500px.authorize()
        .then(function(api) {
          api("/users", function(response) {
            user = response.data;
            deferred.resolve(user);
          });
        }, function(reason) {
          deferred.reject(reason);
        });

      return deferred.promise;
    }

    function login() {

    }

    function logout() {

    }

    return {
      current: getCurrent,
      login: login,
      logout: logout
    };
  }
  _UserService.$inject = ["500px", "$q"];

  function _500pxService($q) {
    _500px.init({
      sdk_key: 'b4512a8c50b7f1cbea9765e16d0552095847d76d'
    });

    function authorize() {
       var deferred = $q.defer();

      _500px.loginCordova(function (status) {
        if (status === "authorized") {
          deferred.resolve(_500px.api.bind(_500px));
        } else {
          deferred.reject();
        }
      });

      return deferred.promise;
    }

    function logout() {

    }

    return {
      authorize: authorize,
      logout: logout
    };
  }
  _500pxService.$inject = ["$q"];

  angular.module("500px.services")
    .service("500px", _500pxService)
    .service("UserService", _UserService);
})();

//.factory('Chats', function() {
//  var chats = [{
//    id: 0,
//    name: 'Ben Sparrow',
//    lastText: 'You on your way?',
//    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
//  }, {
//    id: 1,
//    name: 'Max Lynx',
//    lastText: 'Hey, it\'s me',
//    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
//  }, {
//    id: 2,
//    name: 'Andrew Jostlin',
//    lastText: 'Did you get the ice cream?',
//    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
//  }, {
//    id: 3,
//    name: 'Adam Bradleyson',
//    lastText: 'I should buy a boat',
//    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
//  }, {
//    id: 4,
//    name: 'Perry Governor',
//    lastText: 'Look at my mukluks!',
//    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
//  }];
//
//  return {
//    all: function() {
//      return chats;
//    },
//    remove: function(chat) {
//      chats.splice(chats.indexOf(chat), 1);
//    },
//    get: function(chatId) {
//      for (var i = 0; i < chats.length; i++) {
//        if (chats[i].id === parseInt(chatId)) {
//          return chats[i];
//        }
//      }
//      return null;
//    }
//  }
//});
