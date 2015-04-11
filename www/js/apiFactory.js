(function (){
  "use strict";

  function ApiFactory() {
    return {
      api: getApi
    };

    function getApi() {

    }
  }
  ApiFactory.$inject = [];

  angular.module("500px.services")
    .factory("ApiFactory", ApiFactory);
}());
