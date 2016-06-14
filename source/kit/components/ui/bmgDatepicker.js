(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('bmgDatepicker', bmgDatepicker);

    function bmgDatepicker() {
        return {
            replace: true,
            require: 'ngModel',
            templateUrl: 'bmg/template/datepicker/control.html',
            controller: 'BmgDatepickerController as bmgDatepickerCtrl',
            link: function(scope, elem, attrs, ngModelCtrl) {
                scope.selectedDate = {
                    value: scope.$eval(attrs.ngModel)
                };

                scope.updateDate = function() {
                    ngModelCtrl.$setViewValue(scope.selectedDate.value);
                };
            }
        };
    }
})();
