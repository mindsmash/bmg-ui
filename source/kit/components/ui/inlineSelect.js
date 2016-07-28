(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('inlineSelect', inlineSelect);

    function inlineSelect($timeout, $templateCache) {
        return {
            replace: true,
            scope: {
                ngModel: '=',
                //displayValue: '=',
                placeholder: '@',
                oncommit: '&',
                items: '='
            },
            templateUrl: 'bmg/template/inline/select.html',
            //template: '<div class="inline-edit-container"></div>',
            require: 'ngModel',
            link: function(scope, elem, attrs, ngModel) {
                $timeout(function() {
                    // try to manipulate DOM from here
                    var dropdownHint = angular.element('<span class="dropdown-hint fa fa-angle-down"></span>');
                    var inputWrapper = $(elem).find('div.selectize-input');

                    inputWrapper.append(dropdownHint);
                });
            }
        };
    }
})();
