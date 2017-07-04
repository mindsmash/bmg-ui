(function (undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('inlineTypeahead', inlineTypeahead);

    inlineTypeahead.$inject = ['$timeout', 'utilService', 'keyConstants'];

    function inlineTypeahead($timeout, utilService, keyConstants) {
        return {
            replace: true,
            scope: {
                ngModel: '=',
                ngModelOptions: '=',
                displayProperty: '=?',
                format: '&?',
                placeholder: '@',
                oncommit: '&',
                items: '=',
                disabled: '=?',
                tabindex: '@?'
            },
            templateUrl: function (element, attrs) {
                return 'bmg/template/inline/' + (!!attrs.async ? 'async-' : '') + 'typeahead.html';
            },
            require: 'ngModel',
            link: function (scope, elem, attrs, ngModel) {
                $timeout(function () {
                    // save original input value for undo
                    var initialValue = ngModel.$viewValue;
                    var undoBtn = $(elem).find('.revert-button');
                    var inputElem = $(elem).find('.inline-typeahead');
                    var container = $(elem).closest('.inline-edit-container');

                    scope.loading = false;
                    scope.noResults = false;

                    scope.formatItem = formatItem;
                    scope.handleOnSelect = handleOnSelect;
                    scope.handleUndoBtnVisibility = handleUndoBtnVisibility;
                    scope.focusHandler = focusHandler;
                    scope.blurHandler = blurHandler;

                    function formatItem(data) {
                        if (!!data.item) {
                            if (typeof scope.format === 'function') {
                                return scope.format({data: data.item});
                            }
                            var displayProperty = scope.displayProperty;
                            //second check of 'data.item' is required...
                            if (!!displayProperty && !!data.item && _.has(data.item, displayProperty)) {
                                return data.item[displayProperty];
                            }
                            return data.item;
                        }
                        return data;
                    }

                    function handleOnSelect($item, $model, $label, $event) {
                        initialValue = $item;
                        commitValue($item);
                        scope.handleUndoBtnVisibility();
                    }

                    function handleUndoBtnVisibility() {
                        $timeout(function () {
                            // timeout necessary because $viewValue would lag
                            // one character behind otherwise
                            var newValue = ngModel.$viewValue;

                            if (newValue != initialValue) {
                                utilService.showUndoBtn(undoBtn);
                            } else {
                                utilService.hideUndoBtn(undoBtn);
                            }
                        });
                    }

                    function commitValue(newValue) {
                        $timeout(function () {
                            utilService.hideUndoBtn(undoBtn);
                                // call the callback function with the new input value
                                var commitPromise = angular.isDefined(scope.oncommit) ? scope.oncommit(
                                        {$data: newValue}) : undefined;

                                if (utilService.isPromise(commitPromise)) {
                                    utilService.animateSuccessIndicator(commitPromise, undoBtn, container,
                                            function (message) {
                                                scope.errorMessage = message;
                                            }
                                    );
                                } else {
                                    utilService.animateSuccessIndicator(undefined, undoBtn, container,
                                            function (message) {
                                                scope.errorMessage = message;
                                            }
                                    );
                                }
                        }, 150); // to make sure this happens after undo button click
                    }

                    function focusHandler() {
                        // inform tabbable form about focus change
                        if (scope.tabindex) {
                            scope.$emit('inline-form.focus-changed', parseInt(scope.tabindex, 10));
                        }
                    }

                    function blurHandler() {
                        commitValue(ngModel.$viewValue);
                    }

                    scope.$on('inline-form.focus-required', function (event, index) {
                        if (scope.tabindex && parseInt(scope.tabindex, 10) === index) {
                            inputElem.focus();
                        }
                    });

                    function resetViewValue() {
                        ngModel.$setViewValue(initialValue);
                    }

                    undoBtn.click(function () {
                        resetViewValue();
                        utilService.hideUndoBtn(undoBtn);
                        inputElem.trigger('focus');
                    });

                    inputElem.on('keyup', function (e) {
                        if (e.keyCode === keyConstants.ENTER_KEY ||
                                e.which === keyConstants.ENTER_KEY) {
                            // ENTER pressed
                            inputElem.blur();
                        } else if (e.keyCode === keyConstants.ESCAPE_KEY ||
                                e.which === keyConstants.ESCAPE_KEY) {
                            // ESCAPE pressed
                            resetViewValue();
                            inputElem.blur();
                        }
                    });

                    // label support
                    utilService.addLabelSupport(attrs.id, function () {
                        inputElem.trigger('focus');
                    });
                });
            }
        };
    }
})();
