(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('inlineTypeahead', inlineTypeahead);

    function inlineTypeahead($timeout, utilService, keyConstants) {
        return {
            replace: true,
            scope: {
                ngModel: '=',
                placeholder: '@',
                oncommit: '&',
                items: '=',
                disabled: '=?',
                tabindex: '@?'
            },
            templateUrl: 'bmg/template/inline/typeahead.html',
            require: 'ngModel',
            link: function(scope, elem, attrs, ngModel) {
                $timeout(function() {
                    // save original input value for undo
                    var initialValue = ngModel.$viewValue;
                    var undoBtn = $(elem).find('.revert-button');
                    var inputElem = $(elem).find('.inline-typeahead');
                    var container = $(elem).closest('.inline-edit-container');

                    scope.handleUndoBtnVisibility = function() {
                        $timeout(function() {
                            // timeout necessary because $viewValue would lag
                            // one character behind otherwise
                            var newValue = ngModel.$viewValue;

                            if (newValue != initialValue) {
                                utilService.showUndoBtn(undoBtn);
                            } else {
                                utilService.hideUndoBtn(undoBtn);
                            }
                        });
                    };

                    scope.focusHandler = function() {
                        // update initial value on new focus
                        initialValue = ngModel.$viewValue;

                        // inform tabbable form about focus change
                        if (scope.tabindex) {
                            scope.$emit('inline-form.focus-changed', parseInt(scope.tabindex, 10));
                        }
                    };

                    scope.blurHandler = function() {
                        // show visual indicator of possible change
                        var oldInitialValue = initialValue;

                        $timeout(function() {
                            utilService.hideUndoBtn(undoBtn);

                            var newNgModel = ngModel.$viewValue;

                            if (newNgModel !== oldInitialValue) {
                                // call the callback function with the new input value
                                var commitPromise = angular.isDefined(scope.oncommit) ?
                                    scope.oncommit({
                                        $data: newNgModel
                                    }) : undefined;

                                if (utilService.isPromise(commitPromise)) {
                                    animateSuccessIndicator(commitPromise);
                                } else {
                                    animateSuccessIndicator();
                                }
                            }
                        }, 100); // to make sure this happens after undo button click
                    };

                    scope.$on('inline-form.focus-required', function(event, index) {
                        if (scope.tabindex && parseInt(scope.tabindex, 10) === index) {
                            inputElem.focus();
                        }
                    });

                    undoBtn.click(function() {
                        ngModel.$setViewValue(initialValue);
                        utilService.hideUndoBtn(undoBtn);
                        inputElem.trigger('focus');
                    });

                    inputElem.on('keyup', function(e) {
                        if (e.keyCode === keyConstants.ENTER_KEY ||
                            e.which === keyConstants.ENTER_KEY) {
                            // ENTER pressed
                            inputElem.blur();
                        } else if (e.keyCode === keyConstants.ESCAPE_KEY ||
                            e.which === keyConstants.ESCAPE_KEY) {
                            // ESCAPE pressed
                            ngModel.$setViewValue(initialValue);
                            inputElem.blur();
                        }
                    });

                    function animateSuccessIndicator(commitPromise) {
                        container.removeClass('has-error');
                        utilService.showUndoBtn(undoBtn);

                        if (commitPromise) {
                            undoBtn
                                .find('i')
                                .removeClass('fa-undo')
                                .addClass('fa-spin fa-spinner');

                            commitPromise.then(function() {
                                undoBtn
                                    .find('i')
                                    .removeClass('fa-spin fa-spinner')
                                    .addClass('fa-check');
                                endAnimation();
                            }, function(error) {
                                undoBtn
                                    .find('i')
                                    .removeClass('fa-spin fa-spinner')
                                    .addClass('fa-remove');
                                container.addClass('has-error');
                                scope.errorMessage = error;

                                endAnimation();
                            });
                        } else {
                            undoBtn
                                .find('i')
                                .removeClass('fa-undo')
                                .addClass('fa-check');
                            endAnimation();
                        }
                    }

                    function endAnimation() {
                        $timeout(function() {
                            utilService.hideUndoBtn(undoBtn);
                        }, 500);

                        $timeout(function() {
                            undoBtn
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
