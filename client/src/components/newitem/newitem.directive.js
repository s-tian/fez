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
    ControllerFunction.$inject = ['$scope', 'dataService', '$timeout'];
    function ControllerFunction($scope, dataService, $timeout) {
        var vm = this;
        //Initializing UI variables
        vm.barOpen = false;
        vm.barActive = false;
        //

        vm.add_inp = "";

        //In order to not spam the API, only query in intervals.
        var QUERY_INTERVAL = 1000;  //in milliseconds
        vm.lastQuery = 0;   //Make the first query run instantly
        vm.previewResults = null;
        vm.nextQueryStr = null;

        vm.queue_update = function(query) {
            if(query=="") {
                return;
            }
            vm.previewResults = dataService.getPreview(query);

            /*var curr_time = Date.now();
            vm.nextQueryStr = query;
            if(curr_time - vm.lastQuery > 200) {
                vm.previewResults = dataService.getPreview(query);
            } else {
                if(vm.nextQueryStr != null) {
                    vm.nextQueryStr = query;
                } else {
                    $timeout(function() {
                        vm.previewResults = dataService.getPreview(vm.nextQueryStr);
                    }, 200-curr_time-vm.lastQuery);   
                }
            }
            vm.lastQuery = curr_time;
            vm.nextQueryStr = null;
            */
        }
    };
})();
