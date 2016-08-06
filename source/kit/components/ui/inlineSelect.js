(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('inlineSelect', inlineSelect);

    function inlineSelect($timeout, $templateCache, $compile, miscService) {
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
                 * ui-select, where it doesn't have access to the ng-repeat scope
                 * see: https://github.com/angular/angular.js/issues/8182
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

                    var container = $(template).closest('.inline-edit-container');
                    var dropdownHint = angular.element('<span class="dropdown-hint fa fa-angle-down"></span>');
                    var indicatorButton = angular.element('<button class="revert-button"></button>');
                    var successIndicator = angular.element('<span class="success-indicator fa fa-check"></span>');
                    var inputWrapper = $(elem).find('div.selectize-input');

                    indicatorButton.append(successIndicator);
                    inputWrapper.append(indicatorButton);
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
                            var commitPromise = angular.isDefined(scope.oncommit) ?
                                scope.oncommit({ $data: newValue }) : undefined;

                            if (miscService.isPromise(commitPromise)) {
                                animateSuccessIndicator(commitPromise);
                            } else {
                                animateSuccessIndicator();
                            }
                        }

                        // update initial value
                        initialValue = newValue;
                    };

                    function animateSuccessIndicator(commitPromise) {
                        container.removeClass('has-error');
                        indicatorButton.css('opacity', '1');

                        if (commitPromise) {
                            successIndicator
                                .css('opacity', '1')
                                .removeClass('fa-check fa-remove')
                                .addClass('fa-spin fa-spinner');

                            commitPromise.then(function() {
                                successIndicator
                                    .removeClass('fa-spin fa-spinner')
                                    .addClass('fa-check');
                                endAnimation();
                            }, function(error) {
                                successIndicator
                                    .removeClass('fa-spin fa-spinner')
                                    .addClass('fa-remove');
                                container.addClass('has-error');
                                container
                                    .find('.inline-error')
                                    .empty()
                                    .append(error);

                                endAnimation();
                            });
                        } else {
                            successIndicator
                                .css('opacity', '1')
                                .addClass('fa-check');
                            endAnimation();
                        }
                    }

                    function endAnimation() {
                        $timeout(function() {
                            successIndicator.css('opacity', '0');
                            indicatorButton.css('opacity', '0');
                        }, 500);
                    }
                });
            }
        };
    }
})();
