(function(undefined) {
    'use strict';

    angular
        .module('bmg-ui.docs')
        .directive('bmgDatepicker', bmgDatepicker);

    function bmgDatepicker() {
        return {
            replace: true,
            require: 'ngModel',
            templateUrl: 'bmg/template/datepicker/control.html',
            controller: 'BmgDatepickerController as bmgDatepickerCtrl',
            link: function(scope, elem, attrs, ngModelCtrl) {
                //console.log('model value: ', ngModelCtrl.$viewValue);
            }
        };
    }
})();
