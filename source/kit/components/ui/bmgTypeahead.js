(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('bmgTypeahead', bmgTypeahead);

    function bmgTypeahead() {
        return {
            replace: true,
            require: 'ngModel',
            templateUrl: 'bmg/template/typeahead/control.html',
            link: function(scope, elem, attrs, ngModelCtrl) {
                scope.selectedValue = scope.$eval(attrs.ngModel);

                scope.updateModel = function() {
                    ngModelCtrl.$setViewValue(scope.selectedValue);
                };
            }
        };
    }
})();
