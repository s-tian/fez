(function() {
  'use strict';

  angular
    .module('core.data')
    .service('dataService', dataService);

  dataService.$inject = ['$http', 'authentication'];
  function dataService ($http, authentication) {

    var state = {animationStarted: false};

    var getProfile = function () {
      return $http.get('http://localhost:3000/api/user', {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };

    var addMovie = function (movie_data) {
      return $http.post('http://localhost:3000/api/add', {"movie_data": movie_data} ,{
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };

    var deleteMovie = function (id) {
      return $http.post('http://localhost:3000/api/delete', {"id": id} ,{
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };

    var setWatchedMovie = function (id) {
      return $http.post('http://localhost:3000/api/watched', {"id": id} ,{
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };

    var getPreview = function(query) {
      return $http.post('http://localhost:3000/api/preview', {"query": query}, {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    }

    var getPopular = function() {
      return $http.get('http://localhost:3000/api/popular', {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    }

    return {
      getProfile : getProfile,
      addMovie : addMovie,
      deleteMovie: deleteMovie,
      setWatchedMovie: setWatchedMovie,
      getPreview: getPreview,
      getPopular: getPopular,
      state: state
    };
  }

})();
