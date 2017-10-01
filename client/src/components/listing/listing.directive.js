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

        vm.user = {};

        vm.windowWidth = $window.innerWidth;

        dataService.getProfile()
        .success(function(data) {
            vm.user = data;
        })
        .error(function (e) {
            console.log(e);
        });

        vm.searchBarEntry = {
            text: ""
        }

        vm.test_movie_list = [
            {
                title: "Spiderman",
                poster_url: "http://image.tmdb.org/t/p/w500//rZd0y1X1Gw4t5B3f01Qzj8DYY66.jpg"
            },
            {
                title: "Spiderman",
                poster_url: "http://image.tmdb.org/t/p/w500//rZd0y1X1Gw4t5B3f01Qzj8DYY66.jpg"
            },
            {
                title: "Spiderman",
                poster_url: "http://image.tmdb.org/t/p/w500//rZd0y1X1Gw4t5B3f01Qzj8DYY66.jpg"
            },
            {
                title: "Spiderman",
                poster_url: "http://image.tmdb.org/t/p/w500//rZd0y1X1Gw4t5B3f01Qzj8DYY66.jpg"
            },
            {
                title: "Spiderman",
                poster_url: "http://image.tmdb.org/t/p/w500//rZd0y1X1Gw4t5B3f01Qzj8DYY66.jpg"
            },
            {
                title: "Spiderman",
                poster_url: "http://image.tmdb.org/t/p/w500//rZd0y1X1Gw4t5B3f01Qzj8DYY66.jpg"
            },
            {
                title: "Spiderman",
                poster_url: "http://image.tmdb.org/t/p/w500//rZd0y1X1Gw4t5B3f01Qzj8DYY66.jpg"
            },
            {
                title: "Spiderman",
                poster_url: "http://image.tmdb.org/t/p/w500//rZd0y1X1Gw4t5B3f01Qzj8DYY66.jpg"
            },
            {
                title: "Spiderman",
                poster_url: "http://image.tmdb.org/t/p/w500//rZd0y1X1Gw4t5B3f01Qzj8DYY66.jpg"
            },
            {
                title: "Spiderman",
                poster_url: "http://image.tmdb.org/t/p/w500//rZd0y1X1Gw4t5B3f01Qzj8DYY66.jpg"
            },
            {
                title: "Spiderman",
                poster_url: "http://image.tmdb.org/t/p/w500//rZd0y1X1Gw4t5B3f01Qzj8DYY66.jpg"
            }
        ]

        vm.update = function() {
            dataService.getProfile()
            .success(function(data) {
                vm.user = data;
            })
            .error(function (e) {
                console.log(e);
            });
        }

        $scope.$on('update', function (e, event) {
            vm.update();
        });

        
    }
})();
