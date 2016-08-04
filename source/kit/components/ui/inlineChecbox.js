(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('inlineCheckbox', inlineCheckbox);

    function inlineCheckbox($timeout) {
        return {
            replace: true,
            scope: {
                ngModel: '=',
                oncommit: '&'
            },
            templateUrl: 'bmg/template/inline/checkbox.html',
            require: 'ngModel',
            link: function(scope, elem, attrs, ngModel) {
                $timeout(function() {
                    var labelElem = $(elem).find('label');
                    var checkboxElem = $(elem).find('input');
                    var successIndicator = $(elem).find('.success-indicator');

                    // internal label support
                    labelElem.on('click', function() {
                        toggleModel();
                    });

                    // global label support
                    $('body').find('label[for="' + attrs.id + '"]').on('click', function() {
                        toggleModel();
                    });

                    function toggleModel() {
                        ngModel.$setViewValue(!ngModel.$viewValue);

                        if (scope.oncommit) {
                            scope.oncommit({
                                $data: ngModel.$viewValue
                            });
                        }

                        animateSuccessIndicator();
                    }

                    function animateSuccessIndicator() {
                        successIndicator.addClass('active');

                        $timeout(function() {
                            successIndicator.removeClass('active');
                        }, 500);
                    }
                });
            }
        };
    }
})();
