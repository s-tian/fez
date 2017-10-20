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

        vm.addInp = "";

        //In order to not spam the API, only query in intervals.
        var QUERY_INTERVAL = 1000;  //in milliseconds
        vm.lastQuery = 0;   //Make the first query run instantly
        vm.previewResults = null;
        //vm.nextQueryStr = null;

        vm.makePosterUrl = function() {
            if(vm.previewResults == null) {
                return "";
            }
            //console.log(vm.previewResults);
            return "https://image.tmdb.org/t/p/w500/" + vm.previewResults.poster_path;
        }

        vm.setBarActive = function(b) {
            vm.barActive = b;
            vm.previewResults = null;
            vm.addInp = "";
        }

        vm.addNew = function(movieData) {
            dataService.addMovie(movieData)
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
        
        vm.updateQueue = function(query) {
            if(query=="") {
                vm.previewResults = null;
                return;
            }
            dataService.getPreview(query)
            .success(function(data) {
                vm.previewResults = data;
            }).error(function(e) {
                console.log(e);
            })

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
