(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('collapsingNavbar', collapsingNavbar);

    // saves the previous 10 scroll positions
    var lastKnownScrollPositions = [];
    var isCollapsed = false;
    var config = {};

    function collapsingNavbar() {
        return {
            restrict: 'A',
            scope: {
                config: '=collapsingNavbar'
            },
            link: function(scope, elem) {
                config.mindFloatThead = !!scope.config.mindFloatThead;
                config.collapsedHeight = scope.config.collapsedHeight || 20;
                config.expandedHeight = scope.config.expandedHeight || 75;

                window.setInterval(checkScrollStatus, 200);

                $('nav.navbar').click(expandNavbar);

                // add expand hint
                var expandHint = angular.element(
                    '<div class="bmg-nav-expand-hint"><i class="fa fa-bars"></i></div>');

                elem.find('.container-fluid').append(expandHint);
            }
        };
    }

    function checkScrollStatus() {
        // check scroll status every 200ms
        var scrollTop = $(document).scrollTop();
        lastKnownScrollPositions.push(scrollTop);

        if (lastKnownScrollPositions.length > 10) {
            // only the last 10 positions should be saved
            lastKnownScrollPositions.shift();

            var earliestKnownScrollTop = lastKnownScrollPositions[0];
            var previousScrollTop = lastKnownScrollPositions[lastKnownScrollPositions.length - 2];

            if (scrollTop !== previousScrollTop) {
                // do not do anything if we're not scrolling anymore

                if ((scrollTop - earliestKnownScrollTop) > 200 && !isCollapsed) {
                    // more than 200px scrolled down? -> collapse
                    collapseNavbar();
                }

                // at the top of the page or more than 200px
                // scrolled up? -> expand
                if (((earliestKnownScrollTop - scrollTop) > 200 || scrollTop <= 50) &&
                    isCollapsed) {
                    expandNavbar();
                }
            }
        }
    }

    function collapseNavbar() {
        $('nav.navbar').addClass('smaller');
        rearrangeStickyBars(true);
        isCollapsed = true;
    }

    function expandNavbar() {
        $('nav.navbar').removeClass('smaller');
        rearrangeStickyBars(false);
        isCollapsed = false;
    }

    function rearrangeStickyBars(up) {
        console.log('config: ', config);
        var stickyBars = $('*[sticky]');

        if (up) {
            stickyBars.attr('offset', config.collapsedHeight);
            stickyBars.css('top', config.collapsedHeight + 'px');
        } else {
            stickyBars.attr('offset', config.expandedHeight);
            stickyBars.css('top', config.expandedHeight + '75px');
        }

        if (config.mindFloatThead) {
            changefloatTheadTop(up);
        }
    }

    function changefloatTheadTop(up) {
        var tableSelector = '.table-responsive table, ' +
            '.tableStandard-responsive table, ' +
            '.tableCondensed-responsive table';

        // reinitialize floating table headers
        $(tableSelector).floatThead('destroy');

        $(tableSelector).floatThead({
            top: function($table) {
                return up ? config.collapsedHeight : config.expandedHeight;
            },
            responsiveContainer: function($table) {
                return $table.closest('.table-responsive, ' +
                    '.tableStandard-responsive, ' +
                    '.tableCondensed-responsive');
            }
        });
    }
})();
