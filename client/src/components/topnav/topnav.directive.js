(function () {
    'use strict';

    angular
        .module('app.topnav')
        .directive('tmplTopnav', directiveFunction)
        .controller('TopnavController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/topnav/topnav.html',
            scope: {
            },
            controller: 'TopnavController',
            controllerAs: 'vm'
        };

        return directive;
    }

    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['authentication'];

    /* @ngInject */
    function ControllerFunction(authentication) {
        var vm = this;
        vm.isCollapsed = true;
        vm.authentication = authentication;
    }

})();
