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
                placeholder: '@'
            },
            template: '<div class="inline-edit-container"><input type="text" data-ng-model="ngModel" placeholder="{{placeholder}}" class="inline-text" /><button type="button" class="revert-button"><i class="fa fa-undo"></i></button></div>',
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
                        undoBtn.css('opacity', '0');
                    }

                    function showUndoBtn() {
                        undoBtn.css('opacity', '1');
                    }
                });
            }
        };
    }
})();
