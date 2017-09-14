(function() {
  'use strict';

  angular
    .module('core.data')
    .service('dataRetrieve', dataRetrieve);

  dataRetrieve.$inject = ['$http', 'authentication'];
  function dataRetrieve ($http, authentication) {

    var getProfile = function () {
      return $http.get('http://localhost:8080/api/profile', {
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