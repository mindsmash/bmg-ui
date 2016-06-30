(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('bmgOneClickSelect', bmgOneClickSelect);

    function bmgOneClickSelect($timeout) {
        return {
            replace: true,
            template: '<select class="form-control"></select>',
            link: function(scope, elem, attrs) {
                var visible = false;

                scope.$watch(function() {
                    return elem.is(':visible') && elem.is(':focus');
                }, function() {
                    if (!visible) {
                        $timeout(function() {
                            openSelect(elem);
                            visible = true;
                        });
                    }
                });
            }
        };
    }

    function openSelect(elem) {
        var e = document.createEvent("MouseEvents");
        e.initMouseEvent(
            "mousedown", true, true, window, 0, 0, 0, 0, 0,
            false, false, false, false, 0, null
        );
        elem[0].dispatchEvent(e);
    }

    bmgOneClickSelect.$inject = ['$timeout'];
})();
