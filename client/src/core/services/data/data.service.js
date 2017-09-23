(function() {
  'use strict';

  angular
    .module('core.data')
    .service('dataService', dataService);

  dataService.$inject = ['$http', 'authentication'];
  function dataService ($http, authentication) {

    var getProfile = function () {
      return $http.get('http://localhost:8080/api/user', {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };


    return {
      getProfile : getProfile
    };
  }

})();