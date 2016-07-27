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
            template: '<div class="inline-edit-container">' +
                '<input type="text" data-ng-model="ngModel" placeholder="{{placeholder}}" ' +
                'class="inline-text" /><button type="button" class="revert-button">' +
                '<i class="fa fa-undo"></i></button></div>',
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

                        // call the callback function with the new input value
                        scope.oncommit({
                            $data: inputElem.val()
                        });

                        // show visual indicator of change
                        animateSuccessIndicator();
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
                });
            }
        };
    }
})();
