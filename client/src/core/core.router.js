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
            .state('front', {
                url: '/',
                template: '<tmpl-front></tmpl-front>'
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
            .state('listing', {
                url: '/listing',
                template: '<listing></listing>'
            })
    }
})();
