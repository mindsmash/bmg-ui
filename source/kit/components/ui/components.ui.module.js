(function(angular) {
    'use strict';

    angular.module('bmg.components.ui', [])
        .run(xeditableRun);

    xeditableRun.$inject = ['editableOptions', 'editableThemes'];

    function xeditableRun(editableOptions, editableThemes) {
        editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
        editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary"><i class="fa fa-check"></i></button>';
        editableThemes['bs3'].cancelTpl = '<button type="button" class="btn btn-secondary" ng-click="$form.$cancel()"><i class="fa fa-times"></i></button>';
    }

})(angular);
