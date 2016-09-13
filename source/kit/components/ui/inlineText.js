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

                    // label support
                    utilService.addLabelSupport(attrs.id, function() {
                        inputElem.trigger('focus');
                    });
                });
            }
        };
    }
})();
