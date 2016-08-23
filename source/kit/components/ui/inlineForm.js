(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('inlineForm', inlineForm);

    inlineForm.$inject = ['$timeout', 'keyConstants'];

    function inlineForm($timeout, keyConstants) {
        return {
            restrict: 'C',
            link: function(scope, elem, attrs) {
                $timeout(function() {
                    var tabInputs = $(elem).find('*[tabindex]');
                    var sortedTabIndices = sortIndices(tabInputs);
                    var currentTabIndex;

                    elem.on('keydown', function(e) {
                        if (e.keyCode === keyConstants.TAB_KEY ||
                            e.which === keyConstants.TAB_KEY) {
                            e.preventDefault();

                            // tell next element to focus
                            var nextIndex = getSuccessorIndex(sortedTabIndices, currentTabIndex);
                            scope.$broadcast('inline-form.focus-required', nextIndex);
                            currentTabIndex = nextIndex;
                        }
                    });

                    scope.$on('inline-form.focus-changed', function(event, index) {
                        currentTabIndex = index;
                    });

                    function sortIndices(elements) {
                        var resultList = [];

                        elements.each(function() {
                            resultList.push(parseInt($(this).attr('tabindex'), 10));
                        });

                        return resultList.sort(function(a, b) {
                            return a > b;
                        });
                    }

                    function getSuccessorIndex(allIndices, currentIndex) {
                        if (angular.isUndefined(currentIndex)) {
                            return allIndices[0];
                        }

                        var where = _.indexOf(allIndices, currentIndex);

                        if (where < 0) {
                            return allIndices[0];
                        }

                        return allIndices[(where + 1) % allIndices.length];
                    }
                });
            }
        };
    }
})();
