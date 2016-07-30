(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('inlineSelect', inlineSelect);

    function inlineSelect($timeout, $templateCache, $compile) {
        return {
            replace: true,
            scope: {
                ngModel: '=',
                placeholder: '@?',
                oncommit: '&?',
                items: '=',
                displayProperty: '@?'
            },
            require: 'ngModel',
            link: function(scope, elem, attrs, ngModel) {
                /* like ngTransclude, but manual …
                 * ngTransclude does not work in this case because
                 * the transcluded html uses the 'item' variable which
                 * is only made available inside an ng-repeat inside
                 * ui-select, where it doesn't get evaluated for some reason
                 */
                var children = elem.children();
                var template = angular.element($templateCache.get('bmg/template/inline/select.html'));

                if (children.length > 0) {
                    // copy 'transcluded' html into our template
                    template.find('.ui-select-choices').append(children);
                } else {
                    // no transcluded html given -> default to item, assuming it's a string
                    template.find('.ui-select-choices').append(
                        angular.element('<span data-ng-bind-html="item | highlight:$select.search"></span>')
                    );
                }

                // if necessary, bind the ui-select-match to the correct property
                // on the selected item
                if (scope.displayProperty) {
                    template.find('.ui-select-match').attr(
                        'data-ng-bind', '$select.selected.' + scope.displayProperty);
                }

                elem.html('');
                elem.append(template);

                var uiSelect = elem.find('.inline-select');
                $compile(uiSelect)(scope);

                $timeout(function() {
                    // save initial value for later comparison
                    var initialValue = ngModel.$viewValue;

                    var dropdownHint = angular.element('<span class="dropdown-hint fa fa-angle-down"></span>');
                    var successIndicator = angular.element('<span class="success-indicator fa fa-check"></span>');
                    var inputWrapper = $(elem).find('div.selectize-input');

                    inputWrapper.append(successIndicator);
                    inputWrapper.append(dropdownHint);

                    // hide success indicator by default unless needed
                    successIndicator.css('opacity', '0');

                    scope.$on('uiSelect:open', function(e, opened) {
                        if (opened) {
                            dropdownHint.hide();
                        } else {
                            dropdownHint.show();
                        }
                    });

                    scope.onSelect = function(newValue) {
                        if (initialValue !== newValue) {
                            successIndicator.css('opacity', '1');

                            $timeout(function() {
                                successIndicator.css('opacity', '0');
                            }, 500);
                        }

                        if (scope.oncommit) {
                            scope.oncommit({ $data: newValue });
                        }

                        // update initial value
                        initialValue = newValue;
                    };
                });
            }
        };
    }
})();
