(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('inlineTypeahead', inlineTypeahead);

    function inlineTypeahead($timeout, miscService) {
        return {
            replace: true,
            scope: {
                ngModel: '=',
                placeholder: '@',
                oncommit: '&',
                items: '='
            },
            templateUrl: 'bmg/template/inline/typeahead.html',
            require: 'ngModel',
            link: function(scope, elem, attrs, ngModel) {
                $timeout(function() {
                    // save original input value for undo
                    var initialValue = ngModel.$viewValue;
                    var undoBtn = $(elem).find('.revert-button');
                    var inputElem = $(elem).find('.inline-typeahead');

                    scope.handleUndoBtnVisibility = function() {
                        $timeout(function() {
                            // timeout necessary because $viewValue would lag
                            // one character behind otherwise
                            var newValue = ngModel.$viewValue;

                            if (newValue != initialValue) {
                                showUndoBtn();
                            } else {
                                hideUndoBtn();
                            }
                        });
                    };

                    scope.focusHandler = function() {
                        // update initial value on new focus
                        initialValue = ngModel.$viewValue;
                    };

                    scope.blurHandler = function() {
                        // show visual indicator of possible change
                        var oldInitialValue = initialValue;

                        $timeout(function() {
                            hideUndoBtn();

                            var newNgModel = ngModel.$viewValue;

                            if (newNgModel !== oldInitialValue) {
                                // call the callback function with the new input value
                                var commitPromise = angular.isDefined(scope.oncommit) ?
                                    scope.oncommit({
                                        $data: newNgModel
                                    }) : undefined;

                                if (miscService.isPromise(commitPromise)) {
                                    animateSuccessIndicator(commitPromise);
                                } else {
                                    animateSuccessIndicator();
                                }
                            }
                        }, 10); // to make sure this happens after undo button click
                    };

                    undoBtn.click(function() {
                        ngModel.$setViewValue(initialValue);
                        hideUndoBtn();
                        inputElem.trigger('focus');
                    });

                    function hideUndoBtn() {
                        undoBtn.removeClass('active');
                    }

                    function showUndoBtn() {
                        undoBtn.addClass('active');
                    }

                    function animateSuccessIndicator(commitPromise) {
                        showUndoBtn();

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
                            }, function() {
                                undoBtn
                                    .find('i')
                                    .removeClass('fa-spin fa-spinner')
                                    .addClass('fa-remove');
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
                            hideUndoBtn();
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
