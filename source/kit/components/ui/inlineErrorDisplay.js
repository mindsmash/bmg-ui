(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('inlineErrorDisplay', inlineErrorDisplay);

    inlineErrorDisplay.$inject = ['$templateCache', '$compile'];

    function inlineErrorDisplay($templateCache, $compile) {
        return {
            scope: {
                text: '=inlineErrorDisplay'
            },
            bindToController: true,
            controller: function() {},
            controllerAs: 'ctrl',
            require: 'inlineErrorDisplay',
            link: function(scope, elem, attrs, ctrl) {
                if (angular.isUndefined(ctrl.text)) {
                    // no error text, no tooltip
                    return;
                }

                var template = $templateCache.get('bmg/template/inline/error-tooltip.html');
                var triangle = angular.element(template);
                var compiledTriangle = $compile(triangle)(scope);

                $(elem).append(compiledTriangle);

                $('body').tooltip({
                    selector: 'i.inline-error',
                    container: 'body'
                });
            }
        };
    }
})();
