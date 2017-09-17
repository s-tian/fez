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


    ControllerFunction.$inject = ['$state', 'authentication'];
    function ControllerFunction($state, authentication) {

        var vm = this;

        vm.credentials = {
          email : "",
          password : ""
        };

        vm.onSubmit = function () {
          authentication
            .login(vm.credentials)
            .error(function(err){
              alert(err);
            })
            .then(function(){
              $state.go('dashboard');
            });
        };

      }

})();