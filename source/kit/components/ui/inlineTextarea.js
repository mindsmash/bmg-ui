(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('inlineTextarea', inlineTextarea);

    inlineTextarea.$inject = ['$timeout', 'utilService', 'keyConstants'];

    function inlineTextarea($timeout, utilService, keyConstants) {
        return {
            replace: true,
            scope: {
                ngModel: '=',
                placeholder: '@',
                oncommit: '&',
                tabindex: '@?',
                disabled: '=?',
                maxlength: '=',
                minlength: '='
            },
            templateUrl: 'bmg/template/inline/textarea.html',
            require: 'ngModel',
            link: function(scope, elem, attrs, ngModel) {
                // timeout necessary, otherview $viewValue is still NaN
                $timeout(function() {
                    // save original input value for undo
                    var initialValue = ngModel.$viewValue;
                    var container = $(elem).closest('.inline-edit-container');
                    var undoBtn = $(elem).find('.revert-button');
                    var inputElem = $(elem).find('.inline-textarea');
                    var maxLengthDefined = angular.isDefined(scope.maxlength);
                    var maxLength = parseInt(scope.maxlength, 10);

                    container.css('height', inputElem.css('height'));

                    scope.$on('elastic:resize', function(event, element, oldHeight, newHeight) {
                        container.css('height', newHeight + 'px');
                    });

                    inputElem.focus(function() {
                        // update initial value on new focus
                        initialValue = ngModel.$viewValue;

                        // inform tabbable form about focus change
                        if (scope.tabindex) {
                            scope.$emit('inline-form.focus-changed', parseInt(scope.tabindex, 10));
                        }
                    });

                    inputElem.blur(function() {
                        // show visual indicator of possible change
                        $timeout(function() {
                            utilService.hideUndoBtn(undoBtn);

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
                        // don't listen for ENTER key in textarea. it should
                        // cause a line break only

                        if (e.keyCode === keyConstants.ESCAPE_KEY ||
                            e.which === keyConstants.ESCAPE_KEY) {
                            // ESCAPE pressed -> undo and leave
                            ngModel.$setViewValue(initialValue);
                            inputElem.blur();
                        }

                        var newValue = inputElem.val();

                        // check max length
                        if (maxLengthDefined) {
                            if (newValue.length > maxLength) {
                                newValue = newValue.substr(0, maxLength);
                                inputElem.val(newValue);
                                ngModel.$setViewValue(newValue);
                            }
                        }

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
