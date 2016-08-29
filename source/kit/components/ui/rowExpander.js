(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('rowExpander', rowExpander);

    rowExpander.$inject = [];

    function rowExpander() {
        return {
            restrict: 'A',
            scope: {
                expandedByDefault: '=rowExpandedByDefault'
            },
            link: function(scope, elem) {
                var slave = $(elem).closest('tr').next('tr.slave-row').children('td');
                var expandedByDefault = !!scope.expandedByDefault;

                if (!expandedByDefault) {
                    slave.slideToggle();
                }

                $(elem).on('click', function(e) {
                    // otherwise the page jumps back to the top
                    e.preventDefault();

                    if (slave && slave.length) {
                        slave.slideToggle(200);
                    }
                });
            }
        };
    }
})();
