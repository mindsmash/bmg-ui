(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('inlineText', inlineText);

    function inlineText($timeout, utilService, keyConstants) {
        return {
            replace: true,
            scope: {
                ngModel: '=',
                placeholder: '@',
                oncommit: '&',
                tabindex: '@?',
                disabled: '=?',
                inputType: '@?'
            },
            templateUrl: 'bmg/template/inline/text.html',
            require: 'ngModel',
            link: function(scope, elem, attrs, ngModel) {
                // timeout necessary, otherview $viewValue is still NaN
                $timeout(function() {
                    // save original input value for undo
                    var initialValue = ngModel.$viewValue;
                    var container = $(elem).closest('.inline-edit-container');
                    var undoBtn = $(elem).find('.revert-button');
                    var inputElem = $(elem).find('.inline-text');

                    // set input type for validation
                    if (scope.inputType) {
                        inputElem.attr('type', scope.inputType);
                    }

                    inputElem.focus(function() {
                        // update initial value on new focus
                        initialValue = ngModel.$viewValue;

                        // inform tabbable form about focus change
                        if (scope.tabindex) {
                            scope.$emit('inline-form.focus-changed', parseInt(scope.tabindex, 10));
                        }
                    });

                    inputElem.blur(function() {
                        utilService.hideUndoBtn(undoBtn);

                        // show visual indicator of possible change
                        $timeout(function() {
                            if (ngModel.$viewValue !== initialValue) {
                                // call the callback function with the new input value
                                var commitPromise = angular.isDefined(scope.oncommit) ?
                                    scope.oncommit({
                                        $data: inputElem.val()
                                    }) : undefined;

                                if (utilService.isPromise(commitPromise)) {
                                    animateSuccessIndicator(commitPromise);
                                } else {
                                    animateSuccessIndicator();
                                }
                            }
                        }, 100); // to make sure this happens after undo button click
                    });

                    inputElem.on('keyup change', function(e) {
                        if (e.keyCode === keyConstants.ENTER_KEY ||
                            e.which === keyConstants.ENTER_KEY) {
                            // ENTER pressed -> commit and leave
                            inputElem.blur();
                        } else if (e.keyCode === keyConstants.ESCAPE_KEY ||
                            e.which === keyConstants.ESCAPE_KEY) {
                            // ESCAPE pressed -> undo and leave
                            ngModel.$setViewValue(initialValue);
                            inputElem.blur();
                        }

                        var newValue = inputElem.val();

                        if (newValue != initialValue) {
                            utilService.showUndoBtn(undoBtn);
                        } else {
                            utilService.hideUndoBtn(undoBtn);
                        }
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

                    function animateSuccessIndicator(commitPromise) {
                        container.removeClass('has-error');

                        if (commitPromise) {
                            // animate spinner first until promise resolves
                            utilService.showUndoBtn(undoBtn);
                            undoBtn
                                .find('i')
                                .removeClass('fa-undo')
                                .addClass('fa-spin fa-spinner');

                            commitPromise.then(function() {
                                undoBtn
                                    .find('i')
                                    .removeClass('fa-undo fa-spin fa-spinner')
                                    .addClass('fa-check');

                                endAnimation();
                            }, function(error) {
                                undoBtn
                                    .find('i')
                                    .removeClass('fa-undo fa-spin fa-spinner')
                                    .addClass('fa-remove');

                                container.addClass('has-error');
                                scope.errorMessage = error;

                                endAnimation();
                            });
                        } else {
                            // switch to success
                            undoBtn
                                .find('i')
                                .removeClass('fa-undo')
                                .addClass('fa-check');
                            utilService.showUndoBtn(undoBtn);

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
