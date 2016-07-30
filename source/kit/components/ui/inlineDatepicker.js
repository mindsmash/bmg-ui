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
                    var successIndicator = elem.find('.success-indicator');

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

    function InlineDatepickerCtrl() {
        this.popup = {
            opened: false
        };

        this.open = function() {
            this.popup.opened = true;
        };
    }
})();
