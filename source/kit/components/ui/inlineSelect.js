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
                placeholder: '@',
                oncommit: '&',
                items: '=',
                displayProperty: '@?'
            },
            require: 'ngModel',
            link: function(scope, elem, attrs, ngModel, transclude) {
                // like ngTransclude, but manual …
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
                    var dropdownHint = angular.element('<span class="dropdown-hint fa fa-angle-down"></span>');
                    var inputWrapper = $(elem).find('div.selectize-input');

                    inputWrapper.append(dropdownHint);

                    scope.$on('uiSelect:open', function(e, opened) {
                        if (opened) {
                            dropdownHint.hide();
                        } else {
                            dropdownHint.show();
                        }
                    });
                });
            }
        };
    }
})();
