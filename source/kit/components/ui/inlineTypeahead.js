(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('inlineTypeahead', inlineTypeahead);

    function inlineTypeahead($timeout) {
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
                        hideUndoBtn();

                        // call the callback function with the new input value
                        scope.oncommit({
                            $data: ngModel.$viewValue
                        });

                        // show visual indicator of possible change
                        $timeout(function() {
                            if (ngModel.$viewValue !== initialValue) {
                                animateSuccessIndicator();
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

                    function animateSuccessIndicator() {
                        undoBtn.find('i').removeClass('fa-undo').addClass('fa-check');
                        undoBtn.addClass('success');
                        showUndoBtn();

                        $timeout(function() {
                            hideUndoBtn();
                        }, 500);

                        $timeout(function() {
                            undoBtn.removeClass('success');
                            undoBtn.find('i').removeClass('fa-check').addClass('fa-undo');
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
