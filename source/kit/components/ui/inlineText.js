(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('inlineText', inlineText);

    function inlineText($timeout) {
        return {
            replace: true,
            scope: {
                ngModel: '='
            },
            template: '<div class="inline-edit-container"><input type="text" data-ng-model="ngModel" class="inline-text" /><button type="button" class="revert-button"><i class="fa fa-undo"></i></button></div>',
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

                    });

                    inputElem.on('keyup change', function() {
                        var newValue = inputElem.val();

                        if (newValue != initialValue) {
                            undoBtn.css('opacity', '1');
                        } else {
                            undoBtn.css('opacity', '0');
                        }
                    });

                    undoBtn.click(function() {
                        ngModel.$setViewValue(initialValue);
                        $(this).css('opacity', '0');
                    });
                });
            }
        };
    }
})();
