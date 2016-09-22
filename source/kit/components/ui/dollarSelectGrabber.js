(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('dollarSelectGrabber', dollarSelectGrabber);

    dollarSelectGrabber.$inject = ['$rootScope', '$timeout'];

    function dollarSelectGrabber($rootScope, $timeout) {
        return {
            restrict: 'A',
            require: 'uiSelect',
            link: function(scope, elem, attrs, $select) {
                $timeout(function() {
                    $rootScope.$broadcast(
                        '$selectController',
                        $select,
                        attrs.identifier
                    );
                });
            }
        };
    }
})();
