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

    var addMovie = function (title) {
      return $http.post('http://localhost:8080/api/add', {"title": title} ,{
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };

    var deleteMovie = function (id) {
      return $http.post('http://localhost:8080/api/delete', {"id": id} ,{
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };

    var getPreview = function(query) {
      return $http.post('http://localhost:8080/api/preview', {"query": query}, {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    }

    return {
      getProfile : getProfile,
      addMovie : addMovie,
      deleteMovie: deleteMovie,
      getPreview: getPreview
    };
  }

})();