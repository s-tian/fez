(function () {

    'use strict';

    angular.module('app.profile')
        .directive('profile', directiveFunction)
        .controller('ProfileController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/profile/profile.html',
            scope: {
            },
            controller: 'ProfileController',
            controllerAs: 'vm'
        };

        return directive;
    }


    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['$location', 'dataRetrieve'];
    function ControllerFunction($location, dataRetrieve) {
        var vm = this;

        vm.user = {};

        dataRetrieve.getProfile()
          .success(function(data) {
            vm.user = data;
          })
          .error(function (e) {
            console.log(e);
          });
    }
})();
