(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('bmgAlert', bmgAlert);

    bmgAlert.$inject = [];

    function bmgAlert() {
        return {
            replace: true,
            templateUrl: 'bmg/template/alert.html',
            scope: {
                type: '@',
                icon: '@?'
            },
            transclude: true,
            bindToController: true,
            controller: function() {},
            controllerAs: 'ctrl'
        };
    }
})();
