(function () {
    'use strict';

    var core = angular.module('app.core');

    core.config(configFunction);

    configFunction.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

    /* @ngInject */
    function configFunction($locationProvider, $stateProvider, $urlRouterProvider) {

        $locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('dashboard', {
                url: '/',
                template: '<tmpl-dashboard></tmpl-dashboard>'
            });
        $stateProvider
            .state('login', {
                url: '/login',
                template: '<login></login>',
                params: {
                    error: ""
                }
            });
        $stateProvider
            .state('register', {
                url: '/register',
                template: '<register></register>'
            });
        $stateProvider
            .state('profile', {
                url: '/profile',
                template: '<profile></profile>'
            })
    }
})();
