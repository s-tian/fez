(function() {
    'use strict';

    angular.module('app', [
        // Common (everybody has access to these)
        'app.core',

        // Features
        'app.approot',
        'app.dashboard',
        'app.topnav',
        'app.login',
        'app.register',
        'app.profile'
    ]);
})();
