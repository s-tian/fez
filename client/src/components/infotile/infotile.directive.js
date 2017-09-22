(function () {

    'use strict';

    angular.module('app.listing.searchbar')
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
    ControllerFunction.$inject = ['$scope'];
    function ControllerFunction($scope) {
    };

})();
