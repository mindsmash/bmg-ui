(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('collapsingNavbar', collapsingNavbar);

    function collapsingNavbar() {
        return {
            link: function(scope, elem) {
                // saves the previous 10 scroll positions
                var lastKnownScrollPositions = [];

                window.setInterval(function() {
                    // check scroll status every 200ms
                    var scrollTop = $(document).scrollTop();
                    lastKnownScrollPositions.push(scrollTop);

                    if (lastKnownScrollPositions.length > 10) {
                        // only the last 10 positions should be saved
                        lastKnownScrollPositions.shift();

                        var earliestKnownScrollTop = lastKnownScrollPositions[0];
                        if ((scrollTop - earliestKnownScrollTop) > 200) {
                            // more than 200px scrolled down? -> collapse
                            collapseNavbar();
                        }

                        if ((earliestKnownScrollTop - scrollTop) > 200 || scrollTop < 30) {
                            // at the top of the page or more than 200px
                            // scrolled up? -> expand
                            expandNavbar();
                        }
                    }
                }, 200);

                $('nav.navbar').click(function() {
                    expandNavbar();
                });

                function collapseNavbar() {
                    $('nav.navbar').addClass('smaller');
                }

                function expandNavbar() {
                    $('nav.navbar').removeClass('smaller');
                }
            }
        };
    }
})();
