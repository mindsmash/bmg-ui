(function(angular) {
    'use strict';

    angular.module('bmg.components.ui', [
            'monospaced.elastic',
            'ui.select',
            'ngSanitize',
            'bmg/template/inlineEdits',
            'user/dialogs/templates'
        ])
        .config(decorateUISelectWithOpenEvent);

    decorateUISelectWithOpenEvent.$inject = ['$provide'];

    // massive kudos to Github user yvesmh for the below
    // source: https://github.com/angular-ui/ui-select/issues/432#issuecomment-109490350
    function decorateUISelectWithOpenEvent($provide) {
        $provide.decorator('uiSelectDirective', function($delegate) {
            var directive = $delegate[0];
            var directiveCompile = directive.compile;

            directive.compile = function () {
                var link = directiveCompile.apply(this, arguments);

                return function(scope) {
                    link.apply(this, arguments);
                    scope.$watch('$select.open', function(value) {
                        scope.$parent.$broadcast('uiSelect:open', value);
                    });
                };
            };

            return $delegate;
        });
    }

})(angular);
