(function () {

    'use strict';

    angular.module('app.listing')
    .directive('listing', directiveFunction)
    .controller('ListingController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/listing/listing.html',
            scope: {
            },
            controller: 'ListingController',
            controllerAs: 'vm'
        };

        return directive;
    }


    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['$scope', '$window', '$location', '$state', '$stateParams', 'authentication', 'dataService'];
    function ControllerFunction($scope, $window, $location, $state, $stateParams, authentication, dataService) {

        if(!authentication.isLoggedIn()) {
            $state.go("login", {error: "You must login first!"});
        }

        var vm = this;
        
        function sortListByWatched(movie_list) {
            return movie_list.sort(function(a, b) {
                if(a.watched == b.watched) {
                    return 0;
                } else if (b.watched) {
                    return -1;
                }
                return 1;
            });
        }

        vm.update = function() {
            dataService.getProfile()
            .success(function(data) {
                vm.user = data;
                if(vm.user != null) {
                    vm.user.movie_list = sortListByWatched(vm.user.movie_list);
                } else {
                    vm.user = {"movie_list": []};
                }
            })
            .error(function (e) {
                console.log(e);
            });
        }
        // Allow events emitted by isolate scope subcomponents 
        // to update the state of the list.
        $scope.$on('update', function (e, event) {
            vm.update();
        });

        vm.user = {};

        vm.windowWidth = $window.innerWidth;

        vm.update();
    
        vm.searchBarEntry = {
            text: ""
        }
    }
})();
