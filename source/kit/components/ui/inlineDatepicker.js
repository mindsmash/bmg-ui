(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('inlineDatepicker', inlineDatepicker);

    function inlineDatepicker($timeout) {
        return {
            replace: true,
            scope: {
                ngModel: '=',
                placeholder: '@?',
                oncommit: '&?',
                datepickerOptions: '=?',
                popupPlacement: '@?',
                dateFormat: '@?'
            },
            templateUrl: 'bmg/template/inline/datepicker.html',
            require: 'ngModel',
            link: function(scope, elem, attrs, ngModel) {
                $timeout(function() {
                    var successIndicator = elem.find('.success-indicator');
                    var inputElem = elem.find('.inline-datepicker');

                    scope.popup = {
                        opened: false
                    };

                    scope.open = function() {
                        this.popup.opened = true;
                    };

                    scope.updateDate = function() {
                        $timeout(function() {
                            // timeout necessary because $viewValue
                            // lags one step behind otherwise
                            if (angular.isDefined(scope.oncommit) &&
                                angular.isDefined(ngModel.$viewValue)) {
                                // show success indication
                                successIndicator.css('opacity', '1');

                                $timeout(function() {
                                    successIndicator.css('opacity', '0');
                                }, 500);

                                // publish new value
                                scope.oncommit({
                                    $data: ngModel.$viewValue
                                });
                            }
                        });
                    };
                });
            }
        };
    }
})();
