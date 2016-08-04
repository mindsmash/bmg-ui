(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('inlineText', inlineText);

    function inlineText($timeout, miscService) {
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
                                var commitPromise = scope.oncommit({
                                    $data: inputElem.val()
                                });

                                if (miscService.isPromise(commitPromise)) {
                                    // if it looks like a promise and walks like a promise …
                                    animateSuccessIndicator(commitPromise);
                                } else {
                                    animateSuccessIndicator();
                                }
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

                    function animateSuccessIndicator(commitPromise) {
                        if (commitPromise) {
                            // animate spinner first until promise resolves
                            showUndoBtn();
                            undoBtn
                                .find('i')
                                .removeClass('fa-undo')
                                .addClass('fa-spin fa-spinner');

                            commitPromise.then(function() {
                                undoBtn
                                    .find('i')
                                    .removeClass('fa-undo fa-spin fa-spinner')
                                    .addClass('fa-check');
                                undoBtn.addClass('success');

                                endAnimation();
                            }, function() {
                                undoBtn
                                    .find('i')
                                    .removeClass('fa-undo fa-spin fa-spinner')
                                    .addClass('fa-remove');
                                undoBtn.addClass('error');

                                endAnimation();
                            });
                        } else {
                            // switch to success
                            undoBtn
                                .find('i')
                                .removeClass('fa-undo')
                                .addClass('fa-check');
                            undoBtn.addClass('success');
                            showUndoBtn();

                            endAnimation();
                        }
                    }

                    function endAnimation() {
                        $timeout(function() {
                            hideUndoBtn();
                        }, 500);

                        $timeout(function() {
                            undoBtn.removeClass('success error');
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
