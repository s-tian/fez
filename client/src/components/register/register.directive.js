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
          email : "",
          password : "",
          password_confirm: ""
      };

      vm.onSubmit = function () {
          console.log('Submitting registration');
          if(vm.credentials.password !== vm.credentials.password_confirm) {
            vm.errorMessage = "Your passwords didn't match."
        } else {
            authentication
            .register(vm.credentials)
            .error(function(err){
              console.log(err);
              if(err === null) {
                vm.errorMessage = "Something went wrong with the server :("; 
            } else {
                vm.errorMessage = err.message;
            }
        })
            .then(function(){
              $state.go('dashboard');
          });
        }
    };

}

})();
