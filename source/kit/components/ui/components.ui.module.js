(function(angular) {
    'use strict';

    angular.module('bmg.components.ui', ['ui.select', 'bmg/template/inlineEdits'])
        .config(decorateUISelectWithOpenEvent)
        .run(xeditableRun);

    xeditableRun.$inject = ['editableOptions', 'editableThemes'];

    function xeditableRun(editableOptions, editableThemes) {
        editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
        editableThemes.bs3.submitTpl = '<button type="submit" class="btn btn-primary"><i class="fa fa-check"></i></button>';
        editableThemes.bs3.cancelTpl = '<button type="button" class="btn btn-secondary" ng-click="$form.$cancel()"><i class="fa fa-times"></i></button>';
    }

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
