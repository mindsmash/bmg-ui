(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .factory('miscService', miscService);

    function miscService() {
        return {
            isPromise: isPromise
        };

        function isPromise(promise) {
            return angular.isDefined(promise) &&
                angular.isDefined(promise.then) &&
                angular.isFunction(promise.then);
        }
    }
})();
