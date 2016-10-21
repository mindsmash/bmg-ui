(function(undefined) {
    'use strict';

    angular
        .module('bmg/template/alert', [])
        .run(['$templateCache', function($templateCache) {
            $templateCache.put('bmg/template/alert.html', [
                '<div',
                '    class="alert alert-{{ ctrl.type }}"',
                '    role="alert">',
                '    <i',
                '        data-ng-if="ctrl.icon"',
                '        class="alert-icon fa fa-{{ ctrl.icon }}"></i>',
                '    <span data-ng-transclude></span>',
                '</div>'
            ].join(''));
        }]);
})();
