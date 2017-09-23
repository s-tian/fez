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
    ControllerFunction.$inject = ['$location', '$state', '$stateParams', 'authentication', 'dataService'];
    function ControllerFunction($location, $state, $stateParams, authentication, dataService) {

        if(!authentication.isLoggedIn()) {
            $state.go("login", {error: "You must login first!"});
        }

        var vm = this;

        vm.user = {};

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

    }
})();
