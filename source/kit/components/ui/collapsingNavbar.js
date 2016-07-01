(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('collapsingNavbar', collapsingNavbar);

    function collapsingNavbar() {
        return {
            restrict: 'A',
            link: function(scope, elem) {
                window.setInterval(checkScrollStatus, 200);

                $('nav.navbar').click(expandNavbar);

                // add expand hint
                var expandHint = angular.element(
                    '<div class="bmg-nav-expand-hint"><i class="fa fa-bars"></i></div>');

                elem.find('.container-fluid').append(expandHint);
            }
        };
    }

    // saves the previous 10 scroll positions
    var lastKnownScrollPositions = [];
    // current floatThead status
    var isCollapsed = false;

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

                if ((scrollTop - earliestKnownScrollTop) > 200) {
                    // more than 200px scrolled down? -> collapse
                    collapseNavbar();
                }

                if ((earliestKnownScrollTop - scrollTop) > 200 || scrollTop <= 50) {
                    // at the top of the page or more than 200px
                    // scrolled up? -> expand
                    expandNavbar();
                }
            }
        }
    }

    function collapseNavbar() {
        $('nav.navbar').addClass('smaller');
        isCollapsed = true;
        rearrangeStickyBars(true);
    }

    function expandNavbar() {
        $('nav.navbar').removeClass('smaller');
        isCollapsed = false;
        rearrangeStickyBars(false);
    }

    function rearrangeStickyBars(up) {
        var stickyBars = $('*[sticky]');

        if (up) {
            stickyBars.attr('offset', 20);
            stickyBars.css('top', '20px');
        } else {
            stickyBars.attr('offset', 75);
            stickyBars.css('top', '75px');
        }

        changefloatTheadTop();
    }

    function changefloatTheadTop() {
        var tableSelector = '.tableStandard-responsive table';

        /*$(tableSelector).floatThead('reflow');
        $(tableSelector).on('reflowed', function() {
            $(tableSelector).floatThead('destroy');
            $(tableSelector).floatThead({
                top: function($table) {
                    return newValue;
                },
                // responsiveContainer: function($table){
                //     return $table.closest('.tableStandard-responsive');
                // }
            });
        });*/

        $(tableSelector).trigger('reflow');
        $(tableSelector).on('reflowed', function() {
            $(tableSelector).floatThead('destroy');

            $(tableSelector).floatThead({
                top: function($table) {
                    return isCollapsed ? 20 : 75;
                }
            });

            isCollapsed = !isCollapsed;
        });
    }
})();
