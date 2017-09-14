(function () {

    'use strict';

    angular.module('app.register')
        .directive('register', directiveFunction)
        .controller('RegisterController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/register/register.html',
            scope: {
            },
            controller: 'RegisterController',
            controllerAs: 'vm'
        };

        return directive;
    }


    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['$state', 'authentication'];
    function ControllerFunction($state, authentication) {
        var vm = this;

        vm.credentials = {
          name : "",
          email : "",
          password : ""
        };

        vm.onSubmit = function () {
          console.log('Submitting registration');
          authentication
            .register(vm.credentials)
            .error(function(err){
              alert(err);
            })
            .then(function(){
              $state.go('dashboard');
            });
        };

    }

})();
