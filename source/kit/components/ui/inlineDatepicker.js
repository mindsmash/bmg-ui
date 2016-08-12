(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('inlineDatepicker', inlineDatepicker);

    function inlineDatepicker($timeout, utilService, keyConstants) {
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
                    var container = elem.closest('.inline-edit-container');

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
                                }
                            } else {
                                hideActionBtn();
                            }
                        });
                    };

                    inputElem.on('keyup', function(e) {
                        if (e.keyCode === keyConstants.ENTER_KEY ||
                            e.which === keyConstants.ENTER_KEY) {
                            // ENTER pressed
                            inputElem.blur();
                        } else if (e.keyCode === keyConstants.ESCAPE_KEY ||
                            e.which === keyConstants.ESCAPE_KEY) {
                            ngModel.$setViewValue(initialValue);
                            inputElem.blur();
                        }
                    });

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
                        if (!ngModel.$viewValue && initialValue) {
                            return true;
                        }

                        if (ngModel.$viewValue && !initialValue) {
                            return true;
                        }

                        return initialValue.getTime() !== ngModel.$viewValue.getTime();
                    }

                    function publish() {
                        if (angular.isDefined(scope.oncommit)) {
                            // publish new value
                            var commitPromise = angular.isDefined(scope.oncommit) ?
                                scope.oncommit({
                                    $data: ngModel.$viewValue
                                }) : undefined;

                            if (utilService.isPromise(commitPromise)) {
                                animateSuccessIndicator(commitPromise);
                            } else {
                                animateSuccessIndicator();
                            }
                        }
                    }

                    function showActionBtn() {
                        actionBtn.css('opacity', '1');
                    }

                    function hideActionBtn() {
                        actionBtn.css('opacity', '0');
                    }

                    function animateSuccessIndicator(commitPromise) {
                        container.removeClass('has-error');
                        showActionBtn();

                        if (commitPromise) {
                            actionBtn
                                .find('i')
                                .removeClass('fa-undo')
                                .addClass('fa-spin fa-spinner');

                            commitPromise.then(function() {
                                actionBtn
                                    .find('i')
                                    .removeClass('fa-spin fa-spinner')
                                    .addClass('fa-check');
                                endAnimation();
                            }, function(error) {
                                actionBtn
                                    .find('i')
                                    .removeClass('fa-spin fa-spinner')
                                    .addClass('fa-remove');
                                container.addClass('has-error');
                                scope.errorMessage = error;

                                endAnimation();
                            });
                        } else {
                            actionBtn
                                .find('i')
                                .removeClass('fa-undo')
                                .addClass('fa-check');
                            endAnimation();
                        }
                    }

                    function endAnimation() {
                        $timeout(function() {
                            hideActionBtn();
                        }, 500);

                        $timeout(function() {
                            actionBtn
                                .find('i')
                                .removeClass('fa-check fa-remove')
                                .addClass('fa-undo');
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
