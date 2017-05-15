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
                ngModelOptions: '=?',
                placeholder: '@?',
                oncommit: '&?',
                datepickerOptions: '=?',
                popupPlacement: '@?',
                dateFormat: '@?',
                showButtonBar: "=?",
                disabled: '=?',
                tabindex: '@?'
            },
            templateUrl: 'bmg/template/inline/datepicker.html',
            require: 'ngModel',
            link: function(scope, elem, attrs, ngModel) {
                $timeout(function() {
                    var initialValue = ngModel.$viewValue || null;
                    var successIndicator = elem.find('.success-indicator');
                    var inputElem = elem.find('.inline-datepicker');
                    var undoBtn = elem.find('.revert-button');
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
                                    utilService.showUndoBtn(undoBtn);
                                }
                            } else {
                                utilService.hideUndoBtn(undoBtn);
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

                        // inform tabbable form about focus change
                        if (scope.tabindex) {
                            scope.$emit('inline-form.focus-changed', parseInt(scope.tabindex, 10));
                        }
                    });

                    inputElem.on('blur', function() {
                        $timeout(function() {
                            utilService.hideUndoBtn(undoBtn);

                            // reject nonsense input
                            if (!angular.isDefined(ngModel.$viewValue)) {
                                ngModel.$setViewValue(initialValue);
                                return;
                            }

                            if (hasActuallyChanged()) {
                                // actual change detected
                                // animate success
                                publish();
                            }
                        }, 100);
                    });

                    scope.$on('inline-form.focus-required', function(event, index) {
                        if (scope.tabindex && parseInt(scope.tabindex, 10) === index) {
                            inputElem.focus();
                        }
                    });

                    undoBtn.click(function() {
                        ngModel.$setViewValue(initialValue);
                        utilService.hideUndoBtn(undoBtn);
                        inputElem.focus();
                    });

                    function hasActuallyChanged() {
                        if (!ngModel.$viewValue && !initialValue) {
                            return false;
                        }

                        if (!ngModel.$viewValue && initialValue) {
                            return true;
                        }

                        if (ngModel.$viewValue && !initialValue) {
                            return true;
                        }

                        if(typeof initialValue.getTime === 'undefined' || typeof ngModel.$viewValue.getTime === 'undefined') {
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
                                utilService.animateSuccessIndicator(
                                    commitPromise, undoBtn, container, function(message) {
                                        scope.errorMessage = message;
                                    }
                                );
                            } else {
                                utilService.animateSuccessIndicator(
                                    undefined, undoBtn, container, function(message) {
                                        scope.errorMessage = message;
                                    }
                                );
                            }
                        }
                    }

                    // label support
                    utilService.addLabelSupport(attrs.id, function() {
                        inputElem.trigger('focus');
                    });
                });
            }
        };
    }
})();
