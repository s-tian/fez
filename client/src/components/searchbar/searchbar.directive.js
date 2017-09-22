(function () {

    'use strict';

    angular.module('app.listing.searchbar')
    .directive('searchbar', directiveFunction)
    .controller('SearchBarController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/searchbar/searchbar.html',
            scope: {
            },
            controller: 'SearchBarController',
            controllerAs: 'vm'
        };

        return directive;
    }


    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['$scope'];
    function ControllerFunction($scope) {
    };

})();
