(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('inlineText', inlineText);

    inlineText.$inject = ['$timeout', 'utilService', 'keyConstants'];

    function inlineText($timeout, utilService, keyConstants) {
        return {
            replace: true,
            scope: {
                ngModel: '=',
                placeholder: '@',
                oncommit: '&',
                tabindex: '@?',
                disabled: '=?',
	            inputType : '@?',
				step: '@?',
				min: '@?',
				max: '@?',
	            selectOnFocus: '=?'
            },
            templateUrl: 'bmg/template/inline/text.html',
            require: 'ngModel',
            link: function(scope, elem, attrs, ngModel) {
	            // timeout necessary, otherwise $viewValue is still NaN
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

					// only for number input
                    if (scope.step && scope.inputType === 'number') {
						inputElem.attr('step', scope.step);
					}
					if (scope.min && scope.inputType === 'number') {
						inputElem.attr('min', scope.min);
					}
					if (scope.max && scope.inputType === 'number') {
						inputElem.attr('max', scope.max);
					}

                    inputElem.focus(function() {
                        // update initial value on new focus
                        initialValue = ngModel.$viewValue;

	                    // select value
	                    if (!!scope.selectOnFocus) {
		                    // The timeout is needed by safari browser to keep the selection.
		                    $timeout(function() {
			                    inputElem.select();
		                    });
	                    }

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
