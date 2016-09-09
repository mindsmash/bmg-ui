(function(undefined) {
    'use strict';

    angular
        .module('user/dialogs/templates', [])
        .run(['$templateCache', function($templateCache) {
            $templateCache.put('user/dialogs/confirm.html', [
                '<div class="modal-close">',
                '    <button',
                '        type="button"',
                '        class="close"',
                '        data-ng-click="ctrl.cancel()"><i class="fa fa-times color-secondary"></i></button>',
                '</div>',
                '<div class="modal-header">',
                '    <h2',
                '        class="modal-title"',
                '        data-ng-bind="ctrl.title"></h2>',
                '</div>',
                '<div class="modal-body">',
                '    <div class="row">',
                '        <div',
                '            class="col-xs-12"',
                '            data-ng-bind="ctrl.text"></div>',
                '    </div>',
                '</div>',
                '<div class="modal-footer">',
                '    <hr>',
                '    <button',
                '        class="btn btn-secondary"',
                '        type="button"',
                '        data-ng-bind="ctrl.secondaryActionCaption"',
                '        data-ng-click="ctrl.cancel()"></button>',
                '    <button',
                '        class="btn btn-{{ ctrl.primaryClass }}"',
                '        type="button"',
                '        data-ng-bind="ctrl.primaryActionCaption"',
                '        data-ng-click="ctrl.ok()"></button>',
                '</div>'
            ].join(''));
        }]);
})();
