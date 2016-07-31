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
                    var initialValue = ngModel.$viewValue;
                    var successIndicator = elem.find('.success-indicator');
                    var inputElem = elem.find('.inline-datepicker');
                    var actionBtn = elem.find('.revert-button');

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
                            if (hasActuallyChanged()) {
                                if (inputElem.is(':focus')) {
                                    // change was typed in the text field
                                    showActionBtn();
                                } else {
                                    // date was selected by clicking in the popup
                                    publish();
                                }
                            } else {
                                hideActionBtn();
                            }
                        });
                    };

                    inputElem.on('focus', function() {
                        initialValue = ngModel.$viewValue;
                    });

                    inputElem.on('blur', function() {
                        hideActionBtn();

                        $timeout(function() {
                            if (hasActuallyChanged()) {
                                // actual change detected
                                // animate success
                                publish();
                            }
                        }, 10);
                    });

                    actionBtn.click(function() {
                        ngModel.$setViewValue(initialValue);
                        hideActionBtn();
                        inputElem.focus();
                    });

                    function hasActuallyChanged() {
                        return (!angular.isDefined(ngModel.$viewValue) && angular.isDefined(initialValue)) ||
                            (angular.isDefined(ngModel.$viewValue) && !angular.isDefined(initialValue)) ||
                            initialValue.getTime() !== ngModel.$viewValue.getTime();
                    }

                    function publish() {
                        animateSuccessIndicator();

                        if (angular.isDefined(scope.oncommit)) {
                            // publish new value
                            scope.oncommit({
                                $data: ngModel.$viewValue
                            });
                        }
                    }

                    function showActionBtn() {
                        actionBtn.css('opacity', '1');
                    }

                    function hideActionBtn() {
                        actionBtn.css('opacity', '0');
                    }

                    function animateSuccessIndicator() {
                        actionBtn.find('i').removeClass('fa-undo').addClass('fa-check');
                        actionBtn.addClass('success');
                        showActionBtn();

                        $timeout(function() {
                            hideActionBtn();
                        }, 500);

                        $timeout(function() {
                            actionBtn.removeClass('success');
                            actionBtn.find('i').removeClass('fa-check').addClass('fa-undo');
                        }, 600);
                    }

                    // label support
                    if (attrs.id) {
                        var labels = $('body').find('label[for=' + attrs.id + ']');

                        labels.on('click', function() {
                            inputElem.trigger('focus');
                        });
                    }
                });
            }
        };
    }
})();
