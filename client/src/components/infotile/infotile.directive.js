(function () {

    'use strict';

    angular.module('app.listing.infotile')
    .directive('infotile', directiveFunction)
    .controller('InfoTileController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/infotile/infotile.html',
            scope: {
                movie: '=movie'
            },
            controller: 'InfoTileController',
            controllerAs: 'vm'
        };

        return directive;
    }


    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['$scope', 'dataService'];
    function ControllerFunction($scope, dataService) {
        var vm = this;
        // console.log($scope.movie.runtime);
        vm.deleteMovie = function() {
            dataService.deleteMovie($scope.movie._id)
            .error(function(err){
                console.log(err);
                if(err === null) {
                    vm.errorMessage = "Something went wrong with the server :("; 
                } else {
                    vm.errorMessage = err.message;
                }
            }).then(function() {
                $scope.$emit('update');
            })
        };

        vm.setWatchedMovie = function() {
            dataService.setWatchedMovie($scope.movie._id)
            .error(function(err){
                console.log(err);
                if(err === null) {
                    vm.errorMessage = "Something went wrong with the server :("; 
                } else {
                    vm.errorMessage = err.message;
                }
            }).then(function() {
                $scope.$emit('update');
            })
        };

        vm.getPosterUrl = function() {
            return "https://image.tmdb.org/t/p/w500/" + $scope.movie.poster_url;
        }
    };
})();
