(function () {

    'use strict';

    angular.module('app.listing.newitem')
    .directive('newitem', directiveFunction)
    .controller('NewItemController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/newitem/newitem.html',
            scope: {
            },
            controller: 'NewItemController',
            controllerAs: 'vm'
        };

        return directive;
    }


    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['$scope', 'dataService'];
    function ControllerFunction($scope, dataService) {
        var vm = this;
        vm.barOpen = false;
        vm.barActive = false;
    };
})();
