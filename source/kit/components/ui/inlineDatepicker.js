(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('inlineDatepicker', inlineDatepicker)
        .controller('InlineDatepickerCtrl', InlineDatepickerCtrl);

    function inlineDatepicker($timeout) {
        return {
            replace: true,
            scope: {
                ngModel: '=',
                placeholder: '@?',
                oncommit: '&?'
            },
            templateUrl: 'bmg/template/inline/datepicker.html',
            require: 'ngModel',
            controller: 'InlineDatepickerCtrl',
            controllerAs: 'ctrl',
            link: function(scope, elem, attrs, ngModel) {
                $timeout(function() {
                    scope.updateDate = function() {};
                });
            }
        };
    }

    function InlineDatepickerCtrl() {
        this.popup = {
            opened: false
        };

        this.open = function() {
            this.popup.opened = true;
        };
    }
})();
