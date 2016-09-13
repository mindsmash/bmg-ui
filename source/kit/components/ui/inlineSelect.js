(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('inlineSelect', inlineSelect);

    inlineSelect.$inject = ['$timeout', '$templateCache', '$compile', 'utilService', 'keyConstants'];

    function inlineSelect($timeout, $templateCache, $compile, utilService, keyConstants) {
        return {
            scope: {
                ngModel: '=',
                placeholder: '@?',
                oncommit: '&?',
                items: '=',
                displayProperty: '@?',
                position: '@?',
                id: '@',
                tabindex: '@?',
                refreshDelay: '@?',
                refresh: '&?',
                disabled: '=?',
                allowClear: '=?'
            },
            require: 'ngModel',
            link: function(scope, elem, attrs, ngModel) {
                // to identify it in rootScope events
                var identifier = guid();

                /* like ngTransclude, but manual …
                 * ngTransclude does not work in this case because
                 * the transcluded html uses the 'item' variable which
                 * is only made available inside an ng-repeat inside
                 * ui-select, where it doesn't have access to the ng-repeat scope
                 * see: https://github.com/angular/angular.js/issues/8182
                 */
                var children = elem.children();
                var template = angular.element($templateCache.get('bmg/template/inline/select.html'));

                // attach identifier
                template.find('ui-select').attr('data-identifier', identifier);

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

                elem.replaceWith(template); // equivalent to 'replace: true' in directive definition

                var uiSelect = elem.find('.inline-select');
                $compile(template)(scope);

                $timeout(function() {
                    // save initial value for later comparison
                    var initialValue = ngModel.$viewValue;

                    var container = $(template).closest('.inline-edit-container');
                    var dropdownHint = angular.element('<span class="dropdown-hint fa fa-angle-down"></span>');
                    var indicatorButton = angular.element('<button class="revert-button"></button>');
                    var successIndicator = angular.element('<span class="success-indicator fa fa-check"></span>');
                    var inputWrapper = $(template).find('div.selectize-input');
                    var inlineSelectElement = $(template).find('div.inline-select');
                    var uiSelectMatch = $(template).find('div.ui-select-match');
                    var $select;

                    indicatorButton.append(successIndicator);
                    inputWrapper.append(indicatorButton);
                    inputWrapper.append(dropdownHint);

                    // attach id attribute to make label support possible
                    inlineSelectElement.attr('id', scope.id);

                    // attach tabindex attribute to make tab key navigation possible
                    if (scope.tabindex) {
                        inputWrapper.find('input').attr('tabindex', scope.tabindex);
                    }

                    // hide success indicator by default unless needed
                    successIndicator.css('opacity', '0');

                    showClearButton();

                    scope.$on('uiSelect:open', function(e, opened) {
                        if (opened) {
                            dropdownHint.hide();
                            successIndicator.hide();

                            // inform tabbable form about focus change
                            if (scope.tabindex) {
                                scope.$emit('inline-form.focus-changed', parseInt(scope.tabindex, 10));
                            }
                        } else {
                            dropdownHint.show();
                            successIndicator.show();
                        }
                    });

                    scope.onSelect = function(newValue) {
                        if (initialValue !== newValue) {
                            var commitPromise = angular.isDefined(scope.oncommit) ?
                                scope.oncommit({ $data: newValue }) : undefined;

                            if (utilService.isPromise(commitPromise)) {
                                animateSuccessIndicator(commitPromise);
                            } else {
                                animateSuccessIndicator();
                            }
                        }

                        // update initial value
                        initialValue = newValue;
                    };

                    scope.refreshData = function(query) {
                        if (scope.refresh) {
                            scope.refresh({
                                $query: query
                            });
                        }
                    };

                    scope.$on('inline-form.focus-required', function(event, index) {
                        if (scope.tabindex && parseInt(scope.tabindex, 10) === index) {
                            uiSelectMatch.click();
                        }
                    });

                    scope.$on('$selectController', function(event, selectCtrl, selectIdentifier) {
                        if (selectIdentifier === identifier) {
                            $select = selectCtrl;
                        }
                    });

                    successIndicator.click(function(e) {
                        if (scope.allowClear && successIndicator.hasClass('clear-button')) {
                            e.stopPropagation();

                            $select.clear(e);
                        }
                    });

                    function showClearButton() {
                        if ((scope.allowClear && !$select) ||
                            (scope.allowClear && $select && $select.selected)) {
                            indicatorButton.css('opacity', '1');
                            successIndicator.css('opacity', '1');
                            successIndicator
                                .removeClass('fa-check')
                                .addClass('fa-remove clear-button');
                        }
                    }

                    function animateSuccessIndicator(commitPromise) {
                        container.removeClass('has-error');
                        indicatorButton.css('opacity', '1');
                        successIndicator.removeClass('clear-button');

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

                        $timeout(function() {
                            showClearButton();
                        }, 600);
                    }
                });
            }
        };
    }

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }
})();
