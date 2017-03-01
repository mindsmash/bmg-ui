(function(undefined) {
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
                placeholder: '@',
                oncommit: '&',
                items: '=',
                disabled: '=?',
                tabindex: '@?'
            },
			templateUrl: function(element, attrs) {
				return 'bmg/template/inline/' + (!!attrs.async ? 'async-' : '') + 'typeahead.html';
			},
            require: 'ngModel',
            link: function(scope, elem, attrs, ngModel) {
                $timeout(function() {
                    // save original input value for undo
                    var initialValue = ngModel.$viewValue;
                    var undoBtn = $(elem).find('.revert-button');
                    var inputElem = $(elem).find('.inline-typeahead');
                    var container = $(elem).closest('.inline-edit-container');

					scope.loading = false;
					scope.noResults = false;

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

                    // label support
                    utilService.addLabelSupport(attrs.id, function() {
                        inputElem.trigger('focus');
                    });
                });
            }
        };
    }
})();
