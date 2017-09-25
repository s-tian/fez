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
    };
})();
