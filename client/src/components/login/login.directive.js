(function () {

    'use strict';

    angular.module('app.login')
        .directive('login', directiveFunction)
        .controller('LoginController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/login/login.html',
            scope: {
            },
            controller: 'LoginController',
            controllerAs: 'vm'
        };

        return directive;
    }


    ControllerFunction.$inject = ['$state', '$stateParams', 'authentication'];  
    function ControllerFunction($state, $stateParams, authentication) {

        var vm = this;

        vm.errorMessage = $stateParams.error;

        vm.credentials = {
          email : "",
          password : ""
        };

        vm.onSubmit = function () {
          authentication
            .login(vm.credentials)
            .error(function(err){
                console.log(err);
                if(err === null) {
                    vm.errorMessage = "Something went wrong with the server :("; 
                } else {
                    vm.errorMessage = err.message;
                }
            })
            .then(function(){
              $state.go('listing');
            });
        };

      }

})();
