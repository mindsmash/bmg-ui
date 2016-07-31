(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('inlineText', inlineText);

    function inlineText($timeout) {
        return {
            replace: true,
            scope: {
                ngModel: '=',
                placeholder: '@',
                oncommit: '&'
            },
            templateUrl: 'bmg/template/inline/text.html',
            require: 'ngModel',
            link: function(scope, elem, attrs, ngModel) {
                // timeout necessary, otherview $viewValue is still NaN
                $timeout(function() {
                    // save original input value for undo
                    var initialValue = ngModel.$viewValue;
                    var undoBtn = $(elem).find('.revert-button');
                    var inputElem = $(elem).find('.inline-text');

                    inputElem.focus(function() {
                        // update initial value on new focus
                        initialValue = ngModel.$viewValue;
                    });

                    inputElem.blur(function() {
                        hideUndoBtn();

                        // show visual indicator of possible change
                        $timeout(function() {
                            if (ngModel.$viewValue !== initialValue) {
                                // call the callback function with the new input value
                                scope.oncommit({
                                    $data: inputElem.val()
                                });

                                animateSuccessIndicator();
                            }
                        }, 10); // to make sure this happens after undo button click
                    });

                    inputElem.on('keyup change', function() {
                        var newValue = inputElem.val();

                        if (newValue != initialValue) {
                            showUndoBtn();
                        } else {
                            hideUndoBtn();
                        }
                    });

                    undoBtn.click(function() {
                        ngModel.$setViewValue(initialValue);
                        hideUndoBtn();
                        inputElem.focus();
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
