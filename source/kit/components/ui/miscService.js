(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .factory('miscService', miscService);

    function miscService() {
        return {
            isPromise: isPromise,
            ENTER_KEY: 13,
            ESCAPE_KEY: 27
        };

        function isPromise(promise) {
            // if it looks like a promise and walks like a promise …
            return angular.isDefined(promise) &&
                angular.isDefined(promise.then) &&
                angular.isFunction(promise.then);
        }
    }
})();
